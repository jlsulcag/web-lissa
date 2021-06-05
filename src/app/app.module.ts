import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PersonaComponent } from './pages/persona/persona.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { TipoPersonaComponent } from './pages/tipo-persona/tipo-persona.component';
import { TipoDocumentoIdentidadComponent } from './pages/tipo-documento-identidad/tipo-documento-identidad.component';
import { EstadoCivilComponent } from './pages/estado-civil/estado-civil.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { TipoPersonaDialogNuevoComponent } from './pages/tipo-persona/tipo-persona-dialog-nuevo/tipo-persona-dialog-nuevo.component';
import { TipoPersonaEdicionComponent } from './pages/tipo-persona/tipo-persona-edicion/tipo-persona-edicion.component';
import { EstadoCivilDialogComponent } from './pages/estado-civil/estado-civil-dialog/estado-civil-dialog.component';
import { PersonaEdicionComponent } from './pages/persona/persona-edicion/persona-edicion.component';
import { MatCardModule } from '@angular/material/card';
import { TipodocumentodialogComponent } from './pages/tipo-documento-identidad/tipodocumentodialog/tipodocumentodialog.component';
import { PersonadialogComponent } from './pages/persona/personadialog/personadialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MedicoDialogComponent } from './pages/medico/medico-dialog/medico-dialog.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { EspecialidadDialogComponent } from './pages/especialidad/especialidad-dialog/especialidad-dialog.component';
import { ConsultaMedicaComponent } from './pages/consulta-medica/consulta-medica.component';
import { AdmisionComponent } from './pages/admision/admision.component';
import { PacienteComponent } from './pages/paciente/paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    MedicoComponent,
    TipoPersonaComponent,
    TipoDocumentoIdentidadComponent,
    EstadoCivilComponent,
    SidenavComponent,
    TipoPersonaDialogNuevoComponent,
    TipoPersonaEdicionComponent,
    EstadoCivilDialogComponent,
    PersonaEdicionComponent,
    TipodocumentodialogComponent,
    PersonadialogComponent,
    MedicoDialogComponent,
    EspecialidadComponent,
    EspecialidadDialogComponent,
    ConsultaMedicaComponent,
    AdmisionComponent,
    PacienteComponent
  ],
  /*entryComponents sirve  para que pueda abrir el dialogo dentro de otra pagina embebida*/ 
  entryComponents: [
    TipoPersonaDialogNuevoComponent,
    EstadoCivilDialogComponent,
    TipodocumentodialogComponent,
    PersonadialogComponent,
    MedicoDialogComponent,
    EspecialidadDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule, /*Habilita  la caracteristica de formularios reactivos*/
    FormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
