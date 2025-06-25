<template>
    <div class="input_number_no_btn mb-16">
        <el-input
            v-model="inputValue"
            :class="[setCustomClass]"
            :disabled="disabled"
            maxlength="1"
            @input="replaceNonNumeric"
            @focus="setBoxShadow()"
            @blur="setBoxShadow()"
        />
    </div>
</template>

<script name="InputNumberNoBtn" setup>
    import { ref, watch, watchEffect  } from 'vue'

    const props = defineProps({
        modelValue: [String,Number],
        disabled: Boolean,
        customClass: {type:String,default:''},
        resetTrigger:{
            type:Number,
            default:0
        }
    })

    //接受父組件預設值傳入
    const inputValue = ref('');
    watchEffect(()=>{
        inputValue.value = props.modelValue;
    });
   
    //與父組件v-model綁定
    const emit = defineEmits(['update:modelValue']);
    watch(()=>inputValue.value, ()=>{
        emit('update:modelValue',inputValue.value);
    });

    //組件初始化
    watch(() => props.resetTrigger, () => {
        inputValue.value = 0;
        setCustomClass.value = props.customClass;
    });

    //替換掉非數字
    function replaceNonNumeric() {
        inputValue.value = inputValue.value.replace(/\D/g, '');
    }

    const setCustomClass = ref(props.customClass);
    const setBoxShadow = () => {
        if(setCustomClass.value.indexOf('el-is-focus') > -1){
            setCustomClass.value = setCustomClass.value.replace('el-is-focus','');
        }else{
            setCustomClass.value += 'el-is-focus';
        }
    }
</script>


<style lang="scss" scoped>
    .input_number_no_btn{
        display:inline-block;

        :deep(.el-input){
            width:40px;
            height:36px;

            input{
                text-align:center;
            }

            .el-input__wrapper{
                font-size:14px;
                box-sizing:border-box;
                box-shadow: 0 0 0 1px $border inset;
                &:hover{
                    box-shadow: 0 0 0 1px $blue-600 inset;
                }
            }
        }

        .el-is-focus{
            box-shadow: 1px 1px 4px #eee;
        }

        :deep(.el-input.is-disabled .el-input__wrapper) {
            background-color:$grey-100;
            box-shadow: 0 0 0 1px $border inset !important;
        }

        :deep(.el-input){
            .el-input__inner{
                -webkit-text-fill-color: $grey-800;

                &::placeholder{
                    -webkit-text-fill-color: $grey-400;
                }
            }

            &.is-disabled .el-input__inner{
                -webkit-text-fill-color: $grey-800;
            }  
        }
    }
</style>