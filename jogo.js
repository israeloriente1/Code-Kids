 /* Funcionamento do jogo:
  Basicamente o jogo irá funcionar assim, uma palavra será gerada aletóriamente através da function sortear() onde essa palavra será guardada dentro da variável (palavra), a variável (linhas) irá receber cada letra da (palavra) como "_" e cada espaço como "<br>", sempre que o usuário escolher uma letra essa letra ficará inacessível até a proxima partida e irá verificar se existe dentro da (palavra), caso exista, as posições onde se encontra a letra será adicionada nas exatas posições encontradas da (palavra) dentro da variável (linhas).
   */


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

listaPalavras = [
    {dica: 'Profissão', palavra: 'ADMINISTRADOR'},
    {dica: 'Profissão', palavra: 'ADVOGADO'},
    {dica: 'Profissão', palavra: 'AERONAUTA'},
    {dica: 'Profissão', palavra: 'ASSISTENTE SOCIAL'},
    {dica: 'Profissão', palavra: 'ATLETA PROFISSIONAL DE FUTEBOL'},
    {dica: 'Profissão', palavra: 'BOMBEIRO CIVIL'},
    {dica: 'Profissão', palavra: 'CONTABILISTA'},
    {dica: 'Profissão', palavra: 'CORRETOR DE SEGUROS'},
    {dica: 'Profissão', palavra: 'DESPACHANTE ADUANEIRO'},
    {dica: 'Profissão', palavra: 'ECONOMISTA'},
    {dica: 'Profissão', palavra: 'ENFERMAGEM'},
    {dica: 'Profissão', palavra: 'FISIOTERAPEUTA E TERAPEUTA OCUPACIONAL'},
    {dica: 'Profissão', palavra: 'GARIMPEIRO'},
    {dica: 'Profissão', palavra: 'JORNALISTA'},
    {dica: 'Profissão', palavra: 'LEILOEIRO'},
    {dica: 'Profissão', palavra: 'LEILOEIRO RURAL'},
    {dica: 'Profissão', palavra: 'MASSAGISTA'},
    {dica: 'Profissão', palavra: 'MOTOTAXISTA E MOTOBOY'},
    {dica: 'Profissão', palavra: 'NUTRICIONISTA'},
    {dica: 'Profissão', palavra: 'ODONTOLOGIA'},
    {dica: 'Profissão', palavra: 'ORIENTADOR EDUCACIONAL'},
    {dica: 'Profissão', palavra: 'PESCADOR PROFISSIONAL'},
    {dica: 'Profissão', palavra: 'PSICOLOGIA'},
    {dica: 'Profissão', palavra: 'RADIALISTA'},
    {dica: 'Profissão', palavra: 'REPENTISTA'},
    {dica: 'Profissão', palavra: 'SOMMELIER'},
    {dica: 'Profissão', palavra: 'TAXISTA'},
    {dica: 'Profissão', palavra: 'ZOOTECNISTA'},
    {dica: 'Profissão', palavra: 'Taxista'},
    {dica: "Profissão", palavra: "GEOLOGIA"},
    {dica: "Profissão", palavra: "CIENTISTA"},
    {dica: "Profissão", palavra: "METEOROLIGIA"},
    {dica: "País", palavra: "BRASIL"},
    {dica: "País", palavra: "REINO UNIDO"},
    {dica: "País", palavra: "ESTADOS UNIDOS"},
    {dica: "País", palavra: "ALEMANHA"},
    {dica: "Objeto", palavra: "CELULAR"},
    {dica: "Objeto", palavra: "COLHER"},
    {dica: "Objeto", palavra: "HEADSET"},
    {dica: "Objeto", palavra: "MOUSE"},
    {dica: "Objeto", palavra: "TECLADO"},
    {dica: "Objeto", palavra: "MONITOR"}
]; // Esses dados serão usado de acordo com o número gerado na function sortear()

chances = 6; // Total de vezes que o usuário pode errar.
divPalavra = document.getElementById("linhasPalavra");
divChance = document.getElementById("chances");
divDica = document.getElementById("dica");
botao = document.getElementsByClassName("botao")[0];
isInclude = false; // Será usado na function verificar(), caso a letra seja encontrado na palavra ficará TRUE caso o contrário FALSE.
isComplete = false; // Receberá true se o jogo tiver terminando, ganhando ou com as chances zeradas.
var palavra; // Receberá a palavra que for gerada dentro da function sortear().
var palavraAnterior; // Rebererá nome da palavra que tiver sido gerado no jogo anterior, que será usado para que a nova palavra gerada não seja igual a anterior.
var spanLetra; // Será usado para pegar a indice do span que foi selecionado com a letra que o usuário selecionou na function verificar().
var categoria; // Receberá a categoria gerada de acordo com o valor random gerado dentro da function sortear()
var palavraConv; // Receberá a palavra formatada da variável (linhas) que ficará na tela enquanto o usuário joga, sendo [a-z] = "_" e " "(espaço) = "<br>".
var linhas; // Irá receber as letras da variável (palavra) como "_".
sortear(); // Irá guardar cada letra da variável palavra dentro de (palavra).

function sortear(){ // Irá gerar um valor random entre 0 e 2, que será usado para filtrar a categoria da variável (listaPalavras) de acordo com o valor que tiver sido gerado (como está no switch(randomValor))
    divDica.style.marginTop = "-40px";
    let randomValor = parseInt(Math.random() * 3);
    categoria;
    let palavraObjeto;

    switch(randomValor){
        case 0:
            categoria = "Profissão";
        break;
        case 1:
            categoria = "País";
        break;
        default:
            categoria = "Objeto";
    }

    divDica.innerHTML = `DICA: <br> ${categoria.toUpperCase()}`;
    palavraObjeto = listaPalavras.filter(p => p.dica == `${categoria}`); // Irá receber a lista de objetos contendo (Categoria e palavra) da categoria que tiver sido gerado
    let palavraLength = palavraObjeto.length - 1;

    randomValor = parseInt(Math.random() * palavraLength); // Irá receber um valor random entre 0 e o total de indices com a categoria que foi gerado na variável (categoria), esse indice que for gerado será usado para pegar o valor de (palavra).
    palavra = palavraObjeto[randomValor].palavra;

    if (palavra == palavraAnterior){ // Caso a palavra gerada seja igual a anterior
        sortear();
    }

    linhas = palavra.replace(/[a-z]/ig, "_");
    palavraConv = linhas.replace(" ", "<br>").replace(/[_]/ig, "_");
    divPalavra.innerHTML = palavraConv;
    isComplete = false;
}

function imprimirLinhaAtual(){ // Apaga o valor atual e imprimi as letras que foram selecionadas de maneira correta.
    palavraConv = linhas.replace(/\s/g, "<br>").replace(/[_]/ig, "_");
    divPalavra.innerHTML = palavraConv;
}

function verificar(letra, posicao){ // Irá analisar a letra e a posição informado, o valor do parâmetro (posicao) será usado na variável (spanLetra) pagar pegar o id com o valor do parâmetro (posicao) 
    letra = letra.toUpperCase()
    spanLetra = document.getElementById(`${posicao}`);

    if (chances >= 1 && isComplete == false){
        if (spanLetra.hasAttribute("class", "letra")){
            spanLetra.removeAttribute("class", "letra"); // Mudará o estilo da letra selecionada, o que deixará não acessível até o próximo jogo
            palavra.indexOf(letra) > -1 ? isInclude = true : isInclude = false; // Irá verificar se a letra selecionada exista na palavra atual
            
            if (isInclude == false){ // Caso a letra NÃO exista na palavra, será diminuído o total de chances para jogar novamente.
                chances--;                
                if (chances > 2){
                    divChance.innerHTML = `CHANCES <br>${chances}`;
                }else{
                    if (chances >=1){
                        divChance.setAttribute("class", "red")
                        divChance.innerHTML = `CHANCES <br>${chances}`;
                    }else {
                        isComplete = true;
                        divChance.innerHTML = "GAME <br> OVER";
                        botao.setAttribute("class", "show");
                        divDica.innerHTML = `PALAVRA: <br> ${palavra}`
                    }
                }

            }else if (isInclude == true){ // Os índices do vetor (letras) que tiverem a letra selecionada será adicionado no mesmo índice do vetor (linhas).
                for (let l in palavra){
                    if (palavra.charAt(l) == letra){
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
                    divDica.style.marginTop = "-20px";
                    divChance.innerHTML = "CONCLUÍDO <br>"
                }
                imprimirLinhaAtual(); // Irá atualizar o status da divLinhas, onde contém as linhas que recebem as letras conforme for selecionando e completando a palavra.
            }
        }
        isInclude = false;        
    }   
}

function novoJogo(){ // Irá criar um novo jogo, deixando todos os botões acessíveis, resetando o total de chances e chamando a função sortear() que irá recriar os dados do jogo (dados: palavra e dica).
    for (let n = 0;n < 26; n++){ // Irá fazer com que todas as letras fiquem acessíveis novamente trocando a classe.
        spanLetra = document.getElementById(`${n}`);
        spanLetra.setAttribute("class", "letra");
    }

    palavraAnterior = palavra;
    chances = 6;
    divChance.innerHTML = `CHANCES <br>${chances}`;

    if (divChance.hasAttribute("class", "red")){
        divChance.removeAttribute("Class", "red");
    }
    sortear(); // Irá guardar cada letra da variável palavra dentro do vetor (letras) e imprimir os tratos que serão preenchidos pelas as letras corretas que estiver na palavra quando o usuário clicar.
    botao.removeAttribute("class", "show");
}