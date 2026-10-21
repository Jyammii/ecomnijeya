import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">
          L'ARCHIVE<span>.</span>
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/">Parfums</Link>
        <Link to="/cart">
          Bag
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </Link>
        <Link to="/checkout">Checkout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
