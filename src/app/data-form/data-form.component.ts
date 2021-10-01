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


}
