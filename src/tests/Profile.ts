import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import FormData from "form-data";

import { server as app } from '../app';
import path from "path";

import * as fs from "fs";
import { fakeData, dataToChange } from "../constants";

chai.use(chaiHttp);

let UserToken: string;
const requester = chai.request(app).keepOpen();
const testPhoto = fs.readFile(path.resolve(__dirname, "..", "uploads", "default.jpg"), (error, data) => {
    if(error) {
        throw error;
    }
    return data.toString();
});

describe('Profile', () => {
    before((done) => {
        requester
            .post("/api/users/sign-in")
            .send(fakeData[0])
            .end((err, res) => {
                UserToken = res.body.token;
                done();
            });
    });

    it("[Profile]: get", (done) => {
        requester
            .get("/api/users/profile")
            .set({ "Authorization": `Bearer ${ UserToken }` })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.login).to.a("string");
                expect(res.body.email).to.a("string");
                expect(res.body.profile_image).to.a("string");
                expect(res.body.role.name).to.a("string");
                done();
            });
    });
    it("[Profile]: change", (done) => {
        requester
            .put("/api/users/profile")
            .set({ "Authorization": `Bearer ${ UserToken }` })
            .send({ ...dataToChange[0], currentPassword: fakeData[0].password })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    describe("[Profile]: without params", () => {
        it("Login", (done) => {
            requester
                .put("/api/users/profile")
                .set({ "Authorization": `Bearer ${ UserToken }` })
                .send({ ...dataToChange[0], login: undefined, currentPassword: fakeData[0].password })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it("CurrentPassword", (done) => {
            requester
                .put("/api/users/profile")
                .set({ "Authorization": `Bearer ${ UserToken }` })
                .send(dataToChange[0])
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it("NewPassword", (done) => {
            requester
                .put("/api/users/profile")
                .set({ "Authorization": `Bearer ${ UserToken }` })
                .send({ ...dataToChange[0], newPassword: undefined, currentPassword: fakeData[0].password })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
    it("[Photo] upload photo", (done) => {
        let tmpForm = new FormData();
        tmpForm.append("photo", testPhoto);
        requester
            .post("/api/users/upload-photo")
            .set({ "Authorization": `Bearer ${ UserToken }` })
            .type('form')
            .send(tmpForm)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).status(200);
                expect(res.body.photo).to.be.a("string");
                done();
            });
    });
});