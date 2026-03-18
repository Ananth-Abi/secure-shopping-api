import { useState } from 'react'
import Login from './components/Login'
import Products from './components/Products'
import './App.css'

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const handleLogin = (accessToken, username) => {
    setToken(accessToken)
    setUser(username)
  }

  const handleLogout = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🛒 Shopping API</h1>
        <p>Secured with WSO2 API Manager</p>
        {user && (
          <div className="user-info">
            <span>Welcome, {user}!</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </header>

      <main>
        {!token ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Products token={token} />
        )}
      </main>
    </div>
  )
}

export default App