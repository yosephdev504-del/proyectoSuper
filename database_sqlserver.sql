-- =================================================================================
-- SCRIPT DE BASE DE DATOS - CATALOGO DE PRODUCTOS (SQL SERVER)
-- Base de Datos: SuperMarketDB
-- =================================================================================

USE master;
GO

-- 1. CREAR LA BASE DE DATOS
-- ---------------------------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'SuperMarketDB')
BEGIN
    CREATE DATABASE SuperMarketDB;
END
GO

USE SuperMarketDB;
GO

-- 2. CREAR TABLAS
-- ---------------------------------------------------------------------------------

-- Tabla de Categorías (Para normalizar y ordenar tu C#)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Categorias')
BEGIN
    CREATE TABLE Categorias (
        CategoriaID INT IDENTITY(1,1) PRIMARY KEY,
        Nombre NVARCHAR(50) NOT NULL
    );
END
GO

-- Tabla de Productos
-- Usamos DECIMAL(10,2) para el dinero (Lempiras). Nunca uses FLOAT para dinero en C#.
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Productos')
BEGIN
    CREATE TABLE Productos (
        ProductoID INT IDENTITY(1,1) PRIMARY KEY,
        CategoriaID INT NOT NULL,
        Codigo NVARCHAR(50) NULL,       -- Código de barras o interno
        Nombre NVARCHAR(150) NOT NULL,  -- Nombre del producto
        Precio DECIMAL(10, 2) NOT NULL, -- Precio actual
        
        -- Relación con la tabla Categorías
        CONSTRAINT FK_Productos_Categorias FOREIGN KEY (CategoriaID) 
        REFERENCES Categorias(CategoriaID)
    );
END
GO

-- =================================================================================
-- 3. INSERTAR DATOS (CATEGORÍAS)
-- =================================================================================
-- Usamos un truco para insertar solo si no existen
INSERT INTO Categorias (Nombre)
SELECT 'ABARROTES' WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = 'ABARROTES') UNION ALL
SELECT 'CARNES' WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = 'CARNES') UNION ALL
SELECT 'COCINA' WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = 'COCINA') UNION ALL
SELECT 'CONDIMENTOS' WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = 'CONDIMENTOS') UNION ALL
SELECT 'EMBUTIDOS' WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = 'EMBUTIDOS') UNION ALL
SELECT 'FARDOS' WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = 'FARDOS') UNION ALL
SELECT 'GENERAL' WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = 'GENERAL') UNION ALL
SELECT 'GOLOSINAS' WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = 'GOLOSINAS') UNION ALL
SELECT 'GRANOS BASICOS' WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = 'GRANOS BASICOS') UNION ALL
SELECT 'HIGIENE PERSONAL' WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = 'HIGIENE PERSONAL') UNION ALL
SELECT 'LACTEOS' WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = 'LACTEOS') UNION ALL
SELECT 'LIMPIEZA DEL HOGAR' WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = 'LIMPIEZA DEL HOGAR') UNION ALL
SELECT 'MASCOTAS' WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = 'MASCOTAS') UNION ALL
SELECT 'REFRESCOS' WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = 'REFRESCOS') UNION ALL
SELECT 'VERDURAS' WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE Nombre = 'VERDURAS');
GO

-- =================================================================================
-- 4. INSERTAR PRODUCTOS (MUESTRA DE CADA PÁGINA/SECCIÓN)
-- =================================================================================
-- NOTA: Para agregar más, copia la línea y cambia los datos.
-- El script busca automáticamente el ID de la categoría por el nombre.

-- --- ABARROTES ---
INSERT INTO Productos (Codigo, Nombre, Precio, CategoriaID) VALUES
('8410077000070', 'ACEITE DE OLIVO BOTE PEQUEÑO', 125.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'ABARROTES')),
('279', 'ACEITE MAZOLA (400ML)', 48.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'ABARROTES')),
('7413100005074', 'ACEITE DE OLIVO EN BOLSA', 48.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'ABARROTES')),
('1661', 'AZUCAR EL CAÑAL 2L', 26.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'ABARROTES')),
('68', 'CAFE DE PALO', 120.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'ABARROTES')),
('759076012331', 'GALON MAYONESA FANS', 310.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'ABARROTES'));

-- --- CARNES ---
INSERT INTO Productos (Codigo, Nombre, Precio, CategoriaID) VALUES
('17', 'ALITAS DE POLLO (LIBRA)', 62.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'CARNES')),
('5', 'CARNE MOLIDA DE REZ (LIBRA)', 88.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'CARNES')),
('9', 'CHULETA DE CERDO (LIBRA)', 49.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'CARNES')),
('11', 'COSTILLA AHUMADA (LIBRA)', 75.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'CARNES')),
('6556', 'LOMO DE CERDO', 68.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'CARNES'));

-- --- COCINA ---
INSERT INTO Productos (Codigo, Nombre, Precio, CategoriaID) VALUES
('7428732006023', 'ALUMINIO FOIL PAC 200FT', 125.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'COCINA')),
('1130', 'BOLSA DE BASURA 36X54', 38.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'COCINA')),
('231', 'PLATO #8 (25PCS)', 16.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'COCINA')),
('7423382501652', 'VASO DE 8OZ.', 36.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'COCINA'));

-- --- CONDIMENTOS ---
INSERT INTO Productos (Codigo, Nombre, Precio, CategoriaID) VALUES
('1818', 'ABLANDADOR DE CARNE', 3.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'CONDIMENTOS')),
('523', 'CONSOME DE POLLO LIBRA', 20.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'CONDIMENTOS')),
('7422332400366', 'GALON DE CHILE IMPACTO', 140.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'CONDIMENTOS')),
('80', 'MOSTAZA REGIA (100 G)', 13.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'CONDIMENTOS'));

-- --- EMBUTIDOS ---
INSERT INTO Productos (Codigo, Nombre, Precio, CategoriaID) VALUES
('30', 'BARBACOA DELICIA PEQUEÑO', 65.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'EMBUTIDOS')),
('7421000905912', 'CHORIZO ARGENTINO (SIN PICAR)', 75.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'EMBUTIDOS')),
('2022', 'CHORIZO EN TRIPA', 50.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'EMBUTIDOS')),
('27', 'HOT DOG DELICIA PEQUEÑO', 50.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'EMBUTIDOS')),
('328', 'JAMON BAVARIA GUANGOLOLA', 32.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'EMBUTIDOS')),
('1820', 'MORTADELA EUROPEA', 33.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'EMBUTIDOS'));

-- --- GOLOSINAS ---
INSERT INTO Productos (Codigo, Nombre, Precio, CategoriaID) VALUES
('9635', 'ALBORAS', 40.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'GOLOSINAS')),
('74000593_1', 'CANELITAS', 18.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'GOLOSINAS')),
('85521', 'CHURRO CARIBAS NATUCHIPS GRANDE', 32.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'GOLOSINAS')),
('21102344', 'CHURRO DORITO QUESO', 7.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'GOLOSINAS')),
('7441029524499', 'GALLETA PRINCIPE CHOCO DROPS', 20.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'GOLOSINAS'));

-- --- GRANOS BASICOS ---
INSERT INTO Productos (Codigo, Nombre, Precio, CategoriaID) VALUES
('1827', 'ARROZ PRECOCIDO EN LIBRA', 15.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'GRANOS BASICOS')),
('206', 'AZUCAR FORTIFICADA (460 G)', 14.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'GRANOS BASICOS')),
('57', 'FRIJOL (LIBRA)', 24.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'GRANOS BASICOS')),
('210', 'MASECA (410 G)', 13.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'GRANOS BASICOS'));

-- --- HIGIENE PERSONAL ---
INSERT INTO Productos (Codigo, Nombre, Precio, CategoriaID) VALUES
('269', 'CEPILLO DE DIENTES COLGATE', 18.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'HIGIENE PERSONAL')),
('643', 'JABON PROTEX', 22.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'HIGIENE PERSONAL')),
('233', 'PASTA COLGATE GRANDE', 52.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'HIGIENE PERSONAL')),
('2009', 'SHAMPOO HEAD SHOULDERS', 5.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'HIGIENE PERSONAL'));

-- --- LACTEOS ---
INSERT INTO Productos (Codigo, Nombre, Precio, CategoriaID) VALUES
('602', 'CARTON DE HUEVO BLANCO', 98.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'LACTEOS')),
('113', 'LECHE ENTERA (946 ML)', 34.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'LACTEOS')),
('105', 'LIBRA DE QUESILLO', 50.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'LACTEOS')),
('103', 'MANTEQUILLA LIBRA', 34.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'LACTEOS')),
('107', 'QUESO SEMI SECO LIBRA', 78.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'LACTEOS'));

-- --- LIMPIEZA DEL HOGAR ---
INSERT INTO Productos (Codigo, Nombre, Precio, CategoriaID) VALUES
('226', 'LIMPIOX (425 G)', 32.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'LIMPIEZA DEL HOGAR')),
('314', 'ESCOBAS', 50.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'LIMPIEZA DEL HOGAR')),
('223', 'SUAVITEL (800ML AZUL)', 68.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'LIMPIEZA DEL HOGAR')),
('652', 'ULTRA CLIN AZUL 5KG', 165.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'LIMPIEZA DEL HOGAR'));

-- --- REFRESCOS ---
INSERT INTO Productos (Codigo, Nombre, Precio, CategoriaID) VALUES
('7421600303835', 'ADRENALINA RUSH', 35.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'REFRESCOS')),
('402', 'COCACOLA 1.5 LITROS', 40.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'REFRESCOS')),
('7422110100556', 'COCACOLA 3 LITROS', 68.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'REFRESCOS')),
('404', 'PEPSI 3 LITROS', 70.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'REFRESCOS'));

-- --- VERDURAS (Precios actualizados según Pag 29) ---
INSERT INTO Productos (Codigo, Nombre, Precio, CategoriaID) VALUES
('1898', 'AGUACATES', 20.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'VERDURAS')),
('1792', 'CEBOLLA BLANCA', 22.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'VERDURAS')),
('1895', 'CHILE DULCE', 12.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'VERDURAS')),
('2015', 'PAPAS', 20.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'VERDURAS')),
('1822', 'TOMATES', 25.00, (SELECT CategoriaID FROM Categorias WHERE Nombre = 'VERDURAS'));

GO