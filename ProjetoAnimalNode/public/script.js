listar();
var idanimal = 0;
var myModal = new bootstrap.Modal(
  document.getElementById('cadastro')
);
// FUNÇÃO DE LISTAR OS ITENS QUE ESTÃO CADASTRADOS
function listar(){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  
  fetch("http://localhost:3333/animal", requestOptions)
    .then(response => response.json())
    .then(function(result){
      var dados = "<th>Animal</th>";
      dados += "<th>Tipo do animal</th>";
      dados += "<th>Raça</th>";
      for (const i in result) {
        dados += "<tr>"
              + "<td>" + result[i].nome_animal + "</td>"
              + "<td>" + result[i].tipo_animal + "</td>"
              + "<td>" + result[i].raca + "</td>"
              + "<td>  <a class = 'btn btn-primary' onclick= 'alterar(" + result[i].idanimal + ")'>Alterar</a> </td>"
              + "<td>  <a class = 'btn btn-danger' onclick= 'excluir(" + result[i].idanimal + ")'>Excluir</a> </td>"
              + "</tr>";
              
      }
      document.getElementById("dados").innerHTML = dados;
    })
    .catch(error => console.log('error', error));
  }
// FUNÇÃO DE ATUALIZAR OS ITENS INSERIDOS...
  function alterar(id){
    idanimal = id;
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    
    fetch("http://localhost:3333/animal/" + idanimal, requestOptions)
      .then(response => response.json())
      .then(function(result){
        document.getElementById("nome_animal").value = result.nome_animal;
        document.getElementById("tipo_animal").value = result.tipo_animal;
        document.getElementById("raca").value = result.raca;

        myModal.show();
      })
      .catch(error => console.log('error', error));
  }
// FUNÇÃO DE EXCLUIR OS DADOS INSERIDOS PELO ID...
  function excluir(idanimal){
    
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    
    fetch("http://localhost:3333/animal/" + idanimal, requestOptions)
      .then(response => response.text())
      .then(function(result){
        listar();
      })
      .catch(error => console.log('error', error));
  }
// FUNÇÃO DE CADASTRAR UM TIME NOVO...
  function novo() {
    idanimal = 0;
    document.getElementById("nome_animal").value = "";
    document.getElementById("tipo_animal").value = "";
    document.getElementById("raca").value = "";
    
    myModal.show();
  }

  function salvar() {
    var metodo;
    if (idanimal > 0){
      metodo = "PUT";
    }else {
      metodo = "POST";
    }

    var p = {};
    p.idanimal = idanimal;
    p.nome_animal = document.getElementById("nome_animal").value;
    p.tipo_animal = document.getElementById("tipo_animal").value;
    p.raca = document.getElementById("raca").value;

    var raw = JSON.stringify(p);
    console.log(raw);

    var requestOptions = {
      method: metodo,
      body: raw,
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };

    var url;
    if(idanimal == 0){
      url = "http://localhost:3333/animal";
    } else {
      url = "http://localhost:3333/animal/" + idanimal;
    }

    fetch(url, requestOptions)
      .then(response => response.text())
      .then(function(result){
        listar();
      })
      .catch(error => console.log('error', error));
    myModal.hide();
  }