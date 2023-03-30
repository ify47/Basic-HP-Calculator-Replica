const allBtns = document.querySelectorAll('.btn');
const prevValue = document.querySelector('.previus-Num');
const displayValue = document.querySelector('.display-Num');
const numbersBtns = document.querySelectorAll('.number');
const operationalBtns = document.querySelectorAll('.operational');
const backSpace = document.getElementById('delete');
const clean = document.getElementById('clear');
const equals = document.getElementById('equals');
const clearBtn = document.querySelector('.clear-history');
const history = document.querySelector('.previus-hist');



let firstNumber;
let secondNumber;
let operator;

//select the numbers

numbersBtns.forEach((numBtn) => {
    numBtn.addEventListener('click', ()=> {
        //if there's already a . in the display, do not add another one
        if((numBtn.innerText == '.') && displayValue.innerText.includes('.')) return;
        else if(displayValue.innerText.length > 9) return;
        //if there's no operator selected yet, that means that this is the first number, so I assign all the inputs to the first number
        else if(!operator){
            displayValue.innerText += numBtn.innerText;
            firstNumber = displayValue.innerText;
        }
        //if there's an operator, that means that the first number was already selected and the last number left is the second one, so all that the user types goes to the second number
        else if(operator){
            displayValue.innerText += numBtn.innerText;
            secondNumber = displayValue.innerText;
        }
    })
});

window.addEventListener('keydown', (e)=> {
    if(e.key >= 0 && e.key <= 9 && !operator || e.key == '.'){
        if((e.key == '.') && displayValue.innerText.includes('.')) return;
        else if(displayValue.innerText.length > 9) return;
        displayValue.innerText += e.key;
        firstNumber = displayValue.innerText;
    }
    else if(e.key >= 0 && e.key <= 9 && operator || e.key == '.'){
        displayValue.innerText += e.key;
        secondNumber = displayValue.innerText;
    }
    else if (e.key == '=' || e.key == 'Enter'){
        displayResult();
    }
    else if(e.key == 'Backspace'){
        displayValue.innerText = displayValue.innerText.slice(0, -1);
        firstNumber = displayValue.innerText;
    }
    else if(e.key == 'Tab'){
        e.preventDefault();
        darkBrightMode();
    }
    else if(e.key == 'c'){
        displayValue.innerText = '';
        prevValue.innerText = '';
        removeSelectedClass()
        firstNumber = undefined;
        secondNumber = undefined;
        operator = undefined;
    }
});

operationalBtns.forEach(optBtn => {
    window.addEventListener('keydown',(e) => {
        if(e.key == optBtn.dataset.action){
            displayResult();
            operator = e.key;
            prevValue.innerText = `${firstNumber}${operator}`
            displayValue.innerText = ''
            removeSelectedClass();
            optBtn.classList.add('selected');
        }
    });
    optBtn.addEventListener('click', () => {
        displayResult();
        operator = optBtn.dataset.action;
        prevValue.innerText = `${firstNumber}${operator}`
        displayValue.innerText = ''
        removeSelectedClass();
        optBtn.classList.add('selected');
    });
    

});

// Function to update the history with the current calculation
function updateHistory() {
    const history = localStorage.getItem('history') || '';
    const currentCalculation = `${prevValue.innerText} = ${displayValue.innerText}\n`;
    localStorage.setItem('history', history + currentCalculation);
    
    // Create a new div element for the current calculation and append it to the container
    const container = document.querySelector('.history');
    const div = document.createElement('div');
    div.innerText = currentCalculation;
    div.className = 'history-entry';
    container.appendChild(div);
  }
  
  
  // Call updateHistory function after displaying the result
  function displayResult() {
    if (firstNumber !== undefined && secondNumber !== undefined && operator !== undefined) {
      displayValue.innerText = operate(Number(firstNumber), Number(secondNumber), operator);
      if (displayValue.innerText.length > 9) displayValue.innerText = displayValue.innerText.slice(0, 9);
      prevValue.innerText = `${firstNumber}${operator}${secondNumber}`;
      removeSelectedClass();
      firstNumber = displayValue.innerText;
      secondNumber = undefined;
      operator = undefined;
      updateHistory();
    }
    return;
  }

  // Add event listener for the "X^2" button
document.querySelector('.square').addEventListener('click', () => {
    displayResult();
    operator = 'X^2';
    prevValue.innerText = `${firstNumber}${operator}`
    displayValue.innerText = operate(Number(firstNumber), Number(firstNumber), operator);
    removeSelectedClass();
    firstNumber = displayValue.innerText;
      secondNumber = undefined;
      operator = undefined;
      updateHistory();
  });

function operate (number1, number2, operator) {
if(operator == '+'){
    return number1 + number2;
}
else if (operator == '-'){
    return number1 - number2;
}
else if (operator == '×'){
    return number1 * number2;
}
else if (operator == '÷'){
    if (number2 == '0') return '🤡Bruh🤡' 
    return number1 / number2;
}
else if (operator == 'X^2') {
    return Math.pow(number1, 2);
  }
  
}

// Load history from localStorage
function loadHistory() {
    const history = localStorage.getItem('history') || '';
    const container = document.querySelector('.history');
    
    // Clear the container before adding new history entries
    container.innerHTML = '';
  
    // Split the history into individual entries
    const entries = history.split('\n');
  
    // Create a new div element for each history entry, add a class, and append it to the container
    entries.forEach(entry => {
      const div = document.createElement('div');
      div.innerText = entry;
      div.classList.add('history-entry'); // add class to new div element
      container.appendChild(div);
    });
  }
  
  // Call loadHistory function on page load
  window.onload = loadHistory;
  

// function to clean de display and values of the calculator

clearCalc();

function clearCalc(){
    clean.addEventListener('click', ()=> {
        displayValue.innerText = '';
        prevValue.innerText = '';
        removeSelectedClass()
        firstNumber = undefined;
        secondNumber = undefined;
        operator = undefined;
    });
}

clearBtn.addEventListener('click', () => {
    localStorage.removeItem('history');
    history.innerText = '';
  });

//function to delete the last digit the user entered

deleteBackspace();

function deleteBackspace(){
    backSpace.addEventListener('click', () => {
        displayValue.innerText = displayValue.innerText.slice(0, -1);
        firstNumber = displayValue.innerText;
    });
}

function removeSelectedClass(){
    operationalBtns.forEach(optBtn => (
        optBtn.classList.remove('selected')
    ));
}

equals.addEventListener('click', () => {
    displayResult();
})

