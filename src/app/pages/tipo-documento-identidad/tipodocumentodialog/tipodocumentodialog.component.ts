import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TipoDocumentoIdentidad } from 'src/app/_model/TipoDocumentoIdentidad';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TipodocumentoService } from 'src/app/_service/tipodocumento.service';
import { TipoDocumentoIdentidadComponent } from '../tipo-documento-identidad.component';
import { STATUS_ENABLE } from 'src/app/_shared/var.constants';

@Component({
  selector: 'app-tipodocumentodialog',
  templateUrl: './tipodocumentodialog.component.html',
  styleUrls: ['./tipodocumentodialog.component.css']
})
export class TipodocumentodialogComponent implements OnInit {
  formDialog : FormGroup;
  tipoDoc : TipoDocumentoIdentidad;
  //Variable op determina que operacion se va a realizar 1=Nuevo, 2=Editar
  op:number;
  statusTemp:boolean=false;
  prueba : boolean = false;

  constructor(private DialogRef : MatDialogRef<TipoDocumentoIdentidadComponent>, @Inject(MAT_DIALOG_DATA) private data: TipoDocumentoIdentidad,
  private tipoDocumentoService : TipodocumentoService) { }

  ngOnInit() {
    this.formDialog = new FormGroup({
      'idTipoDocumento' : new FormControl(0),
      'abreviatura' : new FormControl(''),
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
        'idTipoDocumento' : this.data.idTipoDocumento,
        'abreviatura' : this.data.abreviatura,
        'descripcion' : this.data.descripcion,
        'estado' : this.statusTemp
      });
    }
    
  }

  operar(){
    this.tipoDoc = new TipoDocumentoIdentidad();
    if(this.op == 1){      
      this.tipoDoc.abreviatura = this.formDialog.value['abreviatura'];
      this.tipoDoc.descripcion = this.formDialog.value['descripcion'];
      this.tipoDoc.estado = STATUS_ENABLE;
      this.tipoDocumentoService.registrar(this.tipoDoc).subscribe(data =>{
        this.tipoDocumentoService.listar().subscribe(tipoDocs =>{
          this.tipoDocumentoService.tipoDocumentoCambio.next(tipoDocs);
          this.tipoDocumentoService.mensajeReactivo.next('Registro Correcto');
        });
      });
    }else if(this.op == 2){ 
      this.tipoDoc.idTipoDocumento = this.data.idTipoDocumento;
      this.tipoDoc.abreviatura = this.formDialog.value['abreviatura'];
      this.tipoDoc.descripcion = this.formDialog.value['descripcion'];
      this.statusTemp = this.formDialog.value['estado'];
      this.tipoDoc.estado = this.statusTemp?1:0;
      this.tipoDocumentoService.editar(this.tipoDoc).subscribe(data =>{
        this.tipoDocumentoService.listar().subscribe(tipoDocs =>{
          this.tipoDocumentoService.tipoDocumentoCambio.next(tipoDocs);
          this.tipoDocumentoService.mensajeReactivo.next('Actualización Correcta');
        });
      });
    }
    this.cerrarDialog();
  }

  cerrarDialog(){
    this.initForm();
    this.DialogRef.close();
  }

  initForm(){
    this.op = 0;
    this.formDialog.setValue({
      'idTipoDocumento' : null,
      'abreviatura' : '',
      'descripcion' : '',
      'estado' : false
    });
  }

}
