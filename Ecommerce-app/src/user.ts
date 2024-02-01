interface Item {
    id: number;
    nameItem: string;
    priceItem: string;
    thumbnail: string;
    description: string;
}

let user_items: Item[] = [];

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
let current_index: number;

// DOM elements
// let create_Btn = document.querySelector("#create-btn") as HTMLButtonElement;
// let create_Items = document.querySelector(".create-items") as HTMLFormElement;
// let table_Items = document.getElementById("stock-items") as HTMLTableElement;
let name_Item = document.getElementById("item-name") as HTMLInputElement;
let price_Item = document.getElementById("item-price") as HTMLInputElement;
let thumbnail_user = document.getElementById("thumbnail-item") as HTMLInputElement;
let description_user = document.getElementById("item-description") as HTMLInputElement;
let profile_user = document.querySelector("#profile") as HTMLDivElement;
let profile_Img = document.querySelector("#profile-img") as HTMLDivElement;
let user_Name = document.querySelector("#admin-name") as HTMLDivElement;
let cartBtnElement =document.querySelector(".cart-button") as HTMLButtonElement;
let items_Container = document.querySelector('.items-wrapper') as HTMLDivElement;
let cartTable = document.querySelector(".cart-items") as HTMLTableElement;

// Function to display items
function display_Items() {
    console.log("User Items container:", items_Container);


    // Clear existing content in the container
    if (items_Container !== null) {
        items_Container.innerHTML = "";
    } else {
        console.error("No items container found in userpage");
        return;
    }

    user_items.forEach((user_item: Item, index: number) => {
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

        items_Container?.appendChild(user_itemDiv);

    });
};
// Add an event listener to the cart-button
cartBtnElement.addEventListener("click", () => {
    if (items_Container.style.display === "flex") {
        items_Container.style.display = "none";
        cartTable.style.display = "flex";
    } else {
        // Hide user items and show cart items
        items_Container.style.display = "flex";
        cartTable.style.display = "none";
    }
    // Call the displayCart function to update the cart section
    displayCart();
    console.log("ADDED TO CART");
});

saveToLocalStorage1();
display_Items();

// Variable to store the current user's cart
let userCart: Item[] = [];

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
function addToCart(index: number) {
    const selectedItem = user_items[index];
    
    userCart.push(selectedItem);
    saveCartToLocalStorage();
    displayCart();
    countcart();
}

// Function to display items in the cart
function displayCart() {
    if (cartTable) {
        // Clear existing content in the table
        cartTable.innerHTML = "";

        // Create table header
        const headerRow = cartTable.insertRow(0);
        headerRow.innerHTML = "<th>Item Name</th><th>Description</th><th>Price</th><th>Action</th>";

        userCart.forEach((cartItem: Item, index: number) => {
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
            removeButton.style. border = "none";
            removeButton.style. backgroundColor = "lightblue";
            removeButton.addEventListener("click", () => removeFromCart(index));
            cellAction.appendChild(removeButton);
        });

    }
}

// Function to remove an item from the cart
function removeFromCart(index: number) {
    userCart.splice(index, 1);
    saveCartToLocalStorage();
    displayCart()
    countcart();
}

// Event listener for the "Checkout" button
let checkoutButton = document.querySelector(".checkout-btn") as HTMLButtonElement;

// Implement your checkout logic here
checkoutButton.addEventListener("click", () => {
    // Show a confirmation message and clear the cart
    alert("Checkout completed!");
    userCart = [];
    saveCartToLocalStorage();
    displayCart();
    countcart();
});

// Call displayCart after loading cart from local storage
loadCartFromLocalStorage();
displayCart();

let count = document.querySelector(".count") as HTMLSpanElement; 
function countcart() {
    let counter = userCart.length;
    console.log("Number of items in the cart:", counter);
    count.textContent = counter.toString();
}

// orders
document.querySelector("#viewitems-btn")?.addEventListener("click", () => {
    const storedCart = localStorage.getItem("userCart");
    if (storedCart) {
        userCart = JSON.parse(storedCart);
        displayCart();
    }
});


// interface Item {
//     id: number;
//     nameItem: string;
//     priceItem: string;
//     thumbnail: string;
//     description: string;
// }

// let user_items: Item[] = [];

// function saveToLocalStorage1() {
//     localStorage.setItem("user_items", JSON.stringify(user_items));
// }

// // Load existing items from local storage on page load
// document.addEventListener("DOMContentLoaded", () => {
//     const stored_Items = localStorage.getItem("items");
//     if (stored_Items) {
//         user_items = JSON.parse(stored_Items);
//         console.log("Items loaded:", user_items);
//         display_Items();
//     }
// });

// // Variable to store the current index
// let current_index: number;

// // DOM elements
// // let create_Btn = document.querySelector("#create-btn") as HTMLButtonElement;
// // let create_Items = document.querySelector(".create-items") as HTMLFormElement;
// // let table_Items = document.getElementById("stock-items") as HTMLTableElement;
// let name_Item = document.getElementById("item-name") as HTMLInputElement;
// let price_Item = document.getElementById("item-price") as HTMLInputElement;
// let thumbnail_user = document.getElementById("thumbnail-item") as HTMLInputElement;
// let description_user = document.getElementById("item-description") as HTMLInputElement;
// let profile_user = document.querySelector("#profile") as HTMLDivElement;
// let profile_Img = document.querySelector("#profile-img") as HTMLDivElement;
// let user_Name = document.querySelector("#admin-name") as HTMLDivElement;
// let cartBtnElement =document.querySelector(".cart-button") as HTMLButtonElement;
// let items_Container = document.querySelector('.items-wrapper') as HTMLDivElement;
// let cartTable = document.querySelector(".cart-items") as HTMLTableElement;

// // Function to display items
// function display_Items() {
//     console.log("User Items container:", items_Container);


//     // Clear existing content in the container
//     if (items_Container !== null) {
//         items_Container.innerHTML = "";
//     } else {
//         console.error("No items container found in userpage");
//         return;
//     }

//     user_items.forEach((user_item: Item, index: number) => {
//         const user_itemDiv = document.createElement('div');
//         user_itemDiv.className = "items";

//         user_itemDiv.innerHTML = `
//             <div class="image">
//                 <img src="${user_item.thumbnail}" alt="thumbnail" />
//             </div>
//             <h3 id="title">${user_item.nameItem}</h3>
//             <h4 id="price">${user_item.priceItem}</h4>
//             <p id="description">${user_item.description}</p>
//             <div class="actions">
//                 <button class="addtocart-btn" data-index="${index}" onclick="addToCart(${index})">Add to cart</button>
//             </div>
//         `;

//         items_Container?.appendChild(user_itemDiv);

//     });
// };
// // Add an event listener to the cart-button
// cartBtnElement.addEventListener("click", () => {
//     if (items_Container.style.display === "flex") {
//         items_Container.style.display = "none";
//         cartTable.style.display = "flex";
//     } else {
//         // Hide user items and show cart items
//         items_Container.style.display = "flex";
//         cartTable.style.display = "none";
//     }
//     // Call the displayCart function to update the cart section
//     displayCart();
//     console.log("ADDED TO CART");
// });

// saveToLocalStorage1();
// display_Items();

// // Variable to store the current user's cart
// let userCart: Item[] = [];

// function saveCartToLocalStorage() {
//     localStorage.setItem("userCart", JSON.stringify(userCart));
// }

// function loadCartFromLocalStorage() {
//     const storedCart = localStorage.getItem("userCart");
//     if (storedCart) {
//         userCart = JSON.parse(storedCart);
//     }
// }

// // Function to add an item to the cart
// function addToCart(index: number) {
//     const selectedItem = user_items[index];
//     description: string;
//     userCart.push(selectedItem);
//     saveCartToLocalStorage();
//     displayCart();
//     countcart();
// }

// // Function to display items in the cart
// function displayCart() {
//     if (cartTable) {
//         // Clear existing content in the table
//         cartTable.innerHTML = "";

//         // Create table header
//         const headerRow = cartTable.insertRow(0);
//         headerRow.innerHTML = "<th>Item Name</th><th>Description</th><th>Price</th><th>Action</th>";

//         userCart.forEach((cartItem: Item, index: number) => {
//             const cartrow = cartTable.insertRow(-1);
//             cartrow.className = "cart-item";

//             // Create cells for each column
//             // const cellThumbnail = cartrow.insertCell(0);
//             const cellName = cartrow.insertCell(0);
//             const cellDescription = cartrow.insertCell(1);
//             const cellPrice = cartrow.insertCell(2);
//             const cellAction = cartrow.insertCell(3);

//             // // Create a smaller thumbnail image
//             // const smallThumbnail = document.createElement("img");
//             // smallThumbnail.src = cartItem.thumbnail; 
//             // smallThumbnail.alt = "thumbnail";
//             // smallThumbnail.style.width = "50px";  
//             // smallThumbnail.style.height = "50px"; 

//             // // Append the smaller thumbnail to the cell
//             // cellThumbnail.appendChild(smallThumbnail);

//             // Fill cells with item details
//             cellName.textContent = cartItem.nameItem;
//             cellDescription.textContent = cartItem.description;
//             cellPrice.textContent = cartItem.priceItem;

//             // Add a button to remove the item from the cart
//             const removeButton = document.createElement("button");
//             removeButton.textContent = "Remove";
//             removeButton.style.color = "red";
//             removeButton.style. border = "none";
//             removeButton.style. backgroundColor = "lightblue";
//             removeButton.addEventListener("click", () => removeFromCart(index));
//             cellAction.appendChild(removeButton);
//         });

//     }
// }

// // Function to remove an item from the cart
// function removeFromCart(index: number) {
//     userCart.splice(index, 1);
//     saveCartToLocalStorage();
//     displayCart()
//     countcart();
// }

// // Event listener for the "Checkout" button
// let checkoutButton = document.querySelector(".checkout-btn") as HTMLButtonElement;

// // Implement your checkout logic here
// checkoutButton.addEventListener("click", () => {
//     // Show a confirmation message and clear the cart
//     alert("Checkout completed!");
//     userCart = [];
//     saveCartToLocalStorage();
//     displayCart();
//     countcart();
// });

// // Call displayCart after loading cart from local storage
// loadCartFromLocalStorage();
// displayCart();

// let count = document.querySelector(".count") as HTMLSpanElement; 
// function countcart() {
//     let counter = userCart.length;
//     console.log("Number of items in the cart:", counter);
//     count.textContent = counter.toString();
// }

// // orders
// document.querySelector("#viewitems-btn")?.addEventListener("click", () => {
//     const storedCart = localStorage.getItem("userCart");
//     if (storedCart) {
//         userCart = JSON.parse(storedCart);
//         displayCart();
//     }
// });


