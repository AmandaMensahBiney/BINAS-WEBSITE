document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close-modal');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.getElementById('clear-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutModal = document.querySelector('.close-checkout-modal');
    const confirmationModal = document.getElementById('confirmation-modal');
    const closeConfirmationModal = document.querySelector('.close-confirmation-modal');
    const continueShoppingBtn = document.getElementById('continue-shopping');
    const productGrid = document.querySelector('.product-grid');
    const shopProducts = document.getElementById('shop-products');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Open cart modal
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        updateCartDisplay();
        cartModal.style.display = 'flex';
    });
    
    // Close cart modal
    closeModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        } else if (event.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        } else if (event.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });
    
    // Close checkout modal
    if (closeCheckoutModal) {
        closeCheckoutModal.addEventListener('click', function() {
            checkoutModal.style.display = 'none';
        });
    }
    
    // Close confirmation modal
    if (closeConfirmationModal) {
        closeConfirmationModal.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
        });
    }
    
    // Continue shopping button
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
        });
    }
    
    // Clear cart
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            cart = [];
            saveCart();
            updateCartDisplay();
            updateCartCounter();
        });
    }
    
    // Checkout functionality
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            // Update checkout items and total
            const checkoutItems = document.getElementById('checkout-items');
            const checkoutTotal = document.getElementById('checkout-total');
            
            if (checkoutItems && checkoutTotal) {
                checkoutItems.innerHTML = '';
                cart.forEach(item => {
                    const checkoutItem = document.createElement('div');
                    checkoutItem.className = 'checkout-item';
                    checkoutItem.innerHTML = `
                        <div class="checkout-item-details">
                            <h4>${item.name}</h4>
                            <p>${item.quantity} x $${item.price.toFixed(2)}</p>
                        </div>
                        <div class="checkout-item-price">
                            $${(item.price * item.quantity).toFixed(2)}
                        </div>
                    `;
                    checkoutItems.appendChild(checkoutItem);
                });
                
                checkoutTotal.textContent = calculateTotal().toFixed(2);
            }
            
            cartModal.style.display = 'none';
            checkoutModal.style.display = 'flex';
        });
    }
    
    // Handle checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Generate random order number
            const orderNumber = 'BP-' + Math.floor(Math.random() * 10000);
            document.getElementById('order-number').textContent = orderNumber;
            
            // Hide checkout modal and show confirmation
            checkoutModal.style.display = 'none';
            confirmationModal.style.display = 'flex';
            
            // Clear cart after successful order
            cart = [];
            saveCart();
            updateCartCounter();
        });
    }
    
    // Filter functionality for shop products
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.dataset.category;
                
                // Filter products
                const productCards = shopProducts.querySelectorAll('.product-card');
                
                productCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Add to cart functionality for product grids
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const button = e.target;
            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const card = button.closest('.product-card');
            const imgSrc = card.querySelector('img').src;
            
            addToCart(id, name, price, imgSrc);
        }
    });
    
    // Add to cart function
    function addToCart(id, name, price, imgSrc) {
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                imgSrc,
                quantity: 1
            });
        }
        
        saveCart();
        updateCartCounter();
        
        // Show quick confirmation
        const confirmation = document.createElement('div');
        confirmation.className = 'cart-confirmation';
        confirmation.textContent = 'Added to cart!';
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.classList.add('show');
            setTimeout(() => {
                confirmation.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(confirmation);
                }, 300);
            }, 1500);
        }, 10);
    }
    
    // Update cart display
    function updateCartDisplay() {
        if (!cartItems) return;
        
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotal.textContent = '0.00';
            return;
        }
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}" width="50">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                    <div class="quantity-control">
                        <button class="decrease-qty" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-qty" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">×</button>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Event listeners for quantity and remove buttons
        document.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
        
        if (cartTotal) {
            cartTotal.textContent = calculateTotal().toFixed(2);
        }
    }
    
    // Calculate total
    function calculateTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // Update cart counter
    function updateCartCounter() {
        const cartCounter = document.querySelector('.cart-count');
        if (!cartCounter) return;
        
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        
        cartCounter.textContent = itemCount;
        if (itemCount > 0) {
            cartCounter.style.display = 'flex';
        } else {
            cartCounter.style.display = 'none';
        }
    }
    
    // Decrease quantity
    function decreaseQuantity() {
        const id = this.dataset.id;
        const item = cart.find(item => item.id === id);
        
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== id);
        }
        
        saveCart();
        updateCartDisplay();
        updateCartCounter();
    }
    
    // Increase quantity
    function increaseQuantity() {
        const id = this.dataset.id;
        const item = cart.find(item => item.id === id);
        item.quantity += 1;
        
        saveCart();
        updateCartDisplay();
        updateCartCounter();
    }
    
    // Remove item
    function removeItem() {
        const id = this.dataset.id;
        cart = cart.filter(item => item.id !== id);
        
        saveCart();
        updateCartDisplay();
        updateCartCounter();
    }
    
    // Save cart to local storage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Initialize
    updateCartDisplay();
    updateCartCounter();
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you shortly.');
            contactForm.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const productModal = document.getElementById('product-modal');
    const closeProductModal = document.querySelector('.close-product-modal');
    const productModalImage = document.getElementById('product-modal-image');
    const productModalName = document.getElementById('product-modal-name');
    const productModalDescription = document.getElementById('product-modal-description');
    const productModalPrice = document.getElementById('product-modal-price');
    const addToCartModalBtn = document.getElementById('add-to-cart-modal');
    let selectedProduct = {};

    // Open modal when clicking on a product
    document.querySelectorAll('.product-card').forEach(product => {
        product.addEventListener('click', function () {
            const id = this.dataset.id;
            const name = this.querySelector('h3') ? this.querySelector('h3').innerText : "Unknown Product";
            const description = this.querySelector('p') ? this.querySelector('p').innerText : "No description available.";
            const price = this.querySelector('.price') ? this.querySelector('.price').innerText : "$0.00";
            const image = this.querySelector('img') ? this.querySelector('img').src : "";

            // Store selected product details
            selectedProduct = { id, name, description, price, image };

            // Populate modal
            productModalImage.src = image;
            productModalName.innerText = name;
            productModalDescription.innerText = description;
            productModalPrice.innerText = price;

            // Show modal
            productModal.style.display = 'flex';
        });
    });

    // Close the modal
    closeProductModal.addEventListener('click', function () {
        productModal.style.display = 'none';
    });

    // Add product to cart from modal
    addToCartModalBtn.addEventListener('click', function () {
        addToCart(selectedProduct.id, selectedProduct.name, parseFloat(selectedProduct.price.replace('$', '')), selectedProduct.image);
        productModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === productModal) {
            productModal.style.display = 'none';
        }
    });
});
