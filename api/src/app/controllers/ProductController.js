import * as Yup from 'Yup';
import Store from '../models/Store';
import Product from '../models/Product';

class ProductController {

  async index(req, res) {
    const { store_id } = req.params;
    const products = await Product.findAll({ where: { store_id } });
    return res.json({ products });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      quantity: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, quantity, price } = req.body;
    const { store_id } = req.params;
    const user_id = req.userId;


    const store = await Store.findOne({ where: { user_id, id: store_id } });

    if (store.id != store_id) {
      return res.send(401);
    }

    const product = await Product.create({ name, quantity, price, store_id });

    if (!product) {
      return res.send(500);
    }
    return res.json({ message: 'Product created' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      quantity: Yup.number(),
      price: Yup.number(),
      checkout: Yup.number()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { store_id, product_id: id } = req.params;
    const user_id = req.userId;

    const store = await Store.findOne({ where: { user_id, id: store_id } });

    if (store.id != store_id) {
      return res.send(401);
    }

    const product = await Product.findOne({ where: { id, store_id } });

    if (!product) {
      return res.status(400).json({ error: 'Product does not exist' });
    }

    const { checkout } = req.body;

    if (checkout) {
      if (product.quantity - checkout < 0 || checkout < 0) {
        return res.status(400).json({ error: 'Checkout quantity is not available' });
      } else {
        await product.increment({
          quantity: - checkout
        });
      }
    } else {
      await product.update(req.body);
    }

    return res.json({ message: 'Product updated' });
  }

  async delete(req, res) {
    const { store_id, product_id: id } = req.params;
    const user_id = req.userId;

    const store = await Store.findOne({ where: { user_id, id: store_id } });

    if (store.id != store_id) {
      return res.send(401);
    }

    await Product.destroy({ where: { id, store_id } });

    return res.json({ message: 'Product deleted' });
  }
}

export default new ProductController();
