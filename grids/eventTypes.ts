import axios from 'axios'
import { useI18n } from 'vue-i18n'
import eventTypeRepository from '../api/eventTypes'
import baseGrid from 'motor-core/grids/baseGrid'

export default function eventTypesGrid() {
  // Load i18n module
  const { t } = useI18n()

  const repository = eventTypeRepository(axios)

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'partymeister-core.event_types'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
