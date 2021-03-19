import Server from "./classes/Server";
import RouterApp from './routes/RouterApp';
import cors from 'cors';
import DataBase from './classes/DataBase';

// ==============================================================
// Inicializar la clase para el Server
// ==============================================================
const server = new Server();

// CORS
server.app.use( cors({ origin: true, credentials: true }) );

// BASE DE DATOS
const dataBase = new DataBase();
dataBase.run();


// RUTAS PARA LAS PETICIONES
const rutasApp = new RouterApp( server );
rutasApp.runRutas();


// INICIAR EL SERVIDOR
server.run( () => {

     console.log(`Servidor corriendo en el puerto ${ server.port }`);

});