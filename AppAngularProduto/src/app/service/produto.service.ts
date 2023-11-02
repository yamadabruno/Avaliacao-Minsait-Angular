import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../model/produto';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  api = 'http://localhost:8080/api/produtos';

  produtos: Produto[] = [];
  constructor(private httpCliente: HttpClient) { }

  buscarTodos() {
    return this.httpCliente.get<Produto[]>(this.api);
  }
  cadastrarProduto(produto: Produto) {
    return this.httpCliente.post(this.api, produto);
  }

  buscarProdutoPorId(id: string) {
    return this.httpCliente.get<Produto>(`http://localhost:8080/api/produtos/${id}`);
  }

  editarProduto(produto: Produto) {
    return this.httpCliente.put(this.api, produto);
  }

  excluir(id: number) {
    return this.httpCliente.delete<Produto>(`http://localhost:8080/api/produtos/${id}`)
  }

}
