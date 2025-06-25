<template>
    <el-col 
        :span="24"
        class="layout-style"
        :class="showBorder"
    >
        <slot>
        </slot>
    </el-col>
</template>
<script setup>
    import { ref, watch } from 'vue';
    import { choseComponent } from '@/store/chose.js';

    const props = defineProps({
        name:{
            type:String,
            default:''
        }
    });
    
    const chose = choseComponent();
    const showBorder = ref('');
    watch(()=> chose.selected, ()=>{
        showBorder.value = chose.selected == props.name ? 'light-border' : '';
    })
</script>


<style lang="scss" scoped>
    .layout-style{
        margin: 10px;
        padding: 10px;
        border-radius:5px;
    }

    .light-border{
        border:2px solid #ffd04b;
    }
</style>