<template>
    <Controller v-model="size" v-model:disabled="ComponentDisabled" />
    
    <el-row :gutter="20">
        <el-col :span="4">
            <h3>Primary</h3>
            <!--========== PrimaryCircle ==========-->
            <Layout :name="'icon_button_primary'" id="icon_button_primary">
                <PrimaryCircle
                    @click="clickBtn"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                    <template #icon>
                        <Icon>
                            <ExitToAppRound />
                        </Icon>
                    </template>
                </PrimaryCircle>
            </Layout>
        </el-col>
        <el-col :span="4">
            <h3>Outline</h3>
            <!--========== OutlineCircle ==========-->
            <Layout :name="'icon_button_outline'" id="icon_button_outline">
                <OutlineCircle
                    @click="clickBtn"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                    <template #icon>
                        <Icon>
                            <ExitToAppRound />
                        </Icon>
                    </template>
                </OutlineCircle>
            </Layout>
        </el-col>
        <el-col :span="4">
            <h3>Link</h3>
            <!--========== LinkCircle ==========-->
            <Layout :name="'icon_button_link'" id="icon_button_link">
                <LinkCircle
                    @click="clickBtn"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                    <template #icon>
                        <Icon>
                            <ExitToAppRound />
                        </Icon>
                    </template>
                </LinkCircle>
            </Layout>
        </el-col>
        <el-col :span="4">
            <h3>Plain</h3>
            <!--========== PlainCircle ==========-->
            <Layout :name="'icon_button_plain'" id="icon_button_plain">
                <PlainCircle
                    @click="clickBtn"
                    :buttonSize="size"
                    :disabled="ComponentDisabled"
                >
                    <template #icon>
                        <Icon>
                            <ExitToAppRound />
                        </Icon>
                    </template>
                </PlainCircle>
            </Layout>
        </el-col>
       
    </el-row>
</template>

<script setup>
    import {ref, reactive } from 'vue';
    import Layout from "./Layout.vue";
    import { ExitToAppRound } from '@vicons/material'
    import { Icon } from '@vicons/utils'
    import Controller from './controller.vue';
    import primaryCircle from "./button/primaryCircle.vue";
    import PlainCircle from "./button/plainCircle.vue";
    import OutlineCircle from "./button/outlineCircle.vue";
    import LinkCircle from "./button/linkCircle.vue";

    //調整組件大小
    const size = ref('');

    //調整組件是否禁用
    const ComponentDisabled = ref(false); 

    const clickBtn = () => {
        // alert('點擊按鈕');
    }
</script>