<template>
    <el-row justify="end">
        <el-col :span="6" class="d-flex justify-end align-center" v-if="props.sizeControl.length">
            <span>尺寸：</span>
            <el-button type="primary" size="small" round @click="setSize('large')" v-if="props.sizeControl.indexOf('large') > -1" >大尺寸</el-button>
            <el-button type="warning" size="small" round @click="setSize('')" v-if="props.sizeControl.indexOf('default') > -1" >預設尺寸</el-button>
            <el-button type="info"    size="small" round @click="setSize('small')" v-if="props.sizeControl.indexOf('small') > -1" >小尺寸</el-button>
        </el-col>
        <el-col :span="3" class="d-flex justify-end align-center">
            <span>組件狀態：</span>
            <el-switch 
                v-model="disabled"
                size="large"
                inline-prompt
                active-text="禁用"
                inactive-text="啟用"
                class="ml-12"
                style="--el-switch-on-color:#DC2626;--el-switch-off-color:#65A30D;"
            ></el-switch>
        </el-col>
    </el-row>
</template>


<script setup>
    import { ref, watch } from 'vue'

    const props = defineProps({
        modelValue:[String,Object],
        ComponentDisabled:Boolean,
        sizeControl:{
            type:Array,
            default:['large','default','small']
        }
    });

    //調整組件大小
    const componentSize = ref('');

    const emit = defineEmits(['update:modelValue','update:disabled']);

    const setSize = (size) => {
        componentSize.value = size;
        emit('update:modelValue',componentSize.value);
    }

    const disabled = ref(props.ComponentDisabled);

    watch(disabled, ()=>{
        emit('update:disabled',disabled.value);
    })

</script>