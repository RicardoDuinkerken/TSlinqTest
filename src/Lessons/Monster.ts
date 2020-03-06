import IcloneAble from "./interfaces/ICloneAble";

class Monster implements IcloneAble{
    public name: string;
    public age: number;
    static index: number = 0;

    constructor(name:string, age:number){
        this.name = name;
        this.age = age;
    }

    public clone(): Monster{
        console.log("cloned")
        let m = new Monster(this.name, this.age);
        m.name = m.name + (Monster.index++);
        return m;
    }   
    
}

export default Monster;