<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentItem }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentItem: 0,
    };
  },
  methods:{
      itemClick(index){
          this.currentItem = index
          // 子传父，监听自定义事件tabClick，把index传出去
          this.$emit('tabClick',index)
      }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.tab-control {
  height: 40px;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  background-color: #fff;
  display: flex;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span{
    padding: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>