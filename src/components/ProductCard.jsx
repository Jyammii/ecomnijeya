import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
      </Link>

      <div className="product-info">
        <p className="product-series">{product.series}</p>

        <Link
          to={`/product/${product.id}`}
          className="product-name"
        >
          {product.name}
        </Link>

        <p className="product-description">
          {product.shortDescription}
        </p>

        <div className="product-bottom">
          <strong>₱{product.price.toLocaleString()}</strong>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
