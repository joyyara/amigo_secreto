//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

const listaAmigos = [];

function adicionarAmigo() {
    const inputAmigo = document.getElementById("amigo");
    const nomes = inputAmigo.value.split(",").map(nome => nome.trim()).filter(nome => nome !== "");

    if (nomes.length === 0) {
        alert("Por favor, digite um nome válido.");
        return;
    }

    let nomesAdicionados = 0;
    nomes.forEach(nome => {
        if (!listaAmigos.includes(nome)) {
            listaAmigos.push(nome);
            nomesAdicionados++;
        }
    });

    if (nomesAdicionados === 0) {
        alert("Todos os nomes digitados já foram adicionados.");
        return;
    }

    atualizarLista();
    inputAmigo.value = "";
}

function atualizarLista() {
    const listaElement = document.getElementById("listaAmigos");

    if (listaAmigos.length === 0) {
        listaElement.style.display = "none"; // Esconde a lista se estiver vazia
        return;
    }

    listaElement.style.display = "block"; // Mostra a lista se houver amigos
    listaElement.innerHTML = ""; // Limpa a lista antes de atualizar

    listaAmigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "❌";
        botaoRemover.onclick = () => removerAmigo(index);

        li.appendChild(botaoRemover);
        listaElement.appendChild(li);
    });
}

function removerAmigo(index) {
    listaAmigos.splice(index, 1);
    atualizarLista();
}

function removerTodosAmigos() {
    listaAmigos.length = 0;
    
    // Limpa a lista de amigos
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("listaAmigos").style.display = "none"; // Esconde a lista
    
    // Limpa o resultado do sorteio
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("resultado").style.display = "none"; // Esconde o resultado

    anunciarTexto("Todos os amigos foram removidos.");
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Adicione pelo menos 2 amigos para realizar o sorteio.");
        return;
    }

    let sorteio = [...listaAmigos];
    let resultado = {};

    for (let i = 0; i < listaAmigos.length; i++) {
        let amigoDisponivel = sorteio.filter(a => a !== listaAmigos[i]);
        
        if (amigoDisponivel.length === 0) {
            return sortearAmigo(); // Tenta novamente se não houver combinação válida
        }
        
        let sorteado = amigoDisponivel[Math.floor(Math.random() * amigoDisponivel.length)];
        resultado[listaAmigos[i]] = sorteado;
        sorteio.splice(sorteio.indexOf(sorteado), 1);
    }

    exibirResultado(resultado);
}

function exibirResultado(resultado) {
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = "";
    resultadoElement.style.display = "block"; // Garante que o resultado apareça

    let resultadoTexto = "Resultado do sorteio: ";

    Object.keys(resultado).forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${resultado[amigo]}`;
        resultadoElement.appendChild(li);
        resultadoTexto += `${amigo} tirou ${resultado[amigo]}. `;
    });

    anunciarTexto(resultadoTexto);
}

function anunciarTexto(texto) {
    const speech = new SpeechSynthesisUtterance(texto);
    speech.lang = "pt-BR";
    window.speechSynthesis.speak(speech);
}
