import { TipoPersona } from './TipoPersona';
import { TipoDocumentoIdentidad } from './TipoDocumentoIdentidad';
import { EstadoCivil } from './EstadoCivil';

export class Persona{
    idPersona : number;
    tipoPersona : TipoPersona;
    tipoDocumento : TipoDocumentoIdentidad;
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
	esProveedor : number;
	estado : number;
}