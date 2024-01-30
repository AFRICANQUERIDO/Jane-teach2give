"use strict";
// document.addEventListener("DOMContentLoaded", () => {
//     // Load existing items from local storage
//     const storedCart = localStorage.getItem("userCart");
//     if (storedCart) {
//         userCart = JSON.parse(storedCart);
//         displayPendingOrders();
//     }
// });
// interface Item {
//     id: number;
//     nameItem: string;
//     priceItem: string;
//     thumbnail: string;
//     description: string;
//     quantity: number;
//     orderStatus?: string; // New property for order status
// }
// // Function to add an item to the cart
// function addToCart(index: number) {
//     const selectedItem = user_items[index];
//     // Check if the item is already in the cart
//     const existingCartItemIndex = userCart.findIndex(item => item.id === selectedItem.id);
//     if (existingCartItemIndex !== -1) {
//         // If the item is already in the cart, increase the quantity
//         userCart[existingCartItemIndex].quantity += 1;
//     } else {
//         // If the item is not in the cart, add it with quantity 1 and order status "Pending"
//         selectedItem.quantity = 1;
//         selectedItem.orderStatus = "Pending";
//         userCart.push(selectedItem);
//     }
//     saveCartToLocalStorage();
//     displayCart();
// }
// // Function to display pending orders in the admin section
// function displayPendingOrders() {
//     const adminTable = document.getElementById("admin-pending-orders") as HTMLTableElement;
//     if (adminTable) {
//         // Clear existing content in the table
//         adminTable.innerHTML = "";
//         // Create table header
//         const headerRow = adminTable.insertRow(0);
//         headerRow.innerHTML = "<th>Item Name</th><th>Description</th><th>Price</th><th>Quantity</th><th>Status</th>";
//         userCart.forEach((orderItem: Item, index: number) => {
//             // Display only items with "Pending" status
//             if (orderItem.orderStatus === "Pending") {
//                 const orderRow = adminTable.insertRow(-1);
//                 // Create cells for each column
//                 const cellName = orderRow.insertCell(0);
//                 const cellDescription = orderRow.insertCell(1);
//                 const cellPrice = orderRow.insertCell(2);
//                 const cellQuantity = orderRow.insertCell(3);
//                 const cellStatus = orderRow.insertCell(4);
//                 // Fill cells with order details
//                 cellName.textContent = orderItem.nameItem;
//                 cellDescription.textContent = orderItem.description;
//                 cellPrice.textContent = orderItem.priceItem;
//                 cellQuantity.textContent = orderItem.quantity.toString();
//                 cellStatus.textContent = orderItem.orderStatus;
//             }
//         });
//     }
// }
