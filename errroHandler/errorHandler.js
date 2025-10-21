const errorHandler = (err, req, res, next) => {
  console.log(`Something went wrong \nURL: ${req.url} \nMETHOD: ${req.method}`);
  console.log(err);
  return res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;
