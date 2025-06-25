<!-- 
======== 單圖檔拖曳上傳預覽 元件功能 ========
上傳介面固定寬 300px
只能上傳一張圖檔
可拖曳或點擊介面上傳圖檔
上傳圖檔後可即時預覽圖片與點擊 放大鏡 icon 彈出燈箱顯示放大圖檔
上傳圖檔後可點擊刪除 icon 後才能重新上傳圖檔
-->

<template>
    <div class="">
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
            list-type="picture-card"
            action="#"
            :auto-upload="false"
            drag
            :limit="1"
            
            :accept="accept"
            :disabled="disabled"
            
            :on-change="handleVerify"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
        >
            <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
            <div class="el-upload__text">
                將檔案拖到此處，或 <em>點擊上傳</em>
            </div>

            <template v-if="showTip" #tip >
                <div class="el-upload__tip">
                    限 {{acceptNote}} 檔案格式，檔案大小須小於 {{maxFileSize}}MB
                    <div v-html="otherNote"></div>
                </div>
            </template>
            
            <!-- 影檔小圖預覽 -->
            <template v-if="dialogVideoUrl" #file="{file}">
                <video class="el-upload-list__item-thumbnail" :src="file.url"></video>
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePreview(file)">
                        <el-icon><ZoomIn /></el-icon>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <el-icon><Delete /></el-icon>
                    </span>
                </span>
            </template>

        </el-upload>

        <!-- 浮動 helper text -->
        <div  v-if="ruleResult.helperText && (ruleResult.validate === 'tips' || ruleResult.validate === '')" class="validateMsg ft-12 line-14" style="color: #9CA3AF;">{{ ruleResult.helperText }}</div>
        <!-- 客製成功訊息 -->
        <div v-if="ruleResult.successText && ruleResult.validate === 'success'" class="validateMsg validateSuccessIcon ft-12 line-14" style="color: #65A30D;">{{ ruleResult.successText }}</div>
        <!-- 客製警示(黃字)成功訊息 -->
        <div v-if="ruleResult.warnningText && ruleResult.validate === 'warning'" class="validateMsg validateWarnningIcon ft-12 line-14" style="color: #D97706;">{{ ruleResult.warnningText }}</div>



        <!-- 影片放大預覽 -->
        <el-dialog v-model="dialogVideoVisible">        
            <video :src="dialogVideoUrl" controls autoplay style="width:100%;">
                您的瀏覽器不支援影片預覽。
            </video>
        </el-dialog>
        <!-- 圖片放大預覽 -->
        <el-dialog v-model="dialogVisible">
            <img :src="dialogImageUrl" alt="Preview Image" style="width:100%;"/>
            <!-- <span class="el-upload-list__item-preview" @click="handlePreview(file)">
                <el-icon><ZoomIn /></el-icon>
            </span>
            <span
                class="el-upload-list__item-delete" @click="handleRemove(file)">
                <el-icon><Delete /></el-icon>
            </span> -->
        </el-dialog>
    </div>
</template>
    
<script name="PhotoUploadSingleDrag" setup>
import { ref, watch, watchEffect } from 'vue';
import { ElMessage } from 'element-plus'
import { UploadFilled, ZoomIn, Delete } from '@element-plus/icons-vue'
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
    //雙向綁定
    modelValue: {
        type: Array,
        default:[]
    },
    //附檔名選單預設與驗證，接受'.png,.jpg,jpeg,.pdf,.gif,.bmp,.tif'
    accept: {  
        type: String,
        default: '.png,.PNG,.jpg,.JPG,.jpeg,.JPEG,.mp4'
    },
    //tip顯示
    showTip: {
        type: Boolean,
        default: false
    },
    //tip顯示檔案格式限制
    acceptNote: {
        type: String,
        default: 'JPG、JPEG、PNG、MP4'
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

watchEffect(()=>{
    uploadValue.value = props.modelValue;
    ruleResult.value = props.rulesMsg;
});

let condition = ref([]);
const fileRef = ref();
const maxFileSize = ref(props.maxFileSize);
const emit = defineEmits(['update:modelValue', 'update:rulesMsg', 'change']);

// 圖片預覽
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
// 影片預覽
const dialogVideoUrl = ref("")
const dialogVideoVisible = ref(false)

watch(() => uploadValue.value, (newVal) => {
    if (newVal.length > 0 && newVal[0].url && newVal[0].url.indexOf('.mp4') > 0) { //backend url
        dialogVideoUrl.value = newVal[0].url;
    }
    emit('update:modelValue',uploadValue.value);
},{immediate:true})


watchEffect(() => {
    const acceptFile = props.accept.replace(/\s|\./g, "").toLowerCase().split(',');
    const acceptFileVerify = [];
    acceptFile.forEach((item)=>{
        switch (item) {
            case "jpg":
            case "jpeg":
                acceptFileVerify.push('image/jpeg');
                break;
            case "png":
                acceptFileVerify.push('image/png');
                break;
            case "pdf":
                acceptFileVerify.push('application/pdf');
                break;
            case "gif":
                acceptFileVerify.push('image/gif');
                break;
            case "bmp":
                acceptFileVerify.push('image/bmp');
                break;
            case "tif":
                acceptFileVerify.push('image/tif');
                break;
            case "mp4":
                acceptFileVerify.push('video/mp4');
                break;
            default:
                break;
        }
    })
    //filter repeat value
    condition = [...new Set(acceptFileVerify)]; 
});

//父組件觸發resetTrigger
watch(()=> props.resetTrigger, () => {
        uploadValue.value = props.modelValue;
    }
);

// 上傳成功
const handleSuccess = (uploadFiles, file) => {
    const { raw } = file;

    //mp4預覽
    if ( raw.type === "video/mp4" ){
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadValue.value[0].url = e.target.result; //base64
            dialogVideoUrl.value = e.target.result; //base64
        };
        reader.readAsDataURL(raw);
    }else{
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadValue.value[0].url = e.target.result; //base64
        };
        reader.readAsDataURL(raw);
    }
    uploadValue.value = uploadFiles;
    emit('update:modelValue', uploadValue.value);
        
    ElMessage.success('檔案格式正確');

    // hint
    emit('update:rulesMsg', props.field,{
        ...props.rulesMsg,
        validate: 'success',
        successText: '',
        errorText: '',
    });

    emit('change'); //觸發父層
}

// 驗證
const handleVerify= (rawFile, rawFiles) => {
    const { raw, size } = rawFile;
    const isInvalidType = condition.every(item => raw.type !== item);
    if (isInvalidType) {
        uploadValue.value = [];
        fileRef.value.clearFiles();
        emit('update:modelValue', uploadValue.value);
        emit('update:rulesMsg', props.field, {
            ...props.rulesMsg,
            validate: 'error',
            errorText: `限${props.acceptNote}檔案格式!`,
        });
        return false;
    } else if ( size / 1024 / 1024 > maxFileSize.value ) {
        uploadValue.value = [];
        fileRef.value.clearFiles();
        emit('update:modelValue', uploadValue.value);
        emit('update:rulesMsg', props.field, {
            ...props.rulesMsg,
            validate: 'error',
            errorText: `檔案大小須小於 ${props.maxFileSize}MB!`,
        });
        return false;
    }
    
    handleSuccess(rawFiles, rawFile);
    return true;
}

//放大預覽
const handlePreview = (file) => {
    if (file.raw && file.raw.type === "video/mp4") { //from client upload
        dialogVideoVisible.value = true; 
    } else if (file.url.indexOf('.mp4') > 0) { // from backend URL data
        dialogVideoVisible.value = true;
    } else {
        dialogImageUrl.value = file.url;
        dialogVisible.value = true;
    }
}

//移除
const handleRemove = (file) => {
    dialogVideoUrl.value = '';
    uploadValue.value = [];
    fileRef.value.clearFiles();
    emit('update:modelValue', uploadValue.value);

    // hint
    emit('update:rulesMsg', props.field,{
        ...props.rulesMsg,
        validate: 'tips',
        errorText: '',
    });

    emit('change'); //觸發父層
}

</script>

<style scoped lang="scss">
    $kycUploadPicWidth: 300px;

    //el-upload range
    :deep(.el-upload-list) { 
        position: relative;
        max-height: #{$kycUploadPicWidth};

        //preview
        .el-upload-list__item { 
            position: absolute;
            z-index: 1;
        }
    }

    //preview
    :deep(.el-upload-list--picture-card) {  
        --el-upload-list-picture-card-size: #{$kycUploadPicWidth};
    }

    //preview
    :deep(.el-upload-list--picture-card .el-upload-list__item) { 
        // border: none;
        height: 100%;
        --el-upload-list-picture-card-size: #{$kycUploadPicWidth};
    }

    //upload
    :deep(.el-upload--picture-card) {  
        height: 100%;
        --el-upload-picture-card-size : #{$kycUploadPicWidth};
    }

    //移除預設圖片右上角綠勾
    :deep(.el-upload-list__item-status-label){
        display:none !important;
    }
</style>
       