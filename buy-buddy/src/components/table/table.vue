<template>
    <el-skeleton :loading="loading" animated>
        <template #template>
            <div class="d-flex justify-between align-center mb-16">
                <el-skeleton-item variant="text"  style="width:110px;height:16px;"></el-skeleton-item>
                <el-skeleton-item variant="text"  style="width:120px;height:36px;"></el-skeleton-item>
            </div>
            <el-skeleton-item variant="text"  style="height:40px;"></el-skeleton-item>
            <div class="skeleton_td" v-for="s in 5">
                <el-skeleton-item variant="text" style="width:10%"></el-skeleton-item>
                <el-skeleton-item variant="text" style="width:30%;"></el-skeleton-item>
                <el-skeleton-item variant="text" style="width:25%;"></el-skeleton-item>
                <el-skeleton-item variant="text" style="width:5%;"></el-skeleton-item>
                <el-skeleton-item variant="text" style="width:5%;"></el-skeleton-item>
                <el-skeleton-item variant="text" style="width:5%;height:24px;"></el-skeleton-item>
            </div>
        </template>
        <template #default>
            <div id="table">
                <div class="d-flex align-center justify-between mb-16">
                    <div class="ft-16">
                        <span  v-if="showCount">查詢結果 共{{tableShowData.length}}筆</span>
                    </div>
                    <div v-if="showDownload">
                        <OutlineButton
                            @click="downloadBtn()"
                            :title="'下載結果'"
                            :disabled="downloadDisabled"
                        >
                            <template #right>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M15.8333 10.8343V15.001C15.8333 15.4593 15.4583 15.8343 15 15.8343H5C4.54167 15.8343 4.16667 15.4593 4.16667 15.001V10.8343C4.16667 10.376 3.79167 10.001 3.33333 10.001C2.875 10.001 2.5 10.376 2.5 10.8343V15.8343C2.5 16.751 3.25 17.501 4.16667 17.501H15.8333C16.75 17.501 17.5 16.751 17.5 15.8343V10.8343C17.5 10.376 17.125 10.001 16.6667 10.001C16.2083 10.001 15.8333 10.376 15.8333 10.8343ZM10.8333 10.5593L12.4 8.99264C12.725 8.66764 13.25 8.66764 13.575 8.99264C13.9 9.31764 13.9 9.84264 13.575 10.1676L10.5833 13.1593C10.2583 13.4843 9.73333 13.4843 9.40833 13.1593L6.41667 10.1676C6.09167 9.84264 6.09167 9.31764 6.41667 8.99264C6.74167 8.66764 7.26667 8.66764 7.59167 8.99264L9.16667 10.5593V3.33431C9.16667 2.87598 9.54167 2.50098 10 2.50098C10.4583 2.50098 10.8333 2.87598 10.8333 3.33431V10.5593Z" fill="#1E40AF"/>
                                </svg>
                            </template>
                        </OutlineButton>
                    </div>
                </div>
                <el-config-provider :locale="locale">
                    <el-table 
                        ref="elTableRef"
                        style="width:100%"
                        :data="useCount ? tableShowData.slice((currentPage - 1) * pageSize, currentPage * pageSize) : tableShowData" 
                        @filter-change="filterChange"
                        @selection-change="handleSelectionChange"
                    >
                        <slot name="tableHeader">
                        <!--表格區塊-->
                        </slot>
                        <template v-slot:empty>
                            <!--查無資料時顯示-->
                            <div class="no_data d-flex align-center justify-center">
                                <slot name="customEmpty">
                                    <div>
                                        <img :src="noDataImg" alt="查無資料">
                                        <div class="no_data_text">目前無資料可顯示</div>
                                    </div>
                                </slot>
                            </div>
                        </template>
                    </el-table>
                </el-config-provider>
                <div class="d-flex justify-center" v-if="showPage">
                    <el-pagination layout="prev,pager,next" 
                        :total="tableShowData.length" 
                        :page-size="pageSize"
                        v-model:current-page="currentPage"
                    >
                    </el-pagination>
                </div>
            </div>
        </template>
    </el-skeleton>
</template>

<script name="Table" setup>
    import { ref, watch, computed, nextTick } from 'vue';
    import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
    import noDataImg from '@/assets/image/noData.png';
    import OutlineButton from "@/components/button/outlineText.vue";

    const props = defineProps({
        totalCount:{
            type:Number,
            default:0,
        },
        nowPage:{
            type:Number,
            default:1,
        },
        tableData:{
            type:Array,
            default:[], 
        },
        showCount:{
            type:Boolean,
            default:true
        },
        showDownload:{
            type:Boolean,
            default:true
        },
        pageSize:{
            type:Number,
            default:200
        },
        showPage:{
            type:Boolean,
            default:true
        },
        resetFilter:{
            type:Number,
            default:0
        },
        useCount:{
            type:Boolean,
            default:false
        },
        loading:{
            type:Boolean,
            default:true
        },
        resetCheckbox: {
            type: Number,
            default: 0
        }
    });

    const locale = zhTw;

    const emit = defineEmits(['update:nowPage', 'download' ,'selectchange']);

    const currentPage = ref(props.nowPage);

    const downloadDisabled = computed(() => {
        return props.totalCount == 0;
    });

    watch(()=>props.nowPage, ()=>{
        currentPage.value = props.nowPage;
    });

    watch(()=> currentPage.value, ()=>{
        emit('update:nowPage',currentPage.value);
    });

    watch(()=> props.tableData,(t)=>{
       tableShowData.value = t;
    })

    const elTableRef = ref(null);
    watch(()=> props.resetFilter,()=>{
        elTableRef.value.clearFilter();
    })
    watch(()=>props.resetCheckbox, ()=>{
        elTableRef.value.clearSelection();
    })


    //下載查詢結果
    const downloadBtn = () => {
        emit('download',true);
    }

    //觸發過濾
    const tableShowData = ref(props.tableData);
    const filterObj = ref({});
    const filterChange = (obj) =>{ 
        for(var x in obj){
            filterObj.value[x] = obj[x];
        }
        //檢查 過濾內容
        const nonEmptyKeys = Object.keys(filterObj.value).filter(key => filterObj.value[key].length > 0);

        if (nonEmptyKeys.length > 0) {
            // 找出 filteredData 中符合 filterObj.value 中 key 值的資料
            const filteredData = props.tableData.filter(item => {
                return nonEmptyKeys.every(key => {
                    // item[key] 可能是陣列或其他類型
                    if (Array.isArray(item[key])) {
                        // 檢查 item[key] 是否包含 filterObj.value[key] 的所有元素
                        return filterObj.value[key].every(value => item[key].includes(value));
                    } else {
                        // 檢查 filterObj.value[key] 是否包含 item[key]
                        return filterObj.value[key].includes(item[key]);
                    }
                });
            });
            tableShowData.value = filteredData;
        } else {
            tableShowData.value = props.tableData;
        }

        currentPage.value = 1;
    }

    const handleSelectionChange = (dt)=>{
        emit('selectchange',dt);
    }
</script>

<style lang="scss" scoped>
    .skeleton_td{
        height:50px;
        padding:8px 12px;
        box-sizing:border-box;
        border-bottom:1px solid #eeeeee;
        display:flex;
        align-items:center;
        justify-content:space-between;
    }

    #table{
        :deep(.el-table__header){
            th{
                background:$grey-100;
                color:$grey-800;
                font-size:14px;
            }
        }

        .no_data{
            width:100%;
            height:188px;
        }

        .no_data_text{
            color:$grey-600;
            font-size:14px;
        }

        :deep(.el-table__empty-text){
            line-height:32px;
        }  
        
        :deep(.el-table tr:last-child){
            td.el-table__cell{
               border-bottom-width:0px;
            }
        }

        :deep(.el-table__inner-wrapper:before){
            height:0px;
        }
    }
</style>