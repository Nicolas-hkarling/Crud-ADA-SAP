import { Database } from "sqlite3";
import { Response, Request, NextFunction } from "express";
import Teacher from "../models/Teacher";
import { createDbConnection } from "../db/dbConfig";
import logger from "../services/logger";

let db: Database= createDbConnection()

const teachersRoot = (req: Request, res: Response, next: NextFunction) => {
 
    res.sendStatus(201);

}
const teachersList = (req: Request, res: Response) => {

    let teachersList: Teacher[] = [];

    let sql = `SELECT * FROM teachers`;

    db.all(sql, [], (error: Error, rows: Teacher[]) => {
        if (error) {
            logger.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row: Teacher) => { teachersList.push(row) });
        logger.info(req);
        res.send(teachersList);
    }
    );
}


const teacherDetailsByQuery = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.query.id;
    let sql = `SELECT * FROM teachers WHERE id="${id}"`;

    db.all(sql, [], (error: Error, rows: Teacher[]) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            res.send(rows[0]);
        } else {
            res.send("Professor não existe");
        }

    }
    );
}

const teacherDetailsByParams = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.params.id;
    let sql = `SELECT * FROM teachers WHERE id="${id}"`;

    db.all(sql, [], (error: Error, rows: Teacher[]) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            res.send(rows[0]);
        } else {
            res.send("Professor não existe");
        }

    }
    );
}

const addTeacher = (req: Request, res: Response) => {
    logger.info(req);

    let token = req.headers.authorization;

    if (token == "Bearer 12345") {
        let teacher: Teacher = req.body;
       

        let sql = `INSERT INTO teachers(name, birthdate, address, role, payment,subject ) VALUES ("${teacher.name}", "${teacher.birthdate}", "${teacher.address}", "${teacher.role}","${teacher.payment}", "${teacher.subject}")`;

        if (teacher.name && teacher.birthdate && teacher.address && teacher.role && teacher.payment && teacher.subject) {
            db.run(sql,
                (error: Error) => {
                    if (error) {
                        res.end(error.message);
                    }
                    res.send(`Teacher ${teacher.name} Added`);
                })
        } else {
            res.send("Erro na criação do professor. Verifique se todos os campos foram preenchidos");
        }
    } else {
        res.sendStatus(403);
    }



}

const updateTeacher = (req: Request, res: Response) => {
    logger.info(req);
    let teacher: Teacher = req.body;
    let sql = `UPDATE teachers SET name="${teacher.name}", 
                                   birthdate="${teacher.birthdate}", 
                                   address="${teacher.address}",
                                   role="${teacher.role}",
                                   payment= "${teacher.payment}",
                                   subject = "${teacher.subject}"
                                   WHERE id="${teacher.id}"
                                   `;


    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Teacher Updated");
    });
}

const updateTeacherBySpecificField = (req: Request, res: Response) => {
    logger.info(req);
    let teacher: Teacher = req.body;
    let sql = `UPDATE teachers SET name="${teacher.name}"
                                   WHERE id="${teacher.id}"
    `
    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Teacher Updated");
    })
}

const deleteTeacherByQuery = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.query.id;
    let sql = `DELETE from teachers WHERE id="${id}"`;

    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Teacher Deleted");
    })
}

const deleteTeacherByParams = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.params.id;
    let sql = `DELETE from teachers WHERE id="${id}"`;

    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Teacher Deleted");
    })
}


const teachersBysubject = (req: Request, res: Response) => {
    logger.info(req);
    let teachersList: Teacher[] = [];
    let subject = req.query.subject;

    let sql = `SELECT * FROM teachers WHERE subject="${subject}"`;

    db.all(sql, [], (error: Error, rows: Teacher[]) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            rows.forEach((row: Teacher) => { teachersList.push(row) });
            res.send(teachersList);
        } else {
            res.send("Os parâmetros apresentados não rertonaram resultado.");
        }

    })
}
export {
    teachersRoot,
    teachersList,
    teacherDetailsByQuery,
    teacherDetailsByParams,
    addTeacher,
    updateTeacher,
    updateTeacherBySpecificField,
    deleteTeacherByQuery,
    deleteTeacherByParams,
    teachersBysubject
};