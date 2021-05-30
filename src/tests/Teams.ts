import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import config from 'config';

import { server as app } from '../app';
import { adminObject } from "../utils/types";

chai.use(chaiHttp);

const requester = chai.request(app).keepOpen();
let adminToken = "";
const admin: adminObject = config.get("admin");

describe("Teams", () => {
    before((done) => {
        requester
            .post("/api/users/sign-in")
            .send({ ...admin, repeatPassword: admin.password })
            .end((err, res) => {
                adminToken = res.body.token;
                done();
            });
    });

    it("[Teams]: get team members by team id", (done) => {
        requester
            .get("/api/teams/1")
            .set({ "Authorization": `Bearer ${ adminToken }` })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.name).to.a("string");
                expect(res.body.users).to.a("array");
                done();
            });
    });
});