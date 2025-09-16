// Configuração do Supabase - Substitua com suas credenciais reais do dashboard

const supabaseUrl = 'https://qdzdweqjtizvwzscryno.supabase.co'; // Ex.: https://xyzabc.supabase.co
const supabaseKey = 'sb_publishable__FRk55PgwNjd69mLHPbTlg_OWzInQBR'; // Ex.: sb_publishable_FkR5SPwNjD69mLHPDt1g_0mZInQBR 
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

function rating() {
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
          <label for=""><strong>Insira seu bairro:</strong></label>
          <input id="swal-input3" class="swal2-input">
          <label for=""><strong>Insira sua cidade:</strong></label>
          <input id="swal-input4" class="swal2-input">
          <label for=""><strong>Insira sua idade:</strong>:</label>
          <input id="swal-input5" class="swal2-input" type="number">
          </section>
  
          <section>
          <button id="btn5" class="swal2-confirm swal2-styled btn-swipper form-btn" >
           <i class="fa-regular fa-face-angry fa-2xl"></i> Confirmar
          </button>
          </section>

        </div>
      `);

 
    },
    showConfirmButton: false,
    showCancelButton: false
  });
}