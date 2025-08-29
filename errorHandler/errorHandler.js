export function errorHandler(err, req, res, next) {
  if (err) {
    res.json({ status: "Error", success: false, message: err.message });
  }
}
