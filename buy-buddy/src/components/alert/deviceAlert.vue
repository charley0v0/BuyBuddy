<template>
  <div class="deviceAlertWrapper">
    <div class="deviceAlert">
      <div class="deviceAlert__header">
        <span>請切換裝置，獲得最佳體驗</span>
        <img @click="closeHandler" :src="CloseIcon">
      </div>
      <p class="deviceAlert__body">請使用解析度1024px以上之螢幕裝置以獲得最佳使用體驗</p>
    </div>
  </div>
</template>
<script setup name="DeviceAlert">
import { defineEmits } from 'vue';
import CloseIcon from '@/assets/svg/close.svg'
const emit = defineEmits(['closeHandler'])
const closeHandler = ()=>{
  emit('closeHandler')
}

</script>
<style lang="scss" scope>
.deviceAlertWrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.deviceAlert {
  width: 330px;
  height: 96px;
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid #EBEEF5;
  background: #FFF;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.10);
  color: var(--Gray-800, #1F2937);
  font-family: "Noto Sans TC";
}
.deviceAlert__header {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.64px;
  >img {
    cursor: pointer;
    width: 16px;
    height: 16px;
    fill: #c0c4cc;
  }
}
.deviceAlert__body {
  color: #4B5563;
  font-family: "Noto Sans TC";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.56px;
}
</style>