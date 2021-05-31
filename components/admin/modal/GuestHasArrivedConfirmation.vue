<template>
  <div
    class="modal fade"
    :id="'admin-modal-' + record.id"
    tabindex="-1"
    data-bs-keyboard="false"
    data-bs-backdrop="static"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $t('partymeister-core.guests.mark_as_arrived') }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div
            class="partymeister-core-badge-text"
            v-if="record.comment !== ''"
            v-html="'<p>' + record.comment + '</p>'"
          ></div>
          <div class="alert alert-info">
            <p
              class="partymeister-core-badge-alert"
              v-if="record.has_badge"
              v-html="
                $t('partymeister-core.guests.badge_info_vue', {
                  name: record.name,
                })
              "
            ></p>
            <p
              class="partymeister-core-badge-alert"
              v-if="record.ticket_code !== ''"
              v-html="
                $t('partymeister-core.guests.ticket_code_info', {
                  ticket_code: record.ticket_code,
                })
              "
            ></p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            v-on:click="cancel"
            type="button"
            class="btn bg-gradient-secondary"
            data-bs-dismiss="modal"
          >
            {{ $t('global.no') }}
          </button>
          <button
            v-on:click="confirm"
            type="button"
            class="btn bg-gradient-primary"
            data-bs-dismiss="modal"
          >
            {{ $t('global.yes') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Modal } from 'bootstrap'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GuestHasArrivedConfirmation',
  props: {
    record: Object,
    active: Boolean,
  },
  watch: {
    active(newValue) {
      const modal = new Modal(
        document.getElementById('admin-modal-' + this.record.id),
        { keyboard: false, backdrop: 'static' }
      )

      if (newValue) {
        modal.show()
      } else {
        modal.hide()
      }
    },
  },
  computed: {
    body(): string {
      return this.record.name
    },
  },
  emits: ['cancel', 'confirm'],
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
    cancel() {
      this.showModal = false
      this.$emit('cancel')
    },
    confirm() {
      this.showModal = false
      this.$emit('confirm', true)
    },
  },
})
</script>
<style lang="scss">
.partymeister-core-badge-alert {
  margin-bottom: 0;
  padding: 1rem 0;
  font-size: 20px;
  color: white;
}
.partymeister-core-badge-text {
  white-space: pre-line;
}
</style>
