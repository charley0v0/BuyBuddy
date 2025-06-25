<template>
    <div class="d-flex align-bottom search_type">
        <Select
            v-model="search.type"
            :title="title"
            :style="{'width': selectWidth + 'px'}"
            :options="optionsInComponent"
            :disabled="disabled"
            :placeholder="'不限定'"
        ></Select>
        <div class="d-flex align-center" v-if="search.type == 'cardNumber'" :style="`width:calc(100% - ${selectWidth}px);`">
            <DefaultInput
                v-model="cardNumber.no6"
                :title="''"
                :placeholder="'卡號前六碼'"
                :resetTrigger="resetTrigger"
                :maxlength="6"
            ></DefaultInput>
            <DefaultInput
                v-model="cardNumber.no4"
                :title="''"
                :placeholder="'卡號後四碼'"
                :focus="focusNo4"
                :resetTrigger="resetTrigger"
                :maxlength="4"
            ></DefaultInput>
        </div>
        <div v-else :style="`width:calc(100% - ${selectWidth}px);`">
            <DefaultInput
                v-model="search.value"
                :title="''"
                :placeholder="'請輸入關鍵字'"
                :resetTrigger="resetTrigger"
            ></DefaultInput>
        </div>
    </div>
</template>

<script name="SearchType" setup>
    import { ref, watch, computed } from 'vue'; 
    import Select from '@/components/select/select.vue';
    import DefaultInput from '@/components/inputs/defaultInput.vue';

    const props = defineProps({
        title:{
            type:String,
            default:''
        },
        options:{
            type:Array,
            default:[]
        },
        disabled:{
            type:Boolean,
            defualt:false
        },
        resetTrigger:{
            type:Number,
            default:0
        },
        selectWidth:{
            type:Number,
            default:150
        },
        modelValue:{
            type:Object,
            default:{}
        }
    });

    const search = ref({
        type:'',//查詢類別
        value:''//查詢輸入框
    });

    const cardNumber = ref({
        no6:'',
        no4:''
    })

    search.value.type = props.options[0].value;
    
    const emit = defineEmits(['update:modelValue'])
    watch(()=> search.value, ()=> {
        if(search.value.type == ''){
            search.value.value = '';
        }
        
        if(search.value.type == 'cardNumber') {
            search.value.value = cardNumber.value;
        }
        
        emit('update:modelValue',search.value);
    },{deep:true});

    watch(()=> search.value.type, ()=> {
        search.value.value = '';
        cardNumber.value.no6 = '';
        cardNumber.value.no4 = '';
    });

    // 非同步父層傳入option
    const optionsInComponent = ref(props.options)
    watch(()=>props.options, (newValue)=>{
        optionsInComponent.value = newValue;
    })
    // 非同步父層傳入value
    watch(()=>props.modelValue, (newVal)=>{
        search.value.type = newVal.type;
        search.value.value = newVal.value;
    })

    //初始化
    watch(()=>props.resetTrigger, (x)=>{
        search.value.type = optionsInComponent.value[0].value;
    })

    //當卡號6碼欄位輸滿6字後自動focus卡號4碼欄位
    const focusNo4 = ref(false);
    watch(()=> cardNumber.value.no6,()=>{
        focusNo4.value = cardNumber.value.no6.length == 6;
    });


</script>

<style lang="scss" scoped>
    .mb-n4{
        margin-bottom:-4px;
    }

    .search_type{
        :deep(.el-select__wrapper), :deep(.el-input__wrapper:first-child){
            border-top-right-radius:0px;
            border-bottom-right-radius:0px;
        }

        :deep(.el-input__wrapper){
            border-top-left-radius:0px;
            border-bottom-left-radius:0px;
        }

        .default_input{
            margin-left:-1px;
        }

        .card_number_input{
            height:36px;
            box-sizing:border-box;
            border-top:1px solid #E5E7EB;
            border-bottom:1px solid #E5E7EB;
            border-top-right-radius:4px;
            border-bottom-right-radius:4px;
            padding:1px 11px;
            position: relative;
            background:#F5F7FA;
           
        }
    }

    .search_type:has(.el-select__wrapper.is-focused){
        :deep(.default_input .el-input__wrapper){
            box-shadow: 0 0 0 1px #2563EB inset;
        }
    }
    .search_type:has(.el-select__wrapper:hover){
        :deep(.default_input .el-input__wrapper){
            box-shadow: 0 0 0 1px #2563EB inset;
        }

        .card_number_input{
            border-top:1px solid #2563EB;
            border-bottom:1px solid #2563EB;
        }
    }
    .search_type:has(.default_input .el-input__wrapper:hover){
        :deep(.el-select__wrapper){
            box-shadow: 0 0 0 1px #2563EB inset;
        }
        :deep(.default_input .el-input__wrapper){
            box-shadow: 0 0 0 1px #2563EB inset;
        }

        .card_number_input{
            border-top:1px solid #2563EB;
            border-bottom:1px solid #2563EB;
        }
    }

    .search_type:has(.default_input .el-input__wrapper.is-focus){
        :deep(.el-select__wrapper){
            box-shadow: 0 0 0 1px #2563EB inset;
        }
        :deep(.default_input .el-input__wrapper){
            box-shadow: 0 0 0 1px #2563EB inset;
        }

        .card_number_input{
            border-top:1px solid #2563EB;
            border-bottom:1px solid #2563EB;
        }
    }
</style>