class OrderItem {
    constructor(id, quantity, price, order_id, product_id) {
        this.id = id
        this.quantity = quantity
        this.price = price
        this.order_id = order_id
        this.product_id = product_id
    }
}

module.exports = OrderItem