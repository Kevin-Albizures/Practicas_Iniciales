import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mysql = require('./node_modules/mysql');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const bodyParser = require('body-parser');

// creacion de la app o mi API
const app = express();

//configuraciones
app.set('port',4263);


// usando morgan para middlewares
app.use(morgan('dev')); // para poder visualizar los estados de nuestro servidor
app.use(express.json()); // para poder manjar los json
app.use(cors());
app.use(bodyParser.json());

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
        const sql_selection2 = `SELECT * FROM estudiantes_bd.usuarios3;`;
        connection.query(sql_selection2, (err, result, fields)=>{
        

        let usuarios= result;
        let existe = false
    
        for (let i = 0; i < usuarios.length; i++) {

            if (usuarios[i].Registro_A == req.body.Registro && usuarios[i].Pass == req.body.Pass ){
                existe= true 
                
                res.send({Mensaje:"Bienvenido", Usuario: usuarios[i], Estado: true});
            }        
        }
        
        if(existe==false){
            res.send({Mensaje:"No se encuentra usuario con esos datos", Estado: false});
        }
        
        }); 
    });

    
});


//CREACION DE USUARIOS 
app.post('/crearClientes',bodyParser.json(),(req,res)=>{
    console.log(req.body);

    var dato1 = req.body.Registro_A;
    var dato2 = req.body.Nombre;
    var dato3 = req.body.Apellidos;
    var dato4 = req.body.Pass;
    var dato5 = req.body.Correo;

    if(( dato1 =="" || dato1 ==" ") || ( dato2 =="" || dato2 ==" ") || ( dato3 =="" || dato3 ==" ") || ( dato4 =="" || dato4 ==" ") || ( dato5 =="" || dato5 ==" ")){

        res.send(JSON.stringify({Mensaje:"Datos inválidos para la creación", Estado: false }));
        return;

    }

    let sql_insert = `INSERT INTO usuarios3(Registro_A, Nombre, Apellidos, Pass, Correo) VALUES(${dato1}, '${dato2}', '${dato3}', '${dato4}', '${dato5}');`;

    connection.query(sql_insert, (error, results, fields) => {
        if (error) {
            res.send(JSON.stringify({Mensaje:"Error al insertar datos en la base de datos", Error: error.stack , Estado: false}));
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
        
        res.send(JSON.stringify({Mensaje:"Usuario creado correctamente", Estado: true }));
    });

    
})


//MODIFICAR PASSWORD
app.post('/modificarPass',(req,res)=>{
    const sql_selection2 = `SELECT * FROM estudiantes_bd.usuarios3;`;
    connection.query(sql_selection2, (err, result, fields)=>{

    let usuarios= result;
    let existe = false
    let user 

    if( req.body.NuevaPass =="" || req.body.NuevaPass ==" "){
        res.send(JSON.stringify({Mensaje:"Contraseña no puede ser un parámetro vacío", Estado: false }));
        return;
    }

    
    for (let i = 0; i < usuarios.length; i++) {
        

        if (usuarios[i].Registro_A == req.body.Registro && usuarios[i].Correo == req.body.Correo ){
            existe= true
            
            user=usuarios[i]

            connection.query('UPDATE estudiantes_bd.usuarios3 SET Pass = ? WHERE Registro_A = ?',[req.body.NuevaPass, user.Registro_A],(err, result, fields) => {
                if (err) {
                    console.log({Mensaje:`Hubo un error: ${err}`, Estado:false});
                    return;
                }
                res.send({Mensaje:"Se modifico correctamente la cotraseña", Estado:true});
            });
            
        }        
    }

    if (existe == false){
        res.send({Mensaje:"No se encuentra usuario con esos datos", Estado:false});
    }
    });

});


//MOSTRAR USUARIOS
app.get('/usuarios', (req, res) => {
    const sql_selection2 = `SELECT * FROM estudiantes_bd.usuarios3;`;
    connection.query(sql_selection2, (err, result, fields) => {
        console.log(result);
        res.status(200).send(result);
    });
});


//HOME
app.get('/home',(req,res)=>{
    console.log("Bienvenido a la pagina principal");
    res.send({Mensaje:"Se modifico correctamente" });

})


//CREAR COMENTARIOS
app.post('/crearComentarios',bodyParser.json(),(req,res)=>{
    console.log(req.body);

    var dato1 = req.body.Creador;
    var dato2 = req.body.Id_Creador;
    var dato3 = req.body.Curso;
    var dato4 = req.body.Catedratico;
    var dato5 = req.body.Comentario;
    var dato6 = req.body.Subcomentarios;
    console.log(dato1);

    if(( dato1 =="" || dato1 ==" ") || ( dato2 =="" || dato2 ==" ") || ( dato3 =="" || dato3 ==" ") || ( dato4 =="" || dato4 ==" ") || ( dato5 =="" || dato5 ==" ")){

        res.send(JSON.stringify({Mensaje:"Datos inválidos para la creación", Estado: false }));
        return;

    }

    let sql_insert = `INSERT INTO comentarios(Creador, Id_creador, Curso, Catedratico, Comentario, Fecha, Subcomentarios) VALUES('${dato1}', ${dato2}, '${dato3}', '${dato4}', '${dato5}', CURRENT_TIMESTAMP(), ${dato6} );`;

    connection.query(sql_insert, (error, results, fields) => {
        if (error) {
            res.send(JSON.stringify({Mensaje:"Error al insertar datos en la base de datos", Error: error.stack, Estado: false}));
            return;
        }
        
        res.send(JSON.stringify({Mensaje:"Comentario creado con exito", Estado: true}));
        console.log(results);
    });

    
})


//COMENTARIOS
app.get('/comentarios', (req, res) => {
    const sql_selection2 = `SELECT * FROM estudiantes_bd.comentarios;`;
    connection.query(sql_selection2, (err, result, fields) => {
        console.log(result);
        res.status(200).send(result);
    });
});


//CREAR CURSO
app.post('/crearCursos', bodyParser.json(), (req,res)=>{
    console.log(req.body);

    var dato1 = req.body.Id_Curso;
    var dato2 = req.body.Curso;
    var dato3 = req.body.Creditos;
    var dato4 = req.body.Id_Creador;

    if(( dato1 =="" || dato1 ==" ") || ( dato2 =="" || dato2 ==" ") || ( dato3 =="" || dato3 ==" ") || ( dato4 =="" || dato4 ==" ") ){

        res.send(JSON.stringify({Mensaje:"Datos inválidos para la creación", Estado: false }));
        return;

    }


    let sql_insert = `INSERT INTO cursos(Id_Curso, Curso, Creditos, Id_Creador) VALUES(${dato1}, '${dato2}', ${dato3} ,${dato4});`;

    connection.query(sql_insert, (error, results, fields) => {
        if (error) {
            res.send(JSON.stringify({Mensaje:"Error al insertar datos en la base de datos", Error: error.stack, Estado: false  }));
            return;
        }
        
        res.send(JSON.stringify({Mensaje:"Curso creado con exito", Estado: true}));
        console.log(results);
    });

});

//CURSOS
app.get('/cursos', (req, res) => {
    const sql_selection2 = `SELECT * FROM estudiantes_bd.cursos;`;
    connection.query(sql_selection2, (err, result, fields) => {
        console.log(result);
        res.status(200).send(result);
    });
});



//MODIFICAR USUARIO
app.post('/modificarUsuario',(req,res)=>{
    const sql_selection2 = `SELECT * FROM estudiantes_bd.usuarios3;`;
    connection.query(sql_selection2, (err, result, fields)=>{

    let usuarios= result;
    let existe = false
    let user 

    if(( req.body.Nombre =="" || req.body.Nombre ==" ") || ( req.body.Apellidos =="" || req.body.Apellidos ==" ") || ( req.body.Pass =="" || req.body.Pass ==" ") || ( req.body.Correo =="" || req.body.Correo ==" ")){

        res.send(JSON.stringify({Mensaje:"Datos inválidos para la creación", Estado: false }));
        return;

    }


    for (let i = 0; i < usuarios.length; i++) {
        

        if (usuarios[i].Registro_A == req.body.Registro_A){
            existe= true
            
            user=usuarios[i]

            connection.query('UPDATE estudiantes_bd.usuarios3 SET Nombre = ?, Apellidos=?, Pass=?, Correo= ? WHERE Registro_A = ?',[req.body.Nombre, req.body.Apellidos, req.body.Pass, req.body.Correo, user.Registro_A],(err, result, fields) => {
                if (err) {
                    console.log(`Hubo un error: ${err}`);
                    return;
                }
                res.send({Mensaje:"Se modifico correctamente", Estado: true});
            });
            
        }        
    }

    if (existe == false){
        res.send({Mensaje:"Error al insertar datos en la base de datos" , Estado: false });
    }
    });

});


//BUSCAR USUARIO
connection.query(sql_selection, (err, result, fields)=>{
    if(err){
        console.log(`Hubo un error ${err}`);
        return;
    }

    app.post('/buscarUsuario',(req,res)=>{
        const sql_selection2 = `SELECT * FROM estudiantes_bd.usuarios3;`;
        connection.query(sql_selection2, (err, result, fields)=>{
        

        let usuarios= result;
        let existe = false
    
        for (let i = 0; i < usuarios.length; i++) {

            if (usuarios[i].Registro_A == req.body.Registro){
                existe= true 
                
                res.send({Mensaje:"Bienvenido", Usuario: usuarios[i], Estado: true});
            }        
        }
        
        if(existe==false){
            res.send({Mensaje:"No se encuentra usuario con esos datos", Estado: false});
        }
        
        }); 
    });

    
});


//BUSCAR COMENTARIO
connection.query(sql_selection, (err, result, fields)=>{
    if(err){
        console.log(`Hubo un error ${err}`);
        return;
    }

    app.post('/buscarComentario',(req,res)=>{
        const sql_selection2 = `SELECT * FROM estudiantes_bd.comentarios;`;
        connection.query(sql_selection2, (err, result, fields)=>{
        

        let comentarios= result;
        let existe = false
        let comentarios_seleccionado = []
    
        for (let i = 0; i < comentarios.length; i++) {

            if (comentarios[i].Curso == req.body.Dato || comentarios[i].Catedratico == req.body.Dato ){
                existe= true 
                comentarios_seleccionado.push(comentarios[i])
            }        
        }
        
        if(existe==false){
            res.send({Mensaje:"No se encuentra usuario con esos datos", Estado: false});
        }else{
            res.send({Lista: comentarios_seleccionado, Estado:true});
        }
        
        }); 
    });

    
});


//BUSCAR COMENTARIO UNICO
connection.query(sql_selection, (err, result, fields)=>{
    if(err){
        console.log(`Hubo un error ${err}`);
        return;
    }

    app.post('/buscarComentarioUnico',(req,res)=>{
        const sql_selection2 = `SELECT * FROM estudiantes_bd.comentarios;`;
        connection.query(sql_selection2, (err, result, fields)=>{
        

        let comentarios= result;
        let existe = false
    
        for (let i = 0; i < comentarios.length; i++) {

            if (comentarios[i].Id == req.body.Id_CometarioUnico){
                existe= true 
                
                res.send({Mensaje:"Bienvenido", ComentarioP: comentarios[i], Estado: true});
            }        
        }
        
        if(existe==false){
            res.send({Mensaje:"No se encuentra usuario con esos datos", Estado: false});
        }
        
        }); 
    });

    
});


//CREAR SUBCOMENTARIOPS
app.post('/crearSubcomentarios',bodyParser.json(),(req,res)=>{
    console.log(req.body);

    var dato1 = req.body.Comentario;
    var dato2 = req.body.Id_ComentarioPri;
    var dato3 = req.body.Nombre_Usuario;

    if(( dato1 =="" || dato1 ==" ") || ( dato2 =="" || dato2 ==" ") || ( dato3 =="" || dato3 ==" ")){

        res.send(JSON.stringify({Mensaje:"Comentario no puede ser un parámetro vacío", Estado: false }));
        return;

    }
    console.log(dato1);

    let sql_insert = `INSERT INTO sub_comentarios(Comentario, Id_ComentarioPri, Nombre_Usuario) VALUES('${dato1}', ${dato2}, '${dato3}');`;

    connection.query(sql_insert, (error, results, fields) => {
        if (error) {
            res.send(JSON.stringify({Mensaje:"Error al insertar datos en la base de datos", Error: error.stack, Estado: false}));
            return;
        }
        
        res.send(JSON.stringify({Mensaje:"Comentario creado con exito", Estado: true}));
        console.log(results);
    });

    
})


//BUSCAR SUBCOMENTARIOS
connection.query(sql_selection, (err, result, fields)=>{
    if(err){
        console.log(`Hubo un error ${err}`);
        return;
    }

    app.post('/buscarSubcomentario',(req,res)=>{
        const sql_selection2 = `SELECT * FROM estudiantes_bd.sub_comentarios;`;
        connection.query(sql_selection2, (err, result, fields)=>{
        

        let comentarios= result;
        let existe = false
        let subcomentarios_seleccionado = []
    
        for (let i = 0; i < comentarios.length; i++) {

            if (comentarios[i].Id_ComentarioPri == req.body.Dato){
                existe= true 
                subcomentarios_seleccionado.push(comentarios[i])
            }        
        }
        
        if(existe==false){
            res.send({Mensaje:"No se encuentra usuario con esos datos", Estado: false});
        }else{
            res.send({Lista: subcomentarios_seleccionado, Estado:true});
        }
        
        }); 
    });

    
});

app.listen(app.get('port'),()=>{
    console.log('Servidor iniciado en el puerto: '+app.get('port'));
})

//ng serve -o


