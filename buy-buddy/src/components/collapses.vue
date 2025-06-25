<template>
    <el-row justify="end">
        <el-col :span="3" class="d-flex justify-end align-center">
            <span>手風琴：</span>
            <el-switch 
                v-model="accordion"
                size="large"
                inline-prompt
                active-text="單顯示"
                inactive-text="多顯示"
                class="ml-12"
                style="--el-switch-on-color:#65A30D;--el-switch-off-color:#1E40AF;"
            ></el-switch>
        </el-col>
    </el-row>

    <el-row :gutter="20">
        <el-col :span="12">
            <h3>Paragraph</h3>
            <Layout :name="'collapse_paragraph'" id="collapse_paragraph">
                <el-collapse :accordion="accordion">
                    <el-collapse-item name="label1">
                        <!--=========== 以下放標題 ===========-->
                        <template #title>
                            <h5>標題一</h5>
                            <el-tag class="ml-10" type="success">Success</el-tag>
                        </template>
                        <!--=========== 以下放內容 ===========-->
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                            It has survived not only five centuries, but also the leap into electronic typesetting,remaining essentially unchanged. 
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="label2">
                        <!--=========== 以下放標題 ===========-->
                        <template #title>
                            <h5>標題二</h5>
                            <el-tag class="ml-10" type="warning">Warning</el-tag>
                        </template>
                        <!--=========== 以下放內容 ===========-->
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                            It has survived not only five centuries, but also the leap into electronic typesetting,remaining essentially unchanged. 
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </Layout>
        </el-col>
        <el-col :span="12">
            <h3>Form</h3>
            <Layout :name="'collapse_form'" id="collapse_form">
                <el-collapse :accordion="accordion" v-model="showFormCollapse">
                    <el-collapse-item name="form">
                        <!--=========== 以下標題 ===========-->
                        <template #title>
                            <h5>標題三</h5>
                            <el-tag class="ml-10" type="danger">Danger</el-tag>
                        </template>
                        <!--=========== 以下內容 ===========-->
                        <div>
                            <DefaultInput
                                v-model="inputVal"
                                :title="'標題'"
                            ></DefaultInput>
                            <CheckboxGroup
                                v-model="checkList"
                                :groupTitle="'標題'"
                                :checkGroup="checkGroup"
                            ></CheckboxGroup>
                            <RadioButtonGroup
                                v-model="radioGroup" 
                                :groupTitle="'標題'"
                                :radioArray="radioArray"
                            ></RadioButtonGroup>
                            <DefaultInput
                                v-model="textareaVal"
                                :title="'標題'"
                                :type="'textarea'"
                                :placeholder="'請輸入內容'"
                            ></DefaultInput>
                            <el-divider></el-divider>
                            <el-row justify="end">
                                <el-col class="text-right">
                                    <OutlineButton
                                        :title="'取消'"
                                        class="mr-10"
                                    ></OutlineButton>
                                    <PrimaryButton
                                        :title="'確定'"
                                    ></PrimaryButton>
                                </el-col>
                            </el-row>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </Layout>
        </el-col>
    </el-row>
</template>

<script setup>
    import { ref, reactive } from 'vue';
    import DefaultInput from '@/components/inputs/defaultInput.vue';
    import CheckboxGroup from '@/components/checkboxs/checkboxGroup.vue';
    import RadioButtonGroup from '@/components/radioButton/radioButtonGroup.vue';
    import OutlineButton from "@/components/button/outlineText.vue";
    import PrimaryButton from "@/components/button/primaryText.vue";

    const accordion = ref(false);
    const showFormCollapse = ref('form');
    
    const inputVal = ref('');

    //勾選的陣列
    const checkList = ref([]); 
    const checkGroup = reactive([
        {
            title:'Label One',
            value:'1',
            checked:''
        },
        {
            title:'Label Two',
            value:'2',
            checked:''
        },
        {
            title:'Label Three',
            value:'3',
            checked:''
        },
        
    ]);

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
        },
    ]);

    const textareaVal =ref('');

</script>

<style lang="scss" scoped>
    .ml-10{
        margin-left:10px;
    }

    .mr-10{
        margin-right:10px;
    }

</style>