<h1 align="center">
  <a href="https://tomoyart.github.io/Easy_Eat/dist/#/">
    <img src="https://icons-for-free.com/iconfiles/png/512/dinner+eat+eating+food+kitchen+restaurant+icon-1320086191755611454.png"
         alt="Easy Eat"
         width="200">
  </a>
  <br>
  Easy Eat
  <br>
</h1>

<h4 align="center">
  電商網站設計：Vue.js 開發
</h4>

<p align="center">
  <a  href="https://tomoyart.github.io/Easy_Eat/dist/#/">
    <img src="https://img.shields.io/badge/Demo-EasyEat-green">
  </a>
</p>

<p align="center">
  <a href="#作品介紹">作品介紹</a> •
  <a href="#架設環境">架設環境</a> •
  <a href="#檔案結構">檔案結構</a> •
  <a href="#使用套件">使用套件</a>
</p>

<img src="https://i.imgur.com/dcyPmhE.jpg">
<h4>
  <a href="https://tomoyart.github.io/Easy_Eat/dist/#/">Demo</a>
</h4>


## 作品介紹

### 使用技術
- Vue.js
  - Vue Router 管理路由
  - axios 串接 API
  - vee-validate 驗證表格
- CSS
  - 手刻設計響應式 RWD
  - Sass/SCSS

### 網站特色

* 本店商品頁面
- 依據使用者需求顯示各種營養成分，方便瀏覽與篩選。

![Products nutrition imgur](https://i.imgur.com/sri4BdB.gif)

* 超值優惠頁面
- 透過拼圖遊戲，既可享受遊戲帶來的娛樂，也能同時獲得價格折扣的優惠券。

![Coupon jigsaw puzzle game imgur](https://i.imgur.com/SZP74Dc.gif)

* 付款資訊頁面
- 用戶填寫表單時，透過可翻轉的信用卡圖示，不但可以再次確認填寫的信用卡資訊，還能增添一點新穎感。

![Credit Card imgur](https://i.imgur.com/4cdEvgy.gif)

## 架設環境

- 使用 Github Pages 搭配後端 API 建置網站。

## 檔案結構
```
    src
    ├── assets
    │   ├── json                 
    │   │     └── areaList.json               # 全台縣市與區域資料
    │   │ 
    │   ├── scss
    │         ├── base                        # CSS Reset 與 複用樣式
    │         ├── components
    │         │     ├── adminPages                # 後台元件scss
    │         │     └── userPages                 # 前台元件scss
    │         │
    │         ├── helpers                     # RWD響應式斷點的mixin檔
    │         ├── pages              
    │         │     ├── adminPages                # 後台頁面scss
    │         │     └── userPages                 # 前台頁面scss
    │         │
    │         └── all.scss                    # scss的編譯進入點
    │   
    │   
    │
    ├── components
    │   ├── adminPages                    # 後台元件
    │   ├── userPages                     # 前台元件
    │   ├── Toast.vue                     # 前後台的使用者回饋訊息模板
    │   └── ToastMessages.vue             # 前後台的使用者回饋訊息容器
    │
    ├── methods
    │   ├── emitter.js                    # 導入並匯出emitter套件
    │   ├── filters.js                    # 創建並匯出商品價格的千分號方法
    │   └── pushMessageState.js           # 處理使用者回饋訊息的狀態
    │
    ├── mixins
    │   ├── adminPages                    # 後台mixins
    │   ├── userPages                     # 前台mixins
    │   └── LoadingConfiguration.js       # Loading轉場的mixins
    │
    ├── router
    │   └── index.js                      # 網站的路由控制
    │   
    └── views
        ├── adminPages                    # 後台頁面
        ├── userPages                     # 前台頁面
        ├── AdminPage.vue                 # 後台版型
        ├── HomePage.vue                  # 前台版型
        └── LoginPage.vue                 # 登入頁面
 ```
    
## 使用套件

- [vue-router](https://github.com/vuejs/vue-router)
- [vee-validate](https://github.com/logaretm/vee-validate)
- [axios](https://github.com/axios/axios)
- [vue-axios](https://github.com/imcvampire/vue-axios)
- [bootstrap-icons](https://github.com/twbs/icons)
- [mitt](https://github.com/developit/mitt)
- [smoothscroll](https://github.com/iamdustan/smoothscroll)
- [vue-sweetalert2](https://github.com/avil13/vue-sweetalert2)
- [vue3-loading-overlay](https://github.com/moyoujun/vue3-loading-overlay)
