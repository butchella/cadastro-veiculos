const form = document.getElementById('form-veiculo');
const lista = document.getElementById('lista-veiculos');

function salvarVeiculos(veiculos) {
  localStorage.setItem('veiculos', JSON.stringify(veiculos));
}

function carregarVeiculos() {
  const dados = localStorage.getItem('veiculos');
  return dados ? JSON.parse(dados) : [];
}

function renderizarLista() {
  lista.innerHTML = '';
  const veiculos = carregarVeiculos();
  veiculos.forEach((v, index) => {
    const li = document.createElement('li');
    li.textContent = `${v.marca} ${v.modelo} (${v.ano})`;
    const btn = document.createElement('button');
    btn.textContent = 'Remover';
    btn.onclick = () => {
      veiculos.splice(index, 1);
      salvarVeiculos(veiculos);
      renderizarLista();
    };
    li.appendChild(btn);
    lista.appendChild(li);
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const ano = document.getElementById('ano').value;

  const veiculo = { marca, modelo, ano };
  const veiculos = carregarVeiculos();
  veiculos.push(veiculo);
  salvarVeiculos(veiculos);
  renderizarLista();
  form.reset();
});

renderizarLista();
