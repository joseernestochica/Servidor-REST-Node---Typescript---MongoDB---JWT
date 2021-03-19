import { Request, Response } from 'express';
import { UsuarioModel, UsuarioInterface } from '../../models/Usuario.model';
import Respuesta from '../../classes/respuesta/Respuesta';


export default class UsuarioController {

     // ==============================================================
     // Función para capturar todos
     // ==============================================================
     static async getUsuarios( req: Request, res: Response ): Promise<any> {

          const { desde, limit } = req.query;

          try {

               // Capturar los usuarios
               const usuarios: UsuarioInterface[] = await UsuarioModel.find({}, 'email nombre apellidos img telefono sexo fecha_nacimiento fecha_alta role google facebook activo')
                    .skip( Number(desde) || 0 )
                    .limit( Number(limit) || 10 )
                    .exec();

               // Contar los usuarios
               const totalUsuarios: number = await UsuarioModel.countDocuments({});

               // Respuesta
               Respuesta.ok({
                    usuarios,
                    totalUsuarios
               }, res);

          } catch (error) {

               return Respuesta.error({
                    ds: 'Capturar todos los usuarios',
                    dsS: error || '',
                    codigo: 500,
                    archivo: 'UsuarioController'
               }, res);

          }

     }

     // ==============================================================
     // Función para capturar por ID
     // ==============================================================
     static async getUsuario( req: Request, res: Response ): Promise<any> {

          const id: string = req.params.id;

          try {

               const usuario = await UsuarioModel.findById(id, 'email nombre apellidos img telefono sexo fecha_nacimiento fecha_alta role google facebook activo');

               if ( !usuario ) {
                    console.log('no existe');
               }

               Respuesta.ok({
                    usuario
               }, res);

          } catch (error) {

               return Respuesta.error({
                    ds: `Capturar usuario por ID: ${ id }`,
                    dsS: error || '',
                    codigo: 500,
                    archivo: 'UsuarioController'
               }, res);

          }

     }

     // ==============================================================
     // Función para insertar
     // ==============================================================
     static async postUsuario( req: Request, res: Response ): Promise<any> {

          const body: UsuarioInterface = req.body;

          try {

               // No permitir que se pueda modificar el role desde esta ruta
               body.role = 'user';

               const usuario: UsuarioInterface = await UsuarioModel.create( body );

               // Ocultar la contraseña
               usuario.password = ':-)';

               Respuesta.ok({
                    usuario
               }, res);

          } catch (error) {

               return Respuesta.error({
                    ds: 'Error al crear un nuevo usuario',
                    dsS: error || '',
                    codigo: 500,
                    archivo: 'UsuarioController'
               }, res);

          }

     }

     // ==============================================================
     // Función para editar
     // ==============================================================
     static async putUsuario( req: Request, res: Response ): Promise<any> {

          const body: UsuarioInterface = req.body;
          const id: string = req.params.id;

          // No permitir que se pueda modificar el role desde esta ruta
          body.role = 'user';

          try {

               const cuentaUsuario: number = await UsuarioModel.countDocuments({ _id: id });

               if ( cuentaUsuario === 0 ) {
                    return Respuesta.error({
                         ds: `No existe el usuario por ID: ${ id }`,
                         dsS: `No existe el usuario por ID: ${ id }`,
                         codigo: 404,
                         archivo: 'UsuarioController'
                    }, res);
               }

               const usuario: any = await UsuarioModel.findByIdAndUpdate( id, body, { new: true } );

               usuario.password = ':-)';

               Respuesta.ok({
                    usuario
               }, res);

          } catch (error) {

               return Respuesta.error({
                    ds: `Actualizar usuario por ID: ${ id }`,
                    dsS: error || '',
                    codigo: 500,
                    archivo: 'UsuarioController'
               }, res);

          }

     }

     // ==============================================================
     // Función para editar el role de un usuario. Solo role Admin
     // ==============================================================
     static async putRoleUsuario( req: Request, res: Response ) {

          const role: string = req.body.role;
          const id: string = req.params.id;

          try {

               const cuentaUsuario: number = await UsuarioModel.countDocuments({ _id: id });

               if ( cuentaUsuario === 0 ) {
                    return Respuesta.error({
                         ds: `No existe el usuario por ID: ${ id }`,
                         dsS: `No existe el usuario por ID: ${ id }`,
                         codigo: 404,
                         archivo: 'UsuarioController'
                    }, res);
               }

               const usuario: any = await UsuarioModel.findByIdAndUpdate( id, { role }, { new: true } );

               usuario.password = ':-)';

               Respuesta.ok({
                    usuario
               }, res);

          } catch (error) {

               return Respuesta.error({
                    ds: `Actualizar role usuario por ID: ${ id }`,
                    dsS: error || '',
                    codigo: 500,
                    archivo: 'UsuarioController'
               }, res);

          }

     }

     // ==============================================================
     // Función para eliminar
     // ==============================================================
     static async deleteUsuario( req: Request, res: Response ): Promise<void> {

          const id: string = req.params.id;

          try {

               await UsuarioModel.deleteOne( { _id: id } );

               Respuesta.ok({
                    ok: true,
                    mensaje: `Usuario eliminado ID: ${ id }`
               }, res);

          } catch (error) {

               Respuesta.error({
                    ds: `Eliminar usuario por ID: ${ id }`,
                    dsS: error || '',
                    codigo: 500,
                    archivo: ''
               }, res);

          }

     }

}