import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCEP(cep: string) {
    // console.log(cep)
    cep = cep.replace(/\D/g, '');

    if (cep !== '') {
      let validaCep = /^[0-9]{8}$/

      if (validaCep.test(cep)){
        return this.http.get(`https://viacep.com.br/ws/${cep}/json`)
      }
    }
    return of({})

  }
}
