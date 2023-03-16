import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mysql = require('./node_modules/mysql');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// creacion de la app o mi API
const app = express();

//configuraciones
app.set('port',4000);


// usando morgan para middlewares
app.use(morgan('dev')); // para poder visualizar los estados de nuestro servidor
app.use(express.json()); // para poder manjar los json
app.use(cors())

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'estudiantes_bd',
    user: 'root',
    password:'hernandez15'
});
connection.connect((error)=>{
    if(error){
        console.log('Hubo un error');
        console.log(error);
        return;
    }
    console.log('Conexion exitosa');
});



const sql_selection = `SELECT * FROM estudiantes_bd.usuarios;`;

connection.query(sql_selection, (err, result, fields)=>{
    if(err){
        console.log(`Hubo un error ${err}`);
        return;
    }
    console.log(result)

    app.post('/retornoUsuario',(req,res)=>{
        let usuarios= result;
        let existe = false
    
        for (let i = 0; i < usuarios.length; i++) {

            if (usuarios[i].Registro_A == req.body.Registro){
                existe= true 
                
                res.send({Mensaje:"Bienvenido"});
            }        
        }
        
        if(existe==false){
            res.send({Mensaje:"No se encuentra usuario con esos datos"});
        }
        
       
    });






    
    
  
});





connection.end();




// server
var data = [
    {
        Titulo: 'Saludo',
        Mensaje:'Bienvenidos a la pagina principal',
        Tipo:'string' 
    },
    {
        Titulo: 'Saludo2',
        Mensaje:'Bienvenida2',
        Tipo:'string'
    }
];


//routes
app.get('/',(req,res)=>{
    res.send('Hola mundo desde mi primer Backend con NodeJS');
})


app.get('/ejemplo',(req,res)=>{
    var ejemplo = {
        "Usuario":"Hector",
        "Curso":"IPC1B",
        "Horaio":"jueves"
    }
    res.send(ejemplo);
})


app.get('/home',(req,res)=>{
    res.send(data);
})



app.listen(app.get('port'),()=>{
    console.log('Servidor iniciado en el puerto: '+app.get('port'));
})
