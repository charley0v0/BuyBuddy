<template>
    <el-form
        id="uploadFormRef"
        ref="uploadFormRef"
        :model="sendUploadData"
        :rules="rules"
        :status-icon="false"
        label-position="top"
        size="large"
        status-icon
    >
        <el-row justify="space-between">
            <el-col :span="4" class="d-flex align-center">
                <el-button size="small" round @click="resetForm(uploadFormRef)">初始化</el-button>
                <el-button type="primary" size="small" round @click="submitForm(uploadFormRef)">送出驗證</el-button>
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
        <el-row :gutter="20">
            <el-col :span="8">
                <h3>Photo Single Upload</h3>
                <!--========== Photo single upload ==========-->
                <Layout :name="'photo_single_drag'" id="photo_single_drag">
                    <el-form-item label="" prop="photo_single_upload" :error="rulesMsg.photo_single_upload.errorText">
                        <PhotoUploadSingleDrag
                            v-model="sendUploadData.photo_single_upload"
                            v-model:rulesMsg="rulesMsg.photo_single_upload"
                            title="上傳單一圖檔"
                            :infoIconContent="`限 JPG、JPEG、PNG、MP4 檔案格式，檔案大小須小於 5MB`"
                            :disabled="disabled"
                            :resetTrigger="defaultResetTrigger"

                            :field="'photo_single_upload'"
                            :rulesMsg="rulesMsg.photo_single_upload"
                            @update:rulesMsg="watchFilesRuleMsg"
                        />
                    </el-form-item>
                </Layout>
            </el-col>
            <el-col :span="8">
                <h3>Photo Multi Upload</h3>
                <!--========== Photo Multi upload ==========-->
                <Layout :name="'photo_multi'" id="photo_multi">
                    <el-form-item label="" prop="photo_multi_upload" :error="rulesMsg.photo_multi_upload.errorText">
                        <PhotoUploadMulti
                            v-model="sendUploadData.photo_multi_upload"
                            title="上傳多圖檔"
                            :infoIconContent="`至少上傳 ${setMinLimit} 張圖檔，最多上傳 3 張圖檔，<br>限 JPG、JPEG、PNG、MP4 檔案格式，檔案大小須小於 5MB`"
                            :setMinLimit="setMinLimit"
                            :setMaxLimit="3"
                            :disabled="disabled"
                            :resetTrigger="defaultResetTrigger"

                            :field="'photo_multi_upload'"
                            :rulesMsg="rulesMsg.photo_multi_upload"
                            @update:rulesMsg="watchFilesRuleMsg"
                        />
                    </el-form-item>
                </Layout>
            </el-col>
            <el-col :span="8">
                <h3>File Upload</h3>
                <!--========== File upload ==========-->
                <Layout :name="'file_upload'" id="file_upload">
                    <el-form-item label="" prop="file_upload" :error="rulesMsg.file_upload.errorText">
                        <FileUploadSingle
                            v-model="sendUploadData.file_upload"
                            title="上傳檔案"
                            :infoIconContent="rulesMsg.file_upload.helperText"
                            accept=".csr"
                            :disabled="disabled"
                            :resetTrigger="defaultResetTrigger"

                            :field="'file_upload'"
                            :rulesMsg="rulesMsg.file_upload"
                            @update:rulesMsg="watchFilesRuleMsg"
                        />
                    </el-form-item>
                </Layout>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup>
    import { ref, reactive, onMounted, nextTick } from 'vue';
    import Layout from "./Layout.vue";

    import PhotoUploadSingleDrag from "./upload/photoUploadSingleDrag.vue";
    import PhotoUploadMulti from "./upload/photoUploadMulti.vue";
    import FileUploadSingle from "./upload/fileUploadSingle.vue";

    import DefaultInput from './inputs/defaultInput.vue';
    import { reg_mobile } from '@/assets/valid/regex';

    const disabled = ref(false);

    //PhotoMultiupload 圖檔最少上傳數量
    const setMinLimit = ref(2); 

    //Form
    const uploadFormRef = ref(null);
    const sendUploadData = ref({
        photo_single_upload: [],
        photo_multi_upload: [],
        file_upload: []
    });
    // 備份後端初始資料
    const backendDefaultData = ref({});

    const rules = ref({
        photo_single_upload:[
            { required: true, message:'請上傳圖檔', trigger: 'change' }
        ],
        photo_multi_upload:[
            { required: true, message:'請上傳圖檔', trigger: 'change' },
            { validator: (rule, value, callback) => {
                if (value.length < setMinLimit) {
                    callback(new Error(`請至少上傳 ${setMinLimit} 張圖片`));
                }
            }, trigger: ['change'] }
        ],
        file_upload:[
            { required: true, message: '請上傳附檔', trigger: 'change' }
        ]
    });

    //set init hint
    const rulesObject = JSON.stringify({
        photo_single_upload: {
            validate:'tips',
            helperText:'限 JPG、JPEG、PNG 檔案格式，檔案須小於 5 MB',
            successText:'',
            errorText:'',
        },
        photo_multi_upload: {
            validate:'tips',
            helperText:'限 JPG、JPEG、PNG 檔案格式，檔案須小於 5 MB',
            successText:'',
            errorText:'',
        },
        file_upload: {
            validate:'tips',
            helperText:'限 CSR 檔案格式，檔案須小於 5 MB',
            successText:'',
            errorText:'',
        },
    });
    const rulesMsg = ref(JSON.parse(rulesObject));

    // 監聽接收元件驗證錯誤訊息
    const watchFilesRuleMsg = (field, newRulesMsg) => {
        rulesMsg.value[field] = newRulesMsg;
    }
    
    // 顯示後端或子組件回傳錯誤訊息
    const resErrors = ref({
        photo_single_upload: '',
        photo_multi_upload: '',
        file_upload: ''
    });
    // 備份初始後端回傳錯誤訊息
    const backendDefErr = ref({});

    // 模擬接收後端訊息
    const fetchDatas = async () => {
        try {
            // photoSingleUpload預設顯示圖片
            sendUploadData.value.photo_single_upload = [
                {
                    name:'20ae292f34fc.mp4',
                    url: 'https://user-images.githubusercontent.com/64562059/234390129-321d4f35-cb4b-45e8-89d9-20ae292f34fc.mp4',
                    // url:'https://www.newebpay.com/ud/images/slider/bg1.jpg',
                }
            ]
            
            //PhotoMultiupload預設顯示圖片
            sendUploadData.value.photo_multi_upload = [
                {
                    name:'bg1.jpg',
                    url:'https://www.newebpay.com/ud/images/slider/bg1.jpg',
                },
                {
                    name:'234390129-321d4f35-cb4b-45e8-89d9-20ae292f34fc.mp4',
                    url:'https://user-images.githubusercontent.com/64562059/234390129-321d4f35-cb4b-45e8-89d9-20ae292f34fc.mp4',
                },
            ];

            // fileUpload預設顯示檔案
            sendUploadData.value.file_upload = [
                {
                    name:'bg1.jpg',
                    // url: 'https://user-images.githubusercontent.com/64562059/234390129-321d4f35-cb4b-45e8-89d9-20ae292f34fc.mp4',
                    url:'https://www.newebpay.com/ud/images/slider/bg1.jpg',
                }
            ]

            backendDefaultData.value = JSON.parse(JSON.stringify(sendUploadData.value)) //備份後端初始資料

            // 後端初始錯誤訊息
            nextTick(()=>{
                resErrors.value = {
                    photo_single_upload: "頭像非本人，請重新上傳",
                    photo_multi_upload: "照片不清晰，請重新上傳",
                    file_upload: "檔案內容不符合，請重新上傳"
                }
                backendDefErr.value = { ...resErrors.value } //備份後端初始回傳錯誤訊息
                // 帶入後端錯誤訊息
                setBackendErrors(backendDefErr.value);
            })

        } catch (error) {
            console.error('獲取訊息失敗', error);
        }
    };

    // rulesMsg 顯示後端初始回傳錯誤訊息
    const setBackendErrors = (errors) => {
        Object.keys(errors).forEach(key => {
            rulesMsg.value[key].errorText = errors[key];
            rulesMsg.value[key].validate = 'error';
        });
    };

    onMounted(() => {
        fetchDatas();
    });


    // 送出
    const submitForm = async (formEl) => {
        if (!formEl) return;
        await formEl.validate((valid, fields) => {
            if (valid) {
                console.log('submit!');
            } else {
                console.log('error submit!', fields);

                //隱藏未通過父層驗證的驗證成功(先前子層格式驗證上傳通過的顯示)
                // Object.keys(fields).forEach( item => showValidateSuccess.value[item] = false );
            }
        })
    }

    // 重設
    let defaultResetTrigger = ref(0);
    const resetForm = (formEl) => {
        if (!formEl) return;
        formEl.resetFields(); //清除驗證訊息
        // Object.keys(rulesMsg.value).forEach(item =>  uploadFormRef.value.clearValidate(item));
 
        defaultResetTrigger.value ++;
        sendUploadData.value = JSON.parse(JSON.stringify(backendDefaultData.value)); //顯示後端初始資料
        rulesMsg.value = JSON.parse(rulesObject);
        nextTick(()=>{
            // 顯示後端初始回傳的錯誤訊息
            setBackendErrors(backendDefErr.value);
        })
    }

</script>

<style scoped lang="scss">
    :deep(.el-form-item--large .el-form-item__content) {
        line-height: 30px;
        margin: 0px;
    }
</style>