export function Cart() {
    const cartItems = [
        { id: 1, item: 'Pepperoni Pizza', price: 12, quantity: 2 },
        { id: 2, item: 'Margherita Pizza', price: 10, quantity: 1 }
    ];

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.item}</td>
                            <td>${item.price}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-end">
                <h3>Total: ${totalPrice}</h3>
                <button className="btn btn-success">Checkout</button>
            </div>
        </div>
    );
}