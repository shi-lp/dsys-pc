import { request } from '@/network/request'

export function addCategory (cateTypeIn, cateSelected, cateCode, cateName, state) {
  return request({
    url: '/goods/categories',
    method: 'post',
    data: {
      levelNo: cateSelected,
      parentCode: cateTypeIn,
      categoryName: cateName,
      categoryCode: cateCode,
      doFlag: state
    }
  })
}

export function selectCategory (levelNo, parentCode) {
  return request({
    url: '/goods/categories/' + levelNo,
    method: 'get',
    params: {
      levelNo: levelNo,
      parentCode: parentCode
    }
  })
}

export function getCateCode (levelNo, parentCode) {
  return request({
    url: '/goods/categories/code/' + levelNo,
    method: 'get',
    params: {
      levelNo: levelNo,
      parentCode: parentCode
    }
  })
}
