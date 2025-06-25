<template>
    <div class="link_circle">
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
<script name="LinkCircle" setup>
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
   
    .link_circle {
        display:flex;
        .button{
            width:36px;
            height: 36px;
            border-width: 0px;
            background: transparent;

            &:not(.is-disabled) {
            color: $blue-600;
            
            :deep(svg > path) {
                fill:$blue-600;
            }
         
            &:hover {
                color: $blue-400;
                :deep(svg > path) {
                    fill:$blue-400;
                }
            }
            &:active {
                color: $blue-800;
                :deep(svg > path) {
                    fill:$blue-800;
                }
            }

           
        }
    }
        :deep(.is-disabled),
        :deep(.is-disabled):hover{
            color: $grey-300;
            svg {
                color: $grey-300;
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