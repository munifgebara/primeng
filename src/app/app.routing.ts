import { RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { PessoaCadastroComponent } from './pessoa/pessoacadastro.component';

export const routing = RouterModule.forRoot([
  {
    path: 'principal',
    component: PrincipalComponent
  },
  {
    path: 'cadpessoa',
    component: PessoaCadastroComponent
  },

  {
    path: '',
    redirectTo: '/principal',
    pathMatch: 'full'
  }
]);
