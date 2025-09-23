// Inventario de Productos - GoodFellas
document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo del inventario
    const inventoryData = [
        {
            id: 1,
            name: "Pomada Original",
            category: "pomadas",
            stock: 45,
            minStock: 10,
            price: 150.00,
            status: "disponible",
            description: "El clásico que nunca pasa de moda",
            image: "assets/images/original140gWEB-2697956.webp"
        },
        {
            id: 2,
            name: "Pomada Textura",
            category: "pomadas",
            stock: 8,
            minStock: 10,
            price: 150.00,
            status: "bajo-stock",
            description: "Acabado natural con volumen",
            image: "assets/images/t4extura140gWEB-2697856.webp"
        },
        {
            id: 3,
            name: "Pomada Strong",
            category: "pomadas",
            stock: 0,
            minStock: 10,
            price: 150.00,
            status: "agotado",
            description: "Máxima fijación y duración",
            image: "assets/images/strong140gWEB-2697915.webp"
        },
        {
            id: 4,
            name: "Shampoo Azul",
            category: "shampoos",
            stock: 32,
            minStock: 15,
            price: 120.00,
            status: "disponible",
            description: "Limpieza profunda y cuidado",
            image: "assets/images/SHAMPOOAZUL-1-5293342.webp"
        },
        {
            id: 5,
            name: "Shampoo Rojo",
            category: "shampoos",
            stock: 5,
            minStock: 15,
            price: 120.00,
            status: "bajo-stock",
            description: "Limpieza intensa y revitalizante",
            image: "assets/images/SHAMPOOROJO-1-5293239.webp"
        },
        {
            id: 6,
            name: "Pomada 1LT",
            category: "pomadas",
            stock: 0,
            minStock: 5,
            price: 450.00,
            status: "agotado",
            description: "Tamaño familiar para uso prolongado",
            image: "assets/images/1lt-2908257.webp"
        }
    ];

    let filteredData = [...inventoryData];
    let currentProduct = null;

    // Elementos del DOM
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    const inventoryTableBody = document.getElementById('inventoryTableBody');
    const productModal = document.getElementById('productModal');
    const productForm = document.getElementById('productForm');
    const modalTitle = document.getElementById('modalTitle');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveProductBtn = document.getElementById('saveProductBtn');
    const addProductBtn = document.getElementById('addProductBtn');
    const selectAllCheckbox = document.getElementById('selectAll');

    // Inicializar la aplicación
    function init() {
        updateStats();
        renderTable();
        setupEventListeners();
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Búsqueda
        searchInput.addEventListener('input', handleSearch);
        
        // Filtros
        categoryFilter.addEventListener('change', handleFilter);
        statusFilter.addEventListener('change', handleFilter);
        
        // Modal
        closeModal.addEventListener('click', closeModalHandler);
        cancelBtn.addEventListener('click', closeModalHandler);
        addProductBtn.addEventListener('click', openAddModal);
        saveProductBtn.addEventListener('click', handleSaveProduct);
        
        // Cerrar modal al hacer clic fuera
        productModal.addEventListener('click', function(e) {
            if (e.target === productModal) {
                closeModalHandler();
            }
        });
        
        // Select all
        selectAllCheckbox.addEventListener('change', handleSelectAll);
    }

    // Manejar búsqueda
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        filteredData = inventoryData.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        applyFilters();
    }

    // Manejar filtros
    function handleFilter() {
        applyFilters();
    }

    // Aplicar filtros
    function applyFilters() {
        const category = categoryFilter.value;
        const status = statusFilter.value;
        
        let filtered = [...filteredData];
        
        if (category) {
            filtered = filtered.filter(product => product.category === category);
        }
        
        if (status) {
            filtered = filtered.filter(product => product.status === status);
        }
        
        renderTable(filtered);
    }

    // Renderizar tabla
    function renderTable(data = filteredData) {
        inventoryTableBody.innerHTML = '';
        
        data.forEach(product => {
            const row = createProductRow(product);
            inventoryTableBody.appendChild(row);
        });
    }

    // Crear fila de producto
    function createProductRow(product) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <input type="checkbox" class="product-checkbox" data-id="${product.id}">
            </td>
            <td>
                <div class="product-info">
                    <img src="${product.image}" alt="${product.name}" class="product-thumb">
                    <div class="product-details">
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                    </div>
                </div>
            </td>
            <td>
                <span class="category-badge category-${product.category}">
                    ${getCategoryName(product.category)}
                </span>
            </td>
            <td>
                <span class="stock-amount ${getStockClass(product.stock, product.minStock)}">
                    ${product.stock}
                </span>
            </td>
            <td>
                <span class="price">$${product.price.toFixed(2)}</span>
            </td>
            <td>
                <span class="status-badge status-${product.status}">
                    ${getStatusName(product.status)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon edit-btn" data-id="${product.id}" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete-btn" data-id="${product.id}" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        // Agregar event listeners a los botones
        const editBtn = row.querySelector('.edit-btn');
        const deleteBtn = row.querySelector('.delete-btn');
        
        editBtn.addEventListener('click', () => openEditModal(product.id));
        deleteBtn.addEventListener('click', () => deleteProduct(product.id));
        
        return row;
    }

    // Abrir modal para agregar producto
    function openAddModal() {
        currentProduct = null;
        modalTitle.textContent = 'Agregar Producto';
        productForm.reset();
        productModal.style.display = 'flex';
    }

    // Abrir modal para editar producto
    function openEditModal(productId) {
        currentProduct = inventoryData.find(p => p.id === productId);
        if (currentProduct) {
            modalTitle.textContent = 'Editar Producto';
            fillForm(currentProduct);
            productModal.style.display = 'flex';
        }
    }

    // Llenar formulario
    function fillForm(product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productMinStock').value = product.minStock;
        document.getElementById('productDescription').value = product.description;
    }

    // Cerrar modal
    function closeModalHandler() {
        productModal.style.display = 'none';
        currentProduct = null;
        productForm.reset();
    }

    // Guardar producto
    function handleSaveProduct() {
        if (productForm.checkValidity()) {
            const formData = new FormData(productForm);
            const productData = {
                name: formData.get('productName'),
                category: formData.get('productCategory'),
                price: parseFloat(formData.get('productPrice')),
                stock: parseInt(formData.get('productStock')),
                minStock: parseInt(formData.get('productMinStock')),
                description: formData.get('productDescription')
            };
            
            // Determinar estado basado en stock
            if (productData.stock === 0) {
                productData.status = 'agotado';
            } else if (productData.stock <= productData.minStock) {
                productData.status = 'bajo-stock';
            } else {
                productData.status = 'disponible';
            }
            
            if (currentProduct) {
                // Editar producto existente
                const index = inventoryData.findIndex(p => p.id === currentProduct.id);
                inventoryData[index] = { ...currentProduct, ...productData };
            } else {
                // Agregar nuevo producto
                const newProduct = {
                    id: Date.now(),
                    image: 'assets/images/original140gWEB-2697956.webp', // Imagen por defecto
                    ...productData
                };
                inventoryData.push(newProduct);
            }
            
            updateStats();
            renderTable();
            closeModalHandler();
        } else {
            productForm.reportValidity();
        }
    }

    // Eliminar producto
    function deleteProduct(productId) {
        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            const index = inventoryData.findIndex(p => p.id === productId);
            if (index > -1) {
                inventoryData.splice(index, 1);
                updateStats();
                renderTable();
            }
        }
    }

    // Manejar select all
    function handleSelectAll() {
        const checkboxes = document.querySelectorAll('.product-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    }

    // Actualizar estadísticas
    function updateStats() {
        const total = inventoryData.length;
        const available = inventoryData.filter(p => p.status === 'disponible').length;
        const lowStock = inventoryData.filter(p => p.status === 'bajo-stock').length;
        const outOfStock = inventoryData.filter(p => p.status === 'agotado').length;
        
        document.getElementById('totalProducts').textContent = total;
        document.getElementById('availableProducts').textContent = available;
        document.getElementById('lowStockProducts').textContent = lowStock;
        document.getElementById('outOfStockProducts').textContent = outOfStock;
    }

    // Funciones auxiliares
    function getCategoryName(category) {
        const names = {
            'pomadas': 'Pomadas',
            'shampoos': 'Shampoos',
            'accesorios': 'Accesorios'
        };
        return names[category] || category;
    }

    function getStatusName(status) {
        const names = {
            'disponible': 'Disponible',
            'bajo-stock': 'Bajo Stock',
            'agotado': 'Agotado'
        };
        return names[status] || status;
    }

    function getStockClass(stock, minStock) {
        if (stock === 0) return 'out-of-stock';
        if (stock <= minStock) return 'low-stock';
        return 'available';
    }

    // Inicializar la aplicación
    init();
});
