<template>
    <el-form  
        ref="zipcodeRef"
        :model="sendData"
        :rules="rules"
    >   
        <el-row justify="space-between">
            <el-col :span="4" class="d-flex align-center">
                <el-button size="small" round @click="reset(zipcodeRef)">初始化</el-button>
                <el-button type="primary" size="small" round @click="validateBeforeSubmit(zipcodeRef)">送出驗證</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <Layout :name="'zipcode'" id="zipcode">
                    <el-form-item class="mb-16" prop="twzipcode" :error="rulesMsg.twzipcode.errorText">
                        <ZipcodeTW
                            v-model:city="sendData.twzipcode.city"
                            v-model:district="sendData.twzipcode.district"
                            v-model:postalCode="sendData.twzipcode.postalCode"
                            title="郵遞區號"
                            :disabled="disabled"
                            :resetTrigger="defaultResetTrigger"
                            :rulesMsg="rulesMsg.twzipcode"
                        />
                    </el-form-item>
                </Layout>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup>
    import { ref } from 'vue';
    import Layout from "./Layout.vue";
    import ZipcodeTW from "./address/zipcodeTW.vue";
    import InputPhone from './inputPhone/inputPhone.vue';

    const disabled = ref(false);
    
    const sendData = ref({
        twzipcode:{
            city:'宜蘭縣',
            district:'羅東鎮',
            postalCode:'265'
        },
    })


    //驗證Form名稱
    const zipcodeRef = ref(null);
    const rulesObject = JSON.stringify({
        twzipcode:{
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
      twzipcode:[
        { 
            validator: (rule, value, callback) => {
                if(!value.postalCode){
                    callback(new Error(`請選擇鄉鎮市區`));
                }else{
                    callback();
                }
            }, trigger: ['change', 'blur'] 
        }
      ]
    });

    //前端送出前執行驗證
    const validateBeforeSubmit = async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
          if (valid) {
            console.log('submit!');
            rulesMsg.value.twzipcode.validate = 'success';
            rulesMsg.value.twzipcode.successText = 'success !!';
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
            Object.keys(rulesMsg.value).forEach(item =>  zipcodeRef.value.clearValidate(item));
        }, 0);
    }
</script>