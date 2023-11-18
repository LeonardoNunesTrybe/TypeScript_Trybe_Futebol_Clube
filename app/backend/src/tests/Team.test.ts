import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../../src/app';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';
import { teams, team } from './mocks/Team.mocks';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Team test', () => {
  it('should return all teams', async function() {
    sinon.stub(SequelizeTeamModel, 'findAll').resolves(teams as any);
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('should return a team', async function() {
    sinon.stub(SequelizeTeamModel, 'findOne').resolves(team as any);
    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('teamName');
    expect(response.body).to.deep.equal(team);
  });

  it('should return not found when team does not exist', async function() {
    sinon.stub(SequelizeTeamModel, 'findOne').resolves(null);
    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Team with id 1 not found');
  });

  afterEach(sinon.restore);
});
