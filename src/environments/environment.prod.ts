/* eslint-disable @typescript-eslint/naming-convention */
export const environment = {
  firebase: {
    apiKey: "AIzaSyDrZpLnEWCzbAB2iXM1uizR8J9Z8iP414c",
    authDomain: "amigao-fcm.firebaseapp.com",
    projectId: "amigao-fcm",
    storageBucket: "amigao-fcm.appspot.com",
    messagingSenderId: "139473613556",
    appId: "1:139473613556:web:84143a5ba3fc3381bea4a1",
    measurementId: "G-DW9N8LQLDQ"
  },
  production: true,
  API_BASE_PATH: 'https://strapi-wkfc.onrender.com/api',
  BASE_PATH: 'https://strapi-wkfc.onrender.com',
  MEDUSA_API_BASE_PATH: 'https://amigao-medusa-api.onrender.com',
  MEDUSA_API_BASE_PATH_DEV: 'https://amigao-medusa-api.onrender.com/',
  instrumentationKey: null,
  STRIPE_KEY: 'pk_test_2qqvb6DTqKondL46mnEjZ68e',
  populate: '?populate=*',
  todo: '/todo',
  products: '/products',
  medusa_store_login_customer: '/store/auth/',
  medusa_store_register_customer: '/store/customers',
  medusa_store_products: '/store/products',
  medusa_regions: '/store/regions/',
  create_medusa_cart: '/store/carts/',
  medusa_store: '/admin/store/',
  SERVER_URL: 'https://strapi-wkfc.onrender.com'
};
