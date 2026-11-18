const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const PHOTO_DIR = path.join(ROOT_DIR, 'photo');
const PRODUCTS_FILE = path.join(ROOT_DIR, 'productos.json');

// Ensure photo directory exists
if (!fs.existsSync(PHOTO_DIR)) {
    fs.mkdirSync(PHOTO_DIR, { recursive: true });
}

// MIME types dictionary
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Helper to read JSON request body
function parseJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
            // Guard against overly large payload (> 25MB)
            if (body.length > 25 * 1024 * 1024) {
                reject(new Error('Payload too large'));
            }
        });
        req.on('end', () => {
            try {
                const data = body ? JSON.parse(body) : {};
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
        req.on('error', reject);
    });
}

// Helper to send JSON responses
function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
}

// Helper to get products list
function getProducts() {
    if (!fs.existsSync(PRODUCTS_FILE)) {
        return [];
    }
    try {
        const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
        return JSON.parse(raw);
    } catch (e) {
        console.error('Error reading productos.json:', e);
        return [];
    }
}

// Helper to save products list
function saveProducts(products) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
}

// Sanitize filename
function sanitizeFilename(name) {
    return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove accents
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .toUpperCase();
}

const server = http.createServer(async (req, res) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        return res.end();
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // ==========================================
    // API ENDPOINTS
    // ==========================================

    // Health check / Status
    if (pathname === '/api/status' && req.method === 'GET') {
        return sendJson(res, 200, {
            status: 'ok',
            mode: 'server',
            timestamp: Date.now()
        });
    }

    // List available photos in photo/
    if (pathname === '/api/photos' && req.method === 'GET') {
        try {
            const files = fs.readdirSync(PHOTO_DIR).filter(file => {
                const ext = path.extname(file).toLowerCase();
                return ['.webp', '.png', '.jpg', '.jpeg', '.svg', '.gif'].includes(ext);
            });
            return sendJson(res, 200, files);
        } catch (err) {
            return sendJson(res, 500, { error: 'Error leyendo carpeta photo' });
        }
    }

    // GET /api/productos - List all products
    if (pathname === '/api/productos' && req.method === 'GET') {
        const products = getProducts();
        return sendJson(res, 200, products);
    }

    // POST /api/productos - Create a new product
    if (pathname === '/api/productos' && req.method === 'POST') {
        try {
            const payload = await parseJsonBody(req);
            if (!payload.nombre || !payload.codigo || payload.precio === undefined) {
                return sendJson(res, 400, { error: 'Nombre, código y precio son requeridos' });
            }

            const products = getProducts();

            // Check if code already exists
            const codeExists = products.some(p => String(p.codigo).trim() === String(payload.codigo).trim());
            if (codeExists) {
                return sendJson(res, 409, { error: `Ya existe un producto con el código "${payload.codigo}"` });
            }

            const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
            const newProduct = {
                id: maxId + 1,
                codigo: String(payload.codigo).trim(),
                nombre: String(payload.nombre).trim(),
                precio: parseFloat(payload.precio) || 0,
                category: payload.category || 'Otros',
                stock_actual: payload.stock_actual !== undefined ? parseInt(payload.stock_actual, 10) : 100,
                stock_minimo: payload.stock_minimo !== undefined ? parseInt(payload.stock_minimo, 10) : 10,
                imagen: payload.imagen || null
            };

            products.push(newProduct);
            saveProducts(products);

            return sendJson(res, 201, newProduct);
        } catch (err) {
            console.error('Error creating product:', err);
            return sendJson(res, 500, { error: err.message || 'Error al guardar producto' });
        }
    }

    // PUT /api/productos/:id - Update product
    const putMatch = pathname.match(/^\/api\/productos\/(\d+)$/);
    if (putMatch && req.method === 'PUT') {
        try {
            const id = parseInt(putMatch[1], 10);
            const payload = await parseJsonBody(req);
            const products = getProducts();
            const index = products.findIndex(p => p.id === id);

            if (index === -1) {
                return sendJson(res, 404, { error: 'Producto no encontrado' });
            }

            // Check if updated code conflicts with another product
            if (payload.codigo) {
                const conflict = products.some(p => p.id !== id && String(p.codigo).trim() === String(payload.codigo).trim());
                if (conflict) {
                    return sendJson(res, 409, { error: `El código "${payload.codigo}" ya pertenece a otro producto` });
                }
            }

            products[index] = {
                ...products[index],
                codigo: payload.codigo !== undefined ? String(payload.codigo).trim() : products[index].codigo,
                nombre: payload.nombre !== undefined ? String(payload.nombre).trim() : products[index].nombre,
                precio: payload.precio !== undefined ? parseFloat(payload.precio) : products[index].precio,
                category: payload.category !== undefined ? payload.category : products[index].category,
                stock_actual: payload.stock_actual !== undefined ? parseInt(payload.stock_actual, 10) : products[index].stock_actual,
                stock_minimo: payload.stock_minimo !== undefined ? parseInt(payload.stock_minimo, 10) : products[index].stock_minimo,
                imagen: payload.imagen !== undefined ? payload.imagen : products[index].imagen
            };

            saveProducts(products);
            return sendJson(res, 200, products[index]);
        } catch (err) {
            console.error('Error updating product:', err);
            return sendJson(res, 500, { error: err.message || 'Error al actualizar producto' });
        }
    }

    // DELETE /api/productos/:id - Delete product
    const deleteMatch = pathname.match(/^\/api\/productos\/(\d+)$/);
    if (deleteMatch && req.method === 'DELETE') {
        try {
            const id = parseInt(deleteMatch[1], 10);
            let products = getProducts();
            const initialLen = products.length;
            products = products.filter(p => p.id !== id);

            if (products.length === initialLen) {
                return sendJson(res, 404, { error: 'Producto no encontrado' });
            }

            saveProducts(products);
            return sendJson(res, 200, { success: true, id });
        } catch (err) {
            console.error('Error deleting product:', err);
            return sendJson(res, 500, { error: err.message || 'Error al eliminar producto' });
        }
    }

    // POST /api/upload - Upload and save photo to photo/ folder
    if (pathname === '/api/upload' && req.method === 'POST') {
        try {
            const payload = await parseJsonBody(req);
            const { dataUrl, filename, productName } = payload;

            if (!dataUrl) {
                return sendJson(res, 400, { error: 'dataUrl es requerido para subir la foto' });
            }

            // Extract base64 and mime type
            const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
                return sendJson(res, 400, { error: 'Formato de imagen inválido (debe ser base64 dataUrl)' });
            }

            const mime = matches[1];
            const base64Data = matches[2];
            const buffer = Buffer.from(base64Data, 'base64');

            let ext = '.webp';
            if (mime.includes('png')) ext = '.png';
            else if (mime.includes('jpeg') || mime.includes('jpg')) ext = '.jpg';
            else if (mime.includes('webp')) ext = '.webp';

            let targetName = filename;
            if (!targetName) {
                const baseSlug = productName ? sanitizeFilename(productName) : 'PRODUCTO';
                targetName = `${baseSlug}_${Date.now()}${ext}`;
            } else {
                targetName = sanitizeFilename(targetName);
                if (!path.extname(targetName)) {
                    targetName += ext;
                }
            }

            const targetPath = path.join(PHOTO_DIR, targetName);
            fs.writeFileSync(targetPath, buffer);

            console.log(`[Upload] Foto guardada: photo/${targetName} (${(buffer.length / 1024).toFixed(1)} KB)`);

            return sendJson(res, 200, {
                success: true,
                filename: targetName,
                path: `photo/${targetName}`,
                size: buffer.length
            });
        } catch (err) {
            console.error('Error in /api/upload:', err);
            return sendJson(res, 500, { error: err.message || 'Error al procesar la foto' });
        }
    }

    // ==========================================
    // STATIC FILE SERVING
    // ==========================================
    if (req.method === 'GET' || req.method === 'HEAD') {
        let filePath = pathname === '/' ? path.join(ROOT_DIR, 'index.html') : path.join(ROOT_DIR, pathname);

        // Security check: prevent directory traversal
        if (!filePath.startsWith(ROOT_DIR)) {
            res.writeHead(403);
            return res.end('Acceso denegado');
        }

        fs.stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                return res.end('404 Archivo no encontrado');
            }

            const ext = path.extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';

            res.writeHead(200, {
                'Content-Type': contentType,
                'Content-Length': stats.size,
                'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
            });

            if (req.method === 'HEAD') {
                return res.end();
            }

            const stream = fs.createReadStream(filePath);
            stream.pipe(res);
        });
        return;
    }

    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Método no permitido');
});

// Function to start server with port fallback
function startServer(port) {
    server.listen(port, () => {
        console.log(`\n==================================================`);
        console.log(`🚀 SuperMarket POS corriendo exitosamente!`);
        console.log(`📡 URL Local: http://localhost:${port}`);
        console.log(`📁 Fotos:      ${PHOTO_DIR}`);
        console.log(`💾 Base Datos: ${PRODUCTS_FILE}`);
        console.log(`==================================================\n`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Puerto ${port} ocupado, intentando en el puerto ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error('Error al iniciar el servidor:', err);
        }
    });
}

startServer(PORT);
