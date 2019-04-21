<template>
  <div>
    <Button @onClick="addFraction">Add Fraction</Button>
    <FractionContainer>
      <div class="fraction" v-for="(fraction, i) in fractions" :key="i">
        <Operator v-model="fraction.operator" v-if="fraction.operator"/>
        <Fraction
          v-model="fraction.value"
          :hasError="incorrectFractionIndex.includes(i)"
          :isRemoveEnabled="i !== 0"
          @errorHandler="errorHandler"
          @removeFraction="removeFraction(i)"
        />
      </div>
      <div class="equal">=</div>
      <Fraction
        @errorHandler="errorHandler"
        :value="calculate"
        :disabled="true"
        :isRemoveEnabled="false"
        :hasError="incorrectFractionIndex.length > 0"
      />
    </FractionContainer>
  </div>
</template>

 <script>
import FractionContainer from "@/containers/FractionContainer"
import Fraction from "@/components/Calc/Fraction"
import Operator from "@/components/Calc/Operator"

import Rational from "@/models/Rational"
import Expression from "@/models/Expression"

import Button from "@/components/Button"

export default {
  components: { FractionContainer, Fraction, Operator, Button },

  data() {
    return {
      expression: new Expression(),
      errorRational: new Rational(0, 0),
      fractions: [
        { value: new Rational(1, 1), operator: "" },
        { value: new Rational(1, 1), operator: "+" }
      ],
      incorrectFractionIndex: []
    }
  },

  computed: {
    calculate() {
      const hasError = this.incorrectFractionIndex.length > 0
      if (hasError) {
        return this.errorRational
      }
      const infix = this.fractions.reduce((acc, current) => {
        if (!current.operator) {
          acc = [...acc, current.value]
        } else {
          acc = [...acc, current.operator, current.value]
        }
        return acc
      }, [])

      return this.expression.calculate(infix)
    }
  },

  methods: {
    insertErrorIndex(i) {
      this.incorrectFractionIndex = [...this.incorrectFractionIndex, i]
    },

    filterErrorIndex(i) {
      this.incorrectFractionIndex = this.incorrectFractionIndex.filter(
        el => el !== i
      )
    },

    errorHandler() {
      for (let i = 0; i < this.fractions.length; i++) {
        const fraction = this.fractions[i]
        const operator = fraction.operator
        const numerator = parseInt(fraction.value.numerator)
        const denominator = parseInt(fraction.value.denominator)

        const hasIndex = this.incorrectFractionIndex.includes(i)

        const denominatorError = denominator === 0 || isNaN(denominator)
        const nonDevidedFraction = operator === "/" && numerator === 0
        const numeratorError = nonDevidedFraction || isNaN(numerator)

        const isCorrect = !denominatorError && !numeratorError

        if (denominatorError && !hasIndex) {
          this.insertErrorIndex(i)
        }

        if (numeratorError && !hasIndex) {
          this.insertErrorIndex(i)
        }

        if (isCorrect && hasIndex) {
          this.filterErrorIndex(i)
        }
      }
    },

    addFraction() {
      this.fractions = [
        ...this.fractions,
        { value: new Rational(1, 1), operator: "+" }
      ]
    },

    removeFraction(index) {
      this.fractions = this.fractions.filter((_, i) => i !== index)
      this.filterErrorIndex(index)
    }
  }
}
</script>

 <style lang="scss" scoped>
.fraction {
  display: flex;
}
.equal {
  padding: 0 15px;
  font-size: 24px;
  font-weight: 500;
}
</style>
