<template>
  <div class="notification">
  </div>
</template>
<script setup name="Notification">
import {watch, nextTick} from 'vue';
import { ElNotification } from 'element-plus';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    // success, warning, info, error
    type: String,
    default: 'warning'
  },
  trigger: {
    type: Number,
    default: 0
  },
  triggerClose:{
    type:Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 4500
  }
})

watch(()=>props.trigger, (newVal)=>{
    if(newVal != 0){
      const { title, message, type, duration } = props;
      ElNotification({
          title,
          message,
          type,
          duration,
          offset:24
      })
      nextTick(()=>{
        if(window.innerWidth < 1024){
          const nofification = document.getElementsByClassName('el-notification')
          for(var i = 0; i < nofification.length; i++){
            nofification[i].style.position = 'fixed';
            nofification[i].style.right = 'calc(50% - 330px)';
            nofification[i].style.left = '50%';
            nofification[i].style.transform = 'translate(-50%, 0)';
            
            if(i == 0){
              nofification[i].style.top = '40px';
            }
            
          }
        }
      })
    }
})

//觸發關閉所有通知
watch(() => props.triggerClose, (newVal) => {
  if (newVal !== 0) {
    ElNotification.closeAll();
  }
});

</script>