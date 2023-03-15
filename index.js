import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mysql = require('./node_modules/mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'db_',
    user: 'root',
    password:''
});
connection.connect((error)=>{
    if(error){
        console.log('Hubo un error');
        console.log(error);
        return;
    }
    console.log('Conexion exitosa');
});


let name = 'estudiante2';
let lastname = 'apellido2';
let edad = 25;
let sql_insert = `INSERT INTO estudiantes(name, lastname, edad) VALUES('${name}', '${lastname}', ${edad});`;

connection.query(sql_insert);

const sql_selection = `SELECT * FROM estudiantes;`;
connection.query(sql_selection, (err, result, fields)=>{
    if(err){
        console.log(`Hubo un error ${err}`);
        return;
    }
    console.log(result);
});


connection.end();