import { api } from './api'

export type PackageItem = {
  id: string
  title: string
  description: string
  price: number
  duration?: number | null
  imageUrl?: string | null
  isActive: boolean
}

export type PackagesResponse = {
  success: boolean
  message: string
  data: PackageItem[]
}

export async function getPackages() {
  const { data } = await api.get<PackagesResponse>('/packages', {
    params: {
      page: 1,
      limit: 20,
    },
  })

  return data.data
}