import { Routes } from '@angular/router';

import { Dashboard } from './dashboard/dashboard';
import { Produtos } from './produtos/produtos';
import { Entradas } from './entradas/entradas';
import { Saidas } from './saidas/saidas';
import { Relatorios } from './relatorios/relatorios';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'produtos',
    component: Produtos
  },
  {
    path: 'entradas',
    component: Entradas
  },
  {
    path: 'saidas',
    component: Saidas
  },
  {
    path: 'relatorios',
    component: Relatorios
  }
];