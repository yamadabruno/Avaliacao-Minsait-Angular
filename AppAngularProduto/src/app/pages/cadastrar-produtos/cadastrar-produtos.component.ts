import { Component } from '@angular/core';
import { ProdutoService } from 'src/app/service/produto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Produto } from 'src/app/model/produto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})

export class CadastrarProdutosComponent {

  constructor(private produtoService: ProdutoService) {}

  produtoForm = new FormGroup ({
    id: new FormControl(0),
    codigoBarras: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    nome: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    preco: new FormControl(0, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
  })
  
  cadastrar(){
    const produto:Produto = this.produtoForm.value as Produto;
    this.produtoService.cadastrarProduto(produto).subscribe(result => {
      Swal.fire('PRODUTO', 'Cadastrado com sucesso!', 'success');
      this.produtoForm.reset();
    }, (error) => {
      const {message} = error;
      Swal.fire("Ocorreu um erro!", '', 'error');
    }
    )
  }

}
