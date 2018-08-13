const crypto = require('crypto')

// 非对称加密
exports.encrypto = (data, key) => {
  return crypto.publicEncrypt(key, Buffer.from(data))
}

// 非对称解密
exports.decrypto = (encrypted, key) => {
  return crypto.privateDecrypt(key, encrypted)
}

// md5加密
exports.MD5 = (data) => {
  return crypto.createHash('md5').update(data).digest('hex')
}

// Hmac加密
exports.Hmac = (data, key) => {
  return crypto.createHmac('sha256', key).update(data).digest('hex')
}

// AES加密
exports.AesEncrypto = (data, key) => {
  const cipher = crypto.createCipher('aes192', key)
  var crypted = cipher.update(data, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

// AES解密
exports.AesDecrypto = (encrypted, key) => {
  const Decipher = crypto.createDecipher('aes192', key)
  var decrypted = Decipher.update(encrypted, 'hex', 'utf8')
  decrypted += Decipher.final('utf8')
  return decrypted
}
