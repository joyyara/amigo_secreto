//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

const listarAmigos = [];

function adicionarAmigos() 
{
    const inserirAmigos = document.getElementById("amigo");
    const nomes = inserirAmigos.value.split(",").map(nome => nome.trim()).filter(nome => nome !== "");
    if (nomes.length === 0)
    {
        alert("Por favor, digite um nome!");
        return;
    }
    let nomesAdicionados = 0;
    nomes.forEach(nome => {
        if (!listarAmigos.includes(nome)) 
        {
            listarAmigos.push(nome);
            nomesAdicionados++;
        }
    });

    if (nomesAdicionados === 0) 
    {
        alert("Todos os nomes foram adicionados!");
        return;
    }
    atualizarLista();
    inserirAmigos.value = "";
}
function atualizarLista()
{
    const listaElement = document.getElementById("listarAmigos");
    if (listarAmigos.length === 0) {
        listaElement.style.display = "none";
        return;
    }
    listaElement.style.display = "block";
    listaElement.innerHTML = "";
    listarAmigos.forEach((amigo, index) => 
        {
        const li = document.createElement("li");
        li.textContent = amigo;
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "x";
        botaoRemover.onclick = () => removerAmigo(index);
        li.appendChild(botaoRemover);
        listaElement.appendChild(li);
    });
}
function removerAmigo(index) 
{
    listarAmigos.splice(index, 1);
    atualizarLista();
}

function removerTodosAmigos() 
{
    listarAmigos.length = 0;
    document.getElementById("listarAmigos").innerHTML = "";
    document.getElementById("listarAmigos").style.display = "none";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("resultado").style.display = "none";
    falarAmigo("Todos os amigos foram removidos.");
}
function sortearAmigo() {
    if (listarAmigos.length < 2) {
        alert("Adicione pelo menos 2 pessoas para realizar o sorteio!");
        return;
    }
    let sorteio = [...listarAmigos];
    let resultado = {};
    for (let i = 0; i < listarAmigos.length; i++) {
        let amigoDisponivel = sorteio.filter(a => a !== listarAmigos[i]);
        if (amigoDisponivel.length === 0) 
        {
            return sortearAmigo();
        }
        let sorteado = amigoDisponivel[Math.floor(Math.random() * amigoDisponivel.length)];
        resultado[listarAmigos[i]] = sorteado;
        sorteio.splice(sorteio.indexOf(sorteado), 1);
    }
    exibirResultado(resultado);
}
function exibirResultado(resultado) {
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = "";
    resultadoElement.style.display = "block";
    let resultadoTexto = "Resultado do sorteio: ";
    Object.keys(resultado).forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${resultado[amigo]}`;
        resultadoElement.appendChild(li);
        resultadoTexto += `${amigo} tirou ${resultado[amigo]}. `;
    });
}
