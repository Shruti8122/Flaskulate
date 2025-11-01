const expressionDisplay = document.getElementById('expression');
const resultDisplay = document.getElementById('result');
const keypad = document.querySelector('.keypad-grid');

let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let expression = '';

function performCalculation(op, num1, num2) {
  switch (op) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '*': return num1 * num2;
    case '/': return num2 === 0 ? 'Error: Div by 0' : num1 / num2;
    case '**': return Math.pow(num1, num2);
    default: return num2;
  }
}

function allClear() {
  resultDisplay.textContent = '0';
  expressionDisplay.textContent = '';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  expression = '';
}

function clearEntry() {
  let currentValue = resultDisplay.textContent;
  if (currentValue === '0' || currentValue.startsWith('Error')) return;
  currentValue = currentValue.slice(0, -1);
  resultDisplay.textContent = currentValue === '' || currentValue === '-' ? '0' : currentValue;
}

function inputDigit(digit) {
  if (waitingForSecondOperand) {
    resultDisplay.textContent = digit;
    waitingForSecondOperand = false;
  } else {
    if (digit === '.' && resultDisplay.textContent.includes('.')) return;
    resultDisplay.textContent =
      resultDisplay.textContent === '0' && digit !== '.'
        ? digit
        : resultDisplay.textContent + digit;
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(resultDisplay.textContent);
  if (isNaN(inputValue)) return;

  if (operator && !waitingForSecondOperand) {
    let result = performCalculation(operator, firstOperand, inputValue);
    if (typeof result === 'string') {
      resultDisplay.textContent = result;
      firstOperand = null;
      operator = null;
      waitingForSecondOperand = false;
      expression = '';
      expressionDisplay.textContent = '';
      return;
    }
    const formatted = parseFloat(result.toFixed(10).replace(/\.?0+$/, ''));
    resultDisplay.textContent = formatted;
    firstOperand = formatted;
  } else {
    firstOperand = inputValue;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
  if (nextOperator)
    expression += `${inputValue} ${nextOperator} `;
  else
    expression += `${inputValue} =`;

  expressionDisplay.textContent = expression;
}

keypad.addEventListener('click', (e) => {
  const target = e.target;
  if (!target.matches('button')) return;

  const value = target.dataset.value;
  const op = target.dataset.op;
  const action = target.dataset.action;

  if (value) return inputDigit(value);
  if (op) return handleOperator(op);

  if (action === 'calculate') {
    if (firstOperand === null || operator === null) return;
    handleOperator(null);
    operator = null;
    waitingForSecondOperand = false;
    return;
  }

  if (action === 'clear') return allClear();
  if (action === 'reset') return clearEntry();
});
