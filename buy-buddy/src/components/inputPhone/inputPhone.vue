<template>
    <div class="ft-14 lt-56">
        {{title}}
        <slot name="title"></slot>
    </div>
    <div class="d-flex flex-wrap mb-n20">
        <Select
            v-model="InputphoneArea"
            class="w-80 flex-none"
            :title="''"
            :placeholder="'區碼'"
            :options="csPhone ? cscode: areacode"
            :size="size"
            :disabled="disabled"
            :resetTrigger="defaultResetTrigger"
            :useFilter="true"
            @change="handleBlur()"
            @blur="handleBlur()"
        ></Select>

        <DefaultInput
            v-model="InputphoneNum"
            class="mx-10 mb-16 phone_number"
            :size="size"
            :maxlength="8"
            :disabled="disabled"
            :resetTrigger="defaultResetTrigger"
            :focus="focusNumber"
            @change="replaceNonNumeric"
            @blur="handleBlur()"
        ></DefaultInput>

        <div class="d-flex justify-between align-center phone_fax">
            <div class="ft-14 mb-16">分機</div>
            <DefaultInput
                v-model="InputphoneExt"
                class="w-80 ml-10 mb-16 flex-none"
                :size="size"
                :maxlength="8"
                :disabled="disabled"
                :resetTrigger="defaultResetTrigger"
                @change="changeInput"
                @blur="handleBlur()"
            ></DefaultInput>
        </div>
    </div>
    <!-- 浮動 helper text -->
    <div  v-if="ruleResult.helperText && (ruleResult.validate === 'tips' || ruleResult.validate === '')" class="validateMsg ft-12 line-18" style="color: #9CA3AF;">{{ ruleResult.helperText }}</div>
    <!-- 客製成功訊息 -->
    <div v-if="ruleResult.successText && ruleResult.validate === 'success'" class="validateMsg validateSuccessIcon ft-12 line-18" style="color: #65A30D;">{{ ruleResult.successText }}</div>
    <!-- 客製警示(黃字)成功訊息 -->
    <div v-if="ruleResult.warnningText && ruleResult.validate === 'warning'" class="validateMsg validateWarnningIcon ft-12 line-18" style="color: #D97706;">{{ ruleResult.warnningText }}</div>
</template>

<script name="InputPhone" setup>
    import { ref, watch, watchEffect, computed } from 'vue'

    const props = defineProps({
        title:{
            type:String,
            default:''
        },
        //區碼參數
        InputphoneArea:{
            type:String,
            default:''
        },
        //電話號碼參數
        InputphoneNum:{
            type:String,
            default:''
        },
        //分機參數
        InputphoneExt:{
            type:String,
            default:''
        },
        size:{
            type:String,
            default:''
        },
        resetTrigger:{
            type:Number,
            default:0
        },
        disabled: {
            type:Boolean,
            default:false
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
        //若為客服電話則csPhone為true,將使用客服專用區碼陣列
        csPhone:{
            type:Boolean,
            default:false
        }
    })

    //市話區碼
    const areacode = [
        {label:'區碼',value:''},
        {label:'02',value:'02'},
        {label:'03',value:'03'},
        {label:'037',value:'037'},
        {label:'04',value:'04'},
        {label:'049',value:'049'},
        {label:'05',value:'05'},
        {label:'06',value:'06'},
        {label:'07',value:'07'},
        {label:'08',value:'08'},
        {label:'089',value:'089'},
        {label:'082',value:'082'},
        {label:'0826',value:'0826'},
        {label:'0836',value:'0836'},
    ];
    //客服區碼
    const cscode = [
        {label:'區碼',value:''},
        {label:'02',value:'02'},
        {label:'03',value:'03'},
        {label:'037',value:'037'},
        {label:'04',value:'04'},
        {label:'049',value:'049'},
        {label:'05',value:'05'},
        {label:'06',value:'06'},
        {label:'07',value:'07'},
        {label:'08',value:'08'},
        {label:'089',value:'089'},
        {label:'082',value:'082'},
        {label:'0826',value:'0826'},
        {label:'0836',value:'0836'},
        {label:'0800',value:'0800'},
        {label:'09',value:'09'}
    ]


    const InputphoneArea = ref(props.InputphoneArea);
    const InputphoneNum = ref(props.InputphoneNum);
    const InputphoneExt = ref(props.InputphoneExt);
    const ruleResult = ref({});


    watch(() => props.InputphoneArea, (newVal) => {
        InputphoneArea.value = newVal;
    });
    watch(() => props.InputphoneNum, (newVal) => {
        InputphoneNum.value = newVal;
    });
    watch(() => props.InputphoneExt, (newVal) => {
        InputphoneExt.value = newVal;
    });

    watchEffect(()=>{
        ruleResult.value = props.rulesMsg;

    });
   
    const emit = defineEmits(['update:InputphoneArea', 'update:InputphoneNum', 'update:InputphoneExt', 'checkValidateField', 'blur']);


    //變更區碼後自動聚焦號碼欄位
    const focusNumber = ref(false);
    watch(()=>InputphoneArea.value,()=>{
        emit('update:InputphoneArea', InputphoneArea.value);
        focusNumber.value = true;
    });

    //觸發父層helperText顯示判斷
    const handleBlur = () => {
        replaceNonNumeric();
        changeInput();
        emit('update:InputphoneArea', InputphoneArea.value);
        // emit('update:InputphoneNum', InputphoneNum.value);
        // emit('update:InputphoneExt', InputphoneExt.value);
        emit('checkValidateField'); 
        emit('blur'); //觸發原生blur事件
    }
    
    //替換掉非數字
    const replaceNonNumeric = function() {
        InputphoneNum.value = InputphoneNum.value?.replace(/\D/g, '');
        emit('update:InputphoneNum', InputphoneNum.value);
    }
    const changeInput = function(){
        InputphoneExt.value = InputphoneExt.value?.replace(/\D/g, '');
        emit('update:InputphoneExt', InputphoneExt.value);
    }

    //組件初始化
    const defaultResetTrigger = ref(0);
    watch(() => props.resetTrigger, () => {
        defaultResetTrigger.value = props.resetTrigger;
        emit('update:InputphoneArea', '');
        emit('update:InputphoneNum', '');
        emit('update:InputphoneExt', '');
    });

</script>


<style lang="scss" scoped>
    .input_number :deep(.el-input-number){
        width:100%;
        max-width:100%;
        border-radius: 5px;
    }
    .input_number :deep(.el-input){
        width:100%;
    }

    .input_number  :deep(.el-input__wrapper):hover{
        box-shadow: 0 0 0 1px $blue-600 inset;
    }

    .el-is-focus{
        box-shadow: 1px 1px 4px #eee;
    }

    .mx-10{
        margin-left:10px;
        margin-right:10px;
    }

    .ml-10{
        margin-left:10px;
    }

    .mb-9{
        margin-bottom:12px;
    }

    .mb-n20{
        margin-bottom:-20px;
    }

    .w-80{
        width:80px !important;
    }

    .phone_number{
        width: calc(100% - 80px - 20px - 125px) !important;
    }
    
    .phone_fax{
        width:125px;
    }

    .validateMsg{
        margin-top:4px;
    }

    .el-form-item:has(.el-form-item__error) .validateMsg{
        display:none;
    }

    .line-18{
        line-height:18px;
    }

    .flex-none{
        flex:none;
    }

    .lt-56{
        letter-spacing:0.56px;
    }
</style>
