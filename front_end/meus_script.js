const numero_moedas = 70;
const tempo_inicial = 10;
let pontos = 0;
let tempo = 0;
let timer = null;
let nome = prompt("Dgite seu nome:")


//Após adicionar o fetch à função, crie uma nova função antes da função iniciaJogo() para criar os elementos de nome e pontos na tela, como fez com as imagens

function criarElemento(pokemon, link){
  const container = document.getElementById('container');
  const name = document.createElement('p');
  const url = document.createElement('span');

  name.textContent = pokemon;
  url.textContent = link;

  container.appendChild(name);
  container.appendChild(url);
}



function iniciaJogo(){
  pontos = 0;
  tempo = tempo_inicial;
  let tela = document.getElementById("tela");
  tela.innerHTML = "";

for( let i = 0; i < numero_moedas; ++i){
  let moeda = document.createElement("img");
  moeda.src = "mario.png";
  moeda.id = "j" + i;
  moeda.width = 50;
  moeda.onclick = function(){
    pegaMoeda(this);
  }
  tela.appendChild(moeda);
}
timer = setInterval(contaTempo, 1000);
}


//A função fetch para realizar o GET do seu banco de dados deve estar dentro e ao final da função iniciaJogo().
fetch('http://localhost:5050/score')

    .then(response => {

        if (!response.ok) {

          throw new Error('Erro na requisição');

       }

       return response.json();

    })

    .then(data => {

        console.log(data);

        const jogadores = data;

        jogadores.forEach(jogador => {

          criarElemento(jogador.name, jogador.pontuacao);

        });

    })

    .catch(error => {

      console.error(error);

    });




function pegaMoeda(moeda){
  moeda
  moeda.src = "mario2.png";
  ++pontos;
  let contadorPontos = document.getElementById("pontos");
  contadorPontos.innerText = pontos;
}

function contaTempo(){
  if(tempo > 0){
    --tempo;
  let contadorTempo = document.getElementById("tempo");
  contadorTempo.innerText = tempo;

  return contaTempo = null;
  }

//Quando ocorre o estouro do tempo limite e antes de emitir o aviso para o usuário de quantos pontos ele fez, adicionamos nesse local a função fetch que realizará o envio dos dados para o banco.

  if(tempo <= 0){
    clearInterval(timer);
    let pontuacao = {

      pontuacao: pontos,
    
      nome: nome
    
    }
    
    fetch('http://localhost:5050/score', {
    
      method: "POST",
    
      body: JSON.stringify(pontuacao),
    
      headers: {"Content-type": "application/json; charset=UTF-8"}
    
    })
    
    .then(response => response.json()) 
    
    .then(json => console.log(json))
    
    .catch(err => console.log(err))
    alert("você fez" + pontos + "pontos, parabéns!")
    iniciaJogo();
  }
} 