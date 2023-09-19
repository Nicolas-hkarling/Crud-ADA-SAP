import Professional from "./Professional";

class Teacher extends Professional{
    subject: string

    constructor(id: number, name: string, birthday: string, address: string, role: string,  payment: number, subject:string){
        super(id,name,birthday,address,role ,payment)
        this.subject=subject;
    }
}
export default Teacher