const router = require('express').Router()
const routeProduct = require('../controllers/produtoController')

router.get('/produtos/:id', routeProduct.getProductByID)
router.get('/produtos', routeProduct.getAllProduct)
router.post('/produtos', routeProduct.createProduct)
router.put('/produtos/:id', routeProduct.updateProduct)
router.delete('/produtos/:id', routeProduct.deleteProduct)

module.exports = router