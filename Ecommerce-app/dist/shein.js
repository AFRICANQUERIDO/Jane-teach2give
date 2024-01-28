"use strict";
// Variable to store the current index
let currentindex;
// DOM elements
let createBtn = document.querySelector("#create-btn");
let createItems = document.querySelector(".create-items");
let tableItems = document.getElementById("stock-items");
let nameItem = document.getElementById("item-name");
let priceItem = document.getElementById("item-price");
let thumbnail = document.getElementById("thumbnail-item");
let description = document.getElementById("item-description");
let profile = document.querySelector("#profile");
let profileImg = document.querySelector("#profile-img");
let adminName = document.querySelector("#admin-name");
// Array to store items
let items = [];
// Adding event listeners
profileImg.addEventListener("mouseover", function () {
    profileImg.classList.add("rotate-360");
    adminName.style.display = "block";
});
profileImg.addEventListener("mouseout", function () {
    profileImg.classList.remove("rotate-360");
    adminName.style.display = "none";
});
// Function to display items
function displayItems() {
    let itemsContainer = document.querySelector('.items-wrapper');
    console.log("Items container:", itemsContainer);
    // Clear existing content in the container
    if (itemsContainer !== null) {
        itemsContainer.innerHTML = "";
    }
    else {
        console.error("No items container found");
        return;
    }
    items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = "items";
        itemDiv.innerHTML = `
            <div class="image">
                <img src="${item.thumbnail}" alt="thumbnail" />
            </div>
            <h3 id="title">${item.nameItem}</h3>
            <h4 id="price">${item.priceItem}</h4>
            <p id="description">${item.description}</p>
            <div class="actions">
                <button class="edit-btn" data-index="${index}" onclick="updateItem(${index})">Edit</button>
                <button class="delete-btn" data-index="${index}" onclick="deleteItem(${index})">Delete</button>
            </div>
        `;
        itemsContainer === null || itemsContainer === void 0 ? void 0 : itemsContainer.appendChild(itemDiv);
        let submitBtn = document.querySelector("#submit-btn");
        submitBtn.addEventListener("click", () => {
            if (itemsContainer.style.display === "flex") {
                itemsContainer.style.display = "none";
                createItems.style.display = "flex";
            }
            else {
                itemsContainer.style.display = "flex";
                createItems.style.display = "none";
            }
        });
    });
}
// Function to delete an item
function deleteItem(index) {
    items.splice(index, 1);
    displayItems();
    saveToLocalStorage();
}
// Function to update an item
function updateItem(index) {
    currentindex = index;
    createItems.style.display = "flex";
    let selectedItem = items[index];
    if (nameItem && description && thumbnail && priceItem) {
        nameItem.value = selectedItem.nameItem;
        description.value = selectedItem.description;
        thumbnail.value = selectedItem.thumbnail;
        priceItem.value = selectedItem.priceItem;
    }
}
// Function to save items to local storage
function saveToLocalStorage() {
    localStorage.setItem("items", JSON.stringify(items));
}
// Load existing items from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
        items = JSON.parse(storedItems);
        console.log("Items before display:", items);
        displayItems();
    }
});
// Event listener for form submission
if (createItems) {
    createItems.addEventListener("submit", (e) => {
        e.preventDefault();
        if (nameItem.value.trim() !== "" &&
            thumbnail.value.trim() !== "" &&
            priceItem.value.trim() !== "" &&
            description.value.trim() !== "") {
            let newItem = {
                id: items.length + 1,
                nameItem: nameItem.value.trim(),
                thumbnail: thumbnail.value.trim(),
                priceItem: priceItem.value.trim(),
                description: description.value.trim(),
            };
            if (currentindex !== undefined) {
                items.splice(currentindex, 1, newItem);
                currentindex = -1;
            }
            else {
                items.push(newItem);
            }
            nameItem.value = "";
            thumbnail.value = "";
            description.value = "";
            priceItem.value = "";
            createItems.style.display = "none";
            saveToLocalStorage();
        }
        displayItems();
    });
}
// Adding event listener for the create button
if (createBtn) {
    createBtn.addEventListener("click", () => {
        if (createItems) {
            createItems.style.display =
                createItems.style.display === "none" ? "flex" : "none";
        }
    });
}
