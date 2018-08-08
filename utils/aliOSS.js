import co from 'co'
import AliOSS from 'ali-oss'

const client = new AliOSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIW9ECTbKoOWZg',
  accessKeySecret: 'WMhCZADpbgciDAcnyC0rRsaRfQ3OCz',
  bucket: 'jzxer'
})

class OSS {
  async upload (file, doc, cb) {
    // file要上传的文件、doc要上传的文件夹
    var timestamp = Date.parse(new Date())
    co(function* () {
      const result = yield client.put(doc + '/' + timestamp + '.jpg', file)
      cb(result)
    }).catch(cb)
  }
}

export default new OSS()
