const db2i = require('idb-connector');
module.exports = {
    execute,
    executecall
};

 async function execute(query){

    return new Promise((resolve, reject) =>{
        let dbconn = new db2i.dbconn(); // Create a connection object.
        dbconn.conn('*LOCAL'); // Connect to a database.
        let stm = new db2i.dbstmt(dbconn);  // Create a statement object of the connection.
        let sql = query;
        stm.exec(sql, (result, error) => {
            if (error) {
                console.log(`Result Set: ${JSON.stringify(error)}`);
                throw error;
                reject(error);
            }
            console.log(`Result Set: ${JSON.stringify(result)}`);
            resolve(result);
            stm.close(); // Clean up the statement object.
            dbconn.disconn(); // Disconnect from the database.
            dbconn.close(); // Clean up the connection object.
        });

    });

}

async function executecall(query, params) {

    return new Promise((resolve, reject) => {
        const dbconn = new db2i.dbconn(); // Create a connection object.
        dbconn.conn('*LOCAL'); // Connect to a database.
        let stm = new db2i.dbstmt(dbconn);
        let sql = query;

        stm.prepare(sql, (error) => {
            if (error) {
                reject(error);
            }
            stm.bindParam(params, (error) => {
                if (error) {
                    reject(error);
                }
                stm.exec(sql, (out, error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(out);
                    stm.close(); // Clean up the statement object.
                    dbconn.disconn(); // Disconnect from the database.
                    dbconn.close(); // Clean up the connection object.
                });
            });
        });
    });
}
