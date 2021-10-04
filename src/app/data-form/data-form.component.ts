import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent implements OnInit {
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // INICIALIZADOR DO FORM E VALIDATOR
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null,[Validators.required, Validators.email]],
      cep: [null,[Validators.required]],
      rua: [null,[Validators.required]],
      complemento: [null],
      numero: [null,[Validators.required]],
      bairro: [null,[Validators.required]],
      cidade: [null,[Validators.required]],
      estado: [null,[Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.formulario);


    this.http
      .post('http://httpbin.org/post', JSON.stringify(this.formulario.value))
      .subscribe((data) => {
        console.log(data);
        this.resetar()
      },
    // (error:any) => alert('deu ruim')
      )
  }

  verificaValidTouched(campo: any){
    return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched

  }

  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email')
    if(campoEmail?.errors){
      return campoEmail.errors.required && campoEmail.touched
    }
  }

  aplicaCssErro(campo:any){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    }
  }

  resetar(){
    this.formulario.reset()
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
    //     bairro: data.bairro ,
    //     cidade: data.localidade,
    //     estado: data.uf
    //   }
    // });

    formulario.form.patchValue({
      endereco: {
        rua: data.logradouro ,
        cep: data.cep,
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
        bairro: null ,
        cidade: null,
        estado: null
      }
    })
  }


}
