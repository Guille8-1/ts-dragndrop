   //interfacte for drag and drop
export interface Draggable {
    dragStartHandler(e: DragEvent) :void;
    dragEndhandlre(e: DragEvent):void;
}
// interface dragTarget
export interface DragTarget {
    dragOverHandler(e:DragEvent):void;
    dropHandler(e:DragEvent):void;
    dragLeaveHandler(e:DragEvent):void;
}

