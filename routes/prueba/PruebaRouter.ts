import { Router } from "express";
import PruebaController from '../../controllers/prueba/PruebaController';

export default class PruebaRouter {

     router: Router;

     // ==============================================================
     // CONSTRUCTOR **********
     // ==============================================================
     constructor() {

          this.router = Router();
          this.routes();
     }

     // ==============================================================
     // Rutas para Prueba
     // ==============================================================
     routes() {

          this.router.get( '/prueba', PruebaController.getPruebas );
          this.router.get( '/prueba/:id', PruebaController.getPrueba );
          this.router.post( '/prueba/', PruebaController.postPrueba );
          this.router.put( '/prueba/:id', PruebaController.putPrueba );
          this.router.delete( '/prueba/:id', PruebaController.deletePrueba );

     }

}