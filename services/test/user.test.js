import chaiModule from 'chai';
import { expect } from 'chai';
import {default as chaiHttp} from 'chai-http';
import app from '../index.js';

const chai  = chaiModule.use(chaiHttp);

describe('/GET users', () => {
    it('should get all users',function(done) {
        const res = chai.request.execute(app)
            .get('/users')
            .end((err, res)=> {
                expect(res).to.have.status(200);
                done();
            });
    });
});