import { Icon } from 'antd'
import L from 'react-loadable'
import React from 'react'

const Loading = () => (
  <div><Icon type='loading' /> Loading...</div>
)

const Loadable = opts => L({
  loading: Loading,
  ...opts
})

const BigMap = Loadable({
  loader: () => import(/* webpackChunkName: "BigMap" */ './routes/bigMap')
})

const Profile = Loadable({
  loader: () => import(/* webpackChunkName: "Profile" */ './routes/profile')
})

const PrimaryMap = Loadable({
  loader: () => import(/* webpackChunkName: "PrimaryMap" */ './routes/primaryMap')
})

const Search = Loadable({
  loader: () => import(/* webpackChunkName: "Search" */ './routes/search')
})

const SecondaryMap = Loadable({
  loader: () => import(/* webpackChunkName: "SecondaryMap" */ './routes/secondaryMap')
})

const Tree = Loadable({
  loader: () => import(/* webpackChunkName: "Tree" */ './routes/tree')
})

const TreeDetail = Loadable({
  loader: () => import(/* webpackChunkName: "TreeDetail" */ './routes/treeDetail')
})

export const Routes = [
  {
    path: '/tree',
    component: Tree,
    exact: true
  },
  {
    path: '/tree/:treeId',
    component: TreeDetail,
    exact: true
  },
  {
    path: '/',
    component: BigMap,
    exact: true
  },
  {
    path: '/map/:mapId',
    component: PrimaryMap,
    exact: true
  },
  {
    path: '/map/:primary/:secondary',
    component: SecondaryMap,
    exact: true
  },
  {
    path: '/search',
    component: Search,
    exact: true
  },
  {
    path: '/profile',
    component: Profile,
    exact: true
  }
]
