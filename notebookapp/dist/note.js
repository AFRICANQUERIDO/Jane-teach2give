"use strict";
//  let myNoteContainer = document.querySelector(".mynote") as HTMLDivElement;
// let myNotes: any = []
// // Function to retrieve a note by its ID from the 'notes' array
// function saveNoteToLocalStorage() {
//     localStorage.setItem("note", JSON.stringify(myNotes));
//     console.log("save-working")
// }
// function getNoteById(noteId: any) {
//     const storedNotes = localStorage.getItem("notes");
//     if (storedNotes) {
//         const notes = JSON.parse(storedNotes);
//         console.log("All notes exist", notes);
//         const mynote = notes.find(note => note.id == noteId);
//         console.log("mynote", mynote)
//         return mynote;
//     }
//     return null;
// }
// const noteIdToRetrieve = "1";
// const retrievedNote = getNoteById(noteIdToRetrieve);
// console.log("retrieved note", retrievedNote)
// // creating the note dynamically
// if (retrievedNote) {
//     let noteDiv = document.createElement('div');
//     noteDiv.className = "note";
//     noteDiv.innerHTML = `
//         <div class="note-title">
//         <h1>${retrievedNote.nameItem}</h1>
//         </div>
//         <div class="note-content">
//             <p>${retrievedNote.description}.</p>
//             </div>
//             <div class="actions">
//             <button class="edit-btn" data-index="${retrievedNote.id}">Edit</button>
//             <button class="delete-btn" data-index="${retrievedNote.id}">Delete</button>
//         </div>
//             `;
//     myNoteContainer.appendChild(noteDiv);
// }
// // Event delegation for edit and delete buttons
// myNoteContainer.addEventListener("click", (event) => {
//     const target = event.target as HTMLElement;
//     if (target.classList.contains("edit-btn")) {
//         const index = parseInt(target.dataset.index || "0", 10);
//         updateNote(index);
//     } else if (target.classList.contains("delete-btn")) {
//         const index = parseInt(target.dataset.index || "0", 10);
//         deleteNote(index);
//     }
// });
// function deleteNote(index: number) {
//     let confirmDelete = window.confirm("Are you sure you want to delete this task?");
//     if (confirmDelete) {
//         notes.splice(index, 1);
//         saveToLocalStorage();
//         // displayNotes();
//     }
// }
// function updateNote(index: number) {
//     currentindex = index;
//     newNote.style.display = "flex";
//     let selectedItem = notes[index];
//     if (nameItem && description) {
//         nameItem.value = selectedItem.nameItem;
//         description.value = selectedItem.description;
//     }
// }
let myNoteContainer = document.querySelector(".mynote");
document.addEventListener("DOMContentLoaded", () => {
    let urlParams = new URLSearchParams(window.location.search);
    let noteId = urlParams.get("id");
    if (noteId) {
        let retrievedNote = getNoteById(noteId);
        console.log("noteee", retrievedNote);
        if (retrievedNote) {
            updateNoteContainer(retrievedNote);
        }
        else {
            console.error("Note not found");
        }
    }
    else {
        console.error("Note ID not provided in the URL");
    }
});
function getNoteById(noteId) {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        const notes = JSON.parse(storedNotes);
        return notes.find((note) => note.id == noteId);
    }
    return null;
}
function updateNoteContainer(note) {
    if (myNoteContainer) {
        let titleElement = document.createElement("div");
        titleElement.className = "note-title";
        titleElement.textContent = note.nameItem;
        titleElement.contentEditable = "true";
        titleElement.addEventListener("input", () => {
            console.log("text edited");
        });
        let contentElement = document.createElement("div");
        contentElement.className = "note-content";
        contentElement.textContent = note.description;
        contentElement.contentEditable = "true";
        contentElement.addEventListener("input", () => [
            console.log("desc edited")
        ]);
        let actionsElement = document.createElement("div");
        actionsElement.className = "actions";
        let saveChangesBtn = document.createElement("button");
        saveChangesBtn.id = "save-btn";
        saveChangesBtn.innerHTML = `<i class="bi bi-bookmark-check"></i>`;
        saveChangesBtn.addEventListener("click", () => {
            saveChanges(note.id, titleElement.textContent || "", contentElement.textContent || "");
        });
        let deleteButton = document.createElement("button");
        deleteButton.id = "delete-btn";
        deleteButton.innerHTML = `<i class="bi bi-trash"></i>`;
        deleteButton.addEventListener("click", () => {
            let confirmDelete = window.confirm("Are you sure you want to delete this task?");
            if (confirmDelete) {
                deleteNote(note.id);
            }
        });
        actionsElement.appendChild(saveChangesBtn);
        actionsElement.appendChild(deleteButton);
        myNoteContainer.innerHTML = "";
        myNoteContainer.appendChild(titleElement);
        myNoteContainer.appendChild(contentElement);
        myNoteContainer.appendChild(actionsElement);
    }
}
function saveChanges(noteId, newTitle, newContent) {
    let storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        let notes = JSON.parse(storedNotes);
        let updatedNoteIndex = notes.findIndex((note) => note.id === noteId);
        if (updatedNoteIndex !== -1) {
            notes[updatedNoteIndex].nameItem = newTitle;
            notes[updatedNoteIndex].description = newContent;
            localStorage.setItem("notes", JSON.stringify(notes));
            alert("Changes saved!");
        }
        else {
            console.error("Note not found");
        }
    }
}
function deleteNote(noteId) {
    let storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        let notes = JSON.parse(storedNotes);
        let updateNote = notes.filter((note) => note.id != noteId);
        localStorage.setItem("notes", JSON.stringify(updateNote));
        alert("Note deleted");
        window.location.href = 'notebook.html';
    }
}
let backHomeBtn = document.getElementById("home-btn");
backHomeBtn.addEventListener("click", () => {
    window.location.href = 'notebook.html';
});
