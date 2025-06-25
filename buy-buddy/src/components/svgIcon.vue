<template>
    <Layout :name="'svg_icon'" id="svg_icon">
        <div class="d-flex align-center flex-wrap">
            <div class="text-center mx-2 pa-10 w-150 bg-dark border-radius" v-for="(svg,idx) in svgFiles">
                <img :key="idx" :src="svg.src">
                <div class="text-center">{{svg.name}}</div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    const svgFiles = ref([]);
    const importAllSvg = async () => {
        const modules = import.meta.glob('@/assets/svg/*.svg');
        const paths = await Promise.all(Object.keys(modules).map(async (key) => {
            const module = await modules[key]();
            svgFiles.value.push({name:key.split('/src/assets/svg/')[1].split('.svg')[0],src:module.default});
        }));
    }

    onMounted(() => {
        importAllSvg();
    });

</script>

<style lang="scss" scoped>
    .mx-2{
        margin:2px;
        img{
            width:30px;
            height:auto;
        }
    }

    .pa-10{
        padding:10px;
    }

    .w-150{
        width:150px;
    }

    .bg-dark{
        background-color:rgba(144,147,153,0.6);
    }

    .border-radius{
        border-radius:5px;
    }
</style>