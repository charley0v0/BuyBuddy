<template>
    <div class="search_bar">
        <div class="title" v-if="title">{{title}}</div>
        <el-input
            v-model="inputValue"
            class="w-50 m-2 custom_input"
            :placeholder="placeholder"
            :size="size"
        >   
            <template #suffix>
                <div class="clearValue" v-if="inputValue" @click="clearValue()">
                    <PrimaryCircle :buttonSize="'small'">
                        <template #icon>
                            <Icon>
                                <ClearFilled />
                            </Icon>
                        </template>
                    </PrimaryCircle>
                </div>
            </template>

            <template #append>
                <LinkCircle
                    @click="clickBtn"
                    :buttonSize="size"
                >
                    <template #icon>
                        <Icon>
                            <SearchFilled />
                        </Icon>
                    </template>
                </LinkCircle>
            </template>
        </el-input>
    </div>
</template>

<script name="SearchBar" setup>
    import { ref, watch } from 'vue';
    import { Icon } from '@vicons/utils'
    import { ClearFilled, SearchFilled } from '@vicons/material'
    import LinkCircle from "@/components/button/linkCircle.vue";
    
    const props = defineProps({
        title:{
            type:String,
            default:''
        },
        placeholder:{
            type:String,
            default:'請輸入關鍵字'
        },
        size:{
            type:String,
            default:''
        }
    });

    const inputValue = ref('');
    const emit = defineEmits(['search','clearval']);

    const clickBtn = () => {
        emit('search',inputValue.value);
    }
    
    const clearValue = () => {
        inputValue.value = '';
    }

    watch(()=>inputValue.value, (str)=>{
        if(str.trim() == ''){
            emit('clearval',str);
        }
    });

</script>

<style lang="scss" scoped>
    .search_bar{
        .clearValue{
            display:none;
        }

        .title{
            font-family: Noto Sans TC;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: 0.56px;
            margin-bottom: 4px;
        }

        :deep(.el-input-group__append){
            width:44px;
            padding:0px;
            background:white;
        }

        :deep(.el-input__wrapper){
            &:hover {
                box-shadow: 0 0 0 1px $blue-600 inset;

                .clearValue{
                    display:block;
                }
            }

            &.is-focus{
                .clearValue{
                    display:block;
                }
            }
        }
    }
    
</style>