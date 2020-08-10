import { request } from '@/network/request'

const baseUrl = '/base'

// 获取数据字典树
export function getModel (pageSize, current) {
  return request({
    url: baseUrl + '/list/models',
    method: 'get',
    params: {
      pageSize: pageSize,
      current: current
    }
  })
}

// 下拉列表加载
export function getParentOption () {
  return request({
    url: baseUrl + '/options',
    method: 'get'
  })
}

// 修改数据字典
export function updateModel (row) {
  return request({
    url: baseUrl + '/models',
    method: 'put',
    data: {
      sId: row.sId,
      parentId: row.parentId,
      modelName: row.modelName,
      clientType: row.clientType,
      modelUrl: row.modelUrl,
      modelNote: row.modelNote,
      modelOrder: row.modelOrder,
      doFlag: row.doFlag
    }
  })
}

// 新增模块
export function addModel (row) {
  return request({
    url: baseUrl + '/models',
    method: 'post',
    data: {
      parentId: row.parentId,
      modelName: row.modelName,
      clientType: row.clientType,
      modelUrl: row.modelUrl,
      modelNote: row.modelNote,
      modelOrder: row.modelOrder,
      doFlag: row.doFlag
    }
  })
}

// 删除数据字典
export function delModel (row) {
  return request({
    url: baseUrl + '/models/' + row,
    method: 'delete'
  })
}
