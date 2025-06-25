<template>
    <div class="outline_circle">
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
<script name="OutlineCircle" setup>
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
    .outline_circle {
        display:flex;
        border-radius:50%;
        .button{
            width:36px;
            height: 36px;

            &:not(.is-disabled) {
                color: $bg-blue;
                border-color: $blue-800;
                background: transparent;

                &:hover,
                &:active {
                    background: $blue-50;
                }
            }
        }
        :deep(.is-disabled),
        :deep(.is-disabled):hover{
            color: $grey-300;
            @extend .border-disabled;
            svg {
                @extend .icon-disabled;
            }
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