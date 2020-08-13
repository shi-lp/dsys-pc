import { request } from '@/network/request'

const baseUrl = '/base'

// 获取角色列表
export function getRoleList (pageSize, current, formData) {
  return request({
    url: baseUrl + '/roles',
    method: 'get',
    params: {
      pageSize: pageSize,
      current: current,
      'role.doFlag': formData.doFlag,
      'role.roleCode': formData.roleCode,
      'role.roleName': formData.roleName,
      // 'role.belongSys': formData.belongSys,
      'role.deptId': formData.deptId
    }
  })
}

// 角色新增
export function addRole (formData, checks) {
  return request({
    url: baseUrl + '/roles',
    method: 'post',
    data: {

    }
  })
}

// 校验角色编码是否存在
export function validateCodeExist (code) {
  return request({
    url: baseUrl + '/roles/code/' + code,
    method: 'get'
  })
}

// 获取角色信息
export function getRoleOne (roleId) {
  return request({
    url: baseUrl + '/roles/' + roleId,
    method: 'get'
  })
}

export function getDeptOption () {
  return request({
    url: baseUrl + '/depts/options',
    method: 'get'
  })
}
