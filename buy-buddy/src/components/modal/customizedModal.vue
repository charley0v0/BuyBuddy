<template>
<div>
    <el-dialog
        class="dialog-container"
        v-model="controlDialog"
        :width="width"
        :draggable="draggable"
        :center="center"
        :open-delay="openDelay"
        :close-delay="closeDelay"
        :title="title"
        :destroy-on-close="destroy"
        :show-close="showClose"
        :close-on-click-modal="closeOnClickModal"
        :fullscreen="fullscreen"
        :top="top"
        :align-center="alignCenter"
        :class="customClass"
        @opened="()=> openModal()"
        @close="()=> closeModal()"
        
    >
        <template #header v-if="!title">
            <div class="header">
                <slot name="header"></slot>
            </div>
        </template>

        <template #default>
            <slot name="default"></slot>
        </template>
        
        <template #footer>
            <slot name="footer"></slot>
        </template>

    </el-dialog>
</div>
</template>

<script name="CustomizedModal" setup>
    import { ref,watch,watchEffect } from 'vue';

    const props = defineProps({
        modelValue:Boolean,
        title:{
            type:String,
            default:''
        },
        draggable:{
            type:Boolean,
            default:false
        },
        center:{
            type:Boolean,
            default:false
        },
        top:{
            type:String,
            default:'15vh'
        },
        alignCenter:{
            type:Boolean,
            default:false
        },
        width:{
            type:String,
            default:'440px'
        },
        destroy:{
            type:Boolean,
            default:true
        },
        openDelay:{
            type:Number,
            default:0
        },
        closeDelay:{
            type:Number,
            default:0
        },
        showClose:{
            type:Boolean,
            default:true
        },
        fullscreen:{
            type:Boolean,
            default:false
        },
        size:{
            type:String,
            default:'large'
        },
        type:{
            type:String,
            default:'form'
        },
        closeOnClickModal:{
            type:Boolean,
            default:false
        },
    })
    const emit = defineEmits(['update:modelValue','openModal','getInnerWidth']);

    // dialog control
    const controlDialog = ref(false);
    watch(() => props.modelValue,() => {
        controlDialog.value = props.modelValue;
        emit('update:modelValue',controlDialog.value);
    });

    const closeModal = () => {
        emit('update:modelValue',false);
    }
    
    const openModal = () => {
        emit('openModal',true)
    }

    const customClass = ref('');

    watchEffect(()=>{
        customClass.value = '';
        if(props.size === 'large'){
            customClass.value = 'large_height'
        }

        if(props.size === 'medium' && props.type === 'text'){
            customClass.value = 'medium_text';
        }
    });

    window.addEventListener('resize',function(){
        emit('getInnerWidth',window.innerWidth);
    })
</script>

<style lang="scss" scoped>
@mixin mobile{
    @media screen and (max-width:768px) {
        @content;
    }
}

:deep(.el-dialog){ // Medium/form
    padding:0px;
    height: auto;

    @include mobile{
        width:90vw;
    }

    .el-dialog__header{
        border-bottom: 1px solid #E5E7EB;
        padding: 0px 16px;
        margin: 0px;
        height: 47px;
        display: flex;
        align-items: center;
        *{
            margin:0px;
        }
        @include mobile{
            height: 59px;
        }
    }

    .el-dialog__body{
        padding:10px 16px;
        overflow: auto;
        max-height: 452px;
        height: auto;
        word-break: break-all;
        &::-webkit-scrollbar {
            width: 10px;
        }

        &::-webkit-scrollbar-track-piece {
            background: transparent;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 24px;
            background-color: #E5E7EB;
            border: 1px solid #E5E7EB;
        }

        &::-webkit-scrollbar-track {
            box-shadow: transparent;
        }
    
        @include mobile{
            height: 64px;
        }
    }

    .el-dialog__footer{
        border-top:1px solid #E5E7EB;
        padding:8px 16px;
        min-height: 52px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        @include mobile{
            // min-height: 64px;
        }
    }

    .dialog-footer button:first-child {
        margin-left: 10px;
    }

    .el-dialog__headerbtn{
        width:48px;
        height:48px;
        top:0;
        &:focus{
            outline: none !important;
        }
        @include mobile{
            top:8px;
        }
    }
}

:deep(.large_height){ // Large
    width:720px;
    @include mobile{
        width: 90vw;
    }

    .el-dialog__body{
        padding:10px 16px;
        overflow: auto;
        height: 452px;
        word-break: break-all;
        @include mobile{
            height:416px;
        }
    }
}

:deep(.medium_text){ //  Medium/text
    
    @include mobile{
        width:90vw;
    }

    .el-dialog__body{
        padding:10px 16px;
        height:452px;
        overflow: auto;
        word-break: break-all;
        @include mobile{
            height: 416px;
        }
    }
}
</style>
