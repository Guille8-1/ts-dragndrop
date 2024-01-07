import { Component } from './base-components' 
import { Validatable, Validation } from '../utilities/validation'
import { AutoBind } from '../decorators/autobind'
import { projectState } from '../state/state'
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement:HTMLInputElement
    descriptionInputElement:HTMLInputElement
    peopleInputElement:HTMLInputElement
    constructor(){
        super('project-input', 'app', true, 'user-input')
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        
        this.configure();
    }
    configure(){
        this.element.addEventListener('submit', this.submitHandler)
    }
    renderContent(): void {}

    private gatherUsrInfo(): [string, string, number] | void {
        const title = this.titleInputElement.value;
        const description = this.descriptionInputElement.value;
        const people = this.peopleInputElement.value;

        //validate info variables
        const titleValidation:Validation = {
            value: title,
            required: true
        }
        const descriptionValidation:Validation = {
            value: description,
            required: true,
            minLenght: 5
        }
        const peopleValidation:Validation = {
            value: +people,
            required: true,
            min: 1,
            max:5
        }


        if(
            !Validatable(titleValidation) ||
            !Validatable(descriptionValidation) ||
            !Validatable(peopleValidation)
        ) {
            alert('Invalid input please try again');
            return
        } else {
            return [title, description, +people]
        }
    }
    private clearForm() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @AutoBind
    private submitHandler (e: Event) {
        e.preventDefault();
        const userInput = this.gatherUsrInfo()
        if(Array.isArray(userInput)){
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearForm();
        }
    }
}