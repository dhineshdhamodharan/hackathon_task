async function getProductType() {
  try {
    const data = await fetch(
      "http://makeup-api.herokuapp.com/api/v1/products.json",
      {
        method: "GET",
      }
    );
    const products = await data.json();
    console.log(products);

    const productTypesSet = new Set();

    // Add the unique products name in SET
    products.forEach((product) => {
      const product_type = product.product_type;
      productTypesSet.add(product_type);
    });
    console.log(productTypesSet);
    productButtonCreation(productTypesSet);
  } catch (Exception) {
    console.log("Exception occured while getting the product type");
  }
}

// Create buttons for available product types
function productButtonCreation(productTypesSet) {
  const titleDiv = document.createElement("div");
  titleDiv.className = "title-div";
  titleDiv.innerHTML = `<h1>YOU CAN'T BUY HAPPINESS, BUT YOU CAN BUY MAKEUP...</h1>`;
  document.body.append(titleDiv);
  const searchBar = document.createElement("div");
  searchBar.innerHTML = `<input type="text" class="search" placeholder="Enter Brand name..">
  <button class="button" onclick="getProductListsByBrand()">Search</button>`;
  document.body.append(searchBar);

  const productListDiv = document.createElement("div");
  productListDiv.className = "product-list-div";
  for (const productType of productTypesSet) {
    const productDiv = document.createElement("div");
    productDiv.className = "product-div";
    productDiv.innerHTML = `<button class="button" onclick="displayItems('${productType}')">${productType}</button>`;
    productListDiv.appendChild(productDiv);
  }
  document.body.append(productListDiv);
}

async function displayItems(productType) {
  if (document.querySelector(".image-list") != null) {
    document.querySelector(".image-list").remove();
  }
  const data = await fetch(
    `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType}`,
    {
      method: "GET",
    }
  );
  const productNames = await data.json();
  console.log(productNames);
  const imageList = displayProductDetails(productNames);
  document.body.append(imageList);
}

//To get the product details by brand
async function getProductListsByBrand() {
  if (document.querySelector(".image-list") != null) {
    document.querySelector(".image-list").remove();
  }
  const brand_name = document.querySelector(".search").value;
  // API to get the item details by brand
  const data = await fetch(
    `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand_name}`,
    {
      method: "GET",
    }
  );
  const products = await data.json();
  console.log(products);

  const imageList = displayProductDetails(products);
  document.body.append(imageList);
  document.querySelector(".search").value='';
}
//Display the product details like name, brand, price, link
function displayProductDetails(products) {
  const imageList = document.createElement("div");
  imageList.className = "image-list";

  products.forEach((product) => {
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    imageContainer.innerHTML = `<img class="image-flag" src=${product.image_link} onerror="javascript:this.src='./defaultImageMakeup.jpg'"/> </img>
    <h3 class="product-name">Product Name : ${product.name}</h3>
    <h3 class="product-brand">Brand : ${product.brand}</h3>
    <p class="product-price">Price : ${product.price}$</p>
    <a href='${product.product_link}'>Product Link</a>
  `;
    imageList.append(imageContainer);
  });
  return imageList;
}

getProductType();
