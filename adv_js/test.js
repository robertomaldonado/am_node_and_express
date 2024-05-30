//Spread operator
function SumUp(...numbers) {
  return numbers.reduce((prev, current) => {
    return prev + current;
  });
}

const numbers = [1, 2, 3, 4, 5, 6, 7];

console.log(`Sums: ${SumUp(...numbers)}`);

// /Using tick strings is better than using the concatenation operator

const username = "John";
const age = 23;
const infography = `My name is ${username} and I am ${age} years old.`;

// Primitive data types vs reference data types
//In the example the value gets modified because the object is passed by reference
const person = { name: "John", age: 23 };
function getAdultYears(p) {
  p.age -= 18;
  return p;
}
console.log(getAdultYears(person));
console.log(person);

//In this example the value does not get modified because the value is passed by value
const person2 = { name: "John", age: 23 };
function getAdultYears2(p) {
  return p.age - 18;
}
console.log(getAdultYears2(person2));
console.log(person2);

//Using the original code, we can pass a copy into the function to avoid modifying the original object
const person3 = { name: "John", age: 23 };
function getAdultYears3(p) {
  const copy = { ...p };
  copy.age -= 18;
  return copy;
}
console.log(getAdultYears3(person3));
console.log(person3);
