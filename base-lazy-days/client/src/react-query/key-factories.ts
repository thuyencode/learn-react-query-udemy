import { queryKeys } from './constants'

export function generateUserKey(userId: number) {
  return [queryKeys.user, { userId }]
}

export function generateUserAppointmentKey(userId: number) {
  return [queryKeys.appointments, queryKeys.user, { userId }]
}
