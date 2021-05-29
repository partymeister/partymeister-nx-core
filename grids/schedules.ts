import axios from 'axios'
import scheduleRepository from '../api/schedules'
import baseGrid from 'motor-core/grids/baseGrid'

export default function schedulesGrid() {
  const repository = scheduleRepository(axios)

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'partymeister-core.schedules'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
