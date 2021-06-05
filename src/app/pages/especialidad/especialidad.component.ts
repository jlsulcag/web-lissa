import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { Especialidad } from 'src/app/_model/Especialidad';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { EspecialidadDialogComponent } from './especialidad-dialog/especialidad-dialog.component';
import { ELIMINACION_CORRECTA } from 'src/app/_shared/var.constants';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {
  
  dataSource : MatTableDataSource<Especialidad>;
  displayedColumns : String[]=['nro', 'descripcion', 'estado', 'acciones'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator : MatPaginator;

  constructor(private especialidadService : EspecialidadService, 
    private dialog : MatDialog,
    private snackBar:MatSnackBar
    ) { }

  ngOnInit() {
    this.listar();
    this.especialidadService.objectCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.especialidadService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data, 'Atencion', {
        duration : 2000
      });
    });
  }

  listar(){
    this.especialidadService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(especialidad? : Especialidad){
    let dataTemp = especialidad != null?especialidad : null;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; /** no se cierra el dialogo haciendo clic fuera de el */
    dialogConfig.autoFocus = true; /** Foco en el primer campo de formulario del dialog */
    dialogConfig.width = "50%";
    dialogConfig.data = dataTemp;
    this.dialog.open(EspecialidadDialogComponent, dialogConfig);
  }

  delete(id:number){
    this.especialidadService.delete(id).subscribe(data =>{
      this.especialidadService.listar().subscribe(obj =>{
        this.especialidadService.objectCambio.next(obj);
        this.especialidadService.mensajeCambio.next(ELIMINACION_CORRECTA);
      });
    });
  }

}
