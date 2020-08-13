import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
// 商品分类
const CategoryAdd = () => import('@/components/content/goods/category/CategoryAdd')
// 系统配置
const SysSetupList = () => import('@/components/content/sysConfig/sysSetup/SysSetupList')
// 数据字典
const SysDictInfo = () => import('@/views/sysConfig/dictInfo/SysDictInfo')
// 模块设置
const SysModelList = () => import('@/views/sysConfig/sysModel/SysModelList')
// 用户设置
const VUser = () => import('@/views/business/user/VUser')
// 权限管理
const AuthInfo = () => import('@/components/content/business/auth/AuthInfo')
// 角色管理
const RoleList = () => import('@/components/content/business/role/RoleList')
// 角色新增
const RoleEdit = () => import('@/components/content/business/role/RoleEdit')
// 部门列表
const DeptList = () => import('@/components/content/business/dept/DeptList')

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'index',
    component: RoleList
  },
  {
    path: '/base/',
    name: 'CategoryAdd',
    component: CategoryAdd
  },
  {
    path: '/sys/sysSetupList',
    name: 'SysSetupList',
    component: SysSetupList
  },
  {
    path: '/sys/dictList',
    name: 'SysDictInfo',
    component: SysDictInfo
  },
  {
    path: '/sys/modelList',
    name: 'SysModelList',
    component: SysModelList
  },
  {
    path: '/profile/userList',
    name: 'User',
    component: VUser
  },
  {
    path: '/profile/authList',
    name: 'Auth',
    component: AuthInfo
  },
  {
    path: '/profile/roleList',
    name: 'Role',
    component: RoleList
  },
  {
    path: '/profile/roleEdit/:roleId',
    name: 'RoleEdit',
    component: RoleEdit
  },
  {
    path: '/profile/depts',
    name: 'DeptList',
    component: DeptList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active' // 设置路由激活时class名称
})

export default router
