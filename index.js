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




//VERIFICACION
const sql_selection = `SELECT * FROM estudiantes_bd.usuarios3;`;


//INICIAR SESION 
connection.query(sql_selection, (err, result, fields)=>{
    if(err){
        console.log(`Hubo un error ${err}`);
        return;
    }

    app.post('/retornoUsuario',(req,res)=>{
        let usuarios= result;
        let existe = false
    
        for (let i = 0; i < usuarios.length; i++) {

            if (usuarios[i].Registro_A == req.body.Registro && usuarios[i].Pass == req.body.Pass ){
                existe= true 
                
                res.send({Mensaje:"Bienvenido " + usuarios[i].Nombre });
            }        
        }
        
        if(existe==false){
            res.send({Mensaje:"No se encuentra usuario con esos datos"});
        }
        
       
    });

    
});


//CREACION DE USUARIOS 
app.post('/creacion',(req,res)=>{
    console.log(req.body);

    var dato1 = req.body.Registro_A;
    var dato2 = req.body.Nombre;
    var dato3 = req.body.Apellidos;
    var dato4 = req.body.Pass;
    var dato5 = req.body.Correo;

    let sql_insert = `INSERT INTO usuarios3(Registro_A, Nombre, Apellidos, Pass, Correo) VALUES(${dato1}, '${dato2}', '${dato3}', '${dato4}', '${dato5}');`;

    connection.query(sql_insert, (error, results, fields) => {
        if (error) {
            res.send({Mensaje:"Error al insertar datos en la base de datos", Error: error.stack });
            return;
        }
        var respuesta = {  
            Mensaje:"Los datos se han insertado correctamente en la base de datos", 
            Registro_A: dato1,  
            Nombre: dato2,
            Apellidos: dato3,
            Pass: dato4,    
            Correo: dato5
        }
        
        res.send(respuesta);
    });

    
})


//MODIFICAR PASSWORD
connection.query(sql_selection, (err, result, fields)=>{
    if(err){
        console.log(`Hubo un error ${err}`);
        return;
    }

    //VERIFICACION
    app.post('/modificar',(req,res)=>{
        let usuarios= result;
        let existe = false
        let user 
    
        for (let i = 0; i < usuarios.length; i++) {

            if (usuarios[i].Registro_A == req.body.Registro && usuarios[i].Correo == req.body.Correo ){
                existe= true
                
                user=usuarios[i]

                connection.query('UPDATE estudiantes_bd.usuarios3 SET Pass = ? WHERE Registro_A = ?',[req.body.NuevaPass, user.Registro_A],(err, result, fields) => {
                    if (err) {
                        console.log(`Hubo un error: ${err}`);
                        return;
                    }
                    res.send({Mensaje:"Se modifico correctamente" });
                });
                
            }        
        }

        if (existe == false){
            res.send({Mensaje:"Error al insertar datos en la base de datos" });
        }

    });

});


//MOSTRAR USUARIOS
const sql_selection2 = `SELECT * FROM estudiantes_bd.usuarios3;`;
connection.query(sql_selection2, (err, result, fields)=>{
    if(err){
        console.log(`Hubo un error ${err}`);
        return;
    }

    //VERIFICACION
    app.get('/usuarios', (req, res) => {
        const sql_selection2 = `SELECT * FROM estudiantes_bd.usuarios3;`;
        connection.query(sql_selection2, (err, result, fields) => {
          if (err) {
            console.log(`Hubo un error ${err}`);
            return;
          }
          res.send(result);
        });
      });

});


//BASE
app.get('/',(req,res)=>{
    res.send('Hola mundo desde mi primer Backend con NodeJS');
})

//HOME
app.get('/home',(req,res)=>{
    res.send({Mensaje:"Bienvenido a la pagina principal"}  );
})



app.listen(app.get('port'),()=>{
    console.log('Servidor iniciado en el puerto: '+app.get('port'));
})

//ng serve -o