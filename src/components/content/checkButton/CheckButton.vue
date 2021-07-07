<template>
  <div class="check-btn" :class="{ check: isChecked }">
    <img src="~assets/images/cart/tick.svg" alt="check图标" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.check-btn {
  border: 1px solid #ccc;
  border-radius: 50%;
  /* padding: 2px; */
}

/* 选中的样式 */
.check {
  background: var(--color-high-text);
  border-color: var(--color-high-text);
}
</style>