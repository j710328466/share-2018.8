import originAxios from 'axios'
import host from './host'

// import qs from 'qs'

export default function axios (params) {
  let data = new Promise((resolve, reject) => {
    originAxios({
      url: host.apiUrl + params.url,
      method: params.method || 'POST',
      data: params.data || ''
    }).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      }
    })
  })
  return data
}
