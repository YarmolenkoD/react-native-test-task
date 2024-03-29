import { Alert } from 'react-native'

import { IUser } from '@types'
import { ERROR_MESSAGE } from '@constants'
import { setUserData, store } from '@redux-store'

const formatResponse = (response: any): IUser => {
  return {
    id: response.id,
    name: response.name,
    email: response.email ?? null,
    picture: response?.picture?.data?.url ?? null,
  }
}

export const GoogleService = {
  async getUserInfo (token = '') {
    if (!token) return

    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const result = await response.json()

      store.dispatch(setUserData(formatResponse(result)))

      return result
    } catch (error) {
      Alert.alert(ERROR_MESSAGE)
      return null
    }
  }
}
