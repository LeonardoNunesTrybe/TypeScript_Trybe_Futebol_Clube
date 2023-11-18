import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../../src/app';
import SequelizeUserModel from '../database/models/SequelizeUserModel';
import { validLogin, invalidEmailLogin, invalidPassLogin, validToken } from './mocks/User.mocks';
import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('User test', () => {
  it('should not login without fields', async function() {
    const response = await chai.request(app).post('/login').send({});

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('All fields must be filled');
  });

  it('should not login with an error email', async function() {
    const response = await chai.request(app).post('/login').send(invalidEmailLogin);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Invalid email or password');
  });

  it('should not login with an error password', async function() {
    const response = await chai.request(app).post('/login').send(invalidPassLogin);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Invalid email or password');
  });

  it('should not login with user not found', async function() {
    sinon.stub(SequelizeUserModel, 'findOne').resolves(null);
    const response = await chai.request(app).post('/login').send(validLogin);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Invalid email or password');
  });

  it('should return a token when login is ok', async function() {
    sinon.stub(SequelizeUserModel, 'findOne').resolves(validToken as any);
    sinon.stub(JWT, 'sign').returns('validToken');
    sinon.stub(Validations, 'validateLogin').returns;

    const response = await chai.request(app).post('/login').send(validLogin);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('token');
    expect(response.body.token).to.be.equal('validToken');
  });

  afterEach(sinon.restore);
});