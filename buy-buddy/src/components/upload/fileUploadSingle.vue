<!-- 
======== 單檔案上傳 元件功能 ========
上傳介面寬 
只能上傳一個檔案
點擊按鈕上傳檔案
上傳圖檔後 滑鼠滑入檔名 顯示 刪除該檔icon 點擊刪除icon 刪除該檔案
-->

<template>
    <div class="file_upload_single">
        <div class="d-flex">
            {{title}}
            <slot name="title"></slot>
            <!-- ICON提示 -->
            <el-tooltip v-if="infoIconContent" :content="infoIconContent" raw-content class="box-item" effect="dark" placement="right-start">
                <div style="width:16px; margin-left:5px; display:flex;"><InfoOutlined/></div>  
            </el-tooltip>
        </div>
        
        <el-upload
            ref="fileRef"
            v-model:file-list="uploadValue"
            class="file_upload_css"
            action="#"
            :auto-upload="false"
            :accept="accept"
            :limit="1"
            :disabled="disabled"
            :on-exceed="handleExceed"
            :on-change="handleVerify"
            :on-remove="handleRemove"
        >
            <secondaryText title="選擇檔案" :disabled="disabled"></secondaryText>
        </el-upload>

        <!-- 浮動 helper text -->
        <div  v-if="ruleResult.helperText && (ruleResult.validate === 'tips' || ruleResult.validate === '')" class="validateMsg ft-12 line-14" style="color: #9CA3AF;">{{ ruleResult.helperText }}</div>
        <!-- 客製成功訊息 -->
        <div v-if="ruleResult.successText && ruleResult.validate === 'success'" class="validateMsg validateSuccessIcon ft-12 line-14" style="color: #65A30D;">{{ ruleResult.successText }}</div>
        <!-- 客製警示(黃字)成功訊息 -->
        <div v-if="ruleResult.warnningText && ruleResult.validate === 'warning'" class="validateMsg validateWarnningIcon ft-12 line-14" style="color: #D97706;">{{ ruleResult.warnningText }}</div>


        <div v-if="showTip" class="el-upload__tip">
            限 {{acceptNote}} 檔案格式，
            檔案大小須小於 {{maxFileSize}}MB
            <div v-html="otherNote"></div>
        </div>
    </div>
</template>
    
<script name="FileUploadSingle" setup>
import { ref, watch, watchEffect } from 'vue';
import { ElMessage, genFileId } from 'element-plus'
import secondaryText from "@/components/button/secondaryText.vue";
import { InfoOutlined } from '@vicons/material'

const props = defineProps({
    //上傳標題
    title: {
        type: String,
        default: ''
    },
    //icon提示
    infoIconContent: {
        type: String,
        default: ''
    },
    modelValue:{
        type:Array,
        default: []
    },
    //附檔名選單預設與驗證，'.csv,.txt,.xls,.xlsx,.zip,.jpg,.jpeg,.png,.gif,.pdf,.csr'，!注意此元件設定CSR只能單上傳CSR檔，不兼容其他副檔名
    accept: { 
        type: String,
        default: '.csv'
    },
    //tip顯示
    showTip: {
        type: Boolean,
        default: false
    },
    //tip顯示檔案格式限制
    acceptNote: {
        type: String,
        default: 'CSV'
    },
    //tip顯示其他備註，可接受html語法
    otherNote: { 
        type: String,
        default: ''
    },
    //禁止上傳功能設定
    disabled:{ 
        type: Boolean,
        default: false
    },
    //檔案大小限制
    maxFileSize: { 
        type: Number,
        default: 5 
    },
    //組件初始化
    resetTrigger:{
        type: Number,
        default: 0
    },
    // 欄位參數名
    field: {
        type: String,
        default: ''
    },
    rulesMsg:{
        type:Object,
        default:{
            helperText:'',   //預設顯示文字(灰)
            successText:'',  //後端回傳成功文字(綠)
            warnningText:'', //後端回傳成功文字(橘)
            validate:'',     //驗證註記 'tips'|顯示helpText 'error'|紅字 'success'|綠字 'warning'|橘字
        }
    },
});

//接受父組件預設值傳入
const uploadValue = ref([]);
const ruleResult = ref({});

const emit = defineEmits(['update:modelValue', 'update:rulesMsg', 'change']);
const fileRef = ref();
const maxFileSize = ref(props.maxFileSize);

let condition = ref([]);

watchEffect(()=>{
    uploadValue.value = props.modelValue;
    ruleResult.value = props.rulesMsg;
});

watch(()=>uploadValue.value, ()=>{
    emit('update:modelValue',uploadValue.value);
});

watchEffect(() => {
    const acceptFile = props.accept.replace(/\s|\./g, "").toLowerCase().split(',');
    const fileType = [];
    acceptFile.forEach((item)=>{
        switch (item) {
            case "jpg":
            case "jpeg":
                fileType.push('image/jpeg');
                break;
            case "png":
                fileType.push('image/png');
                break;
            case "gif":
                fileType.push('image/gif');
                break;
            case "mp4":
                fileType.push('video/mp4');
                break;
            case "pdf":
                fileType.push('application/pdf');
                break;
            case "xls":
                fileType.push('application/x-excel');
                break;
            case "xlsx": 
                fileType.push('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                break;
            case "csv":
                fileType.push('application/vnd.ms-excel');
                break;
            case "zip":
                fileType.push('application/x-zip-compressedS');
                break;
            case "txt":
                fileType.push('text/plain');
                break;
            //注意此元件若設定CSR只能單上傳CSR檔功能，不兼容其他副檔名
            case "csr": 
                fileType.push('csr');
                break;
        }
    });
    condition = [...new Set(fileType)];
});

//父組件觸發resetTrigger
watch(()=> props.resetTrigger,() => {
        uploadValue.value = props.modelValue;
    }
);

// 驗證
const handleVerify = (rawFile, rawFiles) => {
    const { raw, size } = rawFile;
    
    // 判斷是否是 csr 文件，或檢查文件的 type 是否符合條件
    const isInvalidType = condition[0] === "csr" 
        ? raw.name.split('.').pop().toLowerCase() !== 'csr'  // 如果是 csr 文件，檢查文件名後綴
        : condition.every(item => raw.type !== item);  // 否則，檢查文件的 type 是否不符合條件

    if (isInvalidType) {
        fileRef.value.clearFiles();
        uploadValue.value = [];
        emit('update:modelValue', uploadValue.value);
        emit('update:rulesMsg', props.field, {
            ...props.rulesMsg,
            validate: 'error',
            errorText: `限${props.acceptNote}檔案格式!`,
        });
        return false;
    } else if (size / 1024 / 1024 > maxFileSize.value) {
        fileRef.value.clearFiles();
        uploadValue.value = [];
        emit('update:modelValue', uploadValue.value);
        emit('update:rulesMsg', props.field, {
            ...props.rulesMsg,
            validate: 'error',
            errorText: `檔案大小須小於 ${props.maxFileSize}MB!`,
        });
        return false;
    }
    
    // 如果驗證通過，更新檔案列表
    uploadValue.value = rawFiles;
    emit('update:modelValue', uploadValue.value);
    ElMessage.success('檔案格式正確');

    emit('update:rulesMsg', props.field, {
        ...props.rulesMsg,
        validate: 'success',
        successText: '',
        errorText: '',
    });

    emit('change'); //觸發父層
    return true;
}

// 處理超出限制的情況（重新選擇檔案）
const handleExceed = (files) => {
    fileRef.value.clearFiles();
    const file = files[0];
    file.uid = genFileId();
    fileRef.value.handleStart(file);
}

// 移除
const handleRemove = (file) => {
    uploadValue.value = [];
    fileRef.value.clearFiles();
    emit('update:modelValue', uploadValue.value);
    
    emit('update:rulesMsg', props.field, {
        ...props.rulesMsg,
        validate: 'tips',
        errorText: '',
    });

    emit('change'); //觸發父層
}

</script>

<style scoped lang="scss">
.file_upload_css {
    padding: 5px;
    border: 1px solid #E5E7EB;
    border-radius: 4px;
}

:deep(.el-upload-list) {
    margin: 0px;

    li {
        margin-top: 10px;
        line-height: normal;
        //檔案名稱
        .el-upload-list__item-name{
            margin-top: 5px;
            .el-icon--document svg {
              display: none; /* 隱藏內建的 SVG */
            }
            .el-icon--document {
                width: 21px;
            }
            .el-icon--document::before {
                content: '';
                display: inline-block;
                width: 20px;
                height: 20px;
                background-image: url('@/assets/svg/TextSnippetRound.svg'); /* 更換icon */
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            }
        }

        .el-upload-list__item-name::after{
            content: '';
            position: absolute;
            right: 5px;
            width: 20px;
            height: 20px;
            color:#9CA3AF;
            background-image: url('@/assets/svg/CheckCircleFilled.svg');
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }


        // 刪除檔案
        .el-icon--close svg{
            display: none; /* 隱藏內建的 SVG */
        }
        .el-icon--close {
            width: 21px;
        }

        .el-icon--close::before {
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            padding: 10px;
            position: absolute;
            right: -10px;
            scale: 50%;
            background-color: #FFF;
            background-image: url('@/assets/svg/CancelFilled.svg'); /* 更換icon */
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }
    }

}

</style>
           