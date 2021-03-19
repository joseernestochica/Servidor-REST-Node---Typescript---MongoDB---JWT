import { Router } from "express";
import LoginController from '../../controllers/usuario/LoginController';
import { check } from 'express-validator';
import ValidarCamposMiddleware from '../../middlewares/ValidarCamposMiddleware';
import AutenticacionMiddleware from "../../middlewares/AutenticacionMiddleware";


export default class LoginRouter {

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

          // Login tradicional
          this.router.post( '/login', [
               check('email', 'Inserta un email válido').isEmail(),
               check('password', 'Inserta la contraseña').not().isEmpty(),
               ValidarCamposMiddleware.valida
          ],
           LoginController.login );

          // Renovar el token
          this.router.get( '/login/renueva', AutenticacionMiddleware.verificaToken, LoginController.renuevaToken );

     }

}