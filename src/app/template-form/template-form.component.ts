import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: 'nomeTeste',
    email: 'email@teste.com',
    cep: '',
    numero: '',
    complemento:'',
    bairro:'',
    cidade:'',
    estado:'',

  }

  onSubmit(form: any){
    console.log(form)
    console.log(this.usuario)
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  verificaValidTouched(campo: any){
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo:any){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    }
  }

  consultaCEP(cep:any, form: any){
    // console.log(cep)
    cep = cep.replace(/\D/g, '');

    this.resetaDadosForm(form)
    if (cep!= ""){
      this.http.get(`https://viacep.com.br/ws/${cep}/json`).subscribe(data => this.populaDadosForm(data, form))
    }
  }

  populaDadosForm(data:any, formulario: any){
    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   endereco: {
    //     rua: data.logradouro ,
    //     cep: data.cep,
    //     numero: '',
    //     complemento: data.complemento ,
    //     bairro: data.bairro ,
    //     cidade: data.localidade,
    //     estado: data.uf
    //   }
    // });

    formulario.form.patchValue({
      endereco: {
        rua: data.logradouro ,
        cep: data.cep,
        complemento: data.complemento ,
        bairro: data.bairro ,
        cidade: data.localidade,
        estado: data.uf
      }
    })
    // console.log(formulario);
  }

  resetaDadosForm(formulario:any){
    formulario.form.patchValue({
      endereco: {
        rua: null ,
        complemento: null,
        bairro: null ,
        cidade: null,
        estado: null
      }
    })
  }

}
