<template> 
    <div> 
        <!-- Carousel --> 
        <el-carousel :interval="interval" :autoplay="autoPlay" :arrow="arrowStatus" :loop="loop" indicator-position="none"> 
            <el-carousel-item v-for="(itemChunk, index) in chunkedItems" :key="index"> 
                <div class="carousel-slide"> 
                    <slot name='carousel-content' v-for="(item, i) in itemChunk" :item="item" :index="i" :key="i">
                        <!-- 預設內容 -->
                        <div class="carousel-item mx-12"> 
                            <h3>{{ item.title }}</h3> 
                            <p>{{ item.description }}</p> 
                        </div> 
                    </slot>
                </div> 
            </el-carousel-item> 
        </el-carousel> 
    </div> 
</template>




<script name="Carousel_Card" setup>
    import { ref , computed  } from 'vue';

    const props = defineProps({
        arrowStatus:{
            type: String,
            default: 'always'
        },
        interval:{
            type: Number,
            default: 3000
        },
        type:{
            type: String,
            default: ''
        },
        autoPlay:{
            type: Boolean,
            default: true
        },
        loop:{
            type: Boolean,
            default: true
        },
        items:{
            type: Array,
            default: () => []
        },
        sliceCount:{
            type: Number,
            default: 2
        }
    })

    const chunkedItems = computed (()=>{
        if (!props.items || props.items.length === 0) {
            return [];
        }
        const chunkSize = props.sliceCount || 2; 
        const result = []; 
        for (let i = 0; i < props.items.length; i += chunkSize) { 
            result.push(props.items.slice(i, i + chunkSize)); 
        } 
        return result;
    })

</script>


<style scoped lang="scss"> 
    .mx-12{
        margin-left: 12px;
        margin-right: 12px;
    }

    /* 控制 Carousel Slide 样式 */ 
    .carousel-slide { 
        display: flex; 
        justify-content: space-around;
        align-items: center; 
        height: 100%;
    } 
    .carousel-item { 
        width: 45%; 
        background: #F5F9FF; 
        padding: 20px; 
        text-align: center; 
        border-radius: 10px; 
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
    } 
    .carousel-item h3 { 
        margin: 10px 0; 
        font-size: 18px; 
    } 
    .carousel-item p { 
        color: red; 
        font-size: 14px; 
    } 
</style>