<template>
    <div class="link_text">
        <el-button
            class="button"
            :class="buttonSize"
            :disabled="disabled"
            link
        >

            <div v-if="slots.left" class="icon icon-left">
                <slot name="left"></slot>
            </div>

            {{ title }}

            <div v-if="slots.right" class="icon icon-right">
                <slot name="right"></slot>
            </div>

        </el-button>
    </div>
</template>
<script name="LinkButton" setup>
    import { useSlots } from 'vue';
    const props = defineProps({
            title:String,
            buttonSize: String,
            disabled: Boolean,
        });
    const slots = useSlots();
</script>
<style lang="scss" scoped>
    @use '@/assets/style/style.scss' as *;
    @use '@/assets/style/textIcon.scss' as *;
    .link_text {
        display:flex;
        .button {
            color:$blue-600;
            font-size:14px;
            border-radius:0px;
            letter-spacing:0.56px;
            :deep(svg > path) {
                fill:$blue-600;;
            }

            &:not(.is-disabled) {
                &:hover {
                    color:$blue-400;
                    :deep(svg > path) {
                        fill:$blue-400;;
                    }
                }
                &:active {
                    color:$blue-800;
                    :deep(svg > path) {
                        fill:$blue-800;;
                    }
                }
            }
        }
        :deep(.is-disabled){
            color:$grey-300;
            :deep(svg > path) {
                fill:$grey-300;
            }
        }
        :deep(.large) {
            font-size: 16px;
            letter-spacing:0.64px !important;
        }
        :deep(.small) {
            font-size: 12px !important;
            letter-spacing:0.48px !important;
        }
    }

</style>