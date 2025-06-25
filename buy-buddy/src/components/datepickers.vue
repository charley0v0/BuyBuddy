<template>
    <el-row justify="space-between">
        <el-col :span="4" class="d-flex align-center mb-16">
            <el-button size="small" round @click="reset(dateRef)">初始化</el-button>
            <el-button type="primary" size="small" round @click="validateBeforeSubmit(dateRef)">送出驗證</el-button>
        </el-col>
        <el-col :span="20">
            <el-row justify="end">
                <el-col :span="3" class="d-flex align-center">
                    <span>時間設定：</span>
                    <el-switch 
                        v-model="useTime"
                        size="large"
                        inline-prompt
                        active-text="開啟"
                        inactive-text="關閉"
                        class="ml-12"
                        style="--el-switch-on-color:#65A30D;--el-switch-off-color:#DC2626;"
                    ></el-switch>
                </el-col>
                <el-col :span="3" class="d-flex align-center">
                    <span>快捷區間：</span>
                    <el-switch 
                        v-model="useShortCuts"
                        size="large"
                        inline-prompt
                        active-text="顯示"
                        inactive-text="隱藏"
                        class="ml-12"
                        style="--el-switch-on-color:#3B82F6;--el-switch-off-color:#a44bd1;"
                    ></el-switch>
                </el-col>
                <el-col :span="3" class="d-flex justify-end align-center">
                    <span>組件狀態：</span>
                    <el-switch 
                        v-model="disabled"
                        size="large"
                        inline-prompt
                        active-text="禁用"
                        inactive-text="啟用"
                        class="ml-12"
                        style="--el-switch-on-color:#DC2626;--el-switch-off-color:#65A30D;"
                    ></el-switch>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
    <el-form  
        ref="dateRef"
        :model="sendData"
        :rules="rules"
    >   
        <el-row :gutter="20">
            <el-col :span="8">
                <h3>No Range</h3>
                <Layout :name="'single_datepicker'" id="single_datepicker">
                    <el-form-item prop="singleDate">
                        <Datepicker 
                            v-model="sendData.singleDate"
                            :title="'單選日期'"
                            :useTime="useTime"
                            :disabled="disabled"
                            :resetTrigger="defaultResetTrigger"
                        ></Datepicker>
                    </el-form-item>
                </Layout>
            </el-col>
            <el-col :span="8">
                <h3>With Range</h3>
                <Layout :name="'range_datepicker'" id="range_datepicker">
                    <el-form-item prop="rangeDate">
                        <DatepickerRange
                            v-if="datepickerUpdate"
                            v-model="sendData.rangeDate"
                            :title="'日期區間'"
                            :useTime="useTime"
                            :useShortCuts="useShortCuts"
                            :disabled="disabled"
                            :resetTrigger="defaultResetTrigger"
                        ></DatepickerRange>
                    </el-form-item>
                </Layout>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup>
    import { ref, nextTick, watch } from 'vue';
    import Datepicker from '@/components/datepickers/datepicker.vue';
    import DatepickerRange from '@/components/datepickers/datepickerRange.vue';

    const disabled = ref(false);
    const useShortCuts = ref(true);
    const useTime = ref(false);

    
    //驗證規則
    const dateRef = ref(null);
    const defaultResetTrigger = ref(0);
    const sendData = ref({
        singleDate:new Date().toLocaleDateString('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit'}).replaceAll('/','-'),
        rangeDate:ref([new Date().toLocaleDateString('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit'}).replaceAll('/','-'),new Date().toLocaleDateString('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit'}).replaceAll('/','-')])
    });
    const rules = ref({
        singleDate:[
            { required: true, message:'單選日期欄位為必填', trigger: [],},
        ],
        rangeDate:[
            { 
                validator: (rule, value, callback) => {
                    if (!value || !value[0] || !value[1]) {
                        callback(new Error(`日期區間欄位為必填`));
                    }
                }, trigger: [''] 
            }, 
        ],
    });

    //送出前檢查
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
    const reset = () => {
        defaultResetTrigger.value++;
        nextTick(() => {
            //以下帶入頁面預設資料
            // sendData.value.singleDate = '2023-12-29';
            // sendData.value.rangeDate = ['2023-01-22','2023-02-12'];
        });
        setTimeout(() => {
           dateRef.value.clearValidate();
        }, 0);
    }

    //組件庫專用以下內容不用複製
    const datepickerUpdate = ref(true);
    watch(()=>useTime.value,()=>{
       datepickerUpdate.value = false;
       setTimeout(() => {
            datepickerUpdate.value = true;
       }, 0);
    });

</script>