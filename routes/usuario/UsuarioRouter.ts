import { Router } from "express";
import UsuarioController from '../../controllers/usuario/UsuarioController';
import { check } from 'express-validator';
import ValidarCamposMiddleware from '../../middlewares/ValidarCamposMiddleware';
import AutenticacionMiddleware from "../../middlewares/AutenticacionMiddleware";

export default class UsuarioRouter {

     router: Router;

     // ==============================================================
     // CONSTRUCTOR **********
     // ==============================================================
     constructor() {

          this.router = Router();
          this.routes();
     }

     // ==============================================================
     // Rutas para usuario
     // ==============================================================
     private routes() {

          // Capturar todos los usuarios
          this.router.get( '/usuario', [
               AutenticacionMiddleware.verificaToken,
               AutenticacionMiddleware.verificaAdmin
          ], UsuarioController.getUsuarios );

          // Capturar usuario por ID
          this.router.get( '/usuario/:id', ValidarCamposMiddleware.validaObjectId, UsuarioController.getUsuario );

          // Insertar un nuevo usuario
          this.router.post( '/usuario/', [
               check('email', 'Email no válido').isEmail(),
               check('nombre', 'El nombre el obligatorio').not().isEmpty(),
               check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
               check('password', 'La contraseña el obligatoria').not().isEmpty(),
               check('password', 'La contraseña debe de tener una longitud de 6 caracteres').isLength({ min: 6 }),
               ValidarCamposMiddleware.valida
          ], UsuarioController.postUsuario );

          // Actualizar usuario por ID
          this.router.put( '/usuario/:id', ValidarCamposMiddleware.validaObjectId, UsuarioController.putUsuario );

          // Actualizar Role de usuario por ID
          this.router.put( '/usuario/role/:id', [
               AutenticacionMiddleware.verificaToken,
               AutenticacionMiddleware.verificaAdmin,
               ValidarCamposMiddleware.validaObjectId
          ], UsuarioController.putRoleUsuario );

          // Eliminar un usuario
          this.router.delete( '/usuario/:id', ValidarCamposMiddleware.validaObjectId, UsuarioController.deleteUsuario );

     }

}