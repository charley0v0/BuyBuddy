<template>
  <el-row>
    <el-col :span="4" class="d-flex align-center">
      <el-row justify="space-between">
          <el-col class="d-flex align-center">
            <el-button size="small" round @click="reset(inputFormRef)">初始化</el-button>
            <el-button type="primary" size="small" round @click="validateBeforeSubmit(inputFormRef)">送出驗證</el-button>
          </el-col>
      </el-row>
    </el-col>
    <el-col :span="20">
      <Controller v-model="size" v-model:disabled="ComponentDisabled" :sizeControl="['large','default']" />
    </el-col>
  </el-row>
  
  <el-form
    ref="inputFormRef"
    :model="sendData"
    :rules="rules"
  >
  <el-row justify="space-between">
      <el-col :span="4" class="d-flex align-center">
          
      </el-col>
  </el-row>
  <el-row :gutter="20">
    <!--========== 一般輸入框 ==========-->
    <el-col :span="6">
      <Layout :name="'input_default'" id="input_default">
        <DefaultInput
          v-model="sendData.defaultInputValue"
          :title="'一般輸入框'"
          :placeholder="'請輸入關鍵字'"
          :disabled="ComponentDisabled"
          :size="size"
          :resetTrigger="defaultResetTrigger"
        ></DefaultInput>
      </Layout>
    </el-col>
    <!--========== 驗證功能輸入框 ===========-->
    <el-col :span="6">
      <Layout :name="'input_default_verify'" id="input_default_verify">
        <el-form-item class="mb-16" prop="inputVerify" :error="rulesMsg.inputVerify.errorText">
          <DefaultInput
            v-model="sendData.inputVerify"
            :title="'驗證功能輸入框'"
            :placeholder="'請輸入數字'"
            :disabled="ComponentDisabled"
            :size="size"
            :resetTrigger="defaultResetTrigger"
            :rulesMsg="rulesMsg.inputVerify"
            @checkValidateField="chekPhone('inputVerify')"
          ></DefaultInput>
        </el-form-item>
      </Layout>
    </el-col>
    <!--======== 密碼輸入框 (不顯示密碼 含驗證功能) ========-->
    <el-col :span="6">
      <Layout :name="'input_password'" id="input_password">
          <DefaultInput
            v-model="sendData.password"
            :title="'密碼輸入框(不顯示密碼 含驗證功能)'"
            :placeholder="'請輸入2~4碼英數字元'"
            :type="'password'"
            :disabled="ComponentDisabled"
            :size="size"
            :resetTrigger="defaultResetTrigger"
          ></DefaultInput>
      </Layout>
    </el-col>
    <!--======== 密碼輸入框 (可顯示密碼 含驗證功能) ========-->
    <el-col :span="6">
      <Layout :name="'input_password_show'" id="input_password_show">
          <DefaultInput
            v-model="sendData.passwordConfirm"
            :title="'密碼輸入框(可顯示密碼 含驗證功能)'"
            :placeholder="'再次輸入密碼'"
            :type="'password'"
            :show-password="true"
            :disabled="ComponentDisabled"
            :size="size"
            :resetTrigger="defaultResetTrigger"
          ></DefaultInput>
      </Layout>
    </el-col>
    <!--========= 顯示限制字數輸入框 =========-->
    <el-col :span="6">
      <Layout :name="'input_limit'" id="input_limit">
          <DefaultInput
            v-model="sendData.lengthLimit"
            :title="'顯示限制字數輸入框'"
            :placeholder="'請輸入最多8字元'"
            :maxlength="8"
            :show-word-limit="true"
            :disabled="ComponentDisabled"
            :size="size"
            :resetTrigger="defaultResetTrigger"
          ></DefaultInput>
      </Layout>
    </el-col>
    <!--====== 文本輸入框 (不限制字數) =====-->
    <el-col :span="6">
      <Layout :name="'input_textarea'" id="input_textarea">
        <DefaultInput
          v-model="defaultInputValue"
          :title="'文本輸入框(不限制字數)'"
          :type="'textarea'"
          :placeholder="'請輸入內容'"
          :autosize="true"
          :disabled="ComponentDisabled"
          :resetTrigger="defaultResetTrigger"
        ></DefaultInput>
      </Layout>
    </el-col>
    <!--======= 文本輸入框 (限制字數) ======-->
    <el-col :span="6">
      <Layout :name="'input_textarea_limit'" id="input_textarea_limit">
          <DefaultInput
            v-model="sendData.textareaLimit"
            :title="'文本輸入框(限制字數)'"
            :type="'textarea'"
            :placeholder="'請輸入最多10字元'"
            :maxlength="300"
            :show-word-limit="true"
            :autosize="autosize"
            :disabled="ComponentDisabled"
            :resetTrigger="defaultResetTrigger"
          ></DefaultInput>
      </Layout>
    </el-col>
  </el-row>
  <el-row :gutter="20">
      <!--====== 數字輸入框 =====-->
      <el-col :span="6">
        <Layout :name="'input_number'" id="input_number">
          <InputNumber
              v-model="inputNumberValue"
              :minValue="0"
              :maxValue="20"
              :disabled="ComponentDisabled"
              :size="size"
              :resetTrigger="defaultResetTrigger"
            ></InputNumber>
          </Layout>
      </el-col>
      <!--====== 數字輸入框 (無操作按鈕) =====-->
      <el-col :span="6">
        <Layout :name="'input_number_no_btn'" id="input_number_no_btn">
          <InputNumberNoBtn 
            v-model="inputNumberNoBtnValue"
            :class="'input_number_no_btn'"
            :disabled="ComponentDisabled"
            :resetTrigger="defaultResetTrigger"
          >
          </InputNumberNoBtn>
        </Layout>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
  import { onMounted, ref, nextTick } from 'vue'
  import Layout from './Layout.vue';
  import Controller from './controller.vue';
  import DefaultInput from './inputs/defaultInput.vue';
  import InputNumber from './inputs/inputNumber.vue';
  import InputNumberNoBtn from './inputs/inputNumberNoBtn.vue';

  //驗證
  import { reg_mobile, reg_enNumber } from '@/assets/valid/regex';

  //Normal Input
  const defaultInputValue = ref('');

  //InputNumber
  const inputNumberValue = ref(2);

  //InputNumberNoBtn
  const inputNumberNoBtnValue = ref(0);

  //調整組件大小
  const size = ref('');

  //調整組件是否禁用
  const ComponentDisabled = ref(false); 

  // textarea rows行數設定
  const autosize = ref({minRows: 2, maxRows: 4});

  //送出表單資料
  const sendData = ref({
    inputVerify:'',
  });

  //驗證Form名稱
  const inputFormRef = ref(null);
  const rulesObject = JSON.stringify({
    inputVerify:{
      helperText:'若需使用提示訊息時使用(灰)',
      successText:'若需顯示成功訊息時使用(綠)',
      warnningText:'若需顯示警示訊息時使用(黃)',
      // errorText:'若需顯示後端回傳錯誤訊息時使用(紅) 不顯示時errorText須為空值',
      validate:'tips',
    }
  });
  const rulesMsg = ref(JSON.parse(rulesObject));

  // 檢查手機格式
  function chekPhone (item){
    inputFormRef.value.validateField(item).then(() => {         
        inputFormRef.value.clearValidate(item); //清除錯誤訊息
        backendValid();
    }).catch((error) => {
        if (error && error[item]) {
          rulesMsg.value[item].validate = 'error';
        }
    });
  }




  //詢問後端驗證API (此為Demo用)
  const backendValid = async (rule, value, callback)=>{
      console.log('程式驗證');
      try {
          //模擬後端驗證回應
          const res = {
              status: "SUCCESS",
              message: '後端檢驗正確'

              // status: "FAIL",
              // message: '後端API驗證有誤測試'

              // status: "WARNNING",
              // message: '密碼強度-弱，可以使用，請嘗試加長一些。'
          }
          
          if (res.status === "SUCCESS"){ 
              //成功訊息
              rulesMsg.value.inputVerify.successText = res.message;
              rulesMsg.value.inputVerify.validate = 'success';
          } else if (res.status === "WARNNING") { 
              //警示(黃字)成功訊息
              rulesMsg.value.inputVerify.successText = '';
              rulesMsg.value.inputVerify.warnningText = res.message;
              rulesMsg.value.inputVerify.validate = 'warning';
          } else { 
              //失敗訊息
              rulesMsg.value.inputVerify.errorText = res.message;
              rulesMsg.value.inputVerify.validate = 'error';
          }
      } catch (error) {
        console.error('獲取訊息失敗', error);
      }
  }

  //驗證規則
  const rules = ref({
      inputVerify:[
          { required: true, message:'驗證功能輸入框為必填', trigger: 'blur'},
          { pattern: reg_mobile, message:'請輸入正確的手機號碼', trigger: 'blur'}, //前端正則驗證
      ],
      password:[
          { required: true, message:'密碼為必填', trigger: 'blur' }, //必填
          { min:2, max:4, message:'長度限2~4字元', trigger: 'blur'}, //長度驗證
          { pattern: reg_enNumber, message:'限英數字', trigger: 'blur'}, //前端正則驗證
      ],
      passwordConfirm:[
          { required: true, fullField:'顯示密碼輸入框', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              if (value !== sendData.value.password) {
                callback(new Error(`與設定的密碼不一致，請重新輸入`));
              }
            }, trigger: ['change', 'blur'] 
          }, //密碼確認
      ],
      lengthLimit:[
          { required: true, fullField:'顯示限制字數輸入框', trigger: 'blur' },//必填
          { min:1, max:8, message:'長度限8字元', trigger: 'blur' }, //長度驗證
      ],
  });

  //前端送出前執行驗證
  const validateBeforeSubmit = async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
          if (valid) {
              console.log('submit!');
          } else {
              console.log('error submit!', fields);
              return false;
          }
      })
  }
  
  //重設
  let defaultResetTrigger = ref(0);
  const reset = () => {
    defaultResetTrigger.value ++;
    rulesMsg.value = JSON.parse(rulesObject);
    Object.keys(rulesMsg.value).forEach(item =>  inputFormRef.value.clearValidate(item));
  }

</script>
