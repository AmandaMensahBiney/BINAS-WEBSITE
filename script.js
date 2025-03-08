document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close-modal');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    const productContainer = document.querySelector('.products-container');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Open cart modal
    cartIcon.addEventListener('click', function() {
        updateCartDisplay();
        cartModal.style.display = 'flex';
    });
    
    // Close cart modal
    closeModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // Clear cart
    clearCartBtn.addEventListener('click', function() {
        cart = [];
        saveCart();
        updateCartDisplay();
        updateCartCounter();
    });
    
    // Checkout functionality
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert('Thank you for your purchase! Total: $' + calculateTotal().toFixed(2));
        cart = [];
        saveCart();
        updateCartDisplay();
        updateCartCounter();
        cartModal.style.display = 'none';
    });
    
    // Add to cart functionality
    if (productContainer) {
        productContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                const card = e.target.closest('.product-card');
                const id = card.dataset.id;
                const name = card.querySelector('h3').textContent;
                const price = parseFloat(card.querySelector('.price').textContent.replace('$', ''));
                const imgSrc = card.querySelector('img').src;
                
                addToCart(id, name, price, imgSrc);
            }
        });
    }
    
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
                <img src="${item.imgSrc}" alt="${item.name}">
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
        
        cartTotal.textContent = calculateTotal().toFixed(2);
    }
    
    // Calculate total
    function calculateTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // Update cart counter
    function updateCartCounter() {
        const cartCounter = document.querySelector('.cart-counter');
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        
        if (itemCount > 0) {
            cartCounter.textContent = itemCount;
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
});