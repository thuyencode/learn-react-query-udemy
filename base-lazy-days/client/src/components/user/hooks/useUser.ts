import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import type { User } from '@shared/types'

import { useLoginData } from '@/auth/AuthContext'
import { axiosInstance, getJWTHeader } from '@/axiosInstance'
import { generateUserKey } from '@/react-query/key-factories'

// query function
async function getUser(userId: number, userToken: string) {
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${userId}`,
    {
      headers: getJWTHeader(userToken)
    }
  )

  return data.user
}

export function useUser() {
  const { userId, userToken } = useLoginData()

  const { data: user } = useQuery({
    queryKey: generateUserKey(userId, userToken),
    queryFn: async () => await getUser(userId, userToken),
    staleTime: Infinity,
    enabled: !!userId
  })

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    // TODO: update the user in the query cache
  }

  // meant to be called from useAuth
  function clearUser() {
    // TODO: reset user to null in query cache
  }

  return { user, updateUser, clearUser }
}
