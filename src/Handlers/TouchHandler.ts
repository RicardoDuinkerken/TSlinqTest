
import { SimpleEventDispatcher } from "strongly-typed-events";
import _ from "lodash";

class TouchHandler{
    public onTouchStart = new SimpleEventDispatcher<Touch>();
    public onFirstTouch = new SimpleEventDispatcher<Touch>();
    public onTouchEnd = new SimpleEventDispatcher<Touch>();
    public onLastTouch = new SimpleEventDispatcher<Touch>();
    public onTouchMove = new SimpleEventDispatcher<Touch>();
     
    
    //private _touches: Touch[];
    private _touchMap = new Map<number, Touch>();
    private _touchMapCache = new Map<number, Touch>();
    private _firstTouch: boolean;

    private previosDifference:number;

    constructor(){
        //this._touches = [];
        this.previosDifference = -1;
        this._firstTouch = true;
        this.addEventListners();
    }

    public update(){

    }

    public isTouching():boolean {
        return this._touchMap.size >= 1;
    }

    public getTouchCount(): number{
        return this._touchMap.size;
    }

    public getTouchList(){
        return _.cloneDeep(this._touchMap);
    }


    private addEventListners(): void {
        document.addEventListener(
            "touchstart",
            function(this: TouchHandler ,event: TouchEvent) {
                this.doOnTouchStart(event);
            }.bind(this)
        );

        document.addEventListener(
            "touchend",
            function(this: TouchHandler, event: TouchEvent) {
                this.doOnTouchEnd(event);
            }.bind(this)
        );

        document.addEventListener(
            "touchmove",
            function(this: TouchHandler, event: TouchEvent) {
                this.doOnTouchMove(event);
            }.bind(this)
        );
    }

    private doOnTouchStart(event: TouchEvent): void {
        for (let i = 0; i < event.changedTouches.length; i++) {   
            let identifier = event.changedTouches[i].identifier

            this._touchMap.set(identifier ,event.changedTouches[i])

            let touch = this._touchMap.get(identifier)!;

            this.onTouchStart.dispatch(touch);    
            
            if(this._firstTouch){
                this._firstTouch = false;
                this.onFirstTouch.dispatch(touch);
            }

            this._touchMapCache.set(identifier, touch);
        }  
    }

    private doOnTouchEnd(event: TouchEvent){
        console.log(event);
        for (let i = 0; i < event.changedTouches.length; i++) {
            let identifier = event.changedTouches[i].identifier
            let touch = this._touchMap.get(identifier)!;
            
            this.onTouchEnd.dispatch(touch);
            
            this._touchMap.delete(identifier);
            this._touchMapCache.delete(identifier);
            this.previosDifference = -1

            if(this._touchMap.size == 0){ 
                this.onLastTouch.dispatch(touch);
                this._firstTouch = true;
            }
        } 
    }

    private doOnTouchMove(event: TouchEvent){

        for (let i = 0; i < event.changedTouches.length; i++) {
            let identifier = event.changedTouches[i].identifier;
            let touch = event.changedTouches[i];
            this._touchMap.set(identifier, touch);
            this.onTouchMove.dispatch(event.changedTouches[i]);

            if(this._touchMapCache.size == 2){
                this.CheckPinch();
            }
            this._touchMapCache.set(identifier, touch);          
        }
    }

    private CheckPinch(): void{
        let positions:number[] = [];
        this._touchMapCache.forEach(Element => positions.push(Element.clientX));

        let currentDifference = Math.hypot(positions[0], positions[1]);
        console.log(currentDifference);

        if(this.previosDifference > 0){
            if(currentDifference > this.previosDifference){
                //console.log("zoom in")
            }
            if(currentDifference < this.previosDifference){
                //console.log("zoom out")
            }
        }
        this.previosDifference = currentDifference;
    }

}

export default TouchHandler; 