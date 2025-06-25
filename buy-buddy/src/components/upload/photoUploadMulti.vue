<!-- 
======== 多圖檔上傳預覽 元件功能 ========
上傳介面固定寬高 148px*148px
點擊介面上傳圖檔
判斷上傳至數量限制自動隱藏上傳介面
上傳圖檔後可即時預覽圖片與點擊 放大鏡 icon 彈出燈箱顯示放大圖檔
上傳圖檔後可點擊刪除 icon 後才能重新上傳圖檔
-->

<template>
    <div class="upload_imgs_div">
        <div class="d-flex">
            {{title}} 
            <slot name="title"></slot>
            <!-- ICON提示 -->
            <el-tooltip v-if="infoIconContent" :content="infoIconContent" raw-content class="box-item" effect="dark" placement="right-start">
                <div style="width:16px; margin-left:5px; display:flex;"><InfoOutlined/></div>  
            </el-tooltip>
        </div>

        <el-upload
            action="#"
            ref="fileRef"
            v-model:file-list="uploadValue"

            list-type="picture-card"
            :class="{'upload_hidden': isHiddenUpload}"
            :auto-upload="false"
            :accept="accept"
            :limit="setMaxLimit"
            :disabled="disabled"
            
            :on-change="handleVerify"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :style="uploadValue.length>0 ? `margin-bottom:-6px`: ''"
        >
            <el-icon><Plus /></el-icon>
            <template v-if="showTip" #tip>
                <div class="el-upload__tip">
                    <span v-if="setMinLimit > 0">至少上傳 {{setMinLimit}} 張圖檔，</span>
                    最多上傳 {{setMaxLimit}} 張圖檔，<br>
                    限 {{acceptNote}} 檔案格式，檔案大小須小於 {{maxFileSize}}MB
                    <div v-html="otherNote"></div>
                </div>
            </template>

            <!-- 影檔小圖預覽 -->
            <template #file="{file}">
                <li v-if="file?.url && (file.url.indexOf('.mp4') > 0 || file.isVideoPreview)" class="el-upload-list__item is-success" style="margin:0;border:0;">
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
                </li>
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
            <video v-if="dialogVideoVisible" controls autoplay style="width:100%;">
                <source :src="dialogVideoUrl" type="video/mp4">
                您的瀏覽器不支援影片預覽。
            </video>
        </el-dialog>

        <!-- 圖片放大預覽 -->
        <el-dialog v-model="dialogVisible">
            <img style="width:100%;" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>
</template>
    
<script name="PhotoUploadMulti" setup>
import { ref, watch, computed, watchEffect } from 'vue';
import { ElMessage } from 'element-plus'
import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue'
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
        type: Array,
        default:[]
    },
    //附檔名選單預設與驗證，接受'.png,.jpg,jpeg,.pdf,.gif,.bmp,.tif,.mp4'
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
    //上傳最小數量限制，如設定0，則TIP提示不顯示"至少上傳{{setMinLimit}}張圖檔"
    setMinLimit:{ 
        type: Number,
        default: 1
    },
    //上傳最大數量限制
    setMaxLimit:{ 
        type: Number,
        default: 5
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
const fileRef = ref([]);
const fileLimit = ref(props.setMaxLimit);
const maxFileSize = ref(props.maxFileSize);
const emit = defineEmits(['update:modelValue', 'update:rulesMsg', 'change', 'remove']);

const isHiddenUpload = computed( () => uploadValue.value.length === fileLimit.value );


watch(()=>uploadValue.value, ()=>{
    emit('update:modelValue',uploadValue.value);
});

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
        }
    });
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
    const index = uploadFiles.findIndex(item => item.uid === file.uid);
    if (index !== -1) { 
        //mp4預覽
        if ( raw.type === "video/mp4" ){
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadValue.value[index].url = e.target.result; //base64
                uploadValue.value[index].isVideoPreview = true
            };
            reader.readAsDataURL(raw);
        }
    }
    
    uploadValue.value = uploadFiles;
    emit('update:modelValue', uploadValue.value.map(item => item?.raw));
    
    ElMessage.success('檔案格式正確');

    // hint
    if ( uploadValue.value.length < fileLimit.value ) {
        emit('update:rulesMsg', props.field,
        {
            ...props.rulesMsg,
            validate: 'tips',
            errorText: '',
        });
    } else if ( uploadValue.value.length === fileLimit.value ){
        emit('update:rulesMsg', props.field,
        {
            ...props.rulesMsg,
            validate: 'success',
            successText: '',
            errorText: '',
        });
    }

    emit('change'); //觸發父層
}

// 驗證
const handleVerify= (rawFile, rawFiles) => {
    const { raw, size } = rawFile;
    const isInvalidType = condition.every(item => raw.type !== item);
    if (isInvalidType) {
        emit('update:rulesMsg', props.field, {
            ...props.rulesMsg,
            validate: 'error',
            errorText: `限${props.acceptNote}檔案格式!`,
        });
        rawFiles.pop();
        return false;
    } else if ( size / 1024 / 1024 > maxFileSize.value ) {
        emit('update:rulesMsg', props.field, {
            ...props.rulesMsg,
            validate: 'error',
            errorText: `檔案大小須小於 ${props.maxFileSize}MB!`,
        });
        rawFiles.pop();
        return false;
    }

    handleSuccess(rawFiles, rawFile);
    return true;
}

// 圖片放大預覽
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
// 影片放大預覽
const dialogVideoUrl = ref('')
const dialogVideoVisible = ref(false)
const handlePreview = (file) => {
    const index = uploadValue.value.findIndex(item => item.uid === file.uid);
    if (index !== -1) { 
        uploadValue.value[index].url = file.url;
    };
    
    if (uploadValue.value[index].raw && uploadValue.value[index].raw.type === "video/mp4") { //from client upload
        dialogVideoUrl.value = uploadValue.value[index].url;
        dialogVideoVisible.value = true; 
    } else if (file.url.indexOf('.mp4')>0){ // from backend URL data
        dialogVideoUrl.value = file.url;
        dialogVideoVisible.value = true;
    } else {
        dialogImageUrl.value = file.url
        dialogVisible.value = true;
    }
}

// 移除
const handleRemove = (file) => {
    const index = uploadValue.value.findIndex(item => item.uid === file.uid);
    if (index !== -1) { uploadValue.value.splice(index, 1) }; //remove

    uploadValue.value = uploadValue.value;
    emit('update:modelValue', uploadValue.value);

    // hint
    if ( uploadValue.value.length < fileLimit.value ) {
        emit('update:rulesMsg', props.field,
        {
            ...props.rulesMsg,
            validate: 'tips',
            errorText: '',
        });
    }

    emit('remove'); // 通知父層刪除事件
    // emit('change'); //觸發父層
}

</script>

<style scoped lang="scss">
    //.el-upload file
    .upload_imgs_div {
        .upload_hidden {
            :deep(.el-upload--picture-card) {
                display: none;
            }
        }
    }

    //移除預設圖片右上角綠勾
    :deep(.el-upload-list__item-status-label){
        display:none !important;
    }

    :deep(.is-disabled){
        .el-upload{
            cursor:not-allowed;
        }
    }


</style>  
