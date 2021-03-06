const { Model, DataTypes } = require('sequelize');


class Product extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            price: DataTypes.FLOAT
        }, {
            sequelize
        })
    }

    static associate(models){
        this.hasMany(models.MovimentsItems, {foreignKey: 'product_id', as: 'movimentProduct'})
    }
}

module.exports = Product;