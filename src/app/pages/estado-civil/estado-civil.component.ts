import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { EstadoCivilDialogComponent } from './estado-civil-dialog/estado-civil-dialog.component';
import { EstadoCivilService } from 'src/app/_service/estado-civil.service';
import { EstadoCivil } from 'src/app/_model/EstadoCivil';

@Component({
  selector: 'app-estado-civil',
  templateUrl: './estado-civil.component.html',
  styleUrls: ['./estado-civil.component.css']
})
export class EstadoCivilComponent implements OnInit {

  displayedColumns : string[] = ["idEstadoCivil", "descripcion", 'estado', 'acciones'];
  dataSource : MatTableDataSource<EstadoCivil>;

  @ViewChild(MatSort, {static:true}) sort:MatSort;
  @ViewChild(MatPaginator, {static:true}) paginator : MatPaginator;


  constructor(private dialog:MatDialog, 
    private estadoCivilService:EstadoCivilService, 
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.listar();
    this.estadoCivilService.estadoCivilCambio.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.estadoCivilService.mensajeReactivo.subscribe(data =>{
      this.snackBar.open(data, 'Atencion', {
        duration : 2000
      });
    });
  }

  openDialogCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%"; 
    this.dialog.open(EstadoCivilDialogComponent, dialogConfig);
  }

  openDialogEdit(estadoCivil? : EstadoCivil){
    let estadoCivilTemp = estadoCivil != null?estadoCivil:new EstadoCivil();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data = estadoCivilTemp;   
    this.dialog.open(EstadoCivilDialogComponent, dialogConfig);
  }

  listar(){
    this.estadoCivilService.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this. paginator;
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(id:number){
    this. estadoCivilService.eliminar(id).subscribe(()=>{
      this.estadoCivilService.listar().subscribe(data=>{
        this.estadoCivilService.estadoCivilCambio.next(data);
        this.estadoCivilService.mensajeReactivo.next('Eliminacion correcta');
      });
    });
  }

}
