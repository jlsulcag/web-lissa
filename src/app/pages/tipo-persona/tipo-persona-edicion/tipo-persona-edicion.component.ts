import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TipoPersona } from 'src/app/_model/TipoPersona';
import { TipoPersonaService } from 'src/app/_service/tipo-persona.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-tipo-persona-edicion',
  templateUrl: './tipo-persona-edicion.component.html',
  styleUrls: ['./tipo-persona-edicion.component.css']
})
export class TipoPersonaEdicionComponent implements OnInit {
  tipoPersona: TipoPersona;
  form2: FormGroup;
  /* Determina cuando  es nuevo o editar*/
  edicion: boolean;

  id: number;
  /** router
   * hace que dispongamos de la navegacion desde del ts
   */


  constructor(private tipoPersonaService: TipoPersonaService, private urlactiva: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.tipoPersona = new TipoPersona();
    this.form2 = new FormGroup({
      'id': new FormControl(0),
      'descripcion': new FormControl(''),
      'estado': new FormControl('1')
    });

    this.urlactiva.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;

      this.initForm();
    });
  }

  operar() {
    this.tipoPersona.idTipoPersona = this.form2.value['id'];
    this.tipoPersona.descripcion = this.form2.value['descripcion'];
    this.tipoPersona.estado = this.form2.value['estado'];

    if(this.edicion){
       this.tipoPersonaService.editar(this.tipoPersona).subscribe(()=>{
         this.tipoPersonaService.listar().subscribe(data=>{
           this.tipoPersonaService.tipoPersonaCambio.next(data);
           this.tipoPersonaService.mensajeReactivo.next('Actualización Correcta');
         });
       });
    }else{
      this.tipoPersonaService.registrar(this.tipoPersona).subscribe(()=>{
        this.tipoPersonaService.listar().subscribe(data=>{
          this.tipoPersonaService.tipoPersonaCambio.next(data);
          this.tipoPersonaService.mensajeReactivo.next('Registro correcto');
        });
      });
    }
    /** Navegamos a tipo persona termina la operacion */
    this.router.navigate(['tipopersona']);
    
  }

  initForm() {
    if (this.edicion) {
      //carga  la data del servicio hacia el form
      this.tipoPersonaService.buscarxId(this.id).subscribe(data => {
        this.form2 = new FormGroup({
          'id': new FormControl(data.idTipoPersona),
          'descripcion': new FormControl(data.descripcion),
          'estado': new FormControl(data.estado)
        });
      });
    } 
  }

}
