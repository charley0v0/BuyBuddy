<template>
    <el-tag 
        v-for="(item,idx) in chipObj"
        class="mx-5"
        :class="disabled ? 'disabled': ''"
        :type="item.chipType"
        :effect="item.chipType == 'info' ? 'plain' : 'light'"
        :size="size"
        @click="onChange(item.value,idx)"
        round
    >   
        <div class="d-flex align-center ft-14">
            {{item.name}}    
            <Icon v-if="item.chipType == 'primary' && !disabled" class="ml-5 ft-16"><CloseCircleFilled /></Icon>  
        </div>
    </el-tag>
</template>


<script name="Chip" setup>
    import { ref, reactive, watch, watchEffect } from 'vue';
    import { Icon } from '@vicons/utils'
    import { CloseCircleFilled } from '@vicons/antd'

    const props = defineProps({
        modelValue:{
            type:Array,
            default:[]
        },
        chipList:{
            type:Array,
            default:[]
        },
        disabled:Boolean,
        size:{
            type:String,
            default:'large'
        },
        resetTrigger:{
            type:Number,
            default:0
        }
    });

    let chipArr = ref(props.modelValue);
    let chipObj = reactive(props.chipList);

    chipObj.forEach((c)=>{
        c.chipType = props.modelValue.indexOf(c.value) > -1 ? 'primary' : 'info';
    });

    watchEffect(()=>{
        chipArr.value = props.modelValue;
        chipObj.forEach((c)=>{
            c.chipType = props.modelValue.indexOf(c.value) > -1 ? 'primary' : 'info';
        });
    });

    //當checked為true時,chipType為空字串(藍色表示勾選),反之為info(灰色)
    const onChange = (changeValue,idx) => {
        if(!props.disabled){
            if(chipArr.value.indexOf(changeValue) > -1){
                chipArr.value.splice(chipArr.value.indexOf(changeValue),1);
                chipObj[idx].chipType = 'info';
            
            }else{
                chipArr.value.push(changeValue); 
                chipObj[idx].chipType = 'primary';
            }
        }
    };
   
    

    const emit = defineEmits(['update:modelValue'])
    watch(() => chipArr.value, ()=> {
        emit('update:modelValue',chipArr.value);
    },{deep:true});

    watch(() => props.resetTrigger, () => {
        chipObj.forEach((c)=>{
            c.chipType = 'info';
        });
        chipArr.value = [];
    });
</script>


<style lang="scss" scoped>
    .ml-5{
        margin-left:5px;
    }

    .mx-5{
        margin:0px 5px;
    }

    .el-tag{
        cursor:pointer;
        height:36px;

        &:hover{
            box-shadow: 1px 1px 4px #dddddd;
        }

        &:not(.el-tag--info){
            border:1px solid;
        }

        &.el-tag--info{
            color:$grey-800;
            border:1px solid $grey-200;
            background:white;
        }

        &.el-tag--primary{
            color:$blue-600;
            border:1px solid $blue-600;
            background:$blue-50;
        }
    }

    .el-tag.disabled{
        cursor:not-allowed !important;
    }
    
</style>