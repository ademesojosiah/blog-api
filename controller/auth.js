const signup = (req, res) => {
  const {
    user:{user,token},
    authInfo: { message },
  } = req;
  res.status(201).json({ user, token, message });
};

const login = (req, res) => {
  const { user:{ user , token} } = req;
  res.status(201).json({ user , token, message: 'Login successful'});
};

module.exports = { signup, login };
