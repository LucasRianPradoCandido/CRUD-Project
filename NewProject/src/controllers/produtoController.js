
const database = require('../services/db')


exports.getAllProduct =  async (req, res) => {
    try {
      const result = await database.query('SELECT * FROM produtos')
      return res.status(200).json(result.rows)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
}

exports.getProductByID = async (req, res) => {
    try{
        const result = await database.query(`SELECT * FROM produtos WHERE id = ${req.params.id}`)
        return res.status(200).json(result.rows[0])
    }catch(error){
        return res.status(500).json({ error: error.message })  
    }
}

exports.createProduct = async (req, res) => {
    try{
        const result = await database.query(
           'INSERT INTO produtos (productname, productbrand, productamount) VALUES ($1, $2, $3)',
           [req.body.productname, req.body.productbrand, req.body.productamount]
        )
        return res.status(201).json(result.rows[0])
    }catch(error){
       return res.status(500).json({ error: error.message })
    }

}

exports.updateProduct = async (req, res) => {
    try{
       const result = await database.query('UPDATE produtos SET productname = $1, productbrand = $2, productamount = $3 WHERE id = $4', 
       [req.body.productname, req.body.productbrand, req.body.productamount, req.params.id])
       return res.status(200).json(result.rows[0])
    }catch(error){
        return res.status(500).json({ error: error.message })
    }
}

exports.deleteProduct = async (req, res) => {
    try{
        const result = await database.query('DELETE FROM produtos WHERE id = $1', [req.params.id])
        return res.status(204).send()
    }catch(error){
        return res.status(500).json({ error: error.message })  
    }
}

