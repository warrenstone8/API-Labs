import express from 'express';
import { tasksData } from './tasksData';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(tasksData);
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  const task = tasksData.tasks.find(task => task.id === id);
  if (!task) {
    return res.status(404).json({ status: 404, message: 'Task not found' });
  }
  return res.status(200).json(task);
});


router.post('/', (req, res) => {
  const { title, description, deadline, priority, done } = req.body;
  
  
  const currentTimestamp = new Date().toISOString();
  
  const newTask = {
    id: uuidv4(),
    title,
    description,
    deadline,
    priority,
    done,
    
    created_at: currentTimestamp,
    updated_at: currentTimestamp
  };
  
  tasksData.tasks.push(newTask);
  res.status(201).json(newTask);
  tasksData.total_results++;
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasksData.tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ status: 404, message: 'Task not found' });
  }
  
 
  const currentTimestamp = new Date().toISOString();
  
  const updatedTask = { 
    ...tasksData.tasks[taskIndex], 
    ...req.body, 
    id: id,
    
    created_at: tasksData.tasks[taskIndex].created_at,
    updated_at: currentTimestamp 
  };
  
  tasksData.tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasksData.tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) return res.status(404).json({status:404, message:'Task not found'});
  
  tasksData.tasks.splice(taskIndex, 1);
  res.status(204).send();
  tasksData.total_results--;
});

export default router;
