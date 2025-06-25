<template>
    <div class="default_input">
        <div class="title" v-if="title">
            {{title}}
        </div>
        <div>
            <slot name="title"></slot>
        </div>
        <el-input
            ref="defaultInputRef"
            v-model="displayValue"
            class="w-50 m-2 custom_input"
            :class="[setCustomClass]"
            :placeholder="placeholder"
            :disabled="disabled"
            :type="type"
            :autocomplete="type === 'password' ? 'new-password' : 'off'"
            :show-password="showPassword"
            :maxlength="maxlength || ''"
            :show-word-limit="showWordLimit"
            :autosize="autosize"
            :custom-ref="customRef"
            :size="size"
            @blur="handleBlur()"
            @keydown.tab="handleBlur()"
            @input="handleInput"
        >
            <template #suffix>
                <div class="clearValue" v-if="displayValue && !showWordLimit && !showPassword && !disabled" @click="clearValue()">
                    <PrimaryCircle :buttonSize="'small'">
                        <template #icon>
                            <Icon>
                                <ClearFilled />
                            </Icon>
                        </template>
                    </PrimaryCircle>
                </div>
            </template>
        </el-input>
        <!-- 浮動 helper text -->
        <div  v-if="ruleResult.helperText && (ruleResult.validate === 'tips' || ruleResult.validate === '')" class="validateMsg ft-12 line-14" style="color: #9CA3AF;">{{ ruleResult.helperText }}</div>
        <!-- 客製成功訊息 -->
        <div v-if="ruleResult.successText && ruleResult.validate === 'success'" class="validateMsg validateSuccessIcon ft-12 line-14" style="color: #65A30D;">{{ ruleResult.successText }}</div>
        <!-- 客製警示(黃字)成功訊息 -->
        <div v-if="ruleResult.warnningText && ruleResult.validate === 'warning'" class="validateMsg validateWarnningIcon ft-12 line-14" style="color: #D97706;">{{ ruleResult.warnningText }}</div>
    </div>
</template>

<script name="DefaultInput" setup>
    import { ref, watch, watchEffect, nextTick } from 'vue'
    import { Icon } from '@vicons/utils'
    import { ClearFilled } from '@vicons/material'
    import { ElInput } from 'element-plus'
    

    const props = defineProps({
        modelValue:[String,Number],
        title: {
            type:String,
            default:''
        },
        type: String,
        placeholder: [String,Number],
        maxlength: [Number,Boolean],
        disabled: Boolean,
        focus:Boolean,
        showWordLimit: Boolean,
        autosize: {
            type: [Object, Boolean],
            // default: { minRows: 2, maxRows: 4 }
        },
        showPassword: Boolean,
        customClass: {type:String,default:''},
        size:String,
        customRef: String,
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
        //輸入框前綴字
        OTP:{
            type:String,
            default:''
        },
        formatType: {
            type: String,
            default: '', // 金額使用='currency' | 純數字='number'
        }
    });

    //接受父組件預設值傳入
    const inputValue = ref('');
    const displayValue = ref('');
    const ruleResult = ref({});
    const setCustomClass = ref(props.customClass);
    const clearRef = ref(null);
    const defaultInputRef = ref(null);

    const updateDisplayValue = () => {
        if (props.OTP) {
            displayValue.value = props.OTP + (inputValue.value || '');
        } else {
            displayValue.value = inputValue.value;
        }
    };

    const handleInput = (value) => {
        if (props.OTP) {
            const inputElement = defaultInputRef.value.$el.querySelector('input');
            const cursorPosition = inputElement.selectionStart;
            
            // 如果游標在 OTP 前綴文字範圍內，阻止刪除操作
            if (cursorPosition < props.OTP.length) {
                displayValue.value = props.OTP + (inputValue.value || '');
                // 將游標位置設置到 OTP 之後
                nextTick(() => {
                    inputElement.setSelectionRange(props.OTP.length, props.OTP.length);
                });
                return;
            }

            // 如果輸入值小於 OTP 長度，說明用戶正在嘗試刪除 OTP
            if (value.length < props.OTP.length) {
                displayValue.value = props.OTP;
                inputValue.value = '';
                return;
            }
            
            // 確保 OTP 前綴不能被刪除
            if (!value.startsWith(props.OTP)) {
                displayValue.value = props.OTP + value.replace(props.OTP, '');
            }
            // 只回傳 OTP 之後的值給父層
            inputValue.value = value.slice(props.OTP.length);
        } else {
            inputValue.value = value;
        }
    };

    watch(() => props.modelValue, (newVal) => {
        if(newVal === undefined || newVal === null){
            inputValue.value = '';
        } else {
            inputValue.value = String(newVal);
        }
        updateDisplayValue();
    },{immediate:true, deep:true});

    watch(() => props.OTP, (newVal) => {
        updateDisplayValue();
    },{immediate:true, deep:true});

    watchEffect(() => {
        ruleResult.value = props.rulesMsg;

        if (props.formatType === 'currency' || props.formatType === 'number') {
            //過濾非數字
            const raw = String(inputValue.value ?? '');
            const cleaned = raw.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '');
            inputValue.value = cleaned;

            if (props.formatType === 'currency'){ 
                //加千分符號
                const formatted = cleaned ? cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
                if (raw !== '' && raw !== formatted && inputValue.value !== formatted) {
                    inputValue.value = formatted;
                }
            }

            updateDisplayValue();
        }
    });

    //與父組件v-model綁定
    const emit = defineEmits(['update:modelValue', 'checkValidateField', 'blur']);
    watch(()=>inputValue.value, ()=>{
        if(props.formatType === 'currency'){
            emit('update:modelValue',inputValue.value.replace(/,/g, ""));
        } else {
            emit('update:modelValue',inputValue.value);
        }
    });

    //組件初始化
    watch(() => props.resetTrigger, () => {
        inputValue.value = '';
        updateDisplayValue();
        setCustomClass.value = props.customClass;
    });

    const handleBlur = () => {
        emit('checkValidateField',true); //觸發父層helperText顯示判斷
        emit('blur'); //觸發原生blur事件
        defaultInputRef.value.$el.blur();
    }
    
    //因element-plus textarea組件無large size, 故需增加客製化size
    watch(()=> props.size, ()=>{
        document.querySelectorAll('.el-textarea__inner').forEach(x =>{
            x.style.fontSize = props.size == 'large' ? '16px' : '';
        });
    });
    
    const clearValue = () => {
        inputValue.value = '';
        updateDisplayValue();
    }

    nextTick(()=>{
        //組件渲染完成後根據參數決定是否focus
        watch(()=>props.focus,()=>{
            if(props.focus){
                defaultInputRef.value.focus();
            }
        });
    });

</script>


<style lang="scss" scoped>
    .default_input {
        width:100%;

        .clearValue{
            display:none;
        }

        .title {
            color: $grey-800;
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;
            font-family: 'Noto Sans TC';
            text-align: left;
            margin-bottom: 4px;
            letter-spacing:0.56px;
        }

        .custom_input {
            max-width:100%;
            border-radius:4px;
            margin-bottom: 4px;

            &:has(.el-input__wrapper.is-focus){
                box-shadow: 1px 1px 4px #eee;
            }
        }

        .custom_input > :deep(.el-input__wrapper){
            height:36px;
            font-size:14px;
            box-sizing:border-box;

            &:hover {
                box-shadow: 0 0 0 1px $blue-600 inset;

                .clearValue{
                    display:block;
                }
            }

            &.is-focus{
                box-shadow: 0 0 0 1px $blue-600 inset;

                .clearValue{
                    display:block;
                }
            }
        }

        .custom_input :deep(.el-input--large) > :deep(.el-input__wrapper){
            height:48px;
            font-size:20px;
            box-sizing:border-box;
        }

        :deep(.el-input__wrapper){
            box-shadow: 0 0 0 1px $border inset;
            &:hover {
                box-shadow: 0 0 0 1px $blue-600 inset;
            }

            .el-input__password{
                font-size:20px;    
            }
        }

        :deep(.el-textarea__inner){
            &:hover {
                box-shadow: 0 0 0 1px $blue-600 inset;
            }
        }

        :deep(.el-input--large){
            .el-input__wrapper{
                height:48px;
                font-size:16px;

                .el-input__password{
                    font-size:24px;    
                }
            }
        }

        .ft-12{
            font-size:12px;
        }

        .line-14{
            line-height:14px;
        }

        .validateMsg{
            letter-spacing:0.48px;
        }
    }

    .el-form-item:has(.el-form-item__error) .validateMsg{
        display:none;
    }

    :deep(.el-input.is-disabled .el-input__wrapper) {
        background-color:$grey-100;
        box-shadow: 0 0 0 1px $border inset !important;
    }

    :deep(.el-textarea.is-disabled .el-textarea__inner) {
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

    :deep(.el-textarea){
        .el-textarea__inner{
            -webkit-text-fill-color: $grey-800;

            &::placeholder{
                -webkit-text-fill-color: $grey-400;
            }
        }

        &.is-disabled .el-textarea__inner{
            -webkit-text-fill-color: $grey-800;
        }
    }

</style>