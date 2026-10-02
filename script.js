const campoTarefa = document.getElementById("campo-tarefa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const contadorTarefas = document.getElementById("contador-tarefas");
const botaoTema = document.getElementById("botao-tema");

const botaoTodas = document.getElementById("botao-todas");
const botaoPendentes = document.getElementById("botao-pendentes");
const botaoConcluidas = document.getElementById("botao-concluidas");
const botaoLimparConcluidas = document.getElementById("botao-limpar-concluidas");

let tarefas = [];

let filtroAtual = "todas";



function adicionarTarefa() {

    const texto = campoTarefa.value.trim();

    if (texto === "") {
        return;
    }

    const tarefa = {
        id: Date.now(),
        texto: texto,
        concluida: false
    };

    tarefas.push(tarefa);

    campoTarefa.value = "";

    mostrarTarefas();
}


function mostrarTarefas() {

    listaTarefas.innerHTML = "";

    let tarefasFiltradas = tarefas;

    if (filtroAtual === "pendentes") {

        tarefasFiltradas = tarefas.filter(function(tarefa) {
            return tarefa.concluida === false;
        });

    } else if (filtroAtual === "concluidas") {

        tarefasFiltradas = tarefas.filter(function(tarefa) {
            return tarefa.concluida === true;
        });

    }

    tarefasFiltradas.forEach(function(tarefa) {

        const item = document.createElement("li");

        item.classList.add("item-tarefa");

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        item.innerHTML = `
            <span>${tarefa.texto}</span>

            <div class="acoes-tarefa">

                <button
                    class="botao-acao"
                    onclick="concluirTarefa(${tarefa.id})"
                    title="Concluir tarefa"
                >
                    <i class="fa-solid fa-check"></i>
                </button>

                <button
                    class="botao-acao excluir"
                    onclick="excluirTarefa(${tarefa.id})"
                    title="Excluir tarefa"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        listaTarefas.appendChild(item);
    });

    atualizarContador();
}



function concluirTarefa(id) {

    tarefas = tarefas.map(function(tarefa) {

        if (tarefa.id === id) {
            tarefa.concluida = !tarefa.concluida;
        }

        return tarefa;
    });

    mostrarTarefas();
}



function excluirTarefa(id) {

    tarefas = tarefas.filter(function(tarefa) {
        return tarefa.id !== id;
    });

    mostrarTarefas();
}



function atualizarContador() {

    const quantidade = tarefas.length;

    if (quantidade === 0) {
        contadorTarefas.textContent = "0 tarefas na lista";

    } else if (quantidade === 1) {
        contadorTarefas.textContent = "1 tarefa na lista";

    } else {
        contadorTarefas.textContent = `${quantidade} tarefas na lista`;
    }
}


botaoAdicionar.addEventListener("click", adicionarTarefa);


campoTarefa.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        adicionarTarefa();
    }

});



botaoTema.addEventListener("click", function() {

    document.body.classList.toggle("modo-escuro");

    const icone = botaoTema.querySelector("i");

    if (document.body.classList.contains("modo-escuro")) {

        icone.classList.remove("fa-moon");
        icone.classList.add("fa-sun");

    } else {

        icone.classList.remove("fa-sun");
        icone.classList.add("fa-moon");

    }

});



botaoTodas.addEventListener("click", function() {

    filtroAtual = "todas";

    mostrarTarefas();

});



botaoPendentes.addEventListener("click", function() {

    filtroAtual = "pendentes";

    mostrarTarefas();

});




botaoConcluidas.addEventListener("click", function() {

    filtroAtual = "concluidas";

    mostrarTarefas();

});


                    

botaoLimparConcluidas.addEventListener("click", function() {

    tarefas = tarefas.filter(function(tarefa) {
        return tarefa.concluida === false;
    });

    mostrarTarefas();

});