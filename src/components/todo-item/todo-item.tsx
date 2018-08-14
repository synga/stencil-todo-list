import { Component, Prop, Event, EventEmitter, State } from '@stencil/core';

@Component({
    tag: 'todo-item',
    styleUrl: "todo-item.css"
})
export class TodoItem {
    /**
     * Propriedades de um item da lista
     */
    @Prop() posicao: number;
    @Prop() descricao: string;
    @State() feito: boolean = false;

    /**
     * Event emitters
     */
    @Event() excluiItem: EventEmitter;
    @Event() marcaFeito: EventEmitter

    /**
     * Emite o evento para excluir uma tarefa
     */
    excluirTarefas = () => this.excluiItem.emit(this.posicao);

    /**
     * Conclui uma tarefa
     */
    tarefaConcluida = () => {
        this.feito = !this.feito;
        this.marcaFeito.emit({ pos: this.posicao, feito: this.feito });
    }

    render() {
        return (
            <div class="tarefa">
                <div>
                    <input type="checkbox" class="tarefa--alterar" checked={this.feito} onChange={() => this.tarefaConcluida()} />
                    <label class={`${this.feito ? 'concluido' : ''} tarefa--descricao`} onClick={() => this.tarefaConcluida()}>
                    {this.descricao}
                    </label>
                </div>
                <button class="tarefa--botao" onClick={() => this.excluirTarefas()}>&#215;</button>
            </div>
        );
    }
}