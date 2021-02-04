const criarNovaLinha = (nome, email) => {
  const linhaNovoCliente = document.createElement("tr");

  const conteudo = `
    <td class="td" data-td>${nome}</td>
    <td>${email}</td>
    <td>
        <ul class="tabela__botoes-controle">
            <li><a href="../telas/edita_cliente.html?id=" class="botao-simples botao-simples--editar">Editar</a></li>
            <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
        </ul>
    </td`;

  linhaNovoCliente.innerHTML = conteudo;
  return linhaNovoCliente;
};

const tabela = document.querySelector("[data-tabela]");

const listaClientes = () => {
    return fetch('http://localhost:3000/profile')
    .then(res =>{
        return res.json()
    } )
};

listaClientes()
.then(data =>{        
        data.forEach(el => {
          tabela.appendChild(criarNovaLinha(el.nome, el.email));
})})

