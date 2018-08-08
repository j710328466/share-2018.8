import originAxios from 'axios'
import host from './host'

// import qs from 'qs'

export default function axios (params) {
  return originAxios({
    url: host.apiUrl + params.url,
    method: params.method || 'POST',
    data: params.data || ''
  })
}
