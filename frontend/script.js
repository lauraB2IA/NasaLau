document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('apodForm');
    const birthdateInput = document.getElementById('birthdate');
    const resultCard = document.getElementById('result');
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    // DOM Elements for APOD data
    const apodTitle = document.getElementById('apodTitle');
    const mediaContainer = document.getElementById('mediaContainer');
    const apodDate = document.getElementById('apodDate');
    const apodDescription = document.getElementById('apodDescription');
    const copyright = document.getElementById('copyright');

    // Set max date to today
    const today = new Date().toISOString().split('T')[0];
    birthdateInput.setAttribute('max', today);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const date = birthdateInput.value;
        if (!date) return;

        // Reset UI
        resultCard.classList.add('hidden');
        errorMessage.classList.add('hidden');
        loader.classList.remove('hidden');

        try {
            // Fetch from local backend
            const response = await fetch(`http://localhost:8000/api/apod?date=${date}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Erro ao buscar os dados da NASA.');
            }

            renderApod(data);
        } catch (error) {
            showError(error.message);
        } finally {
            loader.classList.add('hidden');
        }
    });

    function renderApod(data) {
        apodTitle.textContent = data.title;

        // Format Date nicely
        const dateObj = new Date(data.date + 'T00:00:00'); // Prevent timezone shift
        apodDate.textContent = dateObj.toLocaleDateString('pt-BR', {
            day: '2-digit', month: 'long', year: 'numeric'
        });

        apodDescription.textContent = data.explanation;

        if (data.copyright) {
            copyright.textContent = `© ${data.copyright}`;
        } else {
            copyright.textContent = '';
        }

        // Handle Image vs Video
        mediaContainer.innerHTML = '';
        if (data.media_type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = data.url;
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            mediaContainer.appendChild(iframe);
        } else {
            const img = document.createElement('img');
            img.src = data.url;
            img.alt = data.title;
            // High-res image available, optionally wrap in anchor
            const a = document.createElement('a');
            a.href = data.hdurl || data.url;
            a.target = '_blank';
            a.appendChild(img);
            mediaContainer.appendChild(a);
        }

        resultCard.classList.remove('hidden');
    }

    function showError(message) {
        errorText.textContent = message;
        errorMessage.classList.remove('hidden');

        // Specific error for DEMO_KEY limitation
        if (message.includes("Invalid NASA API Key")) {
            errorText.innerHTML = `Chave da API NASA inválida. <br><small>Por favor, adicione sua chave real no arquivo <code>backend/.env</code> e reinicie o servidor.</small>`;
        } else if (message.includes("Rate limit exceeded")) {
            errorText.innerHTML = `Limite de requisições excedido (DEMO_KEY). <br><small>A NASA limita o uso da chave de demonstração. Por favor, adicione sua própria chave no arquivo <code>backend/.env</code> para continuar explorando.</small>`;
        }
    }
});
