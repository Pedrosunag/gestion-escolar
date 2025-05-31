const db = require('../config/db');

const obtenerMaestros = async (req, res) => {
  try {
    const resultado = await db.query('SELECT * FROM maestros ORDER BY id');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al obtener maestros:', error);
    res.status(500).json({ error: 'Error al obtener maestros' });
  }
};

const obtenerMaestroPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await db.query('SELECT * FROM maestros WHERE id = $1', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Maestro no encontrado' });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al obtener maestro:', error);
    res.status(500).json({ error: 'Error al obtener maestro' });
  }
};

const agregarMaestro = async (req, res) => {
  const { nombre, apellido, correo } = req.body;
  try {
    await db.query(
      'INSERT INTO maestros (nombre, apellido, correo) VALUES ($1, $2, $3)',
      [nombre, apellido, correo]
    );
    res.status(201).json({ mensaje: 'Maestro agregado correctamente' });
  } catch (error) {
    console.error('Error al agregar maestro:', error);
    res.status(500).json({ error: 'Error al agregar maestro' });
  }
};

const actualizarMaestro = async (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, correo } = req.body;
  try {
    await db.query(
      'UPDATE maestros SET nombre = $1, apellido = $2, correo = $3 WHERE id = $4',
      [nombre, apellido, correo, id]
    );
    res.json({ mensaje: 'Maestro actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar maestro:', error);
    res.status(500).json({ error: 'Error al actualizar maestro' });
  }
};

const eliminarMaestro = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM maestros WHERE id = $1', [id]);
    res.json({ mensaje: 'Maestro eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar maestro:', error);
    res.status(500).json({ error: 'Error al eliminar maestro' });
  }
};

module.exports = {
  obtenerMaestros,
  obtenerMaestroPorId,
  agregarMaestro,
  actualizarMaestro,
  eliminarMaestro
};