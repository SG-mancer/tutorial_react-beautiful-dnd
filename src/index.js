import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

const Container = styled.div`
  display: flex;
  `;

class App extends React.Component {
  state = initialData;

  addItem = () => {
    //handle adding a new item
    // follow points from https://medium.com/js-geek/create-a-simple-todo-app-in-react-72d9341a7e6c to learn how to add items

    const newTasks = this.state.tasks;
    const newTask = {id: 'task-5', content: 'TEST'};
    newTasks['task-5'] = newTask;

    const column = this.state.columns["column-1"];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(newTask.index, 0, 'task-5');

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      tasks: newTasks,
      columns: {
        ...this.state.columns,
        "column-1": newColumn,
      },
    };
    
    this.setState(newState);
    alert("error here - it seems to work until I click ok, then reverts back");
    return;
  }

  //Moving Items
  onDragEnd = result =>{
    const {destination, source, draggableId} = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const column = start;
      const newTaskIds = Array.from(column.taskIds);
      //newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
        
      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };
    

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }
  
    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };

  render() {
      return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
          {this.state.columnOrder.map(columnId =>{
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
          </Container>

          <form onSubmit={this.addItem}>
            <input placeholder="Task" />
            <button type="submit"> Add Task </button>
          </form>
        </DragDropContext>
      );
  }
} 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  
  document.getElementById('root')
);