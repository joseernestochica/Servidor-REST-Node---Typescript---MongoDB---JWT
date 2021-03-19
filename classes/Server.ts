
import express from 'express';
import { SERVER_PORT } from '../global/environment';


export default class Server {

     public app: express.Application;
     public port: number;

     // ==============================================================
     // CONSTRUCTOR **********
     // ==============================================================
     constructor() {

          this.app = express();
          this.port = SERVER_PORT;

          // body parser
          this.app.use( express.urlencoded({ extended: true }) );
          this.app.use( express.json() );

     }

     // ==============================================================
     // Función para levantar el servidor
     // ==============================================================
     run( callback: Function ) {

          this.app.listen( this.port, callback() );

     }

}