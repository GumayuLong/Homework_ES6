const domId = (id) => document.getElementById(id);

function Validation(){
    this.checkRong = function(value, errorId, mess){
        if (value === ""){
            domId(errorId).innerHTML = mess;
			domId(errorId).style.display = "block";
            return false;
        }
			// True
            domId(errorId).innerHTML = "";
			domId(errorId).style.display = "none";
            return true;
    };
    
    this.typeCheck = function (idSelect, errorId, mess) {
		let selectType = document.getElementById(idSelect);
		if (selectType.selectedIndex !== 0) {
			//true
			domId(errorId).innerHTML = "";
			domId(errorId).style.display = "none";

			return true;
		}
			//false
			domId(errorId).innerHTML = mess;
			domId(errorId).style.display = "block";

			return false;
	};  
    
    this.checkNumber = function (value, errorId, mess) {
		let letter = "^[0-9]+$";

		if (value.match(letter)) {
			//true
			domId(errorId).innerHTML = "";
			domId(errorId).style.display = "none";

			return true;
		}
			//false
			domId(errorId).innerHTML = mess;
			domId(errorId).style.display = "block";

			return false;
	};

	// Validation nameProduct
	this.checkProductExist = function (value, errorId, mess, list) {
        let isExist = false;
    
        for (let i = 0; i < list.length; i++) {
            let product = list[i];
            if (product.name === value) {
            isExist = true;
            break;
            }
        }

    if (isExist) {
        domId(errorId).innerHTML = mess;
        domId(errorId).style.display = "block";

        return false;
        }

        domId(errorId).innerHTML = "";
        domId(errorId).style.display = "none";

        return true;
    };
	
	this.checkDoDaiKiTu = function (value, errorId, mess, min, max) {
        if (min <= value.trim() && value.trim() <= max) {
            //true
            domId(errorId).innerHTML = "";
            domId(errorId).style.display = "none";

            return true;
        }

      //false
        domId(errorId).innerHTML = mess;
        domId(errorId).style.display = "block";

        return false;
    };

    this.kiemTraChuoiKiTu = function (value, errorId, mess) {
        let letter =
        "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

        if (value.match(letter)) {
            //true
            domId(errorId).innerHTML = "";
            domId(errorId).style.display = "none";
    
            return true;
        }

      //false
        domId(errorId).innerHTML = mess;
        domId(errorId).style.display = "block";
    
        return false;
        };

        this.kiemTraChuoiKiTuSo = function (value, errorId, mess) {
            let letter = "^[0-9]+$";
    
            if (value.match(letter)) {
                //true
                domId(errorId).innerHTML = "";
                domId(errorId).style.display = "none";
        
                return true;
            }
    
          //false
            domId(errorId).innerHTML = mess;
            domId(errorId).style.display = "block";
        
            return false;
            };

            this.kiemTraKiTuSo = function (value, errorId, mess, min, max) {
                if (min <= value.trim() && value.trim() <= max) {
                    //true
                    domId(errorId).innerHTML = "";
                    domId(errorId).style.display = "none";
        
                    return true;
                }
        
              //false
                domId(errorId).innerHTML = mess;
                domId(errorId).style.display = "block";
        
                return false;
            };

            this.checkPattern = function (value, errorId, mess, letter) {
                if (value.match(letter)) {
                    //true
                    domId(errorId).innerHTML = "";
                    domId(errorId).style.display = "none";
            
                    return true;
                }
            
                //false
                domId(errorId).innerHTML = mess;
                domId(errorId).style.display = "block";
            
                return false;
            };

            this.kiemTraMaTonTai = function (value, errorId, mess, listPerson) {
                let isExist = false;
            
                for (let i = 0; i < listPerson.length; i++) {
                    let person = listPerson[i];
                    if (person.id === value) {
                    isExist = true;
                    break;
                    }
                }
            
                if (isExist) {
                    domId(errorId).innerHTML = mess;
                    domId(errorId).style.display = "block";
            
                    return false;
                }
            
                domId(errorId).innerHTML = "";
                domId(errorId).style.display = "none";
            
                return true;
            };
}