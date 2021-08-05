<template>
  <div class="user-page-login">
    <!-- 預設為 手機版 -->
    <div class="login-container">
      <!-- 切換為 電腦版 -->
      <div class="desktop-login-container">
        <!-- 返回首頁 -->
        <div class="home-page-rink-container">
          <router-link to="/"><i class="bi bi-arrow-left"></i></router-link>
          <router-link to="/"
            ><img src="@/../public/images/Logo.png" alt="網站的Logo"
          /></router-link>
        </div>
        <!-- 登入表單 -->
        <div class="login-verification-container">
          <h1 class="login-title">歡迎來到Easy Eat !</h1>
          <!-- 表單驗證 -->
          <Form @submit="signIn" v-slot="{ isSubmitting }">
            <Field
              class="user-account-container"
              name="email"
              type="email"
              rules="email|required"
              v-slot="{ field, meta }"
            >
              <label for="email" class="user-account-title">會員帳號</label>
              <div class="user-account-input-container">
                <input
                  id="email"
                  name="email"
                  type="email"
                  class="user-account-input"
                  :class="{
                    'is-invalid': !meta.valid && meta.touched,
                    'is-valid': meta.valid,
                  }"
                  v-model="user.username"
                  v-bind="field"
                  autocomplete="on"
                />
                <i class="bi bi-check-circle-fill" v-if="meta.valid"></i>
                <i
                  class="bi bi-x-circle-fill"
                  v-if="!meta.valid && meta.touched"
                ></i>
              </div>

              <error-message
                name="email"
                class="invalid-feedback"
              ></error-message>
            </Field>
            <Field
              class="user-password-container"
              name="password"
              type="password"
              rules="alpha_num|required|min:8"
              v-slot="{ field, meta }"
            >
              <label for="password" class="user-password-title">會員密碼</label>
              <div class="user-password-input-container">
                <input
                  id="password"
                  name="password"
                  type="password"
                  class="user-password-input"
                  :class="{
                    'is-invalid': !meta.valid && meta.touched,
                    'is-valid': meta.valid,
                  }"
                  v-model="user.password"
                  v-bind="field"
                  autocomplete="on"
                />
                <i class="bi bi-check-circle-fill" v-if="meta.valid"></i>
                <i
                  class="bi bi-x-circle-fill"
                  v-if="!meta.valid && meta.touched"
                ></i>
              </div>

              <error-message
                name="password"
                class="invalid-feedback"
              ></error-message>
            </Field>
            <button
              type="submit"
              class="user-login-btn"
              :disabled="isSubmitting"
            >
              登入
            </button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
// 動態背景
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  background-image: url("../../public/images/login-bg.svg");
  background-position: center;
  background-repeat: repeat;
  background-origin: border-box;
  animation: slide 30s linear alternate infinite,
    changeColor 7s linear alternate infinite;

  @keyframes changeColor {
    from {
      background-color: #e8eaff;
    }
    to {
      background-color: #fcf6dd;
    }
  }
  @keyframes slide {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 100% -100%;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    // 驗證使用者，是否維持登入的狀態。
    loginVerification() {
      // 取出Token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)ecToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      // 發送API時，自動夾帶Token在Header裡面。
      this.$http.defaults.headers.common.Authorization = token;
      // 發送API，驗證是否維持登入狀態。
      const api = `${process.env.VUE_APP_API}/api/user/check`;
      this.$http.post(api, this.user).then((res) => {
        // 如屬未登入狀態，即轉址到Login頁面。
        if (res.data.success) {
          this.$router.push({name: 'AdminHome'});
        } else {
          this.$swal.fire("請重新登入");
          this.$router.push({ name: 'Login' })
        }
      });
    },
    // 登入功能
    signIn() {
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      // 發送API
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          // 取出Token Expired
          const { token, expired } = res.data;
          // 將Token Expired寫入瀏覽器的Cookie
          document.cookie = `ecToken=${token}; expires=${new Date(expired)};`;
          // 驗證通過，轉址到【後台】AdminProducts頁面
          this.$router.push({name: 'AdminHome'});
        } else {
          this.$swal.fire("管理者帳號或密碼有誤");
        }
      });
    },
  },
  created() {
    this.loginVerification(); // 先驗證，如通過則直接進入
  }
};
</script>
