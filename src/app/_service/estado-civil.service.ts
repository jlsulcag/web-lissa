import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from '../_shared/var.constants';
import { EstadoCivil } from '../_model/EstadoCivil';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {

  url:string = HOST;

  /**Variable reactiva-define al ente que va a ser observado */
  estadoCivilCambio = new Subject<EstadoCivil[]>();
  mensajeReactivo = new Subject<string>();

  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<EstadoCivil[]>(`${this.url}/api/estadoCivil/findAll`);
  }

  buscarxId(id:number){
    return this.http.get<EstadoCivil>(`${this.url}/estadoCivil/search/${id}`);
  }

  registrar(obj:EstadoCivil){
    return this.http.post(`${this.url}/api/estadoCivil/save`, obj);
  }

  editar(obj:EstadoCivil){
    return this.http.put(`${this.url}/api/estadoCivil/update`, obj);
  }

  eliminar(id:number){
    return this.http.delete(`${this.url}/api/estadoCivil/delete/${id}`);
  }
}
