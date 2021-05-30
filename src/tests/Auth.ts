import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server as app } from '../app';
import { fakeData } from "../constants";

chai.use(chaiHttp);

const requester = chai.request(app).keepOpen();

describe("Auth", () => {
    it("[Sign-up]: create user", (done) => {
        requester
            .post("/api/users/sign-up")
            .send(fakeData[0])
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.token).to.be.a('string');
                done();
            });
    });
    it("[Sign-up]: password mismatch", (done) =>  {
        requester
            .post("/api/users/sign-up")
            .send({ ...fakeData[1], password: "1" })
            .end((err, res)=> {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
    });
    it("[Sign-up]: already exists email", (done) =>  {
        requester
            .post("/api/users/sign-up")
            .send(fakeData[0])
            .end((err, res)=> {
                expect(err).to.be.null;
                expect(res).to.have.status(400)
                done();
            })
    });
    describe("[Sign-up]: without params", () => {
        it("Email", (done) => {
            requester
                .post("/api/users/sign-up")
                .send({ ...fakeData[2], email: undefined })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    done();
                })
        });
        it("Password", (done) => {
            requester
                .post("/api/users/sign-up")
                .send({ ...fakeData[2], password: undefined })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    done();
                });
        });
        it("RepeatPassword", (done) => {
            requester
                .post("/api/users/sign-up")
                .send({ ...fakeData[2], repeatPassword: undefined })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    done();
                })
        });
    });
    it("[Sign-in]: sign in", (done) => {
        requester
            .post("/api/users/sign-in")
            .send(fakeData[0])
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.token).to.be.a('string');
                done();
            });
    });
    it("[Sign-in]: should return admin token", (done) => {
        requester
            .post("/api/users/sign-in")
            .send({
                email: "byruk228i@gmail.com",
                password: "test",
                repeatPassword: "test"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.token).to.be.a('string')
                done();
            });
    }); /// <===
    it("[Sign-in]: incorrect password", (done) => {
        requester
            .post("/api/users/sign-in")
            .send({ ...fakeData[0], password: "1" })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            });
    });
    it("[Sign-in]: incorrect email", (done) => {
        requester
            .post("/api/users/sign-in")
            .send({ ...fakeData[0], email: "HHH@HHH"})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            });
    });
    describe("[Sign-in]: without params", () => {
        it("Email", (done) => {
            requester
                .post("/api/users/sign-in")
                .send({ ...fakeData[0], email: undefined })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    done();
                })
        });
        it("Password", (done) => {
            requester
                .post("/api/users/sign-in")
                .send({ ...fakeData[0], password: undefined })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    done();
                });
        });
    });
});