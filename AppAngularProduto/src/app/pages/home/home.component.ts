import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/service/produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Produtos Minsait';
  view: [number, number] = [1000, 400];
  produtos: Produto[] = [];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Produtos';
  showYAxisLabel = true;
  yAxisLabel = 'Preços';
  timeline = true;
  legendTitle = 'Legenda';

  colorScheme: Color = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Preço por produto',
  };

  public single: any = [];

  constructor(private produtoService: ProdutoService) {}
  ngOnInit() {
    this.produtoService.buscarTodos().subscribe(
      {
        next: produto => {
          this.single = produto.map(prodMap => ({ name: prodMap.nome, value: prodMap.preco }));
        }, 
        error: (error) => {
          const {message} = error;
          Swal.fire("Erro de conexão com a aplicação!", message, 'error');
        }
      }
    )
  }
}
