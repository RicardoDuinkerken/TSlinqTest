import KeyboardHandler from "./KeyboardHandler";
import MouseHandler from "./MouseHandler";
import TouchHandler from "./TouchHandler";
import GamepadHandler from "./GamepadHandler";


abstract class Input {
    static keyboard: KeyboardHandler;
    static mouse: MouseHandler;
    static touch: TouchHandler;
    static gamepad: GamepadHandler;

    static initialize() {
        Input.keyboard = new KeyboardHandler();
        Input.mouse = new MouseHandler();
        Input.touch = new TouchHandler();
        Input.gamepad = new GamepadHandler();
    }
}

export default Input;
