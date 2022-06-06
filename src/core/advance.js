

const check = {
	required: (_val) => {
		let status = false;
		let message = 'harus diisi!';
		if(_val != null){
			status = true;
		}
		return {
			status: status,
			message: message
		};
	},
	string: (_val) => {
		let status = false;
		let message = 'bukan string!';
		if(typeof _val === 'string'){
			status = true;
		}
		return {
			status: status,
			message: message
		};
	},
}

const validation = (_data, _validate) => {

	let validate = Object.keys(_validate);
	let tempStatus = false;
	let messages = [];
	let status = true;
	
	for(let i = 0; i < validate.length; i++){
		for(let j = 0; j < _validate[validate[i]].length; j++){
			tempStatus = check[_validate[validate[i]][j]](_data[validate[i]]);
			if(!tempStatus.status){
				status = false;
				messages.push(validate[i]+ ' ' +tempStatus.message);
			}
		}
	}
	return {
		status: status,
		errors: messages,
	}
	
}

module.exports = validation;


