import { Project, projectStatus } from '../models/project.js'
import { AutoBind } from '../decorators/autobind.js'
import { Component } from './base-components.js'
import { ProjectItem } from './project-item.js'
import { DragTarget } from '../models/drag-drop.js'
import { projectState } from '../state/state.js'


export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
    assignedProject: Project[];

    constructor(private type: 'active'|'finished'){
        super('project-list', 'app', false, `${type}-projects`)
        this.assignedProject = [];

        this.configure();
        this.renderContent();
    }
    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
        listEl.innerHTML= '';
        for(const projectitem of this.assignedProject){
            new ProjectItem(this.element.querySelector('ul')!.id, projectitem);
        }
    }
    @AutoBind
    dragOverHandler(e: DragEvent) {
        if(e.dataTransfer && e.dataTransfer.types[0] === 'text/plain'){
            e.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable')
        }
    }
    @AutoBind
    dropHandler(e: DragEvent) {
        const projectId = e.dataTransfer!.getData('text/plain');
        projectState.moveProject(projectId, this.type === 'active' ? projectStatus.Active : projectStatus.Finished)
    }
    @AutoBind
    dragLeaveHandler(_: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable')
    }
    configure(){
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        
        projectState.addListener((projects:Project[]) =>{
            const relevantProjects = projects.filter(project => {
                if(this.type === 'active'){
                    return project.projectStatus === projectStatus.Active
                }
                return project.projectStatus === projectStatus.Finished
            })
            this.assignedProject = relevantProjects
            this.renderProjects();
        });
    }

    renderContent() {
    const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = 
        this.type.toLocaleUpperCase() + ' PROJECTS';
    }
}
