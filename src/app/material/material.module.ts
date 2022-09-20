
import { NgModule } from '@angular/core';
import {MatTableModule, MatToolbarModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatSortModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSlideToggleModule, MatSnackBarModule, MatSidenavModule, MatMenuModule, MatDividerModule, MatDialogModule, MatListModule, MatSelectModule, MatTabsModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatTabsModule
  ], 
  exports: [
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatTabsModule
  ]
})
export class MaterialModule { }
