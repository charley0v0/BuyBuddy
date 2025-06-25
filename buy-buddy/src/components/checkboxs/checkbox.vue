<template>
    <div class="checkbox" :style="{width:`${width}px`}">
        <div class="d-flex align-center">
            <el-checkbox
                v-model="checkValue" 
                :label="title" 
                :true-value="trueValue" 
                :false-value="falseValue"
                :indeterminate="indeterminate"
                :size="size"
                :width="width"
                :disabled="disabled"
            ></el-checkbox>
            <el-tooltip effect="dark" :content="tips" placement="top" v-if="tips.length">
                <img :src="TipsFill" class="ml-8 tipsIcon">
            </el-tooltip>
        </div>
    </div>
</template>

<script name="Checkbox" setup>
    import { ref, watch } from 'vue'; 
    import TipsFill from '@/assets/svg/TipsFill.svg';

    const props = defineProps({
        title:String,
        modelValue:[String,Boolean],
        trueValue:String,
        falseValue:{
            type:String,
            default:''
        },
        indeterminate:{
            type:Boolean,
            default:false
        },
         size:{
            type:String,
            default:''
        },
        width:{
            type:String,
            default:''
        },
        disabled:{
            type:Boolean,
            default:false
        },
        resetTrigger:{
            type:Number,
            default:0
        },
        tips:{
            type:String,
            default:''
        }
    });

    const checkValue = ref('');
    checkValue.value = props.modelValue;

    const emit = defineEmits(['update:modelValue']);

    watch(()=>checkValue.value,(v)=>{
        emit('update:modelValue',v);
    });
    
    watch(()=>props.modelValue,()=>{
        checkValue.value = props.modelValue;
    });

    watch(() => props.resetTrigger, () => {
       checkValue.value = '';
    });
</script>


<style lang="scss" scoped>
    .checkbox{
        width:160px;
        display:inline-block;
        margin:8px 8px 4px 0px;
        &:has(.el-checkbox--large){
            margin:12px 8px 4px 0px;
        }

        &:has(.el-checkbox--large){
            width:200px;
        }
        
        
        :deep(label.el-checkbox){
            height:auto;
        }

        :deep(.el-checkbox__inner){
            border-radius:4px;
            border-color:$grey-300;
        }


        :deep(.el-checkbox) {
            font-weight:normal;
            .el-checkbox__input:not(.is-indeterminate) + .el-checkbox__label {
                color: $grey-600;
            } 
        }

        :deep(.el-checkbox.is-disabled) {
            .el-checkbox__input + .el-checkbox__label {
                color: $grey-500;
            } 

            .el-checkbox__inner{
                background:$grey-100;
                &::after{
                    border-color:$grey-300;
                }
            }
        }

        :deep(.el-checkbox) {
            .el-checkbox__input.is-indeterminate:not(.is-disabled) + .el-checkbox__label {
                color: $blue-600;
            }
        }

        :deep(.el-checkbox.is-checked:not(.is-disabled)){
            .el-checkbox__label{
                color:$blue-600 !important;
            }

            .el-checkbox__inner{
                border-color:$blue-600;
                background-color:$blue-600;
            }
        }

        :deep(.el-checkbox__input.is-indeterminate:not(.is-disabled)){
            .el-checkbox__inner{
                border-color:$blue-600;
                background-color:$blue-600;
            }
        }

        :deep(.el-checkbox--large){
            .el-checkbox__label{
                font-size:16px;
            }

            .is-indeterminate{
                .el-checkbox__inner{

                    &:before{
                       top: 7px
                    }
                }   
            }

            .el-checkbox__inner{
                width:18px;
                height:18px;

                &:after{
                    width: 4px;
                    height: 10px;
                    left: 5px;
                    border-width: 2px;
                }
            }   
        }

        .tipsIcon{
            border-radius:50%;
            background:$grey-400;
            width:16px;
            height:16px;
        }
    }
</style>