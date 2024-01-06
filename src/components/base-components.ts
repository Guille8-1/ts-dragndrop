export abstract class Component<T extends HTMLElement, U extends HTMLElement>{
    templateHtmlElement:HTMLTemplateElement
    hostElement:T
    element:U
    constructor(templateId: string, hostElement:string, insertStart:boolean, newElementId?:string){
        this.templateHtmlElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElement)! as T;

        const importNode = document.importNode(this.templateHtmlElement.content , true);
        this.element = importNode.firstElementChild as U;
        if(newElementId){
            this.element.id = newElementId;
        }
        this.attach(insertStart);
    }
    private attach(insertAtStart:boolean) {
        this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin':'beforeend', this.element)
    }
    abstract configure(): void
    abstract renderContent(): void
}