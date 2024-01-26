"use strict";
const createProjectForm = document.querySelector('.createproject');
const projectNameInput = document.querySelector('#name');
const projectDescriptionInput = document.querySelector('#description');
const taskStatusSelect = document.querySelector('#task-status');
const projectsTable = document.querySelector('.projects');
class Project {
    constructor(name, description, status) {
        this.id = Project.projects.length + 1;
        this.name = name;
        this.description = description;
        this.status = status;
        Project.projects.push(this);
    }
    static displayProjects() {
        // Clear existing content
        projectsTable.innerHTML = '';
        // Add heading row
        const headingRow = projectsTable.insertRow();
        headingRow.innerHTML = '<th>No.</th><th>Project Name</th><th>Description</th><th>Status</th>';
        // Add project rows
        Project.projects.forEach((project, index) => {
            const row = projectsTable.insertRow();
            row.insertCell().textContent = `${index + 1}`;
            row.insertCell().textContent = project.name;
            row.insertCell().textContent = project.description;
            row.insertCell().textContent = project.status;
        });
    }
}
Project.projects = [];
document.addEventListener('DOMContentLoaded', () => {
    createProjectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const projectName = projectNameInput.value.trim();
        const projectDescription = projectDescriptionInput.value.trim();
        const taskStatus = taskStatusSelect.value;
        if (projectName && projectDescription && taskStatus) {
            const newProject = new Project(projectName, projectDescription, taskStatus);
            Project.displayProjects();
            // Reset form inputs
            projectNameInput.value = '';
            projectDescriptionInput.value = '';
            taskStatusSelect.value = 'done';
        }
    });
    // Display projects (initially or after page reload)
    Project.displayProjects();
});
