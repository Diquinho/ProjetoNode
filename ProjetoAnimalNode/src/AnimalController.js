exports.post = async (req, res) => { // INSERINDO DADOS NO SISTEMA
    const conn = await connect();
    const sql = 'INSERT INTO animal (nome_animal, tipo_animal, raca) VALUES (?, ?, ?)';
    const values = [req.body.nome_animal, req.body.tipo_animal, req.body.raca]; // PUXANDO OS VALORES DA TABELA DO BANCO
    await conn.query(sql, values);

    res.status(201).send('Ok');
}

// ALTERANDO DADOS NO SISTEMA (UPDATE)
exports.put = async (req, res, next) => {
    let id = req.params.id;
    const conn = await connect();
    const sql = 'UPDATE animal SET nome_animal=?, tipo_animal=?, raca=? WHERE idanimal=?;';
    const values = [req.body.nome_animal, req.body.tipo_animal, req.body.raca, id];
    await conn.query(sql, values);
    res.status(201).send('ok');
 };

// DELETANDO DADOS DO SISTEMA.
 exports.delete = async (req, res, next) => {
    let id = req.params.id;
    const conn = await connect();
    const sql = 'DELETE FROM animal WHERE idanimal = ?;';
    const values = [id];
    await conn.query(sql, values);
    res.status(200).send('ok');
 };


// FUNÇÃO ONDE PEGA AS INFORMAÇÕES
exports.get = async (req, res, next) => {
    const conn = await connect(); // AGUARDANDO A CONEXÃO COM O BANCO DE DADOS
    const [rows] = await conn.query('SELECT * FROM animal');

    res.status(200).send(rows); // RETORNA O RESULTADO DA CONSULTA VIA SQL NO BANCO DE DADOS
}

exports.getById = async (req, res, next) => {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM animal WHERE idanimal = ' + req.params.id);
    if (rows.length > 0) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).send("ID não existe");
    }
 };


// FUNÇÃO DE CONEXÃO COM O BANCO DE DADOS
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

        const mysql = require("mysql2/promise");
        const connection = await
    mysql.createConnection({host: 'localhost', // DADOS REFERENTE AO BANCO DE DADOS, COM USUARIO, SENHA E NOME DA TABELA DO BANCO
    user: 'root', password: 'dico2310',
    database: 'tbl_animal'});

    console.log("Conectou no MySql!");
    global.connection = connection;
    return connection;
}

