'use strict';
const selectEls = document.querySelectorAll('select');
const generate = document.querySelector('.generate');
const prefix = 882303;
const textArea = document.getElementById('results');

// gather all selected value and make an array

function isThereNull(arr) {
  return arr.includes('null');
}

function selectedValues() {
  let arr = [];
  selectEls.forEach(select => arr.push(select.value));
  return arr;
}

function bindPrefix(arr) {
  return `${ prefix }${ arr.join('') }`;
}

function makeSizeArr(num) {
  let arr = [];
  for (i = 0; i < 10; i++) {
    arr.push(`${ num }${ i }`);
  }
  return arr;
}

function validate(num) {
  let arr = num.toString().split('')
    .map(Number);
  // console.log(arr); test

  let arrMultiplied = [];
  for (i = 1; i < 12; i++) {
    if (i % 2 !== 0) {
      arrMultiplied.push(arr[i - 1] * 3);
    } else {
      arrMultiplied.push(arr[i - 1]);
    }
  }
  // console.log(arrMultiplied); test
  let sumMultiplied = arrMultiplied.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  // console.log('sum: ' + sumMultiplied); test

  let nearestTen = Math.ceil(sumMultiplied / 10) * 10;

  if (sumMultiplied % 10 === 0) {
    return `${ num }0`;
  } else {
    return `${ num }${ nearestTen - sumMultiplied }`;
  }

}

// console.log(validate(88230397543));


function makeResultsArr(arr) {
  let checkedArr = arr.map(el => validate(el));
  return checkedArr;
}

function display(arr) {
  results = arr.join('\n');
  textArea.value = results;

}

// when click generate, it gathers all value from select and make an array
generate.addEventListener('click', () => {

  // gather all selected value and make an array

  let selected = selectedValues();
  console.log(selected);

  // check if there's null value, if there is, alert, and returns boolean
  let validateNull = isThereNull(selected);
  console.log(`isThereNull: ${ isThereNull(selected) }`);

  // combine the number with the prefixes

  if (validateNull) {
    window.alert('Please make sure you\'ve selected all options');
  } else {

    let prefixed = bindPrefix(selected);
    console.log(prefixed);
    // append all sizes and make a array of the UPC codes with sizing

    let arrWithSize = makeSizeArr(prefixed);
    console.log(arrWithSize);
    // map() => GS1 calc

    let results = makeResultsArr(arrWithSize);
    console.log(results);

    // display on UI

    display(results);
  }
});
/**
 * !! TODO:
 * before generate, check there is no "null" value in all selects
 */