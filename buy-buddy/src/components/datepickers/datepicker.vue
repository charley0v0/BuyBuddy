<template>
    <div id="date-picker">
        <el-config-provider :locale="locale">
            <div class="title" v-if="title">{{title}}</div>
            <el-date-picker
                v-model="nowDate"
                :type="useTime? 'datetime' : 'date'"
                placeholder="選擇日期"
                date-format="YYYY-MM-DD"
                time-format="A hh:mm"
                :format="useTime ? `YYYY-MM-DD HH:mm:ss` : `YYYY-MM-DD`"
                :value-format="useTime ? `YYYY-MM-DD HH:mm:ss` : `YYYY-MM-DD`"
                :disabled="disabled"
                :disabled-date="disabledDate"
                :editable="false"
                :clear-icon="clearIcon"
                @blur="handleBlur()"
                @change="handleChange()"
            >
            </el-date-picker>
        </el-config-provider>
    </div>
</template>

<script name="Datepicker" setup>
    import { h, ref, watch, watchEffect, shallowRef } from 'vue'
    import { Icon } from '@vicons/utils'
    import { ClearFilled } from '@vicons/material'
    import PrimaryCircle from "@/components/button/primaryCircle.vue"
    import zhTw from 'element-plus/dist/locale/zh-tw.mjs'

    const props = defineProps({
        title:String,
        modelValue:{
            type:String,
            default:new Date().toLocaleDateString('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit'}).replaceAll('/','-')
        },
        disabled:{
           type:Boolean,
           default:false
        },
        minDate:{
            type:String,
            default:''
        },
        maxDate:{
            type:String,
            default:''
        },
        resetTrigger:{
            type:Number,
            default:0
        },
        useTime:{
            type:Boolean,
            default:false
        }
    });

    const clearIcon = shallowRef({
        render() {
            return h(PrimaryCircle,{ buttonSize: 'small' },
                    {
                        icon: () => h(Icon, null, {
                            default: () => h(ClearFilled)
                        })
                    }
            )
        }
    });

    const locale = zhTw;
    const nowDate = ref('');
    const emit = defineEmits(['update:modelValue','blur','change']);

    const minDate = ref(props.minDate);
    const maxDate = ref(props.maxDate);

    watchEffect(() => {
        nowDate.value = props.modelValue || '';
    });

    const disabledDate = (t) => {
        const date = t.toLocaleDateString('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit'}).replaceAll('/','-');
        const min = new Date(minDate.value).toLocaleDateString('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit'}).replaceAll('/','-');
        const max = new Date(maxDate.value).toLocaleDateString('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit'}).replaceAll('/','-');
        return new Date(date).getTime() < new Date(min).getTime() || new Date(date).getTime() > new Date(max).getTime();
    }

    watch(()=> nowDate.value, (d)=>{
        emit('update:modelValue',d);
    });

    watch(() => props.resetTrigger, () => {
        nowDate.value = '';
    });

    const handleBlur = () => {
        emit('blur');
    }

    const handleChange = () => {
        emit('change');
    }
    
</script>

<style lang="scss" scoped>
    #date-picker{
        width:100%;
        .title{
            color: #1F2937;
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;
            font-family: "Noto Sans TC";
            text-align: left;
            margin-bottom: 4px;
            letter-spacing: 0.56px;
        }   

        :deep(.el-date-editor){
            width:100%;
            height:36px;
            box-sizing: border-box;
        }

        :deep(.el-input__wrapper){
            padding:1px 12px;
            font-size:14px;

            &:hover{
                box-shadow: 0 0 0 1px $blue-600 inset;
            }

            &.is-focus{
                box-shadow: 0 0 0 1px $blue-600 inset;
            }
        }

        :deep(.el-input__inner){
            color:$grey-800 !important;
        }

        :deep(.el-input.is-disabled){
            .el-input__wrapper{
                box-shadow: 0 0 0 1px $grey-200 inset !important;
                background-color:$grey-100;
                
            }

            .el-input__inner{
                -webkit-text-fill-color:$grey-800;

                &::placeholder{
                    -webkit-text-fill-color:#ADB0B7;
                }
            }
        }
    }
</style>