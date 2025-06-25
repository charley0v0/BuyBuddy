<template>
    <el-row :gutter="20">
        <el-col :md="12" :sm="16" :xs="24" style="margin-bottom: 20px;">
            <Layout :name="'carousel'" id="carousel">
                <Carousel
                    :previewImage="previewImage"
                    :arrowStatus="arrowStatus"
                    :interval="Number(interval)"
                    :type="type"
                    :autoPlay="autoPlay"
                    :pauseOnHover="pauseOnHover"
                    :height="height"
                    :trigger="trigger"
                    :indicatorPosition="indicatorPosition"
                    :loop="loop"
                    :image="image"
                />
            </Layout>

            <CarouselCard
                :arrowStatus="arrowStatus"
                :interval="Number(interval)"
                :type="type"
                :autoPlay="autoPlay"
                :items = items
                :loop="loop"
                :sliceCount = 'sliceCount'
            >
            </CarouselCard>

        </el-col>
        <el-col :md="12" :sm="16" :xs="24" style="margin-bottom: 20px;">
            <Setting 
                v-model:previewImage="previewImage"
                v-model:arrowStatus="arrowStatus"
                v-model:interval="interval"
                v-model:autoPlay="autoPlay"
                v-model:indicatorPosition="indicatorPosition"
                v-model:pauseOnHover="pauseOnHover"
                v-model:trigger="trigger"
                v-model:type="type"
                v-model:height="height"
                v-model:loop="loop"
                v-model:image="image"
            />
        </el-col>
    </el-row>
</template>

<script setup>
    import { ref } from 'vue'
    import Setting from './carouselSetting.vue';
    import Carousel from '../components/carousel/carousels.vue';
    import CarouselCard from '../components/carousel_Card/carousels_Card.vue';
    
    const previewImage = ref(true);
    const arrowStatus = ref('always');
    const interval = ref(1500);
    const autoPlay = ref(true);
    const indicatorPosition = ref('');
    const pauseOnHover = ref(true);
    const trigger= ref('click');
    const type = ref('');
    const height = ref('400px');
    const loop = ref(true);
    const image = ref([
        '/image/carousel1.jpg',
        '/image/carousel2.jpg',
        '/image/carousel3.jpg',
        '/image/carousel4.jpg',
        '/image/carousel5.jpg',
        '/image/carousel6.jpg',
    ]);

    const sliceCount = ref(2)
    const items = ref( 
        [ 
            { title: "Title 1", subtitle: "subTitle 1", description: "Content of slide 1" },
            { title: "Title 2", subtitle: "subTitle 2", description: "Content of slide 2" }, 
            { title: "Title 3", subtitle: "subTitle 3", description: "Content of slide 3" }, 
            { title: "Title 4", subtitle: "subTitle 4", description: "Content of slide 4" }, 
        ]
    )

</script>