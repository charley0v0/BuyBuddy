<template>
  <el-row>
    <el-col :span="4" class="d-flex align-center">
      <el-row justify="space-between">
          <el-col class="d-flex align-center">
              <el-button size="small" round @click="reset(selectRef)">初始化</el-button>
              <el-button type="primary" size="small" round @click="validateBeforeSubmit(selectRef)">送出驗證</el-button>
          </el-col>
      </el-row>
    </el-col>
    <el-col :span="20">
      <Controller v-model="size" v-model:disabled="ComponentDisabled" :sizeControl="['large','default']" />
    </el-col>
  </el-row>
  <el-form  
      ref="selectRef"
      :model="sendData"
      :rules="rules"
  >   
    <el-row :gutter="20">
      <!--========== No GroupSelect==========-->
      <el-col :span="8">
        <h3>Select</h3>
        <Layout :name="'no_group_select'" id="no_group_select">
          <el-form-item class="mb-16" prop="noGroupSelect" :error="rulesMsg.noGroupSelect.errorText">
            <Select
              v-model="sendData.noGroupSelect"
              :title="'標題'"
              :placeholder="'請選擇類別'"
              :style="{'width': widthSize + 'px'}"
              :options="options"
              :size="size"
              :disabled="ComponentDisabled"
              :resetTrigger="defaultResetTrigger"
              :useFilter="true"
              :rulesMsg="rulesMsg.noGroupSelect"
            ></Select>
          </el-form-item>
        </Layout>
      </el-col>
      <!--========== multipleSelect==========-->
      <el-col :span="8">
        <h3>Multiple Select</h3>
        <Layout :name="'no_group_select'" id="no_group_select">
          <el-form-item class="mb-16" prop="multipleSelect" :error="rulesMsg.multipleSelect.errorText">
            <Select
              v-model="sendData.multipleSelect"
              :title="'標題'"
              :placeholder="'請選擇類別'"
              :style="{'width': widthSize + 'px'}"
              :options="options"
              :size="size"
              :disabled="ComponentDisabled"
              :resetTrigger="defaultResetTrigger"
              :useFilter="true"
              :multiple="true"
              :rulesMsg="rulesMsg.multipleSelect"
            ></Select>
          </el-form-item>
        </Layout>
      </el-col>

      <!--========== groupSelect==========-->
      <el-col :span="8">
        <h3>GroupSelect</h3>
        <Layout :name="'group_select'" id="group_select">
          <el-form-item class="mb-16" prop="groupSelect" :error="rulesMsg.groupSelect.errorText">
            <GroupSelect
              v-model="sendData.groupSelect"
              :title="'標題'"
              :placeholder="'請選擇類別'"
              :groupOptions="groupOptions"
              :style="{'width': widthSize + 'px'}"
              :size="size"
              :disabled="ComponentDisabled"
              :resetTrigger="defaultResetTrigger"
              :multiple="true"
              :rulesMsg="rulesMsg.groupSelect"
            ></GroupSelect>
          </el-form-item>
        </Layout>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import { ref, reactive, computed, nextTick, watch } from 'vue';
import Layout from "./Layout.vue";
import Controller from '@/components/controller.vue';
import Select from "@/components/select/select.vue";
import GroupSelect from "@/components/select/groupSelect.vue"

const isdisabled = ref(true);
const widthSize = ref(300);

//調整組件是否禁用
const ComponentDisabled = ref(false); 

//調整組件大小
const size = ref('');

// nogroupOptions
const options = reactive([
  { 
    value: "0",
    label: "不限定",
  },
  {
    value: "1",
    label: "選項1",
  },
  {
    value: "2",
    label: "選項2",
  },
  {
    value: "3",
    label: "選項3",
    disabled: true,
  },
  {
    value: "4",
    label: "選項4",
  },
  {
    value: "5",
    label: "選項5",
  },
  {
    value: "6",
    label: "選項6",
  },
  {
    value: "7",
    label: "選項7",
  },
  {
    value: "8",
    label: "選項8",
  },
  {
    value: "9",
    label: "選項9",
  },
  {
    value: "10",
    label: "選項10",
  },
]);

// groupOptions
const groupOptions = reactive([
  { 
    label: "分類一",
    options:[
      { 
        value: "0",
        label: "不限定",
      },
      {
        value: "1",
        label: "選項1",
      },
      {
        value: "2",
        label: "選項2",
      },
      {
        value: "3",
        label: "選項3",
        disabled: true,
      },
    ]
  },
  {
    label: "分類二",
    options:[
      { 
        value: "4",
        label: "不限定",
      },
      {
        value: "5",
        label: "選項A",
        disabled: true,
      },
      {
        value: "6",
        label: "選項B",
      },
      {
        value: "7",
        label: "選項C",
      },
    ]
  },
]);

const sendData = ref({
  noGroupSelect:'',
  multipleSelect:[],
  groupSelect:''
});

//驗證Form名稱
const selectRef = ref(null);
const rulesObject = JSON.stringify({
    noGroupSelect:{
        helperText:'若需使用提示訊息時使用(灰)',
        successText:'若需顯示成功訊息時使用(綠)',
        warnningText:'若需顯示警示訊息時使用(黃)',
        // errorText:'若需顯示後端回傳錯誤訊息時使用(紅) 不顯示時errorText須為空值',
        validate:'tips',
    },
    multipleSelect:{
        helperText:'若需使用提示訊息時使用(灰)',
        successText:'若需顯示成功訊息時使用(綠)',
        warnningText:'若需顯示警示訊息時使用(黃)',
        // errorText:'若需顯示後端回傳錯誤訊息時使用(紅) 不顯示時errorText須為空值',
        validate:'tips',
    },
    groupSelect:{
        helperText:'若需使用提示訊息時使用(灰)',
        successText:'若需顯示成功訊息時使用(綠)',
        warnningText:'若需顯示警示訊息時使用(黃)',
        // errorText:'若需顯示後端回傳錯誤訊息時使用(紅) 不顯示時errorText須為空值',
        validate:'tips',
    }
});

const rulesMsg = ref(JSON.parse(rulesObject));

//驗證規則
const rules = ref({
  noGroupSelect:[
    { required: true, message:'單選選單為必填', trigger: ['change'],},
  ],
  multipleSelect:[
    { required: true, message:'多選選單為必填', trigger: ['change'],},
  ],
  groupSelect:[
    { required: true, message:'群組選單為必填', trigger: ['change'],},
  ]
});

//前端送出前執行驗證
const validateBeforeSubmit = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
      if (valid) {
          console.log('submit!');
          rulesMsg.value.noGroupSelect.successText = 'success !!';
          rulesMsg.value.noGroupSelect.validate = 'success';
      } else {
          console.log('error submit!', fields);
          return false;
      }
  })
}

//重設
let defaultResetTrigger = ref(0);
const reset = () => {
  defaultResetTrigger.value ++;
  rulesMsg.value = JSON.parse(rulesObject);
  setTimeout(() => {
    Object.keys(rulesMsg.value).forEach(item =>  selectRef.value.clearValidate(item));
  }, 0);
}

</script>


<style lang="scss" scoped>
  :deep(.el-select__popper.el-popper){
    &:has(.is-multiple){
      inset: 48px auto auto 0px !important;
    }
  }
</style>