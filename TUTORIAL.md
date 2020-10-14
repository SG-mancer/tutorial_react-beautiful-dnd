
1. *create github repository, and copy {repo-URL}*
2. >git clone {repo-URL}

   **this creates a folder for the repo {repo-folder}**

3. >npx create-react-app {repo-folder}

   **the {repo-folder} will now be populated with a react-app**

4. navigate to the folder
   >cd {repo-folder}
5. start serving the webpage
   >yarn start

6. strip down the app...

   *delete all files in **/src** folder except **/src/index.js***
   ```js
   import React from 'react';
   import ReactDOM from 'react-dom';

   const App = () => 'Hello world';

   ReactDOM.render(
     <React.StrictMode>
       <App />
     </React.StrictMode>,
     document.getElementById('root')
   );
   ```

   NOTE: *if you delete **/src/index.js** the server will stop and you will have to run **yarn start** again.*
7. make */src/initial-data.js* file and populate it with tasks nd columns arrays...
8. add export command to last line of */src/initial-data.js*

   **export default initialData;**

9. add import command to */src/index.js* (after the import ReactDOM...)

   **import initialData from './initial-data';**

10. Set the initial state of the App to the initial data, 

    replace **const App =...** with

    ```js
    class App extends React.Component {
        state = initialData;

        render() {

        }
    } 
    ```

11. Then do fill in the **render()...** section

    ```js
    render() {
      return this.state.columnOrder.map(columnId =>{
        const column = this.state.columns[columnId];
        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

        return column.title;
      });
    }
    ```

12. Create a column component 
    * Replace **return column.title;** with **return \<Column key={column.id} column={column} tasks={tasks} />;**
    * create */src/column.jsx*
    * add **import Column from './column';** to top of *scr/index.js*

13. In */src/column.jsx* 
    ```js
    import React from 'react';

    export default class Column extends React.Component {
      render() {
        return this.props.column.title;
      }
    }
    ```
    This will do the same as **return column.title**, but it will be changed soon...

14. add library "styled components" and "css-reset"
    >yarn add styled-components
    >yarn add @atlaskit/css-reset

    * in *src/index.js* add **import '@atlaskit/css-reset';**
    * in *src/column.jsx* add **import styled from 'styled-components';**

15. now focus on using "styled-components" in *src/column.jsx*
    * add styles for rendering a Container, Title and TaskList
      ```js
      const Container = styled.div``;
      const Title = styled.h3``;
      const TaskList = styled.div``;
      ```
    * then render out the column by changing the return **return this.props.column.title** to the following:
      ```js
      return (
        <Container>
          <Title>{this.props.column.title}</Title>
          <TaskList>Tasks go here</TaskList>
        </Container>
      );
      ```
    * add css styling properties between **\` \`** for each component... i.e. **const Container = styled.div\`border: 8px;`;**

16. Make the page show the task list (rather than static text):
    * ammend between TaskList tags in */src/column.jsx* 
      ```js
      <TaskList>
        {this.props.tasks.map(task => <Task key={task.id} task={task} />)}
      </TaskList>
      ```
    * add **import Task from './task';** to the top of */src/column.jsx*.
    * add a new file */src/task.jsx*
      ```js
      import React from 'react';
      import styled from 'styled-components';

      const Container = styled.div`
        border: 1px solid lightgrey;
        border-radius: 2px;
        padding: 8px;
        margin-bottom: 8px`;

      export default class Task extends React.Component {
        render () {
          return <Container>{this.props.task.content}</Container>;
        }
      }
      ```
### 17.  add **react-beautiful-dnd** as a dependency
  >yarn add react-beautiful-dnd

18. wrap the column in a `drag-drop context`
-
    * add the following line to */src/index.js*
      ```js
      import { DragDropContext } from 'react-beautiful-dnd';
      ```
    * inside the **render() {}** wrap the **return** function with DragDropContext tags
      ```js
      <DragDropContext> return ... \</DragDropContext>
      ```
    * inside the DragDropContext you need to add the **callback** *onDragEnd*. There are also two other callbacks:
       * onDragStart 
       * onDragUpdate
       ```js
       <DragDropContext onDragEnd={this.onDragEnd}>
       ```
    * it is our onDragEnd function to synchronously update the state
      * add the following just after **state = initialData**:
        ```js
        onDragEnd = result =>{
          // TODO:
        }
        ```
-
    * add the following Droppable functionality to */src/column.jsx* :
       * import Droppable in the import section at top of file:
       ```js
       import { Droppable } from 'react-beautiful-dnd';
       ```
       * wrap TaskList component inside of the dropable
       ```js
       <Droppable droppableId={this.props.column.id}>
          {() => (
           <TaskList>
              ...
            </TaskList>
          )}
       </Droppable>
       ```
        * NOTE: Droppable has a **mandatory prop** dropableId !
        * dropableId also needs to be unique...
        * it also expects a child that returns a [React component](https://reactjs.org/docs/react-component.html) so we needed to use **{() => (...)}** around our \<TaskList> tags.

19. Setup our Droppable component
    * in */src/column.jsx* change the context between Droppable Tags to
    ```js
    {provided => (
      <TaskList
        innerRef={provided.innerRef}
        {...provided.droppableProps}
      >
        {this.props.tasks.map(task => <Task key={task.id} task={task} />)}
        {provided.placeholder}
      </TaskList>
    )}
    ```
20. Setup the Draggable component in */src/task.jsx*
    * import Draggable
    * wrap rendered component inside a Draggable tag
    * update the two required props **draggableId** and **index**
    * GO BACK TO column component to pass and index
    * it also expects the child to be a function (this function again has provided as a prop)
      * add the properties **{...provided.draggableProps}**, **{...provided.dragHandleProps}** and **innerRef={provided.innerRef}** to the Container

21. HMM currently I can not CLICK any of the TaskItems