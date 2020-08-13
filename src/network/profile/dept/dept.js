import { request } from '@/network/request'

const baseUrl = '/base'

// 部门列表
export function getDeptList (current, pageSize, searchData) {
  return request({
    url: baseUrl + '/depts',
    method: 'get',
    params: {
      current: current,
      pageSize: pageSize,
      'dept.deptName': searchData.deptName,
      'dept.deptCode': searchData.deptCode,
      'dept.doFlag': searchData.doFlag
    }
  })
}

// 部门新增
export function addDept (formData) {
  return request({
    url: baseUrl + '/depts',
    method: 'post',
    data: {
      deptName: formData.deptName,
      deptCode: formData.deptCode,
      deptContext: formData.deptContext,
      doFlag: formData.doFlag ? 1 : 0,
      levelNo: formData.levelNo
    }
  })
}

// 获取部门详情
export function getDeptOne (deptId) {
  return request({
    url: baseUrl + '/depts/' + deptId,
    method: 'get'
  })
}

// 编码是否存在
export function codeValidate (code) {
  return request({
    url: baseUrl + '/depts/code/' + code,
    method: 'get'
  })
}
