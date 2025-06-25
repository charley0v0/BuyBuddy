<template>
    <div class="no_description_alert" :class="fullWidth? 'full-width':''">
        <el-alert  
            :title="title" 
            :type="alertType"
            :closable="closable"
            class="d-flex align-center"
            show-icon
            :class=" infogrey == true ? 'infogery' : '' "
        >
        </el-alert>
    </div>
</template>


<script name="NoDescriptionAlert" setup>
    import { ref } from 'vue';
    const props = defineProps({
        title:String,
        alertType:{
            type:String,
            default:'success'
        },
        fullWidth:{
            type:Boolean,
            default:false,
        },
        closable:{
            type:Boolean,
            default:false,
        },
        infogrey:{
            type:Boolean,
            default:false,
        },
    });

</script>


<style lang="scss" scoped>
    .no_description_alert{
        .el-alert{
            height:36px;
            padding:8px 16px;
            box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.12);
        }

        &:not(.full-width){
            max-width:460px;
        }

        &.full-width{
            width:100%;
        }

        :deep(.el-alert__content){
            display: flex;
        }

        //綠色
        :deep(.el-alert--success.is-light){
            background-color:$success-light;

            .el-alert__title{
                color:$success-dark;
            }

            .el-alert__icon path{
                color:$success-dark;
            }
        }

        //藍色
        :deep(.el-alert--info.is-light){
            background-color:$blue-50;

            .el-alert__title{
                color:$blue-600;
            }

            .el-alert__icon path{
                color:$blue-600;
            }
        }

        //橘色
        :deep(.el-alert--warning.is-light){
            background-color:$warning-light;

            .el-alert__title{
                color:$warning-dark;
            }

            .el-alert__icon path{
                color:$warning-dark;
            }
        }

        //紅色
        :deep(.el-alert--error.is-light){
            background-color:$error-light;

            .el-alert__title{
                color:$error-dark;
            }

            .el-alert__icon path{
                color:$error-dark;
            }
        }

         //灰色
        :deep(.infogery.el-alert--info.is-light){
            background-color: $grey-100;
            .el-alert__title{
                color:$grey-500;
            }
            .el-alert__description{
                color:$grey-500;
            }
            .el-alert__icon path{
                color:$grey-500;
            }
        }
    }
</style>