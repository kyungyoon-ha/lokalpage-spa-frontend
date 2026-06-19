import { useQuery } from '@tanstack/react-query'
import { servicesData, ServiceData } from '@/data/services'

export function useServices() {
  return useQuery<ServiceData[]>({
    queryKey: ['services'],
    queryFn: () => Promise.resolve(servicesData),
  })
}
