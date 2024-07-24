import { AppointmentDateMap } from '@shared/types'

import { useAppointments } from '../hooks/useAppointments'

import {
  act,
  createQueryClientWrapper,
  renderHook,
  waitFor
} from '@/test-utils'

const getAppointmentCount = (appointments: AppointmentDateMap) =>
  Object.values(appointments).reduce(
    (runningCount, appointmentsOnDate) =>
      runningCount + appointmentsOnDate.length,
    0
  )

test('filter appointments by availability', async () => {
  const { result } = renderHook(() => useAppointments(), {
    wrapper: createQueryClientWrapper()
  })

  await waitFor(() =>
    expect(getAppointmentCount(result.current.appointments)).toBeGreaterThan(0)
  )

  const filteredAppointmentsLength = getAppointmentCount(
    result.current.appointments
  )

  act(() => {
    result.current.setShowAll(true)
  })

  await waitFor(() =>
    expect(getAppointmentCount(result.current.appointments)).toBeGreaterThan(
      filteredAppointmentsLength
    )
  )
})
