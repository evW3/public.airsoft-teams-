
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import config from 'config';

import { server as app } from '../app';
import { adminObject } from "../utils/types";
import { fakeData } from "../constants";

chai.use(chaiHttp);

const requester = chai.request(app).keepOpen();
let adminToken = "";
let userToken = "";
const admin: adminObject = config.get("admin");

describe("Admin actions", () => {
    before((done) => {
        requester
            .post("/api/users/sign-in")
            .send({ ...admin, repeatPassword: admin.password })
            .end((err, res) => {
                adminToken = res.body.token;
                done();
            });
    });
    before((done) => {
        requester
            .post("/api/users/sign-up")
            .send(fakeData[1])
            .end((err, res) => {
                userToken = res.body.token;
                done();
            });
    });
    before((done) => {
        requester
            .post("/api/teams/")
            .set({ "Authorization": `Bearer ${ adminToken }` })
            .send({
                name: "TestName"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    before((done) => {
        requester
            .post("/api/queries/join-team")
            .set({ "Authorization": `Bearer ${ userToken }` })
            .send({
                "teamId": 1
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    before((done) => {
        requester
            .post("/api/queries/change-role")
            .set({ "Authorization": `Bearer ${ userToken }` })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it("[Admin]: get queries", (done) => {
       requester
           .get("/api/queries/")
           .set({ "Authorization": `Bearer ${ adminToken }` })
           .end((err, res) => {
               expect(err).to.be.null;
               expect(res).to.have.status(200);
               done();
           })
    });
    it("[Admin]: accept join team query", (done) => {
        requester
            .post("/api/players/accept-join-team")
            .set({ "Authorization": `Bearer ${ adminToken }` })
            .send({
                "queryId": 1
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it("[Admin]: decline change role", (done) => {
        requester
            .patch("/api/managers/decline-manager")
            .set({ "Authorization": `Bearer ${ adminToken }` })
            .send({
                "queryId": 2,
                "description": "Can`t accept ur query!"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it("[Admin]: move user from team", (done) => {
        requester
            .delete("/api/players/move-user")
            .set({ "Authorization": `Bearer ${ adminToken }` })
            .send({
                "playerId": 2,
                "description": "I move you!"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});