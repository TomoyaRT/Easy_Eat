module.exports = {
  root: true,
  env: {
    node: true
  },
  // 擴展
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  // 解析器選項
  parserOptions: {
    parser: 'babel-eslint'
  },
  // 規則
  rules: {
    // off 或 0     ---> 關閉規則
    // warn 或 1    ---> 開啟規則，使用警告級別的錯誤
    // error 或 2   ---> 開啟規則，使用錯誤級別的錯誤
    // no-console   ---> 禁用 console
    // no-debugger  ---> 禁用 debugger
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
