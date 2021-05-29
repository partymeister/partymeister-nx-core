import axios from 'axios'
import baseGrid from 'motor-core/grids/baseGrid'
import modelRepository from 'partymeister-core/api/guest'

export default function guestGrid() {
    const repository = modelRepository(axios)

    const { rows, meta, refreshRecords, handleCellEvent } = baseGrid(
        repository,
        'partymeister-core.guests'
    )

    return { rows, meta, refreshRecords, handleCellEvent }
}
