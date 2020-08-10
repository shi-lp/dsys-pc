import { request } from '@/network/request'

export function getModels () {
  return request({
    url: '/base/models',
    method: 'get',
    params: {
    }
  })
}
