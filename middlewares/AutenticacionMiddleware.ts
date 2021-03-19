import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SEED, TOKEN_EXPIRES } from '../global/environment';
import Respuesta from '../classes/respuesta/Respuesta';
import { UsuarioInterface, UsuarioModel } from '../models/Usuario.model';

export default class AutenticacionMiddleware {

     // ==============================================================
     // Función para verificar el token
     // ==============================================================
     static verificaToken( req: Request, res: Response, next: NextFunction ) {

          const token = ( req.header('x-token') as string );

          if ( !token ) {

               return Respuesta.error({
                    ds: 'El token es necesario para esta ruta',
                    dsS: 'El token es necesario para esta ruta',
                    codigo: 401,
                    archivo: 'AutenticacionMiddleware.ts'
               }, res);

          }

          try {

               const usuario = ( jwt.verify( token, SEED ) as any );
               req.params.uid = usuario._id;

               next();

          } catch (error) {

               return Respuesta.error({
                    ds: 'Token incorrecto',
                    dsS: error || '',
                    codigo: 401,
                    archivo: 'AutenticacionMiddleware.ts'
               }, res);

          }

     }

     // ==============================================================
     // Función para verificar que el usuario es admin
     // ==============================================================
     static async verificaAdmin( req: Request, res: Response, next: NextFunction ) {

          const uid: string = req.params.uid;

          try {

               // Comprobar que el usuario sea un admin
               const totalAdmin: number = await UsuarioModel.countDocuments( { _id: uid, role: 'admin' } );

               if ( totalAdmin === 0 ) {

                    return Respuesta.error({
                         ds: 'Usuario incorrecto',
                         dsS: 'Usuario incorrecto',
                         codigo: 401,
                         archivo: 'AutenticacionMiddleware.ts'
                    }, res);

               }

               next();

          } catch (error) {

               return Respuesta.error({
                    ds: 'Usuario incorrecto',
                    dsS: 'Usuario incorrecto',
                    codigo: 401,
                    archivo: 'AutenticacionMiddleware.ts'
               }, res);

          }

     }

     // ==============================================================
     // Función para verificar el mismo usuario por id y token
     // ==============================================================
     static async verificaIgualUser( req: Request, res: Response, next: NextFunction ) {

          const usuario: string = ( req.query.usuario as string );
          const uid: string = req.params.uid;

          if ( usuario !== uid ) {

               // Si el usuario es distinto, solo cabe que sea un admin, comprobar...
               await AutenticacionMiddleware.verificaAdmin( req, res, next );

          } else {

               next();
          }

     }

}
