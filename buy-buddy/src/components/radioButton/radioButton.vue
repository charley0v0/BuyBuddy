<template>
    <div class="single_radio">
        <el-radio 
            v-model="radioValue"
            :value="checkValue"
            :disabled="disabled"
            :size="size"
        >
            <slot name="title">
                <span>{{title}}</span>
            </slot>
        </el-radio>
    </div>
</template>

<script name="RadioButton" setup>
    import { ref, watch, watchEffect } from 'vue';
    const props = defineProps({
        modelValue:{
            type:[String,Boolean],
            default:''
        },
        title:String,
        // checkValue:String,
        checkValue:{
            type:[String,Boolean],
            default:''
        },
        disabled:{
            type:Boolean,
            default:false
        },
        size:{
            type:String,
            default:''
        },
        resetTrigger:{
            type:Number,
            default:0
        }
    });

    const radioValue = ref('');

    watchEffect(() => {
        radioValue.value = props.modelValue;
    });

    const emit = defineEmits(['update:modelValue']);

    watch(()=> radioValue.value, (r)=>{
        emit('update:modelValue',r);
    });

    watch(() => props.resetTrigger, () => {
       radioValue.value = '';
    });

</script>

<style lang="scss" scoped>
    .single_radio{
        :deep(.el-radio){
            width:160px;
            height:auto;

            .el-radio__label{
                font-family: "Noto Sans TC";
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 20px;
                letter-spacing: 0.56px;
            }

            .el-radio__inner{
                &::after{
                    width: 7px;
                    height: 7px;
                }
            }

            &:not(.is-disabled){
                .el-radio__inner{
                    width:14px !important;
                    height:14px !important;
                    border:1px solid $grey-300;
                }

                &.is-checked{
                    .el-radio__label{
                        color:$blue-600;
                    }
                    .el-radio__inner{
                        background:white;
                        &::after{
                            background-color:$blue-600;
                        }
                    }
                }
            }   

            &.el-radio--large{
                .el-radio__label{
                    font-size: 16px;
                    line-height: 24px;
                    letter-spacing: 0.64px;
                }

                .el-radio__inner{
                    width:18px !important;
                    height:18px !important;

                    &::after{
                        width: 10px;
                        height: 10px;
                    }
                }
            }
        }
    }
</style>