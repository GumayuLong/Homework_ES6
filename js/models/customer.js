import { Person } from "./person.js";

export class Customer extends Person {
    constructor(name, address, id, email, type, comName, hoaDon, danhGia){
        super(name, address, id, email, type);
        this.comName = comName;
        this.hoaDon = hoaDon;
        this.danhGia = danhGia;
    }
}