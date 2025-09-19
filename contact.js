
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

// Função de cadastro
async function view() {
  try {
    const { data, error } = await supabase
      .from('networking')
      .select('*'); 

    if (error) throw error;

    let html = `
      <div id="tabela-wrapper" style="overflow-x: auto; width: 100%; padding: 10px; box-sizing: border-box; max-width: 100vw;">
        <div style="display: block; width: 100%;">
          <table border="1" class="tabela-networking mt-4" cellpadding="8"
            style="border-collapse: collapse; text-align: center; width: 100%; table-layout: auto; font-size: 14px; margin: 0 auto;">
            <thead>
              <tr>
                <th style="max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Nome</th>
                <th style="max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Email</th>
                <th style="max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">GitHub</th>
                <th style="max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Cidade</th>
                <th style="max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Projeto Principal</th>
              </tr>
            </thead>
            <tbody>
    `;

    data.forEach(item => {
      html += `
        <tr>
          <td style="max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.nome || 'Não inseriu'}</td>
          <td style="max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.email || 'Não inseriu'}</td>
          <td style="max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.git || 'Não inseriu'}</td>
          <td style="max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.cidade || 'Não inseriu'}</td>
          <td style="max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            <a href="${item.projeto_principal || '#'}" target="_blank" rel="noopener noreferrer">
              &#128064;
            </a>
          </td>
        </tr>
      `;
    });

    html += `
            </tbody>
          </table>
        </div>
      </div>
    `;

    document.getElementById("tabela-networking").innerHTML = html;

  } catch (error) {
    console.error("Erro ao buscar dados:", error.message);
    document.getElementById("tabela-networking").innerHTML =
      `<p style="color:red;">Erro ao carregar dados.</p>`;
  }
}