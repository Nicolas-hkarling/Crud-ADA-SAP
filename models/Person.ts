class Person {
    id: number;
    name: string;
    birthdate: string;
    address: string;

    constructor(id: number, name: string, birthdate: string, address: string){
        this.id = id;
        this.name = name;
        this.birthdate = birthdate;
        this.address = address
    }
}

export default Person;