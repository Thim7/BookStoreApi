const Db = require("../dboperations/OrderItemOperation")
const responeObject = require("../models/responeObject")
const resObj = new responeObject("", "", {})

class OrderItemController {

    getAllOrderItem (req, res) {
        Db.getAll().then((data) => {
            var listOrderItem = data[0]

            if (listOrderItem) {
                resObj.status = "OK"
                resObj.message = "Found order item successfully"
                resObj.data = listOrderItem

                return res.json(resObj)
            } else {
                resObj.status = "Failed"
                resObj.message = "Not found order item"
                resObj.data = ""

                return res.json(resObj)
            }
        })
    }

    getOrderItemById (req, res) {
        var id = req.params.id

        Db.getById(id).then((data) => {
            var orderItem = data[0]

            if (orderItem) {
                resObj.status = "OK"
                resObj.message = "Found order item successfully"
                resObj.data = orderItem

                return res.json(resObj)
            } else {
                resObj.status = "Failed"
                resObj.message = `Not found order item id: ${id}`
                resObj.data = ""

                return res.json(resObj)
            }
        })
    }

    insertOrderItem (req, res) {
        var orderItem = {...req.body}

        if (orderItem.quantity == null || orderItem.price == null 
            || orderItem.order_id == null || orderItem.product_id == null) {
                resObj.status = "Failed"
                resObj.message = `Records is null`
                resObj.data = ""

                return res.json(resObj)
            } else {
                Db.add(orderItem).then((data)=> {
                    resObj.status = "OK"
                    resObj.message = "Insert order item successfully"
                    resObj.data = orderItem

                    return res.json(resObj)
                })
            }
    }

    deleteOrderItem (req, res) {
        var id = req.params.id
        Db.getById(id).then((data) => {
            var orderItem = data[0]

            if (orderItem) {
                Db.remove(id).then((data) => {
                    resObj.status = "OK"
                    resObj.message = "Dalete order item successfully"
                    resObj.data = orderItem

                    return res.json(resObj)
                })
            } else {
                resObj.status = "Failed"
                resObj.message = "Not found order item delete"
                resObj.data = ""

                return res.json(resObj)
            }
        })
    }

    updateOrderItem (req, res) {
        var id = req.params.id

        Db.getById(id).then((data) => {
            var orderItem = data[0]

            if (orderItem) {
                var newOrderItem = {...req.body}
                Db.update(newOrderItem).then((data) => {
                    resObj.status = "OK"
                    resObj.message = "Update order item successfully"
                    resObj.data = newOrderItem

                    return res.json(resObj)
                })
            } else {
                resObj.status = "Failed"
                resObj.message = "Not found order item update"
                resObj.data = ""

                return res.json(resObj)
            }
        })
    }
}

module.exports = new OrderItemController
