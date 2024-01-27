"use strict";
let toggleform = document.querySelector('#toggleform');
let createProjectForm = document.querySelector('.createprojectform');
let taskname = document.querySelector('#project_name');
let description = document.querySelector('#description');
let endDate = document.querySelector('#project_dateend');
let startDate = document.querySelector('#project_datestart');
let taskStatus = document.querySelector('#task-status');
let projectsTable = document.querySelector('.projects');
let createtaskbtn = document.querySelector('#submit-btn');
// currentProject index
let currentindex;
toggleform.addEventListener("click", (() => {
    if (createProjectForm.style.display == 'none') {
        createProjectForm.style.display = 'flex';
        toggleform.textContent = 'Close Form';
        toggleform.style.backgroundColor = 'red';
    }
    else {
        createProjectForm.style.display = 'none';
        toggleform.textContent = 'Add Project';
        toggleform.style.backgroundColor = '#0c63dd';
    }
}));
let Projects = [];
window.addEventListener("load", () => {
    const storedProjects = localStorage.getItem('Projects');
    if (storedProjects) {
        Projects = JSON.parse(storedProjects);
        instance.displayProjects(); // Display the loaded projects
    }
});
// Event listener for the project form submission
createProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let project = taskname.value.trim() != "" && description.value.trim() != "" && startDate.value.trim() != ""
        && endDate.value.trim() != "" && taskStatus.value.trim() != "";
    if (project) {
        let ProjectDetails = {
            id: Projects.length + 1,
            taskname: taskname.value.trim(),
            description: description.value.trim(),
            startDate: startDate.value.trim(),
            endDate: endDate.value.trim(),
            taskStatus: taskStatus.value.trim()
        };
        if (currentindex !== undefined) {
            Projects.splice(currentindex, 1, ProjectDetails);
        }
        else {
            Projects.push(ProjectDetails);
        }
        instance.displayProjects();
        taskname.value = "";
        description.value = "";
        startDate.value = "";
        endDate.value = "";
        taskStatus.value = "";
        createProjectForm.style.display = 'none';
        toggleform.textContent = 'Add Project';
        toggleform.style.backgroundColor = '#0c63dd';
        localStorage.setItem('Projects', JSON.stringify(Projects));
    }
});
class ProjectActions {
    displayProjects() {
        let allProjects = document.querySelectorAll('.projects .project');
        allProjects.forEach(el => {
            el.remove();
        });
        Projects.forEach((project, index) => {
            let projectRow = document.createElement('tr');
            projectRow.className = "project";
            let indexing = document.createElement('td');
            indexing.textContent = `${index + 1}`;
            let tasknameCell = document.createElement('td');
            tasknameCell.textContent = project.taskname;
            let descriptionCell = document.createElement('td');
            descriptionCell.textContent = project.description;
            let startDateCell = document.createElement('td');
            startDateCell.textContent = project.startDate;
            let endDateCell = document.createElement('td');
            endDateCell.textContent = project.endDate;
            let taskStatusCell = document.createElement('td');
            taskStatusCell.textContent = project.taskStatus;
            // createtaskbtn.addEventListener("click",()=>{
            //     if (createProjectForm.style.display =='none'){
            //         createProjectForm.style.display ='none';
            //     }
            // })
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Delete";
            deleteBtn.id = "delete";
            deleteBtn.style.backgroundColor = 'red';
            deleteBtn.addEventListener('click', () => {
                let confirmDelete = window.confirm("Are you sure you want to delete this project?");
                if (confirmDelete) {
                    this.deleteProject(index);
                }
            });
            let updateBtn = document.createElement('button');
            updateBtn.textContent = "Update";
            updateBtn.id = "update";
            updateBtn.style.backgroundColor = 'purple';
            updateBtn.addEventListener('click', () => {
                this.updateProject(index);
            });
            projectRow.appendChild(indexing);
            projectRow.appendChild(tasknameCell);
            projectRow.appendChild(descriptionCell);
            projectRow.appendChild(startDateCell);
            projectRow.appendChild(endDateCell);
            projectRow.appendChild(taskStatusCell);
            projectRow.appendChild(deleteBtn);
            projectRow.appendChild(updateBtn);
            projectsTable.appendChild(projectRow);
        });
    }
    deleteProject(index) {
        Projects.splice(index, 1);
        this.displayProjects();
    }
    updateProject(index) {
        currentindex = index;
        createProjectForm.style.display = 'flex';
        let selectedProject = Projects[index];
        taskname.value = selectedProject.taskname;
        description.value = selectedProject.description;
        startDate.value = selectedProject.startDate;
        endDate.value = selectedProject.endDate;
        taskStatus.value = selectedProject.taskStatus;
    }
}
let instance = new ProjectActions();
instance.displayProjects();
