import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout({ cart, placeOrder }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });

  const [errors, setErrors] = useState({});

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone =
        "Please enter a valid 11-digit Philippine phone number.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    placeOrder(formData);
    navigate("/order-success");
  };

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="empty-checkout">
          <h1>Your cart is empty.</h1>

          <p>
            Add a fragrance before checking out.
          </p>

          <Link
            to="/"
            className="continue-button"
          >
            Browse Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-heading">
          <p>ALMOST YOURS</p>
          <h1>Checkout</h1>
        </div>

        <div className="checkout-layout">
          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
            <section className="form-section">
              <h2>Customer Information</h2>

              <div className="form-group">
                <label htmlFor="fullName">
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />

                {errors.fullName && (
                  <span className="error-message">
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                  />

                  {errors.email && (
                    <span className="error-message">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="09XXXXXXXXX"
                  />

                  {errors.phone && (
                    <span className="error-message">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number, street, barangay, city..."
                  rows="4"
                />

                {errors.address && (
                  <span className="error-message">
                    {errors.address}
                  </span>
                )}
              </div>
            </section>

            <section className="form-section">
              <h2>Payment Method</h2>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={
                    formData.payment === "Cash on Delivery"
                  }
                  onChange={handleChange}
                />

                <span>
                  <strong>Cash on Delivery</strong>
                  <small>
                    Pay when your order arrives.
                  </small>
                </span>
              </label>
            </section>

            <button
              type="submit"
              className="place-order-button"
            >
              Place Order · ₱{total.toLocaleString()}
            </button>
          </form>

          <aside className="checkout-summary">
            <p>YOUR ORDER</p>
            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h3>{item.series}</h3>
                  <span>
                    Qty: {item.quantity}
                  </span>
                </div>

                <strong>
                  ₱
                  {(
                    item.price * item.quantity
                  ).toLocaleString()}
                </strong>
              </div>
            ))}

            <div className="checkout-total">
              <span>Total</span>

              <strong>
                ₱{total.toLocaleString()}
              </strong>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
