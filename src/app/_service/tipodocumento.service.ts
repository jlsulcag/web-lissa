import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constants';
import { HttpClient } from '@angular/common/http';
import { TipoDocumentoIdentidad } from '../_model/TipoDocumentoIdentidad';
import { Subject } from 'rxjs';
import { TipoPersona } from '../_model/TipoPersona';

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {
  url : string = HOST;
  tipoDocumentoCambio = new Subject<TipoDocumentoIdentidad[]>();
  mensajeReactivo = new Subject<string>();

  constructor(private http : HttpClient) {}

  listar(){    
    return this.http.get<TipoDocumentoIdentidad[]>(`${this.url}/api/tipodocumento/list/findAll`);
  }

  registrar(obj:TipoDocumentoIdentidad){
    return this.http.post(`${this.url}/api/tipodocumento/save`, obj);
  }

  editar(obj:TipoDocumentoIdentidad){
    return this.http.put(`${this.url}/api/tipodocumento/update`, obj);
  }

  eliminar(id:number){   
    return this.http.delete(`${this.url}/api/tipodocumento/delete/${id}`);
  }
}
