import { Injectable } from "@angular/core"
import { Http, HttpModule, JsonpModule } from "@angular/http"

import { Pessoa } from './pessoa';

@Injectable()
export class PessoaService {

  private baseUrl = 'https://projeto-bc697.firebaseio.com';
  private colecao = 'pessoa';

  private mensagem: string = "Carregando";

  constructor(private http: Http) {
  }

  getMessagem(): string {
    return this.mensagem;
  }

  list() {
    return this.http.get(`${this.baseUrl}/${this.colecao}.json`).toPromise().then(response => this.convert(response.json()));
  }

  post(pessoa: Pessoa) {
    return this.http.post(`${this.baseUrl}/${this.colecao}.json`, pessoa).toPromise().then(response => this.convert(response.json()));
  }

  path(pessoa: Pessoa) {
    let codigo = pessoa.codigo;
    delete pessoa.codigo;
    return this.http.patch(`${this.baseUrl}/${this.colecao}/${codigo}.json`, pessoa).toPromise();
  }

  delete(codigo) {
    return this.http.delete(`${this.baseUrl}/${this.colecao}/${codigo}.json`).toPromise();
  }

  private convert(parsedResponse) {
    return Object.keys(parsedResponse)
      .map(id => ({
        codigo: id,
        nome: parsedResponse[id].nome,
        telefone: parsedResponse[id].telefone,
        email: parsedResponse[id].email
      }))
      .sort((a, b) => a.nome.localeCompare(b.nome));
  }
}