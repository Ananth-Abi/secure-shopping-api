const http = require('http');

const products = [
  { id: 1, name: "Laptop",    price: 999,  stock: 50  },
  { id: 2, name: "Phone",     price: 499,  stock: 120 },
  { id: 3, name: "Headset",   price: 79,   stock: 200 },
  { id: 4, name: "Keyboard",  price: 49,   stock: 80  },
  { id: 5, name: "Monitor",   price: 299,  stock: 30  }
];

http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/products' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ success: true, data: products }));

  } else if (req.url.startsWith('/products/') && req.method === 'GET') {
    const id = parseInt(req.url.split('/')[2]);
    const product = products.find(p => p.id === id);
    if (product) {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: product }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ success: false, error: 'Product not found' }));
    }

  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ success: false, error: 'Route not found' }));
  }

}).listen(8080, () => {
  console.log('✅ Mock backend running at http://localhost:8080');
  console.log('   Try: http://localhost:8080/products');
});