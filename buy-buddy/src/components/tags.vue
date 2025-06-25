<template>
    <Controller   v-model="size" :sizeControl="['large','default']" />
    <el-row :gutter="20">
        <!--========== Primary(藍) ==========-->
        <el-col :span="4">
            <h3>Primary</h3>
            <Layout :name="'tag_primary'" id="tag_primary">
                <el-tag class="mr-10" :size="size">Primary</el-tag>
            </Layout>

            <Layout :name="'secondaryTag_primary'" id="secondaryTag_primary">
                <SecondaryTag
                    :title="primaryValue"
                    :size="size"
                ></SecondaryTag>
            </Layout>
        </el-col>
        <!--========== Info(灰) ==========-->
        <el-col :span="4">
            <h3>Info</h3>
            <Layout :name="'tag_info'" id="tag_info">
                <el-tag class="mr-10" type="info" :size="size">Info</el-tag>
            </Layout>

            <Layout :name="'secondaryTag_info'" id="secondaryTag_info">
                <SecondaryTag
                    :title="infoValue"
                    :tagType="'info'"
                    :size="size"
                ></SecondaryTag>
            </Layout>
        </el-col>
        <!--========== Success(綠) ==========-->
        <el-col :span="4">
            <h3>Success</h3>
            <Layout :name="'tag_success'" id="tag_success">
                <el-tag class="mr-10" type="success" :size="size">Success</el-tag>
            </Layout>

            <Layout :name="'secondaryTag_success'" id="secondaryTag_success">
                <SecondaryTag
                    :title="successValue"
                    :tagType="'success'"
                    :size="size"
                ></SecondaryTag>
            </Layout>
        </el-col>
        <!--========== Warning(黃) ==========-->
        <el-col :span="4">
            <h3>Warning</h3>
            <Layout :name="'tag_warning'" id="tag_warning">
                <el-tag class="mr-10" type="warning" :size="size">Warning</el-tag>
            </Layout>

            <Layout :name="'secondaryTag_warning'" id="secondaryTag_warning">
                <SecondaryTag
                    :title="warningValue"
                    :tagType="'warning'"
                    :size="size"
                ></SecondaryTag>
            </Layout>
        </el-col>
        <!--========== Danger(紅) ==========-->
        <el-col :span="4">
            <h3>Danger</h3>
            <Layout :name="'tag_danger'" id="tag_danger">
                <el-tag class="mr-10" type="danger" :size="size">Danger</el-tag>
            </Layout>

            <Layout :name="'secondaryTag_danger'" id="secondaryTag_danger">
                <SecondaryTag
                    :title="dangerValue"
                    :tagType="'danger'"
                    :size="size"
                ></SecondaryTag>
            </Layout>
        </el-col>
    </el-row>
</template>

<script setup>
    import { ref } from 'vue';
    import SecondaryTag from "@/components/tags/secondaryTag.vue";

    const primaryValue = ref('primary');
    const infoValue = ref('info');
    const successValue = ref('success');
    const warningValue = ref('warning');
    const dangerValue = ref('danger');

    const transitions = ref(true);

    const size = ref('');
</script>

<style lang="scss" scoped>
    .mr-10{
        margin-right:10px;
    }
</style>