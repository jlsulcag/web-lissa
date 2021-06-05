import { TipoPersona } from './TipoPersona';
import { TipoDocumentoIdentidad } from './TipoDocumentoIdentidad';
import { EstadoCivil } from './EstadoCivil';

export class Paciente{
    idPersona : number;
    tipoPersona : TipoPersona;
    tipoDocumentoIdentidad : TipoDocumentoIdentidad;
	estadoCivil : EstadoCivil;
	nombres : string;
	apellidoPaterno :string;
	apellidoMaterno : string;
	numeroDocumentoIdentidad :string;
	fechaNacimiento : string;//capturar Date  y convertir a String para enviar formado ISO DATE
	fechaRegistro : string;
	sexo : string;
	direccion : string;
	telefono : string;
	correoElectronico : string;
	lugarNacimiento : string;
	lugarProcedencia : string;
	gradoInstruccion : string;
	ocupacion : string;
	esProveedor : number;
	estado : number;
}