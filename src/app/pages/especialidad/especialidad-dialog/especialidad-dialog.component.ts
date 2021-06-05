import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Especialidad } from 'src/app/_model/Especialidad';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import {REG_CORRECTO, ACT_CORRECTO} from 'src/app/_shared/var.constants'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-especialidad-dialog',
  templateUrl: './especialidad-dialog.component.html',
  styleUrls: ['./especialidad-dialog.component.css']
})
export class EspecialidadDialogComponent implements OnInit {
  form : FormGroup;
  especialidad : Especialidad;

  constructor(private especialidadService : EspecialidadService,
    @Inject(MAT_DIALOG_DATA) private data: Especialidad,
    private dialogRef : MatDialogRef<EspecialidadDialogComponent>
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      idEspecialidad : new FormControl(null),
      descEspecialidad : new FormControl('')
    });

    if(this.data != null){
      this.cargarData(this.data);
    }

  }

  operar(){
    this.especialidad = this.form.value;
    if(this.data == null && this.form.valid){
      this.especialidadService.save(this.especialidad).subscribe(data => {
        this.especialidadService.listar().subscribe(obj =>{
          this.especialidadService.objectCambio.next(obj);
          this.especialidadService.mensajeCambio.next(REG_CORRECTO);
          this.cerrarDialog();
        });
      });
    }else{
      this.especialidadService.update(this.especialidad).subscribe(data => {
        this.especialidadService.listar().subscribe(obj =>{
          this.especialidadService.objectCambio.next(obj);
          this.especialidadService.mensajeCambio.next(ACT_CORRECTO);
          this.cerrarDialog();
        });
      });
    }
  }

  cerrarDialog(){
    this.dialogRef.close();
    this.inicializar();
  }

  inicializar(){
    this.form.setValue({
      'idEspecialidad' : null,
      'descEspecialidad' : ''
    });
  }

  cargarData(data : Especialidad){    
    this.form.setValue({
      'idEspecialidad' : this.data.idEspecialidad,
      'descEspecialidad' : this.data.descEspecialidad
    });
  }

}
