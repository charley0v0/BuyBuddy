<template>
    <div class="date-picker-ranger">
        <el-config-provider :locale="locale">
            <slot name="title">
                <div class="title" v-if="title">{{title}}</div>
            </slot>
            <el-date-picker
                v-model="nowDateRange"
                :type="useTime? 'datetimerange' : 'daterange'"
                :start-placeholder="`開始${useTime? '時間': '日期'}`"
                :end-placeholder="`結束${useTime? '時間': '日期'}`"
                date-format="YYYY-MM-DD"
                time-format="A hh:mm"
                :format="useTime ? `YYYY-MM-DD HH:mm:ss` : `YYYY-MM-DD`"
                :value-format="useTime ? `YYYY-MM-DD HH:mm:ss` : `YYYY-MM-DD`"
                :disabled="disabled"
                :editable="false"
                :disabled-date="disabledDate"
                :shortcuts="shortCuts"
                :clear-icon="clearIcon"
                @blur="handleBlur()"
                @change="handleChange()"
            ></el-date-picker>
        </el-config-provider>
    </div>
</template>

<script name="DatepickerRange" setup>
    import { h, ref, reactive, watch, watchEffect, shallowRef } from 'vue'
    import { Icon } from '@vicons/utils'
    import { ClearFilled } from '@vicons/material'
    import PrimaryCircle from "@/components/button/primaryCircle.vue"
    import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
    const props = defineProps({
        title:String,
        modelValue:{
            type:Array,
            default:[new Date().toLocaleDateString('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit'}).replaceAll('/','-'),new Date().toLocaleDateString('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit'}).replaceAll('/','-')]
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
        useShortCuts:{
            type:Boolean,
            default:true
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
    const nowDateRange = ref([]);
    const emit = defineEmits(['update:modelValue','blur','change']);

    //設定範圍區間
    const minDate = ref(props.minDate);
    const maxDate = ref(props.maxDate);
    const disabledDate = (t) => {
        const date = t.toLocaleDateString('zh-Tw').replaceAll('/','-');
        const min = new Date(minDate.value).toLocaleDateString('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit'}).replaceAll('/','-');
        const max = new Date(maxDate.value).toLocaleDateString('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit'}).replaceAll('/','-');
        return new Date(date).getTime() < new Date(min).getTime() || new Date(date).getTime() > new Date(max).getTime();
    }

    //顯示快捷區間
    const shortCuts = ref([]);

    watchEffect(()=>{
        nowDateRange.value = props.modelValue || '';

        if(props.useShortCuts){
            shortCuts.value = [
                {
                    text:'最近一個月',
                    value:() => {
                        const start = new Date();
                        const end = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 *30);
                        return [start,end];
                    }
                },
                {
                    text:'最近三個月',
                    value:() => {
                        const start = new Date();
                        const end = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 *90);
                        return [start,end];
                    }
                }
            ]
        }else{
            shortCuts.value = [];
        }
    });

    watch(()=> nowDateRange.value, (d)=>{
        emit('update:modelValue',d);
    });

    watch(() => props.resetTrigger, () => {
       nowDateRange.value = ['',''];
    });

    const handleBlur = () => {
        emit('blur');
    }

    const handleChange = () => {
        emit('change');
    }
    
</script>

<style lang="scss" scoped>

    .date-picker-ranger{
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
            padding:1px 12px;
            box-sizing: border-box;

            &:hover{
                box-shadow: 0 0 0 1px $blue-600 inset;
            }

            &.is-active{
                box-shadow: 0 0 0 1px $blue-600 inset;
            }

            &.is-disabled{
                box-shadow: 0 0 0 1px $grey-200 inset !important;
                background-color:$grey-100;

                input{
                    background-color:$grey-100;
                }
            }

            .el-range-input{
                font-size:14px;
                color:$grey-800 !important;
            }
        }
    }

    :deep(.el-range-editor){
        .is-active{
            box-shadow: 0 0 0 1px red inset;
        }
    }

</style>