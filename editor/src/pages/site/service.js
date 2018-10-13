import { request, config } from 'utils'

const { api } = config
const { site, route } = api

export function list () {
  return request({
    method: 'get',
    url: site,
  })
}

export function create (data) {
  return request({
    method: 'post',
    url: site,
    data,
  })
}

export function createRoute (data) {
  return request({
    method: 'post',
    url: route,
    data,
  })
}

export function routeList (id) {
  return request({
    url: `${route}/${id}`,
  })
}
