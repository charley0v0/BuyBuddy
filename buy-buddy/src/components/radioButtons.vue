<template>
<Controller v-model="size" v-model:disabled="radioDisabled" :sizeControl="['large','default']" />
    <el-row :gutter="20">
        <el-col :span="8">
            <h3>Single RadioButton</h3>
            <Layout :name="'single_radioButton'" id="single_radioButton">
                <div class="mb-8 title">標題</div>
                <RadioButton 
                    v-model="singleRadio" 
                    :title="'Single Label'" 
                    :checkValue="'1'"
                    :size="size"
                    :disabled="radioDisabled"
                    :resetTrigger="defaultResetTrigger"
                ></RadioButton>
            </Layout>
        </el-col>
        
        <el-col :span="16">
            <h3>RadioButton Group</h3>
            <Layout :name="'radioButton_group'" id="radioButton_group">
                <RadioButtonGroup
                    v-model="radioGroup" 
                    :groupTitle="'標題'"
                    :radioArray="radioArray"
                    :size="size"
                    :disabled="radioDisabled"
                    :resetTrigger="defaultResetTrigger"
                ></RadioButtonGroup>
            </Layout>
        </el-col>
    </el-row>
</template>


<script setup>
    import { ref, reactive, nextTick } from 'vue';
    import RadioButton from '@/components/radioButton/radioButton.vue';
    import RadioButtonGroup from '@/components/radioButton/radioButtonGroup.vue';
    
    const size = ref('');
    const radioDisabled = ref(false);

    const singleRadio = ref('');

    const radioGroup = ref('');
    const radioArray = reactive([
        {
            title:'Label One',
            value:'1',
        },
        {
            title:'Label Two',
            value:'2',
        },
        {
            title:'Label Three',
            value:'3',
            disabled:true
        },
    ]);

    //重設
    const defaultResetTrigger = ref(0);
    const reset = () => {
        defaultResetTrigger.value++;
	    nextTick(() => {
            //以下帶入頁面預設資料
            // singleRadio.value = '1';
            // radioGroup.value = '1';
        });
    }

    
</script>

<style lang="scss" scoped>
    .mb-8{
        margin-bottom:8px;
    }

    .title{
        font-family: "Noto Sans TC";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0.56px;
    }

    .ft-14{
        font-size:14px;
    }
</style>