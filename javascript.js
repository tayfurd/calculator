function addOperator(a, b){
    return a + b
};
function subtractOperator(a, b) {
    return a - b
};

function multiplyOperator(a,b) {
    return a * b
};

function divideOperator(a, b) {
    return a / b
};

function operate(operator, a, b) {
    switch(operator) {
        case ("addOperator"): 
            return addOperator(a, b)
            break;
        case ("subtractOperator"):
            return subtractOperator(a, b) 
            break;
        case ("divideOperator"):
        return divideOperator(a, b)
        break;
        case ("multiplyOperator"):
            return multiplyOperator(a, b)
            break;
    };
};

const display = document.querySelector("#display");
const displaySecond = document.querySelector("#displaySecond");
let displayResult = [ [0] ];
let result = [ {number: "0"} ];
display.textContent = [displayResult.join(" ")];

const decimalPoint = document.querySelector("#decimalPoint");
const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
    number.addEventListener("click", (e) => {

        // if last object includes operator key, add object and array to input
        if (Object.keys(result[result.length-1]).includes("operator")) 
            {
                result.push( {number: ""} );
                displayResult.push( [] );
                display.textContent = [displayResult.join(" ")];
            }

        if (e.target.id == "decimalPoint" && 
            result[result.length - 1].number.at(-1) !== "." &&
            !result[result.length - 1].number.includes(".") &&
            result[result.length - 1].number !== "")
            {
                result[result.length - 1].number += `${e.target.textContent}`;
                displayResult[displayResult.length - 1] += e.target.textContent; 
            }
            

            else if (result.length == 1 && 
                    result[result.length - 1].number.length == 1 &&
                    result[result.length - 1].number.at(0) === "0") 
                {
                    result = [ {number: e.target.textContent} ];
                    displayResult = [ [e.target.textContent] ];
                }

            else if (e.target.id == "zero" &&
                result[result.length - 1].number.includes(".") ||
                e.target.id == "zero" && 
                result[result.length - 1].number.at(0) !== "0") 
                {
                    result[result.length - 1].number += `${e.target.textContent}`;
                    displayResult[displayResult.length - 1] += e.target.textContent;
                }

            else if(e.target.id !== "decimalPoint" && 
                    e.target.id !== "zero" && 
                    result[result.length - 1].number.includes(".") ||

                    e.target.id !== "decimalPoint" && 
                    e.target.id !== "zero" &&
                    result[result.length - 1].number.at(0) == "0" && 
                    result[result.length - 1].number.length !== 1 ||

                    e.target.id !== "decimalPoint" && 
                    e.target.id !== "zero" &&
                    result[result.length - 1].number.at(0) !== "0"
                    ) 
                {
                    result[result.length - 1].number += `${e.target.textContent}`;
                    displayResult[displayResult.length - 1] += e.target.textContent;
                }

    display.textContent = [displayResult.join(" ")];
    displaySecond.textContent = ""
    });
});

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        if (Object.keys(result[result.length-1]) == "operator"){

        }
        else {
            result.push({operator: `${e.target.id}`});
            displayResult.push([`${e.target.textContent}`]);
            display.textContent = [displayResult.join(" ")];
        }
        displaySecond.textContent = ""
    });
});

const equal = document.querySelector("#equal");
equal.addEventListener("click", (e) => {
    return getResult()
})

function getResult() {
    for(let i = result.length; i >= 1 ; i--){
        let findMultiplyDivide = result.map((obj) => {
            return obj.operator === "divideOperator" 
            || obj.operator === "multiplyOperator"
        });

        if (findMultiplyDivide.includes(true)){
            let findOperator = findMultiplyDivide.indexOf(true);
            let operator = result[findOperator].operator;
            let a = Number(result[(findOperator - 1)]["number"]);
            let b = Number(result[(findOperator + 1)]["number"]);
            result.splice(
                (findOperator-1), 
                (3), 
                {number: `${operate(operator, a, b)}`}
            );
        }
            else if (!findMultiplyDivide.includes(true) &&
                    findMultiplyDivide.length > 1) {
                let findOperator = result.findIndex((obj) => obj.operator);
                let operator = result[findOperator].operator;
                let a = Number(result[findOperator - 1]["number"]);
                let b = Number(result[findOperator + 1]["number"])
                result.splice(
                    (findOperator-1), 
                    (3), 
                    {number: `${operate(operator, a, b)}`}
                );
            };
            if (result.length === 1 && !result[0].number.includes(".")) {
                displaySecond.textContent = result[0]["number"];
            }

               else if(result.length === 1 
                && result[0].number.includes(".")) 
                    {
                        let indexOfDecimal = result[0].number.indexOf(".");
                        let beforeDecimal = result[0]["number"].slice(0, indexOfDecimal);
                        let afterDecimal = result[0]["number"].slice(indexOfDecimal, indexOfDecimal+4)
                        console.log(beforeDecimal)
                        displaySecond.textContent = beforeDecimal + afterDecimal
                    }
    };
};

const c = document.querySelector("#c");
c.addEventListener("click", (e) => {
    displayResult = [ [0] ];
    result = [ {number: "0"} ];
    displaySecond.textContent = "";
    display.textContent = "0";
});


function clearEntry(e){
    const lastObject = result[result.length - 1];
    const lastKey = Object.keys(lastObject).at(-1)
    const lastArray = displayResult.length - 1;

    if (displayResult[lastArray] == "") {
        displayResult.pop()
    };
    if (lastKey == "operator") 
        {
            result.pop(lastObject);
            displayResult.pop();
        }
        else if (lastKey == "number") {
                const lastArray = displayResult.length - 1;
                lastObject[lastKey] = lastObject[lastKey].slice(0, -1)
                displayResult[lastArray] = displayResult[lastArray].slice(0 , -1)
            };
    if (result.length == 1 && Object.values(lastObject).at(-1) == "") {
        displayResult = [ [0] ];
        result = [ {number: "0"} ];
    }

    display.textContent = [displayResult.join(" ")];
    displaySecond.textContent = ""
}

const ce = document.querySelector("#ce");
 ce.addEventListener("click", (e) => {
    clearEntry(e);
})

window.addEventListener("keydown", (e) => {
    if (e.key == "Backspace") {
        clearEntry(e);
    }
})

