async function connect() {
   if (global.connection && global.connection.state !== 'disconnected') {
       return global.connection;
   }

   const mysql = require('mysql2/promise');
   const connection = await mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: 'Lcj.456baronesa',
       database: 'restaurantes'
   });
   global.connection = connection;
   return connection;
}

exports.post = async (req, res) => {
   const con = await connect();
   const sql = 'INSERT INTO restaurante (nome, telefone, endereco, tipo_cozinha, avaliacao) VALUES (?, ?, ?, ?, ?)';
   const values = [req.body.nome, req.body.telefone, req.body.endereco, req.body.tipo_cozinha, req.body.avaliacao];
   await con.query(sql, values);
   res.status(201).send('Restaurante inserido com sucesso');
};

exports.put = async (req, res) => {
   let id = req.params.id;
   const con = await connect();
   const sql = 'UPDATE restaurante SET nome = ?, telefone = ?, endereco = ?, tipo_cozinha = ?, avaliacao = ? WHERE idrestaurante = ?';
   const values = [req.body.nome, req.body.telefone, req.body.endereco, req.body.tipo_cozinha, req.body.avaliacao, id];
   await con.query(sql, values);
   res.status(200).send('Restaurante atualizado com sucesso');
};

exports.delete = async (req, res) => {
   let id = req.params.id;
   const con = await connect();
   const sql = 'DELETE FROM restaurante WHERE idrestaurante = ?';
   await con.query(sql, [id]);
   res.status(200).send('Restaurante removido com sucesso');
};

exports.get = async (req, res) => {
   const con = await connect();
   const [rows] = await con.query('SELECT * FROM restaurante');
   res.status(200).send(rows);
};

exports.getById = async (req, res) => {
   let id = req.params.id;
   const con = await connect();
   const [rows] = await con.query('SELECT * FROM restaurante WHERE idrestaurante = ?', [id]);
   if (rows.length === 0) {
       return res.status(404).send({ error: 'Restaurante não encontrado' });
   }
   res.status(200).send(rows[0]);
};
