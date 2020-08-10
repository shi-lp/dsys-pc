import { request } from '@/network/request'

const baseUrl = '/base'

// 获取数据字典树
export function getDictTree () {
  return request({
    url: baseUrl + '/dictInfos',
    method: 'get',
    params: {
    }
  })
}

// 获取数据字典Map
export function getDictMap () {
  return request({
    url: baseUrl + '/list/dictInfos',
    method: 'get'
  })
}

// 点击获取字典信息
export function getDictInfo (id) {
  return request({
    url: baseUrl + '/dictInfos/info/' + id,
    method: 'get',
    params: {
    }
  })
}

// 修改数据字典
export function updateDictInfo (dictCode, dictName, dictValue, note, orderCode, doFlag) {
  return request({
    url: baseUrl + '/dictInfos',
    method: 'put',
    data: {
      dictCode: dictCode,
      dictValue: dictValue,
      dictName: dictName,
      note: note,
      orderCode: orderCode,
      identify: '0',
      doFlag: doFlag
    }
  })
}

// 新增数据字典
export function addDictInfo (dictCode, dictName, dictValue, note, orderCode, doFlag) {
  return request({
    url: baseUrl + '/dictInfos',
    method: 'post',
    data: {
      dictCode: dictCode,
      dictValue: dictValue,
      dictName: dictName,
      note: note,
      orderCode: orderCode,
      identify: '0',
      doFlag: doFlag
    }
  })
}

// 删除数据字典
export function delDictInfo (dictCode) {
  return request({
    url: baseUrl + '/dictInfos/' + dictCode,
    method: 'delete'
  })
}

// 自动生成编码
export function getDictCode (position, code) {
  return request({
    url: baseUrl + '/dictInfos/local/' + code,
    method: 'get',
    params: {
      position: position,
      code: code
    }
  })
}
