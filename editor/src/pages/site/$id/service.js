import { request, config } from 'utils'

const { api } = config
const { site, route, routeTemplate, component } = api

export function details (id) {
  return request({
    method: 'get',
    url: `${site}/${id}`,
  })
}

export function routeList (id) {
  return request({
    url: `${route}/${id}`,
  })
}

export function componentList () {
  return request({
    url: component,
  })
}

export function getTemplate (_id) {
  return request({
    url: `${routeTemplate}/${_id}`,
  })
}

export function setTemplate (_id, data) {
  return request({
    method: 'post',
    url: `${routeTemplate}/${_id}`,
    data,
  })
}
