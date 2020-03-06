import { Key } from 'ts-keycode-enum';
import { SimpleEventDispatcher} from "strongly-typed-events";

class KeyboardHandler{
    public keys = new Map<Key, KeyboardEvent>();
    public onKeyDown = new SimpleEventDispatcher<KeyboardEvent>();
    public onKeyUp = new SimpleEventDispatcher<KeyboardEvent>();
    public onKeyPressed = new SimpleEventDispatcher<KeyboardEvent>()
    //public onKeyPressed = new EventDispatcher<KeyboardEvent, Key>();
    //public onKeyDown = new SimpleEventDispatcher<Key>();

    constructor(){
        this.addEventListners();
    }


    private addEventListners() :void {
        document.addEventListener(
            "keydown", 
            function(event){
                this.doOnKeyDown(event); 
            }.bind(this)
        );
        document.addEventListener(
            "keyup",
            function(event) {
                this.doOnKeyUp(event);
            }.bind(this)
        );
        
    }

    private doOnKeyDown(event) : void {
        let keyCode = event.keyCode

        //if (this.keys.has(keyCode)) 
            //return;

        this.keys.set(keyCode, event);
        //this.onKeyDown.dispatch(keyCode as Key);
        //this.onKeyPressed.dispatch(event as KeyboardEvent, keyCode as Key);
        this.onKeyDown.dispatch(event as KeyboardEvent);
        //console.log("key pressed = " + Key[keyCode]);
        //console.log(this.keys.get(Key.Enter));  
    }

    private doOnKeyUp(event) : void
    {
        let keyCode = event.keyCode

        if (!this.keys.has(keyCode))
            return;

        this.keys.delete(keyCode);
        this.onKeyUp.dispatch(event as KeyboardEvent);
        //console.log("key released = " + Key[keyCode]);
        this.update();
    }

    public update(){
        if(this.keys.size > 0)
        this.keys.forEach((value: KeyboardEvent) => this.onKeyPressed.dispatch(value));
    }

    

    public getKey(keyCode: Key): boolean{
        return this.keys.has(keyCode) 
    }

    public getKeyDown(keyCode: Key): boolean{
        if(this.keys.has(keyCode)){
        return(this.keys.get(keyCode).repeat ? false : true)
    }
        return false;
    }

}

export default KeyboardHandler;