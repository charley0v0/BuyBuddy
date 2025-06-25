<template>
    <div class="secondary_text">
        <el-button
            class="button"
            :class="buttonSize"
            :disabled="disabled"
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
<script name="SecondaryButton" setup>
    import { useSlots } from 'vue';
    const props = defineProps({
            buttonSize: String,
            disabled: Boolean,
            title: String,
        });
    const slots = useSlots();
</script>
<style lang="scss" scoped>
    @use '@/assets/style/style.scss' as *;
    @use '@/assets/style/textIcon.scss' as *;
    
    .secondary_text {
        display:inline-block;
        
        .button{
            min-width:82px;
            height: 36px;
            padding: 8px 12px;
            font-size: 14px;
            line-height: 20px;
            letter-spacing:0.56px;
        }

        .button:not(.is-disabled) {
            color: $blue-800;
            border-color: $blue-100;
            background:$blue-100;
            :deep(svg > path) {
                fill:$blue-800;
            }

            &:hover,
            &:active{
                background: $blue-200;
            }
            &:active{
                box-shadow:0px 0px 6px 0px rgba(0,0,0,0.12);
            }
        }
        :deep(.is-disabled),
        :deep(.is-disabled):hover{
            color:$grey-400;
            background:$grey-200;
            border:1px solid $grey-200;

            svg {
                color:$grey-400;
            }
        }

        :deep(.large) {
            min-width:98px;
            padding:12px 16px;
            height: 48px !important;
            font-size: 16px !important;
            letter-spacing:0.64px !important;
        }
        :deep(.small) {
            min-width:66px;
            padding:8px;
            height: 32px !important;
            font-size: 12px !important;
            letter-spacing:0.48px !important;
        }
    }

</style>