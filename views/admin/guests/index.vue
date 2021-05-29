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
import CellBooleanToggle from 'motor-core/components/admin/cell/BooleanToggle.vue'
import grid from 'partymeister-core/grids/guestGrid'

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
        name: t('motor-backend.categories.name'),
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
          { name: 'CellBooleanToggle', options: { prop: 'has_arrived' } },
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

    // Define filters for grid
    const filters = ref([{ name: 'SearchFilter', options: {} }])

    const loadComponents = <any>[
      {
        name: 'CellBooleanToggle',
        object: CellBooleanToggle,
      },
    ]

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
    }
  },
})
</script>
