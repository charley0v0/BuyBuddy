<template>
    <div>
        <el-steps :active="mainStatus" :direction='direction' :space='space' finish-status='success' process-status='finish' align-center>
            <el-step v-for="(obj,i) in stepData" 
                :key="i"
                :title="obj.title" 
            >
                <template v-slot:title v-if="twoLayer == true">
                    <div
                        :id="`${i+1}`"
                        :class="setClassName(obj.status)"
                        @click="showHisStep(obj.index)"
                    >{{obj.title}}
                    </div>
                </template> 

                <!-- description 有子進度 -->
                <template v-slot:description v-if="twoLayer == true">
                    <div v-show="obj.showstatus == true">
                        <p v-for="(subObj,index) in obj.description" 
                            :key="index" 
                            :class="[
                                    setSubClassName(subObj.substatus),
                                    {'bluecolor':subObj.clickstatus == true}
                                    ]"
                            @click="goHisStep(obj.index,subObj.index)"
                        >{{subObj.subtitle}}
                        </p>
                    </div>
                </template> 
                <!-- description 無子進度 -->
                <template v-slot:description  v-else>
                    <p v-for="(array,index) in obj.description" :key="index" :ref="index">{{array}}</p>
                </template>
            </el-step>
        </el-steps>
    </div>
</template>


<script name="Step" setup>
    import {ref, reactive, onMounted, watch } from 'vue';

    const props = defineProps({
        stepData:Array,
        nowStatus:{
            type:Number,
            default:0
        },
        direction:{
            type:String,
            default:'horizontal'
        },
        space:{
            type:Number,
        },
        twoLayer:{
            type:Boolean,
            default:false
        },
        showStatus:{
            type:Number,
            default:0
        },
        
    });

    const emits = defineEmits(['RetruntEmit'])
    
    watch(() => props.nowStatus ,(changeVal,oldVal)=>{
        mainStatus.value = Math.floor(props.nowStatus)
        subStatus.value = Number(((props.nowStatus) - Math.floor(props.nowStatus)).toFixed(1))*10

        if(props.twoLayer == true){
            set_DataStatus (mainStatus.value ,subStatus.value)
        }
    })

    watch(() => props.showStatus ,(changeVal,oldVal)=>{
        set_StatusColor (props.showStatus)
    })

    onMounted (()=>{
        if(props.twoLayer == true){
            set_DataStatus (mainStatus.value ,subStatus.value)
            set_StatusColor (props.showStatus)
        }
    })

    let mainStatus = ref(Math.floor(props.nowStatus)) // 主進度
    let subStatus = ref(Number(((props.nowStatus) - Math.floor(props.nowStatus)).toFixed(1))*10) // 子進度

    const set_DataStatus = (mainStatus,subStatus)=>{

        // 主進度 status
        for(let i = 0 ; i < props.stepData.length ; i++){
            if( props.stepData[i].index < mainStatus){
                props.stepData[i].status = 'finish'
                props.stepData[i].showstatus = false;
            }else if(props.stepData[i].index == mainStatus){
                props.stepData[i].status = 'process'
                props.stepData[i].showstatus = true;
            }else{
                props.stepData[i].status = 'not-finish'
                props.stepData[i].showstatus = false;
            }
        }

        if(mainStatus == 0){
            props.stepData[0].status = 'process'
        }

        //子進度 status
        for(let i = 0 ; i < props.stepData.length ; i++){
            if(props.stepData[i].description.length){
                if(props.stepData[i].index < mainStatus){
                    for(let j = 0 ; j < props.stepData[i].description.length ; j++){
                        props.stepData[i].description[j].substatus = 'finish'
                    }
                }else if(props.stepData[i].index == mainStatus){
                    for(let j = 0 ; j < props.stepData[i].description.length ; j++){
                        if(props.stepData[i].description[j].index < subStatus){
                            props.stepData[i].description[j].substatus = 'finish'
                        }else if(props.stepData[i].description[j].index == subStatus){
                            props.stepData[i].description[j].substatus = 'process'
                        }else{
                            props.stepData[i].description[j].substatus = 'not-finish'
                        }
                    }
                }else{
                    for(let j = 0 ; j < props.stepData[i].description.length ; j++){
                        props.stepData[i].description[j].substatus = 'not-finish'
                    }
                }
            }
        }
    }

       //控制進度顏色
    const set_StatusColor = (showStatus) =>{
        let ShowMain = Math.floor(showStatus)
        let ShowSub = Number(((showStatus) - Math.floor(showStatus)).toFixed(1))*10

        for(let i = 0 ; i < props.stepData.length ; i++){
            if(props.stepData[i].description.length){
                if(props.stepData[i].index < ShowMain){
                    props.stepData[i].showstatus = false;
                    for(let j = 0 ; j < props.stepData[i].description.length ; j++){
                        props.stepData[i].description[j].clickstatus = false
                    }
                }else if(props.stepData[i].index == ShowMain){
                    props.stepData[i].showstatus = true;
                    for(let j = 0 ; j < props.stepData[i].description.length ; j++){
                        if(props.stepData[i].description[j].index < ShowSub){
                            props.stepData[i].description[j].clickstatus = false
                        }else if(props.stepData[i].description[j].index == ShowSub){
                            props.stepData[i].description[j].clickstatus = true
                        }else{
                            props.stepData[i].description[j].clickstatus = false
                        }
                    }
                }else{
                    props.stepData[i].showstatus = false;
                    for(let j = 0 ; j < props.stepData[i].description.length ; j++){
                        props.stepData[i].description[j].clickstatus = false
                    }
                }
            }
        }
    }

    const setClassName = (status)=>{
        switch(status) {
            case 'finish':
                return ['cursor-point']
            case 'not-finish':
                return ['cursor-not-allowed']
            case 'process':
                return ['cursor-point']
        }
    }

    const setSubClassName = (status)=>{
        switch(status) {
            case 'finish':
                return ['cursor-point']
            case 'not-finish':
                return ['cursor-not-allowed']
            case 'process':
                return ['cursor-point']
        }
    }

    const showHisStep = (clickStep)=>{
        if(props.stepData[clickStep].status != 'not-finish'){
            for(let i = 0 ; i < props.stepData.length ;i++){
                if(i == clickStep){
                    props.stepData[i].showstatus = true;
                    if(props.stepData[i].description.length){
                        props.stepData[i].description[0].clickstatus = true;
                    }
                }else{
                    props.stepData[i].showstatus = false;
                }
            }
            emits('RetruntEmit',{MainStatus:clickStep,SubStatus:1})
        }
    }

    const goHisStep = (mainStep,subStep)=>{
        if(props.stepData[mainStep].description[subStep - 1].substatus != 'not-finish'){
            for(let i = 0 ; i < props.stepData.length ;i++){
                if(props.stepData[i].description.length){
                    for(let j = 0 ;j < props.stepData[i].description.length ; j++){
                        if(props.stepData[mainStep].description[subStep-1].index == props.stepData[i].description[j].index){
                            props.stepData[mainStep].description[subStep-1].clickstatus = true;
                        }else{
                            props.stepData[i].description[j].clickstatus = false;
                        }
                    }
                }
            }
            emits('RetruntEmit',{MainStatus:mainStep,SubStatus:subStep})
        }
    }
</script>

<style lang="scss" scoped>
    :deep(.el-step__description){
        color:#9CA3AF;
        font-size: 14px;

        &.is-success, &.is-finish{
            color:#9CA3AF;
        }

        p{
            margin:16px;
            color:$text-grey;

            &:last-child{
                margin:16px 16px 24px 16px;
            }

            &.bluecolor{
                color:$blue-600;
            }
        } 
    }
    :deep(.el-step__line){
        background-color:#E5E7EB;
        border-color:#E5E7EB;
    }

    :deep(.el-step__title){
        letter-spacing:0.64px;
    }

    //步驟進行中
    :deep(.el-step__title.is-finish){
        color: #1F2937;
    }
    :deep(.el-step__head.is-finish > .el-step__icon.is-text){
        color:white;
        background-color:$blue-600;
        border-color: $blue-400;
    }

    //步驟完成
    :deep(.el-step__title.is-success){
        color:#1F2937;
    }
    :deep(.el-step__head.is-success > .el-step__icon.is-text){
        color:white;
        background-color:$blue-400;
        border-color: $blue-400;
    }
    :deep(.el-step__head.is-success){
        border-color: $blue-400;
    }

    //步驟尚未完成
    :deep(.el-step__title.is-wait){
        color:#1F2937;
    }
    :deep(.el-step__head.is-wait > .el-step__icon.is-text){
        color:white;
        background-color:$grey-400;
        border-color: $grey-400;
    }

    .xicon {
        width: 26px;
        height: 26px;
        & svg {
            width: 26px;
            height: 26px;
            border:1px solid #3B82F6;
            border-radius: 26px;
            color: #3B82F6;
        }
    }

    //一般Css
    .cursor-not-allowed{
        cursor: not-allowed;
    }
    .cursor-point{
        cursor: pointer;
    }
</style>