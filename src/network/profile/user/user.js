import { request } from '@/network/request'

const baseUrl = '/base'

export function getUserList (pageSize, current, formData) {
  return request({
    url: baseUrl + '/users',
    method: 'get',
    params: {
      pageSize: pageSize,
      current: current,
      account: formData.account,
      userName: formData.userName,
      roleId: formData.roleId,
      deptId: formData.deptId,
      doFlag: formData.doFlag
    }
  })
}

export function loadRoleOptions () {
  return request({
    url: baseUrl + '/roles/option',
    method: 'get'
  })
}

export function loadDeptOptions () {
  return request({
    url: baseUrl + '/depts/option',
    method: 'get'
  })
}
