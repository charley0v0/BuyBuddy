<template>
    <el-container>
        <!--component menu-->
        <el-aside width="250px" :class="[AppStyle.componentMenu]">
        <ComponentMenu></ComponentMenu>
        </el-aside>
        <!--component view-->
        <el-main :class="[AppStyle.componentContent]">
            <div class="text-center">
                <img src="/vite.svg" :class="AppStyle.logo" alt="Vite logo" />
                <img src="./assets/vue.svg" :class="[AppStyle.logo, AppStyle.vue]" alt="Vue logo" />
                <h1 class="">Vue+Vite+Element Plus Component Library</h1>
            </div>
        
            <h2 class="text-blue">Input</h2>
            <Input />
            <hr>

            <h2 class="text-blue">Select</h2>
            <Select />
            <hr>

            <h2 class="text-blue">SearchType</h2>
            <SearchType />
            <hr>

            <h2 class="text-blue">Checkbox</h2>
            <Checkboxs />
            <hr>

            <h2 class="text-blue">RadioButton</h2>
            <RadioButtons />
            <hr>

            <h2 class="text-blue">DatePickers</h2>
            <DatePicker />
            <hr>

            <h2 class="text-blue">Date</h2>
            <Dates />
            <hr>

            <h2 class="text-blue">Address</h2>
            <Address />
            <hr>

            <h2 class="text-blue">Phone</h2>
            <Phone />
            <hr>

            <h2 class="text-blue">Modal</h2>
            <Modal/>
            <hr>

            <h2 class="text-blue">Table</h2>
            <Tables />
            <hr>

            <h2 class="text-blue">Tags</h2>
            <Tags />
            <hr>

            <h2 class="text-blue">Chips</h2>
            <Chips />
            <hr>

            <h2 class="text-blue">Upload</h2>
            <Upload />
            <hr>

            <h2 class="text-blue">Tabs</h2>
            <Tabs />
            <hr>

            <h2 class="text-blue">Icon Button</h2>
            <IconButton />
            <hr>

            <h2 class="text-blue">Text Button</h2>
            <TextButton />
            <hr>

            <h2 class="text-blue">Alert</h2>
            <Alert />
            <hr>

            <h2 class="text-blue">Collapse</h2>
            <Collapse />
            <hr>

            
            <h2 class="text-blue">Steps</h2>
            <Steps />
            <hr>

            <h2 class="text-blue">Chart</h2>
            <Chart />
            <hr>
            
            <h2 class="text-blue">Carousel</h2>
            <Carousel />
            <hr>

            <h2 class="text-blue">Svg Icon</h2>
            <SvgIcon />
          
        </el-main>
    </el-container>
</template>

<script setup>
    import AppStyle from './assets/style/components/App.module.scss'
    import ComponentMenu from './components/componentMenu.vue';
    import Input from './components/Input.vue';
    import Select from './components/selects.vue';
    import Checkboxs from './components/checkboxs.vue';
    import RadioButtons from './components/radioButtons.vue';
    import DatePicker from './components/datepickers.vue';
    import Upload from './components/upload.vue';
    import Modal from './components/modalSection.vue';
    import Tags from './components/tags.vue';
    import IconButton from './components/iconButton.vue';
    import TextButton from './components/textButton.vue';
    import Tabs from './components/tabs.vue';
    import Alert from './components/alert.vue';
    import Collapse from './components/collapses.vue';
    import Chips from './components/chips.vue';
    import Steps from './components/steps.vue';
    import Dates from './components/dates.vue';
    import Phone from './components/phone.vue';
    import Carousel from './components/carouselSection.vue';
    import Address from './components/address.vue';
    import SearchType from '@/components/search.vue';
    import Tables from '@/components/tables.vue';
    import SvgIcon from '@/components/svgIcon.vue';
    import Chart from '@/components/chart.vue';

    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';

    const state = reactive({
        router: useRouter()
    });

</script>

<style lang="scss" scoped>
    h2{
        margin-bottom:30px;
    }
</style>
