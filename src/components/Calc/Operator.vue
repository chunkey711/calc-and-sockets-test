<template>
  <select class="operator" v-model="internalValue" :disabled="disabled">
    <option
      v-for="option in operatorOptions"
      :value="option.value"
      :key="option.value"
    >{{option.label}}</option>
  </select>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    disabled: Boolean
  },

  watch: {
    internalValue(val) {
      this.$emit("input", val)
    }
  },

  data() {
    return {
      internalValue: this.value,
      operatorOptions: [
        { value: "+", label: "+" },
        { value: "-", label: "–" },
        { value: "*", label: "×" },
        { value: "/", label: "÷" }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.operator {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border: none;
  background: transparent;
  color: #000;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 4px;
  padding: 0 15px;
  cursor: pointer;
}
</style>

