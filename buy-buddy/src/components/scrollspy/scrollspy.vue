<template>
    <div class="d-flex">
        <div class="w-176 p-fixed">
            <div v-for="(item,index ) in propData" 
                :key="index" 
                class="ft-14 ls-56 step-item"
                :class="index == activeIndex ? 'boder-left-active':'boder-left'"
                @click="scrollTop(index)"
            >
                <span class="cursor-pointer" :class="activeIndex == index ? 'text-blue':'text-disabled'">
                    {{item.title}}
                </span>
            </div>
        </div>
        <div class="right_content">
            <div :class="{'border-radius shadow bg-white':!custom}">
                <slot name="customTitle">
                    <div v-if="title && subtitle && tagInfo" class="mb-24">
                        <div class="mb-8 d-flex align-center">
                            <h4 class="mr-8">{{title}}</h4>
                            <SecondaryTag
                                :title="tagInfo.tagText"
                                :tagType="tagInfo.tagStatus"
                            ></SecondaryTag>
                        </div>
                        <div class="p2">{{subtitle}}</div>
                    </div>
    
                    <div v-else-if="title && subtitle" class="mb-24">
                        <h4 class=" mb-8 mr-8">{{title}}</h4>
                        <div class="p2">{{subtitle}}</div>
                    </div>
    
                    <div v-else-if="title && tagInfo" class="d-flex align-center mb-24">
                        <h4 class="mr-8">
                            {{title}}
                        </h4>
                        <SecondaryTag
                            :title="tagInfo.tagText"
                            :tagType="tagInfo.tagStatus"
                        ></SecondaryTag>
                    </div>
    
                    <h4 v-else-if="title" class="mb-24">{{title}}</h4>
                </slot>

                <el-scrollbar ref="scrollbarRef" :height='scrollHeight' :max-height='maxscrollHeight' :min-size="0" @scroll="updateScroll">
                    <slot name="titleContent"></slot>
                    <div v-for="(item,index) in propData" :key="index" ref="contentRefs" :class="custom? 'content-margin':'content-padding'">
                        <div class="scrollContent" :id="item.slotName">
                            <slot :name='item.slotName'></slot>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, onUpdated } from "vue";
import SecondaryTag from "@/components/tags/secondaryTag.vue";


const props = defineProps({
    title:{
        type:String,
        default:''
    },
    subtitle:{
        type:String,
        default:''
    },
    tagInfo:{
        type:Object,
    },
    propData:Array,
    index:{
        type:Number,
        default:0
    },
    scrollHeight:{
        type:String,
        default:''
    },
    maxscrollHeight:{
        type:String,
        default:''
    },
    custom:{
        type:Boolean,
        default:false
    },
    resetTrigger:{
        type:Number,
        default:0
    }
})

const scrollbarRef = ref(null);
const contentRefs = ref([]); // 儲存每個.content的ref
const contentScrollTop = ref([]); //儲存每個.content的scrollTop
const activeIndex = ref(0);

const logOffsets = () => {
  if (!scrollbarRef.value) return;
    contentScrollTop.value = [];
    
    contentRefs.value.forEach((el, index) => {
        if (el) {
            const scrollbarWrap = scrollbarRef.value.wrapRef;
            const offsetTop = el.offsetTop - scrollbarWrap.offsetTop;
            contentScrollTop.value.push(offsetTop);
        }
    });
};

const updateScroll = async () => {
    await logOffsets();
    if (!scrollbarRef.value) return;
    const scrollbarWrap = scrollbarRef.value.wrapRef;
    const scrollTop = scrollbarWrap.scrollTop;
    const scrollHeight = scrollbarWrap.scrollHeight;
    const clientHeight = scrollbarWrap.clientHeight;

    //滑到底不時固定顯示最後一個index
    if (scrollTop + clientHeight >= scrollHeight - 1) { 
        activeIndex.value = contentScrollTop.value.length - 1;
        return;
    }

    activeIndex.value = contentScrollTop.value.reduce((acc, offset, index) => {
        return scrollTop >= offset ? index : acc;
    }, 0);
}

const emit = defineEmits(['toTargetItem']);
const scrollTop = async (idx) => {
    if (!scrollbarRef.value || !contentRefs.value[idx]) return;
    emit('toTargetItem',idx);
    await logOffsets();
    const targetOffsetTop = contentScrollTop.value[idx];
    const scrollbarWrap = scrollbarRef.value.wrapRef;
    
    scrollbarWrap.scrollTo({
        top: targetOffsetTop + 1,
        behavior: "smooth" // 讓滾動有平滑效果
    });
    activeIndex.value = idx;
}

watch(()=>props.resetTrigger, async ()=>{
    await logOffsets();
    updateCount.value = 0;
})

const updateCount = ref(0);
onUpdated(()=>{
    nextTick(()=>{
        if(!updateCount.value){
            logOffsets();
            const targetOffsetTop = contentScrollTop.value[props.index];
            scrollbarRef.value.setScrollTop(targetOffsetTop+2);
            updateCount.value++
        }
    })  
})

document.addEventListener("scroll", () => {
    document.documentElement.style.setProperty("--scroll-x", `-${window.scrollX}px`);
});
</script>

<style lang="scss" scoped>
.cursor-pointer{
    cursor: pointer;
}
.boder-left{
    border-left: 2px solid $grey-400;
}
.boder-left-active{
    border-left: 2px solid $blue-600;

    .text-blue{
        color:$blue-600;
    }
}
.p-5{
    padding: 5px;
}
.bg-white{
    background-color:#FFFFFF;
}

.content-margin{
    margin-bottom:48px;
}

.content-padding{
    padding: 40px 24px 40px 24px;
}
.border-radius{
    border-radius: 6px;
}
.shadow{
    box-shadow: 0px 8px 20px 0px rgba(0,0,0,0.04);
}

.ls-56{
    letter-spacing:0.56px;
}

.step-item{
    padding:8px 16px;
}

.w-176{
    width:176px;
    transform: translateX(var(--scroll-x))
}

.right_content{
    width:calc(100% - 176px);
    padding-left:64px;
    box-sizing:border-box;
    position: relative;
    left:176px;
}

.p-fixed{
    position: fixed;
}
</style>
