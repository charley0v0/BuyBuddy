<template>
    <Controller v-model="size" v-model:disabled="checkboxDisbled" :sizeControl="['large','default']" />
    <el-row :gutter="20">
        <el-col :span="8">
            <h3>Single CheckBox</h3>
            <!--======== 獨立勾選框 ========-->
            <Layout :name="'single_checkbox'" id="single_checkbox">
                <div class="mb-n4 ft-14">標題</div>
                <Checkbox 
                    v-model="SingleCheckbox"
                    :title="'Single Checkbox'"
                    :trueValue="'1'"
                    :size="size"
                    :disabled="checkboxDisbled"
                    :resetTrigger="defaultResetTrigger"
                ></Checkbox>
            </Layout>
        </el-col>
        <el-col :span="16">
            <h3>CheckBox Group</h3>
            <!--======== 全選功能範例 ========-->
            <Layout :name="'checkbox_group'" id="checkbox_group">
                <CheckboxGroup
                    v-model="checkList"
                    :groupTitle="'標題'"
                    :checkGroup="checkGroup"
                    :size="size"
                    :disabled="checkboxDisbled"
                    :resetTrigger="defaultResetTrigger"
                    showAllCheck
                ></CheckboxGroup>
            </Layout>
        </el-col>
    </el-row>
</template>

<script setup>
    import { ref, reactive, nextTick } from 'vue';
    import Controller from '@/components/controller.vue';
    import Checkbox from '@/components/checkboxs/checkbox.vue';
    import CheckboxGroup from '@/components/checkboxs/checkboxGroup.vue';

    const size = ref('');
    const checkboxDisbled = ref(false);
    const SingleCheckbox = ref('');

    const checkGroup = reactive([
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
        }
    ]);

    //勾選的陣列
    const checkList = ref(['2']); 

    //重設
    const defaultResetTrigger = ref(0);
    const reset = () => {
        defaultResetTrigger.value++;
	    nextTick(() => {
            //以下帶入頁面預設資料
            // SingleCheckbox.value = '1';
            // checkList.value = ['1','2','3'];
        });
    }

</script>

<style lang="scss" scoped>
    .mb-n4{
        margin-bottom:-4px;
    }

    .ft-14{
        font-size:14px;
    }
</style>