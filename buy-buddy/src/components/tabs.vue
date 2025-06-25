<template>
    <el-row :gutter="20">
        <!--======== Default =========-->
        <el-col :span="8">
            <h3>Default</h3>
            <Layout :name="'default_tab'" id="default_tab">
                <TabGroup 
                    v-model="nowTab"
                    :tabGroups="tabArray"
                    :tabType="'default'"
                ></TabGroup>
            </Layout>
        </el-col>
        <!--======== Underline =======-->
        <el-col :span="8">
            <h3>Underline</h3>
            <Layout :name="'underline_tab'" id="underline_tab">
                <TabGroup 
                    v-model="nowTab"
                    :tabGroups="tabArray"
                    :tabType="'underline'"
                ></TabGroup>
            </Layout>
        </el-col>
        <!--========== Bare ==========-->
        <el-col :span="8">
            <h3>Bare</h3>
            <Layout :name="'bare_tab'" id="bare_tab">
                <TabGroup 
                    v-model="nowTab"
                    :tabGroups="tabArray"
                    :tabType="'bare'"
                ></TabGroup>
            </Layout>
        </el-col>
    </el-row>
</template>


<script setup>
    import { ref, shallowRef } from 'vue';
    import TabGroup from '@/components/tabs/tabGroup.vue';

    import { AcUnitRound } from '@vicons/material';
    import { WbSunnyOutlined } from '@vicons/material';

    const nowTab = 'Tab2';
    const tabArray = shallowRef([
        {
            title:'Tab One',
            value:'Tab1',
            // icon:AcUnitRound,
        },
        {
            title:'Tab Two',
            value:'Tab2',
            // icon:WbSunnyOutlined,
        },
        {
            title:'Tab Three',
            value:'Tab3',
            disabled:true
        },
    ]);

</script>
