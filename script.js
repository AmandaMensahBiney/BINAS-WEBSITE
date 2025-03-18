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
    
    // Product modal variables
    const productModal = document.getElementById('product-modal');
    const closeProductModal = document.querySelector('.close-product-modal');
    const productModalImage = document.getElementById('product-modal-image');
    const productModalName = document.getElementById('product-modal-name');
    const productModalDescription = document.getElementById('product-modal-description');
    const productModalPrice = document.getElementById('product-modal-price');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Product data - add your descriptions and prices here
    const productData = {
        "Plain Chiffon Cakes": {
            description: " The perfect blend of light, airy texture and rich, buttery flavor. Made with the finest ingredients, our chiffon cakes are incredibly soft and moist, offering a delicate balance of sweetness.  Every bite melts in your mouth, delivering a comforting and satisfying experience! (Icing added on request)",
            price: "Ghc 400 for 1 pound"
        },

"Fruit Cakes": {
            description: " A delightful fusion of rich, moist cake and a medley of premium dried fruits. Each bite bursts with deep, well-balanced flavors that only get better with time! (Icing added on request)",
            price: "Ghc 400 for 1 pound"
        },

        "Lemon Cakes": {
            description: " A bright and zesty delight, bursting with the refreshing flavor of real lemons. Soft, moist, and infused with the perfect balance of tangy citrus and subtle sweetness, this cake delivers a light and airy texture that melts in your mouth! (Icing added on request)",
            price: "Ghc 400 for 1 pound"
        },

"Banana Cakes": {
            description: " A rich, moist, and flavorful treat made with perfectly ripe bananas for a naturally sweet and delicious taste. Soft and fluffy, with a hint of warm spices like cinnamon and nutmeg, this cake delivers a comforting homemade feel in every bite! (Icing added on request)",
            price: "Ghc 400 for 1 pound"
        },

"Coconut Cakes": {
            description: " Made with fresh coconut and premium ingredients, this cake offers a soft, fluffy texture with a delicate sweetness that melts in your mouth. Every bite is infused with the creamy, nutty essence of coconut, making it a perfect treat for coconut lovers! (Icing added on request)",
            price: "Ghc 400 for 1 pound"
        },

"Vanilla Cakes": {
            description: "  A timeless classic, loved for its soft, moist texture and rich, buttery flavor. Made with the finest vanilla, this cake delivers a delicate sweetness and a light, fluffy crumb that melts in your mouth. Simple yet elegant, this cake is a staple for celebrations, tea time, or a sweet everyday indulgence! (Icing added on request)",
            price: "Ghc 400 for 1 pound"
        },

"Orange Chiffon Cakes": {
            description: " A light, airy, and citrus-infused delight, bursting with the refreshing taste of fresh oranges. Its delicate, fluffy texture perfectly complements the bright, tangy flavor, creating a harmonious balance of sweetness and zest. Made with real orange juice and zest, this cake delivers a naturally fragrant and refreshing taste in every bite! (Icing added on request)",
            price: "Ghc 400 for 1 pound"
        },

"Bandara Cakes": {
            description: " A vibrant fusion of two citrus favorites-orange and lemon, combining the sweet, zesty notes of oranges with the tangy brightness of lemons. Soft, moist, and bursting with refreshing citrus flavor, this cake offers the perfect balance of sweetness and tartness in every bite. Made with real orange juice, lemon zest, and the finest ingredients, it delivers a light and fluffy texture that melts in your mouth! (Icing added on request)",
            price: "Ghc 400 for 1 pound"
        },

"Carrot Cakes": {
            description: " A moist, flavorful delight packed with freshly grated carrots, warm spices, and a hint of natural sweetness. With its soft, tender crumb and rich texture, this classic favorite is both wholesome and indulgent! (Icing added on request)",
            price: "Ghc 400 for 1 pound"
        },

"Ginger Cakes": {
            description: " A warm and aromatic treat rich with the bold, comforting flavor of ginger.  Its tender crumb and rich, slightly caramelized crust make it a perfect companion to tea or coffee! (Icing added on request)",
            price: "Ghc 400 for 1 pound"
           
        },

"Cheese Cakes": {
            description: " The ultimate creamy and indulgent dessert featuring a rich, velvety smooth filling made from the finest cream cheese, balanced with just the right touch of sweetness. Baked to perfection on a buttery, crumbly biscuit crust, every bite melts in your mouth with a luscious, tangy flavor. Light yet satisfying, it’s the perfect way to indulge in pure dessert bliss! (Icing added on request)",
            price: "Ghc 500 for 1 pound"
        },



        "Spiced Baked Chips": {
            description: "The perfect balance of crunch and flavor. Made from high-quality wheat flour and baked to golden perfection, they offer a healthier alternative to fried snacks—without compromising on taste! Enjoy them as a guilt-free treat, a satisfying crunch with your favorite dips, or a light and crispy snack anytime, anywhere!",
            price: "Ghc 150 for a bowl"
        },

"Spiced Fried Chips": {
            description: "Experience the ultimate snack with our fried wheat flour chips—light, crispy, and packed with flavor. Made from carefully selected wheat flour and fried to golden perfection, each chip delivers an irresistible crunch that keeps you coming back for more. Whether enjoyed solo or paired with your favorite dips, these chips bring a satisfying taste that never disappoints!",
            price: "Ghc 130 for a bowl"
        },



        "Vegetable Spring Rolls": {
            description: "Fresh vegetable spring rolls with a crispy outer layer! (Discount available for bulk purchase)",
            price: "Ghc 20 for 3 pieces"
        },
        "Ginger Cookies": {
            description: "Warm, gluten-free ginger cookies with the perfect balance of sweetness using only honey. Available in chocolate ginger, coffee ginger and peanut butter ginger flavours!",
            price: "Ghc 10 for 50g, Ghc 30 for 250g"
        },
        "Cassava Crisps": {
            description: "Light and crunchy crisps made from locally sourced cassava. A healthier alternative to potato chips with a unique earthy flavor!",
            price: "Ghc 15 for 75g, ghc 30 for 250g, Ghc 150 for 800g"
        },
        "Cocoyam Crisps": {
            description: "Distinctively flavored crisps made from cocoyam. These crunchy treats offer a taste of traditional African cuisine in a convenient snack form!",
            price: "Ghc 15 for 75g, Ghc 30 for 250g, Ghc 150 for 800g"
        },
        "Plantain Crisps": {
            description: "Sweet and savory crisps made from plantains. These golden crisps offer a perfect balance of natural sweetness and crispy texture!",
            price: "Ghc 15 for 100g(ripe/unripe), Ghc 50 for 300g(Spicy ripe), Ghc 45 for 300g(unripe), Ghc 130 for 1kg(ripe), Ghc 120 for 1kg(unripe), Ghc 130 for 1kg(spicy ripe)"
        },
        "Fruit Scoans": {
            description: "Traditional scoans with dried fruits and a hint of spice. These hearty treats are perfect with a cup of tea or coffee!",
            price: "Ghc 12.50 for a piece"
        },

        "Peanut Butter Scoans": {
            description: "Golden, crumbly delight, infused with the rich, nutty flavor of creamy peanut butter. Each bite offers a buttery, tender texture with just the right balance of sweetness, making them an irresistible treat for any time of day!",
            price: "Ghc 10 for a piece"
        },

        "Jam Scoans": {
            description: "Baked to perfection with a light, flaky texture that melts in your mouth. Each bite is a sweet and fruity indulgence, with rich, luscious jam adding the perfect burst of flavor!",
            price: "Ghc 10 for a piece"
        },


        "Plain Scoans": {
            description: "Classic, buttery delight, baked to perfection with a light, fluffy interior and a golden, slightly crisp exterior. Whether enjoyed on their own or paired with a warm cup of tea, these scones are a timeless treat that never goes out of style!!",
            price: "Ghc 10 for a piece"
        },



        "Vegetable Samosas": {
            description: "Triangular pastries filled with colourful vegetables. Our vegetable samosas are crispy on the outside with a deliciously flavorful filling! (Discount available for bulk purchase)",
            price: "Ghc 20 for 3 pieces"
        },
        "Meat Pies": {
            description: "Savory pies with a flaky pastry crust filled with seasoned meat and vegetables. A satisfying meal on the go with authentic homemade taste!",
            price: "Ghc 20 for a piece"
        },

"Fish Pies": {
            description: " Filled with a savory, well-seasoned fish filling and vegetables that is rich, tender, and packed with flavor. The buttery, crisp pastry perfectly complements the moist and flavorful seafood inside!",
            price: "Ghc 20 for a piece"
        },

"Chicken Pies": {
            description: "Well-seasoned chicken filling that is tender, juicy, and packed with flavor. The buttery, crisp pastry perfectly complements the rich and hearty filling!",
            price: "Ghc 20 for a piece"
        },

"Vegetable Pies": {
            description: "A savory blend of fresh, seasoned vegetables that are rich in flavor and perfectly cooked to tenderness!",
            price: "Ghc 20 for a piece"
        },

        "Plain Doughnuts": {
            description: "Soft, fluffy delight, with a golden, slightly crisp exterior and a light, airy interior that melts in your mouth. Their simple yet rich flavor makes them perfect for enjoying on their own or paired with a warm cup of coffee or tea!",
            price: "Ghc 25 for 3 pieces"
        },

        "Cream Doughnuts": {
            description: " The perfect balance of light, airy dough and smooth, luscious cream makes them an irresistible indulgence!",
            price: "Ghc 25 for 3 pieces"
        },

        "Chocolate Doughnuts": {
            description: " A decadent delight, with a soft, fluffy exterior that gives way to a rich, gooey chocolate center with every bite.!",
            price: "Ghc 25 for 3 pieces"
        },

        "Jam Doughnuts": {
            description: "A sweet, fruity delight that bursts with rich, tangy jam in every bite. The perfect balance of light, fluffy dough and luscious, flavorful filling!",
            price: "Ghc 25 for 3 pieces"
        },


        "Beef Spring Rolls": {
            description: " Crispy, golden delight packed with flavorful, well-seasoned beef and fresh vegetables, all wrapped in a light, crunchy shell. Perfect as an appetizer or snack, they offer a satisfying balance of crunch and juiciness in every bite! (Discount available for bulk purchase)",
            price: "Ghc 20 for 3 pieces"
        },

        "Beef Samosas": {
            description: "Perfectly crispy and golden delight, filled with savory, spiced beef that’s rich in flavor and perfectly seasoned with aromatic herbs and spices. Each bite delivers a crunchy, flaky exterior that gives way to a juicy, flavorful filling! (Discount available for bulk purchase)",
            price: "Ghc 20 for 3 pieces"
        },

        "Chicken Spring Rolls": {
            description: "Filled with tender, seasoned chicken and fresh vegetables, all wrapped in a light, crunchy shell. Each bite bursts with a perfect balance of savory flavors and satisfying crunch!",
            price: "Ghc 20 for 3 pieces (Discount available for bulk purchase)"
        },


        "Chicken Samosas": {
            description: "Crispy on the outside, juicy and flavorful on the inside – our Chicken Samosas are the perfect blend of golden perfection and mouthwatering spices. One bite, and you'll be craving more! (Discount available for bulk purchase)",
            price: "Ghc 20 for 3 pieces"
        },

        "Cheese Spring Rolls": {
            description: "Golden, crispy perfection meets rich, melty goodness—our Cheese Spring Rolls are the ultimate indulgence! Each bite is a delightful blend of crunch and gooey, cheesy satisfaction. A treat you won’t resist! (Discount available for bulk purchase)",
            price: "Ghc 25 for 3 pieces"
        },

        "Cheese Samosas": {
            description: "Stuffed with a rich, velvety cheese filling that melts in your mouth with every bite. The flaky, crunchy pastry perfectly complements the creamy, savory goodness inside, creating an irresistible contrast of textures! (Discount available for bulk purchase)",
            price: "Ghc 25 for 3 pieces"
        },

        "Buttercream Cupcakes": {
            description: "The perfect combination of soft, fluffy cake and rich, creamy frosting. Baked to perfection, these cupcakes have a light and tender crumb, complemented by a smooth and velvety buttercream topping. Whether classic vanilla, chocolate, or a fun variety of flavors, our cupcakes are beautifully swirled with luscious buttercream, making them as delightful to look at as they are to eat. Perfect for birthdays, celebrations, or just a sweet indulgence, these cupcakes are a treat that brings joy in every bite!",
            price: "Ghc 15 for a piece, Ghc 40 for 3 pieces"
        },
    
        "Whippedcream Cupcakes": {
            description: "Whipped Cream Frosting Cupcakes are light, airy, and irresistibly delicious! Baked to perfection, these soft and fluffy cupcakes are topped with a smooth and delicate whipped cream frosting that melts in your mouth. Unlike heavier frostings, the whipped cream adds a light and refreshing touch, making every bite feel soft and indulgent!",
            price: "Ghc 15 for a piece, Ghc 40 for 3 pieces"
        },

"Plain Muffins": {
            description: "Our plain muffins are a timeless treat—soft, fluffy, and baked to perfection. With their light texture and rich, buttery flavor, they’re perfect for any time of the day!",
            price: "Stay tuned!"
        },

"Chocolate Muffins": {
            description: "Indulge in the deep, velvety goodness of our chocolate muffins—soft, moist, and bursting with rich cocoa flavor. Baked to perfection, each bite melts in your mouth, making it the perfect treat for chocolate lovers. Whether enjoyed as a morning delight, an afternoon pick-me-up, or a sweet indulgence, these muffins are pure chocolate bliss!",
            price: "Stay tuned!"
        },

"Banana Muffins": {
            description: "Our banana muffins are the perfect blend of moist, fluffy texture and rich, natural sweetness. Made with real ripe bananas, each bite is bursting with a comforting homemade flavor. Whether you enjoy them as a wholesome breakfast, a midday snack, or a treat on the go, these muffins bring a taste of warmth and nostalgia with every bite!",
            price: "Stay tuned!"
        },

"Blueberry Muffins": {
            description: "Our blueberry muffins are more than just a treat—they’re an experience. Each fluffy, golden-baked muffin is bursting with plump, juicy blueberries, delivering a perfect balance of sweetness and tang. With every bite, you’ll taste the harmony of soft, buttery goodness and fresh, fruity delight!",
            price: "Stay tuned!"
        },

"Coated Nuts": {
            description: "Our flour-coated nuts are the perfect fusion of crunch and taste. Each nut is lightly coated in a seasoned flour blend and fried or baked to crispy perfection, delivering an irresistible texture with every bite. Whether you prefer them savory, spicy, or slightly sweet, these nuts make a satisfying snack for any occasion!",
            price: "Ghc 150 for a bowl"
        },



"Goat light Soup": {
            description: "Experience the deep, flavors of our Goat Light/Pepper Soup—a rich, aromatic broth infused with bold African spices and slow-cooked to perfection with tender, succulent goat meat. This spicy delicacy delivers a perfect balance of heat and flavor!",
            price: "Stay tuned!"
        },

"Chicken light Soup": {
            description: "Experience the soul-warming delight of our Chicken Light/Pepper Soup—a perfect harmony of tender, slow-cooked chicken infused with bold African spices and a zesty, aromatic broth. Every spoonful delivers a comforting heat and a burst of rich, savory flavors that awaken your senses!",
            price: "Stay tuned!"
        },

"Tilapia light Soup": {
            description: "Delight in the fresh, vibrant flavors of our Tilapia Light Soup—a delicate yet bold fusion of tender tilapia, slow-simmered in a rich, aromatic broth infused with Ghanaian spices and herbs. This wholesome dish delivers a perfect balance of warmth, zest, and nourishment, making every sip a refreshing taste of home!",
            price: "Stay Tuned!"
        },

"Ewokple with Aborbi Tadzi": {
            description: "Experience the authentic taste of tradition with our Ewokple and Aborbi Tadzi—a perfect pairing of soft, smooth cornmeal dumpling and rich, flavorful anchovi stew. The deep, smoky essence of the Aborbi Tadzi, infused with aromatic spices and a hint of heat, complements the hearty, comforting texture of the Ewokple. Every bite is a celebration of heritage, taste, and pure satisfaction!",
            price: "Stay tuned!"
        },

"Local Brown Rice & Pepper/ Stew": {
            description: "Enjoy the wholesome goodness of our Local Brown Rice, perfectly paired with spicy, flavorful grounded pepper and your choice of expertly grilled or fried tilapia or herring stew. This hearty dish brings together the nutty richness of brown rice, the bold heat of traditional pepper sauce, and the smoky, savory taste of fresh fish—creating a truly satisfying and authentic culinary experience!",
            price: "Stay tuned!"
        },

"Eba with Pork Meat & Stew/Sauce": {
            description: "Savor the rich flavors of our perfectly prepared Eba, served with your choice of succulent pork stew, hearty goat sauce, or flavorful chicken sauce. Each combination brings a delightful balance of textures and tastes—soft, satisfying Eba paired with tender, well-seasoned meats in a rich, aromatic sauce. A true taste of home, comfort, and tradition in every bite!",
            price: "Stay tuned!"
        },


"Grilled Tilapia & Ewokple": {
            description: "Indulge in the perfect fusion of flavors with our Grilled Tilapia & Ewokple—a delightful pairing of smoky, well-seasoned tilapia grilled to perfection and soft, wholesome Ewokple. The rich, bold spices of the fish complement the smooth texture of the Ewokple, creating a satisfying and authentic taste experience. A true celebration of Ghanaian culinary heritage in every bite!",
            price: "Stay tuned!"
        },

"Chicken Thighs": {
            description: "Savor the juicy, smoky goodness of our Grilled Chicken Thigh—expertly marinated with aromatic spices and grilled to perfection for a crispy, flavorful exterior and tender, succulent inside. Every bite bursts with rich, savory goodness, making it the perfect choice for a satisfying and wholesome meal!",
            price: "Stay tuned!"
        },

"Chicken Drumsticks": {
            description: "Enjoy the irresistible taste of our Grilled Chicken Drumstick—perfectly marinated with a blend of bold spices and grilled to golden perfection. With a crispy, smoky exterior and juicy, tender meat inside, every bite is packed with mouthwatering flavor. A true delight for every chicken lover!",
            price: "Stay tuned!"
        },


"Chicken Wings": {
            description: "Treat yourself to the ultimate chicken experience with our Fried or Grilled Chicken Wings! Crispy and golden on the outside, tender and juicy on the inside—our fried wings deliver a satisfying crunch, while our grilled wings offer a smoky, charred perfection infused with bold spices. Whether you crave a crispy bite or a smoky flavor, every wing is a mouthwatering delight!",
            price: "Stay tuned!"
        },


"Chicken Fillets": {
            description: "Enjoy the crispy, golden perfection of our Butter-Coated Chicken Fillets—tender, juicy fillets enveloped in a rich, buttery coating and fried to a delightful crunch in pure vegetable oil. Each bite is a perfect balance of crispiness and succulent flavor, making it an irresistible treat for any occasion!",
            price: "Stay tuned!"
        },

"Chicken Wraps": {
            description: "Delight in the perfect blend of flavors with our Chicken Wraps—tender, seasoned chicken wrapped in a soft tortilla, layered with fresh veggies, and drizzled with a delicious sauce. Whether grilled or crispy, every bite is a satisfying fusion of taste and texture, making it a wholesome and flavorful meal on the go!",
            price: "Ghc 50 for a piece"
        },

"Chicken & Cheese Wraps": {
            description: "Indulge in the rich, savory goodness of our Chicken & Cheese Wraps—tender, seasoned chicken paired with melted cheese, wrapped in a soft tortilla, and finished with fresh veggies and a creamy sauce. Every bite delivers the perfect balance of juicy, cheesy, and flavorful goodness, making it a satisfying treat anytime!",
            price: "Ghc 50 for a piece"
        },

"Chicken Khebab Wraps": {
            description: "Savor the bold, smoky flavors of our Chicken Kebab Wraps—juicy, spice-marinated chicken skewers grilled to perfection and wrapped in a soft tortilla with crisp veggies and a flavorful sauce. Every bite is a delicious fusion of charred goodness, fresh textures, and mouthwatering spices, making it the perfect grab-and-go delight!",
            price: "Ghc 50 for a piece"
        },

"Vegetable Wraps": {
            description: "Enjoy the fresh, wholesome goodness of our Vegetable Wraps—packed with a vibrant mix of veggies, wrapped in a soft tortilla, and drizzled with a delicious, flavorful sauce. Light, nutritious, and bursting with natural flavors, this wrap is a perfect choice for a healthy and satisfying meal on the go!",
            price: "Ghc 50 for a piece"
        },

"Fried Egg Wraps": {
            description: "Start your day right with our Fried Egg Wraps—fluffy, perfectly seasoned eggs wrapped in a soft tortilla with fresh veggies and a flavorful sauce. Simple, delicious, and satisfying, this wholesome wrap is perfect for a quick breakfast or a light meal on the go!",
            price: "Ghc 50 for a piece"
        },



    };
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Open cart modal
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            updateCartDisplay();
            cartModal.style.display = 'flex';
        });
    }
    
    // Close cart modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            cartModal.style.display = 'none';
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        } else if (event.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        } else if (event.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        } else if (event.target === productModal) {
            productModal.style.display = 'none';
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
    
    // Product modal functionality
    if (closeProductModal) {
        closeProductModal.addEventListener('click', function() {
            productModal.style.display = 'none';
        });
    }
    
    // Product details functionality - Consolidated into a single approach
    // Method 1: Click on product card to show details
    document.querySelectorAll('.product-card').forEach(product => {
        product.addEventListener('click', function(e) {
            // Don't trigger if clicking on an add-to-cart button
            if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
                return;
            }
            
            showProductDetails(this);
        });
    });
    
    // Method 2: Click on view details link
    document.addEventListener('click', function(event) {
        if (event.target.matches('.view-details-link') || event.target.closest('.view-details-link') || 
            event.target.matches('.product-details-link') || event.target.closest('.product-details-link')) {
            event.preventDefault();
            
            // Get the product card that contains this link
            const productCard = event.target.closest('.product-card');
            if (productCard) {
                showProductDetails(productCard);
            }
        }
    });
    
    function showProductDetails(productCard) {
        let productName = productCard.querySelector('h3').innerText.trim();
        
        // Normalize names to remove unnecessary spaces and line breaks
        productName = productName.replace(/\s+/g, ' '); 
    
        const productImage = productCard.querySelector('img').src;
    
        // Get product data from our dictionary
        const data = productData[productName] || {
            description: "Details coming soon. Contact us for more information about this product.",
            price: "Price available on request"
        };
    
        // Populate modal with product details
        if (productModalImage) productModalImage.src = productImage;
        if (productModalName) productModalName.innerText = productName;
        if (productModalDescription) productModalDescription.innerText = data.description;
        if (productModalPrice) productModalPrice.innerText = data.price;
    
        // Display the modal
        if (productModal) productModal.style.display = 'flex';
    }
    
    
    // Initialize
    updateCartDisplay();
    updateCartCounter();
});

document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent page reload

    let form = event.target;
    let formData = new FormData(form);

    let response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        alert("Thank you! Your message has been sent.");
        form.reset();
    } else {
        alert("Oops! Something went wrong. Please try again.");
    }
});


