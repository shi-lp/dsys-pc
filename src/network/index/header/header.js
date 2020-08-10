import { request } from '@/network/request'

export function addCategory () {
  return request({
    url: '/goods/categories',
    method: 'get',
    params: {
    }
  })
}
