import { useState, useEffect } from 'react'
import axios from 'axios'

function Products({ token }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8280/shop/1.0/products',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setProducts(response.data.data)
    } catch (err) {
      setError('Failed to fetch products. Token may have expired.')
    } finally {
      setLoading(false)
    }
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="loading">Loading products...</div>
  if (error) return <div className="error-msg">{error}</div>

  return (
    <div className="products-container">
      <div className="products-header">
        <h2>📦 Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="products-grid">
        {filtered.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-icon">🛍️</div>
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <p className="stock">Stock: {product.stock}</p>
            <p className="description">{product.description}</p>
            <button className="add-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products