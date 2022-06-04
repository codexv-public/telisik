/**
* melakukan pengecekan pada setiap field apakah memiliki value atau tidak
 * (tidak berlaku untuk data yang bersifat nested, jika data bersifat nested
 * maka hanya akan dilakukan pengecekan pada level pertama)
 * 
 * @param {*} fields 
 * @param {array} requireds 
 * @returns 
 */
const isSubset = (mainArray, checkArray) => checkArray.every(element => mainArray.includes(element));

const simple = (fields, requireds) => {
    if(requireds) {
        if(requireds.constructor.name !== 'Array') {
            return {
                status: false,
                statusCode: 'INCORRECT_PARAMETER_FORMAT',
                message: 'wrong data type, requireds parameter must follow this format: ["name", "age"].'
            };
        }
    }

    let emptyFields = [];
    let emptyKeys = [];

    if(!fields) {
        return {
            status: false,
            statusCode: 'PARAMETER_NOT_FILLED',
            message: 'parameter cannot be empty.'
        };
    }

    if(fields.constructor.name !== 'Array' && fields.constructor.name !== 'Object') {
        return {
            status: false,
            statusCode: 'INCORRECT_PARAMETER_FORMAT',
            message: 'wrong data type, fields parameter must follow this format: {key1: value1, key2: value2} or [{key1a: value1a, key2a: value2a}, {key1b: value1b, key2b: value2b}].'
        };
    }

    let isReady = true;
    if(fields.constructor.name === 'Array') {
        for(let i = 0; i < fields.length; i++) {
            if(fields[i].constructor.name !== 'Object') {
                return {
                    status: false,
                    statusCode: 'INCORRECT_PARAMETER_FORMAT',
                    message: 'wrong data type, fields parameter must follow this format: {key1: value1, key2: value2} or [{key1a: value1a, key2a: value2a}, {key1b: value1b, key2b: value2b}].'
                };
            }
            let tempKeyFields = [];
            for(const [key, value] of Object.entries(fields[i])) {
                if(requireds.includes(key) && !value) {
                    isReady = false;
                    emptyFields.push(key);
                }
                tempKeyFields.push(key);
            }
            if(requireds) {
                if(!isSubset(tempKeyFields, requireds)) {
                    isReady = false;
                    emptyKeys.push(fields[i]);
                }
            }
        }
    }else if(fields.constructor.name === 'Object') {
        let tempKeyFields = [];
        for(const [key, value] of Object.entries(fields)) {
            if(requireds.includes(key) && !value) {
                isReady = false;
                emptyFields.push(key);
            }
            tempKeyFields.push(key);
        }
        if(requireds) {
            if(!isSubset(tempKeyFields, requireds)) {
                isReady = false;
                emptyKeys.push(fields);
            }
        }
    }

    if(!isReady) {
        return {
            status: false,
            statusCode: 'EMPTY_FIELD',
            message: 'there are some empty key or fields.',
            emptyFields: emptyFields,
            emptyKeys: emptyKeys
        };
    }

    return {
        status: true,
        statusCode: 'READY_TO_USE',
        message: 'ready to use.'
    };
}

module.exports = {simple};