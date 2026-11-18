/**
 * SuperMarket POS - Sistema de Punto de Venta y Gestión de Inventario
 * Abarroterías, Minimarkets y Supermercados en General
 * Soporta almacenamiento en servidor (Node.js) con subida de fotos a photo/
 * y almacenamiento local (LocalStorage + Base64 optimizado en Canvas)
 */

// ==========================================
// 1. DATOS INICIALES (Fallback)
// ==========================================
const productsInput = [
    { id: 1, codigo: "8410077000070", nombre: "Aceite de Olivo Bote Pequeño", precio: 125.00 },
    { id: 2, codigo: "279", nombre: "Aceite Mazola (400ml)", precio: 48.00 },
    { id: 3, codigo: "7413100005074", nombre: "Aceite de Olivo en Bolsa", precio: 48.00 },
    { id: 4, codigo: "1670", nombre: "Aceite Libra", precio: 22.00 },
    { id: 5, codigo: "1128", nombre: "Aceite Wesson Canola", precio: 525.00 },
    { id: 6, codigo: "803275305005", nombre: "Avena Molida", precio: 36.00 },
    { id: 7, codigo: "67", nombre: "Avena Mosch", precio: 32.00 },
    { id: 8, codigo: "020", nombre: "Azucar Morena", precio: 15.00 },
    { id: 9, codigo: "1661", nombre: "Azucar El Cañal 2L", precio: 26.00 },
    { id: 10, codigo: "68", nombre: "Cafe de Palo", precio: 120.00 },
    { id: 11, codigo: "7891000300602", nombre: "Cafe Instantaneo", precio: 198.00 },
    { id: 12, codigo: "65", nombre: "Cafe Oro Libra", precio: 9.00 },
    { id: 13, codigo: "86", nombre: "Manteca Clover (Libra)", precio: 24.00 },
    { id: 14, codigo: "90", nombre: "Manteca Clover (Quilo)", precio: 49.00 },
    { id: 15, codigo: "680", nombre: "Espagueti Mi Pasta", precio: 9.00 },
    { id: 16, codigo: "7441000714147", nombre: "Maseca para Pastelitos", precio: 22.00 },
    { id: 17, codigo: "7401004220617", nombre: "Mayonesa Doypack", precio: 55.00 },
    { id: 18, codigo: "7411000329702", nombre: "Salsa Naturas", precio: 48.00 },
    { id: 19, codigo: "76", nombre: "Sopa Maggi Pollo", precio: 15.00 },
    { id: 20, codigo: "7420000410402", nombre: "Vinagre Rico", precio: 40.00 },
    { id: 21, codigo: "4", nombre: "Carne de Res (Tajo Libra)", precio: 95.00 },
    { id: 22, codigo: "5", nombre: "Carne Molida de Res", precio: 88.00 },
    { id: 23, codigo: "9", nombre: "Chuleta de Cerdo", precio: 49.00 },
    { id: 24, codigo: "13", nombre: "Costilla de Cerdo", precio: 49.00 },
    { id: 25, codigo: "18", nombre: "Pollo Mixto (Libra)", precio: 28.00 },
    { id: 26, codigo: "17", nombre: "Alitas de Pollo", precio: 62.00 },
    { id: 27, codigo: "7421000904168", nombre: "Chorizo Barbacoa Delicia", precio: 65.00 },
    { id: 28, codigo: "328", nombre: "Jamon Bavaria", precio: 32.00 },
    { id: 29, codigo: "7424101100569", nombre: "Hot Dog Pollo", precio: 65.00 },
    { id: 30, codigo: "1820", nombre: "Mortadela Europea", precio: 33.00 },
    { id: 31, codigo: "233", nombre: "Pasta Colgate Grande", precio: 52.00 },
    { id: 32, codigo: "637", nombre: "Jabon Palmolive", precio: 22.00 },
    { id: 33, codigo: "02", nombre: "Papel Higienico Scott (4 rollos)", precio: 80.00 },
    { id: 34, codigo: "1838", nombre: "Detergente en Libra", precio: 15.00 },
    { id: 35, codigo: "223", nombre: "Suavitel (800ml)", precio: 68.00 },
    { id: 36, codigo: "227", nombre: "Cloro Magia Blanca", precio: 6.00 },
    { id: 37, codigo: "7422110100556", nombre: "Coca Cola 3 Litros", precio: 68.00, imagen: "COCACOLA_3_LITROS.webp" },
    { id: 38, codigo: "409", nombre: "Coca Cola 1.1L", precio: 35.00, imagen: "COCACOLA_1.1_LITROS.webp" },
    { id: 39, codigo: "7421600303835", nombre: "Adrenalina Rush", precio: 35.00, imagen: "ADRENALINA_RUSH.webp" },
    { id: 40, codigo: "09", nombre: "Jugo de Naranja Leyde", precio: 17.00, imagen: "JUGO_LEYDE_NARANJA_473ML.webp" },
    { id: 41, codigo: "7421600308700", nombre: "Agua Azul 500ml", precio: 15.00, imagen: "BOTE_AGUA_AZUL_500ML.webp" },
    { id: 42, codigo: "2015", nombre: "Papas (Libra)", precio: 20.00, imagen: "PAPAS_LIBRA.webp" },
    { id: 43, codigo: "1792", nombre: "Cebolla Blanca", precio: 22.00, imagen: "CEBOLLA_BLANCA.webp" },
    { id: 44, codigo: "1822", nombre: "Tomates", precio: 25.00, imagen: "TOMATES.webp" },
    { id: 45, codigo: "11163", nombre: "Platano Maduro", precio: 10.00, imagen: "PLATANO_MADURO.webp" },
    { id: 46, codigo: "1895", nombre: "Chile Dulce", precio: 12.00, imagen: "CHILE_DULCE.webp" },
    { id: 47, codigo: "1177", nombre: "Achote", precio: 5.00, imagen: "ACHOTE.webp" },
    { id: 48, codigo: "1898", nombre: "Aguacates", precio: 20.00, imagen: "AGUACATE.webp" },
    { id: 49, codigo: "413", nombre: "Ajos Frescos", precio: 5.00, imagen: "AJO.webp" },
    { id: 50, codigo: "2507", nombre: "Apio", precio: 3.00, imagen: "APIO.webp" },
    { id: 51, codigo: "1176", nombre: "Cebolla Roja", precio: 25.00, imagen: "CEBOLLA_ROJA.webp" },
    { id: 52, codigo: "2505", nombre: "Culantro Ancho", precio: 7.00, imagen: "CULANTRO_ANCHO.webp" },
    { id: 53, codigo: "2506", nombre: "Culantro Fino", precio: 16.00, imagen: "CULANTRO_FINO.webp" },
    { id: 54, codigo: "1891", nombre: "Guineos Verdes", precio: 2.50, imagen: "GUINEOS_VERDES.webp" },
    { id: 55, codigo: "5561", nombre: "Jalapeño Entero", precio: 22.00, imagen: "JALAPEÑO_ENTERO.webp" },
    { id: 56, codigo: "00011", nombre: "Limon por Unidad", precio: 3.00, imagen: "LIMON.webp" },
    { id: 57, codigo: "2059", nombre: "Patastes", precio: 18.00, imagen: "PATASTE.webp" },
    { id: 58, codigo: "2001", nombre: "Pepino", precio: 12.00, imagen: "PEPINO.webp" },
    { id: 59, codigo: "639", nombre: "Platano Verde", precio: 10.00, imagen: "PLATANO_VERDE.webp" },
    { id: 60, codigo: "2000", nombre: "Repollo", precio: 12.00, imagen: "REPOLLO.webp" },
    { id: 61, codigo: "832123", nombre: "Zanahoria", precio: 18.00, imagen: "ZANAHORIA.webp" },
    { id: 67, codigo: "7421600303828", nombre: "ADRENALINA RUSH GRANDE", precio: 50.00, imagen: "ADRENALINA_RUSH_GRANDE.webp" },
    { id: 68, codigo: "611594000033", nombre: "AGUA DE LITRO", precio: 25.00, imagen: "Agua_Azul_Litro_750ML.webp" },
    { id: 69, codigo: "7422540016564", nombre: "ALOE VERA LEYDE", precio: 35.00, imagen: "ALOE_VERA_LEYDE.webp" },
    { id: 70, codigo: "8", nombre: "AMP ENERGY", precio: 25.00, imagen: "AMP_ENERGY.webp" },
    { id: 71, codigo: "1348", nombre: "BANANA 2L", precio: 58.00, imagen: "BANANA_2L.webp" },
    { id: 72, codigo: "7422110100570", nombre: "BANANA 3L", precio: 68.00, imagen: "BANANA_3L.webp" },
    { id: 73, codigo: "1179", nombre: "BANANA TROPICAL RETORNABLE", precio: 15.00, imagen: "BANANA_TROPICAL_RETORNABLE.webp" },
    { id: 74, codigo: "655656", nombre: "BOTE DE AGUA 2 LITROS", precio: 28.00, imagen: "BOTE_DE_AGUA_L2.webp" },
    { id: 75, codigo: "408", nombre: "BOTE DE AGUA AZUL 750ML", precio: 20.00, imagen: "BOTE_DE_AGUA_AZUL_750ML.webp" },
    { id: 76, codigo: "407", nombre: "BOTELLA DE AGUA PEQUEÑA", precio: 10.00, imagen: "BOTELLA_DE_AGUA_PEQUENA.webp" },
    { id: 77, codigo: "08", nombre: "CANADA DRY LATA", precio: 25.00, imagen: "CANADA_DRY_LATA.webp" },
    { id: 78, codigo: "0016", nombre: "CANADADRY PERSONAL", precio: 25.00, imagen: "CANADADRY_PERSONAL.webp" },
    { id: 79, codigo: "7445072002942", nombre: "CIFRUT DE NARANJA", precio: 16.00, imagen: "CIFRUT_DE_NARANJA.webp" },
    { id: 80, codigo: "409", nombre: "COCACOLA 1.1", precio: 35.00, imagen: "COCACOLA_1.1_LITROS.webp" },
    { id: 81, codigo: "402", nombre: "COCACOLA 1.5 LITROS", precio: 40.00, imagen: "COCACOLA_1.5_LITROS.webp" },
    { id: 82, codigo: "1180", nombre: "COCACOLA 2LTS", precio: 60.00, imagen: "COCACOLA_2L.webp" },
    { id: 83, codigo: "7411001800231", nombre: "COCACOLA 354ML", precio: 25.00, imagen: "COCACOLA_354ML.webp" },
    { id: 84, codigo: "401", nombre: "COCACOLA PERSONAL", precio: 25.00, imagen: "COCACOLA_PERSONAL.webp" },
    { id: 85, codigo: "1178", nombre: "COCACOLA RETORNABLE", precio: 15.00, imagen: "COCACOLA_RETORNABLE.webp" },
    { id: 86, codigo: "1350", nombre: "FRESCA 2L", precio: 58.00, imagen: "FRESCA_2L.webp" },
    { id: 87, codigo: "7422110105582", nombre: "FRESCA 3 LITROS", precio: 68.00, imagen: "FRESCA_3_LITROS.webp" },
    { id: 88, codigo: "07", nombre: "FRESCA 500ML", precio: 25.00, imagen: "FRESCA_500ML.webp" },
    { id: 89, codigo: "1784", nombre: "FRUVITA MELOCOTON", precio: 8.00, imagen: "FRUVITA_MELOCOTON.webp" },
    { id: 90, codigo: "1164", nombre: "FURY", precio: 25.00, imagen: "FURY.webp" },
    { id: 91, codigo: "656", nombre: "GATORADE 20 OZ UVA", precio: 38.00, imagen: "GATORADE_UVA.webp" },
    { id: 92, codigo: "1791", nombre: "GATORADE DE MELON", precio: 35.00, imagen: "GATORADE_MELON.webp" },
    { id: 93, codigo: "1817", nombre: "GATORADE FRESA", precio: 35.00, imagen: "GATORADE_FRESA.webp" },
    { id: 94, codigo: "280", nombre: "GRAN BERRY DEL MONTE ARANDANO", precio: 50.00, imagen: "GRAN_BERRY_DEL_MONTE_ARANDANO.webp" },
    { id: 95, codigo: "01", nombre: "JUGO DE NARANJA AGRIA LEYDE", precio: 25.00, imagen: "JUGO_DE_NARANJA_AGRIA_LEYDE.webp" },
    { id: 96, codigo: "781", nombre: "JUGO DE NARANJA CON ZANAHORIA LEYDE", precio: 25.00, imagen: "JUGO_NARANJA_CON_ZANAHORIA_LEYDE.webp" },
    { id: 97, codigo: "406", nombre: "JUGO DE NARANJA LEIDY LITRO", precio: 34.00, imagen: "JUGO_DE_NARANJA_LEIDY_LITRO.webp" },
    { id: 98, codigo: "7421000851974", nombre: "JUGO FRISTY DE NARANJA", precio: 55.00, imagen: "JUGO_FRISTY_DE_NARANJA.webp" },
    { id: 99, codigo: "7421000841036", nombre: "JUGO FRISTY MEDIO GALON VERDE", precio: 34.00, imagen: "JUGO_FRISTY_MEDIO_GALON_VERDE.webp" },
    { id: 100, codigo: "7421000841029", nombre: "JUGO FRISTY MIX DE FRUTA", precio: 50.00, imagen: "JUGO FRISTY MIX DE FRUTA.webp" },
    { id: 101, codigo: "09", nombre: "JUGO LEYDE NARANJA 473 ML", precio: 17.00, imagen: "JUGO_LEYDE_NARANJA_473_ML.webp" },
    { id: 102, codigo: "7422540018766", nombre: "LIMONADA ROSA LEYDE", precio: 25.00, imagen: "LIMONADA_ROSA_LEYDE.webp" },
    { id: 103, codigo: "0011", nombre: "MARINERO PICANTE", precio: 16.00, imagen: "MARINERO_PICANTE.webp" },
    { id: 104, codigo: "1352", nombre: "MARINERO SIN PICAR", precio: 16.00, imagen: "MARINERO_SIN_PICAR.webp" },
    { id: 105, codigo: "400", nombre: "MIRINDA DE UVA", precio: 25.00, imagen: "MIRINDA_DE_UVA.webp" },
    { id: 106, codigo: "081537200750", nombre: "NATURAS DE PERA", precio: 15.00, imagen: "NATURAS_DE_PERA.webp" },
    { id: 107, codigo: "1347", nombre: "NATURAS MANZANA", precio: 16.00, imagen: "NATURAS_MANZANA.webp" },
    { id: 108, codigo: "0010", nombre: "NATURAS MELOCOTON 330ML", precio: 15.00, imagen: "NATURAS_MELOCOTON.webp" },
    { id: 109, codigo: "404", nombre: "PEPSI 3 LITROS", precio: 70.00, imagen: "PEPSI_3_LITROS.webp" },
    { id: 110, codigo: "11346", nombre: "PEPSI PERSONAL", precio: 25.00, imagen: "PEPSI_PERSONAL.webp" },
    { id: 111, codigo: "081537200743", nombre: "PIÑA NATURAS", precio: 15.00, imagen: "PINA_NATURAS.webp" },
    { id: 112, codigo: "999", nombre: "RETORNABLE PEPSI 354 ML", precio: 15.00, imagen: "RETORNABLE_PEPSI_354_ML.webp" },
    { id: 113, codigo: "784562012502", nombre: "SPRITE 2 LITROS", precio: 58.00, imagen: "SPRITE_2_LITROS.webp" },
    { id: 114, codigo: "784562012359", nombre: "SPRITE 500ML", precio: 25.00, imagen: "SPRITE_500ML.webp" },
    { id: 115, codigo: "7422540018728", nombre: "TE FRIO LEYDE", precio: 25.00, imagen: "TE_FRIO_LEYDE.webp" },
    { id: 116, codigo: "06", nombre: "TROPICAL BANANA 500ML", precio: 25.00, imagen: "TROPICAL_BANANA_500ML.webp" },
    { id: 117, codigo: "7422110107098", nombre: "TROPICAL NARANJA", precio: 25.00, imagen: "TROPICAL_NARANJA.webp" },
    { id: 118, codigo: "7422110107135", nombre: "TROPICAL NARANJA 2L", precio: 58.00, imagen: "TROPICAL_NARANJA_2L.webp" },
    { id: 119, codigo: "784562014353", nombre: "TROPICAL UVA PERSONAL", precio: 25.00, imagen: "TROPICAL_UVA_PERSONAL.webp" },
    { id: 120, codigo: "7422110100938", nombre: "UVA TROPICAL 3LITROS", precio: 68.00, imagen: "UVA_TROPICAL_3LITROS.webp" },
    { id: 121, codigo: "1783", nombre: "UVA TROPICAL 2L", precio: 58.00, imagen: "UVA_TROPICAL_2L.webp" },
    { id: 122, codigo: "7445072001501", nombre: "VOLT ENERGY", precio: 16.00, imagen: "VOLT_ENERGY.webp" },
    { id: 123, codigo: "05", nombre: "WELCHS UVA ROJA", precio: 100.00, imagen: "WELCHS_UVA_ROJA.webp" },
    { id: 124, codigo: "661", nombre: "WELCHS VINO VERDE", precio: 100.00, imagen: "WELCHS_VINO_VERDE.webp" }
];

// Helper para inferir categoría basada en el nombre
function inferCategory(name) {
    name = (name || '').toLowerCase();
    if (name.includes('papa') || name.includes('cebolla') || name.includes('tomate') || name.includes('platano') || name.includes('chile') || name.includes('achote') || name.includes('aguacate') || name.includes('ajos') || name.includes('apio') || name.includes('culantro') || name.includes('guineo') || name.includes('jalapeño') || (name.includes('limon') && !name.includes('limonada')) || name.includes('pataste') || name.includes('pepino') || name.includes('repollo') || (name.includes('zanahoria') && !name.includes('jugo'))) return 'Verduras';
    if (name.includes('aceite') || name.includes('manteca')) return 'Aceites y Grasas';
    if (name.includes('azucar') || name.includes('cafe')) return 'Abarrotes';
    if (name.includes('avena') || name.includes('espagueti') || name.includes('maseca') || name.includes('sopa')) return 'Granos y Pastas';
    if (name.includes('salsa') || name.includes('mayonesa') || name.includes('vinagre')) return 'Salsas y Aderezos';
    if (name.includes('carne') || name.includes('pollo') || name.includes('cerdo') || name.includes('jamon') || name.includes('chorizo') || name.includes('hot dog') || name.includes('mortadela')) return 'Carnes y Embutidos';
    if (name.includes('jabon') || name.includes('pasta') || name.includes('papel') || name.includes('detergente') || name.includes('suavitel') || name.includes('cloro')) return 'Higiene y Limpieza';
    if (name.includes('coca') || name.includes('adrenalina') || name.includes('jugo') || name.includes('agua') || name.includes('pepsi') || name.includes('sprite') || name.includes('fresca') || name.includes('tropical') || name.includes('gatorade') || name.includes('naturas') || name.includes('welchs') || name.includes('volt') || name.includes('tea') || name.includes('te ') || name.includes('canada') || name.includes('cifrut') || name.includes('mirinda') || name.includes('fury') || name.includes('marinero') || name.includes('banana') || name.includes('aloe') || name.includes('amp') || name.includes('berry') || name.includes('limonada') || name.includes('fruvita')) return 'Bebidas';
    return 'Otros';
}

// ==========================================
// 2. ESTADO GLOBAL DE LA APLICACIÓN
// ==========================================
let products = [];
let cart = [];
let salesHistory = [];
let activeCategory = 'all';
let isServerConnected = false;
let availablePhotos = [];

// Estado del formulario de producto
let currentPhotoDataUrl = null;
let currentPhotoFileName = null;
let productToDelete = null;

// ==========================================
// 3. ELEMENTOS DEL DOM
// ==========================================
const productsGrid = document.getElementById('productsGrid');
const cartItemsContainer = document.getElementById('cartItems');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const categoriesContainer = document.getElementById('categoriesContainer');
const barcodeInput = document.getElementById('barcodeInput');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const salesBtn = document.getElementById('salesBtn');
const sidebarManageBtn = document.getElementById('sidebarManageBtn');
const openAddProductBtn = document.getElementById('openAddProductBtn');
const openManageProductsBtn = document.getElementById('openManageProductsBtn');
const systemStatusBadge = document.getElementById('systemStatusBadge');
const statusBadgeText = document.getElementById('statusBadgeText');

// Modales
const productModal = document.getElementById('productModal');
const closeProductModal = document.getElementById('closeProductModal');
const cancelProductBtn = document.getElementById('cancelProductBtn');
const modalProductTitle = document.getElementById('modalProductTitle');
const saveBtnText = document.getElementById('saveBtnText');
const productForm = document.getElementById('productForm');

// Campos de formulario
const formProductId = document.getElementById('formProductId');
const formProdName = document.getElementById('formProdName');
const formProdCode = document.getElementById('formProdCode');
const btnGenCode = document.getElementById('btnGenCode');
const formProdPrice = document.getElementById('formProdPrice');
const formProdStock = document.getElementById('formProdStock');
const formProdCategory = document.getElementById('formProdCategory');
const customCategoryGroup = document.getElementById('customCategoryGroup');
const formCustomCategory = document.getElementById('formCustomCategory');

// Subida de fotos
const photoDropzone = document.getElementById('photoDropzone');
const formProdImageFile = document.getElementById('formProdImageFile');
const dropzoneEmpty = document.getElementById('dropzoneEmpty');
const dropzonePreview = document.getElementById('dropzonePreview');
const previewImageTag = document.getElementById('previewImageTag');
const previewImageName = document.getElementById('previewImageName');
const removePhotoBtn = document.getElementById('removePhotoBtn');
const changePhotoBtn = document.getElementById('changePhotoBtn');

// Fotos existentes en servidor
const toggleExistingPhotoSec = document.getElementById('toggleExistingPhotoSec');
const existingPhotoArrow = document.getElementById('existingPhotoArrow');
const existingPhotoContent = document.getElementById('existingPhotoContent');
const existingPhotoFilter = document.getElementById('existingPhotoFilter');
const existingPhotosGrid = document.getElementById('existingPhotosGrid');

// Modal CRUD Management Table
const manageProductsModal = document.getElementById('manageProductsModal');
const closeManageModal = document.getElementById('closeManageModal');
const crudSearchInput = document.getElementById('crudSearchInput');
const crudCategoryFilter = document.getElementById('crudCategoryFilter');
const crudAddNewBtn = document.getElementById('crudAddNewBtn');
const crudExportBtn = document.getElementById('crudExportBtn');
const crudFilteredCount = document.getElementById('crudFilteredCount');
const crudTotalCount = document.getElementById('crudTotalCount');
const crudTableBody = document.getElementById('crudTableBody');
const crudServerSyncText = document.getElementById('crudServerSyncText');

// Confirm Modal
const deleteConfirmModal = document.getElementById('deleteConfirmModal');
const deleteProdName = document.getElementById('deleteProdName');
const deleteProdCode = document.getElementById('deleteProdCode');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

// Sales Modal
const salesModal = document.getElementById('salesModal');
const closeSalesModal = document.getElementById('closeSalesModal');
const salesList = document.getElementById('salesList');
const dailyTotalEl = document.getElementById('dailyTotal');

// Export Modal
const exportModal = document.getElementById('exportModal');
const closeExportModal = document.getElementById('closeExportModal');
const exportSqlBtn = document.getElementById('exportSqlBtn');
const exportJsonBtn = document.getElementById('exportJsonBtn');

// Toasts
const toastContainer = document.getElementById('toastContainer');

// ==========================================
// 4. HELPER DE IMÁGENES
// ==========================================
function getImageSrc(img) {
    if (!img) return null;
    if (img.startsWith('data:') || img.startsWith('blob:') || img.startsWith('http://') || img.startsWith('https://')) {
        return img;
    }
    return `photo/${img}`;
}

/**
 * Optimiza y redimensiona una imagen con HTML5 Canvas
 * Convierte fotos pesadas (5MB+) en ligeras (~30-50KB) WebP para carga instantánea
 */
function processImageFile(file, maxWidth = 550, maxHeight = 550, quality = 0.85) {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            return reject(new Error('El archivo seleccionado no es una imagen válida'));
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Exportar como webp o jpeg según compatibilidad
                let dataUrl = canvas.toDataURL('image/webp', quality);
                if (!dataUrl.startsWith('data:image/webp')) {
                    dataUrl = canvas.toDataURL('image/jpeg', quality);
                }

                resolve({
                    dataUrl,
                    originalName: file.name,
                    size: Math.round(dataUrl.length * 0.75) // tamaño aproximado en bytes
                });
            };
            img.onerror = () => reject(new Error('No se pudo decodificar la imagen'));
            img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error('Error al leer el archivo'));
        reader.readAsDataURL(file);
    });
}

// ==========================================
// 5. TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ri-check-line';
    if (type === 'error') icon = 'ri-error-warning-line';
    if (type === 'info') icon = 'ri-information-line';

    toast.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// ==========================================
// 6. INICIALIZACIÓN Y SINCRONIZACIÓN
// ==========================================
async function init() {
    setupEventListeners();
    await checkServerConnectionAndLoadData();
    renderCategories();
    renderProducts();
    renderCart();
    loadSalesFromStorage();
}

/**
 * Detecta si el servidor Node.js está disponible
 * Si está activo: carga productos de /api/productos y lista fotos de /api/photos
 * Si no está activo: usa LocalStorage / datos por defecto
 */
async function checkServerConnectionAndLoadData() {
    const isHttp = window.location.protocol.startsWith('http');

    if (isHttp) {
        try {
            const statusRes = await fetch('/api/status', { cache: 'no-cache' });
            if (statusRes.ok) {
                isServerConnected = true;
                setSystemStatus(true);

                // Cargar productos del servidor
                const prodRes = await fetch('/api/productos');
                if (prodRes.ok) {
                    const serverProds = await prodRes.json();
                    if (Array.isArray(serverProds) && serverProds.length > 0) {
                        products = serverProds.map(p => ({
                            ...p,
                            category: p.category || inferCategory(p.nombre)
                        }));
                        saveToLocalStorageBackup();
                    }
                }

                // Cargar lista de fotos del servidor
                loadServerPhotos();
                return;
            }
        } catch (e) {
            console.log('Servidor local no detectado, usando almacenamiento local.');
        }
    }

    // Modo local / archivo estático
    isServerConnected = false;
    setSystemStatus(false);
    loadProductsFromLocalStorage();
}

function setSystemStatus(connected) {
    if (connected) {
        systemStatusBadge.className = 'status-badge status-server';
        systemStatusBadge.title = 'Conectado a Node.js: las fotos se guardan en la carpeta photo/';
        statusBadgeText.textContent = 'Servidor (photo/)';
        if (crudServerSyncText) {
            crudServerSyncText.innerHTML = '<i class="ri-shield-check-line"></i> Servidor Conectado';
            crudServerSyncText.style.color = 'var(--success)';
        }
    } else {
        systemStatusBadge.className = 'status-badge status-local';
        systemStatusBadge.title = 'Modo Local (Navegador). Para guardar fotos físicamente en photo/, ejecuta: node server.js';
        statusBadgeText.textContent = 'Modo Local';
        if (crudServerSyncText) {
            crudServerSyncText.innerHTML = '<i class="ri-hard-drive-line"></i> Almacenamiento Local';
            crudServerSyncText.style.color = 'var(--text-muted)';
        }
    }
}

async function loadServerPhotos() {
    try {
        const res = await fetch('/api/photos');
        if (res.ok) {
            availablePhotos = await res.json();
            renderExistingPhotosGrid();
        }
    } catch (e) {
        console.warn('No se pudo cargar /api/photos:', e);
    }
}

function loadProductsFromLocalStorage() {
    const saved = localStorage.getItem('supermarket_pos_products');
    if (saved) {
        try {
            products = JSON.parse(saved);
            return;
        } catch (e) {
            console.error('Error al analizar productos en localStorage', e);
        }
    }

    // Carga inicial basada en productsInput
    products = productsInput.map(p => ({
        ...p,
        stock_actual: p.stock_actual !== undefined ? p.stock_actual : 100,
        stock_minimo: p.stock_minimo !== undefined ? p.stock_minimo : 10,
        category: p.category || inferCategory(p.nombre)
    }));
    saveToLocalStorageBackup();
}

function saveToLocalStorageBackup() {
    try {
        localStorage.setItem('supermarket_pos_products', JSON.stringify(products));
    } catch (err) {
        console.warn('Error al guardar en LocalStorage (posible límite excedido):', err);
    }
}

// ==========================================
// 7. RENDERIZADO: CATÁLOGO Y TARJETAS
// ==========================================
function renderCategories() {
    const rawCategories = ['all', ...new Set(products.map(p => p.category || 'Otros'))];
    categoriesContainer.innerHTML = '';

    rawCategories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `category-pill ${cat === activeCategory ? 'active' : ''}`;
        btn.textContent = cat === 'all' ? 'Todos' : cat;
        btn.dataset.category = cat;

        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = cat;
            renderProducts();
        });

        categoriesContainer.appendChild(btn);
    });

    populateCategoryDropdowns();
}

function populateCategoryDropdowns() {
    const categories = [...new Set(products.map(p => p.category || 'Otros'))].sort();

    // Formulario de producto
    const currentSelected = formProdCategory.value;
    formProdCategory.innerHTML = '';
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        formProdCategory.appendChild(opt);
    });
    // Opción para añadir nueva categoría
    const newOpt = document.createElement('option');
    newOpt.value = '__new__';
    newOpt.textContent = '➕ + Nueva categoría...';
    formProdCategory.appendChild(newOpt);

    if (currentSelected && categories.includes(currentSelected)) {
        formProdCategory.value = currentSelected;
    }

    // Filtro de la tabla CRUD
    const currentCrudFilter = crudCategoryFilter.value;
    crudCategoryFilter.innerHTML = '<option value="all">Todas las Categorías</option>';
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        crudCategoryFilter.appendChild(opt);
    });
    if (currentCrudFilter) {
        crudCategoryFilter.value = currentCrudFilter;
    }
}

function renderProducts() {
    productsGrid.innerHTML = '';

    const searchTerm = (searchInput.value || '').trim().toLowerCase();
    clearSearchBtn.style.display = searchTerm ? 'flex' : 'none';

    const filtered = products.filter(p => {
        const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
        const matchesSearch = p.nombre.toLowerCase().includes(searchTerm) || String(p.codigo).includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                <i class="ri-inbox-line" style="font-size: 3.5rem; display: block; margin-bottom: 0.5rem; opacity: 0.4;"></i>
                <h3 style="font-size: 1.2rem; color: var(--text-main); margin-bottom: 0.25rem;">No se encontraron productos</h3>
                <p>Intenta con otro término de búsqueda o añade un nuevo producto al catálogo.</p>
                <button class="btn btn-primary" style="margin: 1rem auto 0;" onclick="openProductModalForCreate()">
                    <i class="ri-add-line"></i> Añadir Nuevo Producto
                </button>
            </div>
        `;
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => addToCart(product.id);

        const acronym = product.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        const imgSrc = getImageSrc(product.imagen);

        const imageHTML = imgSrc
            ? `<div class="product-image-container">
                   <img src="${imgSrc}" alt="${product.nombre}" class="product-image" onerror="this.parentElement.innerHTML='<div class=\\'product-image-placeholder\\'>${acronym}</div>'">
               </div>`
            : `<div class="product-image-container">
                   <div class="product-image-placeholder">${acronym}</div>
               </div>`;

        const stock = product.stock_actual !== undefined ? product.stock_actual : 100;
        const isLow = stock <= 10;

        card.innerHTML = `
            <div class="card-actions-overlay">
                <button class="card-action-icon-btn edit-btn" title="Editar producto" onclick="event.stopPropagation(); openProductModalForEdit(${product.id})">
                    <i class="ri-edit-2-line"></i>
                </button>
                <button class="card-action-icon-btn delete-btn" title="Eliminar producto" onclick="event.stopPropagation(); promptDeleteProduct(${product.id})">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>

            ${imageHTML}

            <div class="product-info">
                <h3 title="${product.nombre}">${product.nombre}</h3>
                <div class="code-and-stock">
                    <span>Cód: ${product.codigo}</span>
                    <span class="stock-badge ${isLow ? 'low' : ''}">${stock} en stock</span>
                </div>
            </div>

            <div class="product-footer">
                <div class="price">L. ${Number(product.precio).toFixed(2)}</div>
                <div class="add-btn-icon" title="Agregar al carrito">
                    <i class="ri-add-line"></i>
                </div>
            </div>
        `;

        productsGrid.appendChild(card);
    });
}

// ==========================================
// 8. CRUD: FORMULARIO DE AÑADIR / EDITAR
// ==========================================
function openProductModalForCreate() {
    formProductId.value = '';
    modalProductTitle.innerHTML = '<i class="ri-add-box-line"></i> Añadir Nuevo Producto';
    saveBtnText.textContent = 'Guardar Producto';

    // Limpiar campos
    formProdName.value = '';
    formProdCode.value = '';
    formProdPrice.value = '';
    formProdStock.value = '100';

    if (activeCategory !== 'all') {
        formProdCategory.value = activeCategory;
    } else {
        formProdCategory.selectedIndex = 0;
    }

    customCategoryGroup.style.display = 'none';
    formCustomCategory.value = '';

    // Limpiar foto
    resetPhotoUpload();

    productModal.style.display = 'block';
    formProdName.focus();
}

function openProductModalForEdit(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    formProductId.value = product.id;
    modalProductTitle.innerHTML = '<i class="ri-edit-2-line"></i> Editar Producto';
    saveBtnText.textContent = 'Actualizar Producto';

    formProdName.value = product.nombre;
    formProdCode.value = product.codigo;
    formProdPrice.value = product.precio;
    formProdStock.value = product.stock_actual !== undefined ? product.stock_actual : 100;

    // Categoría
    if ([...formProdCategory.options].some(o => o.value === product.category)) {
        formProdCategory.value = product.category;
        customCategoryGroup.style.display = 'none';
    } else {
        formProdCategory.value = '__new__';
        customCategoryGroup.style.display = 'block';
        formCustomCategory.value = product.category || '';
    }

    // Foto actual
    resetPhotoUpload();
    if (product.imagen) {
        currentPhotoFileName = product.imagen;
        currentPhotoDataUrl = getImageSrc(product.imagen);
        setPhotoPreview(currentPhotoDataUrl, product.imagen);
    }

    productModal.style.display = 'block';
    formProdName.focus();
}

function closeProductModalHandler() {
    productModal.style.display = 'none';
    resetPhotoUpload();
}

function resetPhotoUpload() {
    currentPhotoDataUrl = null;
    currentPhotoFileName = null;
    formProdImageFile.value = '';
    dropzoneEmpty.style.display = 'block';
    dropzonePreview.style.display = 'none';
    previewImageTag.src = '';
    previewImageName.textContent = '';
    document.querySelectorAll('.existing-photo-item').forEach(el => el.classList.remove('selected'));
}

function setPhotoPreview(src, name) {
    previewImageTag.src = src;
    previewImageName.textContent = name || 'Foto seleccionada';
    dropzoneEmpty.style.display = 'none';
    dropzonePreview.style.display = 'flex';
}

// Generador de código aleatorio de barras
function generateUniqueCode() {
    const randomCode = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    formProdCode.value = randomCode;
    showToast('Código de barras generado', 'info');
}

// Procesar foto seleccionada o arrastrada
async function handleFileSelect(file) {
    if (!file) return;
    try {
        const result = await processImageFile(file);
        currentPhotoDataUrl = result.dataUrl;
        currentPhotoFileName = result.originalName;
        setPhotoPreview(result.dataUrl, result.originalName);
        showToast('Foto cargada y optimizada', 'info');
    } catch (err) {
        showToast(err.message || 'Error al procesar la foto', 'error');
    }
}

// Subir foto físicamente al servidor photo/ si está conectado
async function uploadPhotoToServer(dataUrl, productName, filename) {
    if (!isServerConnected) return null;
    try {
        const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dataUrl,
                productName,
                filename
            })
        });
        if (res.ok) {
            const data = await res.json();
            return data.filename;
        }
    } catch (err) {
        console.warn('Error subiendo foto al servidor:', err);
    }
    return null;
}

// Guardar producto (Crear o Actualizar)
async function handleSaveProduct(e) {
    e.preventDefault();

    const name = formProdName.value.trim();
    const code = formProdCode.value.trim();
    const price = parseFloat(formProdPrice.value);
    const stock = parseInt(formProdStock.value, 10) || 0;
    const isEdit = Boolean(formProductId.value);
    const editId = isEdit ? parseInt(formProductId.value, 10) : null;

    if (!name || !code || isNaN(price) || price < 0) {
        showToast('Por favor completa todos los campos requeridos correctamente', 'error');
        return;
    }

    // Validar código duplicado
    const codeConflict = products.find(p => String(p.codigo).trim() === code && (!isEdit || p.id !== editId));
    if (codeConflict) {
        showToast(`El código "${code}" ya está registrado en el producto: ${codeConflict.nombre}`, 'error');
        formProdCode.focus();
        return;
    }

    // Categoría
    let category = formProdCategory.value;
    if (category === '__new__') {
        category = formCustomCategory.value.trim();
        if (!category) {
            showToast('Por favor escribe el nombre de la nueva categoría', 'error');
            formCustomCategory.focus();
            return;
        }
    }

    // Gestionar foto
    let finalImage = currentPhotoFileName || null;

    // Si tenemos una nueva foto cargada en Base64
    if (currentPhotoDataUrl && currentPhotoDataUrl.startsWith('data:')) {
        if (isServerConnected) {
            // Guardar físicamente en photo/
            const uploadedFilename = await uploadPhotoToServer(currentPhotoDataUrl, name, currentPhotoFileName);
            if (uploadedFilename) {
                finalImage = uploadedFilename;
            } else {
                // Fallback a Base64 si falla la subida
                finalImage = currentPhotoDataUrl;
            }
        } else {
            // Modo local: guardamos el Base64 optimizado
            finalImage = currentPhotoDataUrl;
        }
    }

    const productPayload = {
        nombre: name,
        codigo: code,
        precio: price,
        stock_actual: stock,
        stock_minimo: 10,
        category: category,
        imagen: finalImage
    };

    if (isEdit) {
        // ACTUALIZAR
        if (isServerConnected) {
            try {
                const res = await fetch(`/api/productos/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productPayload)
                });
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || 'Error al actualizar');
                }
                const updated = await res.json();
                const index = products.findIndex(p => p.id === editId);
                if (index !== -1) products[index] = updated;
            } catch (err) {
                showToast(err.message, 'error');
                return;
            }
        } else {
            const index = products.findIndex(p => p.id === editId);
            if (index !== -1) {
                products[index] = { ...products[index], ...productPayload };
            }
        }

        // Actualizar carrito si contiene este producto
        const cartItem = cart.find(item => item.product_id === editId);
        if (cartItem) {
            cartItem.nombre = name;
            cartItem.precio = price;
            renderCart();
        }

        showToast(`Producto "${name}" actualizado con éxito`);
    } else {
        // CREAR
        if (isServerConnected) {
            try {
                const res = await fetch('/api/productos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productPayload)
                });
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || 'Error al guardar');
                }
                const created = await res.json();
                products.push(created);
            } catch (err) {
                showToast(err.message, 'error');
                return;
            }
        } else {
            const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
            const newProduct = {
                id: maxId + 1,
                ...productPayload
            };
            products.push(newProduct);
        }

        showToast(`¡Producto "${name}" añadido con éxito!`);
    }

    saveToLocalStorageBackup();
    closeProductModalHandler();
    renderCategories();
    renderProducts();
    if (manageProductsModal.style.display === 'block') {
        renderCrudTable();
    }
}

// ==========================================
// 9. CRUD: ELIMINACIÓN DE PRODUCTO
// ==========================================
function promptDeleteProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    productToDelete = product;
    deleteProdName.textContent = product.nombre;
    deleteProdCode.textContent = product.codigo;
    deleteConfirmModal.style.display = 'block';
}

async function handleConfirmDelete() {
    if (!productToDelete) return;
    const id = productToDelete.id;
    const name = productToDelete.nombre;

    if (isServerConnected) {
        try {
            const res = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Error al eliminar');
            }
        } catch (err) {
            showToast(err.message, 'error');
            return;
        }
    }

    products = products.filter(p => p.id !== id);
    removeFromCart(id);
    saveToLocalStorageBackup();

    deleteConfirmModal.style.display = 'none';
    productToDelete = null;

    showToast(`Producto "${name}" eliminado`, 'info');
    renderCategories();
    renderProducts();
    if (manageProductsModal.style.display === 'block') {
        renderCrudTable();
    }
}

// ==========================================
// 10. CRUD: TABLA DE GESTIÓN (MODAL XL)
// ==========================================
function openManageModalHandler() {
    crudSearchInput.value = '';
    crudCategoryFilter.value = 'all';
    renderCrudTable();
    manageProductsModal.style.display = 'block';
    crudSearchInput.focus();
}

function renderCrudTable() {
    crudTableBody.innerHTML = '';

    const searchTerm = (crudSearchInput.value || '').trim().toLowerCase();
    const catFilter = crudCategoryFilter.value;

    const filtered = products.filter(p => {
        const matchesCategory = catFilter === 'all' || p.category === catFilter;
        const matchesSearch = p.nombre.toLowerCase().includes(searchTerm) || String(p.codigo).includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    crudTotalCount.textContent = products.length;
    crudFilteredCount.textContent = filtered.length;

    if (filtered.length === 0) {
        crudTableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                    <i class="ri-file-search-line" style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem; opacity: 0.4;"></i>
                    No se encontraron productos coincidentes
                </td>
            </tr>
        `;
        return;
    }

    filtered.forEach(product => {
        const tr = document.createElement('tr');
        const acronym = product.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        const imgSrc = getImageSrc(product.imagen);

        const imgHTML = imgSrc
            ? `<div class="table-thumb">
                   <img src="${imgSrc}" alt="${product.nombre}" onerror="this.parentElement.innerHTML='<span class=\\'table-thumb-placeholder\\'>${acronym}</span>'">
               </div>`
            : `<div class="table-thumb">
                   <span class="table-thumb-placeholder">${acronym}</span>
               </div>`;

        const stock = product.stock_actual !== undefined ? product.stock_actual : 100;
        const isLow = stock <= 10;

        tr.innerHTML = `
            <td style="text-align: center;">${imgHTML}</td>
            <td><code>${product.codigo}</code></td>
            <td><strong>${product.nombre}</strong></td>
            <td><span class="cat-badge">${product.category || 'Otros'}</span></td>
            <td style="text-align: right;" class="table-price">L. ${Number(product.precio).toFixed(2)}</td>
            <td style="text-align: center;">
                <span class="table-stock-badge ${isLow ? 'low' : ''}">${stock}</span>
            </td>
            <td>
                <div class="table-actions-cell">
                    <button class="btn-table-action edit" title="Editar producto" onclick="openProductModalForEdit(${product.id})">
                        <i class="ri-edit-2-line"></i>
                    </button>
                    <button class="btn-table-action delete" title="Eliminar producto" onclick="promptDeleteProduct(${product.id})">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </td>
        `;

        crudTableBody.appendChild(tr);
    });
}

function renderExistingPhotosGrid() {
    if (!existingPhotosGrid) return;
    existingPhotosGrid.innerHTML = '';

    const filter = (existingPhotoFilter ? existingPhotoFilter.value : '').toLowerCase();
    const filteredPhotos = availablePhotos.filter(f => f.toLowerCase().includes(filter));

    if (filteredPhotos.length === 0) {
        existingPhotosGrid.innerHTML = '<span style="font-size: 0.75rem; color: var(--text-muted); grid-column: 1 / -1; padding: 0.5rem;">No hay fotos que coincidan</span>';
        return;
    }

    filteredPhotos.forEach(filename => {
        const item = document.createElement('div');
        item.className = `existing-photo-item ${currentPhotoFileName === filename ? 'selected' : ''}`;
        item.title = filename;
        item.innerHTML = `<img src="photo/${filename}" alt="${filename}" onerror="this.parentElement.remove()">`;

        item.onclick = () => {
            document.querySelectorAll('.existing-photo-item').forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
            currentPhotoFileName = filename;
            currentPhotoDataUrl = `photo/${filename}`;
            setPhotoPreview(`photo/${filename}`, filename);
            showToast(`Foto seleccionada: ${filename}`, 'info');
        };

        existingPhotosGrid.appendChild(item);
    });
}

// ==========================================
// 11. EXPORTACIÓN: SQL Y JSON
// ==========================================
function exportToSql() {
    let sql = `-- SuperMarket POS - Respaldo de Productos\n`;
    sql += `-- Generado: ${new Date().toLocaleString()}\n`;
    sql += `-- Total de productos: ${products.length}\n\n`;
    sql += `INSERT INTO productos (codigo, nombre, precio, stock_actual, stock_minimo) VALUES\n`;

    const values = products.map(p => {
        const safeName = p.nombre.replace(/'/g, "''");
        const safeCode = String(p.codigo).replace(/'/g, "''");
        const price = Number(p.precio).toFixed(2);
        const stock = p.stock_actual !== undefined ? p.stock_actual : 100;
        const minStock = p.stock_minimo !== undefined ? p.stock_minimo : 10;
        return `('${safeCode}', '${safeName}', ${price}, ${stock}, ${minStock})`;
    }).join(',\n');

    sql += values + `;\n`;

    downloadFile(sql, 'productos_supermarket.sql', 'text/sql');
    showToast('Archivo SQL exportado correctamente');
    exportModal.style.display = 'none';
}

function exportToJson() {
    const jsonStr = JSON.stringify(products, null, 2);
    downloadFile(jsonStr, 'productos_supermarket.json', 'application/json');
    showToast('Archivo JSON exportado correctamente');
    exportModal.style.display = 'none';
}

function downloadFile(content, fileName, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
}

// ==========================================
// 12. LÓGICA DEL CARRITO Y VENTAS
// ==========================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.product_id === productId);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({
            product_id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            qty: 1
        });
    }

    renderCart();
}

window.removeFromCart = function (productId) {
    cart = cart.filter(item => item.product_id !== productId);
    renderCart();
};

window.updateQty = function (productId, newQty) {
    const qty = parseFloat(newQty);
    if (isNaN(qty) || qty <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(i => i.product_id === productId);
    if (item) {
        item.qty = qty;
        renderCart();
    }
};

function renderCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class="ri-shopping-basket-line"></i>
                <p>Carrito vacío</p>
            </div>`;
        cartCountEl.textContent = '0';
        cartTotalEl.textContent = 'L. 0.00';
        return;
    }

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const subtotal = item.precio * item.qty;
        total += subtotal;
        count += item.qty;

        const el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `
            <div class="item-details">
                <span class="item-name">${item.nombre}</span>
                <span class="item-unit-price">L. ${item.precio.toFixed(2)}</span>
            </div>
            <div class="item-controls">
                <input type="number" class="qty-input" value="${item.qty}" min="0.01" step="0.01" onchange="updateQty(${item.product_id}, this.value)">
                <span class="item-total">L. ${subtotal.toFixed(2)}</span>
                <button class="remove-btn" onclick="removeFromCart(${item.product_id})" title="Eliminar del carrito">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(el);
    });

    cartCountEl.textContent = count;
    cartTotalEl.textContent = `L. ${total.toFixed(2)}`;
}

function handleCheckout() {
    if (cart.length === 0) {
        showToast('El carrito está vacío', 'error');
        return;
    }

    const total = cart.reduce((acc, item) => acc + (item.precio * item.qty), 0);
    const sale = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        total: total,
        items: [...cart]
    };

    salesHistory.push(sale);
    localStorage.setItem('salesHistory', JSON.stringify(salesHistory));

    showToast(`¡Venta realizada con éxito! Total: L. ${total.toFixed(2)}`);
    cart = [];
    renderCart();
}

function loadSalesFromStorage() {
    const stored = localStorage.getItem('salesHistory');
    if (stored) {
        try {
            salesHistory = JSON.parse(stored);
        } catch (e) {
            salesHistory = [];
        }
    }
}

function openSalesModal() {
    loadSalesFromStorage();
    renderSalesHistory();
    salesModal.style.display = 'block';
}

function renderSalesHistory() {
    salesList.innerHTML = '';
    let dailyTotal = 0;

    if (salesHistory.length === 0) {
        salesList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No hay ventas registradas aún.</p>';
        dailyTotalEl.textContent = 'L. 0.00';
        return;
    }

    salesHistory.slice().reverse().forEach(sale => {
        dailyTotal += sale.total;

        const div = document.createElement('div');
        div.style.borderBottom = '1px solid #f1f5f9';
        div.style.padding = '0.75rem 0';
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; font-weight:bold;">
                <span>Venta #${sale.id.toString().slice(-4)}</span>
                <span style="color: var(--primary);">L. ${sale.total.toFixed(2)}</span>
            </div>
            <div style="font-size:0.8rem; color:#666; margin-top:2px;">
                ${sale.date}
            </div>
            <div style="font-size:0.8rem; color:#888; margin-top:2px;">
                ${sale.items.length} productos vendidos
            </div>
        `;
        salesList.appendChild(div);
    });

    dailyTotalEl.textContent = `L. ${dailyTotal.toFixed(2)}`;
}

// ==========================================
// 13. EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Buscador principal
    searchInput.addEventListener('input', renderProducts);
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        renderProducts();
        searchInput.focus();
    });

    // Lector de código de barras
    barcodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const code = barcodeInput.value.trim();
            const product = products.find(p => String(p.codigo).trim() === code);

            if (product) {
                addToCart(product.id);
                barcodeInput.value = '';
                barcodeInput.style.borderColor = 'var(--success)';
                setTimeout(() => barcodeInput.style.borderColor = 'var(--border)', 500);
            } else {
                showToast(`Producto no encontrado para el código: ${code}`, 'error');
                barcodeInput.select();
            }
        }
    });

    // Botones de acción principales
    openAddProductBtn.addEventListener('click', openProductModalForCreate);
    openManageProductsBtn.addEventListener('click', openManageModalHandler);
    sidebarManageBtn.addEventListener('click', openManageModalHandler);
    checkoutBtn.addEventListener('click', handleCheckout);
    salesBtn.addEventListener('click', openSalesModal);

    // Modal de Producto
    closeProductModal.addEventListener('click', closeProductModalHandler);
    cancelProductBtn.addEventListener('click', closeProductModalHandler);
    productForm.addEventListener('submit', handleSaveProduct);
    btnGenCode.addEventListener('click', generateUniqueCode);

    // Cambio de categoría en formulario
    formProdCategory.addEventListener('change', () => {
        if (formProdCategory.value === '__new__') {
            customCategoryGroup.style.display = 'block';
            formCustomCategory.focus();
        } else {
            customCategoryGroup.style.display = 'none';
        }
    });

    // Eventos de Dropzone de fotos
    photoDropzone.addEventListener('click', (e) => {
        if (e.target.closest('#removePhotoBtn') || e.target.closest('#changePhotoBtn')) return;
        formProdImageFile.click();
    });

    formProdImageFile.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    });

    photoDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        photoDropzone.classList.add('dragover');
    });

    photoDropzone.addEventListener('dragleave', () => {
        photoDropzone.classList.remove('dragover');
    });

    photoDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        photoDropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });

    removePhotoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetPhotoUpload();
        showToast('Foto removida', 'info');
    });

    changePhotoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        formProdImageFile.click();
    });

    // Desplegable de fotos existentes
    toggleExistingPhotoSec.addEventListener('click', () => {
        const isHidden = existingPhotoContent.style.display === 'none';
        existingPhotoContent.style.display = isHidden ? 'block' : 'none';
        toggleExistingPhotoSec.classList.toggle('active', isHidden);
        if (isHidden && availablePhotos.length === 0) {
            loadServerPhotos();
        }
    });

    if (existingPhotoFilter) {
        existingPhotoFilter.addEventListener('input', renderExistingPhotosGrid);
    }

    // Modal de Gestión CRUD
    closeManageModal.addEventListener('click', () => manageProductsModal.style.display = 'none');
    crudSearchInput.addEventListener('input', renderCrudTable);
    crudCategoryFilter.addEventListener('change', renderCrudTable);
    crudAddNewBtn.addEventListener('click', () => {
        manageProductsModal.style.display = 'none';
        openProductModalForCreate();
    });
    crudExportBtn.addEventListener('click', () => exportModal.style.display = 'block');

    // Confirmación de eliminación
    cancelDeleteBtn.addEventListener('click', () => {
        deleteConfirmModal.style.display = 'none';
        productToDelete = null;
    });
    confirmDeleteBtn.addEventListener('click', handleConfirmDelete);

    // Modal de Ventas
    closeSalesModal.addEventListener('click', () => salesModal.style.display = 'none');

    // Modal de Exportación
    closeExportModal.addEventListener('click', () => exportModal.style.display = 'none');
    exportSqlBtn.addEventListener('click', exportToSql);
    exportJsonBtn.addEventListener('click', exportToJson);

    // Cerrar modales al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === productModal) closeProductModalHandler();
        if (e.target === manageProductsModal) manageProductsModal.style.display = 'none';
        if (e.target === deleteConfirmModal) {
            deleteConfirmModal.style.display = 'none';
            productToDelete = null;
        }
        if (e.target === salesModal) salesModal.style.display = 'none';
        if (e.target === exportModal) exportModal.style.display = 'none';
    });

    // Atajos de teclado: Escape para cerrar modales
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            productModal.style.display = 'none';
            manageProductsModal.style.display = 'none';
            deleteConfirmModal.style.display = 'none';
            salesModal.style.display = 'none';
            exportModal.style.display = 'none';
        }
    });
}

// Exponer funciones globales para los eventos onclick en HTML
window.openProductModalForCreate = openProductModalForCreate;
window.openProductModalForEdit = openProductModalForEdit;
window.promptDeleteProduct = promptDeleteProduct;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;

// Iniciar aplicación
document.addEventListener('DOMContentLoaded', init);
