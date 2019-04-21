<template>
  <button class="btn" @click="$emit('onClick')">
    <slot></slot>
  </button>
</template>


<style lang="scss" scoped>
.btn {
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #91acc6;
  border-radius: 3px;
  outline: none;
  color: #91acc6;
  padding: 8px;
  padding-top: 6px;

  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: #748aa0;
    border-color: #748aa0;
  }
}
</style>



