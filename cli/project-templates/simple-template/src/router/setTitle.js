const setTitle = (title) => {
    document.title = title;
    const mobile = navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(mobile)) {
        const iframe = document.createElement('iframe');

        iframe.style.display = 'none';
        iframe.setAttribute('src', '/favicon.ico');
        const iframeCallback = function () {
            setTimeout(function () {
                iframe.removeEventListener('load', iframeCallback);
                document.body.removeChild(iframe);
            }, 0);
        };

        iframe.addEventListener('load', iframeCallback);
        document.body.appendChild(iframe);
    }
};

export { setTitle };
