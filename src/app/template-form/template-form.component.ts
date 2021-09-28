import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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

}
