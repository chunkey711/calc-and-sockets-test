import Rational from './Rational'

class Expression {
  constructor() {
    this.operators = {
      '+': (x, y) => x.plus(y),
      '-': (x, y) => x.minus(y),
      '*': (x, y) => x.multiply(y),
      '/': (x, y) => x.devide(y)
    }
    this.rational = (x, y) => new Rational(x, y)
  }

  operatorPriority(operator) {
    switch (operator) {
      case '+':
      case '-':
        return 2
      case '*':
      case '/':
        return 3
      default:
        return 2
    }
  }

  gcd(a, b) {
    if (!b) {
      return a
    }
    return this.gcd(b, a % b)
  }

  infixToPostfix(infixArr) {
    let postFix = []
    let operationsStack = []

    for (let i = 0; i < infixArr.length; i++) {
      let token = infixArr[i]
      const operators = Object.keys(this.operators)
      const isOperator = operators.includes(token)

      if (isOperator) {
        let firstOperator = token

        for (let j = 0; j < operationsStack.length; j++) {
          let secondOperator = operationsStack[operationsStack.length - 1]

          const isFistLowerThanSecond =
            secondOperator &&
            this.operatorPriority(firstOperator) <= this.operatorPriority(secondOperator)

          if (isFistLowerThanSecond) {
            postFix.push(operationsStack.pop())
            secondOperator = operationsStack[operationsStack.length - 1]
          } else break
        }

        operationsStack.push(firstOperator)
      } else {
        postFix.push(token)
      }
    }

    while (operationsStack.length > 0) {
      postFix.push(operationsStack.pop())
    }
    return postFix
  }

  calculate(infixArr) {
    let result
    let stack = []
    const postfixArr = this.infixToPostfix(infixArr)
    const operators = Object.keys(this.operators)

    postfixArr.forEach(token => {
      const isOperator = operators.includes(token)
      if (isOperator) {
        let [y, x] = [stack.pop(), stack.pop()]
        stack.push(this.operators[token](x, y))
      } else {
        stack.push(token)
      }
    })

    result = stack.pop()
    const gcd = this.gcd(result.numerator, result.denominator)
    const reducedFraction = this.rational(result.numerator / gcd, result.denominator / gcd)
    return reducedFraction
  }
}

export default Expression
