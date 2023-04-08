var config = require('./DbConfig')
const sql = require("mssql")

async function getAll() {
    try {
        let pool = await sql.connect(config)
        let orderItemList = await pool.request()
        .query("SELECT * FROM OrderItem")

        return orderItemList.recordsets
    } catch (error) {
        console.log(error)
    }
}

async function getById(id) {
    try {
        let pool = await sql.connect(config)
        let orderItem = pool.request()
        .input("id", sql.Int, id)
        .query("SELECT * FROM OrderItem WHERE id = @id")

        return (await orderItem).recordset
    } catch (error) {
        console.log(error)
    }
}

async function add(orderItem) {
    try {
        let pool = await sql.connect(config)
        let addOrderItem = pool.request()
        .input("quantity", sql.Int, orderItem.quantity)
        .input("price", sql.Float, orderItem.price)
        .input("order_id", sql.Int, orderItem.order_id)
        .input("product_id", sql.Int, orderItem.product_id)
        .query("INSERT INTO OrderItem(quantity, price, order_id, product_id) VALUES (@quantity, @price, @order_id, @product_id)")

        return (await addOrderItem).recordset
    } catch(error) {
        console.log(error)
    }
}

async function remove(id) {
    try {
        let pool = await sql.connect(config)
        let deleteOrderItem = await pool.request()
        .input("id", sql.Int, id)
        .query("DELETE FROM OrderItem WHERE id = @id")

        return deleteOrderItem.recordset
    } catch (error) {
        console.log(error)
    }
}

async function update(orderItem) {
    try {
        let pool = await sql.connect(config)
        let updateOrderItem = await pool.request()
        .input("quantity", sql.Int, orderItem.quantity)
        .input("price", sql.Float, orderItem.price)
        .input("product_id", sql.Int, orderItem.product_id)
        .query("UPDATE  OrderItem SET quantity = @quantity, price = @price, product_id = @product_id")

        return updateOrderItem.recordset
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAll: getAll,
    getById: getById,
    add: add,
    remove: remove,
    update: update
}
