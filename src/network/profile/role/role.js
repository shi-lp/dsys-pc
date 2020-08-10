import { request } from '@/network/request'

const baseUrl = '/base'

export function getRoleList (pageSize, current, formData) {
  console.log(formData)
  return request({
    url: baseUrl + '/roles',
    method: 'get',
    params: {
      pageSize: pageSize,
      current: current,
      'r.doFlag': formData.doFlag,
      'r.roleCode': formData.roleCode,
      'r.roleName': formData.roleName,
      // 'role.belongSys': formData.belongSys,
      'r.deptId': formData.deptId
    }
  })
}
