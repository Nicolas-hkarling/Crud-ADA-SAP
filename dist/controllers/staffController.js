"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffsBysector = exports.deleteStaffByParams = exports.deleteStaffByQuery = exports.updateStaffBySpecificField = exports.updateStaff = exports.addStaff = exports.staffDetailsByParams = exports.staffDetailsByQuery = exports.staffsList = exports.staffsRoot = void 0;
const dbConfig_1 = require("../db/dbConfig");
const logger_1 = __importDefault(require("../services/logger"));
let db = (0, dbConfig_1.createDbConnection)();
const staffsRoot = (req, res, next) => {
    res.sendStatus(201);
};
exports.staffsRoot = staffsRoot;
const staffsList = (req, res) => {
    let staffsList = [];
    let sql = `SELECT * FROM staffs`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            logger_1.default.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row) => { staffsList.push(row); });
        logger_1.default.info(req);
        res.send(staffsList);
    });
};
exports.staffsList = staffsList;
const staffDetailsByQuery = (req, res) => {
    logger_1.default.info(req);
    let id = req.query.id;
    let sql = `SELECT * FROM staffs WHERE id="${id}"`;
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
exports.staffDetailsByQuery = staffDetailsByQuery;
const staffDetailsByParams = (req, res) => {
    logger_1.default.info(req);
    let id = req.params.id;
    let sql = `SELECT * FROM staffs WHERE id="${id}"`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            res.send(rows[0]);
        }
        else {
            res.send("funcionario não existe");
        }
    });
};
exports.staffDetailsByParams = staffDetailsByParams;
const addStaff = (req, res) => {
    logger_1.default.info(req);
    let token = req.headers.authorization;
    if (token == "Bearer 12345") {
        let staff = req.body;
        let sql = `INSERT INTO staffs(name, birthdate, address, role, payment, sector ) VALUES ("${staff.name}", "${staff.birthdate}", "${staff.address}", "${staff.role}","${staff.payment}", "${staff.sector}")`;
        if (staff.name && staff.birthdate && staff.address && staff.role && staff.payment && staff.sector) {
            db.run(sql, (error) => {
                if (error) {
                    res.end(error.message);
                }
                res.send(`Staff ${staff.name} Added`);
            });
        }
        else {
            res.send("Erro na criação do funcionario. Verifique se todos os campos foram preenchidos");
        }
    }
    else {
        res.sendStatus(403);
    }
};
exports.addStaff = addStaff;
const updateStaff = (req, res) => {
    logger_1.default.info(req);
    let staff = req.body;
    let sql = `UPDATE staffs SET name="${staff.name}", 
                                   birthdate="${staff.birthdate}", 
                                   address="${staff.address}",
                                   role="${staff.role}",
                                   payment= "${staff.payment}"
                                   sector= "${staff.sector}"
                                   WHERE id="${staff.id}"
                                   `;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Staff Updated");
    });
};
exports.updateStaff = updateStaff;
const updateStaffBySpecificField = (req, res) => {
    logger_1.default.info(req);
    let staff = req.body;
    let sql = `UPDATE staffs SET name="${staff.name}"
                                   WHERE id="${staff.id}"
    `;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Staff Updated");
    });
};
exports.updateStaffBySpecificField = updateStaffBySpecificField;
const deleteStaffByQuery = (req, res) => {
    logger_1.default.info(req);
    let id = req.query.id;
    let sql = `DELETE from staffs WHERE id="${id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Staff Deleted");
    });
};
exports.deleteStaffByQuery = deleteStaffByQuery;
const deleteStaffByParams = (req, res) => {
    logger_1.default.info(req);
    let id = req.params.id;
    let sql = `DELETE from staffs WHERE id="${id}"`;
    db.all(sql, [], (error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Staff Deleted");
    });
};
exports.deleteStaffByParams = deleteStaffByParams;
const staffsBysector = (req, res) => {
    logger_1.default.info(req);
    let staffsList = [];
    let sector = req.query.sector;
    let sql = `SELECT * FROM staffs WHERE sector="${sector}"`;
    db.all(sql, [], (error, rows) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            rows.forEach((row) => { staffsList.push(row); });
            res.send(staffsList);
        }
        else {
            res.send("Os parâmetros apresentados não rertonaram resultado.");
        }
    });
};
exports.staffsBysector = staffsBysector;
