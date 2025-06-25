<template>    
    <el-row :gutter="20">
        <!--========== Description ==========-->
        <el-col :span="12">
            <h3>Description</h3>
            <Layout :name="'description_success'" id="description_success">
                <DescriptionAlert :title="alertMsg" :alertType="'success'" :alertDescription="'這裡顯示描述'"></DescriptionAlert>
            </Layout>
            <Layout :name="'description_info'" id="description_info">
                <DescriptionAlert :title="alertMsg" :alertType="'info'" :alertDescription="'這裡顯示描述'"></DescriptionAlert>
            </Layout>
            <Layout :name="'description_warning'" id="description_warning">
               <DescriptionAlert :title="alertMsg" :alertType="'warning'" :alertDescription="'這裡顯示描述'"></DescriptionAlert>
            </Layout>
            <Layout :name="'description_error'" id="description_error">
               <DescriptionAlert :title="alertMsg" :alertType="'error'" :alertDescription="'這裡顯示描述'"></DescriptionAlert>
            </Layout>
            <Layout :name="'description_infogrey'" id="description_infogrey">
                <DescriptionAlert :title="alertMsg" :alertType="'info'" :alertDescription="'這裡顯示描述'" :infogrey ="true" :fullWidth="true"></DescriptionAlert>
            </Layout>
        </el-col>
        <!--========== No Description ==========-->
        <el-col :span="12">
            <h3>No Description</h3>
            <Layout :name="'no_description_success'" id="no_description_success">
                <NoDescriptionAlert :title="alertMsg" :alertType="'success'"></NoDescriptionAlert>
            </Layout>
            <Layout :name="'no_description_info'" id="no_description_info">
                <NoDescriptionAlert :title="alertMsg" :alertType="'info'"></NoDescriptionAlert>
            </Layout>
            <Layout :name="'no_description_warning'" id="no_description_warning">
                <NoDescriptionAlert :title="alertMsg" :alertType="'warning'"></NoDescriptionAlert>
            </Layout>
            <Layout :name="'no_description_error'" id="no_description_error">
                <NoDescriptionAlert :title="alertMsg" :alertType="'error'"></NoDescriptionAlert>
            </Layout>
            <Layout :name="'no_description_infogrey'" id="no_description_infogrey">
                <NoDescriptionAlert :title="alertMsg" :alertType="'info'" :infogrey ="true" :fullWidth="true"></NoDescriptionAlert>
            </Layout>
        </el-col>


        <!-- Message -->
        <el-col :span="24">
            <h3>Message</h3>
            <Layout :name="'message'" id="message">
                <el-row>
                    <el-col :span="4">
                        <PrimaryButton
                            :title="'Success'"
                            @click="showMessage('success','顯示成功訊息')"
                        ></PrimaryButton>
                    </el-col>
                    <el-col :span="4">
                        <PrimaryButton
                            :title="'Warning'"
                            @click="showMessage('warning','顯示警示訊息')"
                        ></PrimaryButton>
                    </el-col>
                    <el-col :span="4">
                        <PrimaryButton
                            :title="'Info'"
                            @click="showMessage('info','顯示提示訊息')"
                        ></PrimaryButton>
                    </el-col>
                    <el-col :span="4">
                        <PrimaryButton
                            :title="'Error'"
                            @click="showMessage('error','顯示錯誤訊息')"
                        ></PrimaryButton>
                    </el-col>
                </el-row>
            </Layout>
        </el-col>
        <!-- Notification -->
        <el-col :span="24">
            <div class="d-flex align-center justify-between">
                <h3>Notification</h3>
                <OutlineButton :title="'關閉所有Notification通知'" :size="'small'" @click="closeNotification++"></OutlineButton>
            </div>
            <Layout :name="'notification'" id="notification">
                <el-row>
                    <el-col :span="4">
                        <PrimaryButton
                            :title="'Success'"
                            @click="successIcon++"
                        ></PrimaryButton>
                        <Notification
                            :title="'補件修改內容已送審'"
                            :message="'資料送出後將由藍新金流管理者進行審核，約3~5 個工作天，審核後將寄發通知信至會員業務聯絡人信箱'"
                            :type="'success'"
                            :trigger="successIcon"
                        >
                        </Notification>
                    </el-col>
                    <el-col :span="4">
                        <PrimaryButton
                            :title="'Warning'"
                            @click="warningIcon++"
                        ></PrimaryButton>
                        <Notification
                            :title="'補件修改內容已送審'"
                            :message="'資料送出後將由藍新金流管理者進行審核，約3~5 個工作天，審核後將寄發通知信至會員業務聯絡人信箱'"
                            :type="'warning'"
                            :trigger="warningIcon"
                            :triggerClose="closeNotification"
                        >
                        </Notification>
                    </el-col>
                    <el-col :span="4">
                        <PrimaryButton
                            :title="'Info'"
                            @click="infoIcon++"
                        ></PrimaryButton>
                        <Notification
                            :title="'補件修改內容已送審'"
                            :message="'資料送出後將由藍新金流管理者進行審核，約3~5 個工作天，審核後將寄發通知信至會員業務聯絡人信箱'"
                            :type="'info'"
                            :trigger="infoIcon"
                            :triggerClose="closeNotification"
                        >
                        </Notification>
                    </el-col>
                    <el-col :span="4">
                        <PrimaryButton
                            :title="'Error'"
                            @click="errorIcon++"
                        ></PrimaryButton>
                        <Notification
                            :title="'補件修改內容已送審'"
                            :message="'資料送出後將由藍新金流管理者進行審核，約3~5 個工作天，審核後將寄發通知信至會員業務聯絡人信箱'"
                            :type="'error'"
                            :trigger="errorIcon"
                            :triggerClose="closeNotification"
                        >
                        </Notification>
                    </el-col>
                    <el-col :span="4">
                        <PrimaryButton
                            :title="'無Icon'"
                            @click="noIcon++"
                        ></PrimaryButton>
                        <Notification
                            :title="'補件修改內容已送審'"
                            :message="'資料送出後將由藍新金流管理者進行審核，約3~5 個工作天，審核後將寄發通知信至會員業務聯絡人信箱'"
                            :type="''"
                            :trigger="noIcon"
                            :triggerClose="closeNotification"
                        >
                        </Notification>
                    </el-col>
                </el-row>
            </Layout>
        </el-col>

    </el-row>
</template>

<script setup>
    import {ref, reactive } from 'vue';
    import Layout from "./Layout.vue";
    import DescriptionAlert from '@/components/alert/descriptionAlert.vue';
    import NoDescriptionAlert from '@/components/alert/noDescriptionAlert.vue';
    import Notification from '@/components/alert/notification.vue';
    import PrimaryButton from "@/components/button/primaryText.vue";
    import OutlineButton from '@/components/button/outlineText.vue';

    const alertMsg = '這裡顯示訊息';

    const noIcon = ref(0);

    const successIcon = ref(0);

    const warningIcon = ref(0);

    const infoIcon = ref(0);

    const errorIcon = ref(0);

    const closeNotification = ref(0);

    import { ElMessage } from 'element-plus'
    const showMessage = (Type,Msg) => {
        ElMessage({
            message:Msg,
            type:Type,
            duration:4500,
            showClose: true
        })
    }

</script>