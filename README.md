# SuperMarket POS - Sistema Profesional de Punto de Venta e Inventario

**SuperMarket POS** es una solución integral de punto de venta (POS) y administración de inventario diseñada especialmente para **supermercados, abarroterías, pulperías, minimarkets y tiendas de conveniencia**.

---

## 💼 Funcionalidades Comerciales

### 1. Punto de Venta Ágil (Caja Rápida)
* **Búsqueda inteligente**: Localiza productos en tiempo real por nombre o por código de barras.
* **Soporte para escáner / lector de código de barras**: Escanea y presiona `Enter` para agregar automáticamente al carrito sin usar el mouse.
* **Filtrado por categorías**: Navegación rápida por categorías comerciales (Abarrotes, Bebidas, Carnes y Embutidos, Verduras, Higiene y Limpieza, etc.).
* **Gestión de carrito en vivo**: Modificación rápida de cantidades, cálculo instantáneo de totales e impuestos en Lempiras (L.) o moneda local.
* **Control de ventas diarias**: Registro de tickets y arqueo de caja del día con desglose de ítems vendidos.

### 2. Administración y CRUD de Productos
* **Añadir productos fácilmente**:
  * Código de barras o ID único (con generador aleatorio integrado para productos sin código).
  * Nombre del producto.
  * Precio unitario de venta.
  * Stock actual y alertas de inventario bajo.
  * Asignación de categorías existentes o creación de nuevas categorías al instante.
  * **Carga de fotografías de productos**:
    * Arrastra y suelta (*Drag & Drop*) o selecciona imágenes (`.png`, `.jpg`, `.webp`).
    * **Optimización automática**: Las fotos pesadas se procesan al instante a un tamaño liviano (~30 KB) manteniendo una alta nitidez, evitando que el sistema se ralentice.
    * Las fotos quedan almacenadas permanentemente en el sistema.
* **Panel de Gestión de Inventario**:
  * Tabla administrativa completa con fotos en miniatura, filtros, precios y stock.
* **Edición y Actualización**:
  * Modificación de cualquier producto o foto con un clic desde el catálogo o la tabla.
* **Seguridad y Prevención de Errores**:
  * Ventana de confirmación para evitar borrados accidentales de mercancía.
  * Validación contra duplicados de códigos de barra.
* **Copias de Respaldo y Exportación**:
  * Exportación en 1 clic a **SQL** (sentencias `INSERT INTO productos...` listas para base de datos).
  * Exportación en 1 clic a **JSON** para copia de seguridad de inventario.

---

## 🗄️ Base de Datos y Persistencia

### ¿Qué base de datos utiliza el sistema?
1. **Base de Datos en Servidor (`productos.json`)**:
   - Es el motor principal del sistema cuando se corre con `node server.js`.
   - Todos los productos y cambios se escriben directamente al disco duro.
   - **Inmunidad a la caché**: Si el usuario o el cajero borra la caché, las cookies o el historial del navegador, **los productos y las fotos NO se pierden**, ya que están guardados de forma fija en el disco duro.
2. **Fotografías (`photo/`)**:
   - Cada foto subida se guarda físicamente en la carpeta permanente `photo/`.
   - Aunque el usuario borre el archivo original de su carpeta "Descargas", la foto queda preservada en el sistema.
3. **Compatibilidad SQL Empresarial (`database_postgresql.sql` / `database_sqlserver.sql`)**:
   - Incluye los esquemas relacionales listos para PostgreSQL y Microsoft SQL Server en caso de implementaciones en red local corporativa.

---

## 🚀 Puesta en Marcha

### Modo Servidor (Recomendado para Producción y Ventas)
Requiere Node.js instalado (sin necesidad de paquetes externos):

```bash
# Iniciar el sistema
npm start
# o también:
node server.js
```

Abre en el navegador: **`http://localhost:3000`**

### Modo Navegador Autónomo (Sin instalación)
Haz doble clic sobre [index.html](file:///Users/yosephflores/Desktop/proyectoSuper/index.html) para abrirlo en cualquier navegador. Funciona con almacenamiento local integrado.

---

## 📁 Estructura del Software

```text
proyectoSuper/
├── index.html               # Interfaz del Punto de Venta y Gestión de Inventario
├── style.css                # Estilos visuales modernos y responsivos
├── script.js                # Lógica del POS, carrito, CRUD y procesamiento de fotos
├── server.js                # Servidor HTTP local y API REST para guardado en disco
├── productos.json           # Base de datos permanente de productos
├── package.json             # Manifiesto y scripts del proyecto
├── photo/                   # Carpeta donde se guardan permanentemente las fotos
├── baseDatos.txt            # Estructura y consultas SQL
├── database_postgresql.sql  # Respaldo SQL para PostgreSQL
└── database_sqlserver.sql   # Respaldo SQL para Microsoft SQL Server
```
