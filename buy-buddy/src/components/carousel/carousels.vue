 <template>
    <el-row>
        <el-col>
            <div class="block text-center" m="t-4">
                <el-carousel 
                :trigger="trigger"
                :interval="interval" 
                ref="carousel" 
                :arrow="arrowStatus" 
                :type="type" 
                :autoplay="autoPlay"
                :pause-on-hover="pauseOnHover"
                :indicator-position="indicatorPosition"
                :height="height"
                :loop="loop"
                :image="image"
                >
                
                <el-carousel-item v-for="(item) in image" :key="item">
                    <img class="carousel-item" :src="item"/>
                </el-carousel-item>
                </el-carousel>
                <div class="list-inline" v-if="previewImage">
                    <div 
                        class="list-inline__item" 
                        v-for="(item,index) in image" :key="index"
                        :class="{'active': image_active == index }" 
                        :style="`width:calc(100% / ${image.length})`"
                       >
                        <img
                            class="list-image"
                            :src="item"
                            @click="getActiveItem(index)"
                            />
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script name="Carousel" setup>
    import { ref } from 'vue';
    const carousel = ref();
    const image_active = ref(false);
    
    const props = defineProps({
        previewImage:Boolean,
        arrowStatus:String,
        interval:Number,
        type:String,
        autoPlay:Boolean,
        pauseOnHover:Boolean,
        height:String,
        trigger:String,
        indicatorPosition:String,
        data:Array,
        loop:Boolean,
        image:Array
    })

    // 預覽圖片按鈕
    const getActiveItem = (index) => {
        carousel.value?.setActiveItem(index);
        image_active.value = index;
    }
</script>


<style scoped lang="scss">
.demonstration {
color: var(--el-text-color-secondary);
}

:deep(.el-carousel__item){
    border-radius: 6px;
    .carousel-item {
        width: 100%;
        height: auto;
        // object-fit: cover;
        border-radius: 6px;
    }
}

:deep(.el-carousel){
    border-radius: 6px;
}

// preview image list
.list-inline{
    display: flex;
    list-style-type: none;
    &__item{
        margin: 10px 3px 0 0;
        cursor: pointer;
        border-radius: 4px;
        &.active{
            border: 2px solid #60A5FA;
            padding: 1px;
        }
        .list-image{
            max-width:100%;
            height: auto;
            border-radius:6px;
        }
    }
}
</style>