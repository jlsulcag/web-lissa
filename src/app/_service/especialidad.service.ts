import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from 'src/app/_shared/var.constants'
import { Subject } from 'rxjs';
import { Especialidad } from '../_model/Especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  url : string = HOST;
  /*Variable  para la programacion reactiva */
  objectCambio = new Subject<Especialidad[]>();
  /**Variable reactiva para los mensajes de confirmacion */
  mensajeCambio = new Subject<string>();
  
  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<Especialidad[]>(`${this.url}/api/especialidad/findAll`);
  }

  save(especialidad : Especialidad){
    return this.http.post(`${this.url}/api/especialidad/save`, especialidad);
  }

  update(especialidad : Especialidad){
    return this.http.put(`${this.url}/api/especialidad/update`, especialidad);
  }

  delete(id : number){
    return this.http.delete(`${this.url}/api/especialidad/delete/${id}`);
  }
}
