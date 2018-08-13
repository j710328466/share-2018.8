var co = require('co');
var OSS = require('ali-oss')


var client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIW9ECTbKoOWZg',
  accessKeySecret: 'WMhCZADpbgciDAcnyC0rRsaRfQ3OCz',
  bucket: 'jzxer'
});

var oss = new Object();
// 上传
oss.upload = function (file, doc) {
  // file要上传的文件、doc要上传的文件夹
  co(function* () {
    var result = yield client.put(doc + '/' + file, file);
    console.log(result);
  }).catch(function (err) {
    console.log(err);
  });
}

module.exports = oss;