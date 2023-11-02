package br.com.brunoyamada.AppProdutos.model;

import java.math.BigDecimal;
import java.util.Objects;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "produtos")
public class Produto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true)
	@NotNull(message = "Campo obrigatório")
	@NotBlank(message = "Campo não pode ser vazio")
	@Length(min = 5, max = 20, message = "Campo não pode conter menos que 5 e mais de 20 caracteres")
	private String codigoBarras;
	
	@Column(nullable = false)
	@NotNull(message = "Nome obrigatório")
	@NotBlank(message = "Nome não pode ser vazio")
	@Length(min = 5, max = 100, message = "Nome não pode conter menos que 5 e mais de 100 caracteres")
	private String nome;
	
	@Column(nullable = false)
	@NotNull(message = "Preço de produto obrigatório")
	@Max(value = 10, message = "Preço não pode ser maior que 10")
	@Min(value = 1, message = "Preço não pode ser menor que 1")
	private BigDecimal preco;
	
	public Produto() {}
	public Produto(Long id, String codigoBarras, BigDecimal preco, String nome) {
		this.id = id;
		this.codigoBarras = codigoBarras;
		this.preco = preco;
		this.nome = nome;
	}
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCodigoBarras() {
		return codigoBarras;
	}
	public void setCodigoBarras(String codigoBarras) {
		this.codigoBarras = codigoBarras;
	}
	public BigDecimal getPreco() {
		return preco;
	}
	public void setPreco(BigDecimal preco) {
		this.preco = preco;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Produto other = (Produto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
