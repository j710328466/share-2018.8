const express = require('express')
const utility = require('utility')  // md5 模块
const cheerio = require('cheerio')
const superagent = require('superagent')
const eventproxy = require('eventproxy')
const url = require('url')
const async = require('async')

const app = express()
const ep = eventproxy()
const PORT = 3000
const Cnode = 'https://cnodejs.org/'

app.post('/', (req, res, next) => {
  console.log(req)
  res.send('ok')
})

app.use('/md5', (req, res, next) => {
  var val = req.query.q
  if (val) {
    res.send(utility.md5(val))
  } else {
    res.send('你可以在链接传个值看看啊,混蛋！（q=测试ci）')
  }
})

app.get('/spider', (req, res, next) => {
  superagent.get(Cnode)
    .end(function (err, sres) {
      if (err) {
        return next(err)
      }

      var topicUrls = []
      var $ = cheerio.load(sres.text)
      var items = []
      $('#topic_list .topic_title').each(function (idx, element) {
        const $element = $(element)

        var href = url.resolve(Cnode, $element.attr('href'))
        // 限制抓取个数
        if (idx < 4) {
          topicUrls.push(href)
        }
      })

      // 将所有抓取的数据传递给前端
      ep.after('topic_html', topicUrls.length, (topics) => {
        topics = topics.map((topicPair) => {
          var topicUrl = topicPair[0]
          var topicHtml = topicPair[1]
          var $ = cheerio.load(topicHtml)

          return ({
            title: $('.topic_full_title').text().trim(),
            href: topicUrl,
            comment1: $('.reply_content').eq(0).text().trim()
          })
        })
        res.send(topics)
      })

      // 抓取每个链接的页面
      topicUrls.forEach((topicUrl) => {
        superagent.get(topicUrl)
          .end((err, res) => {
            console.log('抓取' + topicUrl + '成功！')
            ep.emit('topic_html', [topicUrl, res.text])
          })
      })
    })
})

app.get('/async', (req, res, next) => {
  var currentCount = 0
  var fetchUrl = (url, callback) => {
    var delay = parseInt((Math.random() * 10000000) % 2000, 10)
    currentCount++
    console.log('现在的并发数是：' + currentCount + ',正在抓取的是：' + url + ',耗时：' + delay + '毫秒')
    setTimeout(() => {
      currentCount--
      callback(null, url + '.html content')
    }, delay)
  }

  var urls = [] 
  for (var i = 0; i < 30; i++) {
    urls.push('http://dataSource_' + i)
  }

  // 控制并发数
  async.mapLimit(urls, 5, (url, callback) => {
    // 并发时执行的函数
    fetchUrl(url, callback)
  }, (err, result) => {
    // 执行完之后的输出
    res.send('final:' + result)
  })
})



app.listen(PORT, () => {
  console.log('this app is running at port:' + PORT)
})
