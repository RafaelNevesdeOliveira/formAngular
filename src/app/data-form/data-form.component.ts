import { ConsultaCepService } from './../shared/service/consulta-cep.service';
import { EstadoBR } from './../shared/models/estadoBR';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DropdownService } from '../shared/service/dropdown.service';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent implements OnInit {
  formulario!: FormGroup;
  estados?: EstadoBR[] | any

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private dropdownService: DropdownService, private cepService: ConsultaCepService) { }

  ngOnInit(): void {
    // INICIALIZADOR DO FORM E VALIDATOR
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        rua: [null, [Validators.required]],
        complemento: [null],
        numero: [null],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]],
      })
    });

    this.dropdownService.getEstadosBr().subscribe(dados => {
      this.estados = dados
      console.log(dados)
    })
  }

  onSubmit() {
    console.log(this.formulario);

    if (this.formulario.valid) {
      this.http
        .post('http://httpbin.org/post', JSON.stringify(this.formulario.value))
        .subscribe((data) => {
          console.log(data);
          this.resetar()
        },
          // (error:any) => alert('deu ruim')
        )
    } else {
      this.verificaValidacoesForm(this.formulario)
    }
  }


  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo)
      let controle = formGroup.get(campo);
      controle?.markAsTouched()
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle)
      }
    })
  }



  verificaValidTouched(campo: any) {
    return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched

  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email')
    if (campoEmail?.errors) {
      return campoEmail.errors.required && campoEmail.touched
    }
  }

  aplicaCssErro(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    }
  }

  resetar() {
    this.formulario.reset()
  }

  consultaCEP() {

    const cep = this.formulario.get('endereco.cep')?.value
    // console.log(cep)

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)?.subscribe((dados) => this.populaDadosForm(dados))
    }

  }

  populaDadosForm(data: any) {
    this.formulario.patchValue

    this.formulario.patchValue({
      endereco: {
        rua: data.logradouro,
        cep: data.cep,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
      }
    })

    this.formulario.get('nome')?.setValue('Rafael')
    this.formulario.get('email')?.setValue('rafaelneves@test.com')
    // console.log(formulario);
  }

  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }


}
