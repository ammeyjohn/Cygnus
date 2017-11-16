const assert = require('chai').assert;
const request = require('supertest');
const server = require('../../server');

describe('dept', function() {

    afterEach(function() {
        server.close();
    });

    describe('GET /dept', function() {
        it('should return all departments.', function(done) {
            request(server)
                .get('/cygnus/api/dept/')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    let resp = JSON.parse(res.text);
                    assert.equal(resp.code, 0);
                    assert.isNotNull(resp.data);
                    assert.typeOf(resp.data, 'array');
                    assert.isAbove(resp.data.length, 1);
                    done();
                });
        });
    });

    describe('GET /dept/25', function() {
        it('should return one department, which id is 25', function(done) {
            request(server)
                .get('/cygnus/api/dept/25')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    let resp = JSON.parse(res.text);
                    assert.equal(resp.code, 0);
                    assert.isNotNull(resp.data);
                    assert.notTypeOf(resp.data, 'array');
                    assert.equal(resp.data.id, 25);
                    done();
                });
        });
    });

    describe('GET /dept/25,103', function() {
        it('should return two departments, which id is 25 and 103', function(done) {
            request(server)
                .get('/cygnus/api/dept/25,103')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    let resp = JSON.parse(res.text);
                    assert.equal(resp.code, 0);
                    assert.isNotNull(resp.data);
                    assert.typeOf(resp.data, 'array');
                    done();
                });
        });
    });
});