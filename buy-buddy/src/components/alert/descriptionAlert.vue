<template>
    <div class="description_alert">
        <el-alert 
            :title="title" 
            :type="alertType" 
            :description="alertDescription"
            show-icon
            :class="{ 'full-width': fullWidth == true , 'infogery' : infogrey == true}"
            :closable="closable"
        >
        <template #default>
            <slot name="content"></slot>
        </template>
        </el-alert>
    </div>
</template>


<script name="DescriptionAlert" setup>
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
        alertDescription:String,
        infogrey:{
            type:Boolean,
            default:false,
        },
    });

</script>


<style lang="scss" scoped>
    .el-alert{
        min-height:56px;
        padding:8px 16px;
        box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.12);


        &:not(.full-width){
            max-width:460px;
        }

        &.full-width{
            width:100%;
        }

        :deep(.el-alert__title){
            font-size:14px;
            font-weight:400;
            line-height: 20px;
            letter-spacing: 0.56px;
        }

        :deep(.el-alert__description){
            margin:0px;
            font-size:12px;
            font-weight: 400;
            line-height: 16px;
            letter-spacing: 0.48px;
        }

        :deep(.el-alert__content){
            padding:0 8px 0 16px;
        }
    }

    //綠色
    :deep(.el-alert--success.is-light){
        background-color:$success-light;

        .el-alert__title{
            color:$success-dark;
        }

        .el-alert__description{
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

        .el-alert__description{
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

        .el-alert__description{
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

        .el-alert__description{
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
</style>