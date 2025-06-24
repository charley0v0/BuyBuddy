<template>
    <input type="text" :placeholder="placeholder" :value="modelValue">
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

<style scoped>

</style>