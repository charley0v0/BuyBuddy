<template>
    <div class="mb-24 d-flex align-center justify-between">            
        <h4>商店管理</h4>
        <PrimaryButton v-if="plateform==='OWS'" @click="emit('creatShop')" :title="'建立商店'">
            <template #right><AddOutlined /></template>
        </PrimaryButton>
    </div>
    <!-- ====== 搜尋 ====== -->
    <div class="mb-24 d-flex align-base justify-between">
        <div class="d-flex align-center">
            <SearchBar class="mr-16" title="" placeholder="輸入公司名、商店名或商店編號" @search="searchWord" style="width:280px;"></SearchBar>
        </div>
        <div class="totalNumber_style">
            {{currentData === "apiData" ? `所有商店 ${totalQueryShop} 間` : `搜尋結果 ${totalQueryShop} 筆`}}
        </div>
    </div>
    <!-- ====== 收合 查詢結果 ====== -->
    <el-collapse class="mb-16" v-for="(data,index) in searchResult" :key="data.nwpMemberUid || ''" v-model="activeItem" >
        <el-collapse-item :name="data.nwpMemberUid">
            <template #title>
                <div class="w-100p d-flex align-base justify-between">    
                    <div class="d-flex align-base">                          
                        <el-tag v-if="props.isMainUidView && props.modelValue.branchList.length > 0" 
                                class="ml-10 mr-16" :type="data.bindingCompanyRelationshipType === '總公司' ? 'primary' : 'info'"
                        >
                            <!-- 總公司視角情境 -->
                            {{data.bindingCompanyRelationshipType}}
                        </el-tag>
                        <h6>{{data.companyName}}</h6>
                    </div>
                    <p class="totalNumber_style">商店數 {{data.merchantCount}}</p>
                </div>
            </template>
            
            <!-- 商店table list -->
            <el-config-provider>
                <Table :tableData="data.merchantList" :showPage="false" :showCount="false" :showDownload="false" :loading="tableLoading">
                    <template #tableHeader>
                        <el-table-column prop="merchantName" label="商店名稱 / 商店編號" >
                            <template #default="scope">
                                {{scope.row.merchantName}}
                                <div class="ID_Style">{{scope.row.nwpMerchantNo}}</div>
                            </template>
                        </el-table-column>

                        <el-table-column prop="merchantStatus" label="商店狀態" 
                          :filter-method="(val, row)=>row.merchantStatus === val" column-key="merchantStatus" 
                          :filters="props.modelValue.tableFilterLists.merchantStatusList || []" width="110">
                            <template #default="scope">
                                <el-tag :type="merchantStatus_TagStyle(scope.row.merchantStatus)">{{scope.row.merchantStatusDisplayName}}</el-tag>
                            </template>
                        </el-table-column>

                        <el-table-column prop="merchantCreateDate" label="建立時間" width="110" sortable></el-table-column>

                        <el-table-column prop="merchantRegistrationResource" label="建立來源" 
                          :filter-method="(val, row)=>row.merchantRegistrationResource === val" column-key="merchantRegistrationResource"   
                          :filters="props.modelValue.tableFilterLists.merchantRegistrationResourceList || []" width="110">
                           <template #default="scope">{{scope.row.merchantRegistrationResourceDisplayName}}</template>
                        </el-table-column>
                        
                        <el-table-column prop="merchantAppFormStatus" label="審核狀態" 
                          :filter-method="(val, row)=>row.merchantAppFormStatus === val" column-key="merchantAppFormStatus"   
                          :filters="props.modelValue.tableFilterLists.merchantAppFormStatusList || []" width="110">
                            <template #default="scope">
                                <SecondaryTag :title="scope.row.merchantAppFormStatusDisplayName" :tagType="merchantAppFormStatus_TagStyle(scope.row.merchantAppFormStatus)" size="default"/>
                            </template>
                        </el-table-column>

                        <el-table-column v-if="plateform==='MGR'" prop="businessManager" label="商務經理" 
                            :filter-method="(val, row)=>row.businessManager.userId === val" column-key="businessManager"   
                            :filters="props.modelValue.tableFilterLists.businessManagerList || []" width="110">
                            <template #default="scope">
                                {{scope.row.businessManager.userName}}
                                <div class="ID_Style">{{scope.row.businessManager.userId}}</div>
                            </template>                  
                        </el-table-column>

                        <el-table-column prop="operate" label="" width="85">
                            <template #default="scope">
                                <el-button v-if="data.bindingCompanyRelationshipType==='總公司'" link type="primary" @click="detail(scope.row.nwpMerchantNo)">詳情</el-button>
                            </template>      
                        </el-table-column>

                    </template>
                </Table>
            </el-config-provider>
        </el-collapse-item>
    </el-collapse>

    <!-- ====== 收合 查詢結果 無資料 ====== -->
    <div v-if="searchResult.length===0" style="padding:8px 24px 24px; background-color:white; border-radius:6px;border: 1px solid #E5E7EB;box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.12);">
        <Table :tableData="[]" :showPage="false" :showCount="false" :showDownload="false" :loading="false">
            <template #tableHeader>
                <el-table-column label="商店名稱 / 代號"/>
                <el-table-column label="商店狀態" width="110"/>
                <el-table-column label="建立時間" width="110" sortable/>
                <el-table-column label="建立來源" width="110"/>
                <el-table-column label="審核狀態" width="110"/>
                <el-table-column v-if="plateform==='MGR'" label="商務經理" width="110"/>
                <el-table-column label="詳情" width="85"/>
            </template>
        </Table>
    </div>

</template>

<script name="ShopManageList" setup>
    import SearchBar from '@/components/search/searchBar.vue';
    import Table from '@/components/table/table.vue';
    import SecondaryTag from '@/components/tags/secondaryTag.vue';
    import PrimaryButton from '@/components/button/primaryText.vue';

    import { AddOutlined } from '@vicons/material'
    import { ElMessage } from 'element-plus'
    import { ref, shallowRef, watch, defineProps } from 'vue';
    
    const props = defineProps({
        // 後端商店列表與過濾選項資料
        modelValue: {
            type: Object,
            default: () => ({})
        },
        // 平台 : MGR || OWS
        plateform: {
            type: String,
            default: 'OWS' 
        },
        // 是否會員主視角
        isMainUidView: {
            type: Boolean,
            default: true,  
        }
    });
    
    const tableLoading = ref(true);
    let totalQueryShop = ref(0); //前端篩選資料總數
    const currentData = ref('apiData'); //判斷總筆數文案:"apiData":初始資料 | "queryData":前端篩選資料
    const searchQuery = ref(''); //搜尋字

    let apiDatas = [];
    const searchResult = ref([]);
    const emit = defineEmits(['creatShop', 'detail', 'isMainUidView', 'update:modelValue']);


    // 後端商店列表與過濾選項資料
    watch(() => props.modelValue, (newVal) => {
        console.log("modelValue newVal:", newVal)        
        // ================== 轉後端列表資料格式 ==================
        const hqData = newVal.hq ? [newVal.hq] : [];
        const branchData = Array.isArray(newVal.branchList) ? newVal.branchList : [];
        apiDatas = [...hqData, ...branchData];             //初始後端資料轉成前端資料結構
        searchResult.value = [...hqData, ...branchData];   //after search from apiDatas
        tableLoading.value = false;
    },{deep:true});


    const activeItem = ref(null);; // 展開資料
    // 搜尋結果資料
    watch(()=> searchResult.value, (newVal)=>{
        searchResult.value.forEach(data => {
            // 各公司商店總筆數
            data.merchantCount = data.merchantList.length || 0;
        });
        // query總數
        totalQueryShop = searchResult.value.reduce((sum, item) => sum + item.merchantList.length, 0);
        // 第一筆展開資料
        activeItem.value = searchResult.value[0]?.nwpMemberUid || null; 
    },{immediate:false, deep:true});
    
    // 關鍵字搜尋
    const searchWord = (query)=>{
        searchQuery.value = query;
        const result = fuzzySearch(apiDatas, query);
        searchResult.value = result; //run renew lists
        currentData.value = query === "" ? "apiData" : "queryData";
        tableLoading.value = false;
        console.log('search searchResult',searchResult.value);
    }
    
    const fuzzySearch = function (apiDatas, query, minLength=2) {
        console.log('fuzzySearch apiDatas',apiDatas)
        console.log(query)
        
        if (!query) return apiDatas; //空值回初始api apiDatas
        if (query.length < minLength) {
            ElMessage({ type: 'error', message: `請最少輸入${minLength}字元` });
            return [];
        }

        const lowerQuery = query.toLowerCase();
        return apiDatas.reduce((acc, item) => {
            //  過濾'companyName'公司名稱 return整個item
            if ( item?.companyName?.toLowerCase().includes(lowerQuery) ) {
                acc.push(item);
                return acc;
            }

            // 過濾'merchantList[]' 的商店名稱merchantName與商店編號nwpMerchantNo
            const filteredMerchants = Array.isArray(item.merchantList) ? item.merchantList.filter(merchantItem =>
                merchantItem?.merchantName?.toString().toLowerCase().includes(lowerQuery) ||
                merchantItem?.nwpMerchantNo?.toString().toLowerCase().includes(lowerQuery)
            ) : [];

            // 回傳過濾後的merchantList與該上層
            if (filteredMerchants.length > 0) {
                acc.push({...item, merchantList: filteredMerchants});
            }

            return acc;
        }, []);
    }

    // 詳情
    const detail = function(nwpMerchantNo){
        emit('detail', nwpMerchantNo)
    }


    // 商店狀態 tag樣式
    const merchantStatus_TagStyle = function(merchantStatus){
        switch (merchantStatus){
            case "OPERATING":   //營運中
                return "success";
            case "SUSPEND":     //暫停
                return "inifo";
            case "CLOSED":      //關閉
                return "error";
        }
    };
    // 審核狀態 (代收付審核) tag樣式
    const merchantAppFormStatus_TagStyle = function(merchantAppFormStatus){
        switch (merchantAppFormStatus){
            case "DRAFT":       //未申請
                return "warning";
            case "VERIFYING":   //審核中
                return "info";
            case "CORRECTING":  //待補件
                return "warning";
            case "APPROVED":    //審核通過
                return "success";
            case "REJECTED":    //審核失敗
                return "danger";
        }
    };


</script>

<style lang="scss" scoped>
.totalNumber_style {
    color: $grey-600;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    letter-spacing: 0.64px; 
    margin-right: 24px;
}
:deep(.el-table) {
    color: $grey-800;
}
.ID_Style {
    color: $grey-500;
    font-size: 12px;
}
// 篩選箭頭與欄位標題文字間距
:deep(.el-table__column-filter-trigger) {
    margin-left: 5px;
}

:deep(.el-collapse-item) {
    button, .el-collapse-item__header.is-active {
        border-radius: 6px;
    }
    button.el-collapse-item__header{
        padding: 16px 24px;
        height: 60px;
    }
    .el-collapse-item__content{
        padding: 0 24px 16px;
    }
    .el-collapse-item__wrap {
        border-radius: 0px 0px 6px 6px ;
    }
}

:deep(table) {
    .el-table__row:last-child{
        // border-bottom: var(--el-table-border);
        border-bottom: 1px solid $grey-200;
    }
}

//set table empty bottom border line 
:deep(.el-table__inner-wrapper:before) {
    height: 0px;
}
</style>