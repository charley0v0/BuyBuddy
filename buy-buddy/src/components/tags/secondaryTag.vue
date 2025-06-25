<template>
  <div class="secondary_Tag">
    <el-tag :type="tagType" :disable-transitions="true" :size="size"><li><span>{{ title }}</span></li></el-tag>
  </div>
</template>
<script setup>
import { ref, watch, watchEffect } from 'vue';
const props = defineProps({
  tagType:{
    type:String,
    default:'primary',
  },
  title:{
    type:String,
    default:'',
  },
  size:{
    type:String,
    default:'default',
  }
});


</script>
<style lang="scss" scoped>
  .secondary_Tag{
    :deep(.el-tag){
      background-color: transparent;
      border: none;
    }

    span{
      position:relative;
      left:-8px;
    }
  }
</style>