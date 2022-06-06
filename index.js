// test
const {simple} = require('./src/core/simple');

let data = {
    name: 'john doe',
    age: 21
};
let requireds = ['name'];
console.log(simple(data, requireds))

data = {
    name: 'john doe',
    age: null
};
requireds = ['name', 'age'];
console.log(simple(data, requireds))

data = [
    {
        name: 'samantha',
        age: 23
    },
    {
        name: 'john doe',
        age: null
    }
];
requireds = ['name', 'age'];
console.log(simple(data, requireds))

data = [
    {
        name: 'samantha',
        age: 23
    },
    {
        name: 'john doe'
    }
];
requireds = ['name', 'age'];
console.log(simple(data, requireds))



// advance validation


const validation = require('./src/core/advance');


let advanceData = {
	// name: 'aka'
};

let advanceValidate = {
	name: ['required', 'string']
}

console.log(validation(advanceData, advanceValidate))