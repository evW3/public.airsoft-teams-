
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
    before( (done) => {
        Promise.all([
            requester
                .post("/api/users/sign-in")
                .send({ ...admin, repeatPassword: admin.password })
                .then((res) => {
                    adminToken = res.body.token;
                    return;
                }),
            requester
                .post("/api/users/sign-up")
                .send(fakeData[1])
                .then((res) => {
                    userToken = res.body.token;
                    return;
                })
            ]).then(() => {
            requester
                .post("/api/teams/")
                .set({ "Authorization": `Bearer ${ adminToken }` })
                .send({ name: "TestName" })
                .then(() => {
                    requester
                        .post("/api/queries/join-team")
                        .set({ "Authorization": `Bearer ${ userToken }` })
                        .send({ "teamId": 1 })
                        .then(() => done());
                });
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
    requester
        .post("/api/queries/change-role")
        .set({ "Authorization": `Bearer ${ userToken }` })
        .then(() => {
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
            return;
        });
    it("[Admin]: block player", (done) => {
       requester
           .post("/api/players/block")
           .set({ "Authorization": `Bearer ${ adminToken }` })
           .send({
               "playerId": 2,
               "description": "Заблокирован"
           })
           .end((err, res) => {
               expect(err).to.be.null;
               expect(res).to.have.status(200);
               done();
           })
    });
    it("[Admin]: block player one more time", (done) => {
       requester
           .post("/api/players/block")
           .set({ "Authorization": `Bearer ${ adminToken }` })
           .send({
               "playerId": 2,
               "description": "Заблокирован"
           })
           .end((err, res) => {
               expect(err).to.be.null;
               expect(res).to.have.status(400);
               done();
           })
    });
    it("[Admin]: unblock player", (done) => {
        requester
            .delete("/api/players/unblock")
            .set({ "Authorization": `Bearer ${ adminToken }` })
            .send({
                "playerId": 2,
                "description": "Разблокировал!"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
    });
    it("[Admin]: unblock player one more time", (done) => {
        requester
            .delete("/api/players/unblock")
            .set({ "Authorization": `Bearer ${ adminToken }` })
            .send({
                "playerId": 2,
                "description": "Разблокировал!"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
    });
});