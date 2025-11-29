document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const errorMessage = document.getElementById('errorMessage');
    const resultsSection = document.getElementById('resultsSection');
    const previewImage = document.getElementById('previewImage');
    const scoresContainer = document.getElementById('scoresContainer');

    analyzeBtn.addEventListener('click', handleAnalyze);
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAnalyze();
    });

    async function handleAnalyze() {
        const url = urlInput.value.trim();

        if (!url) {
            showError('Please enter a valid image URL');
            return;
        }

        // Reset state
        showError('');
        setLoading(true);
        resultsSection.classList.add('hidden');

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to analyze image');
            }

            displayResults(url, data);

        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(false);
        }
    }

    function displayResults(imageUrl, data) {
        previewImage.src = imageUrl;

        // Clear previous results
        scoresContainer.innerHTML = '';

        // Sort results by score descending
        const results = data.result.sort((a, b) => b.score - a.score);

        // Create score elements
        results.forEach(item => {
            const scorePercent = (item.score * 100).toFixed(1);

            const scoreItem = document.createElement('div');
            scoreItem.className = 'score-item';
            scoreItem.innerHTML = `
                <div class="score-header">
                    <span class="label-name">${item.label}</span>
                    <span class="score-value">${scorePercent}%</span>
                </div>
                <div class="progress-bg">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
            `;

            scoresContainer.appendChild(scoreItem);

            // Animate bar after a small delay
            setTimeout(() => {
                scoreItem.querySelector('.progress-fill').style.width = `${scorePercent}%`;
            }, 100);
        });

        // Update verdict
        const topResult = results[0];
        const verdictDiv = document.getElementById('verdict');
        verdictDiv.innerHTML = `
            <div class="verdict-label">Classification</div>
            <div class="verdict-value" style="color: ${topResult.label.toLowerCase().includes('real') ? 'var(--success)' : 'var(--secondary)'}">
                ${topResult.label.toUpperCase()}
            </div>
        `;

        resultsSection.classList.remove('hidden');

        // Scroll to results
        setTimeout(() => {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    function setLoading(isLoading) {
        if (isLoading) {
            analyzeBtn.classList.add('loading');
            analyzeBtn.disabled = true;
            urlInput.disabled = true;
        } else {
            analyzeBtn.classList.remove('loading');
            analyzeBtn.disabled = false;
            urlInput.disabled = false;
        }
    }

    function showError(msg) {
        errorMessage.textContent = msg;
        if (msg) {
            // Simple shake effect via inline style or class
            errorMessage.style.transform = 'translateX(0)';
            // Trigger reflow
            void errorMessage.offsetWidth;
            errorMessage.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
        } else {
            errorMessage.style.animation = 'none';
        }
    }
});
