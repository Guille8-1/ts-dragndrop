
export enum projectStatus {Active, Finished}
//custom Class Project Type
export class Project {
    constructor(
        public id:string, 
        public description:string, 
        public title:string, 
        public people:number, 
        public projectStatus:projectStatus){

    }
}
