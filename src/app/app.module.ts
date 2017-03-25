import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { HttpModule, JsonpModule } from '@angular/http';

import { DataTableModule,InputTextModule,PanelModule,ButtonModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { PrincipalComponent} from './principal/principal.component';
import { PessoaCadastroComponent} from './pessoa/pessoacadastro.component';
import { PessoaService} from './pessoa/pessoa.service';



@NgModule({
  imports: [BrowserModule, FormsModule, routing,HttpModule,JsonpModule,DataTableModule,InputTextModule,PanelModule,ButtonModule],
  declarations: [
    AppComponent,
    PrincipalComponent,
    PessoaCadastroComponent
  ],
  providers: [PessoaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
