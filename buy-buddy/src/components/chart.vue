<template>
    <el-row :gutter="20">
        <!--========== Line ==========-->
        <el-col :span="24" >
            <h3>Line Chart</h3>
            <Layout :name="'line_chart'" id="line_chart">
                <LineChart 
                    :totalValue="100000000"
                    :remainWord="'剩餘額度 $12,000,000'"
                    :itemList="chartArr"
                />
            </Layout>
        </el-col>
        <!--========== Donut ==========-->
        <!-- <el-col :span="8">
            <h3>Donut Chart</h3>
            <Layout :name="'donut_chart'" id="donut_chart">
                
            </Layout>
        </el-col> -->
    </el-row>
</template>


<script setup>
    import { ref, watch, nextTick } from 'vue';
    import LineChart from '@/components/chart/lineChart.vue';
    // import DonutChart from '@/components/chart/donutChart.vue';

    const chartArr = ref([
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
    ]);


</script>