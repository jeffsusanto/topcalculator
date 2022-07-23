class Calculator {
    constructor(previousOperationTextElement, currentOperationTextElement) {
        this.previousOperationTextElement = previousOperationTextElement
        this.currentOperationTextElement = currentOperationTextElement
        this.clear()
    }

    clear() {
        this.currentOperation = ''
        this.previousOperation = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperation = this.currentOperation.toString().slice(0, -1)
    }
    
    
    appendNumber(number) {
        //made it possible to add decimal numbers v
        if (number === '.' && this.currentOperation.includes('.')) return
        this.currentOperation = this.currentOperation.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperation === '') return
        if (this.previousOperation !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperation = this.currentOperation
        this.currentOperation = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperation)
        const current = parseFloat(this.currentOperation)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        //clear out the current display 
        this.currentOperation = computation
        this.operation = undefined
        this.previousOperation = ''
    }

    getDisplayNumber(number){
        //collect decimal numbers if it exist v
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
        if(isNaN(integerDigits)) {
            integerDisplay =""
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        //if decimal digit exists, display it
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperationTextElement.innerText = 
            this.getDisplayNumber(this.currentOperation)
        if(this.operation != null) {
            this.previousOperationTextElement.innerText = 
            `${this.previousOperation} ${this.operation}`
        } else {
            this.previousOperationTextElement.innerText =''
        }
        
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousOperationTextElement = document.querySelector('[data-last-operation]')
const currentOperationTextElement = document.querySelector('[data-current-operation]')

const calculator = new Calculator(previousOperationTextElement, currentOperationTextElement)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})


