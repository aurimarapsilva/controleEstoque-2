const Moviments = require('../models/Moviments');
const MovimentsItems = require('../models/MovimentsItems');
const Product = require('../models/Product');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        try {
            const moviments = await Moviments.findAll({
                include: [ 
                    {association: 'movimentItems', include: 'movimentsItemsProduct'},
                    {association: 'userMoviments'},
                    {association: 'clientMoviments'},
                ]
            });

            return res.json(moviments);
        } catch (error) {
            console.log(error)
        }
    },

    async store(req, res){
        try {
            const {user_id} = req.params;
            const {type, nf, total, client_id, payment_type, items} = req.body;

            const user = await User.findAll({where: {id: user_id}});

            if(!user){
                return res.json({message: `User not found: ${user_id}`})
            }else if (!user[0].active){
                return res.json({message: `User is inactive: ${user_id}`})
            }

            const moviments = await Moviments.create({type, nf, total, user_id, client_id, payment_type});

            const moviment_id = moviments.id;

            
            const movItems =items.map(async item => {
                const {product_id, quantity} = item;
                let price = 0;
                
                const product = await Product.findAll({where: {id: product_id}});

                if (!product) {
                    return res.json({message: `Product not found: ${product_id}`});
                }else{
                    price = product[0].price;
                }

                await MovimentsItems.create({quantity, price, moviment_id, product_id});
            })

            // Fazer executar todo loop de forma sincrona 
            await Promise.all(movItems);

            const movimentsItems = await Moviments.findAll({where: {id: moviment_id}, include: {association: 'movimentItems'}});                        

            return res.json(movimentsItems) 

        } catch (error) {
            console.log(error);
        }
    }
}