import { Database } from "sqlite3";
import { Response, Request, NextFunction } from "express";
import Staff from "../models/Staff";
import { createDbConnection } from "../db/dbConfig";
import logger from "../services/logger";

let db: Database= createDbConnection()

const staffsRoot = (req: Request, res: Response, next: NextFunction) => {
 
    res.sendStatus(201);

}
const staffsList = (req: Request, res: Response) => {

    let staffsList: Staff[] = [];

    let sql = `SELECT * FROM staffs`;

    db.all(sql, [], (error: Error, rows: Staff[]) => {
        if (error) {
            logger.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row: Staff) => { staffsList.push(row) });
        logger.info(req);
        res.send(staffsList);
    }
    );
}


const staffDetailsByQuery = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.query.id;
    let sql = `SELECT * FROM staffs WHERE id="${id}"`;

    db.all(sql, [], (error: Error, rows: Staff[]) => {
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

const staffDetailsByParams = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.params.id;
    let sql = `SELECT * FROM staffs WHERE id="${id}"`;

    db.all(sql, [], (error: Error, rows: Staff[]) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            res.send(rows[0]);
        } else {
            res.send("funcionario não existe");
        }

    }
    );
}

const addStaff = (req: Request, res: Response) => {
    logger.info(req);

    let token = req.headers.authorization;

    if (token == "Bearer 12345") {
        let staff: Staff = req.body;
       

        let sql = `INSERT INTO staffs(name, birthdate, address, role, payment, sector ) VALUES ("${staff.name}", "${staff.birthdate}", "${staff.address}", "${staff.role}","${staff.payment}", "${staff.sector}")`;

        if (staff.name && staff.birthdate && staff.address && staff.role && staff.payment && staff.sector) {
            db.run(sql,
                (error: Error) => {
                    if (error) {
                        res.end(error.message);
                    }
                    res.send(`Staff ${staff.name} Added`);
                })
        } else {
            res.send("Erro na criação do funcionario. Verifique se todos os campos foram preenchidos");
        }
    } else {
        res.sendStatus(403);
    }



}

const updateStaff = (req: Request, res: Response) => {
    logger.info(req);
    let staff: Staff = req.body;
    let sql = `UPDATE staffs SET name="${staff.name}", 
                                   birthdate="${staff.birthdate}", 
                                   address="${staff.address}",
                                   role="${staff.role}",
                                   payment= "${staff.payment}"
                                   sector= "${staff.sector}"
                                   WHERE id="${staff.id}"
                                   `;


    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Staff Updated");
    });
}

const updateStaffBySpecificField = (req: Request, res: Response) => {
    logger.info(req);
    let staff: Staff = req.body;
    let sql = `UPDATE staffs SET name="${staff.name}"
                                   WHERE id="${staff.id}"
    `
    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Staff Updated");
    })
}

const deleteStaffByQuery = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.query.id;
    let sql = `DELETE from staffs WHERE id="${id}"`;

    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Staff Deleted");
    })
}

const deleteStaffByParams = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.params.id;
    let sql = `DELETE from staffs WHERE id="${id}"`;

    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("Staff Deleted");
    })
}


const staffsBysector = (req: Request, res: Response) => {
    logger.info(req);
    let staffsList: Staff[] = [];
    let sector = req.query.sector;

    let sql = `SELECT * FROM staffs WHERE sector="${sector}"`;

    db.all(sql, [], (error: Error, rows: Staff[]) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            rows.forEach((row: Staff) => { staffsList.push(row) });
            res.send(staffsList);
        } else {
            res.send("Os parâmetros apresentados não rertonaram resultado.");
        }

    })
}
export {
    staffsRoot,
    staffsList,
    staffDetailsByQuery,
    staffDetailsByParams,
    addStaff,
    updateStaff,
    updateStaffBySpecificField,
    deleteStaffByQuery,
    deleteStaffByParams,
    staffsBysector
};