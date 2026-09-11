import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  criarProduto(produto: Omit<Produto, 'id'>): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  atualizarProduto(
    id: number,
    produto: Omit<Produto, 'id'>
  ): Observable<Produto> {

    return this.http.put<Produto>(
      `${this.apiUrl}/${id}`,
      produto
    );
  }

  registrarEntrada(
    produto: Produto,
    quantidadeEntrada: number
  ): Observable<Produto> {

    const produtoAtualizado = {
      nome: produto.nome,
      categoria: produto.categoria,
      quantidade: produto.quantidade + quantidadeEntrada,
      preco: produto.preco
    };

    return this.http.put<Produto>(
      `${this.apiUrl}/${produto.id}`,
      produtoAtualizado
    );
  }

  excluirProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}