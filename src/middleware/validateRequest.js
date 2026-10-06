const validateRequest = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const issues = Array.isArray(error?.issues)
      ? error.issues
      : Array.isArray(error?.errors)
        ? error.errors
        : [];

    return res.status(400).json({
      status: 'fail',
      errors: issues.map((issue) => ({
        field: issue.path?.join('.') || 'body',
        message: issue.message,
      })),
    });
  }
};

export { validateRequest };
