import { Person } from "../models/person.js";
// import {Student} from "../models/student.js";
// import { Employee } from "../models/employee.js";
// import { Customer } from "../models/customer.js";

const domId = (id) => document.getElementById(id);

// const getFormValues = () => {
// 	let name = domId("name").value;
// 	let address = domId("address").value;
// 	let id = domId("ma").value;
// 	let email = domId("email").value;

// // 	let person = new Person(name, address, id, email);
// // 	return person;
// }



// BTN ADD ========================================================
domId("btnThem").onclick = () => {
domId("header-title").innerHTML = "Thêm người dùng";
let addButton =
`<button id="btnThemSP" type="button" class="btn btn-success" onclick="addPerson()">Thêm</button>
<button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
`;
document.getElementsByClassName("modal-footer")[0].innerHTML = addButton;
} 

const addPerson = () => {
	domId("btnThemSP").onclick = () => {
		console.log("thanhlong");
		// let name = domId("name").value;
		// let address = domId("address").value;
		// let ma = domId("ma").value;
		// let email = domId("email").value;
		// const person = new Person(name, address, ma, email);
		// return person;
	};
}