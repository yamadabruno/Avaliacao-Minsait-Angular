package br.com.brunoyamada.AppProdutos.resource;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.brunoyamada.AppProdutos.model.Produto;
import br.com.brunoyamada.AppProdutos.service.ProdutoService;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoResource {
	
	private ProdutoService produtoService;
	
	
	public ProdutoResource(ProdutoService produtoService) {
		this.produtoService = produtoService;
	}
	
	@GetMapping
	public ResponseEntity<List<Produto>> getAllProdutos() {
		List<Produto> produtos = produtoService.getAll();
		
		if(produtos == null)
			return ResponseEntity.notFound().build();
		
		return ResponseEntity.ok(produtos);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Produto>> getById(@PathVariable Long id){
		Optional<Produto> produto = produtoService.getById(id);
		
		if(produto == null)
			return ResponseEntity.notFound().build();
		
		return ResponseEntity.ok(produto);
	}
	
	@PostMapping
	public ResponseEntity<Produto> save(@RequestBody Produto produto) {
		Produto newProduto = produtoService.save(produto);
		
		if(newProduto == null)
			return ResponseEntity.notFound().build();
		
		return ResponseEntity.ok(newProduto);
	}
	
	@PutMapping
	public ResponseEntity<Produto> update(@RequestBody Produto produto) {
		Produto newProduto = produtoService.update(produto);
		
		if(newProduto == null)
			return ResponseEntity.notFound().build();
		
		return ResponseEntity.ok(newProduto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		
		produtoService.delete(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
}
