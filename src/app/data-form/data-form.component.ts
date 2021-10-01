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
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null), null é valor inicial do form
    //   email: new FormControl(null)
    // });

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
        // this.resetar()
      },
      // (error:any) => alert('deu ruim')
      )
  }

  resetar(){
    this.formulario.reset()
  }


}
