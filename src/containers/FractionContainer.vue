<template>
  <div class="calc">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.calc {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;

  padding: 24px 0;
}
</style>
