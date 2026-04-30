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
let displayResult = [ [] ];
let result = [ {number: ""} ];

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        result[result.length - 1].number += `${e.target.textContent}`;

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
            else if (result.length === 1) {
                console.log(result[0]["number"])
                displaySecond.textContent = result[0]["number"]
            }
    };
};


/* 
How to calculate multiple variables?

later: 
    do not let click 2 operator in a row.
    join displayResult properly
    calculate priority -> divide and multiply first 
    exact numbers
,

show displayResult as the display:

in an array:
initially create 1 object
assign the digits the last object
push digits the last array

when click an operator,
create an object, and assign the operator,
create another object for the next digits to assign them
create an array in displayResult

when press equal
call operate(operator, a, b)
find the first operator in the array
operator = operator value of index of the operator
        a = operator index - 1 
        b = operator index + 1

calculate the result
update the display with the result


make the calculation
delete it and replace it
    2 + 2 - (2 * 3)
    2*3, replace it with 6
        2 + 2 - (6)
keep calculating until cloneResult.length = 1
*/






