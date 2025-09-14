<template>
  <div
    v-if="visible"
    class="fixed h-screen w-full top-0 left-0 z-50 flex items-stretch overflow-hidden"
  >
    <div :class="['curtain curtain-left', opened ? 'opened' : '']"></div>

    <div :class="['curtain curtain-right', opened ? 'opened' : '']"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const opened = ref(false);
const visible = ref(true);

onMounted(() => {
  setTimeout(() => {
    opened.value = true;
    setTimeout(() => {
      visible.value = false;
    }, 1200);
  }, 300);
});
</script>

<style scoped>
.curtain {
  transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1);
  position: relative;
  background: white;
}

.curtain-left {
  width: 50%;
  height: 100%;
  border-right: 2px solid var(--color-deep-violet);
  transform: translateX(0);
}

.curtain-right {
  width: 50%;
  height: 100%;
  border-left: 2px solid var(--color-deep-violet);
  transform: translateX(0);
}

.opened.curtain-left {
  transform: translateX(-100%);
}
.opened.curtain-right {
  transform: translateX(100%);
}

</style>
