const mysql = require("mysql12");

const mySqlConfig = {
    host: "127.0.0.1",
    database: "karaokeQuiz",
    user: "karol",
    password: "music2024"
};

function execute(instruction) {
    return new Promise(function (resolve, reject) {
        const connection = mysql.createConnection(mySqlConfig);
        connection.connect();
        connection.query(instruction, function (error, results) {
            connection.end();
            if (error) {
                reject(error);
            }
            resolve(results);
        });
        connection.on('error', function (error) {
            return ("ERRO NO MySQL WORKBENCH: ", error.sqlMessage);
        });
    });
}

module.exports = { execute }