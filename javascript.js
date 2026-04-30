let operateResult = ""
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
    // takes an operator and two numbers
    // calls one of operate functions 
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
let displayResult = [ [] ];
let result = [ {number: ""} ];

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        result[result.length - 1].number += e.target.textContent;

        displayResult[displayResult.length - 1] += e.target.textContent;
        display.textContent = [displayResult];
    });
});


const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        result.push({operator: `${e.target.id}`});
        displayResult.push([`${e.target.textContent}`]);
        result.push( {number: ""} );
        displayResult.push( [] );
        display.textContent = [displayResult.join()];
    });
});

const equal = document.querySelector("#equal");
equal.addEventListener("click", (e) => {
    return getResult()
})

/* 
make the calculation
delete it and replace it
    2 + 2 - (2 * 3)
    2*3, replace it with 6
        2 + 2 - (6)
keep calculate until cloneResult.length = 1
*/

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
            }
            else if (result.length === 1) {console.log(result[0]["number"])}
    };
};