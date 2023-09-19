import Person from "./Person";

class Student extends Person{
    shift: string;
    year: string;
    room: string;
    constructor(id: number, name: string, birthdate:string,address: string, shift: string, year: string, room: string){
        super(id,name, birthdate, address);
        this.shift = shift;
        this.year = year;
        this.room = room;
    }
}

export default Student;