var config = require("./DbConfig")
const sql = require("mssql")

async function getAll() {
    try {
        let pool = await sql.connect(config)
        let listOrder = await pool.request().query("SELECT * FROM Orders")
        return listOrder.recordsets
    }

    catch (error) {
        console.log(error)
    }
}

async function getById(id) {
    try {
        let pool = await sql.connect(config)
        let order = await pool.request()
        .input("id", sql.Int, id)
        .query("SELECT * FROM Orders o WHERE o.id = @id")

        return order.recordset
        
    } catch (error) {
        console.log(error)
    }
}

async function add(order) {
    try {
        let pool = await sql.connect(config)
        let insertOrder = await pool.request()
        .input("address", sql.NVarChar, order.address)
        .input("city", sql.NVarChar, order.city)
        .input("name", sql.NVarChar, order.name)
        .input("phone", sql.VarChar, order.phone)
        .input("price", sql.Float, order.price)
        .input("quantity", sql.Int, order.quantity)
        .input("message", sql.NVarChar, order.message)
        .input("user_id", sql.Int, order.user_id)
        .query("INSERT INTO Orders (address, city, name, phone, price, quantity, message, user_id) VALUES (@address, @city, @name, @phone, @price, @quantity, @message, @user_id)")

        return insertOrder.recordset
    } catch (error) {
        console.log(error)
    }
}

async function remove(id) {

    try {
        let pool = await sql.connect(config)
        let orderRemove = await pool.request()
        .input("id", sql.Int, id)
        .query("DELETE FROM Orders  WHERE id  = @id")

        return orderRemove.recordset
    } catch (error) {
        console.log(error)
    }
}

async function update(order) {
    try {
        let pool = await sql.connect(config)
        let updateOrder = await pool.request()
        .input("id", sql.Int, order.id)
        .input("address", sql.NVarChar, order.address)
        .input("city", sql.NVarChar, order.city)
        .input("name", sql.NVarChar, order.name)
        .input("phone", sql.NVarChar, order.phone)
        .input("quantity", sql.Int, order.quantity)
        .input("price", sql.Float, order.price)
        .input("pid", sql.Bit, order.pid)
        .input("status", sql.NVarChar, order.status)
        .input("message", sql.NVarChar, order.message)
        .execute("UpdateOrder")

        return updateOrder.recordsets
    } catch (error) {
        console.log(error)
    }
}

module.exports   = {
    getAll: getAll,
    getById: getById,
    add: add,
    remove: remove,
    update: update
}