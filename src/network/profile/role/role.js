import { request } from '@/network/request'

const baseUrl = '/base'

export function getRoleList (formData) {
  return request({
    url: baseUrl + '/roles',
    method: 'get',
    params: {
      doFlag: formData.doFlag
    }
  })
}
