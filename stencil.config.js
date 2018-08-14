exports.config = {
    namespace: 'todo-list',
    outputTargets: [{
            type: 'dist'
        },
        {
            type: 'www',
            serviceWorker: false
        }
    ]
};