<template>
    <Controller v-model="size" v-model:disabled="ComponentDisabled" />

    <el-row :gutter="20">
        <el-col :span="4">
            <h3>Primary</h3>
            <!--========== Primary ==========-->
            <Layout :name="'text_button_primary'" id="text_button_primary">
                <PrimaryButton
                    @click="clickBtn"
                    :title="'Button'"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                ></PrimaryButton>
            </Layout>
            <!--====== Primary (右icon) =====-->
            <Layout :name="'text_button_primary_right_icon'" id="text_button_primary_right_icon">
                <PrimaryButton
                    @click="clickBtn"
                    :title="'Button'"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                    <template #right>
                        <Icon>
                            <AddOutlined />
                        </Icon>
                    </template>
                </PrimaryButton>
            </Layout>
            <!--===== Primary (左icon) ======-->
            <Layout :name="'text_button_primary_left_icon'" id="text_button_primary_left_icon">
                <PrimaryButton
                    @click="clickBtn"
                    :title="'Button'"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                    <template #left>
                        <Icon>
                            <AddOutlined />
                        </Icon>
                    </template>
                </PrimaryButton>
            </Layout>
        </el-col>
        <el-col :span="4">
            <h3>Secondary</h3>
            <!--======= Secondary =========-->
            <Layout :name="'text_button_Secondary'" id="text_button_Secondary">
                <SecondaryButton
                    @click="clickBtn"
                    :title="'Button'"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                ></SecondaryButton>
            </Layout>
            <!--===== Secondary (右icon) =====-->
            <Layout :name="'text_button_Secondary_right_icon'" id="text_button_Secondary_right_icon">
                <SecondaryButton
                    @click="clickBtn"
                    :title="'Button'"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                    <template #right>
                        <Icon>
                            <AddOutlined />
                        </Icon>
                    </template>
                </SecondaryButton>
            </Layout>
            <!--===== Secondary (左icon) ======-->
            <Layout :name="'text_button_Secondary_left_icon'" id="text_button_Secondary_left_icon">
                <SecondaryButton
                    @click="clickBtn"
                    :title="'Button'"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                    <template #left>
                        <Icon>
                            <AddOutlined />
                        </Icon>
                    </template>
                </SecondaryButton>
            </Layout>
        </el-col>
        <el-col :span="4">
            <h3>Outline</h3>
            <!--======= Outline =========-->
            <Layout :name="'text_button_outline'" id="text_button_outline">
                <OutlineButton
                    @click="clickBtn"
                    :title="'Button'"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                ></OutlineButton>
            </Layout>
            <!--===== Outline (右icon) =====-->
            <Layout :name="'text_button_outline_right_icon'" id="text_button_outline_right_icon">
                <OutlineButton
                    @click="clickBtn"
                    :title="'Button'"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                    <template #right>
                        <Icon>
                            <AddOutlined />
                        </Icon>
                    </template>
                </OutlineButton>
            </Layout>
            <!--===== Outline (左icon) ======-->
            <Layout :name="'text_button_outline_left_icon'" id="text_button_outline_left_icon">
                <OutlineButton
                    @click="clickBtn"
                    :title="'Button'"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                    <template #left>
                        <Icon>
                            <AddOutlined />
                        </Icon>
                    </template>
                </OutlineButton>
            </Layout>
        </el-col>
        <el-col :span="4">
            <h3>Plain</h3>
            <!--===== Plain ======-->
            <Layout :name="'text_button_plain'" id="text_button_plain">
                <PlainButton
                    @click="clickBtn"
                    :title="'Button'"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                </PlainButton>
            </Layout>
            <!--===== Plain (右icon) =====-->
            <Layout :name="'text_button_plain_right_icon'" id="text_button_plain_right_icon">
                <PlainButton
                    @click="clickBtn"
                    :title="'Button'"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                    <template #right>
                        <Icon>
                            <AddOutlined />
                        </Icon>
                    </template>
                </PlainButton>
            </Layout>
            <!--===== Plain (左icon) =====-->
            <Layout :name="'text_button_plain_left_icon'" id="text_button_plain_left_icon">
                <PlainButton
                    @click="clickBtn"
                    :title="'Button'"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                    <template #left>
                        <Icon>
                            <AddOutlined />
                        </Icon>
                    </template>
                </PlainButton>
            </Layout>
        </el-col>
        <el-col :span="4">
            <h3>link</h3>
            <!--===== link ======-->
            <Layout :name="'text_button_link'" id="text_button_link">
                <LinkButton
                    @click="clickBtn"
                    :title="'Button'"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                </LinkButton>
            </Layout>
            <!--===== link (右icon) ======-->
            <Layout :name="'text_button_link_right_icon'" id="text_button_link_right_icon">
                <LinkButton
                    @click="clickBtn"
                    :title="'Button'"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                    <template #right>
                        <Icon>
                            <AddOutlined />
                        </Icon>
                    </template>
                </LinkButton>
            </Layout>
            <!--===== link (左icon) ======-->
            <Layout :name="'text_button_link_left_icon'" id="text_button_link_left_icon">
                <LinkButton
                    @click="clickBtn"
                    :title="'Button'"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                    <template #left>
                        <Icon>
                            <AddOutlined />
                        </Icon> 
                    </template>
                </LinkButton>
            </Layout>
        </el-col>
      
    </el-row>
</template>

<script setup>
    import {ref, reactive } from 'vue';
    import Layout from "./Layout.vue";
    import Controller from './controller.vue';
    import { AddOutlined  } from '@vicons/material'
    import { Icon } from '@vicons/utils'
    import PrimaryButton from "@/components/button/primaryText.vue";
    import SecondaryButton from "@/components/button/secondaryText.vue";
    import OutlineButton from "@/components/button/outlineText.vue";
    import PlainButton from "@/components/button/plainText.vue";
    import LinkButton from "@/components/button/linkText.vue";

    const clickBtn = () => {
        alert('點擊按鈕');
    }

    //調整組件大小
    const size = ref('');

    //調整組件是否禁用
    const ComponentDisabled = ref(false); 
    
</script>