/*
----- Add Toogle event for mobile menu -----
*/
document.addEventListener("DOMContentLoaded", function () {
  const myDiv = document.getElementById("hamburger-menu");

  myDiv.addEventListener("click", function () {
    // Toggle the 'active' class on click
    let menu = document.getElementsByClassName("menu")[0];
    menu.classList.toggle("active");
  });
});
/*
----- Fetch data and return product cards -----
*/
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
      .join("");

    // Select the div with ID 'challenges-grid' and set its inner HTML to the generated HTML
    document.getElementById("challenges-grid").innerHTML = productHTML;
    attachEventListenersToButtons();
  })
  .catch((error) => console.error("Error:", error));

/*
----- Add items in local storage on click event -----
*/
function addActiveClassById(elementId) {
  // Get the element by ID
  const element = document.getElementById(elementId);

  // If the element exists, add the 'active' class
  if (element) {
    element.classList.add("active");
    console.log(element);
  }
}

// Initialize an empty array to store product details
let cartItems = [];

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
      count_cart();
      displayCartItems();
      addActiveClassById("cart-box");
      addActiveClassById("count_cart");
    });
  });
}

/*
----- Display cart data from local storage -----
*/

function count_cart() {
  const storedCartItems = localStorage.getItem("cart");
  if (storedCartItems) {
    // Parse the string back into an array
    const cartArray = JSON.parse(storedCartItems);

    document.getElementById("count_cart").innerHTML = cartArray.length;
  } else {
    // If there are no items in the cart, set the count to 0
    document.getElementById("count_cart").innerHTML = 0;
  }
}

function displayCartItems(format) {
  // Retrieve the cart items from localStorage
  const storedCartItems = JSON.parse(localStorage.getItem("cart"));
  let summary = []; // Initialize summary as an empty array

  if (storedCartItems) {
    if (format === "table") {
      // Update the summary for table format
      summary = storedCartItems
        .map((item) => {
          return `
            <tr>
              <td>${item.id}</td>
              <td>${item.name}</td>
              <td>${item.price}</td>
            </tr>`;
        })
        .join("");
    } else {
      // Update the summary for list format
      summary = storedCartItems
        .map((item) => `Id: ${item.id} Title: ${item.name}<br>`)
        .join("");
    }

    let total = storedCartItems.reduce((accumulator, currentItem) => {
      return accumulator + Number(currentItem.price);
    }, 0);

    // Display the summary and total price
    document.getElementById("cart-summary").innerHTML = summary;
    let has_total = document.getElementById("total-price");
    if (has_total) {
      has_total.innerHTML = total;
    }
  }
}
if (document.getElementById("summary")) {
  displayCartItems("table");
  console.log("Test");
}

// Call the function to display items on page load
