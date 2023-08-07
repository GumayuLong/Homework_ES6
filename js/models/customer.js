import { Person } from "./person";

export class Customer extends Person {
    constructor(name, address, id, email, comName, hoaDon, danhGia){
        super(name, address, id, email);
        this.comName = comName;
        this.hoaDon = hoaDon;
        this.danhGia = danhGia;
    }
}