<template>
  <AdminCommonForm
    back-route="admin.partymeister-core.guests"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Basic information
    </h6>
    <div class="row">
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('partymeister-core.guests.name')"
          :value="model.name"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="handle"
          id="handle"
          :label="$t('partymeister-core.guests.handle')"
          :value="model.handle"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="email"
          id="email"
          :label="$t('partymeister-core.guests.email')"
          :value="model.email"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="company"
          id="company"
          :label="$t('partymeister-core.guests.company')"
          :value="model.company"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="country"
          id="country"
          :label="$t('partymeister-core.guests.country')"
          :value="model.country"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsSelectField
          type="text"
          name="category_id"
          id="category_id"
          :label="$t('motor-backend.categories.category')"
          :value="model.category_id"
          :options="categories"
        ></FormsSelectField>
      </div>
    </div>
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Ticket information
    </h6>
    <div class="row">
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="ticket_code"
          id="ticket_code"
          :label="$t('partymeister-core.guests.ticket_code')"
          :value="model.ticket_code"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="ticket_type"
          id="ticket_type"
          :label="$t('partymeister-core.guests.ticket_type')"
          :value="model.ticket_type"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="ticket_order_number"
          id="ticket_order_number"
          :label="$t('partymeister-core.guests.ticket_order_number')"
          :value="model.ticket_order_number"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsCheckboxField
          type="text"
          name="ticket_code_scanned"
          id="ticket_code_scanned"
          :label="$t('partymeister-core.guests.ticket_code_scanned')"
          :value="model.ticket_code_scanned"
        ></FormsCheckboxField>
      </div>
    </div>
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Additional information
    </h6>
    <div class="row">
      <div class="col-md-6">
        <FormsCheckboxField
          type="text"
          name="has_badge"
          id="has_badge"
          :label="$t('partymeister-core.guests.has_badge')"
          :value="model.has_badge"
        ></FormsCheckboxField>
      </div>
      <div class="col-md-6">
        <FormsCheckboxField
          type="text"
          name="has_arrived"
          id="has_arrived"
          :label="$t('partymeister-core.guests.has_arrived')"
          :value="model.has_arrived"
        ></FormsCheckboxField>
      </div>
      <div class="col-md-6">
        <FormsStaticField
          type="text"
          name="arrived_at"
          id="arrived_at"
          :label="$t('partymeister-core.guests.arrived_at')"
          :value="model.arrived_at"
        ></FormsStaticField>
      </div>
      <div class="col-md-6">
        <FormsTextAreaField
          type="text"
          name="comment"
          id="comment"
          :label="$t('partymeister-core.guests.comment')"
          :value="model.comment"
        ></FormsTextAreaField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from 'motor-core/components/admin/common/Form.vue'
import FormsInputField from 'motor-core/components/forms/InputField.vue'
import FormsCheckboxField from 'motor-core/components/forms/CheckboxField.vue'
import FormsTextAreaField from 'motor-core/components/forms/TextAreaField.vue'
import FormsStaticField from 'motor-core/components/forms/StaticField.vue'
import FormsSelectField from 'motor-core/components/forms/SelectField.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import form from 'partymeister-core/forms/guestForm'
import categoryRepository from 'motor-backend/api/category'
import axios from 'axios'

export default defineComponent({
  name: 'admin-partymeister-core-guests-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    FormsCheckboxField,
    FormsTextAreaField,
    FormsStaticField,
    FormsSelectField,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const { model, getData, onSubmit } = form()

    // Set default action title
    const title = ref(t('partymeister-core.guests.new'))

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('partymeister-core.guests.edit')
      getData(id)
    }

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

    return {
      model,
      title,
      onSubmit,
      categories,
    }
  },
})
</script>
