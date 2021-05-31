<template>
  <div class="inline mb-0 ms-1">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button
        @click="askForConfirmation(true)"
        type="button"
        class="btn btn-sm"
        :class="{ 'btn-primary': record[options.prop] }"
      >
        {{ $t('global.yes') }}
      </button>
      <button
        @click="askForConfirmation(false)"
        type="button"
        class="btn btn-sm"
        :class="{ 'btn-primary': !record[options.prop] }"
      >
        {{ $t('global.no') }}
      </button>
      <AdminModalGuestHasArrivedConfirmation
        :active="active"
        :record="record"
        @cancel="cancel"
        @confirm="confirm"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminModalGuestHasArrivedConfirmation from '../modal/GuestHasArrivedConfirmation.vue'

export default defineComponent({
  name: 'GuestHasArrivedToggle',
  props: {
    options: <any>Object,
    record: <any>Object,
    resource: String,
    index: Number,
  },
  components: {
    AdminModalGuestHasArrivedConfirmation,
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const active = ref(false)

    const askForConfirmation = (value: boolean) => {
      // Only show modal if state actually changes
      if (value === props.record[props.options.prop]) {
        return
      }

      // If the value is false we submit the request without showing the modal first

      if (value === false) {
        confirm(false)
        return
      }

      active.value = true
    }

    const cancel = () => {
      active.value = false
    }

    const confirm = (value: boolean) => {
      active.value = false
      if (value === props.record[props.options.prop]) {
        return
      }
      emit('submit', {
        component: 'UpdateRecord',
        record: props.record.id,
        property: props.options.prop,
        value: value,
        index: props.index,
      })
    }

    return { confirm, cancel, active, askForConfirmation }
  },
})
</script>
