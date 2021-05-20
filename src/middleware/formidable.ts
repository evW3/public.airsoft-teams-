import { NextFunction, Request, Response } from "express";
import * as formidable from "formidable";
import { Exception, Photo } from "../utils/classes";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import { uploads } from "../constants";

export function uploadPhotoVerify(req: Request, res: Response, next: NextFunction) {
    const form = new formidable({ multiples: true });
    form.parse(req, (err, fields: formidable.Fields, files: formidable.Files) => {
        if (err) {
            next(new Exception(400, `${ err }`));
        } else {
            const photo = writeFile(files);
            if (photo) {
                req.body.image = photo;
                next();
            } else {
                next(new Exception(400, "Can`t upload photo"));
            }
        }
    });
}

function writeFile(files: formidable.Files): Photo | null {
    if(files?.photo) {
        const photo = new Photo();
        const filePhoto = (<formidable.File>(files.photo));
        photo.imagePathToLoad = filePhoto.path;
        photo.name = filePhoto.name;
        if(photo.isValid()) {

            const extension: string = photo.name.split('.').reverse()[0];
            photo.uniqueName = `${ uuidv4() + '.' + extension }`;
            photo.fullFilePathToWrite = path.resolve(__dirname, '..', 'uploads', photo.uniqueName);
            photo.url = `${ uploads }/${ photo.uniqueName }`

            return photo;
        }
    }
    return null;
}