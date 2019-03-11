import config from './config/config';
import user from './models/user';
import product from './models/product';

exports.config = config;
exports.User = user;
exports.Product = product;

export default {
  config,
  user,
  product
};
