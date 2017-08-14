import { Component, OnInit } from '@angular/core';
import { PratosService } from './pratos.service';
import { RestaurantesService } from '../restaurantes/restaurantes.service';
import { ActivatedRoute } from '@angular/router'
import { Prato } from './pratos.classe';
import { Restaurante } from '../restaurantes/restaurantes.classe';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { Http } from '@angular/http'
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Location } from '@angular/common';
@Component({
  selector: 'mt-pratos',
  templateUrl: './pratos.component.html',

})
export class PratosComponent implements OnInit {


  pratos: Prato[] = [];
  prato: Prato = <Prato>{};


  //Controle do formulário!
  formLabel: string;
  isEditMode: boolean = false;
  form: FormGroup;

  constructor(private pratosService: PratosService,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
    this.form = fb.group({
      CODIGO_RESTAURANTE: ["", Validators.required],
      DESCRICAO: ["", Validators.required],
      VALOR: ["", Validators.required]

    });
    this.formLabel = "Adicionar prato";
  }

  ngOnInit() {
    //this.GetPratosRestaurante();
    this.GetPratos();
  }

  /* GetPratosRestaurante(){
     this.codigo = +this.route.snapshot.params['CODIGO']
     this.pratosService.GetPratosRestaurante(this.codigo).subscribe((
     pratos: Prato[])  =>{
       this.pratos = pratos;
     });
 
   } */

  GetPratos() {
    this.pratosService.GetPratos().subscribe(data => this.pratos = data,
      error => alert(error),
      () => console.log(this.pratos)
    );
  }

  onSubmit() {
    this.prato.CODIGO_RESTAURANTE = this.form.controls["CODIGO_RESTAURANTE"].value;
    this.prato.DESCRICAO = this.form.controls["DESCRICAO"].value;
    this.prato.VALOR = this.form.controls["VALOR"].value;
    if (this.isEditMode) {
      this.pratosService.UpdatePratos(this.prato)
        .subscribe(response => {
          this.GetPratos();
          this.form.reset();
        });

    } else {
      this.pratosService.PostPratos(this.prato)
        .subscribe(response => {
          this.GetPratos();
          this.form.reset();
        });

    }


  }
  edit(prato: Prato) {
    this.formLabel = "Editar prato"
    this.isEditMode = true;
    this.prato = prato;
    this.form.get("CODIGO_RESTAURANTE").setValue(prato.CODIGO_RESTAURANTE);
    this.form.get("DESCRICAO").setValue(prato.DESCRICAO);
    this.form.get("VALOR").setValue(prato.VALOR);

  };

  cancel() {
    this.formLabel = "Adicionar prato"
    this.isEditMode = false;
    this.prato = <Prato>{};
    this.form.get("CODIGO_RESTAURANTE").setValue('');
    this.form.get("DESCRICAO").setValue('');
    this.form.get("VALOR").setValue('');
  };

  delete(prato: Prato) {
    if (confirm("Deseja excluir este prato?")) {
      this.pratosService.DeletePratos(prato.CODIGO)
        .subscribe(response => {
          this.GetPratos();
          this.form.reset();
        });
    }
  }


}
