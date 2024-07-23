import { useMutation, useQueryClient } from '@tanstack/react-query'
import jsonpatch from 'fast-json-patch'

import type { User } from '@shared/types'

import { useUser } from './useUser'

import { axiosInstance, getJWTHeader } from '@/axiosInstance'
import { toast } from '@/components/app/toast'
import { queryKeys } from '@/react-query/constants'

export const MUTATION_KEY = 'patch-user'

/**
 * For when we need a server function
 *
 * @async
 * @param {(User | null)} newData
 * @param {(User | null)} originalData
 * @returns {Promise<User | null>}
 */
async function patchUserOnServer(
  newData: User | null,
  originalData: User | null
): Promise<User | null> {
  if (!newData || !originalData) return null
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData)

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData.token)
    }
  )
  return data.user
}

export function usePatchUser() {
  const { user, updateUser } = useUser()
  const queryClient = useQueryClient()

  const { mutate: patchUser } = useMutation({
    mutationKey: [MUTATION_KEY],
    mutationFn: (newData: User) => patchUserOnServer(newData, user),
    onSuccess: (userData) => {
      toast({ title: 'User updated!' })
      updateUser(userData)
    },
    onSettled: async () =>
      await queryClient.invalidateQueries({ queryKey: [queryKeys.user] })
  })

  return patchUser
}
