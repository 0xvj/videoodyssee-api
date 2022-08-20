const { app, server } = require('../server');
const request = require('supertest');
require('dotenv').config()
const { instance } = require('../utils/funcs');
const MockAdapter = require("axios-mock-adapter");
const { response } = require('express');
const mock = new MockAdapter(instance);
mock.onPost().reply(209, {
    message: 'Request to schedule pipeline processing-pipeline accepted'
});



describe('API routes', function () {
    afterAll(done => {
        server.close();
        done();
    });

    it('triggers pipeline', async function () {
        const res = await request(app)
            .post('/pipeline/trigger')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                title: 'title',
                event:'Freifunk summit',
                date:'21-01-2022',
                language:'German',
                subtitle: 'subtile',
                url: 'http://techslides.com/demos/sample-videos/small.mp4',
                name: 'vijay',
                email: 'vijay@gmail.com'
            });
        expect(res.body.message).toContain('accepted');

    });



});