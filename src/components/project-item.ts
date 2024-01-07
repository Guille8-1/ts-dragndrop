import { Draggable } from '../models/drag-drop'
import { Project } from '../models/project'
import { AutoBind } from '../decorators/autobind'
import { Component } from './base-components'

//ProjectItem Class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
    private project:Project;

    get persons(){
        if(this.project.people === 1){
            return '1 Person';
        }else{
            return `${this.project.people} Persons`;
        }
    }
    constructor(hostId:string, project:Project){
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }
    @AutoBind
    dragStartHandler(e: DragEvent){
        e.dataTransfer!.setData('text/plain', this.project.id);
        e.dataTransfer!.effectAllowed = 'move';

    }
    dragEndhandlre(_: DragEvent){
        console.log('DragEnds');
    }
    configure(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler)
        this.element.addEventListener('dragend', this.dragEndhandlre)
    }
    renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.description;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.title;

    }
}
