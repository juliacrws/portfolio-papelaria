document.addEventListener('DOMContentLoaded', () => {
    console.log("Site Oficina do Papel carregado e pronto para interações!");

    // =======================================================
    // "BANCO DE DADOS" DOS PRODUTOS
    // =======================================================
    const productsData = {
        '1': {
            title: "Caderno Floral", price: "R$ 49,90",
            description: "Perfeito para anotações, diários ou bullet journal. Capa dura com toque aveludado e elástico para fechamento.",
            mainImage: "assets/produto1.jpg",
            thumbnails: ["assets/produto1.jpg", "assets/produto1-detalhe1.jpg", "assets/produto1-detalhe2.jpg"],
            specifications: `<li><strong>Tamanho:</strong> A5 (14,8 x 21 cm)</li><li><strong>Capa:</strong> Capa dura com laminação fosca</li>`,
            related: ['2', '6', '8', '5']
        },
        '2': {
            title: "Kit de Canetas Pastel", price: "R$ 79,90",
            description: "Um arco-íris de cores suaves para suas anotações e desenhos. Este kit conta com 10 canetas de ponta fina.",
            mainImage: "assets/produto2.jpg",
            thumbnails: ["assets/produto2.jpg", "assets/produto2-detalhe1.jpg", "assets/produto2-detalhe2.jpg"],
            specifications: `<li><strong>Quantidade:</strong> 10 canetas</li><li><strong>Tipo de Ponta:</strong> Ponta fina de fibra 0.7mm</li>`,
            related: ['1', '3', '7', '4']
        },
        '3': {
            title: "Planner Semanal", price: "R$ 89,90",
            description: "Organize sua semana com estilo e praticidade. Visão semanal, controle de hábitos e espaço para anotações.",
            mainImage: "assets/produto3.jpg",
            thumbnails: ["assets/produto3.jpg", "assets/produto3-detalhe1.jpg", "assets/produto3-detalhe2.jpg"],
            specifications: `<li><strong>Tamanho:</strong> Médio (17 x 22 cm)</li><li><strong>Extras:</strong> Bolso interno e cartela de adesivos</li>`,
            related: ['2', '6', '5', '8']
        },
        '4': {
            title: "Bloco de Notas Verde", price: "R$ 34,90",
            description: "Minimalista e elegante, este bloco de notas com capa verde sálvia é ideal para listas e ideias rápidas.",
            mainImage: "assets/produto4.jpg",
            thumbnails: ["assets/produto4.jpg", "assets/produto4-detalhe1.jpg", "assets/produto4-detalhe2.jpg"],
            specifications: `<li><strong>Tamanho:</strong> A6 (10,5 x 14,8 cm)</li><li><strong>Folhas:</strong> 60 folhas pontilhadas</li>`,
            related: ['2', '8', '1', '7']
        },
        '5': {
            title: "Kit Marca-Texto Grifpen Pastel", price: "R$ 28,90",
            description: "Destaque suas anotações com cores suaves. O kit tem ponta chanfrada que permite traços finos e grossos.",
            mainImage: "assets/produto5.jpg",
            thumbnails: ["assets/produto5.jpg", "assets/produto5-detalhe1.jpg", "assets/produto5-detalhe2.jpg"],
            specifications: `<li><strong>Quantidade:</strong> 6 marca-textos</li><li><strong>Tipo de Ponta:</strong> Chanfrada</li>`,
            related: ['1', '3', '4', '2']
        },
        '6': {
            title: "Coleção de Fitas Washi Tape", price: "R$ 18,90",
            description: "Decore seu planner ou presentes com esta linda fita washi tape. Fácil de colar e remover sem danificar o papel.",
            mainImage: "assets/produto6.jpg",
            thumbnails: ["assets/produto6.jpg", "assets/produto6-detalhe1.jpg", "assets/produto6-detalhe2.jpg"],
            specifications: `<li><strong>Comprimento:</strong> 10 metros</li><li><strong>Largura:</strong> 15 mm</li>`,
            related: ['3', '1', '8', '7']
        },
        '7': {
            title: "Estojo Fofinho Sonho de Nuvem", price: "R$ 42,90",
            description: "Guarde seus materiais de escrita com muito charme neste estojo com design de nuvens em tons pastéis.",
            mainImage: "assets/produto7.jpg",
            thumbnails: ["assets/produto7.jpg", "assets/produto7-detalhe1.jpg", "assets/produto7-detalhe2.jpg"],
            specifications: `<li><strong>Material:</strong> Couro sintético com detalhes bordados</li><li><strong>Dimensões:</strong> 20cm x 8cm x 5cm</li>`,
            related: ['2', '5', '8', '4']
        },
        '8': {
            title: "Clips Coloridos Candy Colors", price: "R$ 12,90",
            description: "Organize seus papéis com um toque de cor. Pacote com 50 clipes de metal revestidos em cores candy.",
            mainImage: "assets/produto8.jpg",
            thumbnails: ["assets/produto8.jpg", "assets/produto8-detalhe1.jpg", "assets/produto8-detalhe2.jpg"],
            specifications: `<li><strong>Quantidade:</strong> 50 clipes</li><li><strong>Material:</strong> Metal revestido</li>`,
            related: ['1', '4', '3', '6']
        }
    };

    // =======================================================
    // LÓGICA GERAL (Roda em todas as páginas)
    // =======================================================

    // --- Animação de seções ao rolar a página ---
    const sectionsToAnimate = document.querySelectorAll('.products-section, .categories-section, .portfolio-section');
    if (sectionsToAnimate.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        sectionsToAnimate.forEach(section => { observer.observe(section); });
    }

    // --- Efeito Parallax no Hero Section ---
    const hero = document.querySelector('.hero-section');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // --- Lógica para o Overlay de Busca ---
    const searchIcon = document.querySelector('a[aria-label="Busca"]');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearchBtn = document.getElementById('close-search');

    if (searchIcon && searchOverlay && closeSearchBtn) {
        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            searchOverlay.classList.add('visible');
        });
        closeSearchBtn.addEventListener('click', () => {
            searchOverlay.classList.remove('visible');
        });
    }

    // --- Lógica para o Dropdown da Conta ---
    const accountContainer = document.querySelector('.account-container');
    const accountDropdown = document.querySelector('.account-dropdown');

    if (accountContainer && accountDropdown) {
        accountContainer.addEventListener('click', (e) => {
            e.preventDefault();
            accountDropdown.classList.toggle('visible');
        });
        window.addEventListener('click', (e) => {
            if (!accountContainer.contains(e.target)) {
                accountDropdown.classList.remove('visible');
            }
        });
    }

    // --- Lógica para o Mini-Carrinho ---
    const cartIcon = document.querySelector('a[aria-label="Carrinho"]');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart');

    if (cartIcon && cartSidebar && closeCartBtn) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cartSidebar.classList.add('open');
        });
        closeCartBtn.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
        });
    }

    // =======================================================
    // LÓGICA ESPECÍFICA DA PÁGINA DE PRODUTO (PDP)
    // =======================================================
    if (document.querySelector('.pdp-main-section')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id') || '1';
        const product = productsData[productId];

        function loadProductData(product) {
            if (product) {
                document.title = `${product.title} - Oficina do Papel`;
                document.querySelector('.product-title').textContent = product.title;
                document.querySelector('.product-price').textContent = product.price;
                document.querySelector('.product-short-description').textContent = product.description;
                document.getElementById('mainProductImage').src = product.mainImage;
                
                const specsList = document.querySelector('#especificacoes ul');
                if (specsList) { specsList.innerHTML = product.specifications; }
                
                const thumbnailContainer = document.querySelector('.thumbnail-images');
                thumbnailContainer.innerHTML = '';
                product.thumbnails.forEach((thumbSrc, index) => {
                    const img = document.createElement('img');
                    img.src = thumbSrc;
                    img.alt = `Thumbnail ${index + 1}`;
                    img.classList.add('thumbnail');
                    if (index === 0) { img.classList.add('active'); }
                    thumbnailContainer.appendChild(img);
                });

                const relatedProductsContainer = document.querySelector('.products-section .product-carousel');
                if (relatedProductsContainer) {
                    relatedProductsContainer.innerHTML = '';
                    product.related.forEach(relatedId => {
                        const relatedProduct = productsData[relatedId];
                        if (relatedProduct) {
                            const productCardHTML = `
                                <a href="produto.html?id=${relatedId}" class="product-card-link">
                                    <div class="product-card">
                                        <div class="product-image-container">
                                            <img src="${relatedProduct.mainImage}" alt="${relatedProduct.title}">
                                            <button class="quick-view-btn">Visualização Rápida</button>
                                        </div>
                                        <h3>${relatedProduct.title}</h3>
                                        <p>${relatedProduct.price}</p>
                                    </div>
                                </a>`;
                            relatedProductsContainer.innerHTML += productCardHTML;
                        }
                    });
                }
                
                setupGalleryListeners();
            } else {
                document.querySelector('.pdp-main-section').innerHTML = '<h1>Produto não encontrado</h1>';
            }
        }
        
        function setupGalleryListeners() {
            const mainImage = document.getElementById('mainProductImage');
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    mainImage.src = this.src;
                });
            });
        }
        
        loadProductData(product);

        const tabLinks = document.querySelectorAll('.tab-link');
        const tabContents = document.querySelectorAll('.tab-content');
        tabLinks.forEach(link => {
            link.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                tabLinks.forEach(l => l.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });

        const quantityMinus = document.querySelector('.quantity-selector button:first-child');
        const quantityPlus = document.querySelector('.quantity-selector button:last-child');
        const quantitySpan = document.querySelector('.quantity-selector span');
        let quantity = 1;

        quantityPlus.addEventListener('click', () => {
            quantity++;
            quantitySpan.textContent = quantity;
        });
        quantityMinus.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
            }
        });
    }
});