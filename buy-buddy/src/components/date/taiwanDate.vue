<template>
    <div class="taiwan_date">
        <div class="title" v-if="title">
            {{title}}
        </div>
        <div>
            <slot name="title"></slot>
        </div>
        <div class="d-flex align-center">
            <Select
                class="mb-0"
                v-model="yearValue"
                :size="size"
                :placeholder="'請選擇民國年'"
                :style="{'width': widthSize + 'px'}"
                :options="yearOptions"
                :disabled="disabled"
                :resetTrigger="resetTrigger"
                @blur="handleBlur()"
                @change="handleChange()"
            ></Select>
            <span class="fw-400 mx-8 ft-14">年</span>
            <Select
                class="mb-0"
                v-model="monthValue"
                :size="size"
                :placeholder="'請選擇月份'"
                :style="{'width': widthSize + 'px'}"
                :options="monthOptions"
                :disabled="disabled"
                :resetTrigger="resetTrigger"
                @blur="handleBlur()"
                @change="handleChange()"
            ></Select>
            <span class="fw-400 mx-8 ft-14">月</span>
            <Select
                class="mb-0"
                v-model="dayValue"
                :size="size"
                :placeholder="'請選擇日期'"
                :style="{'width': widthSize + 'px'}"
                :options="dayOptions"
                :disabled="disabled"
                :resetTrigger="resetTrigger"
                @blur="handleBlur()"
                @change="handleChange()"
            ></Select>
            <span class="fw-400 mx-8 ft-14">日</span>
        </div>
    </div>
    <!-- 浮動 helper text -->
    <div  v-if="ruleResult.helperText && (ruleResult.validate === 'tips' || ruleResult.validate === '')" class="validateMsg ft-12 line-18" style="color: #9CA3AF;">{{ ruleResult.helperText }}</div>
    <!-- 客製成功訊息 -->
    <div v-if="ruleResult.successText && ruleResult.validate === 'success'" class="validateMsg validateSuccessIcon ft-12 line-18" style="color: #65A30D;">{{ ruleResult.successText }}</div>
    <!-- 客製警示(黃字)成功訊息 -->
    <div v-if="ruleResult.warnningText && ruleResult.validate === 'warning'" class="validateMsg validateWarnningIcon ft-12 line-18" style="color: #D97706;">{{ ruleResult.warnningText }}</div>

</template>


<script name="TaiwanDate" setup>
    import { ref, reactive, nextTick, watch, computed } from 'vue';
    import Select from "@/components/select/select.vue";

    const props = defineProps({
        title:{
            type:String,
            default:''
        },
        modelValue:{
            type:String,
            default:''
        },
        resetTrigger:{
            type:Number,
            default:0
        },
        rulesMsg:{
            type:Object,
            default:{
                helperText:'',   //預設顯示文字(灰)
                successText:'',  //後端回傳成功文字(綠)
                warnningText:'', //後端回傳成功文字(橘)
                validate:'',     //驗證註記 'tips'|顯示helpText error|紅字 success|綠字 warning|橘字
            }
        },
        size:{
            type:String,
            default:''
        },
        disabled:{
            type:Boolean,
            default:false
        }
    });
    const widthSize = ref(200);

    const yearValue = ref('');
    const yearOptions = reactive([]);
    // 西元年轉為民國年
    const yearOptionsVal = ref(new Date().getFullYear());
    for(let y = yearOptionsVal.value - 100; y <= yearOptionsVal.value; y++){
        yearOptions.push({value:String(y),label:`民國${String(y-1911)}`});
    };

    const monthValue = ref('');
    const monthOptions = reactive([]);
    for(let m = 1; m <= 12; m++){
        let mval = String(m).padStart(2,"0");
        monthOptions.push({value:mval,label:mval});
    };

    const dayValue = ref('');
    let dayOptions = ref([{value:'',label:'請選擇日期'}]);

    //組成日期選單
    const setDayOption = () => {
        dayOptions.value = [];
        switch(monthValue.value) {
            case '01':
            case '03':
            case '05':
            case '07':
            case '08':
            case '10':
            case '12':
                for(let D = 1; D <= 31; D++){
                    let DVal = String(D).padStart(2,"0");
                    dayOptions.value.push({value:DVal,label:DVal});
                }
                break;
            case '04':
            case '06':
            case '09':
            case '11':
                for(let D = 1; D <= 30; D++){
                    let DVal = String(D).padStart(2,"0");
                    dayOptions.value.push({value:DVal,label:DVal});
                }
                break;
            case '02':
                let y2 = Number(yearValue.value);
                if((y2 % 4 === 0 && y2 % 100 !== 0) || (y2 % 400 === 0)){
                    for(let D = 1; D <= 29; D++){
                        let DVal = String(D).padStart(2,"0");
                        dayOptions.value.push({value:DVal,label:DVal});
                    }
                }else{
                    for(let D = 1; D <= 28; D++){
                        let DVal = String(D).padStart(2,"0");
                        dayOptions.value.push({value:DVal,label:DVal});
                    }
                }
                break;
        }
        
        if(!props.modelValue || !dayOptions.value.some(item =>item.value === dayValue.value)){
            dayValue.value = monthValue.value? '01' : '';
        }
    }

    // 將modelValue字串切割轉換成陣列
    nextTick(()=>{
        watch(()=>props.modelValue,()=>{
            if(props.modelValue){ 
                const dataStr = props.modelValue.split('-');
                // 將陣列裡的值帶入
                yearValue.value = dataStr[0] ? dataStr[0] : '';
                monthValue.value = dataStr[1] ? dataStr[1] : '';
                dayValue.value = dataStr[2] ? dataStr[2] : '';
            }else{
                yearValue.value = '';
                monthValue.value = '';
                dayValue.value = '';
            }
        },{immediate:true});
    })

    watch(() => yearValue.value,() => {
        if(yearValue.value){
            setDayOption();
        }else{
            dayValue.value = '';
        }
    },{immediate:true});

    watch(() => monthValue.value,() => {
        setDayOption();
    },{immediate:true});

    
    const nowDate = computed(() => {
        return `${yearValue.value}-${monthValue.value}-${dayValue.value}`;
    });

    const emit = defineEmits(['update:modelValue','blur','change']);
    watch(nowDate,()=>{
        if(yearValue.value && monthValue.value && dayValue.value){
            emit('update:modelValue',nowDate.value);
        }else{
            emit('update:modelValue','');
        }
    });

    const resetTrigger = ref(props.resetTrigger);
    watch(()=>props.resetTrigger, ()=>{
        resetTrigger.value = props.resetTrigger;
    });

    const ruleResult = ref(props.rulesMsg);
    watch(() =>props.rulesMsg, ()=>{
        ruleResult.value = props.rulesMsg;
    },{deep:true});

    const handleBlur = () => {
        emit('blur');
    }

    const handleChange = () => {
        emit('change');
    }

</script>


<style lang="scss" scoped>
    .taiwan_date{

        .title{
            color: #1F2937;
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;
            margin-bottom: 4px;
            font-family: "Noto Sans TC";
            text-align: left;
        }
    }

    .mb-0{
        margin-bottom: 0;
    }

    .mt-4{
        margin-top: 4px;
    }

    .mx-8{
        margin-left: 8px;
        margin-right: 8px;
    }

    .fw-400{
        font-family: 'Noto Sans TC';
        font-weight: 400;
    }

    .el-form-item:has(.el-form-item__error) .validateMsg{
        display:none;
    }

    .line-18{
        line-height:18px;
    }
</style>