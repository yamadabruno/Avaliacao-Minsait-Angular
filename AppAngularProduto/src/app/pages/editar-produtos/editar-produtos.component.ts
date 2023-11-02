import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/service/produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.component.html',
  styleUrls: ['./editar-produtos.component.css']
})

export class EditarProdutosComponent {
  produtos: Produto[] = [];
  constructor(private produtoService: ProdutoService, private route: ActivatedRoute) {}

  editarProdutoForm = new FormGroup({
    id: new FormControl(0),
    codigoBarras: new FormControl('',[Validators.required,Validators.minLength(5), Validators.maxLength(30)]),
    nome: new FormControl('',[Validators.minLength(5), Validators.maxLength(100)]),
    preco: new FormControl(0,[Validators.minLength(1), Validators.maxLength(10)]),
  })
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produtoService.buscarProdutoPorId(id).subscribe(produto => {
        this.editarProdutoForm.setValue({
          id: produto.id,
          codigoBarras: produto.codigoBarras,
          nome: produto.nome,
          preco: produto.preco
        })
      });
    }
  }

  editar() {
    const produto: Produto = this.editarProdutoForm.value as Produto;
    Swal.fire({
      title: 'Salvar as alterações?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Salvar',
      denyButtonText: `Não Salvar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtoService.editarProduto(produto).subscribe(
          { 
            error: (error) => {
              const { message } = error;
              Swal.fire("Ocorreu um erro!", "Esse código de barras já cadastrado!" , 'error');
            }
          }
        )
        Swal.fire('Produto', 'Editado com sucesso!', 'success')
      } else if (result.isDenied) {
        Swal.fire('Produto', 'NÃO foi atualizado!', 'info')
      }
    })
  }

}
