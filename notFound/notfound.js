const notFound = (req, res) => {
  res.status(404).json({
    message: "The content you are looking for is not found",
  });
};

export default notFound;
