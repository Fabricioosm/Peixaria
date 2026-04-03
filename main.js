// Nav scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
      nav.style.padding = '0.6rem 4vw';
    } else {
      nav.style.padding = '1rem 4vw';
    }
  });

  // Filter products
  let activeFilter = 'todos';
  function setFilter(cat, btn) {
    activeFilter = cat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts();
  }

  function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
      const name = card.getAttribute('data-name');
      const cat = card.getAttribute('data-category');
      const matchCat = activeFilter === 'todos' || cat === activeFilter;
      const matchSearch = name.includes(query);
      card.classList.toggle('hidden', !(matchCat && matchSearch));
    });
  }

  // Calcular pedido
  function calcularPedido() {
    const preco = parseFloat(document.getElementById('calcProduto').value) || 0;
    const qtd = parseFloat(document.getElementById('calcQtd').value) || 0;
    const total = preco * qtd;
    document.getElementById('calcValor').textContent =
      total > 0 ? 'R$ ' + total.toFixed(2).replace('.', ',') : 'R$ 0,00';
  }

  function enviarPedidoWpp() {
    const select = document.getElementById('calcProduto');
    const qtd = document.getElementById('calcQtd').value;
    const produto = select.options[select.selectedIndex].text;
    const valor = document.getElementById('calcValor').textContent;
    if (!qtd || select.value === '0') { alert('Selecione o produto e a quantidade.'); return; }
    const msg = `Olá! Gostaria de pedir:\n\n🐟 ${produto}\n📦 Quantidade: ${qtd} kg\n💰 Valor estimado: ${valor}\n\nPoderia confirmar disponibilidade?`;
    window.open(`https://wa.me/5548991463968?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function pedirWhatsApp(produto, preco) {
    const msg = `Olá! Gostaria de pedir:\n\n🐟 ${produto} (${preco})\n\nPoderia confirmar disponibilidade e quantidade mínima?`;
    window.open(`https://wa.me/5548991463968?text=${encodeURIComponent(msg)}`, '_blank');
  }

  // Formulário
  function enviarFormulario() {
    let valid = true;
    const nome = document.getElementById('inputNome').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const msg = document.getElementById('inputMsg').value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    document.getElementById('fgNome').classList.toggle('error', !nome);
    document.getElementById('fgEmail').classList.toggle('error', !email || !emailRe.test(email));
    document.getElementById('fgMsg').classList.toggle('error', !msg);

    if (!nome || !email || !emailRe.test(email) || !msg) return;

    document.getElementById('formSuccess').classList.add('show');
    document.getElementById('inputNome').value = '';
    document.getElementById('inputEmail').value = '';
    document.getElementById('inputMsg').value = '';
    setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 5000);
  }