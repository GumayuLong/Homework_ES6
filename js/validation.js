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
		var selectType = document.getElementById(idSelect);
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
		var letter = "^[0-9]+$";

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
        var isExist = false;
    
        for (var i = 0; i < list.length; i++) {
            var product = list[i];
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
}