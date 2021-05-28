import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { v4 as uuid4 } from "uuid";
import * as fs from "fs";
import path from "path";

import { server as app } from '../app';
import before = Mocha.before;

chai.use(chaiHttp);

let token: string;
let adminToken: string;
const requester = chai.request(app).keepOpen();
const testPhoto = fs.readFileSync(path.resolve(__dirname, "../", "uploads", "default.jpg"));

describe('Sign-up', () => {
    it('should return token', (done) => {
        requester
            .post('/api/users/sign-up')
            .send({
                email: "1happyrock1@gmail.com",
                password: "test",
                repeatPassword: "test"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.token).to.be.a('string');
                done();
            });
    });
    it('password mismatch', (done) =>  {
        requester
            .post("/api/users/sign-up")
            .send({
                email: uuid4().split('-')[1],
                password: "test",
                repeatPassword: "test1"
            })
            .end((err, res)=> {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
    });
    it('already exists email', (done) =>  {
        requester
            .post("/api/users/sign-up")
            .send({
                email: "1happyrock1@gmail.com",
                password: "test",
                repeatPassword: "test"
            })
            .end((err, res)=> {
                expect(err).to.be.null;
                expect(res).to.have.status(400)
                done();
            })
    });
    describe('without params', () => {
        it('email', (done) => {
            requester
                .post("/api/users/sign-up")
                .send({
                    password: "test",
                    repeatPassword: "test"
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    done();
                })
        });
        it('password', (done) => {
            requester
                .post("/api/users/sign-up")
                .send({
                    email: "1happyrock1@gmail.com",
                    repeatPassword: "test"
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    done();
                })
        });
        it('repeatPassword', (done) => {
            requester
                .post("/api/users/sign-up")
                .send({
                    email: "1happyrock1@gmail.com",
                    password: "test",
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    done();
                })
        });
    });
});

describe('Sign-in', () => {
    before(() => {
        requester
            .post('/api/users/sign-in')
            .send({
                email: "1happyrock1@gmail.com",
                password: "test",
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.token).to.be.a('string');
                token = res.body.token;
            });
    });

    it('should return token', (done) => {
        requester
            .post('/api/users/sign-in')
            .send({
                email: "1happyrock1@gmail.com",
                password: "test",
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.token).to.be.a('string');
                token = res.body.token;
                done();
            });
    });
    it('should return admin token', (done) => {
        requester
            .post('/api/users/sign-in')
            .send({
                email: "byruk228i@gmail.com",
                password: "test",
                repeatPassword: "test"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.token).to.be.a('string')
                adminToken = res.body.token;
                done();
            });
    });

    it('incorrect password', (done) => {
        requester
            .post('/api/users/sign-in')
            .send({
                email: "1happyrock1@gmail.com",
                password: "somePassword",
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            });
    });
    it('incorrect email', (done) => {
        requester
            .post('/api/users/sign-in')
            .send({
                email: "123@fjkf.com",
                password: "test",
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            });
    });
    describe('without params', () => {
        it('email', (done) => {
            requester
                .post("/api/users/sign-in")
                .send({
                    password: "test",
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    done();
                })
        });
        it('password', (done) => {
            requester
                .post("/api/users/sign-in")
                .send({
                    email: "1happyrock1@gmail.com",
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    done();
                })
        });
    });
});

describe('Profile', () => {
    it("should return profile data", (done) => {
        requester
            .get('/api/users/profile')
            .set({ "Authorization": `Bearer ${ token }` })
            .end((err, res) => {
                expect(err).to.be.null;
               expect(res).to.have.status(200);
               done();
            });
    });
    it("change profile", (done) => {
        requester
            .put("/api/users/profile")
            .set({ "Authorization": `Bearer ${ token }` })
            .send({
                login: "eV",
                currentPassword: "test",
                newPassword: "new"
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    describe("without params", () => {
        it("login", (done) => {
           requester
               .put("/api/users/profile")
               .set({ "Authorization": `Bearer ${ token }` })
               .send({
                   currentPassword: "new",
                   newPassword: "test"
               })
               .end((err, res) => {
                   expect(err).to.be.null;
                   expect(res).to.have.status(200);
                   done();
               });
       });
        it("currentPassword", (done) => {
            requester
                .put("/api/users/profile")
                .set({ "Authorization": `Bearer ${ token }` })
                .send({
                    login: "new login",
                    newPassword: "test"
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it("newPassword", (done) => {
            requester
                .put("/api/users/profile")
                .set({ "Authorization": `Bearer ${ token }` })
                .send({
                    login: "new login",
                    currentPassword: "test"
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});

describe('Photo', () => {
    it("upload photo", (done) => {
       requester
           .post("/api/users/upload-photo")
           .set({ "Authorization": `Bearer ${ token }` })
           .type('form')
           .field("photo", testPhoto)
           .end((err, res) => {
               expect(err).to.be.null;
               expect(res).status(200);
               done();
           });
    });
});

describe("Teams", () => {
   it("create team with admin token", (done) => {
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
   it("create team with player token", (done) => {
      requester
          .post("/api/teams/")
          .set({ "Authorization": `Bearer ${ token }` })
          .send({
              name: "TestName"
          })
          .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(403);
              done();
          });
   });
   it("get team member by team id", (done) => {
      requester
          .get("/api/teams/1")
          .set({ "Authorization": `Bearer ${ token }` })
          .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              done();
          });
   });
});

describe("Player create queries", () => {
    it("create join team query", (done) => {
        requester
            .post("/api/queries/join-team")
            .set({ "Authorization": `Bearer ${ token }` })
            .send({
                "teamId": 1
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it("create change role query", (done) => {
        requester
            .post("/api/queries/change-role")
            .set({ "Authorization": `Bearer ${ token }` })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe("Admin", () => {
   it("accept join team", (done) => {
       requester
           .post("/api/players/accept-join-team")
           .set({ "Authorization": `Bearer ${ adminToken }` })
           .send({
               "queryId": 1
           })
           .end((err, res) => {
               expect(err).to.be.null;
               expect(res).to.have.status(200)
               done();
           });
   });
   it("decline change role", (done) => {
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
   it("move user from team", (done) => {
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