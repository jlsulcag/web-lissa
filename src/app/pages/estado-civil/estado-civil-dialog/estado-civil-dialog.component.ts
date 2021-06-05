import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { EstadoCivil } from 'src/app/_model/EstadoCivil';
import { MatDialogRef, MAT_DIALOG_DATA, MatSlideToggleChange } from '@angular/material';
import { EstadoCivilService } from 'src/app/_service/estado-civil.service';
import { STATUS_ENABLE, STATUS_DISABLE } from 'src/app/_shared/var.constants';
import { FormGroup, FormControl } from '@angular/forms';
import { EventEmitter } from 'events';


@Component({
  selector: 'app-estado-civil-dialog',
  templateUrl: './estado-civil-dialog.component.html',
  styleUrls: ['./estado-civil-dialog.component.css']
})
export class EstadoCivilDialogComponent implements OnInit {

  formEstadoCivil : FormGroup; 
  estadoCivil:EstadoCivil;
   
  statusTemp:boolean = false;
  op:number;

  constructor(private DialogRef : MatDialogRef<EstadoCivilDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: EstadoCivil,
  private estadoCivilService : EstadoCivilService) { }

  ngOnInit() {     
    this.formEstadoCivil = new FormGroup({
      'idEstadoCivil' : new FormControl(0),
      'descripcion' : new FormControl(''),
      'estado' : new FormControl(false)
    });
    
    if(this.data == null){
      this.op = 1;
      this.statusTemp = true;
    }else{
      this.op = 2;
      if(this.data.estado == STATUS_ENABLE){
        this.statusTemp = true;
      }else{
        this.statusTemp = false;
      }
      this.formEstadoCivil.setValue({
        'idEstadoCivil' : this.data.idEstadoCivil,
        'descripcion' : this.data.descripcion,
        'estado' : this.statusTemp
      });
    } 
  }

  initForm(){
    this.op = 0;
    this.formEstadoCivil.setValue({
      'idEstadoCivil' : null,
      'descripcion' : '',
      'estado' : false
    });
  }

  cerrarDialog(){
    this.initForm();
    this.DialogRef.close();
  }

  operar(){
    this.estadoCivil = new EstadoCivil(); 
    if(this.op == 1){//Registro Nuevo          
      this.estadoCivil.descripcion = this.formEstadoCivil.value['descripcion'];
      this.estadoCivil.estado = STATUS_ENABLE;
      this.estadoCivilService.registrar(this.estadoCivil).subscribe(data => {
        this.estadoCivilService.listar().subscribe(estCivil => {
          this.estadoCivilService.estadoCivilCambio.next(estCivil);
          this.estadoCivilService.mensajeReactivo.next('Registro Correcto');
        });
      });
    }else if(this.op == 2){//Actualiza Datos
      this.estadoCivil.idEstadoCivil = this.data.idEstadoCivil;
      this.estadoCivil.descripcion = this.formEstadoCivil.value['descripcion'];
      this.statusTemp = this.formEstadoCivil.value['estado'];
      this.estadoCivil.estado = this.statusTemp?1:0;
      this.estadoCivilService.editar(this.estadoCivil).subscribe(data => {
        this.estadoCivilService.listar().subscribe(estCivil => {
          this.estadoCivilService.estadoCivilCambio.next(estCivil);
          this.estadoCivilService.mensajeReactivo.next('Actualización Correcta');
        });
      });
    }    
    this.cerrarDialog();
  }

}
