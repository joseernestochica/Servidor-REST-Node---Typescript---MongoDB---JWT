
import { Schema, model } from 'mongoose';
import mongooseValidator from 'mongoose-unique-validator';

const errorSchema = new Schema({

     descripcion: {
          type: String,
          required: [true, 'La descripción del error es obligatoria']
     },
     descripcionSistema: {
          type: String
     },
     codigo: {
          type: Number
     },
     archivo: {
          type: String
     },
     fecha: {
          type: Date, required: true
     },
     aplicacion: {
          type: String,
          required: [true, 'La aplicación es obligatoria'] }

 }, { collection: 'errores' });

 // Utilizar el Unique Validator
errorSchema.plugin(mongooseValidator, { message: 'El {PATH} debe de ser único' });

export default model( 'ErrorDb', errorSchema );