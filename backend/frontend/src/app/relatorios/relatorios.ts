
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule],

  template: `
    <header class="topbar">
      <div>
        <h1>Reports</h1>
        <p>View a summary of your current inventory.</p>
      </div>
    </header>

    <section class="cards">

      <div class="card">
        <span>Registered Products</span>
        <strong>{{ produtos.length }}</strong>
      </div>

      <div class="card">
        <span>Total Units in Stock</span>
        <strong>{{ totalQuantidade }}</strong>
      </div>

      <div class="card">
        <span>Total Inventory Value</span>
        <strong>
          R$ {{ valorEstoque | number:'1.2-2' }}
        </strong>
      </div>

    </section>

    <section class="report-card">

      <div class="card-header">
        <h2>Inventory Summary</h2>
        <p>Current stock values by product.</p>
      </div>

      <div class="table-wrapper">
        <table>

          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Stock Value</th>
            </tr>
          </thead>

          <tbody>
            <tr *ngFor="let produto of produtos">

              <td>
                <strong>{{ produto.nome }}</strong>
              </td>

              <td>{{ produto.categoria }}</td>

              <td>{{ produto.quantidade }}</td>

              <td>
                R$ {{ produto.preco | number:'1.2-2' }}
              </td>

              <td>
                R$ {{
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

    .cards {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .card {
      background: white;
      padding: 22px;
      border-radius: 14px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .card span {
      display: block;
      color: #6b7280;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .card strong {
      font-size: 26px;
      color: #1f2937;
    }

    .report-card {
      background: white;
      padding: 24px;
      border-radius: 14px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .card-header {
      margin-bottom: 20px;
    }

    .card-header h2 {
      margin: 0;
      font-size: 22px;
      color: #1f2937;
    }

    .card-header p {
      margin: 5px 0 0;
      color: #6b7280;
      font-size: 14px;
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

    @media (max-width: 800px) {
      .cards {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class Relatorios implements OnInit {

  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {

    this.produtoService
      .listarProdutos()
      .subscribe({

        next: (dados: Produto[]) => {

          this.produtos = dados.map(produto => ({
            ...produto,
            quantidade: Number(produto.quantidade),
            preco: Number(produto.preco)
          }));


          this.cdr.detectChanges();
        },

        error: (erro) => {
          console.error(
            'Error loading report data:',
            erro
          );
        }

      });
  }

  get totalQuantidade(): number {

    return this.produtos.reduce(
      (total, produto) =>
        total + produto.quantidade,
      0
    );
  }

  get valorEstoque(): number {

    return this.produtos.reduce(
      (total, produto) =>
        total + (produto.quantidade * produto.preco),
      0
    );
  }
}