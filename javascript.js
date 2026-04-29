function addOperator(a, b){
    return a + b
}
function subtractOperator(a, b) {
    return a - b
}

function multiplyOperator(a,b) {
    return a * b
}

function divideOperator(a, b) {
    return a / b
}

function operate(operator, a, b) {
    // takes an operator and two numbers
    // calls one of operate functions 
    switch(operator) {
        case ("addOperator"): 
            return add(a, b)
            break;
        case ("subtractOperator"):
            return subtract(a, b)
            break;
        case ("multiplyOperator"):
            return multiply(a, b)
            break;
        case ("divideOperator"):
            return divide(a, b)
            break;
    }
}







