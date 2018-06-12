var main = require('../main')
var should = require('should')

describe('test/main.test.js', () => {
  it('should equall 55 when n === 10', () => {
    main(10).should.equal(55)
  })
})