<template>
  <AdminCommonForm
    back-route="admin.partymeister-core.schedules"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Basic information
    </h6>
    <div class="row">
      <div class="col-md-12">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('partymeister-core.schedules.name')"
          :value="model.name"
        ></FormsInputField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from 'motor-core/components/admin/common/Form.vue'
import FormsInputField from 'motor-core/components/forms/InputField.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import scheduleForm from 'partymeister-core/forms/scheduleForm'

export default defineComponent({
  name: 'admin-partymeister-core-schedules-create',
  components: {
    AdminCommonForm,
    FormsInputField,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const { model, getData, onSubmit } = scheduleForm()

    // Set default action title
    const title = ref(t('partymeister-core.schedules.new'))

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('partymeister-core.schedules.edit')
      getData(id)
    }

    return {
      model,
      title,
      onSubmit,
    }
  },
})
</script>
