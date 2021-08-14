import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'Home',
    },
  },
  {
    path: '/',
    name: '',
    component: () => import('../views/HomePage.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/userPages/Home.vue'),
      },
      {
        path: '/userproducts',
        name: 'UserProducts',
        component: () => import('../views/userPages/Products.vue'),
      },
      {
        path: '/usercoupon',
        name: 'UserCoupon',
        component: () => import('../views/userPages/Coupon.vue'),
      },
      {
        path: '/userproduct/:id',
        name: 'UserProduct',
        component: () => import('../views/userPages/Product.vue'),
      },
      {
        path: '/usershoppingcart',
        name: 'UserShoppingCart',
        component: () => import('../views/userPages/ShoppingCart.vue'),
      },
      {
        path: '/userorderform',
        name: 'UserOrderForm',
        component: () => import('../views/userPages/OrderForm.vue'),
      },
      {
        path: '/usercheckout/:orderId',
        name: 'UserCheckout',
        component: () => import('../views/userPages/Checkout.vue'),
      },
      {
        path: '/userpayment/:orderId',
        name: 'UserPayment',
        component: () => import('../views/userPages/Payment.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/adminhome',
    name: '',
    component: () => import('../views/AdminPage.vue'),
    children: [
      {
        path: '/adminhome',
        name: 'AdminHome',
        component: () => import('../views/adminPages/Home.vue'),
      },
      {
        path: '/adminproducts',
        name: 'AdminProducts',
        component: () => import('../views/adminPages/Products.vue'),
      },
      {
        path: '/admincoupons',
        name: 'AdminCoupons',
        component: () => import('../views/adminPages/Coupons.vue'),
      },
      {
        path: '/adminorders',
        name: 'AdminOrders',
        component: () => import('../views/adminPages/Orders.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
