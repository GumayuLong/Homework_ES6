var api = new Service();
var validation = new Validation();

var arrProduct = "";
var isAdd = true;

function getEle(id) {
	return document.getElementById(id);
}

// Lấy thông tin product bằng API
function getListProduct() {
	var promise = api.getListProductApi();

	promise
		.then(function (result) {
			renderUI(result.data);
			// console.log(result.data);
			arrProduct = result.data;
		})
		.catch(function (err) {
			console.log(err);
		});
}

getListProduct();

// Display product
function renderUI(data) {
	var content = "";
	for (var i = 0; i < data.length; i++) {
		var product = data[i];

		content += `
            <tr>
                <td>${i + 1}</td>
                <td>${product.name}</td>
                <td>${product.price}$</td>
                <td>${product.screen}</td>
                <td>${product.backCamera}</td>
                <td>${product.frontCamera}</td>
                <td>
                    <img src="${product.img}" width="50">
                </td>
                <td>${product.desc}</td>
                <td>${product.type}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="updateProduct(${
						product.id
					})">Sửa</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${
						product.id
					})">Xóa</button>
                </td>
            </tr>
        `;
	}
	getEle("tableDanhSach").innerHTML = content;
}

// Add product
function addProduct() {
	isAdd = true;
	var tenSP = getEle("TenSP").value;
	var gia = getEle("GiaSP").value;
	var screen = getEle("manHinh").value;
	var cameraSau = getEle("camerasau").value;
	var cameraTruoc = getEle("cameratruoc").value;
	var hinhAnh = getEle("HinhSP").value;
	var moTa = getEle("MoTa").value;
	var loai = getEle("loaiSP").value;

	var isValid = true;

	if (isAdd == true) {
		// Validation TenSP
		isValid &=
			validation.checkRong(
				tenSP,
				"tbTenSP",
				"(*) Vui lòng nhập tên sản phẩm"
			) &&
			validation.checkProductExist(
				tenSP,
				"tbTenSP",
				"(*) Sản phẩm đã tồn tại",
				arrProduct
			);
	}

	// Validation gia
	isValid &=
		validation.checkRong(gia, "tbGiaSP", "(*) Vui lòng nhập giá tiền") &&
		validation.checkNumber(
			gia,
			"tbGiaSP",
			"(*) Vui lòng nhập ký tự là số"
		) &&
		validation.checkDoDaiKiTu(
			gia,
			"tbGiaSP",
			"(*) Vui lòng nhập giá từ 1 - 9999",
			1,
			9999
		);

	// Validation manHinh
	isValid &= validation.checkRong(
		screen,
		"tbScreen",
		"(*) Vui lòng nhập kích thước màn hình"
	);

	// Validation backCamera
	isValid &= validation.checkRong(
		cameraSau,
		"tbBackCamera",
		"(*) Vui lòng nhập thông số camera sau"
	);

	// Validation frontCamera
	isValid &= validation.checkRong(
		cameraTruoc,
		"tbFrontCamera",
		"(*) Vui lòng nhập thông số camera trước"
	);

	// Validation hinhAnh
	isValid &= validation.checkRong(
		hinhAnh,
		"tbImg",
		"(*) Vui lòng nhập đường dẫn hình ảnh"
	);

	// Validation moTa
	isValid &= validation.checkRong(
		moTa,
		"tbDesc",
		"(*) Vui lòng nhập mô tả sản phẩm"
	);

	// Validation Loai
	isValid &= validation.typeCheck(
		"loaiSP",
		"tbType",
		"(*) Vui lòng chọn loại sản phẩm"
	);

	if (isValid) {
		gia = gia * 1;
		var products = new Product(
			"",
			tenSP,
			gia,
			screen,
			cameraSau,
			cameraTruoc,
			hinhAnh,
			moTa,
			loai
		);
		// console.log(products);
		var promise = api.addProductApi(products);
		promise
			.then(function () {
				getListProduct();
				close();
			})
			.catch(function (err) {
				console.log(err);
			});
	}
	return null;
}

// Delete product
function deleteProduct(id) {
	var promise = api.deleteProductApi(id);
	promise
		.then(function (result) {
			alert(`Delete ${result.data.name} successfully`);
			getListProduct();
		})
		.catch(function (err) {
			console.log(err);
		});
}

//=======================================================================

// function update
// Send request change product to backend
function updateProduct(id) {
	document.getElementById("header-title").innerHTML =
		"Chỉnh sửa sản phẩm";
	var buttonEdit = `<button class="btn btn-warning" onclick="updateUI(${id})">Cập nhật</button>
        <button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
    `;
	document.getElementsByClassName("modal-footer")[0].innerHTML = buttonEdit;

	// Lấy thông tin
	var promise = api.getProductById(id);
	promise
		.then(function (result) {
			resetThongBao();

			getEle("TenSP").value = result.data.name;
            // getEle("TenSP").disabled = true;
			getEle("GiaSP").value = result.data.price;
			getEle("manHinh").value = result.data.screen;
			getEle("camerasau").value = result.data.backCamera;
			getEle("cameratruoc").value = result.data.frontCamera;
			getEle("HinhSP").value = result.data.img;
			getEle("MoTa").value = result.data.desc;
			getEle("loaiSP").value = result.data.type;
		})
		.catch(function (err) {
			console.log(err);
		});
}

// Update product
function updateUI(id) {
	isAdd = false;
	var tenSP = getEle("TenSP").value;
    
	var GiaSP = getEle("GiaSP").value;
	var screen = getEle("manHinh").value;
	var backCamera = getEle("camerasau").value;
	var frontCamera = getEle("cameratruoc").value;
	var Img = getEle("HinhSP").value;
	var Desc = getEle("MoTa").value;
	var Type = getEle("loaiSP").value;

	var isValid = true;

	// Validation TenSP
	isValid &= validation.checkRong(
		tenSP,
		"tbTenSP",
		"(*) Vui lòng nhập tên sản phẩm"
	);
	if (isAdd !== false) {
		validation.checkProductExist(
			tenSP,
			"tbTenSP",
			"(*) Sản phẩm đã tồn tại",
			arrProduct
		);
	}

	// Validation gia
	isValid &=
		validation.checkRong(GiaSP, "tbGiaSP", "(*) Vui lòng nhập giá tiền") &&
		validation.checkNumber(
			GiaSP,
			"tbGiaSP",
			"(*) Vui lòng nhập ký tự là số"
		) &&
		validation.checkDoDaiKiTu(
			GiaSP,
			"tbGiaSP",
			"(*) Vui lòng nhập giá từ 1 - 9999",
			1,
			9999
		);

	// Validation manHinh
	isValid &= validation.checkRong(
		screen,
		"tbScreen",
		"(*) Vui lòng nhập kích thước màn hình"
	);

	// Validation backCamera
	isValid &= validation.checkRong(
		backCamera,
		"tbBackCamera",
		"(*) Vui lòng nhập thông số camera sau"
	);

	// Validation frontCamera
	isValid &= validation.checkRong(
		frontCamera,
		"tbFrontCamera",
		"(*) Vui lòng nhập thông số camera trước"
	);

	// Validation hinhAnh
	isValid &= validation.checkRong(
		Img,
		"tbImg",
		"(*) Vui lòng nhập đường dẫn hình ảnh"
	);

	// Validation moTa
	isValid &= validation.checkRong(
		Desc,
		"tbDesc",
		"(*) Vui lòng nhập mô tả sản phẩm"
	);

	// Validation Loai
	isValid &= validation.typeCheck(
		"loaiSP",
		"tbType",
		"(*) Vui lòng chọn loại sản phẩm"
	);

	if (isValid) {
		var product = new Product(
			id,
			tenSP,
			GiaSP,
			screen,
			backCamera,
			frontCamera,
			Img,
			Desc,
			Type
		);
		var promise = api.updateProductApi(product);
		promise
			.then(function () {
				getListProduct();
				close();
			})
			.catch(function (err) {
				console.log(err);
			});
	}
}

//=========================================================================

// Function search
// search product (arr)
function timKiemProduct(keyword) {
	var mangTimKiem = [];
	for (var i = 0; i < arrProduct.length; i++) {
		var product = arrProduct[i];
		var keywordLowerCase = keyword.toLowerCase();
		var tenProduct = product.name.toLowerCase();
		if (tenProduct.indexOf(keywordLowerCase) !== -1) {
			mangTimKiem.push(product);
		}
	}
	return mangTimKiem;
}

// Search Product
function searchProduct() {
	var txtSearch = getEle("txtSearchProduct").value;
	var mangSearch = timKiemProduct(txtSearch);
	renderUI(mangSearch);
}

// Add event keyup for searchProduct
getEle("txtSearchProduct").addEventListener("keyup", searchProduct);

//================================================================

// Function arrange
function sapXepBeLon(arrange) {
	arrange = arrProduct;
	arrange.sort(function (a, b) {
		return a.price - b.price;
	});
	// console.log(arrProduct);
	renderUI(arrange);
}

function sapXepLonBe(arrange) {
	arrange = arrProduct;
	arrange.sort(function (a, b) {
		return b.price - a.price;
	});
	// console.log(arrProduct);
	renderUI(arrange);
}

//================================================================

// Add buttonAdd
getEle("btnThem").onclick = function () {
	document.getElementById("header-title").innerHTML = "Thêm người dùng";
    
	var buttonAdd = `
        <button id="btnThemSP" type="button" class="btn btn-success" onclick="addProduct()">Thêm</button>
		<button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
    `;
	document.getElementsByClassName("modal-footer")[0].innerHTML = buttonAdd;

	// Reset input
	resetInput();
	resetThongBao();
};

// Auto close Modal
function close() {
	getEle("btnDong").click();
}

// Reset input
function resetInput() {
	// Reset input
	getEle("TenSP").value = "";
	getEle("GiaSP").value = "";
	getEle("manHinh").value = "";
	getEle("camerasau").value = "";
	getEle("cameratruoc").value = "";
	getEle("HinhSP").value = "";
	getEle("MoTa").value = "";
	getEle("loaiSP").value = "";
}

// Reset thông báo
function resetThongBao() {
	// Reset thông báo
	getEle("tbTenSP").style.display = "none";
	getEle("tbGiaSP").style.display = "none";
	getEle("tbScreen").style.display = "none";
	getEle("tbBackCamera").style.display = "none";
	getEle("tbFrontCamera").style.display = "none";
	getEle("tbImg").style.display = "none";
	getEle("tbDesc").style.display = "none";
	getEle("tbType").style.display = "none";
};

