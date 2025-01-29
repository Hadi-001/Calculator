class Calculator {
    constructor() {
        this.result = 0; 
    }
    add(a, b) {
        this.result = a + b;
        return this.result;
    }
    subtract(a, b) {
        this.result = a - b;
        return this.result;
    }

    multiply(a, b) {
        this.result = a * b;
        return this.result;
    }

    divide(a, b) {
        if (b === 0){
            screen_content.textContent = "Division by zero!! PRESS C or ON!!";
            return undefined;
        }
        else{
            this.result = a / b;
            return this.result;
        }
    }
    pow(a, b) {
        this.result = Math.pow(a, b);
        return this.result;
    }
    reset() {
        this.result = 0;
        return this.result;
    }
    getResult() {
        return this.result;
    }
}

let calc = new Calculator();

let pressed_cells = document.querySelectorAll(".cell");
let screen_content = document.querySelector(".screen");

let first_num = ""; // to store first operand
let second_num =  "";
let operation = "";
let num_1 = 0; // hold the Real number value
let num_2 = 0; // hold the Real number value
let entering_second_num = false;
let operators = ["+","-","^","÷","×","+/-"];
let sign_of_num_1 = false;// false stand for positive
let sign_of_num_2 = false;

pressed_cells.forEach(cell => {
    cell.addEventListener("click", () => {
        let clicked_value = cell.textContent;

        if(clicked_value === "C" || clicked_value === "ON")
            clear_function();
        else
            take_input_and_verify(clicked_value);
    });
});

function clear_function(){
    first_num = ""; 
    second_num =  "";
    operation = "";
    entering_second_num = false;
    screen_content.textContent = "0";
    calc.reset();
    sign_of_num_1 = false;
    sign_of_num_2 = false;
    num_1 = 0;
    num_2 = 0;
}

function take_input_and_verify(clicked_value) {
    if (clicked_value === "=") {
        compute();
    } 
    else if (operators.includes(clicked_value)) {
        
        if (clicked_value === "+/-") {
            changeSign();
        }
        else if (operation !== "" && second_num !== ""){
            compute();
            operation = clicked_value;
            entering_second_num = true;
            screen_content.textContent = (sign_of_num_1 ? "-" : "") + first_num + clicked_value;
        }
        else if (first_num === "") {
            screen_content.textContent = "Error: Enter number first";
        } 
        else {
            operation = clicked_value;
            entering_second_num = true;
            screen_content.textContent = (sign_of_num_1 ? "-" : "")+first_num + clicked_value;
        }  
    } 
    else {
        if (entering_second_num) {
            second_num +=  clicked_value;
        } 
        else {
            first_num += clicked_value;
        }
        screen_content.textContent = (sign_of_num_1 ? "-" : "") + first_num + operation + (sign_of_num_2 ? "-" : "") + second_num;
    }
}

function changeSign(){
    if (entering_second_num){
        sign_of_num_2 = !sign_of_num_2;
    } 
    else{
        sign_of_num_1 = !sign_of_num_1;
    }
    screen_content.textContent = (sign_of_num_1 ? "-" : "") + first_num + operation + (sign_of_num_2 ? "-" : "") + second_num;
}

function compute(){
    if (first_num === "")
        clear_function();
    else if (second_num === ""){
        screen_content.textContent = (sign_of_num_1 ? "-" : "") + first_num;
        operation = "";
        entering_second_num = false;
    }
    else 
        evaluate();
    entering_second_num = false;
}

function evaluate(){
    if (num_1 >= 0) num_1 = getRepresentation(first_num) * (sign_of_num_1 == true ? -1 : 1);
    if (num_2 >= 0) num_2 = getRepresentation(second_num) * (sign_of_num_2 == true ? -1 : 1);
    
    if (operation === "+"){
        calc.add(num_1, num_2);
        display();
        noMoreThanTwo();
    }
    else if (operation === "-"){
        calc.subtract(num_1, num_2);
        display();
        noMoreThanTwo();
    }
    else if (operation === "×"){
        calc.multiply(num_1, num_2);
        display();
        noMoreThanTwo();
    }
    else if (operation === "÷"){
        if (num_2 === 0) {
            screen_content.textContent = "Error: Div by 0!! PRESS C!!";
            setTimeout(error,100);
            clear_function();
        } 
        else{
            calc.divide(num_1, num_2);
            display();
            noMoreThanTwo();
        }
    }
    else if (operation === "^"){
        calc.pow(num_1, num_2);
        display();
        noMoreThanTwo();
    }
}

function getRepresentation(temp){
    return parseFloat(temp);
}
function error(){
    screen_content.textContent = "Error: Div by 0!! PRESS C!!";
}
function display(){
    screen_content.textContent = calc.getResult();
}

function noMoreThanTwo(){
    num_1 = calc.getResult();
    num_2 = 0;
    second_num = "";
    operation = "";
    sign_of_num_2 = false;
    if(num_1 < 0){
        sign_of_num_1 = true;
        num_1 *= (-1);
    }
    first_num = num_1.toString();
}

document.addEventListener("keydown", (event) => {
    let key = event.key;
    // create a map that contains keys from the keyboard mapped to their functionality
    const Map = {
        "Enter": "=",
        "c": "C",
        "C": "C",
        "Escape": "ON",
        "+": "+",
        "-": "-",
        "*": "×",
        "/": "÷",
        "^": "^",
        ".": ".",
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9"
    };
    if (Map[key]) {
        let value = Map[key];
        if (value === "C" || value === "ON") {
            clear_function();
        }
        else {
            take_input_and_verify(value);
        }
    }
});
