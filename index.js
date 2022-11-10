let id = 0

const dados = {
    pegarTarefas: ()  => JSON.parse(localStorage.getItem('lista-tarefas')),
    editarTarefas: (listaTarefas) =>  localStorage.setItem('lista-tarefas', JSON.stringify(listaTarefas))

}

const tarefa = (id, novaTarefa) => `<div>
<p  id='${id}'>${novaTarefa}</p>
<input type="checkbox" onchange="marcarTarefa(${id})"/>
<button onclick='removerTarefa(${id})'>Remover</button>
</div>`

const marcarTarefa = (id) => {
    
    const strike = document.getElementById(`strike${id}`)
    if(strike) {
        document.getElementById(id).innerHTML = strike.innerHTML

    }
    else {
        const tarefaConcluida = document.getElementById(id).innerHTML
     document.getElementById(id).innerHTML = `<strike id='strike${id}'>${tarefaConcluida}</strike>`      
    }
}

function exibirLista() {
    const tarefas = dados.pegarTarefas()
    if (tarefas) {
        tarefas.forEach(tarefaListada => {
            id++
            document.querySelector('#lista-tarefas').innerHTML += tarefa(id, tarefaListada.tarefa)
        })
    }
    
}

const validarTarefa = (novaTarefa) => {
    let tarefaExistente = false
    const listaTarefas = dados.pegarTarefas()

    if(listaTarefas){
        listaTarefas.map(tarefa => {
            if(tarefa === novaTarefa) {
                tarefaExistente = true
                 alert('tarefa já existente')
            }
        })      
            return tarefaExistente
    }
}
function adicionarTarefa(){
    id++
    const novaTarefa = {
        tarefa: document.getElementById('nome-tarefa').value,
        finalizada: false

    }        
    const listaTarefas =  localStorage.getItem('lista-tarefas')
    if (validarTarefa(novaTarefa)) {
        return
    }

    document.querySelector('#lista-tarefas').innerHTML += tarefa(id, novaTarefa.tarefa)


    if(listaTarefas) {
        console.log(listaTarefas)
        const novaLista = JSON.parse(listaTarefas)
        novaLista.push(novaTarefa)
        dados.editarTarefas(novaLista)
    } 
    else {
        dados.editarTarefas([novaTarefa])
    }
}

const removerTarefa = (id) => {
    const tarefaDeletada = document.getElementById(id).innerHTML
    const listaTarefas = dados.pegarTarefas()
    console.log(listaTarefas)
    const novaListaTarefa = listaTarefas.filter(tarefa => tarefa.tarefa !== tarefaDeletada)
    console.log(novaListaTarefa)
    dados.editarTarefas(novaListaTarefa)
    document.querySelector('#lista-tarefas').innerHTML = ''
    exibirLista()


}
exibirLista()

// const removerTarefa = (id) => {
//     const tarefaDeletada = document.getElementById(id).innerHTML
//     const listaTarefas = dados.pegarTarefas()
//     const novaListaTarefa = listaTarefas.filter(tarefa => tarefa.tarefa !== tarefaDeletada)
//     dados.editarTarefas(novaListaTarefa)
//     document.querySelector('#lista-tarefas').innerHTML = ''
//     exibirLista()
// }



// processo é converter de array pra string e de string pra objeto - nesse caso com o JSON.parse

//objetos sempre serão diferentes, por isso nao cabe comparação. Todo array é um objeto


