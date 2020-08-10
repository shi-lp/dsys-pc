import { request } from '@/network/request'

const baseUrl = '/base'

export function getAuthList () {
  return request({
    url: baseUrl + '/auths',
    method: 'get'
  })
}

export function getModelOption () {
  return request({
    url: baseUrl + '/models',
    method: 'get'
  })
}

export function addAuth (row) {
  return request({
    url: baseUrl + '/auths',
    method: 'post',
    data: {
      modelId: row.modelId,
      parentModel: row.parentModel,
      doFlag: row.doFlag,
      doSide: row.doSide,
      authCode: row.authCode,
      authName: row.authName,
      authContext: row.authContext
    }
  })
}

export function codeValidate (code) {
  return request({
    url: baseUrl + '/auths/' + code,
    method: 'get'
  })
}
