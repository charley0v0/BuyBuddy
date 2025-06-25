<template>
    <div class="d-flex tabs" :class="`${tabType}_tab ${fullWidth ? 'full-width': ''}`">
        <div 
            v-for="(tab,idx) in tabGroups"
            class="tab d-flex justify-center align-center" 
            :style="fullWidth ? `width:calc(100% / ${tabGroups.length})`: ''"
            :class="{is_active:tab.value == nowTab,is_disabled:tab.disabled}"
            @click="setTab(tab.value,tab.disabled)"
        >   
            <Icon v-if="tab.icon">
                <Component :is="tab.icon" />
            </Icon> 
            <Icon v-if="tab.img">
                <img :src="tab.img" :alt="tab.title">
            </Icon> 

            <span>{{tab.title}}</span>
        </div>
    </div>
</template>

<script name="TabGroup" setup>
    import { ref, watch } from 'vue';
    import { Icon } from '@vicons/utils'
    import '@vicons/material';

    const props = defineProps({
        tabGroups:Array,
        tabType:{
            type:String,
            default:'default'
        },
        modelValue:{
            type:String,
            default:''
        },
        fullWidth:{
            type:Boolean,
            default:false,
        }
    });

    const nowTab = ref(props.modelValue);
    const emit = defineEmits(['update:modelValue']);

    const setTab = (tab,disabled) =>{
        if(!disabled){
            nowTab.value = tab;
            emit('update:modelValue',nowTab.value);
        }
    }

    watch(()=>props.modelValue, (newVal)=>{
        nowTab.value = newVal;
    });
    

</script>


<style lang="scss" scoped>
    // <!--======== Default =========-->
    .default_tab{
        box-sizing:border-box;
        padding:8px;
        border-radius:6px;
        background:#F3F4F6;
        &.full-width{
            width:100%;
        }

        &:not(.full-width){
            width:fit-content;
        }

        .tab{
            padding:8px 24px;
            border-radius:6px;
            font-size:16px;
            display:flex;
            align-items:center;
            cursor:pointer;
            color:$grey-600;

            &.is_active{
                color:$blue-600;
                background:#FFFFFF;
                box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12);
            }

            &:not(.is_active):hover{
                color:$blue-600;
            }

            .xicon{
                margin-right:8px;
            }
        }
    }

    // <!--======== Underline =======-->
    .underline_tab{
        padding:8px;
        box-sizing:border-box;

        &.full-width{
            width:100%;
            
        }

        &:not(.full-width){
            width:fit-content;
        }
       

        .tab{
            padding:8px 16px;
            font-size:16px;
            display:flex;
            align-items:center;
            cursor:pointer;
            color:$grey-600;
            border-bottom:1px solid $grey-200;

            &.is_active{
                color:$blue-600;
                border-bottom:2px solid $blue-600;
                animation-name:active;
                animation-duration:1s;
            }

            &:not(.is_active):hover{
                background:$grey-50;
                border-radius:6px;
            }

            .xicon{
                margin-right:8px;
            }
        }
    }

    // <!--========== Bare ==========-->
    .bare_tab{
        padding:8px;
        box-sizing:border-box;

        &.full-width{
            width:100%;
        }

        &:not(.full-width){
            width:fit-content;
        }

        .tab{
            padding:8px 16px;
            font-size:16px;
            display:flex;
            align-items:center;
            cursor:pointer;
            color:$grey-600;

            &.is_active{
                color:$blue-600;
            }

            &:not(.is_active):hover{
                background:$grey-50;
                border-radius:6px;
            }

            .xicon{
                margin-right:8px;
            }
        }
    }

    .tabs{
        .is_disabled{
            color:$grey-300 !important;

            &:hover{
                background: initial !important;
                cursor:not-allowed !important;
            }
        }
    }
</style>