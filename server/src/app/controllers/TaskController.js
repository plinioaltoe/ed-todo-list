import * as Yup from 'yup';
import Task from '../models/Task';

class TaskController {
  async index(req, res) {
    const task = await Task.findAll({
      where: { user_id: req.userId },
      attributes: [
        'id',
        'description',
        'done',
        'finished_at',
        'user_id',
        'project_id',
      ],
    });
    return res.json(task);
  }

  async show(req, res) {
    const task = await Task.findOne({
      where: { id: req.params.id, user_id: req.userId },
      attributes: [
        'id',
        'description',
        'done',
        'finished_at',
        'user_id',
        'project_id',
      ],
    });

    if (!task) return res.status(404).json({ error: 'Task not found!' });
    return res.json(task);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      finished_at: Yup.date(),
      done: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails!' });

    const { description, projectId } = req.body;
    const { userId } = req;
    try {
      const task = await Task.create({
        user_id: userId,
        description,
        project_id: projectId,
      });

      return res.json({
        id: task.id,
        description: task.description,
        done: false,
        finished_at: task.finished_at,
        user_id: task.user_id,
        project_id: task.project_id,
      });
    } catch (err) {
      return res.json(err);
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string(),
      finished_at: Yup.date(),
      done: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails!' });

    const task = await Task.findOne({
      where: { id: req.params.id, user_id: req.userId },
    });

    if (!task) return res.status(404).json({ error: 'Task not found!' });
    const { description } = req.body;

    if (task.done)
      return res
        .status(401)
        .json({ error: `This task has been finished! Can't update anymore` });

    task.description = description;
    task.save();

    return res.json(task);
  }

  async finish(req, res) {
    const task = await Task.findOne({
      where: { id: req.params.id, user_id: req.userId },
    });

    if (!task) return res.status(404).json({ error: 'Task not found!' });

    if (task.done)
      return res
        .status(401)
        .json({ error: `This task has been finished! Can't update anymore` });

    task.done = true;
    task.finished_at = new Date();
    task.save();

    return res.json(task);
  }

  async destroy(req, res) {
    const result = await Task.destroy({
      where: { id: req.params.id, user_id: req.userId },
    });
    let message = 'Data was deleted';
    if (result === 0) message = 'Task not found. Nothing was deleted.';

    return res.json({ message }).send();
  }
}

export default new TaskController();
