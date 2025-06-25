<template>
    <!-- small size chip -->
    <div 
        class="chip_description" 
        :class="{'isChecked':isChecked,'disabled':disabled}" 
        @click="checkedChip"
        v-if="size == 'small'"
    >
        <div class="title small">
            <slot name="icon"></slot>
            {{title}}
        </div>
        <div class="description">{{description}}</div>
    </div>
    <!--  normal size chip -->
    <div
        class="chip_description d-flex justify-between align-center" 
        :class="{'isChecked':isChecked,'disabled':disabled}" 
        @click="checkedChip"
        v-else
    >
        <div class="d-flex align-center">
            <el-checkbox class="mr-16" size="large" v-model="isChecked" @click="checkedChip"></el-checkbox>
            <div>
                <div class="title">{{title}}</div>
                <div class="description">{{description}}</div>
            </div>
        </div>
        <slot name="icon"></slot>
    </div>
</template>



<script name="ChipDescription" setup>
    import { ref, reactive, watch ,watchEffect } from 'vue';
    const props = defineProps({
        title:String,
        description:String,
        modelValue:Boolean,
        disabled:Boolean,
        size:String,
        resetTrigger:{
            type:Number,
            default:0
        }
    });

    const isChecked = ref(false);

    watchEffect(()=>{
        isChecked.value = props.modelValue;
    });

    const emit = defineEmits(['update:modelValue']);
    watch(() => isChecked.value, ()=>{
        emit('update:modelValue',isChecked.value);
    });

    watch(() => props.resetTrigger, () => {
        isChecked.value = false;
    });

    const checkedChip = () => {
        if(!props.disabled){
            isChecked.value = !isChecked.value;
           
        }
    }

</script>

<style lang="scss" scoped>
    .chip_description{
        border:1px solid $border-grey;
        border-radius:6px;
        padding:16px 24px;
        cursor:pointer;

        &:hover{
            box-shadow: 1px 1px 4px #dddddd;
        }

        &.isChecked{
            border:1px solid $blue-600;
            background:$blue-50;
        }

        :deep(.el-checkbox--large){
            .el-checkbox__inner{
                width:18px;
                height:18px;
            }
        }

        .mr-16{
            margin-right:16px;
        }

        :deep(.xicon) {
            width:100%;
            height:100%;

            svg{
                width:45px;
                height:45px;
            }
        }

        .title{
            font-size:18px;
            font-weight:700;
            letter-spacing:0.72px;
            line-height:28px;
            color:$text-grey-dark;
            margin-bottom:4px;

            &.small{
                display:flex;
                align-items:center;

                :deep(.xicon) {
                    width:100%;
                    height:100%;
                    margin-right:5px;

                    svg{
                        width:20px;
                        height:20px;
                    }
                }
            }
        }

        .description{
            font-size:14px;
            font-weight:400;
            letter-spacing:0.56px;
            line-height:20px;
            color:$text-grey-dark;
        }

        :deep(.el-checkbox--large){
            .el-checkbox__inner::after{
                width: 4px;
                height: 10px;
                left: 5px;
                border-width: 2px;
            }
        }

        :deep(.el-checkbox.is-checked:not(.is-disabled)){
            .el-checkbox__label{
                color:$blue-600 !important;
            }

            .el-checkbox__inner{
                border-color:$blue-600;
                background-color:$blue-600;
            }
        }
        
    }

    .chip_description.disabled{
        cursor:not-allowed !important;
    }
</style>