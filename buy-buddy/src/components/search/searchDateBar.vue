<template>
    <div class="d-flex align-bottom search_type">
        <DatepickerRange
            v-model="searchValue"
            :title="title"
            :placeholder="'請輸入關鍵字'"
            :useShortCuts="true"
            :resetTrigger="resetTrigger"
            :useTime="useTime"
            style="width:100%;"
        ></DatepickerRange>
        <div class="searchIcon d-flex align-center justify-center">
            <LinkCircle @click="clickBtn">
                <template #icon>
                    <Icon>
                        <SearchFilled />
                    </Icon>
                </template>
            </LinkCircle>
        </div>
    </div>
</template>

<script name="SearchDateBar" setup>
    import { ref, watch, computed } from 'vue'; 
    import { Icon } from '@vicons/utils'
    import { ClearFilled, SearchFilled } from '@vicons/material'
    import LinkCircle from "@/components/button/linkCircle.vue";
    import DatepickerRange from '@/components/datepickers/datepickerRange.vue';

    const props = defineProps({
        title:{
            type:String,
            default:''
        },
        disabled:{
            type:Boolean,
            defualt:false
        },
        resetTrigger:{
            type:Number,
            default:0
        },
        useTime:{
            type:Boolean,
            default:false
        }
    });

    const searchValue = ref([]);
    
    const emit = defineEmits(['search','clearval']);
    const clickBtn = () => {
        emit('search',searchValue.value);
    }

</script>

<style lang="scss" scoped>
    
    .search_type{
        :deep(.el-input__wrapper){
            border-top-right-radius:0px;
            border-bottom-right-radius:0px;
        }

        .searchIcon{
            box-sizing:border-box;
            width:44px;
            height:36px;
            background: white;
            border:1px solid #DCDFE6;
            border-top-right-radius:4px;
            border-bottom-right-radius:4px;
            margin-left:-1px;
        }
    }
</style>