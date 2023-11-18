const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@doe.com',
  password: '123456',
  role: 'admin',
};

const validLogin = {
  email: 'user@user.com',
  password: 'secret_user',
};

const invalidEmailLogin = {
  email: 'user.com',
  password: 'secret_user',
};

const invalidPassLogin = {
  email: 'user@user.com',
  password: 'xablau',
};

const validToken = { ...user, password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO' };

export {
  user,
  validLogin,
  validToken,
  invalidEmailLogin,
  invalidPassLogin,
}
