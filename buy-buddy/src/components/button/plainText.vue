<template>
    <div class="plain_text">
        <el-button
            class="button"
            :class="buttonSize"
            :disabled="disabled"
            type="primary"
            text
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
<script name="PlainButton" setup>
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
    .plain_text{
        display:inline-block;
        .button{
            border-radius:6px;
            height: 36px;
            padding: 8px 12px;
            font-size: 14px;
            line-height: 20px;
            letter-spacing:0.56px;
        }
        .button:not(.is-disabled) {
            color: $grey-600;
            :deep(svg > path) {
                fill:$grey-600;
            }
            &:hover,&:active {
                border-color:$grey-50;
                background:$grey-50;
            }
            &:focus {
                border-color:white;
                background:white;
            }
        }


        :deep(.is-disabled),
        :deep(.is-disabled):hover{
            color:$grey-300;
        }

        :deep(.large) {
            min-width:98px;
            padding:12px 16px;
            font-size: 16px !important;
            height: 48px !important;
            letter-spacing:0.64px !important;
            .icon{
                &-left,
                &-right {
                    width: 24px;
                    height: 24px;
                }
                &-left {
                    margin-right: 12px;
                }
                &-right {
                    margin-left: 12px;
                }

                svg{
                    width: 24px;
                    height: 24px;
                }
            }
        }
        :deep(.small) {
            min-width:66px;
            padding:8px;
            height: 32px !important;
            font-size: 12px !important;
            letter-spacing:0.48px !important;
            
            .icon{
                &-left,
                &-right {
                    width: 14px;
                    height: 17px;
                }
                &-left {
                    margin-right: 12px;
                }
                &-right {
                    margin-left: 12px;
                }

                svg{
                    width: 16px;
                    height: 16px;
                }
            }
        }
    }

</style>