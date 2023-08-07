import { Person } from "./person";

export class Employee extends Person {
    constructor(name, address, id, email, soNgay, luongNgay) {
        super(name, address, id, email);
        this.soNgay = soNgay;
        this.luongNgay = luongNgay;
    }
    tinhLuong () {
        return (soNgay * luongNgay);
    }
}

