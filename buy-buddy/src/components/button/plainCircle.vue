<template>
    <div class="plain_circle">
        <el-button
            class="button"
            :class="buttonSize"
            :disabled="disabled"
            circle
        >
            <div v-if="slots.icon" class="icon">
                <slot name="icon"></slot>
            </div>
        </el-button>
    </div>
</template>
<script name="PlainCircle" setup>
    import { useSlots } from 'vue';
    const props = defineProps({
            buttonSize: String,
            disabled: Boolean,
        });
    const slots = useSlots();
</script>
<style lang="scss" scoped>
    @use '@/assets/style/style.scss' as *;
    @use '@/assets/style/circleIcon.scss' as *; 
   
    .plain_circle {
        display:flex;
        .button{
            width:36px;
            height: 36px;
            border-width: 0px;
            background: transparent;

            &:not(.is-disabled) {
            color: $grey-500;
            :deep(svg > path) {
                fill:$grey-500;;
            }
         
            &:hover,
            &:active {
                background: $grey-50;
            }
        }
    }
        :deep(.is-disabled),
        :deep(.is-disabled):hover{
            color: $grey-300;
        }

        :deep(.large) {
            width: 40px !important;
            height: 40px !important;
        }

        :deep(.small) {
            width: 16px !important;
            height: 16px !important;
        }
    }

</style>