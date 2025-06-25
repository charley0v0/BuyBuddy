<template>
    <el-row :gutter="20">
        <!--======== Default =========-->
        <el-button @click="showData">showData</el-button>
        <el-col :span="24">
            <div class="d-flex align-center justify-end">
                <span>資料載入：</span>
                <el-switch 
                    v-model="loading"
                    size="large"
                    inline-prompt
                    active-text="讀取中"
                    inactive-text="完成"
                    class="ml-12"
                    style="--el-switch-on-color:#DC2626;--el-switch-off-color:#65A30D;"
                ></el-switch>

                <span class="ml-24">選取框checkbox：</span>
                <el-switch 
                    v-model="showCheckbox"
                    size="large"
                    inline-prompt
                    active-text="顯示"
                    inactive-text="隱藏"
                    class="ml-12"
                    style="--el-switch-on-color:#DC2626;--el-switch-off-color:#65A30D;"
                ></el-switch>
            </div>
            <Layout :name="'table'" id="table">
                <Table v-model:nowPage="nowPage" :tableData="tableData" :loading="loading" :totalCount="tableData.length" :useCount="true" @selectchange= "select_change">
                    <template #tableHeader>
                        <el-table-column v-if="showCheckbox" type="selection" width="55" />
                        <el-table-column prop="number" label="序號"></el-table-column>
                        <el-table-column prop="type" label="類型" 
                            column-key="type" 
                            :filters="typeList"
                        ></el-table-column>
                        <el-table-column prop="memberId" label="會員編號" ></el-table-column>
                        <el-table-column prop="memberName" label="會員名稱"></el-table-column>
                        <el-table-column prop="ubn" label="統一編號" ></el-table-column>
                        <el-table-column prop="mainAcc" label="主登入帳號" ></el-table-column>
                        <el-table-column prop="memberStatus" label="會員狀態" 
                            column-key="tagcount" 
                            :filters="memberStatusList"
                        >
                            <template #default="scope">
                                <el-tag type='info' size="large" v-for="(dt,idx) in scope.row.tagcount" :index="idx">{{idx+1}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="indentify" label="認證狀態"   
                            column-key="indentify" 
                            :filters="statusList"  
                        >
                            <template #default="scope">
                                {{scope.row.indentify == '1' ? '正常' : '失敗'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="operate" >
                            <!--自定義標題寫法-->
                            <template #header>
                                <span>自定義操作</span>
                            </template>
                            <!--自定義內容寫法-->
                            <template #default="scope">
                                <el-button>Edit</el-button>
                            </template>
                        </el-table-column>
                    </template>
                    <!--若需使用客製化查無資料內容使用下方-->
                    <!-- <template #customEmpty>
                        <div>查無綁定資料</div>
                    </template> -->
                </Table>
            </Layout>
        </el-col>
    </el-row>
</template>

<script setup>
    import { ref } from 'vue';
    import Table from '@/components/table/table.vue'

    const nowPage = ref(1);

    const tableData = ref([]);

    const showData = () => {
        const callBackData = [];
        for(let i = 0; i<=10;i++){
            let tag_ary = []
            for(let j = 0 ; j < i%4 + 1 ; j++){
                tag_ary.push(`${(j)+1}`)
            }
            
            callBackData.push({number:String(i),indentify:i%2 == 0 ? '1':'2',type:i%3 == 0 ? '個人':'企業',tagcount:tag_ary});
        }
        tableData.value = callBackData;
    }
    

    const typeList = ref([
        {text:'個人',value:'個人'},
        {text:'企業',value:'企業'},

    ]);
    
    const statusList = ref([
        {text:'正常',value:'1'},
        {text:'失敗',value:'2'},
    ]);

    const memberStatusList = ref([
        {text:'1',value:'1'},
        {text:'2',value:'2'},
        {text:'3',value:'3'},
        {text:'4',value:'4'},
    ]);

    const loading = ref(false);
    
    const showCheckbox = ref(true);

    const selectChange = ref([]);
    
    const select_change = (change_DT)=>{
        selectChange.value = change_DT
    }

</script>


<style lang="scss" scoped>

</style>