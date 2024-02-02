"use strict";
let submitBtn = document.querySelector("#note-save");
let newNote = document.querySelector(".new-note");
let noteContainer = document.querySelector(".note-container");
let nameItem = document.querySelector("#note-title");
let description = document.querySelector("#note-area");
let noteForm = document.querySelector('#note-form');
let notes = [];
// Handle form submission
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = nameItem.value.trim() != "" && description.value.trim() != "";
    if (isValid) {
        let newNote = {
            id: notes.length + 1,
            nameItem: nameItem.value.trim(),
            description: description.value.trim()
        };
        notes.push(newNote);
        saveToLocalStorage();
        displayNotes();
    }
    else {
        alert("Please fill all the fields");
    }
});
// Toggle using submit btn
if (submitBtn && newNote && noteContainer) {
    submitBtn.addEventListener("click", () => {
        // Toggle the visibility of newNote and noteContainer
        if (newNote.style.display === "flex") {
            newNote.style.display = "none";
            noteContainer.style.display = "flex";
        }
        else {
            newNote.style.display = "flex";
            noteContainer.style.display = "none";
        }
    });
}
let addBtn = document.querySelector("#add-btn");
if (addBtn && newNote && noteContainer) {
    addBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default form submission
        // Toggle the visibility of newNote and noteContainer
        if (newNote.style.display === "none") {
            newNote.style.display = "flex";
            noteContainer.style.display = "none";
        }
        else {
            newNote.style.display = "none";
            noteContainer.style.display = "flex";
        }
    });
}
function saveToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
}
function loadNotesFromLocalStorage() {
    const storedItems = localStorage.getItem("notes");
    if (storedItems) {
        let data = JSON.parse(storedItems);
        data.forEach((note) => {
            notes.push(note);
        });
    }
    else {
        console.log("No notes");
    }
}
let currentindex;
function displayNotes() {
    if (noteContainer !== null) {
        noteContainer.innerHTML = "";
    }
    else {
        console.error("No items container found");
        return;
    }
    notes.forEach((note, index) => {
        let noteDiv = document.createElement('div');
        noteDiv.className = "note";
        noteDiv.innerHTML = `
        <div class="note-title">
        <h1>${note.nameItem}</h1>
        </div>
        <div class="note-content">
            <p>${note.description}.</p>
            </div>
            <div class="actions">
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
            
        `;
        noteContainer.appendChild(noteDiv);
    });
}
// Event delegation for edit and delete buttons
noteContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("edit-btn")) {
        const index = parseInt(target.dataset.index || "0", 10);
        updateNote(index);
    }
    else if (target.classList.contains("delete-btn")) {
        const index = parseInt(target.dataset.index || "0", 10);
        deleteNote(index);
    }
});
function deleteNote(index) {
    let confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
        deleteNote(index);
    }
    notes.splice(index, 1);
    displayNotes();
    saveToLocalStorage();
}
function updateNote(index) {
    currentindex = index;
    newNote.style.display = "flex";
    let selectedItem = notes[index];
    if (nameItem && description) {
        nameItem.value = selectedItem.nameItem;
        description.value = selectedItem.description;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadNotesFromLocalStorage();
    displayNotes();
});
