import { Injectable } from '@angular/core';
import { Medico } from '../_model/Medico';
import { Subject } from 'rxjs';
import { HOST } from 'src/app/_shared/var.constants'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  /*Variable  para la programacion reactiva */
  objectCambio = new Subject<Medico[]>();
  /**Variable reactiva para los mensajes de confirmacion */
  mensajeCambio = new Subject<string>();
  url:string = HOST;
  constructor(private http: HttpClient) {}

  listar(){
    return this.http.get<Medico[]>(`${this.url}/api/medico/findAll`);
  }

  registrar(obj : Medico){
    return this.http.post(`${this.url}/api/medico/save`, obj);
  }

  actualizar(obj : Medico){
    return this.http.put(`${this.url}/api/medico/update`, obj);
  }

  eliminar(id : number){
    return this.http.delete(`${this.url}/api/medico/delete/${id}`);
  }

  buscarPorId(id : number){
    return this.http.get<Medico>(`${this.url}/api/meedico/searchById/${id}`);
  }
}
