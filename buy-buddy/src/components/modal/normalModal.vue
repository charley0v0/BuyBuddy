<template>
<div>
    <el-dialog
        v-model="controlNormalDialog"
        :width="width"
        class="dialog-container"
        :draggable="draggable"
        :title="title"
        :center="center"
        :align-center="alignCenter"
        :top="top"
        :show-close="showClose"
        :close-on-click-modal="showClose"
        :close-on-press-escape="showClose"
        @close="()=> closeModal()"
    >
        <template #header v-if="!title">
            <div class="header">
                <slot name="header"></slot>
            </div>
        </template>
        <div>
            <slot></slot>
        </div>
        <template #footer>
            <slot name="footer">
                <span class="dialog-footer">
                    <PrimaryButton
                        @click="controlNormalDialog = false"
                        :title="'確定'"
                        :buttonSize="getWidth > 768 ? 'default' : 'large'"
                        :disabled="disabled"
                    ></PrimaryButton>
                </span>
            </slot>
        </template>
    </el-dialog>
</div>
</template>

<script name="NormalModal" setup>
    import { ref,watch } from 'vue';
    import PrimaryButton from "@/components/button/primaryText.vue";

    const props = defineProps({
        modelValue:Boolean,
        title:String,
        disabled:{
            type:Boolean,
            default:false
        },
        draggable:{
            type:Boolean,
            default:false
        },
        width:{
            type:String,
            default:'440px'
        },
        alignCenter:{
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
        showClose:{
            type:Boolean,
            default:true
        }
    })

    const emit = defineEmits(['update:modelValue']);
    const controlNormalDialog = ref(false);

    watch(() => props.modelValue,()=> {
        controlNormalDialog.value = props.modelValue;
        emit('update:modelValue',controlNormalDialog.value);
    });

    const closeModal = () =>{
        emit('update:modelValue',false);
    }

    const getWidth = ref(window.innerWidth);
    window.addEventListener('resize',function(){
        getWidth.value = window.innerWidth;
    })
</script>

<style lang="scss" scoped>
@mixin mobile{
    @media screen and (max-width:768px) {
        @content;
    }
}
:deep(.el-dialog){
    padding:0px;

    @include mobile{
        width:90vw;
        max-width:440px;
    }

    .el-dialog__header{
        border-bottom: 1px solid #E5E7EB;
        padding:0px 16px;
        margin:0px;
        height: 47px;
        display: flex;
        align-items: center;
        @include mobile{
            min-height: 59px;
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
            min-height: 64px;
        }
    }

    .dialog-footer button:first-child {
        margin-left: 10px;
    }

    .el-dialog__headerbtn{
        top:0px;
        width:48px;
        height:48px;

        &:focus{
            outline: none !important;
        }
    }

    .el-dialog__body{
        padding:10px 16px;
        min-height:72px;
        word-break: break-all;
        @include mobile{
            min-height: 60px;
        }
    }
}

</style>
