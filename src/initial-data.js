const initialData = {
    tasks: {
        'task-1': {id: 'task-1', content: 'Greet the cat'},
        'task-2': {id: 'task-2', content: 'Take out the recyling'},
        'task-3': {id: 'task-3', content: 'Cook dinner'},
        'task-4': {id: 'task-4', content: 'Sleep'},
    },
    columns:{
        'column-1': {
            id: 'column-1',
            title: 'TODO',
            taskIds: ['task-3','task-1','task-4','task-2'],
        },
        'column-2': {
            id: 'column-2',
            title: 'DO-ING',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'DONE',
            taskIds: [],
        },
        'column-4': {
            id: 'column-4',
            title: 'DELETE',
            taskIds: [],
        },

    },
    //Facilitate reording
    columnOrder: ['column-1','column-2','column-3','column-4'],
    taskCount: 4,
};

export default initialData;