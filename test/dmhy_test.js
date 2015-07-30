import mocha from 'mocha'
import expect from 'expect.js'
import DMHY from '../lib/dmhy'

describe('DMHY', () => {
  var scraper = null

  beforeEach(() => {
    scraper = new DMHY()
  })

  describe('#name', () => {
    it('should be dmhy', () => {
      expect(scraper.name).to.be.ok()
    })
  })

  describe('#list', () => {
    it('should fetch index', (done) => {
      scraper.list(0, (error, result) => {
        //console.log(result.map((r) => JSON.stringify(r)))
        expect(result).to.be.ok()
        expect(result.length > 0).to.be.ok()
        done()
      })
    })
  })

  describe('#search', () => {
    it('should search dmhy and find something', (done) => {
      scraper.search('Arslan Senki', (error, result) => {
        expect(result).to.be.ok()
        expect(result.length > 0).to.be.ok()
        console.log(result)
        done()
      })
    })
  })
})
