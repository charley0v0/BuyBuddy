<template>
    <div id="line_chart">
        <div class="chart d-flex">
            <div v-for="(item,idx) in itemList" :key="idx" 
                :style="`width:${(item.value/totalValue*100).toFixed(1)}%;background:${item.color}`">
                <div v-if="showMoney == true">
                    {{formatCurrency(Number(item.value))}}
                </div>
            </div>
        </div>
        <div class="mt-8" v-if="usedot == true">
            <div class="d-flex justify-between align-center">
                <div class="d-flex align-center">
                    <div class="d-flex align-center mr-8" v-for="(item,idx) in props.itemList" :key="idx">
                        <div class="dot" :style="`background-color:${item.color}`"></div>
                        <span>{{item.name}}</span>
                    </div>
                </div>
                <div class="remainWord">{{props.remainWord}}</div>
            </div>
        </div>
    </div>
</template>


<script name="LineChart" setup>
    import { ref, reactive, watch, watchEffect } from 'vue';
    import { Icon } from '@vicons/utils'

    const props = defineProps({
        totalValue:{
            type:Number,
            default:100000000
        },
        itemList:{
            type:Array,
            default:[
                {
                    name:'信用卡',
                    value:53000912,
                    color:'#2563EB'
                },
                {
                    name:'其他類別',
                    value:34999088,
                    color:'#60A5FA'
                }
            ]
        },
        remainWord:{
            type:String,
            default:'剩餘額度 $12,000,000'
        },
        showMoney:{
            type:Boolean,
            default:true
        },
        usedot:{
            type:Boolean,
            default:true
        }
    });

    //顯示金額千分位
    const formatCurrency = (value) => {
        if(isNaN(value)) return '-';
        return `$ ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

    }
   
</script>


<style lang="scss" scoped>
    .chart{
        width:100%;
        background:$grey-100;
        border-radius:14px;
        height:16px;

        div{
            display: flex;
            align-items:center;
            justify-content:center;
            height:16px;
            color:white;
            font-family: "Noto Sans TC";
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
            letter-spacing: 0.48px;

            &:first-child{
                border-top-left-radius: 14px;
                border-bottom-left-radius: 14px;
            }

            &:last-child{
                border-top-right-radius: 14px;
                border-bottom-right-radius: 14px;
            }
        }
    }

    .dot{
        width:8px;
        height:8px;
        border-radius:50%;
        margin:16px;
    }

    .remainWord{
        color: $grey-400;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0.56px;
    }
    
</style>