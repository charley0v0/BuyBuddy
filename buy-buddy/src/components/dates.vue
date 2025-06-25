<template>
  <el-form  
      ref="taiwanDateRef"
      :model="sendData"
      :rules="rules"
  >   
    <el-row justify="space-between">
        <el-col :span="4" class="d-flex align-center mb-16">
            <el-button size="small" round @click="reset(taiwanDateRef)">初始化</el-button>
            <el-button type="primary" size="small" round @click="validateBeforeSubmit(taiwanDateRef)">送出驗證</el-button>
        </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <h3>{{sendData.taiwanDate || '民國年月日'}}</h3>
        <Layout :name="'dates'" id="dates">
          <el-form-item class="mb-16" prop="taiwanDate" :error="rulesMsg.taiwanDate.errorText">
            <Dates v-model="sendData.taiwanDate" :rulesMsg="rulesMsg.taiwanDate" :resetTrigger="defaultResetTrigger"></Dates>
          </el-form-item>
        </Layout>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
  import { ref } from 'vue';
  import Layout from "@/components/Layout.vue";
  import Dates from "@/components/date/taiwanDate.vue";

  const sendData = ref({
    taiwanDate:'',
  })

  //驗證Form名稱
  const taiwanDateRef = ref(null);
  const rulesObject = JSON.stringify({
      taiwanDate:{
          helperText:'若需使用提示訊息時使用(灰)',
          successText:'若需顯示成功訊息時使用(綠)',
          warnningText:'若需顯示警示訊息時使用(黃)',
          // errorText:'若需顯示後端回傳錯誤訊息時使用(紅) 不顯示時errorText須為空值',
          validate:'tips',
      }
  });
  const rulesMsg = ref(JSON.parse(rulesObject));

  //驗證規則
  const rules = ref({
    taiwanDate:[
      { required: true, message:'電話欄位為必填', trigger: ['change'],},
    ]
  });

  //前端送出前執行驗證
  const validateBeforeSubmit = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!');
            rulesMsg.value.taiwanDate.successText = 'success !!';
            rulesMsg.value.taiwanDate.validate = 'success';
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
    setTimeout(() => {
        Object.keys(rulesMsg.value).forEach(item =>  taiwanDateRef.value.clearValidate(item));
    }, 0);
  }

</script>

<style lang="scss" scoped>

</style>