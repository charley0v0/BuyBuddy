<template>
    <div class="input_number mb-16">
        <el-input-number
            v-model="inputValue"
            :class="setCustomClass"
            :min="minValue"
            :max="maxValue"
            :disabled="disabled"
            @focus="setBoxShadow()"
            @blur="setBoxShadow()"
        />
    </div>
</template>

<script name="InputNumber" setup>
    import { ref, watch, watchEffect } from 'vue'

    const props = defineProps({
        modelValue: [String,Number],
        minValue: Number,
        maxValue: Number,
        disabled: Boolean,
        resetTrigger:Number,
        customClass: {type:String,default:''},
    });

    //接受父組件預設值傳入
    const inputValue = ref(0);
    watchEffect(()=>{
        inputValue.value = Number(props.modelValue);
    });

    //與父組件v-model綁定
    const emit = defineEmits(['update:modelValue']);
    watch(()=> inputValue.value, ()=>{
        emit('update:modelValue',inputValue.value);
    });

    //組件初始化
    watch(() => props.resetTrigger, () => {
        inputValue.value = 0;
        setCustomClass.value = props.customClass;
    });

    const setCustomClass = ref(props.customClass);
    const setBoxShadow = () => {
        if(setCustomClass.value.indexOf('el-is-focus') > -1){
            setCustomClass.value = setCustomClass.value.replace('el-is-focus','');
        }else{
            setCustomClass.value += 'el-is-focus';
        }
    };
    

</script>
<style lang="scss" scoped>
    .validateMsg{
        letter-spacing:0.48px;
    }

    .input_number :deep(.el-input-number){
        width:100%;
        max-width:100%;
        border-radius: 5px;

        i{
            color:$grey-800;
        }

        &.is-disabled{
            span{
                background:$grey-100;
            }

            i{
                color:$grey-400;
            }
        }
    }
    .input_number :deep(.el-input){
        width:100%;
    }

    .input_number  :deep(.el-input__wrapper){
        box-shadow: 0 0 0 1px $border inset;
        &:hover {
            box-shadow: 0 0 0 1px $blue-600 inset;
        }
    }

    .el-is-focus{
        box-shadow: 1px 1px 4px #eee;
    }

    :deep(.el-input.is-disabled .el-input__wrapper) {
        background-color:$grey-100;
        box-shadow: 0 0 0 1px $border inset !important;
    }

    :deep(.el-input){
        .el-input__inner{
            -webkit-text-fill-color: $grey-800;

            &::placeholder{
                -webkit-text-fill-color: $grey-400;
            }
        }

        &.is-disabled .el-input__inner{
            -webkit-text-fill-color: $grey-800;
        }  
    }

</style>