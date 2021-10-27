import { EstadoBR } from './../models/estadoBR';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CidadesBR } from '../models/cidadesBr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DropdownService{
  constructor(private http: HttpClient) {}

  getEstadosBr() {
    return this.http.get<EstadoBR>('assets/dados/estadosBr.json').pipe()
  }

  getCidadesBr(idEstado: number) {
    return this.http.get<CidadesBR[]>('assets/dados/cidadesBR.json')
    .pipe(
      map((cidades: CidadesBR[])=> cidades.filter(c => c.estado == idEstado))
    )

  }

  getCargos(){
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'},
    ]
  }
  getTecnologias(){
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'php', desc: 'JavaScript'},
      {nome: 'python', desc: 'PHP'},
      {nome: 'javascript', desc: 'Ruby'},

    ]
  }

  getNewsletter(){
    return [
      {valor: 's', desc: 'Sim'},
      {valor: 'n', desc: 'Não'}
    ]
  }
}
