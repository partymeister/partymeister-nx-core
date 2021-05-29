import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Guests
   */
  {
    path: '/admin/partymeister-core/guests',
    name: 'admin.partymeister-core.guests',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title:
        'partymeister-core.guests.guests',
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-core/views/admin/guests/index.vue'
      ),
  },
  {
    path: '/admin/partymeister-core/guests/create',
    name: 'admin.partymeister-core.guests.create',
    meta: {
      title:
        'partymeister-core.guests.guests',
      breadcrumbs: [
        {
          route: 'admin.partymeister-core.guests',
          name: 'partymeister-core.guests.guests',
        },
        {
          name: 'partymeister-core.guests.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-core/views/admin/guests/edit.vue'
      ),
  },
  {
    path: '/admin/partymeister-core/guests/edit/:id',
    name: 'admin.partymeister-core.guests.edit',
    meta: {
      title:
        'partymeister-core.guests.guests',
      breadcrumbs: [
        {
          route: 'admin.partymeister-core.guests',
          name: 'partymeister-core.guests.guests',
        },
        {
          name: 'partymeister-core.guests.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        'partymeister-core/views/admin/guests/edit.vue'
      ),
  },
]

export default routes
