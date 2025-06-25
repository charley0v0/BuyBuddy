<template>
    <el-row :gutter="20">
        <!--========== Nomal ==========-->
        <el-col :span="8">
            <h3>Normal</h3>
            <Layout :name="'normal_modal'" id="normal_modal">
                <!-- button -->
                <el-button type="primary" @click="controlNormalDialog = true">
                    Click
                </el-button>
                <!-- dialog -->
                <NormalModal
                    :title="title"
                    v-model="controlNormalDialog"
                >
                    <template v-slot:default>
                        <div>content</div>
                    </template>
                </NormalModal>
            </Layout>
        </el-col>
        <!--========== Customized Content ==========-->
        <el-col :span="8">
            <h3>Customized Content</h3>
            <Layout :name="'customized_modal'" id="customized_modal">
                <!-- button -->
                <el-button @click="controlDialog = true">
                    Click
                </el-button>
                <!-- dialog -->
                <CustomizedModal v-model="controlDialog" @getInnerWidth="getInnerWidth"  :size="'large'">
                    <template v-slot:header>
                        <div class="header_title">Customized Modal</div>
                    </template>
                    <template v-slot:default>
                        <el-form 
                        :model="form"
                        :label-position="'top'"
                        >
                        <el-form-item label="Name" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="Zone" :label-width="formLabelWidth">
                            <el-select v-model="form.region" placeholder="Please select a zone">
                            <el-option label="Zone No.1" value="shanghai" />
                            <el-option label="Zone No.2" value="beijing" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Zone" :label-width="formLabelWidth">
                            <el-select v-model="form.region" placeholder="Please select a zone">
                            <el-option label="Zone No.1" value="shanghai" />
                            <el-option label="Zone No.2" value="beijing" />
                            </el-select>
                        </el-form-item><el-form-item label="Zone" :label-width="formLabelWidth">
                            <el-select v-model="form.region" placeholder="Please select a zone">
                            <el-option label="Zone No.1" value="shanghai" />
                            <el-option label="Zone No.2" value="beijing" />
                            </el-select>
                        </el-form-item><el-form-item label="Zone" :label-width="formLabelWidth">
                            <el-select v-model="form.region" placeholder="Please select a zone">
                            <el-option label="Zone No.1" value="shanghai" />
                            <el-option label="Zone No.2" value="beijing" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Zone" :label-width="formLabelWidth">
                            <el-select v-model="form.region" placeholder="Please select a zone">
                            <el-option label="Zone No.1" value="shanghai" />
                            <el-option label="Zone No.2" value="beijing" />
                            </el-select>
                        </el-form-item>
                        </el-form>
                    </template>
                    <template v-slot:footer>
                        <span class="dialog-footer">
                            <OutlineButton
                                @click="controlDialog = false"
                                :title="'取消'"
                                :buttonSize="getWidth > 768 ? 'default' : 'large'"
                            ></OutlineButton>
                            <PrimaryButton
                                @click="controlDialog = false"
                                :title="'確定'"
                                :buttonSize="getWidth > 768 ? 'default' : 'large'"
                            ></PrimaryButton>
                        </span>
                    </template>
                </CustomizedModal>
            </Layout>
        </el-col>
        <!--========== full screen modal ==========-->
        <el-col :span="8">
            <h3>Full Screen Modal</h3>
            <Layout :name="'full_screen_modal'" id="full_screen_modal">
                <el-button type="primary" @click="controlFullScreenDialog = true">
                    Click
                </el-button>
                <FullScreenModal
                    :controlFullScreenDialog="controlFullScreenDialog"
                    :title="'會員身分驗證'"
                    :data="data"
                    @closeHandler="closeFullScreenDialog">
                    <template v-slot:fullScreenModalBody="{data}">
                        <!--  data 為使用template接收資料範例 -->
                        <div v-for="(item, i) in data" :key="i">{{ item.name }}</div>
                    </template>
                </FullScreenModal>
            </Layout>
        </el-col>

    </el-row>
</template>

<script setup>
import { reactive, ref, watchEffect } from 'vue';
import NormalModal from '@/components/modal/normalModal.vue';
import CustomizedModal from '@/components/modal/customizedModal.vue';
import FullScreenModal from '@/components/modal/fullScreenModal.vue'
import PrimaryButton from "@/components/button/primaryText.vue";
import OutlineButton from "@/components/button/outlineText.vue";
import Layout from "./Layout.vue";

const title = ref('Normal Modal');
const controlDialog = ref(false);
const controlNormalDialog = ref(false);
const controlFullScreenDialog = ref(false);


// demo form
const formLabelWidth = '140px';

const form = reactive({
    name: '',
    region: '',
})

const getWidth = ref(window.innerWidth);
const getInnerWidth = (val) =>{
    getWidth.value = val;
}

const closeFullScreenDialog = ()=>{
    controlFullScreenDialog.value = false;
}

const data = ref([
    {name: 'Taiwan',
    bg:'black'
    },
    {name: 'English',
    bg:'pink'
    },
    {name: 'Taiwan',
    bg:'black'
    },
    {name: 'English',
    bg:'pink'
    },
    {name: 'Taiwan',
    bg:'black'
    },
    {name: 'English',
    bg:'pink'}
])

</script>

<style lang="scss" scoped>
.header_title{
    font-size: 18px;
    font-weight: bold;
}

</style>