// 第三方套件
import { createApp } from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email, min, alpha_num, digits, regex } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// 自定義的模組
import App from './App.vue'
import router from './router'
import currency from './methods/filters';
import $httpMessageState from './methods/pushMessageState';

// 啟用vee-validate設定
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('alpha_num', alpha_num);
defineRule('digits', digits);
defineRule('regex', regex);
configure({
    generateMessage: localize({ zh_TW: zhTW }),
    validateOnInput: true,
});
setLocale('zh_TW'); // 將預設語系改為 中文字 (避免沒有啟用到)

// 全域設定
const app = createApp(App);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.config.globalProperties.$filters = { currency };
app.config.globalProperties.$httpMessageState = $httpMessageState;
app.component('Loading', Loading);
app.use(VueSweetalert2);
app.use(VueAxios, axios);
app.use(router);
app.mount('#app');
