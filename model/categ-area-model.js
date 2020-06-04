const mongoose = require('mongoose');
/**
 * Role: The Database structure for area category that can be used in the filtering.
 * package: mongoose
 * Relationship: categ-area table has relationship with product-manual tabe and product-api table.
 * This relationship will be implemented via products_m, products_a column.
 */

var CategAreaSchema = new mongoose.Schema({
    title : String,
    area_id : String,
    products_m : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product-manual'  // identifier for relationship with product-manual table
    },
    products_a : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product-api'      // identifier for relationship with product-api table
    },
    created_at : {
        type : Date,
        default : Date.now
    }
});


var CategAreaModel = mongoose.model('categ-area', CategAreaSchema);

module.exports = CategAreaModel;