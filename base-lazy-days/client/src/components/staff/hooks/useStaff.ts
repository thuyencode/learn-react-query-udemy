import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import type { Staff } from '@shared/types'

import { filterByTreatment } from '../utils'

import { axiosInstance } from '@/axiosInstance'
import { queryKeys } from '@/react-query/constants'

// query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff')
  return data
}

export function useStaff() {
  // for filtering staff by treatment
  const [filter, setFilter] = useState('all')
  const fallback: Staff[] = []

  const selectFn = useCallback(
    (unfilteredStaff: Staff[]) => {
      if (filter === 'all') return unfilteredStaff

      return filterByTreatment(unfilteredStaff, filter)
    },
    [filter]
  )

  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: selectFn
  })

  return { staff, filter, setFilter }
}
