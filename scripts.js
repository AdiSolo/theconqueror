document.addEventListener("DOMContentLoaded", function () {
  const myDiv = document.getElementById("hamburger-menu");

  myDiv.addEventListener("click", function () {
    // Toggle the 'active' class on click
    let menu = document.getElementsByClassName("menu")[0];
    menu.classList.toggle("active");
  });
});

fetch("challenges.json")
  .then((response) => response.json())
  .then((data) => {
    const products = data;
    const productHTML = products
      .map((product) => {
        return `
                <div class="card"  style=" background-image: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 18%, rgb(255, 255, 255) 28%), url(${product.image});">
                <div class="image">
                <span class="medal" >
                <img src="${product.medal}" />
                </span>
                </div>
                <div class="h3 title">${product.title}</div>
                <div class="details-group">
                <p class="distance"> ${product.description.distance}</p>
                <p class="postcard"> ${product.description.postcards}</p>
                <p class="streetview">${product.description.streetview}</p>
                </div>
                <div class="cta_wrapper">
                <span class="buy-btn" data-prod_id="${product.id}" data-prod_name="${product.title}" data-prod_price="${product.price}">Add challenge</span>
                </div>
              </div>
        `;
      })
      .join(""); // Join the array of strings into a single string

    // Select the div with ID 'challenges-grid' and set its inner HTML to the generated HTML
    document.getElementById("challenges-grid").innerHTML = productHTML;
    attachEventListenersToButtons();
  })
  .catch((error) => console.error("Error:", error));

// Script to be included on the product listing page

// Initialize an empty array to store product details
let cartItems = [];

// Function to handle adding items to the cart
function addToCart(productId, productName) {
  // Add the product ID and name to the cartItems array
  cartItems.push({ id: productId, name: productName });

  // Store the updated array in localStorage
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function attachEventListenersToButtons() {
  document.querySelectorAll(".buy-btn").forEach((item) => {
    item.addEventListener("click", function () {
      const productId = this.dataset.prod_id;
      const productName = this.dataset.prod_name;
      const productPrice = this.dataset.prod_price;
      console.log(productId);
      // Add the product ID and name to the cartItems array
      cartItems.push({ id: productId, name: productName, price: productPrice });
      console.log(cartItems);
      // Store the updated array in localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));
    });
  });
}
function displayCartItems() {
  // Retrieve the cart items from localStorage
  const storedCartItems = JSON.parse(localStorage.getItem("cart"));

  if (storedCartItems) {
    // Create a summary of the cart items
    let summary = storedCartItems
      .map((item) => {
        return `
        
        <tr>
        <td>${item.id}</td>
        <td>    ${item.name} </td>
        <td>${item.price}</td>
    </tr>`;
      })
      .join("");
    let total = storedCartItems.reduce((accumulator, currentItem) => {
      return accumulator + Number(currentItem.price);
    }, 0);
    console.log(total);

    // Display the summary (adjust based on your HTML structure)
    document.getElementById("cart-summary").innerHTML = summary;
    document.getElementById("total-price").innerHTML = total;
  }
  console.log(storedCartItems);
}
displayCartItems();
// Call the function to display items on page load
