<template>
    <el-menu
        text-color="#ffffff"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="menuBorder"
        :class="[AppStyle.elMenu]"
        unique-opened
    > 
        <el-menu-item index="0">Components Position</el-menu-item>
        <el-sub-menu v-for="(menu,idx) in menus" :index="`${idx+1}`">
            <template #title>
                <span>{{menu.title}}</span>
            </template>
          <el-menu-item v-for="(item,idx2) in menu.items" :index="`${idx+1}-${idx2+1}`"  @click="setChoseComponent(item.layout)">
              <el-tooltip
                :content="item.position"
                class="box-item"
                effect="dark"
                placement="right"
                trigger="click"
              >
                <div style="width:250px;">{{item.name}}</div>
              </el-tooltip>
          </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>


<script setup>
    import { reactive } from 'vue';
    import { choseComponent } from '@/store/chose.js';
    import AppStyle from '@/assets/style/components/App.module.scss'

    const chose = choseComponent();

    const menus = reactive([
        {
            title:'Input',
            items:[
                {
                    name:'一般輸入框',
                    layout:'input_default',
                    position:'inputs/defaultInput'
                },
                {
                    name:'驗證功能輸入框',
                    layout:'input_default_verify',
                    position:'inputs/defaultInput'
                },
                {
                    name:'密碼輸入框 (不顯示密碼)',
                    layout:'input_password',
                    position:'inputs/defaultInput'
                },
                {
                    name:'密碼輸入框 (可顯示密碼)',
                    layout:'input_password_show',
                    position:'inputs/defaultInput'
                },
                {
                    name:'顯示限制字數輸入框',
                    layout:'input_limit',
                    position:'inputs/defaultInput'
                },
                {
                    name:'文本輸入框(不限制字數)',
                    layout:'input_textarea',
                    position:'inputs/defaultInput'
                },
                {
                    name:'文本輸入框(限制字數)',
                    layout:'input_textarea_limit',
                    position:'inputs/defaultInput'
                },
                {
                    name:'文本輸入框(含驗證功能)',
                    layout:'input_textarea_verify',
                    position:'inputs/defaultInput'
                },
                {
                    name:'數字輸入框',
                    layout:'input_number',
                    position:'inputs/inputNumber'
                },
                {
                    name:'數字輸入框 (無操作按鈕)',
                    layout:'input_number_no_btn',
                    position:'inputs/InputNumberNoBtn'
                },
            ]
        },
        {
            title:'Select',
            items:[
                {
                    name:'Select',
                    layout:'no_group_select',
                    position:'select/select'
                },
                {
                    name:'GroupSelect',
                    layout:'group_select',
                    position:'select/groupSelect'
                }
            ]
        },
        {
            title:'SearchType',
            items:[
                 {  
                    name:'searchBar',
                    layout:'search_bar',
                    position:'search/searchBar'
                },
                {
                    name:'SearchType',
                    layout:'search_type',
                    position:'search/searchType'
                },
                {
                    name:'searchDate',
                    layout:'search_date',
                    position:'search/searchDate'
                },
                {
                    name:'searchDateBar',
                    layout:'search_date_bar',
                    position:'search/searchDateBar'
                }
            ]
        },
        {
            title:'Checkboxs',
            items:[
                {
                    name:'Single Checkbox',
                    layout:'single_checkbox',
                    position:'checkboxs/checkbox'
                },
                {
                    name:'Checkbox Group',
                    layout:'checkbox_group',
                    position:'checkboxs/checkboxGroup'
                }
            ]
        },
        {
            title:'RadioButton',
            items:[
                {
                    name:'Single RadioButton',
                    layout:'single_radioButton',
                    position:'radioBitton/radioButton'
                },
                {
                    name:'RadioButton Group',
                    layout:'radioButton_group',
                    position:'radioBitton/radioButtonGroup'
                }
            ]
        },
        {
            title:'DatePicker',
            items:[
                {
                    name:'No Range',
                    layout:'single_datepicker',
                    position:'datepickers/datepicker'
                },
                {
                    name:'With Range',
                    layout:'range_datepicker',
                    position:'datepickers/datepickerRange'
                }
            ]
        },
        {
            title:'Date',
            items:[
                {
                    name:'dates',
                    layout:'dates',
                    position:'date/taiwanDate'
                }
            ]
        },
        {
            title:'Address',
            items:[
                {
                    name:'zipcode',
                    layout:'zipcode',
                    position:'address/zipcodeTW'
                }
            ]
        },
        {
            title:'Phone',
            items:[
                {
                    name:'input_phone',
                    layout:'input_phone',
                    position:'inputPhone/inputPhone'
                }
            ]
        },
        {
            title:'Upload',
            items:[
                {
                name:'Photo Single Upload',
                layout:'photo_single_drag',
                position:'upload/photoUploadSingleDrag'
                },
                {
                name:'Photo Multi Upload',
                layout:'photo_multi',
                position:'upload/photoUploadMulti'
                },
                {
                name:'File Upload',
                layout:'file_upload',
                position:'upload/fileUploadSingle'
                },
            ]
        },
        {
            title:'Modal',
            items:[
                {
                    name:'Normal Modal',
                    layout:'normal_modal',
                    position:'modal/normalModal'
                },
                {
                    name:'Customized Modal',
                    layout:'customized_modal',
                    position:'modal/customizedModal'
                },
                {
                    name:'Full Screen Modal',
                    layout:'full_screen_modal',
                    position:'modal/fullScreenModal'
                }
            ]
        },
        {
            title:'Table',
            items:[
                {
                    name:'Table',
                    layout:'table',
                    position:'table/table'
                }
            ]
        },
        {
            title:'Tags',
            items:[
                {
                    name:'Primary(藍)',
                    layout:'tag_primary',
                    position:'tags'
                },
                {
                    name:'Info(灰)',
                    layout:'tag_info',
                    position:'tags'
                },
                {
                    name:'Success(綠)',
                    layout:'tag_success',
                    position:'tags'
                },
                {
                    name:'Warning(黃)',
                    layout:'tag_warning',
                    position:'tags'
                },
                {
                    name:'Danger(紅)',
                    layout:'tag_danger',
                    position:'tags'
                },
                {
                    name:'Secondary_Primary(藍)',
                    layout:'secondaryTag_primary',
                    position:'tags'
                },
                {
                    name:'Secondary_Info(灰)',
                    layout:'secondaryTag_info',
                    position:'tags'
                },
                {
                    name:'Secondary_Success(綠)',
                    layout:'secondaryTag_success',
                    position:'tags'
                },
                {
                    name:'Secondary_Warning(黃)',
                    layout:'secondaryTag_warning',
                    position:'tags'
                },
                {
                    name:'Secondary_Danger(紅)',
                    layout:'secondaryTag_danger',
                    position:'tags'
                },
            ]
        },
        {
            title:'Chips',
            items:[
                {
                    name:'Chip',
                    layout:'chip_no_description',
                    position:'chips/chip'
                },
                {
                    name:'Chip with Description',
                    layout:'chip_with_description',
                    position:'chips/chipDescription'
                }
            ]
        },
        {
            title:'Icon Button',
            items:[
                {
                    name:'Primary',
                    layout:'icon_button_primary',
                    position:'button/primaryCircle'
                },
                {
                    name:'Outline',
                    layout:'icon_button_outline',
                    position:'button/outlineCircle'
                },
                {
                    name:'Link',
                    layout:'icon_button_link',
                    position:'button/linkCircle'
                },
                {
                    name:'Plain',
                    layout:'icon_button_plain',
                    position:'button/plainCircle'
                },
                
               
            ]
        },
        {
            title:'Text Button',
            items:[
                {
                    name:'Primary',
                    layout:'text_button_primary',
                    position:'button/primaryText'
                },
                {
                    name:'Primary (右icon)',
                    layout:'text_button_primary_right_icon',
                    position:'button/primaryText'
                },
                {
                    name:'Primary (左icon)',
                    layout:'text_button_primary_left_icon',
                    position:'button/primaryText'
                },
                {
                    name:'Secondary',
                    layout:'text_button_Secondary',
                    position:'button/secondaryText'
                },
                {
                    name:'Secondary (右icon)',
                    layout:'text_button_Secondary_right_icon',
                    position:'button/secondaryText'
                },
                {
                    name:'Secondary (左icon)',
                    layout:'text_button_Secondary_left_icon',
                    position:'button/secondaryText'
                },
                {
                    name:'Outline',
                    layout:'text_button_outline',
                    position:'button/outlineText'
                },
                {
                    name:'Outline (右icon)',
                    layout:'text_button_outline_right_icon',
                    position:'button/outlineText'
                },
                {
                    name:'Outline (左icon)',
                    layout:'text_button_outline_left_icon',
                    position:'button/outlineText'
                },
                {
                    name:'Plain',
                    layout:'text_button_plain',
                    position:'button/text'
                },
                {
                    name:'Plain (右icon)',
                    layout:'text_button_plain_right_icon',
                    position:'button/text'
                },
                {
                    name:'Plain (左icon)',
                    layout:'text_button_plain_left_icon',
                    position:'button/text'
                },
                {
                    name:'Link',
                    layout:'text_button_link',
                    position:'button/linkText'
                },
                {
                    name:'Link (右icon)',
                    layout:'text_button_link_right_icon',
                    position:'button/linkText'
                },
                {
                    name:'Link (左icon)',
                    layout:'text_button_link_left_icon',
                    position:'button/linkText'
                },
            ]
        },
        {
            title:'Tabs',
            items:[
                {
                    name:'Default Tab',
                    layout:'default_tab',
                    position:'tabs/tabGroup'
                },
                {
                    name:'Underline Tab',
                    layout:'underline_tab',
                    position:'tabs/tabGroup'
                },
                {
                    name:'Bare Tab',
                    layout:'bare_tab',
                    position:'tabs/tabGroup'
                }
            ]
        },
        {
            title:'Alert',
            items:[
                {
                    name:'Description 綠',
                    layout:'description_success',
                    position:'alert/descriptionAlert'
                },
                {
                    name:'Description 藍',
                    layout:'description_info',
                    position:'alert/descriptionAlert'
                },
                {
                    name:'Description 橘',
                    layout:'description_warning',
                    position:'alert/descriptionAlert'
                },
                {
                    name:'Description 紅',
                    layout:'description_error',
                    position:'alert/descriptionAlert'
                },
                {
                    name:'Description 灰',
                    layout:'description_infogrey',
                    position:'alert/descriptionAlert'
                },
                {
                    name:'No Description 綠',
                    layout:'no_description_success',
                    position:'alert/noDescriptionAlert'
                },
                {
                    name:'No Description 藍',
                    layout:'no_description_info',
                    position:'alert/noDescriptionAlert'
                },
                {
                    name:'No Description 橘',
                    layout:'no_description_warning',
                    position:'alert/noDescriptionAlert'
                },
                {
                    name:'No Description 紅',
                    layout:'no_description_error',
                    position:'alert/noDescriptionAlert'
                },
                {
                    name:'No Description 灰',
                    layout:'no_description_infogrey',
                    position:'alert/noDescriptionAlert'
                },
                {
                    name:'Message',
                    layout:'message',
                    position:'element-plus'
                },
                {
                    name:'Notification',
                    layout:'notification',
                    position:'alert/notification'
                },
            ]
        },
        {
            title:'Collapse',
            items:[
                {
                    name:'collapse',
                    layout:'collapse_paragraph',
                    position:'collapse/collapse'
                }
            ]
        },
        {
            title:'Steps',
            items:[
                {
                    name:'Horizontal Steps',
                    layout:'horizontal_step',
                    position:'steps/step'
                },
                {
                    name:'One Layer',
                    layout:'vertical_step_for_no_child',
                    position:'steps/step'
                },
                {
                    name:'Two Layer',
                    layout:'vertical_step_for_multi_child',
                    position:'steps/step'
                }
            ]
        },
        {
            title:'Chart',
            items:[
                {
                    name:'Line Chart',
                    layout:'line_chart',
                    position:'chart/line_chart'
                },
                {
                    name:'Donut Chart',
                    layout:'donut_chart',
                    position:'chart/donut_chart'
                }
            ]
        },
        {
            title:'Carousel',
            items:[
                {
                    name:'carousel',
                    layout:'carousel',
                    position:'carousel/carousel'
                }
            ]
        },
        {
            title:'Scrollspy',
            items:[
                {
                    name:'scrollspy',
                    layout:'scrollspy',
                    position:'scrollspy/scrollspy'
                }
            ]
        },
        {
            title:'Svg',
            items:[
                {
                    name:'Svg',
                    layout:'svg_icon',
                    position:'assets/svg'
                },
            ]
        },
    ]);

    const setChoseComponent = (x) => {
        chose.selected = x;
        const e = document.getElementById(x);
        e.scrollIntoView({behavior:'smooth',block:'center'});
    }

</script>