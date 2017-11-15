const assert = require('chai').assert;
const request = require('supertest');
const server = require('../../server');

describe('user', function () {

    afterEach(function () {
        server.close();
    });

    describe('GET /user', function () {
        it('should return all users.', function (done) {
            request(server)
                .get('/cygnus/api/user/')
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

    describe('GET /user/1', function () {
        it('should return one user, which id is 1', function (done) {
            request(server)
                .get('/cygnus/api/user/1')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    let resp = JSON.parse(res.text);
                    assert.equal(resp.code, 0);
                    assert.isNotNull(resp.data);
                    assert.notTypeOf(resp.data, 'array');
                    assert.equal(resp.data.id, 1);
                    done();
                });
        });
    });

    describe('GET /user/1,2', function () {
        it('should return two users, which id is 1, 2', function (done) {
            request(server)
                .get('/cygnus/api/user/1,2')
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