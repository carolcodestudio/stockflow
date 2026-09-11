import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  produtos = signal<Produto[]>([]);
  termoBusca = signal('');

  produtosFiltrados = computed(() => {
    const termo = this.termoBusca()
      .trim()
      .toLowerCase();

    if (!termo) {
      return this.produtos();
    }

    return this.produtos().filter(produto =>
      produto.nome.toLowerCase().includes(termo) ||
      produto.categoria.toLowerCase().includes(termo)
    );
  });

  formularioAberto = signal(false);
  produtoEmEdicaoId: number | null = null;

  novoProduto = {
    nome: '',
    categoria: '',
    quantidade: 0,
    preco: 0
  };

  totalQuantidade = computed(() =>
    this.produtos().reduce(
      (total, produto) => total + produto.quantidade,
      0
    )
  );

  valorEstoque = computed(() =>
    this.produtos().reduce(
      (total, produto) =>
        total + (produto.quantidade * produto.preco),
      0
    )
  );

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe({
      next: (dados: Produto[]) => {
        this.produtos.set(dados);
      },

      error: (erro) => {
        console.error('Erro ao buscar produtos:', erro);
      }
    });
  }

  abrirFormulario(): void {
    this.produtoEmEdicaoId = null;

    this.novoProduto = {
      nome: '',
      categoria: '',
      quantidade: 0,
      preco: 0
    };

    this.formularioAberto.set(true);
  }

  editarProduto(produto: Produto): void {
    this.produtoEmEdicaoId = produto.id;

    this.novoProduto = {
      nome: produto.nome,
      categoria: produto.categoria,
      quantidade: produto.quantidade,
      preco: produto.preco
    };

    this.formularioAberto.set(true);
  }

  fecharFormulario(): void {
    this.formularioAberto.set(false);
    this.produtoEmEdicaoId = null;

    this.novoProduto = {
      nome: '',
      categoria: '',
      quantidade: 0,
      preco: 0
    };
  }

  salvarProduto(): void {
    if (this.produtoEmEdicaoId !== null) {
      this.produtoService
        .atualizarProduto(
          this.produtoEmEdicaoId,
          this.novoProduto
        )
        .subscribe({
          next: () => {
            this.carregarProdutos();
            this.fecharFormulario();
          },

          error: (erro) => {
            console.error(
              'Erro ao atualizar produto:',
              erro
            );
          }
        });

      return;
    }

    this.produtoService
      .criarProduto(this.novoProduto)
      .subscribe({
        next: () => {
          this.carregarProdutos();
          this.fecharFormulario();
        },

        error: (erro) => {
          console.error(
            'Erro ao cadastrar produto:',
            erro
          );
        }
      });
  }

  excluirProduto(id: number): void {
    const confirmar = confirm(
      'Tem certeza que deseja excluir este produto?'
    );

    if (!confirmar) {
      return;
    }

    this.produtoService
      .excluirProduto(id)
      .subscribe({
        next: () => {
          this.carregarProdutos();
        },

        error: (erro) => {
          console.error(
            'Erro ao excluir produto:',
            erro
          );
        }
      });
  }

}