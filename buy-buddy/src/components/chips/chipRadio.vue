<template>
    <!-- small size chip -->
    <div 
        class="chip_radio" 
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
    <div class="chip_radio" :class="{'isChecked':isChecked,'disabled':disabled}" @click="checkedChip" v-else>
        <div class=" d-flex justify-between align-center chip_main" >
            <div class="d-flex align-center">
                <RadioButton 
                    v-model="radioValue" 
                    title="" 
                    :checkValue="checkValue"
                    :resetTrigger="defaultResetTrigger"
                    size="large"
                ></RadioButton>
                <div>
                    <div class="title">{{title}}</div>
                    <div class="description">{{description}}</div>
                </div>
            </div>
            <slot name="icon"></slot>
        </div>
        <div class="chip_content" v-if="contents.length">
            <div class="switch_info" @click="switchInfo()">{{switchInfoTitle}}</div>
            <ul v-if="showMoreInfo">
                <li v-for="(content,idx) in contents" :key="idx">{{content}}</li>
            </ul>
        </div>
    </div>
</template>



<script name="ChipRadio" setup>
    import { ref, reactive, watch, watchEffect, computed } from 'vue';
    import RadioButton from '@/components/radioButton/radioButton.vue';

    const props = defineProps({
        title:String,
        description:String,
        checkValue:String,
        modelValue:{
            type:String,
            default:''
        },
        disabled:{
            type:Boolean,
            default:false
        },
        size:{
            type:String,
            default:''
        },
        contents:{
            type:Array,
            default:[]
        },
        resetTrigger:{
            type:Number,
            default:0
        }
    });

    const defaultResetTrigger = ref(0);

    const radioValue = ref('');
    
    const emit = defineEmits(['update:modelValue']);

    watch(() => props.resetTrigger, () => {
       radioValue.value = '';
    });

    watch(() => props.modelValue, () => {
        radioValue.value = props.modelValue == props.checkValue ? props.checkValue : '';
    });

    watch(() => radioValue.value, () => {
        if(radioValue.value != ''){
            emit('update:modelValue',radioValue.value);
        }       
    });

    const checkedChip = () => {
        if(!props.disabled){
            radioValue.value = props.checkValue;
        }
    }

    const isChecked = computed(() => {
        return props.modelValue == props.checkValue;
    });


    const showMoreInfo = ref(true);
    const switchInfo = () => {
        showMoreInfo.value = !showMoreInfo.value;
    }
    const switchInfoTitle = computed(() => {
        return showMoreInfo.value ? '收合資訊' : '更多資訊';
    });



</script>

<style lang="scss" scoped>
    .chip_radio{
        border:1px solid $border-grey;
        border-radius:6px;
        cursor:pointer;

        &:hover{
            box-shadow: 1px 1px 4px #dddddd;
        }

        &.isChecked{
            border:1px solid $blue-600;
           
            .chip_main{
                background:$blue-50;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
            }

            .chip_content{
                border-top:1px solid $blue-600;
            }
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
        }

        :deep(.el-checkbox--large){
            .el-checkbox__inner::after{
                width: 4px;
                height: 10px;
                left: 5px;
                border-width: 2px;
            }
        }

        :deep(.el-radio){
            margin-right:10px;
        }
        
    }

    .chip_radio.disabled{
        cursor:not-allowed !important;
    }

    .chip_main{
        padding:16px 24px; 
    }

    .chip_content{
        padding:16px 24px;
        border-top:1px solid #E5E7EB;
        
        ul{
            list-style-position:inside;
            padding:0px;
            margin:0px;
        }

        li{
            margin:8px 0px;
        }

        .switch_info{
            display:none;
            cursor:pointer;
            color:#3B82F6;
            font-size:14px;
        }
    }

    @media screen and (max-width:960px){
        .switch_info{
            display:block !important;
        }
    }
</style>