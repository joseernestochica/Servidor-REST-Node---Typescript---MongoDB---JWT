import Server from '../classes/Server';

// Rutas de la aplicación
import PruebaRouter from './prueba/PruebaRouter';
import UsuarioRouter from './usuario/UsuarioRouter';
import LoginRouter from './usuario/LoginRouter';


export default class RouterApp {

     server: Server;

     // ==============================================================
     // CONSTRUCTOR **********
     // ==============================================================
     constructor( server: Server ) {

          // Iniciar el servidor
          this.server = server;

     }

     // ==============================================================
     // Función para iniciar las rutas
     // ==============================================================
     runRutas() {

          // Ruta prueba
          this.server.app.use( '/', new PruebaRouter().router );

          // Ruta usuario
          this.server.app.use( '/', new UsuarioRouter().router );

          // Ruta para el login
          this.server.app.use( '/', new LoginRouter().router );

     }

}