/*
*    Advance validation
*/
const messages = require('./message');

const statusCode = ['READY_TO_USE', 'EMPTY_FIELD', 'INCORRECT_PARAMETER_FORMAT', 'PARAMETER_NOT_FILLED'];

class Validation {

    constructor(){

    }

    check = {
        required: (_attribute, _val) => {
            let status = false;
            let message = messages['required'].replace(":attribute", _attribute);
            if(_val != null){
                status = true;
            }
            return {
                status: status,
                message: message
            };
        },
        string: (_attribute, _val) => {
            let status = false;
            let message = messages['string'].replace(":attribute", _attribute);
            if(_val.constructor.name === 'String'){
                status = true;
            }
            return {
                status: status,
                message: message
            };
        },
        numeric: (_attribute, _val) => {
            let status = false;
            let message = messages['numeric'].replace(":attribute", _attribute);
            console.log("========")
            console.log(_val.constructor.name )
            console.log("========")
            if(_val.constructor.name === 'Number'){
                status = true;
            }
            return {
                status: status,
                message: message
            };
        },
    }
    
    create = (_data, _validate, _message) => {
        let attribute = Object.keys(_validate);
        let tempStatus = false;
        let messages = [];
        let status = true;
        
        for(let i = 0; i < attribute.length; i++){
            for(let j = 0; j < _validate[attribute[i]].length; j++){
                tempStatus = this.check[_validate[attribute[i]][j]](attribute[i], _data[attribute[i]]);
                if(!tempStatus.status){
                    status = false;
                    messages.push(tempStatus.message);
                }
            }
        }
        return {
            status: status,
            errors: messages,
        }
    }
}

module.exports = Validation;


