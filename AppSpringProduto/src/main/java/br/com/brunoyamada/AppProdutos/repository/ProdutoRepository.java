package br.com.brunoyamada.AppProdutos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.brunoyamada.AppProdutos.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
