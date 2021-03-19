import { MOGODB_PORT } from '../global/environment';
import { MOGODB_NOMBRE } from '../global/environment';
import mongoose from 'mongoose';


export default class DataBase {

     port: number;
     baseDatos: string;

     // ==============================================================
     // CONSTRUCTOR **********
     // ==============================================================
     constructor() {

          this.port = MOGODB_PORT;
          this.baseDatos = MOGODB_NOMBRE;

     }

     // ==============================================================
     // Función para iniciar Mongo
     // ==============================================================
     async run() {

          try {

               await mongoose.connect( `mongodb://localhost:${ MOGODB_PORT }/${ MOGODB_NOMBRE }`, {

                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false

               });

               console.log('>>> Base de datos MongoDB: \x1b[32m%s\x1b[0m', 'online');

          } catch {

               console.error('Error conexión base de datos MongoDB: \x1b[32m%s\x1b[0m', 'offline');

          }

     }

}