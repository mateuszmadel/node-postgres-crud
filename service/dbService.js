const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM ips.klient ', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const addUser= (request, response) => {
    const {id_adresu,id_uzytkownika,imie,nazwisko,pesel,telefon} = request.body;
    console.log(imie +" "+nazwisko);
    pool.query('INSERT INTO ips.klient (id_klienta,id_adresu,id_uzytkownika,imie, nazwisko, pesel, telefon) VALUES (nextval(\'ips.seq_id_uzytkownika\'),$1, $2, $3, $4,$5,$6)', [id_adresu,id_uzytkownika,imie,nazwisko,pesel,telefon], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
})
}
const deleteUser = (request, response) => {
    const  id  = parseInt(request.params.id)
    console.log(id)
    pool.query('DELETE FROM ips.klient where id_klienta =$1',[id],(error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send('User deleted')
})
}
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { imie, nazwisko, pesel,telefon} = request.body

    pool.query(
        'UPDATE ips.klient SET imie = $1, nazwisko = $2, pesel=$3, telefon=$4 WHERE id_klienta = $5',
        [imie, nazwisko,pesel,telefon, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}


module.exports = {
    getUsers,
    addUser,
    deleteUser,
    updateUser
}