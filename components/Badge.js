 function updateBadge() {
    const badge = document.getElementById('cart-badge');
    const total = cart.reduce((sum, i) => sum + i.qty, 0);
    if (total > 0) {
      badge.textContent = total > 99 ? '99+' : total;
      badge.classList.remove('hidden');
      badge.classList.add('flex');
    } else {
      badge.classList.add('hidden');
      badge.classList.remove('flex');
    }
  }