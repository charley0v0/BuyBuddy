<template>
    <el-form  
        ref="PhoneRef"
        :model="sendData"
        :rules="rules"
    >   
        <el-row justify="space-between">
            <el-col :span="4" class="d-flex align-center">
                <el-button size="small" round @click="reset(PhoneRef)">初始化</el-button>
                <el-button type="primary" size="small" round @click="validateBeforeSubmit(PhoneRef)">送出驗證</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <Layout :name="'input_phone'" id="input_phone">
                    <el-form-item class="mb-16" prop="phone" :error="rulesMsg.phone.errorText">
                        <InputPhone 
                            :title="'市話'" 
                            v-model:InputphoneArea="sendData.phone.areaCode"
                            v-model:InputphoneNum="sendData.phone.telephoneNo"
                            v-model:InputphoneExt="sendData.phone.extension"
                            :disabled="disabled"
                            :resetTrigger="defaultResetTrigger" 
                            :rulesMsg="rulesMsg.phone"
                        />
                    </el-form-item>
                </Layout>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup>
    import InputPhone from './inputPhone/inputPhone.vue';
    import { ref } from 'vue';

    const disabled = ref(false);

    const sendData = ref({
        phone:{
            areaCode: '',
            telephoneNo: '',
            extension: '',
        },
    })

    //驗證Form名稱
    const PhoneRef = ref(null);
    const rulesObject = JSON.stringify({
        phone:{
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
        phone:[
            { required: true, validator: (rule, value, callback) => {
                if ( rule.required === true && ( value.areaCode =='' || value.telephoneNo =='') ) {
                    callback(new Error(`此欄位為必填`));
                    return false;
                } else if (value.areaCode =='' || value.telephoneNo.length < 5 || value.telephoneNo.length > 8) { //非必填需檢查
                    callback(new Error(`請確認選擇區碼，號碼長度限制輸入5~8碼`));
                    return false;
                }
                callback();
                return true;
            }, trigger: ['blur'] }
        ]
    });

    //前端送出前執行驗證
    const validateBeforeSubmit = async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
          if (valid) {
              console.log('submit!');
              rulesMsg.value.phone.successText = 'success !!';
              rulesMsg.value.phone.validate = 'success';
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
            Object.keys(rulesMsg.value).forEach(item =>  PhoneRef.value.clearValidate(item));
        }, 0);
    }

</script>
