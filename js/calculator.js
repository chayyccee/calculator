let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

const buttonClick = (value) => {
  if (isNaN(value)) {
    //this is not a number
    handleSymbol(value);
  } else {
    //this is a number
    handleNumber(value);
  }
  screen.innerText = buffer;
}

const handleSymbol = (symbol) => {
  switch (symbol) {
    case 'C':
    buffer = '0';
    runningTotal = 0;
    break;
    case '=':
      if (previousOperator === null) {
        // you need two numbers to do
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case '+':
    case '−':
    case '×':
    case '÷':
      handleMath(symbol);
      break;
    case '←':
      if (buffer.length === 1) {
        buffer = "0"
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
  }
}

const handleMath = (symbol) => {
  if (buffer === "0") {
    //do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = symbol;

  buffer = "0";
}

const flushOperation = (intBuffer) => {
  //you can use switch
  /*switch (previousOperator) {
    case '+':
    runningTotal += intBuffer;
    break;
  case '-':
}*/
  if (previousOperator === '+'){
    runningTotal += intBuffer;
  } else if (previousOperator === '-') {
    runningTotal -= intBuffer;
  } else if (previousOperator === '×') {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }

}

const handleNumber = (numberString) => {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}


function init() {
  document.querySelector('.calc-buttons')
  .addEventListener('click', function(event) {
    buttonClick(event.target.innerText);
  })
}

init();
