import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TipoPersona } from 'src/app/_model/TipoPersona';
import { TipoPersonaService } from 'src/app/_service/tipo-persona.service';
import { FormGroup, FormControl } from '@angular/forms';
import { STATUS_ENABLE } from 'src/app/_shared/var.constants';

@Component({
  selector: 'app-tipo-persona-dialog-nuevo',
  templateUrl: './tipo-persona-dialog-nuevo.component.html',
  styleUrls: ['./tipo-persona-dialog-nuevo.component.css']
})
export class TipoPersonaDialogNuevoComponent implements OnInit {
  formDialog : FormGroup;
  tipoPersona : TipoPersona;

  statusTemp:boolean = false;
  op:number;

  constructor(private DialogRef : MatDialogRef<TipoPersonaDialogNuevoComponent>, @Inject(MAT_DIALOG_DATA) private data: TipoPersona,
  private tipoPersonaService : TipoPersonaService) { }

  ngOnInit() {
    this.formDialog = new FormGroup({
      'idTipoPersona' : new FormControl(0),
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
      this.formDialog.setValue({
        'idTipoPersona' : this.data.idTipoPersona,
        'descripcion' : this.data.descripcion,
        'estado' : this.statusTemp
      });
    } 
  }

  cerrarDialog(){
    this.initializeform();
    this.DialogRef.close();
  }

  operar(){
    this.tipoPersona = new TipoPersona();
    if(this.op == 1){      
      this.tipoPersona.descripcion = this.formDialog.value['descripcion'];
      this.tipoPersona.estado = 1;
      this.tipoPersonaService.registrar(this.tipoPersona).subscribe(data =>{
        this.tipoPersonaService.listar().subscribe(tipoPersonas =>{
          this.tipoPersonaService.tipoPersonaCambio.next(tipoPersonas);
          this.tipoPersonaService.mensajeReactivo.next("Registro Correcto");
        });
      });
    }else if(this.op == 2){
      this.tipoPersona.idTipoPersona = this.data.idTipoPersona;
      this.tipoPersona.descripcion = this.formDialog.value['descripcion'];
      this.statusTemp = this.formDialog.value['estado'];
      this.tipoPersona.estado = this.statusTemp?1:0;
      this.tipoPersonaService.editar(this.tipoPersona).subscribe(data =>{
        this.tipoPersonaService.listar().subscribe(tipoPersonas =>{
          this.tipoPersonaService.tipoPersonaCambio.next(tipoPersonas);
          this.tipoPersonaService.mensajeReactivo.next("Actualización Correcta");
        });
      });
    }
    this.DialogRef.close();
  }

  initializeform(){
    this.op = 0;
    this.formDialog.setValue({
      'idTipoPersona' : null,
      'descripcion' : '',
      'estado' : false
    });
  }  

}
