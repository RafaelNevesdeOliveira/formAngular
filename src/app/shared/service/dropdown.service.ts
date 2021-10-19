import { EstadoBR } from './../models/estadoBR';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DropdownService{
  constructor(private http: HttpClient) {}

  getEstadosBr() {
    return this.http.get<EstadoBR>('assets/dados/estadosBr.json').pipe()
  }
}
