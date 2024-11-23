import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../Interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[]= [];
  cargando:boolean=true;
  productosFiltrado: Producto[]=[];

  constructor(private http: HttpClient) {
    this.cargarProductos()
   }

  private cargarProductos(): Promise<void>{

    return new Promise ((resolve, reject)=>{
      this.http.get<Producto[]>('https://angular-portafolio-fad3b-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe(
      (resp: Producto[]) =>{
        this.productos= resp;
        this.cargando=false;
        resolve();
      }
    )
    })
  }

  public getProductos(id:string){
    return  this.http.get<any>(`https://angular-portafolio-fad3b-default-rtdb.firebaseio.com/productos/${id}.json`)
  }

  buscarProducto(termino: string){
    if(this.productos.length===0){
      //esperar que esten cargados los productos
      this.cargarProductos().then(()=>{
        //ejecutar depues de tener los productos 
        //aplicar filtro
        this.filtrarProductos(termino);
      }) 
    }
    else{
      //aplicar los filtros 
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino:string){

    this.productosFiltrado=[];
    termino= termino.toLowerCase();
    this.productos.forEach(prod =>{
      const tituloLower=prod.titulo?.toLocaleLowerCase()
      if(prod.categoria && prod.categoria.indexOf(termino) >= 0
       || tituloLower&&tituloLower.indexOf(termino) >= 0 ) {
        this.productosFiltrado.push(prod);
      }
    })
  }
}
