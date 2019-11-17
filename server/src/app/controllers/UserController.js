import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .required()
          .min(6),
        passwordConfirmation: Yup.string()
          .required()
          .min(6)
          .oneOf([Yup.ref('password')]),
      });

      if (!(await schema.isValid(req.body)))
        return res.status(400).json({ error: 'Validation fails!' });

      const { email } = req.body;

      const userExists = await User.findOne({ where: { email } });
      if (userExists) return res.status(400).json({ error: 'User exists!' });

      const user = await User.create(req.body);

      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  }

  async index(req, res) {
    try {
      const user = await User.findAll();
      return res.json(user);
    } catch (error) {
      return res.json(error);
    }
  }

  async destroy(req, res) {
    try {
      const result = await User.destroy({
        where: { id: req.params.id },
      });
      let message = 'Data was deleted';
      if (result === 0) message = 'User not found. Nothing was deleted.';

      return res.json({ message }).send();
    } catch (error) {
      return res.json(error);
    }
  }
}
export default new UserController();
