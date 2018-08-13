import mongoose from 'mongoose'
const config = require('config-lite')(__dirname)
const chalk = require('chalk')

mongoose.connect(config.url, { useMongoClient: true })
mongoose.Promise = global.Promise
// var db = mongoose.createConnection('localhost', 'test', 27017, {user: 'tester', pass: '123'});
// 阿里云MongoDB
// const host1 = "dds-rj9da129fba7f8e41174-pub.mongodb.rds.aliyuncs.com";
// const port1 = 3717;
// const host2 = "dds-rj9da129fba7f8e42915-pub.mongodb.rds.aliyuncs.com";
// const port2 = 3717;
// const username = "root";
// const password = "88888888";
// const replSetName = "mgset-4988039";
// const demoDb = "admin";  // 创建到的数据库名称
// const url = `mongodb://${username}:${password}@${host1}:${port1},${host2}:${port2}/${demoDb}`
// console.log(url)
const db = mongoose.connection;

db.once('open', () => {
  console.log(
    chalk.green('连接数据库成功')
  );
})

db.on('error', function (error) {
  console.error(
    chalk.red('Error in MongoDb connection: ' + error)
  );
  mongoose.disconnect();
});

db.on('close', function () {
  console.log(
    chalk.red('数据库断开，重新连接数据库')
  );
  mongoose.connect(config.url, { server: { auto_reconnect: true } });
});

module.exports = db


