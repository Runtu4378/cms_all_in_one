import { request, config } from 'utils'

const { api } = config
const { component } = api

export function list () {
  return request({
    method: 'get',
    url: component,
  })
}

export function create (data) {
  return request({
    method: 'post',
    url: component,
    data,
  })
}
