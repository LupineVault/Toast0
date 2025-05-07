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

    function createToast(type, color, iconClass, messages = {}, extraInfo = "") {
        const title = Object.keys(messages)[0] || "Notice";
        const message = messages[title] || "";

        const toast = document.createElement('div');
        toast.className = 'lupine-toast';
        toast.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';

        toast.innerHTML = `
            <div class="lupine-toast-inner" style="
                display: flex;
                flex-direction: column;
                background: ${color};
                color: white;
                padding: 10px 15px;
                border-radius: 5px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                min-width: 250px;
                font-family: sans-serif;
                cursor: pointer;
                overflow: hidden;
            ">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="${iconClass}"></i>
                        <div>
                            <strong style="display: block;">${title}</strong>
                            <span>${message}</span>
                        </div>
                    </div>
                    <i class="fas fa-times" style="cursor: pointer;"></i>
                </div>
                <div class="lupine-extra-info" style="
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease;
                    margin-top: 5px;
                    font-size: 0.85em;
                    line-height: 1.4;
                ">${extraInfo}</div>
            </div>
        `;

        const inner = toast.querySelector('.lupine-toast-inner');
        const closeBtn = toast.querySelector('.fa-times');
        const extra = toast.querySelector('.lupine-extra-info');

        // Close button removes toast
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => container.removeChild(toast), 300);
        });

        inner.addEventListener('click', () => {
            if (extra.style.maxHeight === '0px' || !extra.style.maxHeight) {
                extra.style.maxHeight = '500px';
            } else {
                extra.style.maxHeight = '0';
            }
        });

        container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        });

        const timeout = setTimeout(() => {
            if (container.contains(toast) && extra.style.maxHeight === '0px') {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => container.removeChild(toast), 300);
            }
        }, 5000);
    }

    return {
        success(messages = { "Success": "" }, extra = "") {
            createToast("success", "#28a745", "fas fa-check-circle", messages, extra);
        },
        info(messages = { "Info": "" }, extra = "") {
            createToast("info", "#17a2b8", "fas fa-info-circle", messages, extra);
        },
        error(messages = { "Error": "" }, extra = "") {
            createToast("error", "#dc3545", "fas fa-exclamation-circle", messages, extra);
        },
        custom(color = "#333", title = "Notice", messages = { "Custom": "" }, extra = "") {
            createToast("custom", color, "fas fa-bell", { [title]: messages[title] || "" }, extra);
        }
    };
})();
