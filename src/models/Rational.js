class Rational {
  constructor(numerator, denominator) {
    this.numerator = numerator
    this.denominator = denominator
  }

  plus(other) {
    return new Rational(
      this.numerator * other.denominator + this.denominator * other.numerator,
      this.denominator * other.denominator
    )
  }

  minus(other) {
    return new Rational(
      this.numerator * other.denominator - this.denominator * other.numerator,
      this.denominator * other.denominator
    )
  }

  multiply(other) {
    return new Rational(this.numerator * other.numerator, this.denominator * other.denominator)
  }

  devide(other) {
    return new Rational(this.numerator * other.denominator, this.denominator * other.numerator)
  }
}

export default Rational
