import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'
          ),
      },
      {
        path: '/theme',
        name: 'Theme',
        redirect: '/theme/typography',
      },
      {
        path: '/theme/colors',
        name: 'Colors',
        component: () => import('@/views/theme/Colors.vue'),
        meta: { layout: 'auth' },
      },  
      {
        path: '/theme/cliente',
        name: 'Cliente',
        component: () => import('@/views/theme/Cliente.vue'),
        meta: { required_auth: true },
      },  
      {
        path: '/theme/empresa',
        name: 'Empresa',
        component: () => import('@/views/theme/Empresa.vue'),
        meta: { required_auth: true },
      }, 
      {
        path: '/theme/empleado',
        name: 'Empleado',
        component: () => import('@/views/theme/Empleado.vue'),
        meta: { required_auth: true },
      },    
      {
        path: '/theme/proveedor',
        name: 'Proveedor',
        component: () => import('@/views/theme/Proveedor.vue'),
        meta: { required_auth: true },
      },  
      {
        path: '/theme/producto',
        name: 'Producto',
        component: () => import('@/views/theme/Producto.vue'),
        meta: { required_auth: true },
      }, 
      {
        path: '/theme/venta',
        name: 'Venta',
        component: () => import('@/views/theme/Venta.vue'),
        meta: { required_auth: true },
      }, 
      {
        path: '/theme/compra',
        name: 'Compra',
        component: () => import('@/views/theme/Compra.vue'),
        meta: { required_auth: true },
      }, 
      {
        path: '/theme/typography',
        name: 'Typography',
        component: () => import('@/views/theme/Typography.vue'),
        meta: { layout: 'auth' },
      },
      {
        path: '/base',
        name: 'Base',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/base/breadcrumbs',
        children: [
          {
            path: '/base/accordion',
            name: 'Accordion',
            component: () => import('@/views/base/Accordion.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/base/breadcrumbs',
            name: 'Breadcrumbs',
            component: () => import('@/views/base/Breadcrumbs.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/base/cards',
            name: 'Cards',
            component: () => import('@/views/base/Cards.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/base/carousels',
            name: 'Carousels',
            component: () => import('@/views/base/Carousels.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/base/collapses',
            name: 'Collapses',
            component: () => import('@/views/base/Collapses.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/base/list-groups',
            name: 'List Groups',
            component: () => import('@/views/base/ListGroups.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/base/navs',
            name: 'Navs',
            component: () => import('@/views/base/Navs.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/base/paginations',
            name: 'Paginations',
            component: () => import('@/views/base/Paginations.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/base/placeholders',
            name: 'Placeholders',
            component: () => import('@/views/base/Placeholders.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/base/popovers',
            name: 'Popovers',
            component: () => import('@/views/base/Popovers.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/base/progress',
            name: 'Progress',
            component: () => import('@/views/base/Progress.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/base/spinners',
            name: 'Spinners',
            component: () => import('@/views/base/Spinners.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/base/tables',
            name: 'Tables',
            component: () => import('@/views/base/Tables.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/base/tooltips',
            name: 'Tooltips',
            component: () => import('@/views/base/Tooltips.vue'),
            meta: { layout: 'auth' },
          },
        ],
      },
      {
        path: '/buttons',
        name: 'Buttons',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/buttons/standard-buttons',
        children: [
          {
            path: '/buttons/standard-buttons',
            name: 'Buttons',
            component: () => import('@/views/buttons/Buttons.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/buttons/dropdowns',
            name: 'Dropdowns',
            component: () => import('@/views/buttons/Dropdowns.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/buttons/button-groups',
            name: 'Button Groups',
            component: () => import('@/views/buttons/ButtonGroups.vue'),
            meta: { layout: 'auth' },
          },
        ],
      },
      {
        path: '/forms',
        name: 'Forms',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/forms/form-control',
        children: [
          {
            path: '/forms/form-control',
            name: 'Form Control',
            component: () => import('@/views/forms/FormControl.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/forms/select',
            name: 'Select',
            component: () => import('@/views/forms/Select.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/forms/checks-radios',
            name: 'Checks & Radios',
            component: () => import('@/views/forms/ChecksRadios.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/forms/range',
            name: 'Range',
            component: () => import('@/views/forms/Range.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/forms/input-group',
            name: 'Input Group',
            component: () => import('@/views/forms/InputGroup.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/forms/floating-labels',
            name: 'Floating Labels',
            component: () => import('@/views/forms/FloatingLabels.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/forms/layout',
            name: 'Layout',
            component: () => import('@/views/forms/Layout.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/forms/validation',
            name: 'Validation',
            component: () => import('@/views/forms/Validation.vue'),
            meta: { layout: 'auth' },
          },
        ],
      },
      {
        path: '/charts',
        name: 'Charts',
        component: () => import('@/views/charts/Charts.vue'),
        meta: { layout: 'auth' },
      },
      {
        path: '/icons',
        name: 'Icons',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/icons/coreui-icons',
        children: [
          {
            path: '/icons/coreui-icons',
            name: 'CoreUI Icons',
            component: () => import('@/views/icons/CoreUIIcons.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/icons/brands',
            name: 'Brands',
            component: () => import('@/views/icons/Brands.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/icons/flags',
            name: 'Flags',
            component: () => import('@/views/icons/Flags.vue'),
            meta: { layout: 'auth' },
          },
        ],
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/notifications/alerts',
        children: [
          {
            path: '/notifications/alerts',
            name: 'Alerts',
            component: () => import('@/views/notifications/Alerts.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/notifications/badges',
            name: 'Badges',
            component: () => import('@/views/notifications/Badges.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/notifications/modals',
            name: 'Modals',
            component: () => import('@/views/notifications/Modals.vue'),
            meta: { layout: 'auth' },
          },
          {
            path: '/notifications/toasts',
            name: 'Toasts',
            component: () => import('@/views/notifications/Toasts.vue'),
            meta: { layout: 'auth' },
          },
        ],
      },
      {
        path: '/widgets',
        name: 'Widgets',
        component: () => import('@/views/widgets/Widgets.vue'),
        meta: { layout: 'auth' },
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
        meta: { layout: 'auth' },
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
        meta: { layout: 'auth' },
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
        meta: { layout: 'auth' },
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
        meta: { layout: 'auth' },
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/login'),
        meta: { layout: 'auth' },
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/auth/register'),
        meta: { layout: 'auth' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.layout && to.meta.layout == 'auth') {
      store.commit('setLayout', 'auth');
  } else {
      store.commit('setLayout', 'app');
  }

  if (to.meta && to.meta.required_auth && !localStorage.getItem('token')) {
      console.log('to.meta: ', to.meta);

      router.push({ name: 'login' });
  }
  next(true);
});

export default router
