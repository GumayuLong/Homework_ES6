function Product(
	_id,
	_tenSP,
	_gia,
	_screen,
	_backCamera,
	_frontCamera,
	_hinhAnh,
	_moTa,
	_loaiSP
) {
	this.id = _id;
	this.name = _tenSP;
	this.price = _gia;
	this.screen = _screen;
	this.backCamera = _backCamera;
	this.frontCamera = _frontCamera;
	this.img = _hinhAnh;
	this.desc = _moTa;
	this.type = _loaiSP;
}
