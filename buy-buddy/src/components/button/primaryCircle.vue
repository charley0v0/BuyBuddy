<template>
    <div class="primary_circle">
        <el-button
            class="button"
            :class="buttonSize"
            type="info"
            :disabled="disabled"
            circle
            tabindex="-1"
        >
            <div v-if="slots.icon" class="icon">
                <slot name="icon"></slot>
            </div>
        </el-button>
    </div>
</template>

<script name="PrimaryCircle" setup>
    import { useSlots } from 'vue';
    const props = defineProps({
        buttonSize: String,
        disabled: Boolean,
    })

    const slots = useSlots();
</script>

<style lang="scss" scoped>
    @use '@/assets/style/style.scss' as *;
    @use '@/assets/style/circleIcon.scss' as *; 
    .primary_circle {
        display:flex;
        border-radius:50%;

        .button{
            width:36px;
            height: 36px;
            
            &:not(.is-disabled) {
                background: $grey-400;
                border-color: transparent;
                :deep(svg > path) {
                    fill:white;
                }
                &:hover {
                    background:  $grey-300;
                }
                &:active{
                    background:  $grey-400;
                }
            }
        }

        :deep(.is-disabled),
        :deep(.is-disabled):hover{
            border:1px solid transparent;
            @extend .bg-grey, .text-disabled;
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