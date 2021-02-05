import { clienteService } from "../service/cliente-service.js";

const criarNovaLinha = (nome, email, id) => {
  const linhaNovoCliente = document.createElement("tr");

  const conteudo = `
      <td class="td" data-td>${nome}</td>
      <td>${email}</td>
      <td>
          <ul class="tabela__botoes-controle">
              <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
              <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
          </ul>
      </td`;

  linhaNovoCliente.innerHTML = conteudo;
  linhaNovoCliente.dataset.id = id;
  console.log(id);
  return linhaNovoCliente;
};

const tabela = document.querySelector("[data-tabela]");

tabela.addEventListener("click", async (e) => {
  let confirmaBotaoDeletar =
    e.target.className === "botao-simples botao-simples--excluir";

  if (confirmaBotaoDeletar) {
    try{
      const linhaCliente = e.target.closest("[data-id]");
      let id = linhaCliente.dataset.id;
      await clienteService.removeCliente(id);
      linhaCliente.remove();
    }
    catch(erro){
      console.log(erro)
      window.location.href="../telas/erro.html"
  }
  }
});

const render = async () => {
  try{
    const listaClientes = await clienteService.listaClientes();
    listaClientes.forEach((el) => {
      tabela.appendChild(criarNovaLinha(el.nome, el.email, el.id));
    });
  }
  catch(erro){
    console.log(erro)
    window.location.href="../telas/erro.html"
}
};

render();
