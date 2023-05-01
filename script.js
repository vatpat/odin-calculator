let displayValue = document.querySelector("#displaySection");
let flushedValue = undefined;
let currentOperation = undefined;
let clearPreviousNumber = false;

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if(Number(b) === 0) {
        return "NaN";
    }
    return a / b;
}

function completeOperation(a, b, operation) {
    currentOperation = undefined;
    clearPreviousNumber = true;
    if(a === "NaN" || b === "NaN") {
        return "NaN";
    } else if(operation === "+") {
        return add(a,b);
    } else if(operation === "-") {
        return subtract(a,b);
    } else if(operation === "*") {
        return multiply(a,b);
    } else if(operation === "/") {
        return divide(a,b);
    }
}

let numberButtons = [...document.querySelectorAll(".inputNumber")];
numberButtons.forEach(button => {
    button.addEventListener("click", e => {
        displayValue.innerText = isNaN(Number(displayValue.innerText)) || clearPreviousNumber
            ? e.target.id
            :  displayValue.innerText + e.target.id;
        clearPreviousNumber = false;
    });
});

let operatorButtons = [...document.querySelectorAll(".operator")];
operatorButtons.forEach(button => {
    button.addEventListener("click", e => {
        let currentValue = displayValue.innerText;
        if(isNaN(Number(currentValue)) && currentValue !== "NaN") {
            return; // operator already present in the display
        } 
        if(currentOperation !== undefined) {
            // complete previous operation, flush value, then update display with new operator
            flushedValue = completeOperation(flushedValue, currentValue, currentOperation);
            displayValue.innerText = e.target.innerText;
            currentOperation = e.target.innerText;
        } else {
            flushedValue = displayValue.innerText;
            displayValue.innerText = e.target.innerText;
            currentOperation = e.target.innerText;
        }
        
    });
});

let equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", e => {
    let currentValue = Number(displayValue.innerText);
    if(isNaN(currentValue) && currentValue !== "NaN") {
        return; // operator currently present in the display
    }  else if (currentOperation === undefined){
        return;
    }
    let result = completeOperation(flushedValue, currentValue, currentOperation);
    if(result === "NaN") {
        displayValue.innerText = `${result}`;
    } else {
        displayValue.innerText = `${result.toFixed(7) * 1}`;
    }
});

let clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", e => {
    displayValue.innerText = "";
    flushedValue = undefined;
    currentOperation = undefined;
    clearPreviousNumber = false;
});