import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="topbar">
      <div>
        <h1>Products</h1>
        <p>Manage the products registered in your inventory.</p>
      </div>
    </header>

    <section class="products-card">

      <div class="table-header">
        <div>
          <h2>Product List</h2>
          <p>View all products currently registered.</p>
        </div>

        <input
          type="text"
          placeholder="Search product..."
          [(ngModel)]="termoBusca"
        >
      </div>

      <div class="table-wrapper">

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Stock Value</th>
            </tr>
          </thead>

          <tbody>

            <tr
              *ngFor="let produto of produtosFiltrados"
            >
              <td>{{ produto.id }}</td>

              <td>
                <strong>{{ produto.nome }}</strong>
              </td>

              <td>{{ produto.categoria }}</td>

              <td>{{ produto.quantidade }}</td>

              <td>
                R$ {{ produto.preco | number:'1.2-2' }}
              </td>

              <td>
                R$
                {{
                  produto.quantidade * produto.preco
                  | number:'1.2-2'
                }}
              </td>
            </tr>

          </tbody>
        </table>

      </div>

    </section>
  `,

  styles: [`
    :host {
      display: block;
    }

    .topbar {
      margin-bottom: 30px;
    }

    .topbar h1 {
      margin: 0;
      font-size: 30px;
      color: #1f2937;
    }

    .topbar p {
      margin: 6px 0 0;
      color: #6b7280;
    }

    .products-card {
      background: white;
      padding: 24px;
      border-radius: 14px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      margin-bottom: 20px;
    }

    .table-header h2 {
      margin: 0;
      font-size: 22px;
      color: #1f2937;
    }

    .table-header p {
      margin: 5px 0 0;
      color: #6b7280;
      font-size: 14px;
    }

    .table-header input {
      width: 260px;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      outline: none;
      font-size: 14px;
    }

    .table-header input:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .table-wrapper {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 14px 12px;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
      font-size: 14px;
    }

    th {
      color: #374151;
      background: #f9fafb;
    }

    td {
      color: #4b5563;
    }

    tbody tr:hover {
      background: #f9fafb;
    }

    @media (max-width: 700px) {
      .table-header {
        flex-direction: column;
        align-items: stretch;
      }

      .table-header input {
        width: 100%;
      }
    }
  `]
})
export class Produtos implements OnInit {

  produtos: Produto[] = [];

  termoBusca = '';

  constructor(
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService
      .listarProdutos()
      .subscribe({
        next: (dados: Produto[]) => {
          this.produtos = dados;
        },

        error: (erro) => {
          console.error(
            'Error loading products:',
            erro
          );
        }
      });
  }

  get produtosFiltrados(): Produto[] {

    const termo = this.termoBusca
      .trim()
      .toLowerCase();

    if (!termo) {
      return this.produtos;
    }

    return this.produtos.filter(produto =>
      produto.nome
        .toLowerCase()
        .includes(termo) ||
      produto.categoria
        .toLowerCase()
        .includes(termo)
    );
  }
}