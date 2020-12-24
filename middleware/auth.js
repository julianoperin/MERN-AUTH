const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    //! Get the tokens out of the headers
    const token = req.header("x-auth-token");
    //validate
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, auth denied!" });

    //validate
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res.status(401).json({ msg: "JSW verification denied!" });

    // send the user id
    req.user = verified.id; //! it will send along the id
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
