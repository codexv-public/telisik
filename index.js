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


const Validation = require('./src/core/advance');

const validation = new Validation();

let advanceData = {
	name: 2
};

let advanceValidate = {
	name: ['required', 'numeric']
};
let advanceMessage = {
	name: {
		required: "The field :attribute not avaible",
		string: "The file :attribute must be string",
		length: "Max string field name is :length",
	}
};

console.log(validation.create(advanceData, advanceValidate, advanceMessage));