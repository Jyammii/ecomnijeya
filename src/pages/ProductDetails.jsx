import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import products from "../data";

function ProductDetails({ addToCart }) {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="not-found">
        <h2>Product Not Found</h2>
        <p>The Hirono figure you're looking for doesn't exist.</p>

        <Link to="/">
          Back to Shop
        </Link>
      </main>
    );
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <main className="product-details-page">
      <div className="details-container">

        <Link to="/" className="back-link">
          ← Back to Collection
        </Link>

        <section className="product-details">

          <div className="details-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="details-info">

            <p className="details-series">
              {product.series}
            </p>

            <h1>{product.name}</h1>

            <p className="details-price">
              ₱{product.price.toLocaleString()}
            </p>

            <div className="stock">
              {product.stock > 0
                ? `${product.stock} pieces available`
                : "Out of stock"}
            </div>

            <p className="details-description">
              {product.description}
            </p>

            <div className="product-information">
              <div>
                <span>Brand</span>
                <strong>Pop Mart</strong>
              </div>

              <div>
                <span>Material</span>
                <strong>PVC / ABS / Hardware</strong>
              </div>

              <div>
                <span>Size</span>
                <strong>About 6cm - 9cm</strong>
              </div>

              <div>
                <span>Collection</span>
                <strong>{product.series}</strong>
              </div>
            </div>

            <p className="product-warning">
              ⚠ Actual product, size, and color may differ due
              to lighting, display screen, photography, and
              other factors.
            </p>

            {product.stock > 0 && (
              <div className="purchase-area">

                <div className="quantity-selector">
                  <button onClick={decreaseQuantity}>
                    −
                  </button>

                  <span>{quantity}</span>

                  <button onClick={increaseQuantity}>
                    +
                  </button>
                </div>

                <button
                  className="add-details-button"
                  onClick={handleAddToCart}
                >
                  Add {quantity} to Cart
                </button>

              </div>
            )}

            <Link to="/cart" className="view-cart-link">
              View Cart →
            </Link>

          </div>

        </section>
      </div>
    </main>
  );
}

export default ProductDetails;
