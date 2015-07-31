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
      expect(scraper.name()).to.equal("dmhy")
    })
  })

  describe('#list', () => {
    it('should fetch page 0', (done) => {
      scraper.list(0, (error, result) => {
        expect(result).to.be.ok()
        expect(result.length > 0).to.be.ok()
        done()
      })
    })

    it('should fetch page 1', (done) => {
      scraper.list(1, (error, result) => {
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
        done()
      })
    })
  })
})