"use strict";
let submitBtn = document.querySelector("#note-save");
let newNote = document.querySelector(".new-note");
let noteContainer = document.querySelector(".note-container");
let nameItem = document.querySelector("#note-title");
let description = document.querySelector("#note-area");
let noteForm = document.querySelector('#note-form');
let noTe = document.querySelector(".note");
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
    // } else {
    //     window.confirm("Please fill all the fields")
    // }
    nameItem.value = "";
    description.value = "";
    newNote.style.display = "none";
});
// Toggle using submit btn
if (newNote && noteContainer) {
    submitBtn.addEventListener("click", () => {
        window.alert("Please fills all finds");
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
        let notetable = document.createElement("tr");
        notetable.className = "noteTable";
        let numbering = document.createElement("td");
        numbering.textContent = `${index + 1}`;
        let nameItem = document.createElement("td");
        nameItem.textContent = note.nameItem;
        // let description = document.createElement("td") as HTMLTableCellElement;
        // description.textContent = note.description;
        let viewAction = document.createElement("button");
        viewAction.textContent = "View";
        viewAction.style.color = "white";
        viewAction.style.backgroundColor = "purple";
        viewAction.style.border = "none";
        viewAction.style.width = "20%";
        viewAction.style.height = "20%";
        viewAction.addEventListener("click", () => {
            window.location.href = `note.html?id=${note.id}`;
        });
        notetable.appendChild(numbering);
        notetable.appendChild(nameItem);
        // notetable.appendChild(description)
        notetable.appendChild(viewAction);
        noTe.appendChild(notetable);
        noteContainer.appendChild(noTe);
        // notetable.textContent=""
    });
    saveToLocalStorage();
}
document.addEventListener("DOMContentLoaded", () => {
    loadNotesFromLocalStorage();
    displayNotes();
});
