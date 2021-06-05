import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoPersonaComponent } from './pages/tipo-persona/tipo-persona.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { TipoPersonaEdicionComponent } from './pages/tipo-persona/tipo-persona-edicion/tipo-persona-edicion.component';
import { EstadoCivil } from './_model/EstadoCivil';
import { EstadoCivilComponent } from './pages/estado-civil/estado-civil.component';
import { PersonaEdicionComponent } from './pages/persona/persona-edicion/persona-edicion.component';
import { TipoDocumentoIdentidadComponent } from './pages/tipo-documento-identidad/tipo-documento-identidad.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ConsultaMedicaComponent } from './pages/consulta-medica/consulta-medica.component';
import { AdmisionComponent } from './pages/admision/admision.component';
import { PacienteComponent } from './pages/paciente/paciente.component';


const routes: Routes = [  
{
  path:'tipopersona', component: TipoPersonaComponent, children:[
    {path:'nuevo', component: TipoPersonaEdicionComponent},
    {path:'editar/:id', component:TipoPersonaEdicionComponent}
  ]
},
{
  path:'estado-civil', component: EstadoCivilComponent
},
{
  path:'tipodocumento', component:TipoDocumentoIdentidadComponent
},
{
  path:'persona', component: PersonaComponent, children:[
    {path: 'nuevo', component: PersonaEdicionComponent},
    {path: 'edicion/:id', component: PersonaEdicionComponent}
  ]
},
{
  path:'medico', component:MedicoComponent
},
{
  path:'especialidad', component:EspecialidadComponent
},
{
  path:'consulta_medica', component:ConsultaMedicaComponent
},
{
  path:'admision', component:AdmisionComponent
},
{
  path:'paciente', component:PacienteComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
