/* global describe, it */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/main');

chai.use(chaiHttp);
const { expect } = chai;

describe('Server', () => {
  describe('GET /health', () => {
    it('should return health check status', (done) => {
      chai
        .request(app)
        .get('/health')
        .end((_err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status', 'ok');
          done();
        });
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for unknown routes', (done) => {
      chai
        .request(app)
        .get('/nonexistent')
        .end((_err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('success', false);
          expect(res.body).to.have.property(
            'message',
            'Resource not found'
          );
          done();
        });
    });
  });
});
