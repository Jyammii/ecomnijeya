import { Link } from "react-router-dom";

function Cart({ cart, updateQuantity, removeFromCart }) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="cart-heading">
          <p>YOUR SELECTION</p>
          <h1>Shopping Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your bag is empty.</h2>
            <p>Add a fragrance to begin your selection.</p>

            <Link to="/" className="continue-button">
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <section className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-info">
                    <p>{item.series}</p>
                    <h2>{item.name}</h2>
                    <strong>
                      ₱{item.price.toLocaleString()}
                    </strong>

                    <div className="cart-item-actions">
                      <div className="cart-quantity">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="item-subtotal">
                    <span>Subtotal</span>
                    <strong>
                      ₱
                      {(
                        item.price * item.quantity
                      ).toLocaleString()}
                    </strong>
                  </div>
                </div>
              ))}
            </section>

            <aside className="cart-summary">
              <p>ORDER SUMMARY</p>

              <h2>Summary</h2>

              <div className="summary-row">
                <span>Items</span>
                <span>
                  {cart.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>

              <div className="summary-row">
                <span>Delivery</span>
                <span>FREE</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <strong>₱{subtotal.toLocaleString()}</strong>
              </div>

              <Link
                to="/checkout"
                className="checkout-button"
              >
                Proceed to Checkout
              </Link>

              <Link to="/" className="continue-shopping">
                ← Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;
