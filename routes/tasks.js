var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// get all task
router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const tasks = await prisma.task.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(tasks);
});

// get by user
router.get('/get-task/:id', async function (req, res) {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(task);
});

// Create Task
router.post('/create', async (req, res) => {
  const {
    title,
    desc,
    priority,
    status,
    created_by,
    created_at,
    updated_by,
    updated_at,
  } = req.body;
  const task = await prisma.task.create({
    data: {
      title,
      desc,
      priority,
      status,
      deadline: new Date(),
      created_by,
      created_at,
      updated_by,
      updated_at,
    },
  });
  res.send(task);
});

// update task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    desc,
    priority,
    status,
    deadline,
    created_by,
    created_at,
    updated_by,
    updated_at,
  } = req.body;
  const task = await prisma.task.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: title,
      desc: desc,
      priority: priority,
      status: status,
      deadline: deadline,
      created_by: created_by,
      created_at: created_at,
      updated_by: updated_by,
      updated_at: updated_at,
    },
  });
  res.send(task);
});

// delete task
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(task);
});

module.exports = router;
