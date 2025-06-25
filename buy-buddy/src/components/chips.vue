<template>
    <Controller   v-model="chipSize" v-model:disabled="ComponentDisabled" :sizeControl="['large','small']" />
    <el-row :gutter="20">
        <!--========== Chip ==========-->
        <el-col :span="8" >
            <h3>Chip</h3>
            <Layout :name="'chip_no_description'" id="chip_no_description">
                <Chip
                    v-model="chipArr"
                    :chipList="chipList"
                    :size="chipSize"
                    :disabled="ComponentDisabled"
                />
            </Layout>
        </el-col>
        <!--========== Chip with Description ==========-->
        <el-col :span="8">
            <h3>Chip with Description</h3>
            <Layout :name="'chip_with_description'" id="chip_with_description">
                <ChipDescription 
                    v-model="chipDescription" 
                    :title="'金流服務'" 
                    :description="'可立即付款、收款'"
                    :size="chipSize"
                    :disabled="ComponentDisabled"
                    :resetTrigger="defaultResetTrigger"
                >
                    <template #icon>
                        <div>
                            <Icon color="#BFDBFE">
                                <StackedLineChartFilled />
                            </Icon>
                        </div>
                    </template>
                </ChipDescription>
            </Layout>
        </el-col>
    </el-row>
</template>


<script setup>
    import { ref, watch, nextTick } from 'vue';
    import Chip from '@/components/chips/chip.vue';
    import ChipDescription from '@/components/chips/chipDescription.vue';
    import { Icon } from '@vicons/utils';
    import { StackedLineChartFilled } from '@vicons/material';
    import Controller from '@/components/controller.vue';

    //調整組件是否禁用
    const ComponentDisabled = ref(false); 

    const chipChecked = ref(true);
    const chipTitle = ref('Option');

    const chipArr = ref(['op1','op3']);
    const chipList = [
        {
            name:'option1',
            value:'op1'
        },
        {
            name:'option2',
            value:'op2'
        },
        {
            name:'option3',
            value:'op3'
        },
    ]

    const chipDescription = ref(true);
    const chipSize = ref('large');

    //重設
    const defaultResetTrigger = ref(0);
    const reset = () => {
        defaultResetTrigger.value++;

        nextTick(()=>{
            //以下帶入頁面預設資料
            // chipArr.value = ['op1'];
            //  chipDescription.value = true;
        });
    }


</script>