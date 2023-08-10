import { Person } from "./person.js";

export class Employee extends Person {
    constructor(name, address, id, email, type, soNgay, luongNgay) {
        super(name, address, id, email, type);
        this.soNgay = soNgay;
        this.luongNgay = luongNgay;
    }
    tinhluong() {
        return (parseFloat(this.soNgay) * parseFloat(this.luongNgay));
    }
}

