<template>
    <el-row justify="end">
        <el-col>
            <Layout :name="'scrollspy'" id="scrollspy">
                <Scrollspy :propData="data" :scrollHeight="scrollHeight" :maxscrollHeight="maxscrollHeight" :title="'title'" :subtitle="'subtitle'" :tagInfo="tagInfo">

                    <template v-slot:customTitle></template>

                    <template v-slot:a>
                        <Steps />
                    </template>

                    <template v-slot:b>
                        <Input />
                    </template>

                    <template v-slot:c>
                        <Carousel />
                    </template>
                </Scrollspy>
            </Layout>
        </el-col>
    </el-row>
</template>


<script setup>
    import {ref, reactive } from 'vue';
    import Scrollspy from '@/components/scrollspy/scrollspy.vue';

    import Steps from './steps.vue';
    import Input from './Input.vue';
    import Carousel from './carouselSection.vue';

    const scrollHeight = '80vh'
    const maxscrollHeight = ''

    const data = reactive([
        {
            title:'Steps',
            slotNmame:'a',
        },
        {   
            title:'Input',
            slotNmame:'b',
        },
        {
            title:'Carousel',
            slotNmame:'c',
        }
    ])

    const tagInfo = ref({
        tagStatus:'danger',
        tagText:'tag文字'
    })

</script>

<style>
    .mr-10{
        margin-right:10px;
    }
</style>
