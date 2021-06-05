import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Paciente } from '../_model/Paciente';
import { HOST} from '../_shared/var.constants'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  /*Variable  para la programacion reactiva */
  pacienteCambio = new Subject<Paciente[]>();
  /**Variable reactiva para los mensajes de confirmacion */
  mensajeCambio = new Subject<string>();
  url:string = HOST;

  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<Paciente[]>(`${this.url}/api/persona/findAll`);
  }

  registrar(persona : Paciente){
    return this.http.post(`${this.url}/api/persona/save`, persona);
  }

  actualizar(persona : Paciente){
    return this.http.put(`${this.url}/api/persona/update`, persona);
  }

  eliminar(idpersona : number){
    return this.http.delete(`${this.url}/api/persona/delete/${idpersona}`);
  }

  buscarPorId(idpersona : number){
    return this.http.get<Paciente>(`${this.url}/api/persona/search/${idpersona}`);
  }

  findByNames(fullname : string){
    return this.http.get<Paciente[]>(`${this.url}/api/persona/search/fullname/${fullname}`);
  }

  findByNumDoc(typeDoc : string, nrodoc : string){   
    return this.http.get<Paciente[]>(`${this.url}/api/persona/search/docNumber/${typeDoc}/${nrodoc}`);
  }

}
