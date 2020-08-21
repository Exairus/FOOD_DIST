"use strict";

//filter

// const names = ["Ivan", "Ann", "Ksenia", "Voldemart"];

// const shortNames = names.filter((name) => {
//     return name.length < 5;
// });

// console.log(shortNames);

// map

// let answers = ["IvAn", "AnnA", "Hello"];

// asnwers = answers.map( item => item.toLowerCase());
// console.log(answers);

// some

// const some = [4, 5, 6];

// // console.log(some.some(item => {
// //     return typeof(item) === 'number';
// // }));

// console.log(some.every(item => typeof(item) === 'number'));


//reduce

// const arr = [4, 5, 1, 3 , 2, 6];

// const res = arr.reduce((sum, current) => sum + current, 3);
// console.log(res);

// const arr = ['apple', 'pear', 'plum'];

// const res = arr.reduce((sum, current) => `${sum}, ${current}`);
// console.log(res);


const obj = {
    ivan: 'persone',
    ann: 'persone',
    dog: 'animal',
    cat: 'cat'
};

const newArr = Object.entries(obj)
.filter(item => {
    return item[1] === 'persone';
}).map(item => item[0]);

console.log(newArr);