<template>
    <div class="d-flex align-bottom search_type">
        <Select
            v-model="search.type"
            :title="title"
            :style="{'width': selectWidth + 'px'}"
            :options="optionsInComponent"
            :disabled="disabled"
            :placeholder="'不限定'"
            :resetTrigger="resetTrigger"
            class="mb-n4"
        ></Select>
        <div :style="`width:calc(100% - ${selectWidth}px);`">
            <DatepickerRange
                v-model="search.value"
                :title="''"
                :placeholder="'請輸入關鍵字'"
                :useShortCuts="true"
                :resetTrigger="resetTrigger"
                :useTime="useTime"
                style="width:100%;"
            ></DatepickerRange>
        </div>
       
    </div>
</template>

<script name="SearchDate" setup>
    import { ref, watch, computed } from 'vue'; 
    import Select from '@/components/select/select.vue';
    import DatepickerRange from '@/components/datepickers/datepickerRange.vue';

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
        },
        useTime:{
            type:Boolean,
            default:false
        }
    });

    const search = ref({
        type:'',//查詢類別
        value:[]//查詢輸入框
    });
    search.value.type = props.options[0].value;
    
    const emit = defineEmits(['update:modelValue'])
    watch(()=> search.value, ()=> {
        if(search.value.type == ''){
            search.value.value = [];
        }
        emit('update:modelValue',search.value);
    },{deep:true});

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

</script>

<style lang="scss" scoped>
    .mb-n4{
        margin-bottom:-4px;
    }

    .search_type{
        :deep(.el-select__wrapper){
            border-top-right-radius:0px;
            border-bottom-right-radius:0px;
        }

        :deep(.el-input__wrapper){
            border-top-left-radius:0px;
            border-bottom-left-radius:0px;
        }

        .date-picker-ranger{
            margin-left:-1px;
        }
    }

    .search_type:has(.el-select__wrapper.is-focused){
        :deep(.el-date-editor){
            box-shadow: 0 0 0 1px #2563EB inset;
        }
    }
    .search_type:has(.el-select__wrapper:hover){
        :deep(.el-date-editor){
            box-shadow: 0 0 0 1px #2563EB inset;
        }
    }
    .search_type:has(.el-date-editor:hover){
        :deep(.el-select__wrapper){
            box-shadow: 0 0 0 1px #2563EB inset;
        }
    }
</style>