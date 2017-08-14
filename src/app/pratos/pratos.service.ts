import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import { Prato } from './pratos.classe';
import { ENDERECO_SERVIDOR } from '../app.api';

@Injectable()
export class PratosService {

    constructor(private http: Http) { }


    GetPratosRestaurante(CODIGO: number): Observable<Prato[]> {
        return this.http.get(`${ENDERECO_SERVIDOR}/api/RESTAURANTE/` + CODIGO + `/PRATO`)
            .map(res => res.json());

    }

    GetPratos(): Observable<Prato[]> {
        return this.http.get(`${ENDERECO_SERVIDOR}/api/PRATO/`)
            .map(res => res.json());
    }

    PostPratos(prato: Prato) {
        return this.http.post(`${ENDERECO_SERVIDOR}/api/PRATO`, prato);
    }


    UpdatePratos(prato: Prato) {
        return this.http.put(`${ENDERECO_SERVIDOR}/api/PRATO/${prato.CODIGO}`, prato);
    }

    DeletePratos(CODIGO: number) {
        return this.http.delete(`${ENDERECO_SERVIDOR}/api/PRATO/${CODIGO}`);


    }

}