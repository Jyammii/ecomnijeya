import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data";

function Home({ addToCart }) {
  const [search, setSearch] = useState("");
  const [visibleProducts, setVisibleProducts] = useState(6);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.series.toLowerCase().includes(search.toLowerCase())
  );

  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  const handleViewMore = () => {
    setVisibleProducts((current) => current + 3);
  };

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="home-intro">
        <div>
          <p className="small-title">L'Archive Haute Parfumerie</p>

          <h1>
            Discover your
            <span>signature scent.</span>
          </h1>

          <p className="intro-text">
            Rare essences distilled into timeless flacons. Each perfume is
            an intimate olfactory story waiting to unfold upon your skin.
          </p>

          <a href="#collection" className="intro-cta">
            Explore Fragrances →
          </a>
        </div>

        <div className="intro-stat">
          <p className="stat-number">9</p>
          <p className="stat-label">Creations</p>
        </div>
      </section>

      {/* Shop Grid */}
      <section className="shop-section" id="collection">
        <div className="shop-header">
          <div>
            <p className="section-label">Curated Collection</p>
            <h2>Haute Parfumerie</h2>
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search fragrances…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="product-grid">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <Link
                  to={`/product/${product.id}`}
                  className="product-image-link"
                >
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
                      Add to Bag
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="no-products">
              <h3>No fragrances found</h3>
              <p>Try a different search term.</p>
            </div>
          )}
        </div>

        {visibleProducts < filteredProducts.length && (
          <div className="view-more-wrapper">
            <button className="view-more" onClick={handleViewMore}>
              View More Creations
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
