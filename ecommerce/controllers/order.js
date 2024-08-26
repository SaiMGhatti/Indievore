const { Order, CartItem } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec().then( order => {
            if (!order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        }).catch(err => {
            console.log(err);
            res.status(400).json({
                error: errorHandler(err)
            });
            next();
        });
};

exports.create = (req, res) => {
    // console.log("CREATE ORDER: ", req.body);
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save().then(data => {
        if (data) {
            res.json(data);
        }
    }).catch(error=>{
        return res.status(400).json({
            error: errorHandler(error)
        });
    });
};

exports.listOrders = (req, res) => {
    Order.find()
        .populate("user", "_id name address")
        .sort("-created")
        .exec().then(orders => {
            if (orders) {
                res.json(orders);
            }
        }).catch(err => {
            return res.status(400).json({
                error: errorHandler(error)
            });
        });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.updateOne(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } }).then(
        order => {
            if (!order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(order);
        }
    ).catch(err => {
        res.status(400).json({
            error: errorHandler(err)
        });
    });
};
