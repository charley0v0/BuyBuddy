<template>
  <div class="select">
    <div class="title" v-if="title">{{ title }}</div>
    <el-select
      v-model="selectVal"
      :placeholder="placeholder"
      :disabled="disabled"
      :teleported="false"
      :fit-input-width="false"
      :filterable="useFilter"
      :size="size"
      :multiple="multiple"
      :max-collapse-tags="2"
      collapse-tags
      @blur="handleBlur()"
      @change="handleChange()"
    >
      <template #header v-if="options.length > 5 && multiple">
          <el-checkbox v-model="checkAll" @change="selectAll()">
            全選
          </el-checkbox>
      </template>
      <el-option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
        :label="item.label"
        :disabled="item.disabled"
      >
      </el-option>
    </el-select>
    <!-- 浮動 helper text -->
    <div  v-if="ruleResult.helperText && (ruleResult.validate === 'tips' || ruleResult.validate === '')" class="validateMsg ft-12 line-18" style="color: #9CA3AF;">{{ ruleResult.helperText }}</div>
    <!-- 客製成功訊息 -->
    <div v-if="ruleResult.successText && ruleResult.validate === 'success'" class="validateMsg validateSuccessIcon ft-12 line-18" style="color: #65A30D;">{{ ruleResult.successText }}</div>
    <!-- 客製警示(黃字)成功訊息 -->
    <div v-if="ruleResult.warnningText && ruleResult.validate === 'warning'" class="validateMsg validateWarnningIcon ft-12 line-18" style="color: #D97706;">{{ ruleResult.warnningText }}</div>
  </div>
</template>

<script name="Select" setup>
import { ref, computed, watch, watchEffect, onMounted, nextTick } from "vue";

const props = defineProps({
  title:String,
  placeholder:String,
  disabled:Boolean,
  modelValue:[String,Array],
  options:{
    type:Array,
    required:true,
    default:[{value:'', label:''}]
  },
  resetTrigger:{
    type:Number,
    default:0
  },
  size:{
    type:String,
    default:''
  },
  useFilter:{
    type:Boolean,
    default:false
  },
  multiple:{
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
});

//接受父組件預設值傳入
const selectVal = ref(props.multiple? [] : props.modelValue);
const ruleResult = ref({});

watchEffect(()=>{
  ruleResult.value = props.rulesMsg;
});


//與父組件v-model和onChangeNoGroupSelect綁定
const emits = defineEmits(['update:modelValue', 'blur', 'change']);
watch(()=> props.modelValue, () => {
  selectVal.value = props.modelValue;
});

watch(()=> selectVal.value, () => {
  emits('update:modelValue', selectVal.value);
});


//組件初始化
watch(()=> props.resetTrigger, () => {
  selectVal.value = props.multiple? [] : '';
  checkAll.value = false;
});

const checkAll = ref(false);
const selectAll = () => {
  if(checkAll.value){
    selectVal.value  = props.options.filter(opt=>!opt.disabled).map((x)=>x.value)
  }else{
    selectVal.value = [];
  }
}

watch(()=> props.modelValue, () => {
    if(props.multiple){
      checkAll.value = props.modelValue.length == props.options.filter(opt=>!opt.disabled).length;
    }
});

//觸發父層helperText顯示判斷
const handleBlur = () => {
  emits('blur'); //觸發原生blur事件
}
const handleChange = () => {
  emits('change'); //觸發原生change事件
}
</script>

<style lang="scss" scoped>
.select {
  font-family: "Noto Sans TC";
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.56px;
  .title {
    color: #1f2937;
    margin-bottom: 4px;
  }


  // select
  :deep(.el-select__wrapper) {
    &:hover {
      box-shadow: 0 0 0 1px $blue-600 inset;
    }
  }

  :deep(.is-focus) {
    box-shadow: 2px 2px 4px #d6d6d6;
  }

  :deep(.el-input){
    border-radius: 4px;
  }

  :deep(.el-select){
    width: 100%;
    margin-bottom: 4px;
  }
  
  :deep(.el-select__wrapper){
    min-height:36px;
  }

  :deep(.el-select--large){
    .el-select__wrapper{
      min-height:48px;
    }
  }

  :deep(.el-select-dropdown__wrap) {
    height: 185px;
  }


  // option 選項hover & disabled 
  :deep(.el-select-dropdown__item){
    font-weight:400;
    letter-spacing: 0.56px;
    &:hover {
      background-color: $blue-600;
      color: white !important;
    }

    &.is-selected{
      color:$blue-600;
    }
  }

  :deep(.el-select-dropdown__header){ 
    .el-checkbox{
      .el-checkbox__label{
        font-weight:400;
        letter-spacing: 0.56px;
      }
    
      &.is-checked{
        .el-checkbox__label{
          color:$blue-600;
        }

        .el-checkbox__inner{
          border-color:$blue-600;
          background-color:$blue-600;
        }
      }
    }
  }
}

.el-form-item:has(.el-form-item__error) .validateMsg{
  display:none;
}

.line-18{
  line-height:18px;
}

:deep(.el-select__wrapper.is-focused .el-select__placeholder.is-transparent),
:deep(.el-select__wrapper.is-disabled .el-select__placeholder.is-transparent){
  color: #1f2937;
}

</style>