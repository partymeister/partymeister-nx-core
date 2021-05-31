<template>
  <div class="d-inline partymeister-core-ticket-scanner">
    <button @click="openTicketScanner" class="btn btn-sm btn-primary me-2">
      Ticket scanner
    </button>
    <div
      class="modal fade"
      :id="'admin-modal-guest-ticket-scanner'"
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
              {{ $t('partymeister-core.guests.scan_tickets') }}
            </h5>
            <button
              @click="cancel"
              type="button"
              class="btn-close"
              style="color: black"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">x</span>
            </button>
          </div>
          <div class="modal-body">
            <input
              v-model="code"
              id="ticket-code-input"
              class="form-control form-control-lg"
              type="text"
              placeholder="ABCD-DEFG"
              @keypress.enter="submit"
            />
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            <div v-if="record" class="alert alert-success">
              {{ record.ticket_code }} ({{ record.ticket_type }})
            </div>
            <div v-if="record" class="card well">
              <div class="card-body">
                {{ record.name }}
                <span v-if="record.company">({{ record.company }})</span>
              </div>
            </div>
            <div
              v-if="record && (record.has_badge || record.comment)"
              class="alert alert-info"
            >
              <p class="mb-0" v-if="record.has_badge">
                <b>
                  {{
                    $t('partymeister-core.guests.badge_info', {
                      name: record.name,
                    })
                  }}
                </b>
              </p>
              <p class="mb-0" v-if="record.comment">
                {{ record.comment }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Modal } from 'bootstrap'
import { defineComponent } from 'vue'
import scanTicketRepository from 'partymeister-core/api/guest/scanTicket'
import axios from 'axios'

export default defineComponent({
  name: 'GuestTicketScanner',
  watch: {
    showModal(newValue) {
      const modal = new Modal(
        document.getElementById('admin-modal-guest-ticket-scanner'),
        { keyboard: false, backdrop: 'static' }
      )

      if (newValue) {
        modal.show()
        setTimeout(() => {
          document.getElementById('ticket-code-input').focus()
        }, 500)
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
  data() {
    return {
      showModal: false,
      code: '',
      repository: null,
      errorMessage: '',
      record: null,
    }
  },
  mounted() {
    this.repository = scanTicketRepository(axios)
  },
  methods: {
    openTicketScanner() {
      this.showModal = true
    },
    cancel() {
      this.showModal = false
      // this.$emit('cancel')
    },

    submit() {
      this.errorMessage = ''
      this.record = null
      // Check the code from the API
      this.repository
        .post({ ticket_code: this.code })
        .then((response) => {
          this.record = response.data.record
        })
        .catch((error) => {
          this.errorMessage = this.$t(
            error.response.data.error,
            error.response.data.replace
          )
        })
    },
  },
})
</script>
<style lang="scss">
.partymeister-core-ticket-scanner {
  .alert,
  .card {
    margin-top: 1rem;
    text-align: center;
    white-space: pre-line;
  }
  .alert {
    color: white;
  }
}
</style>
