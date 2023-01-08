const signup = (req, res) => {
  const {
    user:{user,token},
    authInfo: { message },
  } = req;
  const {first_name, last_name,email } = user
  res.status(201).json({ user:{first_name,last_name,email}, token, message });
};

const login = (req, res) => {
  const { user:{ user , token} } = req;

  const {first_name, last_name,email } = user
  res.status(201).json({ user:{first_name,last_name,email} , token, message: 'Login successful'});
};

module.exports = { signup, login };
