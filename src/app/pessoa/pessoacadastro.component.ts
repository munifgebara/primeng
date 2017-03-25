import { Pessoa } from './pessoa';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from './pessoa.service';


@Component({
  selector: 'pessoa-cadastroo',
  template: `
  <p-panel header="Cadastro de Pessoas" >
  <form (submit)="salvar(selecionado)">
    <div><label>Nome</label><input name="nome" type="text" pInputText [(ngModel)]="selecionado.nome"/></div>   
    <div><label>Telefone</label><input name="telefone" type="text" pInputText [(ngModel)]="selecionado.telefone"/></div>   
    <div><label>Email</label><input name="email" type="text" pInputText [(ngModel)]="selecionado.email"/></div>   
     <button type="submit" pButton label="Salvar"></button>
     <button type="reset" pButton label="Cancelar"></button>
  </form>
  

  <p-dataTable [value]="lista" selectionMode="single" #tabela>
    <p-column field="nome" header="Nome"></p-column>
    <p-column field="email" header="Email"></p-column>
    <p-column field="telefone" header="Telefone"></p-column>
    <p-column header="Ações">
      <template let-pessoa="rowData" pTemplate="body">
            <button type="button" pButton (click)="seleciona(pessoa)" label="Edita"></button>
            <button type="button" pButton (click)="deletar(pessoa.codigo)" label="Excluir"></button>
        </template>
    </p-column>
  </p-dataTable>
  </p-panel>

  `
})
export class PessoaCadastroComponent implements OnInit {


  mensagem: string;
  lista: any[];
  selecionado;

  constructor(private service: PessoaService) {
    this.lista = [];
    this.limpa();
  }
  ngOnInit(): void {
    this.mensagem = this.service.getMessagem();
    this.reload();
  }

  limpa() {
    this.selecionado = { codigo: '', nome: '', telefone: '', email: '' };
  }

  private reload() {
    this.service.list().then(lista => { this.lista = lista; console.log(lista) });
  }

  salvar(objeto) {
    if (objeto.codigo) {
      this.service.path(objeto).then(result => {
        this.reload()
        this.mensagem = "Alterou!!!!";
        this.limpa();
      }).catch(error => {
        this.mensagem = "Problema ao alterar: " + error
      })
    }
    else {
      this.service.post(objeto)
        .then(result => {
          this.reload()
          this.mensagem = "Salvou!!!!";
          this.limpa();
        }).catch(error => {
          this.mensagem = "Problema ao salvar: " + error
        })
    }
  }

  deletar(codigo) {
    this.service.delete(codigo)
      .then(() => {
        this.reload()
        this.mensagem = "Deletado com Sucesso!!!"
      })
  }

  seleciona(objeto) {
    this.selecionado = Object.assign({}, objeto);
  }
}
