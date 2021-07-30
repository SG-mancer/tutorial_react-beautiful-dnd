import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';
import './task.css';

const Container = styled.div`
  display: flex;
  `;

class App extends React.Component {
  state = initialData;

  addItem = e => {
    //apparently submit forces a page reload, so we need to stop that
    e.preventDefault()
    //handle adding a new item
    // follow points from https://medium.com/js-geek/create-a-simple-todo-app-in-react-72d9341a7e6c to learn how to add items

    //create a new list of tasks to add new task to
    const newTasks = this.state.tasks;
    //generate the new task's key (ie. task-15)
    const newTaskNo = this.state.taskCount + 1;
    const newTaskKey = 'task-'+newTaskNo;

    //create the new task object and append it to the list of tasks
    const newTask = {id: newTaskKey, content: this.state.pendingTask};
    newTasks[newTaskKey] = newTask;

    //get a copy of the first column and add the task to the column (TaskIds)
    const column = this.state.columns["column-1"];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(newTask.index, 0, newTaskKey);

    //generate the column object
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    //build the state we want to replace current state with
    //add task, add task to list in column-1, increment the number of tasks
    const newState = {
      ...this.state,
      tasks: newTasks,
      columns: {
        ...this.state.columns,
        "column-1": newColumn,
      },
      taskCount: newTaskNo,
    };
    
    this.setState(newState);
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
      newTaskIds.splice(source.index, 1);
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

    //Remove element from the table if dropped onto 4th column
    if (finish.id === "column-4"){
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
        },
      };

      this.setState(newState);
      return;
    };    
  
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

  pendingTask = (event) => {
    //update the state with the changed text in the pending task box
    this.setState({pendingTask: event.target.value});
  }

  render() {
      return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
          {this.state.columnOrder.map(columnId =>{
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks}/>;
          })}
          </Container>
          <form onSubmit={this.addItem}>
            <input placeholder="Task"
            onChange={this.pendingTask}/>
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