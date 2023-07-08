'use strict';




// gather all selected value and make an array

// View
const userSelectedElements = document.querySelectorAll('select');
const generate = document.querySelector('.generate');
const textArea = document.getElementById('results');

function combineArrayWithLineBreaks(arr) {
  if (!(arr instanceof Array)) {
    throw new Error('Invalid argument: Expected an Array, instead received' + arr)
  }

  return arr.join('\n');
}

function displayStringOnElement(element, str) {
  if (typeof(str) != "string") {
    throw new Error('Invalid argument: Expected a String, instead received' + str);
  }

  if (!(element instanceof HTMLElement)) {
    throw new Error('Invalid argument: Expected a HTML element, instead received' + element);
  }

  textArea.value = str;
}


// Model

const PREFIX = 882303;

function extractElementsToArray(nodeList) {
  if (!(nodeList instanceof NodeList)) {
    throw new Error('Invalid argument: Expected a NodeList, intead received' + nodeList)
  }

  let arr = [];
  nodeList.forEach(select => arr.push(select.value));
  return arr;
}

function containsNull(arr) {
  return arr.includes('null');
}

function makeSizeArr(num) {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(`${ num }${ i }`);
  }
  return arr;
}

function combineArrayToString(arr) {
  if (!(arr instanceof Array)) {
    throw new Error('Invalid argument: Expected an Array, instead received' + arr)
  }
  return arr.join('')
}

function bindPrefix(prefix, str) {
  if (typeof(str) != "string") {
    throw new Error('Invalid argument: Expected a String, instead received' + str)
  }
  return `${ prefix }${ str }`;
}

function validate(num) {
  let arr = num.toString().split('')
    .map(Number);
  // console.log(arr); test

  let arrMultiplied = [];
  for (let i = 1; i < 12; i++) {
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

// Entry

// when click generate, it gathers all value from select and make an array
generate.addEventListener('click', () => {

  // gather all selected value and make an array

  let userSelectedElementsArray = extractElementsToArray(userSelectedElements);

  // check if there's null value, if there is, alert, and returns boolean

  if (containsNull(userSelectedElementsArray)) {
    window.alert('Please make sure you\'ve selected all options');
  } else {

    // combine the number with the prefixes
    let prefixedString = bindPrefix(PREFIX, combineArrayToString(userSelectedElementsArray));
    console.log(prefixedString);
    // append all sizes and make a array of the UPC codes with sizing

    let arrWithSize = makeSizeArr(prefixedString);
    console.log(arrWithSize);
    // map() => GS1 calc

    let results = makeResultsArr(arrWithSize);
    console.log(results);

    // display on UI



    displayStringOnElement(textArea, combineArrayWithLineBreaks(results));
  }
});
