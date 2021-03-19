import { Request, Response } from 'express';
import Respuesta from '../../classes/respuesta/Respuesta';

export default class PruebaController {

     // ==============================================================
     // Función para capturar todos
     // ==============================================================
     static async getPruebas( req: Request, res: Response ): Promise<void> {

          try {

               Respuesta.ok({
                    mensaje: 'Ruta Get Prueba correcta'
               }, res);

          } catch (error) {

               Respuesta.error({
                    ds: 'Excepcion Ruta Get Capturar todos',
                    dsS: error || '',
                    codigo: 503,
                    archivo: ''
               }, res);

          }

     }

     // ==============================================================
     // Función para capturar por ID
     // ==============================================================
     static async getPrueba( req: Request, res: Response ): Promise<void> {

          const id: string = req.params.id;

          try {

               Respuesta.ok({
                    mensaje: 'Ruta Get Prueba correcta',
                    id
               }, res);

          } catch (error) {

               Respuesta.error({
                    ds: 'Excepcion Ruta Get Capturar por ID',
                    dsS: error || '',
                    codigo: 503,
                    archivo: ''
               }, res);

          }

     }

     // ==============================================================
     // Función para insertar
     // ==============================================================
     static async postPrueba( req: Request, res: Response ): Promise<void> {

          const { body, de }: any = req.body;

          try {

               Respuesta.ok({
                    ok: true,
                    body,
                    de
               }, res);

          } catch (error) {

               Respuesta.error({
                    ds: 'Excepcion Ruta Post Insertar',
                    dsS: error || '',
                    codigo: 503,
                    archivo: ''
               }, res);

          }

     }

     // ==============================================================
     // Función para editar
     // ==============================================================
     static async putPrueba( req: Request, res: Response ): Promise<void> {

          const { body, de }: any = req.body;
          const id: string = req.params.id;

          try {

               Respuesta.ok({
                    ok: true,
                    id,
                    body,
                    de
               }, res);

          } catch (error) {

               Respuesta.error({
                    ds: 'Excepcion Ruta Put Actualizar',
                    dsS: error || '',
                    codigo: 503,
                    archivo: ''
               }, res);

          }

     }

     // ==============================================================
     // Función para eliminar
     // ==============================================================
     static async deletePrueba( req: Request, res: Response ): Promise<void> {

          const id: string = req.params.id;

          try {

               Respuesta.ok({
                    ok: true,
                    id
               }, res);

          } catch (error) {

               Respuesta.error({
                    ds: 'Excepcion Ruta Put Eliminar',
                    dsS: error || '',
                    codigo: 503,
                    archivo: ''
               }, res);

          }

     }

}