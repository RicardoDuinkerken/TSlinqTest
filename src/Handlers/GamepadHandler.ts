import { SimpleEventDispatcher } from "strongly-typed-events";
import _ from "lodash";
import {JoySticks, ControllerButtons} from "./ControllerEnum"


class GamepadHandler{
    public onGamepadConnected = new SimpleEventDispatcher<GamepadEvent>();
    public onGamepadDisconnected = new SimpleEventDispatcher<GamepadEvent>();

    private gamepads: Gamepad[];
    private buttonsCache =  new Map<number, GamepadButton[]>();
    private buttonsStatus = new Map<number, GamepadButton[]>();
    private axisStatus = new Map<number, number>();
    private leftJoystick = new Map<number, number[]>();

    
    constructor(){
        this.gamepads = []
        this.addEventListners();
    }

    public update(){
        let gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

        //clear cacche
        this.buttonsCache.clear(); 
        // move the buttons status from the previous frame to the cache
        this.buttonsStatus.forEach((value: GamepadButton[], key: number) => this.buttonsCache.set(key, value)); 
        //clear button status
        this.buttonsStatus.clear();
        //temp map of all pressed buttons on every connected controller by index
        let pressed = new Map<number, GamepadButton[]>(); 

        //loop trough all connected controllers and check if there actually is one
        for(let i = 0; i<gamepads.length; i++){
            if(gamepads[i] != null){
                // temp array to store all pressed buttons of a specifi controller
                let Buttons: GamepadButton[] = [];
                //loop over all buttons on controller
                for(let j = 0; j < gamepads[i].buttons.length; j++){
                    //add button to temp array
                    Buttons.push(gamepads[i].buttons[j]);
                }




                //add all all  buttons in array to correct controller index
                pressed.set(gamepads[i].index,Buttons);
            }
        }
        this.buttonsStatus = new Map(pressed);
    }

    public getConnectedGamepadsCount() : number{
        return this.gamepads.length;
    }

    public getConnectedGamepads(): Gamepad[]{
        return _.cloneDeep(this.gamepads);
    }

    public getButtonPressed(buttonIndex: ControllerButtons , controllerIndex: number, hold: boolean): boolean{
        let gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        if(gamepads[controllerIndex] == null){
            return false;
        }

        let newPress = false;

        let tempButtonStatus = this.buttonsStatus.get(controllerIndex);
      
        if(tempButtonStatus != undefined)
            newPress = tempButtonStatus[buttonIndex].pressed;

        //check for single press
        if(!hold){
            let tempButtoncache = this.buttonsCache.get(controllerIndex);

            if(tempButtoncache != undefined)
                if(tempButtoncache[buttonIndex].pressed == true)
                    newPress = false;  
        }       
        return newPress;
    }

    public getButtonAxis(buttonIndex: ControllerButtons , controllerIndex: number):number {
        let gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

        if(gamepads[controllerIndex] == null){
            return 0;
        }

        let tempButtonStatus = this.buttonsStatus.get(controllerIndex);
        return tempButtonStatus[buttonIndex].value;
    }

    public getJoystickAxis(stick: JoySticks, controllerIndex: number): number[]{
        let value = [];
        if(stick == JoySticks.LeftStick)
            value = this.leftJoystick.get(controllerIndex)

        if(stick == JoySticks.RightStick)
            value = this.leftJoystick.get(controllerIndex)
        
        return value;
    }

    public

    public getJoyAxis(buttonIndex: number, controllerIndex: number): number{
        let gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        if(!gamepads[controllerIndex]){
            return;
        }

        //navigator.getGamepads
        let gp = gamepads[controllerIndex];
        let axes = gp.axes[buttonIndex];
        return axes;
    }

    private addEventListners(): void{
        window.addEventListener(
            "gamepadconnected", 
            function(this: GamepadHandler, event: GamepadEvent){
                this.updateConnectedGamepads(event, true); 
            }.bind(this)
        );

        window.addEventListener(
            "gamepaddisconnected", 
            function(this: GamepadHandler, event: GamepadEvent){
                this.updateConnectedGamepads(event, false); 
            }.bind(this)

        );
    }

    private updateConnectedGamepads(event: GamepadEvent, connecting: boolean): void{
        let gamepad = event.gamepad;

        if(connecting){
            this.gamepads.push(gamepad);
            this.onGamepadConnected.dispatch(event);
        }
        else{
            this.gamepads.splice(gamepad.index, 1);
            this.onGamepadDisconnected.dispatch(event);
        }
    }

}

export default GamepadHandler;