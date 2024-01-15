const connection = require('./connection')

const getAll = async() => {

    //aguarda uma query SQL
    const [tasks] = await connection.execute('SELECT * FROM tasks');//retorna um array com duas posições, a segunda é buffer
    return tasks;

};

const createTask = async(task) =>{

    const {title } = task;
    const dateUtc = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO tasks (title,status,created_at) VALUES (?,?,?)';
    const [createdTask] = await connection.execute(query, [title,'pendente',dateUtc]);

    return {insertId:createTask.insertId};
}

const deleteTask = async(id) => {
    const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
}

const updateTask = async(id , task) => {
    const query = 'UPDATE tasks SET title =? , status =? WHERE id = ?';

    const {title, status} = task;

    const [updateTask] = await connection.execute(query, [title, status ,id]);
    return updateTask;
}

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
};