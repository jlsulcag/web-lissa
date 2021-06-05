import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { TipoPersona } from 'src/app/_model/TipoPersona';
import { TipoPersonaService } from 'src/app/_service/tipo-persona.service';
import { TipoPersonaDialogNuevoComponent } from './tipo-persona-dialog-nuevo/tipo-persona-dialog-nuevo.component';

@Component({
  selector: 'app-tipo-persona',
  templateUrl: './tipo-persona.component.html',
  styleUrls: ['./tipo-persona.component.css']
})
export class TipoPersonaComponent implements OnInit {
  displayedColumns: string[]=['idTipoPersona', 'descripcion', 'estado', 'acciones'];
  dataSource:MatTableDataSource<TipoPersona>;

  @ViewChild(MatSort, {static:true}) sort:MatSort;
  @ViewChild(MatPaginator, {static:true}) paginator : MatPaginator;

  constructor(private tipoPersonaService : TipoPersonaService, private dialogNuevo : MatDialog,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.listar();
    this.tipoPersonaService.tipoPersonaCambio.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this. paginator;
      this.dataSource.sort = this.sort;
    });

    this.tipoPersonaService.mensajeReactivo.subscribe(data => {
      this.snackBar.open(data, 'Atención', {
        duration:2000
      });
    });
  }

  listar(){
    this.tipoPersonaService.listar().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this. paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialogCreate(){
    /* Config para configurar comportamientos predeterminados */
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; /** no se cierra el dialogo haciendo clic fuera de el */
    dialogConfig.autoFocus = true; /** Foco en el primer campo de formulario del dialog */
    dialogConfig.width = "50%";   
    this.dialogNuevo.open(TipoPersonaDialogNuevoComponent, dialogConfig);
  }

  openDialogEdit(tipoPersona? : TipoPersona){
    let tipopersonaTemp = tipoPersona != null?tipoPersona : new TipoPersona();
    /* Config para configurar comportamientos predeterminados */
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; /** no se cierra el dialogo haciendo clic fuera de el */
    dialogConfig.autoFocus = true; /** Foco en el primer campo de formulario del dialog */
    dialogConfig.width = "50%"; 
    dialogConfig.data = tipopersonaTemp;  
    this.dialogNuevo.open(TipoPersonaDialogNuevoComponent, dialogConfig);
  }

  eliminar(id:number){
    this. tipoPersonaService.eliminar(id).subscribe(()=>{
      this.tipoPersonaService.listar().subscribe(data=>{
        this.tipoPersonaService.tipoPersonaCambio.next(data);
        this.tipoPersonaService.mensajeReactivo.next('Eliminacion correcta');
      });
    });
  }

  aplicarFiltro(filterValue : string){
    console.log("ingrea filtrar");
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
