import {Student} from "../models/student.js";
import { Employee } from "../models/employee.js";
import { Customer } from "../models/customer.js";
import { ListPerson } from "../models/listPerson.js"; 

const listPerson = new ListPerson();
const domId = (id) => document.getElementById(id);

// BTN ADD ========================================================
domId("btnThem").onclick = () => {
domId("header-title").innerHTML = "Thêm người dùng";
// let addButton =
// `<button id="btnThemNguoiDung" type="button" class="btn btn-success">Thêm</button>
// <button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
// `;
// document.getElementsByClassName("modal-footer")[0].innerHTML = addButton;
}

// ADD INPUT FOR MODAL
let addInputToan = `<input type="text" id="diemToan" class="form-control input-sm" placeholder="Điểm toán">` ;
let addInputLy = `<input type="text" id="diemLy" class="form-control input-sm" placeholder="Điểm lý">` ;
let addInputHoa = `<input type="text" id="diemHoa" class="form-control input-sm" placeholder="Điểm hóa">` ;

let addInputSoNgayLam = `<input type="text" id="soNgayLam" class="form-control input-sm" placeholder="Số ngày làm việc">` ;
let addInputLuongMotNgay = `<input type="text" id="luongMotNgay" class="form-control input-sm" placeholder="Lương theo ngày">` ;

let addInputComName = `<input type="text" id="comName" class="form-control input-sm" placeholder="Tên công ty">` ;
let addInputHoaDon = `<input type="text" id="hoaDon" class="form-control input-sm" placeholder="Trị giá hóa đơn">` ;
let addInputDanhGia = `<input type="text" id="danhGia" class="form-control input-sm" placeholder="Đánh giá">` ;

domId("type").onchange = () => {
	let type = domId("type").value;
	if (type == "Học viên"){
		document.getElementsByClassName("input-group")[6].innerHTML = addInputToan;
		document.getElementsByClassName("input-group")[7].innerHTML = addInputLy;
		document.getElementsByClassName("input-group")[8].innerHTML = addInputHoa;

	} else if (type == "Nhân viên"){
		document.getElementsByClassName("input-group")[6].innerHTML = addInputSoNgayLam;
		document.getElementsByClassName("input-group")[7].innerHTML = addInputLuongMotNgay;
		document.getElementsByClassName("input-group")[8].innerHTML = "";
	} else if (type == "Khách hàng"){
		document.getElementsByClassName("input-group")[6].innerHTML = addInputComName;
		document.getElementsByClassName("input-group")[7].innerHTML = addInputHoaDon;
		document.getElementsByClassName("input-group")[8].innerHTML = addInputDanhGia;
	}
}


domId("btnThemNguoiDung").onclick =  () => {
	const name = domId("name").value;
	const address = domId("address").value;
	const id = domId("ma").value;
	const email = domId("email").value;
	const type = domId("type").value;
		if (type == "Học viên"){
			const toan = domId("diemToan").value;
			const ly = domId("diemLy").value;
			const hoa = domId("diemHoa").value;
			const student = new Student (name, address, id, email, type, toan, ly, hoa);
			listPerson.addStudent(student);
			// console.log(student);
		} 
		else if (type == "Nhân viên"){
			const soNgayLam = domId("soNgayLam").value;
			const luongMotNgay = domId("luongMotNgay").value;
			const employee = new Employee (name, address, id, email, type, soNgayLam, luongMotNgay);
			listPerson.addEmployee(employee);
			// console.log(employee)

		} else if (type == "Khách hàng"){
			const comName = domId("comName").value;
			const hoaDon = domId("hoaDon").value;
			const danhGia = domId("danhGia").value;
			const customer = new Customer (name, address, id, email, type, comName, hoaDon, danhGia);
			listPerson.addCustomer(customer);
			// console.log(customer);
		}
		// setLocalStorage();
		renderTable();
		resetInput();
		close();
};

const renderTable = () => {
	const content = listPerson.listPerson.reduce((total, element) => {
		if (element.type == "Học viên"){
			total += `
			<tr>
				<td>${element.name}</td>
				<td>${element.address}</td>
				<td>${element.id}</td>
				<td>${element.email}</td>
				<td>${element.type}</td>
				<td>${element.tinhdiemtrungbinh()}đ</td>
				<td></td>
				<td>
					<button class="btn btn-primary" >SỬA</button>
					<button onclick="deletePerson('${
					element.id
					}')" class="btn btn-danger" >XÓA</button>
				</td>
			</tr>
		`
		}
		else if (element.type == "Nhân viên"){
			total += `
			<tr>
				<td>${element.name}</td>
				<td>${element.address}</td>
				<td>${element.id}</td>
				<td>${element.email}</td>
				<td>${element.type}</td>
				<td></td>
				<td>${element.tinhLuong()}VNĐ</td>
				<td>
					<button class="btn btn-primary" >SỬA</button>
					<button onclick="deletePerson('${
					element.id
					}')" class="btn btn-danger" >XÓA</button>
				</td>
			</tr>
		`
		}
		
	return total;
	}, "");
	
	domId("tableDanhSach").innerHTML = content;
}

window.deletePerson = (id) => {
	listPerson.delete(id);
	// setLocalStorage();
	renderTable();
}

const setLocalStorage = () => {
	const stringify = JSON.stringify(listPerson.listPerson);

	localStorage.setItem("PERSON_LIST_KEY", stringify);
};

const getLocalStorage = () => {
	const stringify = localStorage.getItem("PERSON_LIST_KEY");

	if (stringify) {
		listPerson.listPerson = JSON.parse(stringify);
	}
};

// window.onload = () => {
// 	// running
// 	getLocalStorage();
// 	renderTable();
// };

// RESET INPUT AND CLOSE POPUP==========================================================

const resetInput = () => {
	domId("name").value = "";
	domId("address").value = "";
	domId("ma").value = "";
	domId("email").value = "";
	domId("type").value = "";

	domId("diemToan").value = "";
	domId("diemToan").style.display = "none";
	domId("diemLy").value = "";
	domId("diemLy").style.display = "none";
	domId("diemHoa").value = "";
	domId("diemHoa").style.display = "none"
}

const close = () => {
	domId("btnDong").click();
}