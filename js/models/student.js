import {Person} from "./person.js"

export class Student extends Person {
    constructor(name, address, id, email, type, toan, ly, hoa){
        super(name, address, id, email, type);
        this.toan = toan;
        this.ly = ly;
        this.hoa = hoa;
    }

    tinhdiemtrungbinh(){
        return ((parseFloat(this.toan) + parseFloat(this.ly) + parseFloat(this.hoa)) /3).toFixed(2);
    }
}