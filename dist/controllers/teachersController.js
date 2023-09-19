"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teachersBysubject = exports.deleteTeacherByParams = exports.deleteTeacherByQuery = exports.updateTeacherBySpecificField = exports.updateTeacher = exports.addTeacher = exports.teacherDetailsByParams = exports.teacherDetailsByQuery = exports.teachersList = exports.teachersRoot = void 0;
const dbConfig_1 = require("../db/dbConfig");
const logger_1 = __importDefault(require("../services/logger"));
let db = (0, dbConfig_1.createDbConnection)();
const teachersRoot = (req, res, next) => {
    res.sendStatus(201);
};
exports.teachersRoot = teachersRoot;
const teachersList = (req, res) => {
    let teachersList = [];
    let sql = `SELECT * FROM teachers`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            logger_1.default.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row) => { teachersList.push(row); });
        logger_1.default.info(req);
        res.send(teachersList);
    });
};
exports.teachersList = teachersList;
const teacherDetailsByQuery = (req, res) => {
    logger_1.default.info(req);
    let id = req.query.id;
    let sql = `SELECT * FROM teachers WHERE id="${id}"`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            res.send(rows[0]);
        }
        else {
            res.send("Professor não existe");
        }
    });
};
exports.teacherDetailsByQuery = teacherDetailsByQuery;
const teacherDetailsByParams = (req, res) => {
    logger_1.default.info(req);
    let id = req.params.id;
    let sql = `SELECT * FROM teachers WHERE id="${id}"`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            res.send(rows[0]);
        }
        else {
            res.send("Professor não existe");
        }
    });
};
exports.teacherDetailsByParams = teacherDetailsByParams;
const addTeacher = (req, res) => {
    logger_1.default.info(req);
    let token = req.headers.authorization;
    if (token == "Bearer 12345") {
        let teacher = req.body;
        let sql = `INSERT INTO teachers(name, birthdate, address, role, payment,subject ) VALUES ("${teacher.name}", "${teacher.birthdate}", "${teacher.address}", "${teacher.role}","${teacher.payment}", "${teacher.subject}")`;
        if (teacher.name && teacher.birthdate && teacher.address && teacher.role && teacher.payment && teacher.subject) {
            db.run(sql, (error) => {
                if (error) {
                    res.end(error.message);
                }
                res.send(`Teacher ${teacher.name} Added`);
            });
        }
        else {
            res.send("Erro na criação do professor. Verifique se todos os campos foram preenchidos");
        }
    }
    else {
        res.sendStatus(403);
    }
};
exports.addTeacher = addTeacher;
const updateTeacher = (req, res) => {
    logger_1.default.info(req);
    let teacher = req.body;
    let sql = `UPDATE teachers SET name="${teacher.name}", 
                                   birthdate="${teacher.birthdate}", 
                                   address="${teacher.address}",
                                   role="${teacher.role}",
                                   payment= "${teacher.payment}",
                                   subject = "${teacher.subject}"
                                   WHERE id="${teacher.id}"
                                   `;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Teacher Updated");
    });
};
exports.updateTeacher = updateTeacher;
const updateTeacherBySpecificField = (req, res) => {
    logger_1.default.info(req);
    let teacher = req.body;
    let sql = `UPDATE teachers SET name="${teacher.name}"
                                   WHERE id="${teacher.id}"
    `;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Teacher Updated");
    });
};
exports.updateTeacherBySpecificField = updateTeacherBySpecificField;
const deleteTeacherByQuery = (req, res) => {
    logger_1.default.info(req);
    let id = req.query.id;
    let sql = `DELETE from teachers WHERE id="${id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Teacher Deleted");
    });
};
exports.deleteTeacherByQuery = deleteTeacherByQuery;
const deleteTeacherByParams = (req, res) => {
    logger_1.default.info(req);
    let id = req.params.id;
    let sql = `DELETE from teachers WHERE id="${id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Teacher Deleted");
    });
};
exports.deleteTeacherByParams = deleteTeacherByParams;
const teachersBysubject = (req, res) => {
    logger_1.default.info(req);
    let teachersList = [];
    let subject = req.query.subject;
    let sql = `SELECT * FROM teachers WHERE subject="${subject}"`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            rows.forEach((row) => { teachersList.push(row); });
            res.send(teachersList);
        }
        else {
            res.send("Os parâmetros apresentados não rertonaram resultado.");
        }
    });
};
exports.teachersBysubject = teachersBysubject;
