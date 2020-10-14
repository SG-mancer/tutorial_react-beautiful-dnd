const initialData = {
    tasks: {
        'task-1': {id: 'tasks-1', content: 'Greet the cat'},
        'task-2': {id: 'tasks-2', content: 'Take out the recyling'},
        'task-3': {id: 'tasks-3', content: 'Cook dinner'},
        'task-4': {id: 'tasks-4', content: 'Sleep :)'},
    },
    columns:{
        'column-1': {
            id: 'column-1',
            title: 'TODO',
            taskIds: ['task-1','task-2','task-3','task-4'],
        },
    },
    //Facilitate reording
    columnOrder: ['column-1'],
};

export default initialData;