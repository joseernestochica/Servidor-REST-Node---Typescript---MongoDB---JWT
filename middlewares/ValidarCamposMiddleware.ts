import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';
import Respuesta from '../classes/respuesta/Respuesta';
import { Types } from 'mongoose';


export default class ValidarCamposMiddleware {

     // ==============================================================
     // Función para validar los campos y devolver la respuesta
     // ==============================================================
     static valida( req: Request, res: Response, next: NextFunction ) {

          try {

               validationResult( req ).throw();
               next();

          } catch (error) {

               return Respuesta.error({
                    ds: 'Campos no válidos',
                    dsS: error.errors || '',
                    codigo: 400,
                    archivo: 'ValidarCamposMiddleware'
               }, res);

          }

     }

     // ==============================================================
     // Función para validar un Object Id válido
     // ==============================================================
     static validaObjectId( req: Request, res: Response, next: NextFunction ) {

          const compruebaId: boolean = Types.ObjectId.isValid( req.params.id );

          if ( compruebaId === false ) {

               return Respuesta.error({
                    ds: 'ID inválido',
                    dsS: 'ID inválido',
                    codigo: 400,
                    archivo: 'ValidarCamposMiddleware'
               }, res);

          }

          next();

     }

}