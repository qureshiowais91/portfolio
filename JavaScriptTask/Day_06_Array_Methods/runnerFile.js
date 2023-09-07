// Solving problems using array functions on rest countries data (https://restcountries.com/v3.1/all).
// Get all the countries from Asia continent /region using Filter function
// Get all the countries with a population of less than 2 lakhs using Filter function
// Print the following details name, capital, flag using forEach function
// Print the total population of c)es using reduce function
// Print the country which uses US Dollars as currency.

import { printHellowWord } from './index.js';
import { getData } from './index.js';

const BaseURL = 'https://restcountries.com/v3.1/all';

printHellowWord();
const data = await getData(BaseURL);

// Get all the countries from Asia continent /region using Filter function
// console.log(data.filter(element => { return element.continents == 'Asia'}))

// Get all the countries with a population of less than 2 lakhs using Filter function
// console.log(data.filter(element => { return element.population < 200000 }))

// Print the following details name, capital, flag using forEach function
// data.forEach(element=>{console.log(element.name.official,element.capital,element.flag)})

// Print the total population of countries using reduce function
// const populationArr = [];
// data.forEach((element) => {
//   populationArr.push(element.population);
// });

// const total = populationArr.reduce((acc, crr) => {
//   return acc + crr;
// });

// console.log(total);

// Print the country which uses US Dollars as currency.
// const ct =  data.filter((element) => {
//   if (element.currencies) {
//     return Object?.entries(element?.currencies)[0][0] == 'USD';
//   }
// });


// console.log(ct)