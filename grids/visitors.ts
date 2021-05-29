import axios from 'axios'
import visitorRepository from '../api/visitors'
import baseGrid from 'motor-core/grids/baseGrid'

export default function eventsGrid() {
  const repository = visitorRepository(axios)

  const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
    repository,
    'partymeister-core.visitors'
  )

  return { rows, meta, refreshRecords, handleCellEvent }
}
