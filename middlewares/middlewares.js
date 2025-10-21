const middleware = (req, res, next) => {
  console.log(`Middleware Called \nMethod: ${req.method}\nURL: ${req.url}`);
  next();
};
