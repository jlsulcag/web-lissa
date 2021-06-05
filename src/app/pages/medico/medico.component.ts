import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicoService } from 'src/app/_service/medico.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { Medico } from 'src/app/_model/Medico';
import { MedicoDialogComponent } from './medico-dialog/medico-dialog.component';
import {ELIMINACION_CORRECTA } from 'src/app/_shared/var.constants'

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  displayedColumns : String[]=['nro', 'nombres', 'numeroDocumentoIdentidad', 'telefono', 'codigo', 'especialidad', 'acciones'];
  dataSource: MatTableDataSource<Medico>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator : MatPaginator;
  
  constructor(private medicoService : MedicoService, private dialog : MatDialog,
    private snackBar : MatSnackBar) { }

  ngOnInit() {
    this.listar();
    this.medicoService.objectCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  listar(){    
    this.medicoService.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.medicoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Atención', {
        duration:2000
      });
    });

  }

  openDialog(data?:Medico){
    let dataTemp = data != null?data : null;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; /** no se cierra el dialogo haciendo clic fuera de el */
    dialogConfig.autoFocus = true; /** Foco en el primer campo de formulario del dialog */
    dialogConfig.width = "50%";
    dialogConfig.data = dataTemp;
    this.dialog.open(MedicoDialogComponent, dialogConfig);
  }

  eliminar(id:number){
    this.medicoService.eliminar(id).subscribe(()=>{
      this.medicoService.listar().subscribe(data =>{
        this.medicoService.objectCambio.next(data);
        this.medicoService.mensajeCambio.next(ELIMINACION_CORRECTA);
      });
    });
  }

  filtroPorNombre(value : string){
    console.log("ingrea filtrar");
    value = value.trim();
    value = value.toLowerCase();
    //this.dataSource.filter = value;
  }

}
