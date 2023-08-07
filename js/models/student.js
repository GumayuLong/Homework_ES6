import {Person} from "./person"

export class Student extends Person {
    constructor(name, address, id, email, toan, ly, hoa){
        super(name, address, id, email);
        this.toan = toan;
        this.ly = ly;
        this.hoa = hoa;
    }

    tinhdiemtrungbinh(){
        return ((toan, ly, hoa) /3);
    }
}