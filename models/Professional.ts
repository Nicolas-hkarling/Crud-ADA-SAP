import Person from "./Person";

class Professional extends Person{
    role: string;
    payment: number;

    constructor(id: number, name: string, birthday: string, address: string, role: string, payment: number ){
        super(id, name, birthday, address);
        this.role = role;
        this.payment = payment;

    }
}

export default Professional;