import { Persona } from './Persona';
import { Especialidad } from './Especialidad';

export class Medico{
    idMedico : number;
    persona : Persona;
    especialidad : Especialidad;
    tipoMedico : String;
    colegiatura : String;
    fechaReg : String;
    estado : number;
}