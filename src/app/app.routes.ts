import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { RestaurantesComponent } from './restaurantes/restaurantes.component'
import { AboutComponent } from './about/about.component'
import { PratosComponent } from './pratos/pratos.component'

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'restaurantes', component: RestaurantesComponent },
    { path: 'pratos', component: PratosComponent },
    { path: 'about', component: AboutComponent }
]