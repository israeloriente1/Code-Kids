 /* Funcionamento do jogo:
  Basicamente o jogo irá funcionar assim, uma palavra será gerada aletóriamente através da function sortear() onde essa palavra será guardada dentro da variável (palavra), a variável (linhas) irá receber cada letra da (palavra) como "_" e cada espaço como "<br>", sempre que o usuário escolher uma letra essa letra ficará inacessível até a proxima partida e irá verificar se existe dentro da (palavra), caso exista, as posições onde se encontra a letra será adicionada nas exatas posições encontradas da (palavra) dentro da variável (linhas).
*/

document.getElementById("botao").addEventListener("click", novoJogo);

document.body.onkeydown = (key) => { // Irá verificar as teclas digitadas
    let letra = key.key.toUpperCase();

    if(key.code.indexOf("Key") > -1){
        let letras = document.getElementById("letras").children;
        
        for (let i in letras){
            if (typeof(letras[i]) == "object"){
                if (letras[i].innerText.toUpperCase() == letra){
                    verificar(letra, i);
                }
            }
        }
    }else if (isComplete && key.key == "Enter"){
        novoJogo();
    }
}

listaPerguntas = [
    {pergunta: 'Como é conhecido uma sequência de comandos da programação ?', resposta: 'ALGORITMO'},
    {pergunta: 'Qual é o termo utilizado para descrever um erro no código de um programa que impede sua execução correta ?', resposta: 'BUG'},
    {pergunta: 'Qual é o nome dado a uma variável que armazena uma sequência de caracteres ?', resposta: 'STRING'},
    {pergunta: 'Qual é o nome dado a uma estrutura de dados que armazena uma coleção ordenada de elementos ?', resposta: 'ARRAY'},
    {pergunta: 'Qual é o termo utilizado para descrever o ato de identificar e corrigir erros em um programa  ?', resposta: 'DEBUGGING'}
]; // Esses dados serão usado de acordo com o número gerado na function sortear()

chances = 6; // Total de vezes que o usuário pode errar.
divResposta = document.getElementById("linhasPalavra");
divChance = document.getElementById("chances");
divPergunta = document.getElementById("dica");
botao = document.getElementsByClassName("botao")[0];
isInclude = false; // Será usado na function verificar(), caso a letra seja encontrado na palavra ficará TRUE caso o contrário FALSE.
isComplete = false; // Receberá true se o jogo tiver terminando, ganhando ou com as chances zeradas.
var resposta; // Receberá a palavra que for gerada dentro da function sortear().
var perguntaAnterior; // Rebererá nome da palavra que tiver sido gerado no jogo anterior, que será usado para que a nova palavra gerada não seja igual a anterior.
var spanLetra; // Será usado para pegar a indice do span que foi selecionado com a letra que o usuário selecionou na function verificar().
var pergunta; // Receberá a pergunta gerada de acordo com o valor random gerado dentro da function sortear()
var respostaConv; // Receberá a palavra formatada da variável (linhas) que ficará na tela enquanto o usuário joga, sendo [a-z] = "_" e " "(espaço) = "<br>".
var linhas; // Irá receber as letras da variável (palavra) como "_".
sortear(); // Irá guardar cada letra da variável palavra dentro de (palavra).

function sortear(){ // Irá gerar um valor random entre 0 e 2, que será usado para filtrar a categoria da variável (listaPerguntas) de acordo com o valor que tiver sido gerado (como está no switch(randomValor))
    divPergunta.style.marginTop = "-40px";
    let randomValor = parseInt(Math.random() * listaPerguntas.length);
    pergunta = listaPerguntas[randomValor].pergunta;
    resposta = listaPerguntas[randomValor].resposta;

    divPergunta.innerHTML = `${pergunta.toUpperCase()}`;    

    if (pergunta == perguntaAnterior){ // Caso a palavra gerada seja igual a anterior
        sortear();
    }

    linhas = resposta.replace(/[a-z]/ig, "_");
    respostaConv = linhas.replace(" ", "<br>").replace(/[_]/ig, "_");
    divResposta.innerHTML = respostaConv;
    isComplete = false;
}

function imprimirLinhaAtual(){ // Apaga o valor atual e imprimi as letras que foram selecionadas de maneira correta.
    respostaConv = linhas.replace(/\s/g, "<br>").replace(/[_]/ig, "_");
    divResposta.innerHTML = respostaConv;
}

function verificar(letra, posicao){ // Irá analisar a letra e a posição informado, o valor do parâmetro (posicao) será usado na variável (spanLetra) pagar pegar o id com o valor do parâmetro (posicao) 
    letra = letra.toUpperCase()
    spanLetra = document.getElementById(`${posicao}`);

    if (chances >= 1 && isComplete == false){
        if (spanLetra.hasAttribute("class", "letra")){
            spanLetra.removeAttribute("class", "letra"); // Mudará o estilo da letra selecionada, o que deixará não acessível até o próximo jogo
            resposta.indexOf(letra) > -1 ? isInclude = true : isInclude = false; // Irá verificar se a letra selecionada exista na palavra atual
            
            if (isInclude == false){ // Caso a letra NÃO exista na palavra, será diminuído o total de chances para jogar novamente.
                chances--;                
                if (chances > 2){
                    divChance.innerHTML = `Restam <strong>${chances}</strong> Tentativas`;
                }else{
                    if (chances >=1){
                        divChance.setAttribute("class", "red")
                        divChance.innerHTML = `Restam <strong>${chances}</strong> Tentativa`;
                    }else {
                        isComplete = true;
                        divChance.innerHTML = "GAME OVER";
                        botao.setAttribute("class", "show");
                        divPergunta.innerHTML = `<strong>RESPOSTA</strong> <br> ${resposta}`
                    }
                }

            }else if (isInclude == true){ // Os índices do vetor (letras) que tiverem a letra selecionada será adicionado no mesmo índice do vetor (linhas).
                for (let l in resposta){
                    if (resposta.charAt(l) == letra){
                        if (l == 0){
                            linhas = `${linhas.charAt(0).replace("_", letra)}${linhas.substr(1)}`;
                        }else{
                            linhas = `${linhas.substr(0, l)}${linhas.charAt(l).replace("_", letra)}${linhas.substr(parseInt(l) + 1)}`;
                        }
                    }
                }

                linhas.indexOf("_") > -1 ? isComplete = false : isComplete = true;

                if (isComplete == true){
                    botao.setAttribute("class", "show");
                    if (divChance.hasAttribute("class", "red")){
                        divChance.removeAttribute("class", "red");
                    }
                    divPergunta.style.marginTop = "-20px";
                    divChance.innerHTML = "CONCLUÍDO <br>"
                }
                imprimirLinhaAtual(); // Irá atualizar o status da divLinhas, onde contém as linhas que recebem as letras conforme for selecionando e completando a resposta.
            }
        }
        isInclude = false;        
    }   
}

function novoJogo(){ // Irá criar um novo jogo, deixando todos os botões acessíveis, resetando o total de chances e chamando a função sortear() que irá recriar os dados do jogo (dados: palavra e dica).

    // Irá fazer com que todas as letras fiquem acessíveis novamente trocando a classe.
    for (let n = 0;n < 26; n++){ 
        spanLetra = document.getElementById(`${n}`);
        spanLetra.setAttribute("class", "letra");
    }

    perguntaAnterior = resposta;
    chances = 6;
    divChance.innerHTML = `Restam <strong>${chances}</strong> Tentativas`;

    if (divChance.hasAttribute("class", "red")){
        divChance.removeAttribute("Class", "red");
    }

    // Irá guardar cada letra da variável palavra dentro do vetor (letras) e imprimir os tratos que serão preenchidos pelas as letras corretas que estiver na palavra quando o usuário clicar.
    sortear(); 
    botao.removeAttribute("class", "show");
}