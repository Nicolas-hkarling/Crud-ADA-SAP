import Professional from "./Professional";

class Staff extends Professional{
    sector: string

    constructor(id: number, name: string, birthday: string, address: string, role: string, payment: number, sector:string){
        super(id,name,birthday,address,role ,payment)
        this.sector=sector;
    }
}
export default Staff