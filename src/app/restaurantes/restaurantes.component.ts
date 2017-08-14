import { Component, OnInit } from '@angular/core';
import { RestaurantesService } from './restaurantes.service';
import { ActivatedRoute } from '@angular/router'
import { Restaurante } from './restaurantes.classe';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { Http } from '@angular/http'
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";


@Component({
  selector: 'seletor-restaurantes',
  templateUrl: './restaurantes.component.html',
})

export class RestaurantesComponent implements OnInit {

  nome: string;
  restaurantes: Restaurante[] = [];
  restaurante: Restaurante = <Restaurante>{};

  //Controle do formulário!
  formLabel: string;
  isEditMode: boolean = false;
  form: FormGroup;

  constructor(private restaurantesService: RestaurantesService,
    private fb: FormBuilder) {
    this.form = fb.group({
      NOME: ["", Validators.required]
    });

    this.formLabel = "Adicionar restaurante";
  }

  ngOnInit() {
    this.GetRestaurantes();
  }

  GetRestaurantes() {
    this.restaurantesService.GetRestaurantes().subscribe(data => this.restaurantes = data,
      error => alert(error),
      () => console.log(this.restaurantes)
    );
  }

  onSubmit() {
    this.restaurante.NOME = this.form.controls["NOME"].value;
    if (this.isEditMode) {
      this.restaurantesService.UpdateRestaurantes(this.restaurante)
        .subscribe(response => {
          this.GetRestaurantes();
          this.form.reset();
        });

    } else {
      this.restaurantesService.PostRestaurantes(this.restaurante)
        .subscribe(response => {
          this.GetRestaurantes();
          this.form.reset();
        });

    }
  }

  edit(restaurante: Restaurante) {
    this.formLabel = "Editar restaurante"
    this.isEditMode = true;
    this.restaurante = restaurante;
    this.form.get("NOME").setValue(restaurante.NOME);

  };

  cancel() {
    this.formLabel = "Adicionar restaurante"
    this.isEditMode = false;
    this.restaurante = <Restaurante>{};
    this.form.get("NOME").setValue('');
  };

  delete(restaurante: Restaurante) {
    if (confirm("Deseja excluir este restaurante?")) {
      this.restaurantesService.DeleteRestaurantes(restaurante.CODIGO)
        .subscribe(response => {
          this.GetRestaurantes();
          this.form.reset();
        });
    }
  }

}