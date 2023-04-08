const Db = require("../dboperations/OrderOperation")
var responeObject = require("../models/responeObject")

var resObj = new responeObject("", "", {})
class OrderController {

    // Lấy tất cả các đơn hàng
    getAllOrders (req, res) {
        Db.getAll().then((data) => {
            var listData = data[0]
            if (listData) {
                resObj.status = "OK"
                resObj.message = "Found all order successfully"
                resObj.data = listData
                return res.json(resObj)
            } else {
                resObj.status = "Failed"
                resObj.message = "Not Found orders"
                resObj.data = ""
                return res.json(resObj)
            }       
        })
    }

    // Lấy 1 đơn hàng theo id
    getOrderById (req, res) {
        var id = req.params.id
        Db.getById(id).then((data) => {
            var order = data[0]
            if (order) {
                resObj.status = "OK"
                resObj.message = "Found order successfully"
                resObj.data = order
                res.json(resObj)
            } else {
                resObj.status = "Failed"
                resObj.message = `Not Found order id: ${id}`
                resObj.data = ""
                res.json(resObj)
            }
        })
    }

    // Thêm một đơn hàng mới
    insertOrder (req, res) {

        let order = {...req.body}
        Db.add(order).then((data) => {
            
            if (order.address.trim() == "" || order.city.trim() == "" 
                || order.name.trim() == "" || order.phone.trim() == ""
                || order.quantity == "" || order.price == "") {
                resObj.status = "Failed"
                resObj.message = "Records is null"
                resObj.data = ""
                res.json(resObj)
            } else {
                resObj.status = "OK"
                resObj.message = "Insert order successfully"
                resObj.data = order
                res.json(resObj)
            }
        })
    }

    // Xóa một đơn hàng
    removeOrder (req, res) {

        var id = req.params.id
        Db.getById(id).then((data) => {
            var order = data[0]
            if (order) {
                Db.remove(id).then((data) => {
                    resObj.status = "OK"
                    resObj.message = "Remove order successfully"
                    resObj.data = `id: ${id}`
                    res.json(resObj)
                })
            } else {
                resObj.status = "Failed"
                resObj.message = "Not Found order delete"
                resObj.data = ""
                res.json(resObj)
            }
        })
    }

    // Chỉnh sửa đơn hàng
    updateOrder (req, res) {
        var id = req.params.id
        Db.getById(id).then((data) => {
            var order = data[0]
            let newOrder = {...req.body}
                if (order) {
                    Db.update(newOrder).then((data) => {
                        resObj.status = "OK"
                        resObj.message = "Update order successfully"
                        resObj.data = newOrder

                        res.json(resObj)
                    })
                } else {
                    resObj.status = "Failed"
                    resObj.message = "Not Found order update"
                    resObj.data = ""
                    res.json(resObj)
                }
        })
    }
}

// // Chỉnh sửa đơn hàng
// router.route("/order/update/:id").put((req, res) => {
//     var id = req.params.id
//     Db.getById(id).then((data) => {
//         var order = data[0]

//         let newOrder = {...req.body}
//         if (order) {
//             Db.update(newOrder).then((data) => {
//                 resObj.status = "OK"
//                 resObj.message = "Update order successfully"
//                 resObj.data = order

//                 res.json(resObj)
//             })
//         } else {
//             resObj.status = "Failed"
//             resObj.message = "Not Found order update"
//             resObj.data = ""
//             res.json(resObj)
//         }
//         })
    
// })


module.exports = new OrderController