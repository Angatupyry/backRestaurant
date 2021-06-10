const { comentario } = require('../models');

const saveComment = async (req, res, next) => {
  try {
    const newComment = await comentario.create(req.body);

    return res.status(200).json({
      success: true,
      message: 'Comentario Creado',
      data: newComment,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { saveComment };
