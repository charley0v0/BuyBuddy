//正規表達驗證
// <el-form> rules {pattern: }

//手機號碼
export const reg_mobile = /^[09]{2}[0-9]{8}$/;
//信箱
export const reg_email = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//自然人憑證檢核
export const reg_personCertify = /^[A-Z]{2}[0-9]{14}$/;
//特殊字元
export const reg_strangeText = /\!|@|#|\$|%|\^|&|\*/;
//包含英文+數字
export const reg_enNumber = /^(?=.*[a-zA-Z])(?=.*\d).+$/