import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constants';
import { HttpClient } from '@angular/common/http';
import { TipoPersona } from '../_model/TipoPersona';
import { TipoPersonaComponent } from '../pages/tipo-persona/tipo-persona.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoPersonaService {

  /* Variable para la Url principal*/
  url:string = HOST;
  /**Variable reactiva-define al ente que va a ser observado */
  tipoPersonaCambio = new Subject<TipoPersona[]>();
  mensajeReactivo = new Subject<string>();

  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<TipoPersona[]>(`${this.url}/api/tipopersona/findAll`);
  }

  buscarxId(id:number){
    return this.http.get<TipoPersona>(`${this.url}/api/tipopersona/search/${id}`);
  }

  registrar(obj:TipoPersona){
    return this.http.post(`${this.url}/api/tipopersona/save`, obj);
  }

  editar(obj:TipoPersona){
    return this.http.put(`${this.url}/api/tipopersona/update`, obj);
  }

  eliminar(id:number){   
    return this.http.delete(`${this.url}/api/tipopersona/delete/${id}`);
  }
}
