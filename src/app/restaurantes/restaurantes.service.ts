import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { Restaurante } from './restaurantes.classe'
import { Prato } from '../pratos/pratos.classe' 
import { ENDERECO_SERVIDOR } from '../app.api'

@Injectable()
export class RestaurantesService {

    constructor(private http: Http) { }

    GetRestaurantes() {
        return this.http.get(`${ENDERECO_SERVIDOR}/api/RESTAURANTE/`)
            .map(res => res.json());
    }

    PostRestaurantes(restaurante: Restaurante) {
        return this.http.post(`${ENDERECO_SERVIDOR}/api/RESTAURANTE`, restaurante);
    }


    UpdateRestaurantes(restaurante: Restaurante) {
        return this.http.put(`${ENDERECO_SERVIDOR}/api/RESTAURANTE/${restaurante.CODIGO}`, restaurante);
    }

    DeleteRestaurantes(CODIGO: number) {
        return this.http.delete(`${ENDERECO_SERVIDOR}/api/RESTAURANTE/${CODIGO}`);


    }

}