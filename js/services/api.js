function Service(){
	// Gửi request lên server
	this.getListProductApi = function () {
		var promise = axios({
			url: "https://64c655bb0a25021fde9187fe.mockapi.io/QLSP",
			method: "GET",
		});
		return promise;
	};

	// Thêm sản phẩm
	this.addProductApi = function (product) {
		var promise = axios({
			url: "https://64c655bb0a25021fde9187fe.mockapi.io/QLSP",
			method: "POST",
			data: product,
		});
		return promise;
	};

	// Xóa sản phẩm
	this.deleteProductApi = function (id) {
		var promise = axios({
			url: `https://64c655bb0a25021fde9187fe.mockapi.io/QLSP/${id}`,
			method: "DELETE",
		});
		return promise;
	};

	// Lấy product dựa vào id
    this.getProductById = function (id){
    var promise = axios({
        url: `https://64c655bb0a25021fde9187fe.mockapi.io/QLSP/${id}`,
        method: "GET",
	});
    return promise;
}


	// Update sản phẩm
	this.updateProductApi = function (product) {
		var promise = axios({
			url: `https://64c655bb0a25021fde9187fe.mockapi.io/QLSP/${product.id}`,
			method: "PUT",
			data: product,
		});
		return promise;
	};
}


