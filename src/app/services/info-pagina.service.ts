import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../Interfaces/info-pagina.interface'
import { Equipo } from '../Interfaces/equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargando= false;
  equipo: Equipo[]= [];

  constructor( private http: HttpClient) { 
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
     //leer archivo Json 
    // Debemos utilizar interfaces para tener una correcta utilizacion de los objetos que objetenemos del servidor 
    // en vez de utilizar any
    this.http.get<InfoPagina>('assets/data/data-pagina.json').subscribe(
      (resp:InfoPagina) => {
        this.cargando=true;
        this.info= resp;
      }
    )
  }

  private cargarEquipo(){
    this.http.get<Equipo[]>('https://angular-portafolio-fad3b-default-rtdb.firebaseio.com/equipo.json')
    .subscribe(
      (resp:Equipo[]) => {
        this.equipo = resp;
      }
    )
  }
}
