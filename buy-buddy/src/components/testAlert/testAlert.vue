<template>
  <div class="bg_color text-center p3 alert_Text">您正在使用測試環境</div>
</template>
<script name="TestAlert" setup>
  import { ref } from 'vue';
</script>
<style lang="scss" scoped>
.bg_color{
  background-color: #CB4042;
  color: white;
}
.alert_Text{
  max-width: calc(100% - 16px);
  padding: 8px 16px;
}
</style>