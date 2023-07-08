'use strict';

class View {
  constructor() {
    this.userSelectedElements = document.querySelectorAll('select');
    this.generateButton = document.querySelector('.generate');
    this.textArea = document.getElementById('results');
  }

  displayStringOnElement = (str) => {
    if (typeof(str) != "string") {
      throw new Error('Invalid argument: Expected a String, instead received' + str);
    }
    this.textArea.value = str;
  }

}

class Model {
  constructor() {
    this.PREFIX = 882303;
  }

  // Data Manipulation Methods

  extractElementsToArray = (nodeList) => {
    if (!(nodeList instanceof NodeList)) {
      throw new Error('Invalid argument: Expected a NodeList, intead received' + nodeList)
    }
  
    let arr = [];
    nodeList.forEach(select => arr.push(select.value));
    return arr;
  }

  containsNull = (arr) => {
    return arr.includes('null');
  }

  makeSizeArr = (num) => {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(`${ num }${ i }`);
    }
    return arr;
  }
  
  combineArrayToString = (arr) => {
    if (!(arr instanceof Array)) {
      throw new Error('Invalid argument: Expected an Array, instead received' + arr)
    }
    return arr.join('')
  }

  bindPrefix = (prefix, str) => {
    if (typeof(str) != "string") {
      throw new Error('Invalid argument: Expected a String, instead received' + str)
    }
    return `${ prefix }${ str }`;
  }


  // UPC Check Digit Methods
  addUPCCheckDigit = (num) => {
    let arr = num.toString().split('')
      .map(Number);
  
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

  // Results Formatting Methods

  makeResultsArr = (arr) => {
    let checkedArr = arr.map(el => this.addUPCCheckDigit(el));
    return checkedArr;
  }

  combineArrayWithLineBreaks = (arr) => {
    if (!(arr instanceof Array)) {
      throw new Error('Invalid argument: Expected an Array, instead received' + arr)
    }
  
    return arr.join('\n');
  }

}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  handleGenerateCodes = () => {
    // gather all selected value and make an array

    let userSelectedElementsArray = this.model.extractElementsToArray(this.view.userSelectedElements);

    // check if there's null value, if there is, alert, and returns boolean

    if (this.model.containsNull(userSelectedElementsArray)) {
      window.alert('Please make sure you\'ve selected all options');
    } else {

      // combine the number with the prefixes
      let prefixedString = this.model.bindPrefix(this.model.PREFIX, this.model.combineArrayToString(userSelectedElementsArray));

      // append all sizes and make a array of the UPC codes with sizing

      let arrWithSize = this.model.makeSizeArr(prefixedString);

      // map() => GS1 calc

      let results = this.model.makeResultsArr(arrWithSize);


      // display on UI
      this.view.displayStringOnElement(this.model.combineArrayWithLineBreaks(results));
    }
  }
}

// Entry
const model = new Model();
const view = new View();
const controller = new Controller(model, view);
// when click generate, it gathers all value from select and make an array
view.generateButton.addEventListener('click',controller.handleGenerateCodes);
