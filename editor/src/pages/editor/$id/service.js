import { request, config } from 'utils'

const { api } = config
const { component } = api

export function details (id) {
  return request({
    method: 'get',
    url: `${component}/${id}`,
  })
}

export function update (id, content) {
  return request({
    method: 'put',
    url: `${component}/${id}`,
    data: content,
  })
}
