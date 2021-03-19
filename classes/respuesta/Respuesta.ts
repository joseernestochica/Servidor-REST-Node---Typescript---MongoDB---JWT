import { Response } from 'express';
import ErrorDb from '../../models/Error.model';


export default class Respuesta {

     // ==============================================================
     // Función para devolver las peticiones de error y guardar el registro
     // ==============================================================
     static error( error: any, res?: Response ) {

          const errorGuardar = new ErrorDb({

               descripcion: error.ds,
               descripcionSistema: (error.dsS) ? error.dsS : '',
               codigo: (error.codigo) ? error.codigo : '',
               archivo: (error.archivo) ? error.archivo : '',
               fecha: new Date(),
               aplicacion: 'backend'

          });

          errorGuardar.save();

          if ( res ) {

               return res.status(error.codigo).json({

                    ok: false,
                    mensaje: error.ds,
                    errors: (error.dsS) ?  error.dsS : ''

               });

          }

     }

     // ==============================================================
     // Función para devolver una petición correcta
     // ==============================================================
     static ok( respuesta: any, res: Response, codigo: number = 200 ) {

          respuesta.ok = true;

          return res.status( codigo ).json( respuesta );

     }

}