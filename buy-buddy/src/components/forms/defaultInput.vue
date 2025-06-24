<template>
    <el-input :placeholder="placeholder" v-model="modelValue"></el-input>
</template>

<script setup>

const props = defineProps({
    placeholder: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    }
})



</script>

<style lang="scss" scoped>

</style>