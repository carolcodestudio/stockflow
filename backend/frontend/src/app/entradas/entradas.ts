import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-entradas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="topbar">
      <div>
        <h1>Inventory Entries</h1>
        <p>Register incoming stock for your products.</p>
      </div>
    </header>

    <section class="entrada-card">
      <div class="card-header">
        <h2>New Entry</h2>
        <p>Select a product and enter the received quantity.</p>
      </div>

      <form class="entrada-form">

        <div class="form-group">
          <label for="produto">Product</label>

          <select
            id="produto"
            name="produto"
            [(ngModel)]="produtoSelecionado"
          >
            <option [ngValue]="null">
              Select a product
            </option>

            <option
              *ngFor="let produto of produtos"
              [ngValue]="produto"
            >
              {{ produto.nome }} — current stock: {{ produto.quantidade }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="quantidade">Entry Quantity</label>

          <input
            id="quantidade"
            type="number"
            name="quantidade"
            [(ngModel)]="quantidadeEntrada"
            min="1"
          >
        </div>

        <div class="form-group">
          <label for="data">Entry Date</label>

          <input
            id="data"
            type="date"
            name="data"
            [(ngModel)]="data"
          >
        </div>

        <div class="form-group">
          <label for="observacao">Notes</label>

          <input
            id="observacao"
            type="text"
            name="observacao"
            [(ngModel)]="observacao"
            placeholder="Example: Stock replenishment"
          >
        </div>

        <div class="form-actions">
          <button
            type="button"
            class="btn-primary"
            (click)="registrarEntrada()"
            [disabled]="processando"
          >
            {{ processando ? 'Registering...' : 'Register Entry' }}
          </button>
        </div>

      </form>

      <p
        class="mensagem sucesso"
        *ngIf="mensagemSucesso"
      >
        {{ mensagemSucesso }}
      </p>

      <p
        class="mensagem erro"
        *ngIf="mensagemErro"
      >
        {{ mensagemErro }}
      </p>
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

    .entrada-card {
      background: white;
      padding: 24px;
      border-radius: 14px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .card-header {
      margin-bottom: 24px;
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

    .entrada-form {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group label {
      font-size: 14px;
      font-weight: 600;
      color: #374151;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 11px 12px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      outline: none;
      font-size: 14px;
      background: white;
    }

    .form-group input:focus,
    .form-group select:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .form-actions {
      grid-column: 1 / -1;
      display: flex;
      justify-content: flex-end;
    }

    .btn-primary {
      border: none;
      background: #2563eb;
      color: white;
      padding: 12px 18px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-primary:hover {
      background: #1d4ed8;
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .mensagem {
      margin-top: 20px;
      padding: 12px 14px;
      border-radius: 8px;
      font-size: 14px;
    }

    .sucesso {
      background: #dcfce7;
      color: #166534;
    }

    .erro {
      background: #fee2e2;
      color: #991b1b;
    }

    @media (max-width: 700px) {
      .entrada-form {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class Entradas implements OnInit {

  produtos: Produto[] = [];

  produtoSelecionado: Produto | null = null;

  quantidadeEntrada: number | null = null;

  data = '';

  observacao = '';

  mensagemSucesso = '';

  mensagemErro = '';

  processando = false;

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

          this.mensagemErro =
            'Unable to load products.';
        }
      });
  }

  registrarEntrada(): void {

    if (this.processando) {
      return;
    }

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    const quantidade = Number(
      this.quantidadeEntrada
    );

    if (
      this.produtoSelecionado === null ||
      !Number.isFinite(quantidade) ||
      quantidade <= 0
    ) {
      this.mensagemErro =
        'Select a product and enter a valid quantity.';

      return;
    }

    this.processando = true;

    this.produtoService
      .registrarEntrada(
        this.produtoSelecionado,
        quantidade
      )
      .subscribe({
        next: () => {

          this.mensagemSucesso =
            'Inventory entry registered successfully!';

          this.produtoSelecionado = null;
          this.quantidadeEntrada = null;
          this.data = '';
          this.observacao = '';

          this.processando = false;

          this.carregarProdutos();
        },

        error: (erro) => {

          console.error(
            'Error registering inventory entry:',
            erro
          );

          this.mensagemErro =
            'Unable to register the inventory entry.';

          this.processando = false;
        }
      });
  }
}