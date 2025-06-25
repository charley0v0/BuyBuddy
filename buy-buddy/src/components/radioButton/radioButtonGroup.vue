<template>
    <div class="radio_group">
        <div class="mb-8 title" v-if="groupTitle">{{groupTitle}}</div>
        <el-radio-group v-model="radioValue" :class="{'vertical':vertical}">
            <el-radio 
                v-for="(item,idx) in radioGroup"
                :value="item.value"
                :disabled="item.disabled"
                :size="size"
            >{{item.title}}</el-radio>
        </el-radio-group>
    </div>
</template>


<script name="RadioButtonGroup" setup>
    import { ref, watch, watchEffect } from 'vue';
    const props = defineProps({
        modelValue:{
            type:[String,Boolean],
            default:''
        },
        groupTitle:{
            type:String,
            default:''
        },
        radioArray:Array,
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
        },
        vertical:{
            type:Boolean,
            default:false
        }
    });

    const radioValue = ref('');
    const radioGroup = ref([]);
    const emit = defineEmits(['update:modelValue']);

    watchEffect(()=>{
        radioValue.value = props.modelValue;
        radioGroup.value = JSON.parse(JSON.stringify(props.radioArray));
        radioGroup.value.forEach((x,idx)=>{
            x.disabled = props.disabled ? true : props.radioArray[idx].disabled;
        })
    });

    watch(()=> radioValue.value, (r)=>{
        emit('update:modelValue',r);
    });

    watch(() => props.resetTrigger, () => {
        radioValue.value = '';
    });

</script>

<style lang="scss" scoped>
    .radio_group{
        .mb-8{
            margin-bottom:8px;
        }

        .title{
            font-family: "Noto Sans TC";
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: 0.56px;
        }

        :deep(.el-radio){
            min-width:160px;
            height:auto;
            margin-right:8px;
            
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

        .vertical{
            display:block;
            label{
                height:28px;
                display:block;
            }
        }
    }
</style>