// =============================================
// DATA
// =============================================
const dishes = [
  // Burgers
  { id: 1, name: 'Classic Smash Burger', desc: 'Juicy beef patty, cheddar, caramelised onion, secret sauce.', price: 199, emoji: '🍔', cat: 'burgers', rating: '4.9', time: '18 min', badge: 'Best Seller' },
  { id: 2, name: 'Crispy Chicken Burger', desc: 'Fried chicken thigh, pickles, slaw, sriracha mayo.', price: 179, emoji: '🐔', cat: 'burgers', rating: '4.7', time: '20 min', badge: null },
  { id: 3, name: 'Mushroom Swiss Burger', desc: 'Sautéed mushrooms, Swiss cheese, truffle aioli.', price: 189, emoji: '🍄', cat: 'burgers', rating: '4.6', time: '18 min', badge: null },

  // Pizza
  { id: 4, name: 'Margherita Romana', desc: 'San Marzano tomato, fresh mozzarella, basil, EVO.', price: 249, emoji: '🍕', cat: 'pizza', rating: '4.8', time: '22 min', badge: 'Popular' },
  { id: 5, name: 'Pepperoni Inferno', desc: 'Double pepperoni, chilli flakes, honey drizzle.', price: 279, emoji: '🔥', cat: 'pizza', rating: '4.9', time: '25 min', badge: 'Spicy' },
  { id: 6, name: 'BBQ Chicken Pizza', desc: 'Smoky BBQ base, grilled chicken, red onion, coriander.', price: 269, emoji: '🍗', cat: 'pizza', rating: '4.7', time: '24 min', badge: null },

  // Sushi
  { id: 7, name: 'Spicy Tuna Roll', desc: '6-piece California roll topped with spicy tuna and tobiko.', price: 349, emoji: '🍣', cat: 'sushi', rating: '4.9', time: '15 min', badge: 'Chef\'s Pick' },
  { id: 8, name: 'Dragon Roll', desc: 'Prawn tempura inside, avocado on top, eel sauce.', price: 399, emoji: '🐉', cat: 'sushi', rating: '4.8', time: '18 min', badge: null },
  { id: 9, name: 'Salmon Sashimi', desc: '9 pieces of premium Norwegian salmon, ginger, wasabi.', price: 449, emoji: '🐟', cat: 'sushi', rating: '5.0', time: '12 min', badge: 'Premium' },

  // Pasta
  { id: 10, name: 'Carbonara Classica', desc: 'Guanciale, egg yolk, Pecorino, freshly cracked pepper.', price: 229, emoji: '🍝', cat: 'pasta', rating: '4.8', time: '20 min', badge: 'Top Rated' },
  { id: 11, name: 'Arabiata Rigatoni', desc: 'Spicy tomato, garlic, capers, fresh parsley.', price: 199, emoji: '🌶️', cat: 'pasta', rating: '4.5', time: '18 min', badge: null },
  { id: 12, name: 'Truffle Fettuccine', desc: 'Wild mushroom, black truffle oil, cream, Parmesan.', price: 289, emoji: '🧀', cat: 'pasta', rating: '4.9', time: '22 min', badge: 'Premium' },

  // Salads
  { id: 13, name: 'Caesar Royale', desc: 'Romaine, house dressing, croutons, anchovies, Parmesan.', price: 149, emoji: '🥗', cat: 'salads', rating: '4.6', time: '10 min', badge: null },
  { id: 14, name: 'Watermelon Feta', desc: 'Seedless watermelon, feta, cucumber, mint, lime dressing.', price: 159, emoji: '🍉', cat: 'salads', rating: '4.7', time: '10 min', badge: 'Summer' },
  { id: 15, name: 'Buddha Bowl', desc: 'Quinoa, roasted veggies, hummus, tahini, poached egg.', price: 179, emoji: '🥙', cat: 'salads', rating: '4.8', time: '15 min', badge: 'Healthy' },

  // Desserts
  { id: 16, name: 'Tiramisu', desc: 'Espresso-soaked ladyfingers, mascarpone cream, cocoa dust.', price: 149, emoji: '☕', cat: 'desserts', rating: '4.9', time: '5 min', badge: 'Popular' },
  { id: 17, name: 'Molten Lava Cake', desc: 'Warm dark chocolate cake, liquid centre, vanilla ice cream.', price: 169, emoji: '🍫', cat: 'desserts', rating: '5.0', time: '12 min', badge: 'Must Try' },
  { id: 18, name: 'Mango Panna Cotta', desc: 'Silky vanilla panna cotta, fresh Alphonso mango coulis.', price: 139, emoji: '🥭', cat: 'desserts', rating: '4.7', time: '5 min', badge: null },

  // Drinks
  { id: 19, name: 'Mango Lassi', desc: 'Thick, creamy Alphonso mango blended with chilled yoghurt.', price: 89, emoji: '🥭', cat: 'drinks', rating: '4.8', time: '5 min', badge: 'Refreshing' },
  { id: 20, name: 'Cold Brew Coffee', desc: '18-hour steep single origin, served over ice, oat milk.', price: 99, emoji: '☕', cat: 'drinks', rating: '4.7', time: '3 min', badge: null },
  { id: 21, name: 'Virgin Mojito', desc: 'Fresh mint, lime, sugar, sparkling water, crushed ice.', price: 79, emoji: '🍹', cat: 'drinks', rating: '4.6', time: '5 min', badge: null },
];

// =============================================
// STATE
// =============================================
let cart = [];
let activeCategory = 'all';
let searchQuery = '';
let qtyMap = {}; // track selected qty per dish before adding

// =============================================
// RENDER MENU
// =============================================
function renderMenu() {
  const grid = document.getElementById('menuGrid');
  const noResults = document.getElementById('noResults');
  const q = searchQuery.toLowerCase();

  const filtered = dishes.filter(d => {
    const catMatch = activeCategory === 'all' || d.cat === activeCategory;
    const searchMatch = !q || d.name.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q);
    return catMatch && searchMatch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
  } else {
    noResults.style.display = 'none';
    grid.innerHTML = filtered.map((d, i) => {
      const qty = qtyMap[d.id] || 1;
      return `
        <div class="food-card" style="animation-delay:${i * 0.06}s">
          <div class="card-emoji-wrap">
            <span>${d.emoji}</span>
            ${d.badge ? `<div class="card-badge">${d.badge}</div>` : ''}
          </div>
          <div class="card-body">
            <div class="card-name">${d.name}</div>
            <div class="card-desc">${d.desc}</div>
            <div class="card-meta">
              <span class="card-rating">⭐ ${d.rating}</span>
              <span class="card-time">🕐 ${d.time}</span>
            </div>
            <div class="card-footer">
              <div class="card-price">₹${d.price}</div>
              <div style="display:flex;align-items:center;gap:10px;">
                <div class="qty-control">
                  <button class="qty-btn" onclick="changeQty(${d.id}, -1)">−</button>
                  <span class="qty-num" id="qty-${d.id}">${qty}</span>
                  <button class="qty-btn" onclick="changeQty(${d.id}, 1)">+</button>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${d.id})">Add</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

// =============================================
// QTY CONTROL (on card)
// =============================================
function changeQty(id, delta) {
  const current = qtyMap[id] || 1;
  const next = Math.max(1, current + delta);
  qtyMap[id] = next;
  const el = document.getElementById(`qty-${id}`);
  if (el) el.textContent = next;
}

// =============================================
// CART LOGIC
// =============================================
function addToCart(id) {
  const dish = dishes.find(d => d.id === id);
  const qty = qtyMap[id] || 1;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...dish, qty });
  }
  qtyMap[id] = 1; // reset picker
  renderMenu();
  renderCart();
  updateCartCount();
  flashCartBtn();
}

function updateCartQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  renderCart();
  updateCartCount();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <p>Your cart is empty</p>
        <span>Add some delicious food!</span>
      </div>
    `;
    footer.style.display = 'none';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="ci-emoji">${item.emoji}</div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">₹${item.price * item.qty}</div>
      </div>
      <div class="ci-controls">
        <button class="ci-qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
        <span class="ci-qty">${item.qty}</span>
        <button class="ci-qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = 40;
  document.getElementById('subtotal').textContent = `₹${subtotal}`;
  document.getElementById('totalPrice').textContent = `₹${subtotal + delivery}`;
  footer.style.display = 'block';
}

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = total;
}

function flashCartBtn() {
  const btn = document.getElementById('cartToggle');
  btn.style.transform = 'scale(1.2)';
  setTimeout(() => { btn.style.transform = ''; }, 200);
}

// =============================================
// CART SIDEBAR TOGGLE
// =============================================
function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

// =============================================
// CHECKOUT
// =============================================
document.getElementById('checkoutBtn').addEventListener('click', () => {
  closeCart();
  // Show modal
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('open');

  // Animate tracker
  setTimeout(() => {
    const ts2 = document.getElementById('ts2');
    const ts3 = document.getElementById('ts3');
    const lines = document.querySelectorAll('.track-line');
    ts2.classList.add('active');
    if (lines[0]) lines[0].classList.add('fill');

    setTimeout(() => {
      ts3.classList.add('active');
      if (lines[1]) lines[1].classList.add('fill');
    }, 2000);
  }, 1500);
});

document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('modalOverlay').classList.remove('open');
  // Reset tracker
  document.getElementById('ts2').classList.remove('active');
  document.getElementById('ts3').classList.remove('active');
  document.querySelectorAll('.track-line').forEach(l => l.classList.remove('fill'));
  // Clear cart
  cart = [];
  renderCart();
  updateCartCount();
});

// =============================================
// CATEGORIES
// =============================================
document.querySelectorAll('.cat-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
    renderMenu();
  });
});

// =============================================
// SEARCH
// =============================================
document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value;
  renderMenu();
});

// =============================================
// INIT
// =============================================
renderMenu();
