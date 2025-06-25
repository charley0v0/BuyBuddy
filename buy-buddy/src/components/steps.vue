<template>
    <el-row justify="end">
        <el-col :span="3" class="d-flex justify-end align-center">
            <span>目前進度值：{{DisplayStatus}}</span>
        </el-col>
        <el-col :span="3" class="d-flex justify-end align-center">
            <PrimaryButton
                @click="Plus1"
                :title="'主步驟'"
                class="mr-10"
            ></PrimaryButton>
            <SecondaryButton
                @click="PlusFloat"
                :title="'子步驟'"
            ></SecondaryButton>
        </el-col>
    </el-row>

    <!-- horizontal steps -->
    <el-row :gutter="20" class="mb-30">
        <el-col :span="24" class='text-center'>
            <h3>Horizontal Steps</h3>
            <Layout :name="'horizontal_step'" id="horizontal_step">
                <Steps :nowStatus='OneLayerStatus' :stepData='Data'/>
            </Layout>
        </el-col>
    </el-row>

    <!-- vertical steps -->
    <el-row justify="space-around">
        <el-col :span="4">
            <h3>One Layer</h3>
            <Layout :name="'vertical_step_for_no_child'" id="vertical_step_for_no_child">
                <Steps :nowStatus='TwoLayerStatus' :stepData='Data' :direction='Direction' :space='Space'/>
            </Layout>
        </el-col>
        <el-col :span="4">
            <h3>Two Layer</h3>
            <Layout :name="'vertical_step_for_multi_child'" id="vertical_step_for_multi_child">
                <Steps :nowStatus='TwoLayerStatus' :showStatus='DisplayStatus' :stepData='Data3' :direction='Direction' :space='Space' :twoLayer='true' @RetruntEmit='handleEmit'/>
            </Layout>
        </el-col>
    </el-row>
</template>


<script setup>
    import {ref, reactive } from 'vue';
    import Steps from '@/components/steps/step.vue';
    import PrimaryButton from "@/components/button/primaryText.vue";
    import SecondaryButton from "@/components/button/secondaryText.vue";
    import Layout from "./Layout.vue";


    let Space = 50
    let Direction='vertical'
    
    const OneLayerStatus = ref(0.0);
    const TwoLayerStatus = ref(0.1);
    const DisplayStatus = ref(TwoLayerStatus.value)

    const Data = [
        {
            title:'步驟標題1',
            description:['這裡是一段說明文字']
        },
        {
            title:'步驟標題2',
            description:['這裡是一段說明文字']
        },
        {
            title:'步驟標題3',
            description:['這裡是一段說明文字']
        },
    ];

    const Data3 = ref([
        {   
            index:0,
            title:'步驟標題',
            status:'',
            showstatus:false,
            description:[
                {   
                    index:1,
                    subtitle:'這裡是一段說明文字',
                    substatus:'',
                    clickstatus:false,
                },
                {   
                    index:2,
                    subtitle:'這裡是一段說明文字',
                    substatus:'',
                    clickstatus:false,
                },
            ]
        },
        {
            index:1,
            title:'步驟標題',
            status:'',
            showstatus:false,
            description:[
                {   
                    index:1,
                    subtitle:'這裡是一段說明文字',
                    substatus:'',
                    clickstatus:false,
                },
                {   
                    index:2,
                    subtitle:'這裡是一段說明文字',
                    substatus:'',
                    clickstatus:false,
                },
                {   
                    index:3,
                    subtitle:'這裡是一段說明文字',
                    substatus:'',
                    clickstatus:false,
                },
                {   
                    index:4,
                    subtitle:'這裡是一段說明文字',
                    substatus:'',
                    clickstatus:false,
                },
            ]
        },
        {   
            index:2,
            title:'步驟標題',
            status:'',
            showstatus:false,
            description:[]
        },
        {   
            index:3,
            title:'步驟標題',
            status:'',
            showstatus:false,
            description:[
                {
                    index:1,
                    subtitle:'這裡是一段說明文字',
                    substatus:'',
                    clickstatus:false,
                },
                {
                    index:2,
                    subtitle:'這裡是一段說明文字',
                    substatus:'',
                    clickstatus:false,
                },
            ]
        },
    ]);



    const Plus1 = ()=>{
        if(OneLayerStatus.value ++ > 2){
            OneLayerStatus.value = 0
        }

        if(TwoLayerStatus.value == DisplayStatus.value){
            TwoLayerStatus.value = Math.trunc(TwoLayerStatus.value) + 1.1
            DisplayStatus.value = TwoLayerStatus.value
        }else{
            DisplayStatus.value = Math.trunc(DisplayStatus.value) + 1.1
        }
    }

    const PlusFloat = ()=>{
        
        //顯示進度 == 實際進度 => 同步進度
        if(TwoLayerStatus.value == DisplayStatus.value){
            TwoLayerStatus.value = Number((TwoLayerStatus.value + 0.1).toFixed(1))
            DisplayStatus.value = TwoLayerStatus.value
        }else{
            DisplayStatus.value = Number((DisplayStatus.value + 0.1).toFixed(1))
        }
    }

    const handleEmit = (EmitData)=>{
        DisplayStatus.value = EmitData.MainStatus + Number((EmitData.SubStatus/10).toFixed(1))
    }
</script>

<style>
    .mr-10{
        margin-right:10px;
    }
</style>
