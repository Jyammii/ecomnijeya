import { Link } from "react-router-dom";

function OrderSuccess({ order }) {
  return (
    <main className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>

        <p className="success-label">Order Confirmed</p>

        <h1>Thank You.</h1>

        <p className="success-message">
          Your fragrance order has been confirmed and is
          on its way to you.
        </p>

        {order && (
          <div className="order-details">
            <div>
              <span>Customer</span>
              <strong>{order.fullName}</strong>
            </div>

            <div>
              <span>Payment</span>
              <strong>{order.payment}</strong>
            </div>

            <div>
              <span>Total</span>
              <strong>₱{order.total.toLocaleString()}</strong>
            </div>
          </div>
        )}

        <Link to="/" className="continue-button">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default OrderSuccess;
