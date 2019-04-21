<template>
  <div class="fraction-wrapper" :class="{error: hasError}">
    <span class="remove-fraction" @click="$emit('removeFraction')" v-if="isRemoveEnabled">+</span>
    <input type="number" class="number" :disabled="disabled" v-model="value.numerator">
    <div class="devider"/>
    <input type="number" class="number" :disabled="disabled" v-model="value.denominator">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    disabled: Boolean,
    isRemoveEnabled: Boolean,
    hasError: Boolean
  },

  updated() {
    this.$emit("errorHandler")
  }
}
</script>


<style lang="scss" scoped>
.fraction-wrapper {
  position: relative;
  width: 80px;
}

.number {
  color: #000;
  width: 100%;
  outline: none;
  text-align: right;
  border: none;
  font-size: 16px;
  padding-left: 10px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

.devider {
  background: #000;
  width: 100%;
  height: 2px;
}

.remove-fraction {
  position: absolute;
  top: -7px;
  left: -1px;
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  transform: rotate(45deg);
  cursor: pointer;
  color: #d44a4a;
  user-select: none;
}

.error {
  .number {
    color: #d44a4a;
  }

  .devider {
    background: #d44a4a;
  }
}
</style>

