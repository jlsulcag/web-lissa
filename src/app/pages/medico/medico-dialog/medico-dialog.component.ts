import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Medico } from 'src/app/_model/Medico';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MedicoService } from 'src/app/_service/medico.service';
import { PersonaService } from 'src/app/_service/persona.service';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/_model/Persona';
import {map} from 'rxjs/operators';
import {REG_CORRECTO, ACT_CORRECTO} from 'src/app/_shared/var.constants'
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { Especialidad } from 'src/app/_model/Especialidad';

@Component({
  selector: 'app-medico-dialog',
  templateUrl: './medico-dialog.component.html',
  styleUrls: ['./medico-dialog.component.css']
})
export class MedicoDialogComponent implements OnInit {
  form : FormGroup;
  medico : Medico;
  statusTemp : boolean=false;
  filteredOptions : Observable<any[]>;
  listPersonas : Persona[]=[];
  listEspecialidades : Especialidad[]=[];
  myControlPersona : FormControl = new FormControl();

  selectedEspecialidad : Especialidad;

  constructor(private builder : FormBuilder,
    private dialogRef : MatDialogRef<MedicoDialogComponent>,
    private medicoService : MedicoService,
    @Inject(MAT_DIALOG_DATA) private data: Medico,
    private personaService : PersonaService,
    private especialidadService : EspecialidadService ) { }

  ngOnInit() {
    this.form = this.builder.group({
      'idMedico' : new FormControl('0'),
      'persona' : this.myControlPersona,
      'tipoMedico' : new FormControl(['']),
      'colegiatura' : new FormControl(''),
      'especialidad' : new FormControl([''])

    });
    this.listarPersonas();
    this.listarEspecialidades();
    this.filteredOptions = this.myControlPersona.valueChanges.pipe(map(val => this.filter(val)));
    if(this.data == null){
      this.statusTemp = true;
    }else{
      this.statusTemp = false;
      this.cargarDatos(this.data);
    }
  }

  operar(){    
    this.medico = this.form.value;
    if(this.data == null && this.form.valid){
      this.medicoService.registrar(this.medico).subscribe(data =>{
        this.medicoService.listar().subscribe(medico => {
          this.medicoService.objectCambio.next(medico);
          this.medicoService.mensajeCambio.next(REG_CORRECTO);
          this.cerrarDialog();
        });
      });
    }else if(this.data != null && this.form.valid){
      this.medico.fechaReg = this.data.fechaReg;
      this.medicoService.actualizar(this.medico).subscribe(data => {
        this.medicoService.listar().subscribe(medico =>{
          this.medicoService.objectCambio.next(medico);
          this.medicoService.mensajeCambio.next(ACT_CORRECTO);
          this.cerrarDialog();
        });
      });
    }else{
      this.personaService.mensajeCambio.next("Formulario Invalido");      
    }
    
  }
  
  listarPersonas(){
    this.personaService.listar().subscribe(data =>{     
      this.listPersonas = data;
    });
  }

  listarEspecialidades(){
    this.especialidadService.listar().subscribe(data => {
      this.listEspecialidades = data;
    });
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

  filter(val : any){
    if(val != null && val.idPersona > 0){
      return this.listPersonas.filter(option =>
        option.nombres.toLocaleLowerCase().includes(val.nombres.toLocaleLowerCase()) || option.apellidoPaterno.toLocaleLowerCase().includes(val.apellidoPaterno.toLocaleLowerCase()));
    }else{
      return this.listPersonas.filter(option =>
        option.nombres.toLocaleLowerCase().includes(val.toLocaleLowerCase()) || option.apellidoPaterno.toLocaleLowerCase().includes(val.toLocaleLowerCase()));
    }
    
  }

  displayFn(val: Persona) {
    return val ? `${val.nombres} ${val.apellidoPaterno} ${val.apellidoMaterno}` : val;
  }

  seleccionar(e: any){
    console.log('.......................');
  }

  cargarDatos(data : Medico){    
    this.form.setValue({
      'idMedico' : this.data.idMedico,
      'persona' : this.data.persona,
      'colegiatura' : this.data.colegiatura,
      'tipoMedico' : this.data.tipoMedico,
      'especialidad' : this.data.especialidad
    });
    this.selectedEspecialidad = this.data.especialidad;
  }
  
  /* Compara las opciones del select con el valor real del objeto  */
  compareFn(obj1: Especialidad, obj2: Especialidad) { 
    return obj1 && obj2? obj1.idEspecialidad === obj2.idEspecialidad: obj1 === obj2; 
  }


}
