import { Project, projectStatus } from "../models/project.js";

type Listener<T> = (items:T[]) => void

class State<T> {
    protected listeners: Listener<T>[] = [];
    addListener(listenerFn : Listener<T>){
        this.listeners.push(listenerFn);
    }
}

//Project State Management
export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;
    private constructor() {
        super();
    }

    static getInstance(){
        if(this.instance){return this.instance}
        this.instance = new ProjectState();
        return this.instance;
    }
    
    addProject(title: string, description: string, people: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            people,
            projectStatus.Active
        )
        this.projects.push(newProject);
        this.updateListenres();
    }

    moveProject(projectId:string, newStatus:projectStatus) {
        const subjProject = this.projects.find(p => p.id === projectId);
        if(subjProject && subjProject.projectStatus !== newStatus){
            subjProject.projectStatus = newStatus;
            this.updateListenres();
        }
    }

    private updateListenres(){
        for(const listnerFn of this.listeners){
            listnerFn(this.projects.slice());
        }
    }
}

export const projectState = ProjectState.getInstance();
