<template>
  <AdminCommonGrid
    :name="$t('partymeister-core.guests.guests')"
    create-route="admin.partymeister-core.guests.create"
    :create-label="$t('partymeister-core.guests.new')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="guests"
    :loadComponents="loadComponents"
    :headerActions="headerActions"
    @submit="refreshRecords"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>

<script lang="ts">
import AdminCommonGrid from 'motor-core/components/admin/common/Grid.vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import EditButton from 'motor-core/components/admin/cell/EditButton.vue'
import DeleteButton from 'motor-core/components/admin/cell/DeleteButton.vue'
import CellGuestHasArrivedToggle from 'partymeister-core/components/admin/cell/GuestHasArrivedToggle.vue'
import ModalGuestTicketScanner from 'partymeister-core/components/admin/modal/GuestTicketScanner'
import grid from 'partymeister-core/grids/guestGrid'
import categoryRepository from 'motor-admin/api/category'
import axios from 'axios'

export default defineComponent({
  name: 'admin-partymeister-core.guests',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Define columns for grid
    const columns = ref([
      {
        name: t('motor-admin.categories.name'),
        prop: 'category.name',
      },
      {
        name: t('partymeister-core.guests.name'),
        prop: 'name',
      },
      {
        name: t('partymeister-core.guests.handle'),
        prop: 'handle',
      },
      {
        name: t('partymeister-core.guests.company'),
        prop: 'company',
      },
      {
        name: t('partymeister-core.guests.ticket_code'),
        prop: 'ticket_code',
      },
      {
        name: t('partymeister-core.guests.has_badge'),
        prop: 'has_badge',
        renderer: { type: 'boolean' },
      },
      {
        name: t('partymeister-core.guests.has_arrived'),
        prop: 'has_arrived',
        components: [
          {
            name: 'CellGuestHasArrivedToggle',
            options: { prop: 'has_arrived' },
          },
        ],
      },
      {
        name: '',
        prop: 'actions',
        columnStyle: 'width: 200px',
        rowWrapperClass: 'justify-content-end',
        components: [
          {
            name: 'EditButton',
            options: {
              route: 'admin.partymeister-core.guests.edit',
              name: t('global.edit'),
            },
          },
          { name: 'DeleteButton', options: { name: t('global.delete') } },
        ],
      },
    ])

    // Get catgories from api
    const categories = ref([])
    const categoryRepo = categoryRepository(axios)
    categoryRepo.index({}, '38').then((response) => {
      for (let i = 0; i < response.data.data.length; i++) {
        categories.value.push({
          name: response.data.data[i].name,
          value: response.data.data[i].id.toString(),
        })
      }
    })

    // Define filters for grid
    const filters = ref([
      { name: 'SearchFilter', options: {} },
      {
        name: 'SelectFilter',
        options: {
          parameter: 'category_id',
          emptyOption:
            t('global.filter') + ': ' + t('motor-admin.categories.category'),
          options: categories,
        },
      },
      {
        name: 'SelectFilter',
        options: {
          parameter: 'has_arrived',
          emptyOption:
            t('global.filter') +
            ': ' +
            t('partymeister-core.guests.has_arrived'),
          options: [
            { name: t('global.yes'), value: 1 },
            { name: t('global.no'), value: 0 },
          ],
        },
      },
    ])

    const loadComponents = <any>[
      {
        name: 'CellGuestHasArrivedToggle',
        object: CellGuestHasArrivedToggle,
      },
      {
        name: 'ModalGuestTicketScanner',
        object: ModalGuestTicketScanner,
      },
    ]

    const headerActions = <any>[{ name: 'ModalGuestTicketScanner' }]

    // WE START THE OUTSOURCED CODE HERE
    const { rows, meta, refreshRecords, handleCellEvent } = grid()
    return {
      columns,
      filters,
      rows,
      meta,
      refreshRecords,
      loadComponents,
      handleCellEvent,
      headerActions,
    }
  },
})
</script>
