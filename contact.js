
// Configuração do Supabase - Substitua com suas credenciais reais do dashboard
const supabaseUrl = 'https://qdzdweqjtizvwzscryno.supabase.co';
const supabaseKey = 'sb_publishable__FRk55PgwNjd69mLHPbTlg_OWzInQBR';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// ========== Função de Cadastro ==========
function contact() {
  Swal.fire({
    title: "<strong>Entre em contato</strong>",
    icon: "info",
    showCloseButton: true,
    didOpen: () => {
      const popup = Swal.getPopup();
      popup.insertAdjacentHTML('beforeend', `
        <div class="form">
          <section class="form-section-input">
            <label><strong>Insira seu nome:</strong></label>
            <input id="swal-input1" class="swal2-input">
            <label><strong>Insira seu e-mail:</strong></label>
            <input id="swal-input2" class="swal2-input">
            <label><strong>Insira seu github:</strong></label>
            <input id="swal-input3" class="swal2-input">
            <label><strong>Insira sua cidade:</strong></label>
            <input id="swal-input4" class="swal2-input">
            <label><strong>Projeto principal:</strong></label>
            <input id="swal-input5" class="swal2-input">
          </section>

          <section>
            <button id="btn5" class="swal2-confirm swal2-styled btn-swipper form-btn">
              <i class="fa-regular fa-face-angry fa-2xl"></i> Confirmar
            </button>
          </section>
        </div>
      `);

      // Função para enviar para Supabase
      async function sendNetworking(nome, email, git, cidade, projeto_principal) {
        try {
          const { data, error } = await supabase
            .from('networking')
            .insert([{ nome, email, git, cidade, projeto_principal }]);

          if (error) throw error;

          Swal.fire({
            title: 'Cadastro realizado com sucesso!',
            icon: 'success',
            showConfirmButton: true
          });

          // Atualiza tabela automaticamente depois do cadastro
          view();

        } catch (error) {
          console.error('Erro ao salvar no Supabase:', error.message);
          Swal.fire({
            title: 'Erro!',
            text: 'Falha ao salvar. Verifique a conexão.',
            icon: 'error',
            showConfirmButton: true
          });
        }
      }

      // Evento do botão confirmar
      document.getElementById('btn5').addEventListener('click', () => {
        const nome = document.getElementById('swal-input1').value.trim();
        const email = document.getElementById('swal-input2').value.trim();
        const git = document.getElementById('swal-input3').value.trim();
        const cidade = document.getElementById('swal-input4').value.trim();
        const projeto_principal = document.getElementById('swal-input5').value.trim();

        sendNetworking(nome, email, git, cidade, projeto_principal)
          .then(() => Swal.close());
      });
    },
    showConfirmButton: false
  });
}

// ========== Função de Visualização ==========
async function view() {
  try {
    const { data, error } = await supabase
      .from('networking')
      .select('*'); // pega todas as colunas

    if (error) throw error;

    // Monta meu html
    let html = `
      <table border="1"  class="tabela-networking  mt-4" cellpadding="8" cellspacing="0" style="border-collapse:collapse;  text-align:left;">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>GitHub</th>
            <th>Cidade</th>
            <th>Projeto Principal</th>
          </tr>
        </thead>
        <tbody>
    `;

    data.forEach(item => {
      html += `
        <tr>
          <td> ${item.nome || 'Não inseriu'}</td>
          <td>${item.email || 'Não inseriu'}</td>
          <td>${item.git || 'Não inseriu'}</td>
          <td>${item.cidade || 'Não inseriu'}</td>
          <td><a href="${item.projeto_principal|| 'Não inseriu'}" target="_blank" rel="noopener noreferrer">&#128064;</a></td>
        
        </tr>
      `;
    });

    html += `</tbody></table>`;

    // Joga na div
    document.getElementById("tabela-networking").innerHTML = html;

  } catch (error) {
    console.error("Erro ao buscar dados:", error.message);
    document.getElementById("tabela-networking").innerHTML = `<p style="color:red;">Erro ao carregar dados.</p>`;
  }
}
