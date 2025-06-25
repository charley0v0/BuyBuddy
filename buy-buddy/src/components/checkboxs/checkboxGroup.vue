<template>
    <div class="mb-16">
        <div class="mb-n4 ft-14 checkbox_title" v-if="groupTitle">{{groupTitle}}</div>
            <Checkbox 
                v-model="allCheck"
                v-if="showAllCheck"
                :title="allCheckTitle"
                :trueValue="'all'"
                :falseValue="''"
                :size="size"
                :style="{width:`${width}px`}"
                :indeterminate="notCheckAll"
                :disabled="disabled"
            ></Checkbox>
            <Checkbox 
                v-for="(item,idx) in group"
                v-model="item.isChecked"
                :title="item.title"
                :trueValue="'1'"
                :size="size"
                :width="width"
                :disabled="disabled || item.disabled"
            ></Checkbox>
        </div>
</template>

<script name="CheckboxGroup" setup>
    import { ref, reactive, watch, watchEffect, nextTick } from 'vue';
    import Checkbox from '@/components/checkboxs/checkbox.vue';

    const props = defineProps({
        modelValue:{
            type:Array,
            default:[]
        },
        groupTitle:{
            type:String,
            default:''
        },
        showAllCheck:{
            type:Boolean,
            default:false,
        },
        allCheckTitle:{
            type:String,
            default:'全選'
        },
        checkGroup:Array,
        disabled:{
            type:Boolean,
            default:false
        },
        width:{
            type:String,
            default:''
        },
        size:{
            type:String,
            default:''
        },
        resetTrigger:{
            type:Number,
            default:0
        }
    });

    const allCheck = ref('all');
    const notCheckAll = ref(false);
    const checkList = ref([]);
    const group = reactive(props.checkGroup);
    //設定是否預設勾選
    group.forEach((g)=>{
        g.isChecked = props.modelValue.indexOf(g.value) > -1 ? '1' : '';
    });
    
    const emit = defineEmits(['update:modelValue']);

    watchEffect(() =>{      
        //組成勾選陣列
        checkList.value = group.map((x) => {
            if(x.isChecked){
                return x.value;
            }
        });
        checkList.value = checkList.value.filter((e)=> e);
        emit('update:modelValue',checkList.value);

        //判斷是否全選
        nextTick(()=>{
            allCheck.value = (checkList.value.length == group.length)? 'all' : '';
            notCheckAll.value = checkList.value.length && (checkList.value.length < group.length) ? true :false;
        });
    });


    //點擊全選
    watch(()=>allCheck.value,(x)=>{
        if(x == 'all'){
            group.forEach((y)=>{
                y.isChecked = '1';
            });
        }
        if(x !== 'all' && !notCheckAll.value) {
            group.forEach((y)=>{
                y.isChecked = '';
            });
        }
    });

    watch(() => props.resetTrigger, () => {
        group.forEach((g)=>{
            g.isChecked = '';
        });
    });

    watch(() => props.modelValue, () => {
        group.forEach((g)=>{
            g.isChecked = props.modelValue.indexOf(g.value) > -1 ? '1' : '';
        });
    });

</script>

<style lang="scss" scoped>
    .mb-n4{
        margin-bottom:-4px;
    }

    .ft-14{
        font-size:14px;
    }

    .checkbox_title{
        color:$grey-800;
        font-weight:400;
        line-height:20px;
        letter-spacing: 0.56px;
        margin-bottom:4px;
    }
</style>