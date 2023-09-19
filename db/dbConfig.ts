

const sqlite3 = require("sqlite3").verbose();
const filePath: string = "./db/school.db";

const createDbConnection = () => {
    let db = new sqlite3.Database(filePath, (error: Error) => {
        if (error) {
            return console.error(error.message);
        }
    });
    console.log("Connection with SQLite has been estabilished");
    db.exec(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        birthdate VARCHAR(50),
        address VARCHAR(50),
        shift VARCHAR(50),
        year VARCHAR(50),
        room VARCHAR(50)
        );
        `);
    //db.exec(`DROP TABLE teachers`);
    db.exec(`CREATE TABLE IF NOT EXISTS teachers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(50),
            birthdate VARCHAR(50),
            address VARCHAR(50),
            role VARCHAR(50),
            payment REAL,
            subject VARCHAR(50)
            );
            `);
            db.exec(`CREATE TABLE IF NOT EXISTS staffs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(50),
                birthdate VARCHAR(50),
                address VARCHAR(50),
                role VARCHAR(50),
                payment REAL,
                sector VARCHAR(50)
                );
                `);
    return db;
}


export { createDbConnection }