import axios from './../../utils/axios'

// 管理员登录
export function adminLogin (params) {
  return axios({
    url: '/admin/login',
    data: params.data
  })
}

// 管理员注册
export function adminRegister (params) {
  return axios({
    url: '/admin/register',
    data: params.data
  })
}

// 管理员列表
export function adminList (params) {
  return axios({
    url: '/admin/sort'
  })
}

// 管理员删除
export function adminDelete (params) {
  return axios({
    url: '/admin/delete',
    data: params.data
  })
}

// 登录
export function api_login (params) {
  return axios({
    url: '/users/login',
    data: params.data
  })
}

// 注册
export function api_register (params) {
  return axios({
    url: '/users/register',
    data: params.data
  })
}

// 获得所有用户
export function allUser (params) {
  return axios({
    url: '/users/all'
  })
}

// 用户信息删除
export function userDelete (params) {
  return axios({
    url: '/users/del',
    data: params.data
  })
}

// 用户信息
export function userDetail (params) {
  return axios({
    url: '/users/detail',
    data: params.data
  })
}

// 更新用户地址信息
export function addAddress (params) {
  return axios({
    url: '/users/addAddress',
    data: params.data
  })
}

// 广告新增
export function addBannerReq (params) {
  return axios({
    url: '/banner/publish',
    data: params.data
  })
}

// 广告列表
export function bannerShow (params) {
  return axios({
    url: '/banner/sort',
    data: params.data
  })
}

// 广告删除
export function bannerDelete (params) {
  return axios({
    url: '/banner/delete',
    data: params.data
  })
}
