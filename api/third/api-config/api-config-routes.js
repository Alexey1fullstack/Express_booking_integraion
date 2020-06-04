const express = require('express');
const ApiConfigController = require('./api-config-controller');

/**
 * Role: Handling the routing for api config db
 * The operations will be progressed in the controller part. so need to import the controller part.
 */
const router = express.Router();


router.get('/apiconfig', ApiConfigController.index);
router.get('/apiconfig/:id', ApiConfigController.show);
router.post('/apiconfig', ApiConfigController.create);
router.put('/apiconfig/:id', ApiConfigController.update);
router.delete('/apiconfig/:id', ApiConfigController.remove);


module.exports = router;