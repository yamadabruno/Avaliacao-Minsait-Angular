import { Component } from '@angular/core';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/service/produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})

export class ProdutosComponent {

  produtos: Produto[] = [];
  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.produtoService.buscarTodos().subscribe(
      {
        next: produtos => {
          this.produtos = produtos;
        }, 
        error: (error) => {
          const {message} = error;
          Swal.fire("Erro de conexão com a aplicação!", message, 'error');
        }
      })
  }

  excluirProduto(id: number) {
    Swal.fire({
      title: 'Deseja EXCLUIR o Produto?',
      text: "Não poderá ser desfeito!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Excluir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtoService.excluir(id).subscribe(produtos => {
          this.produtos = this.produtos.filter((produto) => produto.id != id);
        })
        Swal.fire('Produto','Excluído com sucesso','success')
      }
    })
  }
  
}
