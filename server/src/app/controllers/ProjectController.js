import * as Yup from 'yup';
import Project from '../models/Project';
import Task from '../models/Task';

class ProjectController {
  async index(req, res) {
    const project = await Project.findAll({
      where: { user_id: req.userId },
      attributes: ['id', 'description'],
      include: [
        {
          model: Task,
          attributes: [
            'id',
            'description',
            'done',
            'finished_at',
            'user_id',
            'project_id',
          ],
        },
      ],
    });
    return res.json(project);
  }

  async show(req, res) {
    const project = await Project.findOne({
      where: { id: req.params.id, user_id: req.userId },
      attributes: ['id', 'description'],
      include: [
        {
          model: Task,
          attributes: [
            'id',
            'description',
            'done',
            'finished_at',
            'user_id',
            'project_id',
          ],
        },
      ],
    });

    if (!project) return res.status(404).json({ error: 'Project not found!' });
    return res.json(project);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails!' });

    const { description } = req.body;
    const { userId } = req;
    try {
      const project = await Project.create({
        user_id: userId,
        description,
      });
      return res.json(project);
    } catch (err) {
      return res.json(err);
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails!' });

    const project = await Project.findOne({
      where: { id: req.params.id, user_id: req.userId },
    });

    if (!project) return res.status(404).json({ error: 'Project not found!' });
    const { description } = req.body;

    project.description = description;
    project.save();

    return res.json(project);
  }

  async destroy(req, res) {
    const result = await Project.destroy({
      where: { id: req.params.id, user_id: req.userId },
    });
    let message = 'Data was deleted';
    if (result === 0) message = 'Project not found. Nothing was deleted.';

    return res.json({ message }).send();
  }
}

export default new ProjectController();
