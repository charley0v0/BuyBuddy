<template>
  <div v-show="controlFullScreenDialog" class="modal_wrapper">
    <div class="header" :class="{'no-box-shadow': useSecondHeader}">
      <slot name="fullScreenModalHeader" :data="data">
          <img @click="activeCloseHandler" :src="closeIcon">
          <div class="line"></div>
          <span>{{title}}</span>
          <slot name="headerContent">
          </slot>
      </slot>
    </div>
    <div class="second-header" :class="{'no-box-shadow': useSecondHeader}" v-if="useSecondHeader">
      <slot name="secondHeader" :data="data">
      
      </slot>
    </div>
    <div class="body" :style="usefooter ? 'height: calc(100vh - 53px - 72px);' : 'height: calc(100vh - 53px);'">
      <slot name="fullScreenModalBody" :data="data">
      </slot>
    </div>
    <div class="footer" v-if="usefooter">
      <slot name="fullScreenModalFooter" :data="data">
      </slot>
    </div>
  </div>
</template>
<script setup name="FullScreenModal">
import closeIcon from '@/assets/svg/close.svg';
import {ref, watch} from 'vue';

const props = defineProps({
  controlFullScreenDialog: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    defualt: '標題'
  },
  data: {
    type: Object,
    default: ()=>{
      return {}
    }
  },
  useSecondHeader:{
    type:Boolean,
    default: false
  },
  usefooter:{
    type:Boolean,
    default: false
  }
})
const emit = defineEmits(['closeHandler'])
const activeCloseHandler = ()=>{
  emit('closeHandler')
}

watch(()=>props.controlFullScreenDialog,()=>{
  document.querySelector('body').style.overflowY = props.controlFullScreenDialog ? 'hidden': 'auto';
})


</script>
<style lang="scss" scoped>
.modal_wrapper{
  position: absolute;
  width: 100%;
  min-width:1366px;
  height: 100vh;
  z-index: 999;
  top: 0;
  left: 0;
}
.header {
    color: $grey-800;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.12);
    height: 36px;
    padding: 8px 40px;
    font-family: "Noto Sans TC";
    background: #FFFFFF;
    z-index: 99;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    >img {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
    >span {
        display: block;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.64px;
    }
    >.line {
      height: 16px;
      width: 1px;
      background: $grey-200;
      margin: 0px 24px;
    }
}
.second-header{
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.12);
  padding: 8px 40px;
  font-family: "Noto Sans TC";
  background: #FFFFFF;
  z-index: 99;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.body{
  background: $grey-100;
  overflow: auto;
  box-sizing: border-box;
}
.footer{
  height:72px;
  background:$bg-light;
  padding: 12px 40px;
  box-sizing: border-box;
  position: sticky;
  bottom: 0;
  z-index:1000;
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px 0px rgba(0, 0, 0, 0.08);
}

.no-box-shadow{
  box-shadow:unset !important;
}
</style>