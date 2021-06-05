import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { TipoPersona } from 'src/app/_model/TipoPersona';
import { EstadoCivil } from 'src/app/_model/EstadoCivil';
import { TipoDocumentoIdentidad } from 'src/app/_model/TipoDocumentoIdentidad';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Persona } from 'src/app/_model/Persona';
import { TipoPersonaService } from 'src/app/_service/tipo-persona.service';
import { PersonaService } from 'src/app/_service/persona.service';
import { EstadoCivilService } from 'src/app/_service/estado-civil.service';
import { TipodocumentoService } from 'src/app/_service/tipodocumento.service';
import { CorreoValidator} from 'src/app/_util/email.validator';


@Component({
  selector: 'app-personadialog',
  templateUrl: './personadialog.component.html',
  styleUrls: ['./personadialog.component.css']
})
export class PersonadialogComponent implements OnInit {
    form : FormGroup;
    persona : Persona;
    tdselected : TipoDocumentoIdentidad;
    listTipoPersona : TipoPersona[]=[];
    listEstadoCivil : EstadoCivil[]=[];
    listTipoDoc : TipoDocumentoIdentidad[]=[];

     //Variable op determina que operacion se va a realizar 1=Nuevo, 2=Editar
    op:number;
    statusTemp:boolean=false;

  constructor(private builder : FormBuilder,
    private DialogRef : MatDialogRef<PersonadialogComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: Persona,
    private tipoPersonaService : TipoPersonaService, 
    private personaService : PersonaService,
    private estadoCivilService : EstadoCivilService,
    private tipoDocService : TipodocumentoService
    ) {}

  ngOnInit() {    
    //builder para trabajo con objetos
    this.form = this.builder.group({
      'idPersona' : new FormControl('0'),
      'nombres': new FormControl(''),
      'apellidoPaterno': new FormControl(''),
      'apellidoMaterno': new FormControl(''),
      'numeroDocumentoIdentidad': new FormControl(''),
      'direccion': new FormControl(''),
      'telefono': new FormControl(''),
      'correoElectronico': new FormControl('', Validators.email),
      'tipoPersona' : new FormControl(['']),
      'estadoCivil' : new FormControl(['']),
      'tipoDocumento' : new FormControl([''])

    });
    this.listarTipoPersonas();
    this.listarEstadoCivil();
    this.listarTipoDoc(); 
    if(this.data == null){           
      this.op = 1;
      this.statusTemp = true;
    }else{     
      this.op = 2;
      this.statusTemp = false;
      this.cargarDatosPersona(this.data);
      this.tdselected = this.data.tipoDocumento;
    }
  }

  operar(){    
    this.persona = this.form.value;
    if(this.form.valid && this.data == null){
      this.personaService.registrar(this.persona).subscribe(data =>{
        this.personaService.listar().subscribe(persona =>{
          this.personaService.personaCambio.next(persona);
          this.personaService.mensajeCambio.next("Registro Correcto");
        });
        
      });
      this.cerrarDialog();
    }else{
      this.personaService.mensajeCambio.next("Formulario Invalido");
    }

    
  }

  listarTipoPersonas(){
    this.tipoPersonaService.listar().subscribe(data =>{
      this.listTipoPersona = data
    });
  }

  listarEstadoCivil(){
    this.estadoCivilService.listar().subscribe(data =>{
      this.listEstadoCivil = data;
    });
  }

  listarTipoDoc(){
    this.tipoDocService.listar().subscribe(data =>{
      this.listTipoDoc = data;
    });
  }
  
  cerrarDialog(){
    //this.initForm();
    this.DialogRef.close();
  }

  initForm(){
    this.op = 0;
    this.form.setValue(null);
  }

  cargarDatosPersona(data : Persona){     
    this.form.setValue({
      'idPersona' : this.data.idPersona,
      'nombres' : this.data.nombres,
      'apellidoPaterno' : this.data.apellidoPaterno,
      'apellidoMaterno' : this.data.apellidoMaterno,
      'numeroDocumentoIdentidad' : this.data.numeroDocumentoIdentidad,
      'direccion' : this.data.direccion,
      'telefono' : this.data.telefono,
      'correoElectronico' : this.data.correoElectronico,
      'tipoPersona' : this.data.tipoPersona,
      'estadoCivil' : this.data.estadoCivil,
      'tipoDocumento' : new FormControl(this.data.tipoDocumento)
    });
    
  }

  compareValue(data1 : TipoDocumentoIdentidad, data2 : TipoDocumentoIdentidad): boolean{
    console.log('Compare');
    console.log('data1'+data1);
    console.log('data2'+data2);    
    return data1 && data2?data1.idTipoDocumento ===data2.idTipoDocumento: data1 === data2;
  }

}
