document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const tbody = document.querySelector('tbody');
  
    
    const loadProdutos = async () => {
      try {
        const response = await fetch('http://localhost:3000/produtos');
        const products = await response.json();
  
        tbody.innerHTML = '';
        products.forEach(product => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${product.productname}</td>
            <td>${product.productbrand}</td>
            <td>${product.productamount}</td>
            <td>
              <button class="btn-action edit" data-id="${product.id}">
                <span class="material-symbols-outlined">edit</span>
              </button>
              <button class="btn-action delete" data-id="${product.id}">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </td>`;
          tbody.appendChild(tr);
        });
      } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
      }
    };
  
    
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const brand = document.querySelector('input[placeholder="Brand"]').value;
      const amount = document.querySelector('input[placeholder="Amount"]').value;
  
      try {
        await fetch('http://localhost:3000/produtos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productname: name, productbrand: brand, productamount: amount }),
        });
  
        form.reset();
        loadProdutos();
      } catch (error) {
        console.error('Erro ao adicionar produto:', error);
      }
    });
  
   
    tbody.addEventListener('click', async (event) => {
      if (event.target.closest('.edit')) {
        const id = event.target.closest('.edit').dataset.id;
  
        const name = prompt('adicionar novo name:');
        const brand = prompt('adicionar novo brand:');
        const amount = prompt('adicionar novo  amount:');
  
        if (name && brand && amount) {
          try {
            await fetch(`http://localhost:3000/produtos/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ productname: name, productbrand: brand, productamount: amount }),
            });
  
            loadProdutos();
          } catch (error) {
            console.error('Erro ao editar produto:', error);
          }
        }
      }
    });
   
    tbody.addEventListener('click', async (event) => {
        if (event.target.closest('.delete')) {
          const id = event.target.closest('.delete').dataset.id;
    
          try {
            await fetch(`http://localhost:3000/produtos/${id}`, {
              method: 'DELETE',
            });
    
            loadProdutos();
          } catch (error) {
            console.error('Erro ao excluir produto:', error);
          }
        }
      });
    loadProdutos();
  });
  //ideias: fazer uma barra de rolagem, mudar a forma de edit construindo uma area nova html,,,, talvez..., estilizar melhor e construir algo que lide com a criaçao de janelas, nao esquecer do problema da UUID no back-end.