let submitBtn = document.querySelector("#note-save") as HTMLButtonElement;
let newNote = document.querySelector(".new-note") as HTMLDivElement;
let noteContainer = document.querySelector(".note-container") as HTMLDivElement;
let nameItem = document.querySelector("#note-title") as HTMLInputElement;
let description = document.querySelector("#note-area") as HTMLInputElement;

// Toggle using submit btn
if (submitBtn && newNote && noteContainer) {
    submitBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Toggle the visibility of newNote and noteContainer
        if (newNote.style.display === "flex") {
            newNote.style.display = "none";
            noteContainer.style.display = "flex";
        } else {
            newNote.style.display = "flex";
            noteContainer.style.display = "none";
        }
    });
}

let addBtn = document.querySelector("#add-btn") as HTMLButtonElement;
if (addBtn && newNote && noteContainer) {
    addBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Toggle the visibility of newNote and noteContainer
        if (newNote.style.display === "none") {
            newNote.style.display = "flex";
            noteContainer.style.display = "none";
        } else {
            newNote.style.display = "none";
            noteContainer.style.display = "flex";
        }
    });
}

interface Note {
    id: number;
    nameItem: string;
    description: string;
}

let notes: Note[] = [];

function saveToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotesFromLocalStorage() {
    const storedItems = localStorage.getItem("notes");
    if (storedItems) {
        notes = JSON.parse(storedItems);
        console.log("Notes loaded:", notes);
    }
}

let currentindex: number;
function displayNotes() {
    if (noteContainer !== null) {
        noteContainer.innerHTML = "";
    } else {
        console.error("No items container found");
        return;
    }

    notes.forEach((note: Note, index: number) => {
        let noteDiv = document.createElement('div');
        noteDiv.className = "note";

        noteDiv.innerHTML = `
            <h3 class="note-title">${note.nameItem}</h3>
            <p>${note.description}.</p>
            <div class="actions">
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;

        noteContainer?.appendChild(noteDiv);
    });
}

// Event delegation for edit and delete buttons
noteContainer?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("edit-btn")) {
        const index = parseInt(target.dataset.index || "0", 10);
        updateNote(index);
    } else if (target.classList.contains("delete-btn")) {
        const index = parseInt(target.dataset.index || "0", 10);
        deleteNote(index);
    }
});
function deleteNote(index: number) {
    notes.splice(index, 1);
    displayNotes();
    saveToLocalStorage();
}

function updateNote(index: number) {
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





// ... (previous code)



// ... (rest of the code)
