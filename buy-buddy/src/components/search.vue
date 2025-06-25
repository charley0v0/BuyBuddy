<template>
    <el-row justify="space-between">
        <el-col :span="4" class="d-flex align-center mb-16">
            <el-button size="small" round @click="reset(searchRef)">初始化</el-button>
            <el-button type="primary" size="small" round @click="validateBeforeSubmit(searchRef)">送出驗證</el-button>
        </el-col>
    </el-row>
    <el-form  
        ref="searchRef"
        :model="sendData"
        :rules="rules"
    >   
        <el-row :gutter="20">
            <!--======== SearchBar =========-->
            <el-col :span="8">
                <h3>SearchBar</h3>
                <Layout :name="'search_bar'" id="search_bar">
                    <el-form-item prop="searchBar">
                        <SearchBar @search="searchWord"></SearchBar>
                    </el-form-item>
                </Layout>
            </el-col>
            <!--======== SearchType =========-->
            <el-col :span="8">
                <h3>SearchType( Select + Input )</h3>
                <Layout :name="'search_type'" id="search_type">
                    <el-form-item prop="searchType">
                        <SearchType 
                            v-model="sendData.searchType"
                            :options="searchType"
                            :selectWidth="150"
                            :resetTrigger="defaultResetTrigger"
                        ></SearchType>
                    </el-form-item>
                </Layout>
            </el-col>
            <!--======== SearchDate ( Select + Date ) =========-->
            <el-col :span="8">
                <h3>SearchDate( Select + Date )</h3>
                <Layout :name="'search_date'" id="search_date">
                    <el-form-item prop="searchDate">
                        <SearchDate 
                            v-model="sendData.searchDate"
                            :options="dateType"
                            :resetTrigger="defaultResetTrigger"
                        ></SearchDate>
                    </el-form-item>
                </Layout>
            </el-col>
            <!--======== SearchBar ( Date ) =========-->
            <el-col :span="8">
                <h3>SearchBar ( Date )</h3>
                <Layout :name="'search_date_bar'" id="search_date_bar">
                    <el-form-item prop="searchDatebBar">
                        <SearchDateBar @search="searchDateBarValue" :resetTrigger="defaultResetTrigger"></SearchDateBar>
                    </el-form-item>
                </Layout>
            </el-col>
        </el-row>
    </el-form>
</template>


<script setup>
    import { ref } from 'vue';
    import SearchType from '@/components/search/searchType.vue';
    import SearchBar from '@/components/search/searchBar.vue';
    import SearchDate from '@/components/search/searchDate.vue';
    import SearchDateBar from '@/components/search/searchDateBar.vue';

    const searchType = [
        {
            label:'會員名稱',
            value:'memberName'
        },
        {
            label:'會員編號',
            value:'memberValue'
        },
        {
            label:'卡號前六後四',
            value:'cardNumber'
        }
    ]

    const dateType = [
        {
            label:'付款時間',
            value:'payDate'
        },
        {
            label:'訂單時間',
            value:'createDate'
        }
    ]

    const searchWord = (s) => {
        //子組件發送查詢給父組件
        sendData.value.searchKeyword = s;
    }

    const searchDateBarValue = (s) => {
        //子組件發送查詢給父組件
        sendData.value.searchKeyword = s;
    }

    //驗證規則
    const searchRef = ref(null);
    const sendData = ref({
        searchKeyword:'',//查詢關鍵字
        searchType:{
            type:'',//查詢類別
            value:''//查詢輸入框
        },
        searchDate:{
            type:'', //日期類別
            value:[] //日期區間
        },
        searchDatebBar:{
            type:'', //日期類別
            value:[] //日期區間
        }
    });
    const defaultResetTrigger = ref(0);
    const rules = ref({
        searchBar:[
            { required: true, message:'查詢關鍵字欄位為必填', trigger: [],},
        ],
        searchType:[
            { 
                validator: (rule, value, callback) => {
                    if (!value.type || !value.value) {
                        callback(new Error(`查詢條件欄位為必填`));
                    }
                }, trigger: [''] 
            }, 
        ],
        searchDate:[
            { 
                validator: (rule, value, callback) => {
                    if (!value.type || !value.value) {
                        callback(new Error(`查詢日期欄位為必填`));
                    }
                }, trigger: [''] 
            }, 
        ],
        searchDatebBar:[
            { 
                validator: (rule, value, callback) => {
                    if (!value.type || !value.value) {
                        callback(new Error(`查詢日期欄位為必填`));
                    }
                }, trigger: [''] 
            }, 
        ]
    });
    const reset = () => {
        defaultResetTrigger.value ++;
        setTimeout(() => {
           searchRef.value.clearValidate();
        }, 0);
    }

    //送出前檢查
    const validateBeforeSubmit = async (formEl) => {
        if (!formEl) return;
        await formEl.validate((valid, fields) => {
            if (valid) {
                console.log('submit!');
            } else {
                console.log('error submit!', fields);
                return false;
            }
        })
    }

</script>
