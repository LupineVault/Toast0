const lupine = (function () {

    (function loadFontAwesome() {
        const existingLink = document.querySelector('link[href*="font-awesome"], link[href*="fontawesome"]');
        if (!existingLink) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
            link.integrity = 'sha512-4U5HpCqkGbbMQOYZbD9ke8I7D6IMFCEu9SP1y3hUib4sUKn6x6R6AfBj0AiYkELg9jVYOJ9fQJgwjQZz9Uv1ig==';
            link.crossOrigin = 'anonymous';
            link.referrerPolicy = 'no-referrer';
            document.head.appendChild(link);
        }
    })();
    let container = document.getElementById('lupine-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'lupine-container';
        document.body.appendChild(container);
        Object.assign(container.style, {
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        });
    }

    function createToast(type, color, iconClass, title, message) {
        const toast = document.createElement('div');
        toast.className = 'lupine-toast';
        toast.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                background: ${color};
                color: white;
                padding: 10px 15px;
                border-radius: 5px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                min-width: 250px;
                position: relative;
                font-family: sans-serif;
            ">
                <i class="${iconClass}" style="margin-right: 10px;"></i>
                <div style="flex: 1;">
                    <strong style="display: block;">${title}</strong>
                    <span>${message}</span>
                </div>
                <i class="fas fa-times" style="margin-left: 10px; cursor: pointer;"></i>
            </div>
        `;

        const closeBtn = toast.querySelector('.fa-times');
        closeBtn.addEventListener('click', () => container.removeChild(toast));

        container.appendChild(toast);

        setTimeout(() => {
            if (container.contains(toast)) container.removeChild(toast);
        }, 5000);
    }

    return {
        success(title = "Success", message = "") {
            createToast("success", "#28a745", "fas fa-check-circle", title, message);
        },
        info(title = "Info", message = "") {
            createToast("info", "#17a2b8", "fas fa-info-circle", title, message);
        },
        error(title = "Error", message = "") {
            createToast("error", "#dc3545", "fas fa-exclamation-circle", title, message);
        },
        custom(color = "#333", content = {}) {
            const title = Object.keys(content)[0] || "Notice";
            const message = content[title] || "";
            createToast("custom", color, "fas fa-bell", title, message);
        }
    };
})();
