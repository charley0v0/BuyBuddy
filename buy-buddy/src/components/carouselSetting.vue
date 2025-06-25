<template>
<div>
    <el-row justify="end" class="my-12">
        <el-col :span="12" class="d-flex align-center justify-between">
            <DefaultInput
                v-model="height"
                :title="'高度(px)'"
                :placeholder="'...px'"
                :size="'small'"
            ></DefaultInput>
            <DefaultInput
                v-model="interval"
                :title="'播放速度(milliseconds)'"
                :placeholder="'請輸入速度'"
                :size="'small'"
            ></DefaultInput>
        </el-col>
    </el-row>
    <el-row justify="end" class="my-12">
        <el-col :span="7" class="d-flex align-center">
            <span>自動撥放：</span>
            <el-switch 
                v-model="autoPlay"
                size="large"
                active-text="自動"
                inactive-text="不自動"
                inline-prompt
                class="mx-12"
                style="--el-switch-on-color:#DC2626;--el-switch-off-color:#65A30D;"
            ></el-switch>
        </el-col>
        <el-col :span="5" class="d-flex align-center">
            <span>輪播型態：</span>
            <el-switch 
                v-model="type"
                size="large"
                active-text="一般"
                inactive-text="卡片"
                :active-value="''"
                :inactive-value="'card'"
                inline-prompt
                class="ml-12"
                style="--el-switch-on-color:#DC2626;--el-switch-off-color:#65A30D;"
            ></el-switch>
        </el-col>
    </el-row>
    <el-row justify="end" class="my-12">
        <el-col :span="7" class="d-flex align-center">
            <span>預覽圖片：</span>
            <el-switch 
                v-model="previewImage"
                size="large"
                active-text="顯示"
                inactive-text="隱藏"
                inline-prompt
                class="ml-12"
                style="--el-switch-on-color:#DC2626;--el-switch-off-color:#65A30D;"
            ></el-switch>
        </el-col>
        <el-col :span="5" class="d-flex align-center">
            <span>換圖按鈕：</span>
            <el-switch
                v-model="arrowStatus"
                size="large"
                active-text="固定"
                inactive-text="hover"
                :active-value="'always'"
                :inactive-value="'hover'"
                inline-prompt
                class="ml-12"
                style="--el-switch-on-color:#DC2626;--el-switch-off-color:#65A30D;"
            ></el-switch>
        </el-col>
    </el-row>
     <el-row justify="end" class="my-12">
        <el-col :span="7" class="d-flex align-center">
            <span>重複播放：</span>
            <el-switch 
                v-model="loop"
                size="large"
                active-text="開啟"
                inactive-text="關閉"
                inline-prompt
                class="ml-12"
                style="--el-switch-on-color:#DC2626;--el-switch-off-color:#65A30D;"
            ></el-switch>
        </el-col>
        <el-col :span="5" class="d-flex align-center">
            <span>聚焦暫停：</span>
            <el-switch 
                v-model="pauseOnHover"
                size="large"
                active-text="啟用"
                inactive-text="關閉"
                inline-prompt
                class="ml-12"
                style="--el-switch-on-color:#DC2626;--el-switch-off-color:#65A30D;"
            ></el-switch>
        </el-col>
    </el-row>
    <el-row justify="end" class="my-12">
        <el-col :span="12" class="flex items-center">
            <div class="my-2 radio_group text-sm">
                <div class="title">控制項位置：</div>
                <el-radio-group v-model="indicatorPosition" class="ml-4">
                    <el-radio value="">inside</el-radio>
                    <el-radio value="outside">outside</el-radio>
                    <el-radio value="none">none</el-radio>
                </el-radio-group>
            </div>
        </el-col>
    </el-row>
    <el-row justify="end" class="my-12">
        <el-col :span="12" class="flex items-center">
            <div>觸發控制項：</div>
            <el-switch 
                v-model="trigger"
                size="large"
                active-text="hover"
                inactive-text="click"
                active-value="hover"
                inactive-value="click"
                inline-prompt
                class="ml-12"
                style="--el-switch-on-color:#DC2626;--el-switch-off-color:#65A30D;"
            ></el-switch>
        </el-col>
    </el-row>
</div>
</template>


<script setup>
    import { ref, watch } from 'vue';
    import DefaultInput from './inputs/defaultInput.vue';
    import Layout from './Layout.vue';

    const props = defineProps({
        previewImage:{type:Boolean,default:false},
        arrowStatus:{type:String,default:'always'},
        interval:{type:Number,default:3000},
        type:{type:String,default:''},
        autoPlay:{type:Boolean,default:true},
        pauseOnHover:{type:Boolean,default:true},
        height:{type:String,default:''},
        trigger:{type:String,default:'click'},
        indicatorPosition:{type:String,default:''},
        data:{type:Array,default:[]},
        loop:{type:Boolean,default:true},
    });

    const emit = defineEmits(['update:previewImage','update:arrowStatus',
    'update:interval','update:autoPlay','update:indicatorPosition',
    'update:pauseOnHover','update:trigger','update:type','update:height','update:loop']);

    // 圖片預覽按鈕
    const previewImage = ref(props.previewImage); 

    watch(previewImage, ()=>{
        emit('update:previewImage',previewImage.value);
    })

    // 輪播按鈕顯示
    const arrowStatus = ref(props.arrowStatus);

    watch(arrowStatus, ()=>{
        emit('update:arrowStatus',arrowStatus.value);
    })

    // 是否自動播放
    const autoPlay = ref(props.autoPlay);

    watch(autoPlay,()=>{
        emit('update:autoPlay',autoPlay.value);
    })

    // 輪播速度
    const interval = ref(props.interval);

    watch(interval, ()=>{
        emit('update:interval',Number(interval.value));
    })

    // indicatorPosition 按鈕位置
    const indicatorPosition = ref(props.indicatorPosition);

    watch(indicatorPosition, ()=>{
        emit('update:indicatorPosition',indicatorPosition.value);
    })


    // pauseOnHover
    const pauseOnHover = ref(props.pauseOnHover);

    watch(pauseOnHover, ()=>{
        emit('update:pauseOnHover',pauseOnHover.value);
    })

    // trigger(indicator button)
    const trigger = ref(props.trigger);

    watch(trigger, ()=>{
        emit('update:trigger',trigger.value);
    })

    // type
    const type = ref(props.type);

    watch(type, ()=>{
        if(type.value !== 'card'){
            type.value = '';
        }
        emit('update:type',type.value);
    })

    // height
    const height = ref(props.height);
    watch(height, ()=>{
        emit('update:height',height.value);
    })

    //loop
    const loop = ref(props.loop);
    watch(loop, ()=>{
        emit('update:loop',loop.value);
    })

</script>

<style lang="scss" scoped>
.flex{
    display: flex;
}

.radio_group {
    display: flex;
    justify-content: center;
    align-items: center;
    .title{
        margin-right: 10px;
    }
}
.justify-center{
    justify-content: center;
    
}

.items-center{
    align-items: center;
}

.my-12{
    margin: 12px 0;
}

.mx-12{
    margin:0px 12px;
}

</style>