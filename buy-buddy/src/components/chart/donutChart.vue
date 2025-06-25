<template>
  <div id="donut_chart">
        123
  </div>
</template>


<script name="DonutChart" setup>
    import { ref, reactive, watch, watchEffect } from 'vue';
    import { Icon } from '@vicons/utils'

    const props = defineProps({
        modelValue:{
            type:Array,
            default:[]
        },
        chipList:{
            type:Array,
            default:[]
        },
        size:{
            type:String,
            default:'large'
        },
    });

   
</script>


<style lang="scss" scoped>
  
    
</style>