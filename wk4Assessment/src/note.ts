

let myNoteContainer = document.querySelector(".mynote") as HTMLElement;

interface Note {
    id: number;
    nameItem: string;
    description: string;
}

document.addEventListener("DOMContentLoaded", () => {
    let urlParams = new URLSearchParams(window.location.search);
    let noteId = urlParams.get("id");
    
    if (noteId) {
        let retrievedNote = getNoteById(noteId);
        console.log("noteee",retrievedNote)
        if (retrievedNote) {
            updateNoteContainer(retrievedNote);
        } else {
            console.error("Note not found");
        }
    } else {
        console.error("Note ID not provided in the URL");
    }
});

function getNoteById(noteId: string | number): Note | any {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        const notes: Note[] = JSON.parse(storedNotes);
        return notes.find((note) => note.id == noteId);
    }
    return null;
}

function updateNoteContainer(note: Note) {

    if (myNoteContainer) {
        let titleElement = document.createElement("div");
        titleElement.className = "note-title";
        titleElement.textContent = note.nameItem;
        titleElement.contentEditable = "true";
        titleElement.addEventListener("input",()=>{
            console.log("text edited")
        })

        let contentElement = document.createElement("div");
        contentElement.className = "note-content";
        contentElement.textContent = note.description;
        contentElement.contentEditable = "true"
        contentElement.addEventListener("input",()=>[
            console.log("desc edited")
        ])

        let actionsElement = document.createElement("div");
        actionsElement.className = "actions";

        let saveChangesBtn = document.createElement("button") as HTMLButtonElement;
        saveChangesBtn.id = "save-btn";
        saveChangesBtn.innerHTML= `<i class="bi bi-bookmark-check"></i>`
        saveChangesBtn.addEventListener("click", () => {
            saveChanges(note.id, titleElement.textContent || "", contentElement.textContent || "");
        });


        let deleteButton = document.createElement("button") as HTMLButtonElement;
        deleteButton.id = "delete-btn";
        deleteButton.innerHTML = `<i class="bi bi-trash"></i>`
        deleteButton.addEventListener("click",()=>{
            let confirmDelete = window.confirm("Are you sure you want to delete this note?");
            if (confirmDelete) {
                deleteNote(note.id)
                
            }
        })
        
        actionsElement.appendChild(saveChangesBtn);
        actionsElement.appendChild(deleteButton);
        
        myNoteContainer.innerHTML = ""; 
        myNoteContainer.appendChild(titleElement);
        myNoteContainer.appendChild(contentElement);
        myNoteContainer.appendChild(actionsElement);
    }
}

function saveChanges(noteId: number, newTitle: string, newContent: string) {
    let storedNotes = localStorage.getItem("notes");

    if (storedNotes) {
        let notes: Note[] = JSON.parse(storedNotes);
        let updatedNoteIndex = notes.findIndex((note) => note.id === noteId);

        if (updatedNoteIndex !== -1) {
            notes[updatedNoteIndex].nameItem = newTitle;
            notes[updatedNoteIndex].description = newContent;

            localStorage.setItem("notes", JSON.stringify(notes));
            alert("Changes saved!");
        } else {
            console.error("Note not found");
        }
    }
}

function deleteNote(noteId:number) {
  let storedNotes = localStorage.getItem("notes");
  if(storedNotes){
    let notes:Note[] = JSON.parse(storedNotes);
    let updateNote = notes.filter((note)=> note.id != noteId)
    localStorage.setItem("notes", JSON.stringify(updateNote));

    alert("Note deleted")

    window.location.href = 'notebook.html'

    }
}
let backHomeBtn = document.getElementById("home-btn") as HTMLButtonElement;
backHomeBtn.addEventListener("click",()=>{
    window.location.href = 'notebook.html'
})

