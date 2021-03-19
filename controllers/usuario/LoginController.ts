import { Request, Response } from 'express';
import { UsuarioModel, UsuarioInterface } from '../../models/Usuario.model';
import Respuesta from '../../classes/respuesta/Respuesta';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SEED, TOKEN_EXPIRES } from '../../global/environment';

export default class LoginController {

     // ==============================================================
     // Función para el login normal
     // ==============================================================
     static async login( req: Request, res: Response ) {

          const { email, password } = req.body;

          try {

               const usuario = ( await UsuarioModel.findOne( { email } ) as UsuarioInterface );

               if ( !usuario ) {

                    return Respuesta.error({
                         ds: 'Email no existe: ' + email,
                         dsS: 'Email no existe: ' + email,
                         codigo: 404,
                         archivo: 'LoginController'
                    }, res);

               }

               // Verificar el password
               if ( !bcrypt.compareSync( password, usuario.password ) ) {

                    return Respuesta.error({
                         ds: 'Contraseña incorrecta',
                         dsS: 'Contraseña incorrecta',
                         codigo: 400,
                         archivo: 'LoginController'
                    }, res);

               }

               // Crear el token
               const token: string = jwt.sign( {
                    _id: usuario._id
               }, SEED, { expiresIn: TOKEN_EXPIRES } );

               // Respuesta con el token
               Respuesta.ok({
                    email: usuario.email,
                    id: usuario._id,
                    token
               }, res);


          } catch (error) {

               return Respuesta.error({
                    ds: 'Login Error',
                    dsS: error || '',
                    codigo: 500,
                    archivo: 'LoginController'
               }, res);

          }

     }

     // ==============================================================
     // Función para renovar el token
     // ==============================================================
     static renuevaToken( req: Request, res: Response ) {

          try {

               // Generar un nuevo token
               const token = jwt.sign({ usuario: req.params.uid }, SEED, { expiresIn: TOKEN_EXPIRES });

               // Respuesta con el token
               Respuesta.ok({
                    token
               }, res);

          } catch (error) {

          }

     }


}