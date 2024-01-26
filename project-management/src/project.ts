const createProjectForm = document.querySelector('.createproject') as HTMLFormElement;
const projectNameInput = document.querySelector('#name') as HTMLInputElement;
const projectDescriptionInput = document.querySelector('#description') as HTMLInputElement;
const taskStatusSelect = document.querySelector('#task-status') as HTMLSelectElement;
const projectsTable = document.querySelector('.projects') as HTMLTableElement;

class Project {
    static projects: Project[] = [];

    id: number;
    name: string;
    description: string;
    status: string;

    constructor(name: string, description: string, status: string) {
        this.id = Project.projects.length + 1;
        this.name = name;
        this.description = description;
        this.status = status;
        Project.projects.push(this);
    }

    static displayProjects(): void {
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
