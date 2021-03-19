
import { Document, Schema, Model, model, Error } from 'mongoose';
import mongooseValidator from 'mongoose-unique-validator';
import bcrypt from 'bcryptjs';

// Interface
export interface UsuarioInterface extends Document {

     email: string;
     nombre: string;
     apellidos: string;
     telefono: string;
     password: string;
     ubicacion: {
          type: string,
          coordinates: string
     };
     img: string;
     sexo: string;
     fecha_nacimiento: Date;
     fecha_alta: Date;
     role: string;
     activo: boolean;
     google: boolean;
     facebook: boolean;
}

// Modelo
const usuarioSchema = new Schema({

     email: { type: String, unique: true, required: [true, 'El Email es obligatorio'],
          trim: true,
          lowercase: true,
          //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Introduce un email válido']
     },
     nombre: { type: String, trim: true, required: [true, 'El Nombre es obligatorio'] },
     apellidos: { type: String, trim: true, required: [true, 'Los apellidos son obligatorios'] },
     telefono: { type: String, trim: true, required: false },
     password: { type: String, trim: true, required: [true, 'La Contraseña es obligatoria'] },
     ubicacion: {
          type: { type: String, default: 'Point', required: false },
          coordinates: [Number]
     },
     img: { type: String, required: false, default: '' },
     sexo: { type: String, required: false, default: '',
          enum: { values: [null, 'h', 'm'], message: '{VALUE} no es un sexo permitido' }
     },
     fecha_nacimiento: { type: Date, required: false, default: '' },
     fecha_alta: { type: Date, required: false, default: '' },
     role: { type: String, required: true, default: 'user',
          enum: { values: ['admin', 'user'], message: '{VALUE} no es un rol permitido' }
     },
     activo: { type: Boolean, default: false },
     google: { type: Boolean, default: false },
     facebook: { type: Boolean, default: false }

 }, { collection: 'usuarios' });

// Utilizar el Unique Validator
usuarioSchema.plugin(mongooseValidator, { message: 'El {PATH} debe de ser único' });

// Encriptar la contraseña
usuarioSchema.pre<UsuarioInterface>("save", function save(next) {

     const usuario = this;

     bcrypt.genSalt(10, (err, salt) => {

          if (err) { return next(err); }

          bcrypt.hash(this.password, salt, ( err: Error, hash ) => {

               if (err) { return next(err); }
               usuario.password = hash;
               next();
          });
     });
});

export const UsuarioModel: Model<UsuarioInterface> = model<UsuarioInterface>("UsuarioModel", usuarioSchema);

