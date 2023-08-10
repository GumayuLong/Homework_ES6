import {Student} from "../models/student.js";
import { Employee } from "../models/employee.js";
import { Customer } from "../models/customer.js";
import { ListPerson } from "../models/listPerson.js"; 

const listPerson = new ListPerson();
const domId = (id) => document.getElementById(id);
let validation = new Validation();

// BTN ADD =====================================================================================================
domId("btnThem").onclick = () => {
	domId("header-title").innerHTML = "Thêm người dùng";
	domId("btnCapNhat").style.display = "none";
	domId("btnThemNguoiDung").style.display = "block";
	resetInput();
	resetThongBao();
	domId("ma").disabled = false;
}

// ADD INPUT FOR MODAL============================================================================================
let addInputToan = `<input type="text" id="diemToan" class="form-control input-sm" placeholder="Điểm toán">
<span class="sp-thongbao" id="tbToan"></span>` ;
let addInputLy = `<input type="text" id="diemLy" class="form-control input-sm" placeholder="Điểm lý">
<span class="sp-thongbao" id="tbLy"></span>` ;
let addInputHoa = `<input type="text" id="diemHoa" class="form-control input-sm" placeholder="Điểm hóa">
<span class="sp-thongbao" id="tbHoa"></span>` ;

let addInputSoNgayLam = `<input type="text" id="soNgayLam" class="form-control input-sm" placeholder="Số ngày làm việc">
<span class="sp-thongbao" id="tbsoNgayLam"></span>` ;
let addInputLuongMotNgay = `<input type="text" id="luongMotNgay" class="form-control input-sm" placeholder="Lương theo ngày">
<span class="sp-thongbao" id="tbLuongMotNgay"></span>` ;

let addInputComName = `<input type="text" id="comName" class="form-control input-sm" placeholder="Tên công ty">
<span class="sp-thongbao" id="tbComName"></span>` ;
let addInputHoaDon = `<input type="text" id="hoaDon" class="form-control input-sm" placeholder="Trị giá hóa đơn">
<span class="sp-thongbao" id="tbHoaDon"></span>` ;
let addInputDanhGia = `<input type="text" id="danhGia" class="form-control input-sm" placeholder="Đánh giá">
<span class="sp-thongbao" id="tbDanhGia"></span>` ;

domId("type").onchange = () => {
	let type = domId("type").value;
	if (type == "Học viên"){
		document.getElementsByClassName("input-group")[7].innerHTML = addInputToan;
		document.getElementsByClassName("input-group")[8].innerHTML = addInputLy;
		document.getElementsByClassName("input-group")[9].innerHTML = addInputHoa;

	} else if (type == "Nhân viên"){
		document.getElementsByClassName("input-group")[7].innerHTML = addInputSoNgayLam;
		document.getElementsByClassName("input-group")[8].innerHTML = addInputLuongMotNgay;
		document.getElementsByClassName("input-group")[9].innerHTML = "";
	} else if (type == "Khách hàng"){
		document.getElementsByClassName("input-group")[7].innerHTML = addInputComName;
		document.getElementsByClassName("input-group")[8].innerHTML = addInputHoaDon;
		document.getElementsByClassName("input-group")[9].innerHTML = addInputDanhGia;
	}
}

const getFormValues = (isAdd) => {
	const name = domId("name").value;
	const address = domId("address").value;
	const id = domId("ma").value;
	const email = domId("email").value;
	const type = domId("type").value;

	let isValid = true;

		// Validation name
		isValid &= validation.checkRong(name, "tbName", "(*) Vui lòng nhập tên");

		// Validation address
		isValid &= validation.checkRong(address, "tbAddress", "(*) Vui lòng nhập địa chỉ");

		// Validation id
		isValid &= validation.checkRong(id, "tbMa", "(*) Vui lòng nhập mã người dùng");

		// Validation email
		isValid &= validation.checkRong(email, "tbEmail", "(*) Vui lòng nhập email");

		// Validation type
		isValid &= validation.typeCheck("type", "tbType", "(*) Vui lòng chọn loại người dùng");

		if (type == "Học viên"){
			const toan = domId("diemToan").value;
			const ly = domId("diemLy").value;
			const hoa = domId("diemHoa").value;

			// Validation toan
			isValid &= validation.checkRong(diemToan, "tbToan", "(*) Vui lòng nhập điểm toán");
			domId("diemToan").style.display = "block";

			if (isValid){
				const student = new Student (name, address, id, email, type, toan, ly, hoa);
				return student;
			}
		} 

		else if (type == "Nhân viên"){
			const soNgay = domId("soNgayLam").value;
			const luongNgay = domId("luongMotNgay").value;
			const employee = new Employee (name, address, id, email, type, soNgay, luongNgay);
			return employee;

		} else if (type == "Khách hàng"){
			const comName = domId("comName").value;
			const hoaDon = domId("hoaDon").value;
			const danhGia = domId("danhGia").value;
			const customer = new Customer (name, address, id, email, type, comName, hoaDon, danhGia);
			return customer;
		}
		
	}

// THÊM NGƯỜI DÙNG =============================================================================================

domId("btnThemNguoiDung").onclick =  () => {
	const person = getFormValues(true);
	if (person){
		listPerson.add(person);
		setLocalStorage();
		renderTable();
		resetInput();
		close();
	}
};

const renderTable = (data = listPerson.listPerson) => {
	const content = data.reduce((total, element) => {
		const {name, address, id, email, type, toan, ly, hoa} = element;
		if (type == "Học viên"){
			const student = new Student (name, address, id, email, type, toan, ly, hoa);
			total += `
			<tr>
				<td>${name}</td>
				<td>${address}</td>
				<td>${id}</td>
				<td>${email}</td>
				<td>${type}</td>
				<td>${student.tinhdiemtrungbinh()}đ</td>
				<td></td>
				<td>
					<button class="btn btn-primary" onclick="openUpdateModal('${id}')" data-toggle="modal" data-target="#myModal">SỬA</button>
					<button onclick="deletePerson('${id}')" class="btn btn-danger" >XÓA</button>
				</td>
			</tr>
		`
		}
		else if (type == "Nhân viên"){
			const {name, address, id, email, type, soNgay, luongNgay} = element;
			const employee = new Employee (name, address, id, email, type, soNgay, luongNgay);
			total += `
			<tr>
				<td>${name}</td>
				<td>${address}</td>
				<td>${id}</td>
				<td>${email}</td>
				<td>${type}</td>
				<td></td>
				<td>${employee.tinhluong()}VNĐ</td>
				<td>
					<button class="btn btn-primary" onclick="openUpdateModal('${id}')" data-toggle="modal" data-target="#myModal">SỬA</button>
					<button onclick="deletePerson('${id}')" class="btn btn-danger" >XÓA</button>
				</td>
			</tr>
		`
		}
		else if (type == "Khách hàng"){
			total += `
			<tr>
				<td>${name}</td>
				<td>${address}</td>
				<td>${id}</td>
				<td>${email}</td>
				<td>${type}</td>
				<td></td>
				<td></td>
				<td>
					<button class="btn btn-primary" onclick="openUpdateModal('${id}')" data-toggle="modal" data-target="#myModal">SỬA</button>
					<button onclick="deletePerson('${
						id
					}')" class="btn btn-danger" >XÓA</button>
				</td>
			</tr>
		`
		}
		
	return total;
	}, "");
	
	domId("tableDanhSach").innerHTML = content;
	// console.log(listPerson);
}

// XÓA NGƯỜI DÙNG THEO ID ======================================================================================

window.deletePerson = (id) => {
	listPerson.delete(id);
	setLocalStorage();
	saveData();
}

// CẬP NHẬT DANH SÁCH NGƯỜI DÙNG ===============================================================================

window.openUpdateModal = (idPerson) => {
	domId("header-title").innerHTML = "Sửa người dùng";
	domId("btnThemNguoiDung").style.display = "none";
	domId("btnCapNhat").style.display = "block";
	const person = listPerson.findById(idPerson);
	const {name, address, id, email, type, toan, ly, hoa, soNgay, luongNgay, comName, hoaDon, danhGia} = person;

	domId("name").value = name;
	domId("address").value = address;
	domId("ma").value = id;
	domId("ma").disabled = true;
	domId("email").value = email;
	domId("type").value = type;

	if (type == "Học viên"){
		document.getElementsByClassName("input-group")[7].innerHTML = addInputToan;
		document.getElementsByClassName("input-group")[8].innerHTML = addInputLy;
		document.getElementsByClassName("input-group")[9].innerHTML = addInputHoa;
		domId("diemToan").value = toan;
		domId("diemLy").value = ly;
		domId("diemHoa").value = hoa;
	}
	else if (type == "Khách hàng"){
		document.getElementsByClassName("input-group")[7].innerHTML = addInputComName;
		document.getElementsByClassName("input-group")[8].innerHTML = addInputHoaDon;
		document.getElementsByClassName("input-group")[9].innerHTML = addInputDanhGia;
		domId("comName").value = comName;
		domId("hoaDon").value = hoaDon;
		domId("danhGia").value = danhGia;
	}
	else if (type == "Nhân viên"){
		document.getElementsByClassName("input-group")[7].innerHTML = addInputSoNgayLam;
		document.getElementsByClassName("input-group")[8].innerHTML = addInputLuongMotNgay;
		document.getElementsByClassName("input-group")[9].innerHTML = "";
		domId("soNgayLam").value = soNgay;
		domId("luongMotNgay").value = luongNgay;
	}
	
	// console.log(person)
}

domId("btnCapNhat").onclick = () => {
	const person = getFormValues();

	listPerson.update(person);
	saveData();
	renderTable();
	// console.log(listPerson);
	close();
	
}

// SẮP XẾP DANH SÁCH HIỂN THỊ THEO LOẠI NGƯỜI DÙNG =============================================================

domId("sapXepLoai").onchange = () => {
	const type = domId("sapXepLoai").value;

	const data = listPerson.filterByType(type);

	console.log(data);

	renderTable(data);
}

// domId("az").onclick = () => {
// 	// const data = listPerson.sapXepAZ(listPerson);
// 	// renderTable(data);
// }

// LƯU DATA TRÊN LOCALSTORAGE ==================================================================================

const saveData = () => {
	setLocalStorage();
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

window.onload = () => {
	// running
	// student.tinhdiemtrungbinh();
	getLocalStorage();
	renderTable();
};

// RESET INPUT AND CLOSE POPUP==========================================================

const resetInput = () => {
	domId("name").value = "";
	domId("address").value = "";
	domId("ma").value = "";
	domId("email").value = "";

	if (domId("type").value == "Học viên"){
		domId("diemToan").value = "";
		domId("diemToan").style.display = "none";
		domId("diemLy").value = "";
		domId("diemLy").style.display = "none";
		domId("diemHoa").value = "";
		domId("diemHoa").style.display = "none"
	}
	else if (domId("type").value == "Nhân viên"){
		domId("soNgayLam").value = "";
		domId("soNgayLam").style.display = "none";
		domId("luongMotNgay").value = "";
		domId("luongMotNgay").style.display = "none";
	}
	else if (domId("type").value == "Khách hàng"){
		domId("comName").value = "";
		domId("comName").style.display = "none";
		domId("hoaDon").value = "";
		domId("hoaDon").style.display = "none";
		domId("danhGia").value = "";
		domId("danhGia").style.display = "none"
	}
	domId("type").value = "";
}

const close = () => {
	domId("btnDong").click();
}

const resetThongBao = () => {
	domId("tbName").style.display = "none";
	domId("tbAddress").style.display = "none";
	domId("tbMa").style.display = "none";
	domId("tbEmail").style.display = "none";
	domId("tbType").style.display = "none";
}