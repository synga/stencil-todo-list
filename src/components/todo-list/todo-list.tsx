import { Component, State, Listen, Watch } from "@stencil/core";

@Component({
  tag: "todo-list",
  styleUrl: "todo-list.css",
  shadow: true
})
export class TodoList {
  // Tarefas concluidas
  @State() concluidas: number = 0;
  // Minhas tarefas
  @State()
  tarefas: Array<{ feito: boolean; descricao: string }> = [];
  // bind do campo de input
  @State() input: string = "";
  // Escuta o evento de 'enter' e executa o metodo de salvar.
  @Listen('keydown.enter') operaTeclaEnter() {
    this.salvar();
  }
  // Watcher de tarefas concluidas
  @Watch('tarefas') watchaTarefasConcluidas(newValue: Array<any>) {
    this.concluidas = newValue.reduce((count, val, i, newValue) => val.feito ? ++count : count, 0);
  }

  /**
   * Manipula o valor do input
   */
  changeInputValue = ev => this.input = ev.target.value;

  /**
   * Grava uma nova tarefa no array de tarefas
   */
  salvar = () => {
    if (this.input != "" && this.input.trim() != "") {
      this.tarefas = [...this.tarefas, { descricao: this.input, feito: false }];
      this.input = "";
    }
  }

  // Marca uma tarefa como concluida.
  tarefaConcluida = (tarefa: CustomEvent) => {
    this.tarefas[tarefa.detail.pos].feito = tarefa.detail.feito;
    this.tarefas = [...this.tarefas];
  }

  // Exclui uma tarefa do array de tarefas
  excluirTarefas = (ev: CustomEvent) => {
    this.tarefas.splice(ev.detail, 1);
    this.tarefas = [...this.tarefas];
  }

  render() {
    // BEM: Metodologia de CSS - Block Element Modifier
    return (
      <div class="todo">
        <h2 class="titulo">Lista de tarefas</h2>
        <div class="input">
          <div>
            <input type="text" placeholder="Nova tarefa..." class="input--campo" value={this.input} onInput={(ev) => this.changeInputValue(ev)} />
          </div>
          <button class="input--botao" onClick={() => this.salvar()}>Adicionar</button>
        </div>
        <p class="contador">{`(${this.concluidas}/${this.tarefas.length})`}</p>

        <hr />

        <div class="lista">
          {this.tarefas.length > 0 ? (
            this.tarefas.map((tarefa, index) => <todo-item posicao={index} descricao={tarefa.descricao} onMarcaFeito={(ev) => this.tarefaConcluida(ev)} onExcluiItem={ev => this.excluirTarefas(ev)}></todo-item>)
          ) : (
              <h2 class="lista--vazia">Você não possui tarefas!</h2>
            )}
        </div>
      </div>
    );
  }
}
