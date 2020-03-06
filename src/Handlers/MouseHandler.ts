import { SimpleEventDispatcher } from "strongly-typed-events";
import mouseCode from "./MouseCodeEnum";


class MouseHandler{
    public onMouseDown = new SimpleEventDispatcher<MouseEvent>();
    public onMouseUp = new SimpleEventDispatcher<MouseEvent>();
    public onMouseMove = new SimpleEventDispatcher<MouseEvent>();

    private _buttons = new Map< mouseCode,MouseEvent>();

    constructor(){
        this.addEventListners();
    }

    private addEventListners() :void{
        document.addEventListener(
            "mousedown", 
            function(event){
                this.doOnMouseDown(event); 
            }.bind(this)
        );
        document.addEventListener(
            "mouseup", 
            function(event){
                this.doOnMouseUp(event); 
            }.bind(this)
        );
        document.addEventListener(
            "mousemove", 
            function(event){
                this.doOnMouseMove(event); 
            }.bind(this)
        );
    }

    private doOnMouseDown(event) : void {
        let button = event.which;
        console.log(event);

        if(this._buttons.has(button))
        return;

        this._buttons.set(button, event);
        this.onMouseDown.dispatch(event as MouseEvent);
    }

    private doOnMouseUp(event) : void {
        let button = event.which;

        if(!this._buttons.has(button))
        return;

        this._buttons.delete(button);
        this.onMouseUp.dispatch(event as MouseEvent);
    }

    private doOnMouseMove(event) :void{
        //console.log(event);
    }


}

export default MouseHandler;