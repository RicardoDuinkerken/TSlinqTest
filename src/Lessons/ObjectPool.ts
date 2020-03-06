import Monster from "./Monster";
import IcloneAble from "./interfaces/ICloneAble";


class ObjectPool{
    private static _instance: ObjectPool;
    private _availableObjects : IcloneAble[];
    private _startUpSize : number;
    private _object : IcloneAble;
    

    initialize(size: number, object:IcloneAble){
        this._availableObjects = [];
        this._object = object;

        if(this._startUpSize == null)
        this._startUpSize = size;

        for(let i = 0; i<size; i++){
            this._availableObjects.push(object.clone());
        }
    }
        
    public static getInstance(): ObjectPool{
        if(!ObjectPool._instance)
        ObjectPool._instance = new ObjectPool();

        return ObjectPool._instance;
    }

    public retrieve(){
        if(this._availableObjects[0] == null)
        this._availableObjects.push(this._object.clone());

        let first: IcloneAble = this._availableObjects[0];
        this._availableObjects.slice(0,1);
        return first;

    }
}
export default ObjectPool;