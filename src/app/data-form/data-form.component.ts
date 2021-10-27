import { CidadesBR } from './../shared/models/cidadesBr';
import { ConsultaCepService } from './../shared/service/consulta-cep.service';
import { EstadoBR } from './../shared/models/estadoBR';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DropdownService } from '../shared/service/dropdown.service';
import { empty, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent implements OnInit {
  formulario!: FormGroup;
  cargos?: any[];
  // estados?: Observable <EstadoBR[]>| any
  estados?: EstadoBR[] | any;
  cidades?: CidadesBR[] | any;
  tecnologias?: any[];
  newsletterOp?: any[];
  frameworks = ['Angular', 'React', 'Vue', 'Sencha ']

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
      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      // termos:[null, Validators.pattern('true')]
      termos: [null, Validators.requiredTrue],
      frameworks: this.buildFrameworks()
    });

    this.dropdownService.getCidadesBr(8).subscribe(console.log)

    this.formulario.get('endereco.estado')?.valueChanges
      .pipe(
        tap(estado => console.log('Novo estado: ', estado)),
        map(estado => this.estados.filter((e: { sigla: any; }) => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
        switchMap((estadoId: number) => this.dropdownService.getCidadesBr(estadoId)),
        tap(console.log)
      )
      .subscribe(cidades => this.cidades = cidades)

    // this.estados = this.dropdownService.getEstadosBr();
    this.dropdownService.getEstadosBr().subscribe(dados => this.estados = dados);
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletterOp = this.dropdownService.getNewsletter();
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false))

    return this.formBuilder.array(values)

  }

  onSubmit() {
    // console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value)

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: any) => v ? this.frameworks[i] : null)
        .filter((v: any) => v !== null)
    })

    if (this.formulario.valid) {
      this.http
        .post('http://httpbin.org/post', JSON.stringify(valueSubmit))
        .subscribe((data) => {
          // console.log(data);
          this.resetar()
        },
          // (error:any) => alert('deu ruim')
        )
    } else {
      this.verificaValidacoesForm(this.formulario)
    }
  }


  // VALIDACAO
  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      // console.log(campo)
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

  // FORM RESET
  resetar() {
    this.formulario.reset()
  }

  // METODO CONSULTA CEP
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

  setarCargo() {
    this.formulario.get('cargo')?.setValue(" ")
  }

  setarTecnologia() {
    this.formulario.get('tecnologia')?.setValue(" ")
  }

  compararCargo(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2
  }

  compararTecnologias(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.desc === obj2.desc) : obj1 === obj2
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }



}
