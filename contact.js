// Configuração do Supabase - Substitua com suas credenciais reais do dashboard

const supabaseUrl = 'https://qdzdweqjtizvwzscryno.supabase.co'; // Ex.: https://xyzabc.supabase.co
const supabaseKey = 'sb_publishable__FRk55PgwNjd69mLHPbTlg_OWzInQBR'; // Ex.: sb_publishable_FkR5SPwNjD69mLHPDt1g_0mZInQBR 
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

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
        <label for=""><strong>Insira seu nome:</strong></label>
          <input id="swal-input1" class="swal2-input">
          <label for=""><strong>Insira seu e-mail:</strong></label>
          <input id="swal-input2" class="swal2-input">
          <label for=""><strong>Insira seu github:</strong></label>
          <input id="swal-input3" class="swal2-input">
          <label for=""><strong>Insira sua cidade:</strong></label>
          <input id="swal-input4" class="swal2-input">
          <label for=""><strong>Projeto principal:</strong></label>
          <input id="swal-input5" class="swal2-input">
          </section>
  
          <section>
          <button id="btn5" class="swal2-confirm swal2-styled btn-swipper form-btn" >
           <i class="fa-regular fa-face-angry fa-2xl"></i> Confirmar
          </button>
          </section>

        </div>
      `);

      // Função para enviar feedback pro Supabase
      async function sendNetworking(nome, email,git,cidade,projeto_principal) {
        try {
          const { data, error } = await supabase
            .from('networking')
            .insert([{ nome: nome, email: email, git:git, cidade:cidade,projeto_principal:projeto_principal }]);
          if (error) throw error;
          // Alerta fixo e independente
          return Swal.fire({
            title: 'Cadastro realizado com sucesso!',
            icon: 'success',
            showConfirmButton: true,
            timer: null, // Garante que não fecha sozinho
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        } catch (error) {
          console.error('Erro ao salvar no Supabase:', error.message);
          return Swal.fire({
            title: 'Erro!',
            text: 'Falha ao salvar feedback. Verifique a conexão e tente novamente.',
            icon: 'error',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        }
      }

      // Eventos do btn
    
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
    showConfirmButton: false,
    showCancelButton: false
  });
}