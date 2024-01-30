"use strict";
var _a;
let user_items = [];
function saveToLocalStorage1() {
    localStorage.setItem("user_items", JSON.stringify(user_items));
}
// Load existing items from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
    const stored_Items = localStorage.getItem("items");
    if (stored_Items) {
        user_items = JSON.parse(stored_Items);
        console.log("Items loaded:", user_items);
        display_Items();
    }
});
// Variable to store the current index
let current_index;
// DOM elements
// let create_Btn = document.querySelector("#create-btn") as HTMLButtonElement;
// let create_Items = document.querySelector(".create-items") as HTMLFormElement;
// let table_Items = document.getElementById("stock-items") as HTMLTableElement;
let name_Item = document.getElementById("item-name");
let price_Item = document.getElementById("item-price");
let thumbnail_user = document.getElementById("thumbnail-item");
let description_user = document.getElementById("item-description");
let profile_user = document.querySelector("#profile");
let profile_Img = document.querySelector("#profile-img");
let user_Name = document.querySelector("#admin-name");
// Function to display items
function display_Items() {
    var _a;
    let items_Container = document.querySelector('.items-wrapper');
    console.log("User Items container:", items_Container);
    // Clear existing content in the container
    if (items_Container !== null) {
        items_Container.innerHTML = "";
    }
    else {
        console.error("No items container found in userpage");
        return;
    }
    user_items.forEach((user_item, index) => {
        const user_itemDiv = document.createElement('div');
        user_itemDiv.className = "items";
        user_itemDiv.innerHTML = `
            <div class="image">
                <img src="${user_item.thumbnail}" alt="thumbnail" />
            </div>
            <h3 id="title">${user_item.nameItem}</h3>
            <h4 id="price">${user_item.priceItem}</h4>
            <p id="description">${user_item.description}</p>
            <div class="actions">
                <button class="addtocart-btn" data-index="${index}" onclick="addToCart(${index})">Add to cart</button>
            </div>
        `;
        items_Container === null || items_Container === void 0 ? void 0 : items_Container.appendChild(user_itemDiv);
    });
    // Add an event listener to the cart-button
    (_a = document.querySelector(".cart-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        if (items_Container.style.display === "flex") {
            items_Container.style.display = "none";
            // cartTable.style.display = "flex";
        }
        else {
            // Hide user items and show cart items
            items_Container.style.display = "flex";
            // cartTable.style.display = "none";
        }
        // Call the displayCart function to update the cart section
        displayCart();
        console.log("ADDED TO CART");
    });
}
;
saveToLocalStorage1();
display_Items();
// Variable to store the current user's cart
let userCart = [];
function saveCartToLocalStorage() {
    localStorage.setItem("userCart", JSON.stringify(userCart));
}
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem("userCart");
    if (storedCart) {
        userCart = JSON.parse(storedCart);
    }
}
// Function to add an item to the cart
function addToCart(index) {
    const selectedItem = user_items[index];
    userCart.push(selectedItem);
    saveCartToLocalStorage();
    displayCart();
}
// Function to display items in the cart
function displayCart() {
    const cartTable = document.getElementById("cart-items");
    if (cartTable) {
        // Clear existing content in the table
        cartTable.innerHTML = "";
        // Create table header
        const headerRow = cartTable.insertRow(0);
        headerRow.innerHTML = "<th>Item Name</th><th>Description</th><th>Price</th><th>Action</th>";
        userCart.forEach((cartItem, index) => {
            const cartrow = cartTable.insertRow(-1);
            cartrow.className = "cart-item";
            // Create cells for each column
            // const cellThumbnail = cartrow.insertCell(0);
            const cellName = cartrow.insertCell(0);
            const cellDescription = cartrow.insertCell(1);
            const cellPrice = cartrow.insertCell(2);
            const cellAction = cartrow.insertCell(3);
            // // Create a smaller thumbnail image
            // const smallThumbnail = document.createElement("img");
            // smallThumbnail.src = cartItem.thumbnail; 
            // smallThumbnail.alt = "thumbnail";
            // smallThumbnail.style.width = "50px";  
            // smallThumbnail.style.height = "50px"; 
            // // Append the smaller thumbnail to the cell
            // cellThumbnail.appendChild(smallThumbnail);
            // Fill cells with item details
            cellName.textContent = cartItem.nameItem;
            cellDescription.textContent = cartItem.description;
            cellPrice.textContent = cartItem.priceItem;
            // Add a button to remove the item from the cart
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.style.color = "red";
            removeButton.style.border = "none";
            removeButton.style.backgroundColor = "lightblue";
            removeButton.addEventListener("click", () => removeFromCart(index));
            cellAction.appendChild(removeButton);
        });
    }
}
// Function to remove an item from the cart
function removeFromCart(index) {
    userCart.splice(index, 1);
    saveCartToLocalStorage();
    displayCart();
}
// Event listener for the "Checkout" button
function checkout() {
    // Implement your checkout logic here
    // Show a confirmation message and clear the cart
    alert("Checkout completed!");
    userCart = [];
    saveCartToLocalStorage();
    displayCart();
}
// Call displayCart after loading cart from local storage
loadCartFromLocalStorage();
displayCart();
// orders
(_a = document.querySelector("#viewitems-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const storedCart = localStorage.getItem("userCart");
    if (storedCart) {
        userCart = JSON.parse(storedCart);
        displayCart();
    }
});
