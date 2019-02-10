function initPopup() {

    function getFeedbackLink() {
        function _getOS() {
            var OSName = "Unknown";
            if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1) OSName = "Windows 10";
            if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName = "Windows 8";
            if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName = "Windows 7";
            if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName = "Windows Vista";
            if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName = "Windows XP";
            if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName = "Windows 2000";
            if (window.navigator.userAgent.indexOf("Mac") != -1) OSName = "Mac/iOS";
            if (window.navigator.userAgent.indexOf("X11") != -1) OSName = "UNIX";
            if (window.navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
            return OSName;
        }

        function _getBrowser() {
            var ua = navigator.userAgent, tem,
                M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return {name: 'IE ', version: (tem[1] || '')};
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\bOPR\/(\d+)/);
                if (tem != null) return {name: 'Opera', version: tem[1]};
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
            return {name: M[0], version: M[1]};
        }

        var urlText = 'https://docs.google.com/forms/d/e/1FAIpQLSf3Wl_Jz8vKXw1xKaFEyeSqQr_wvTaAqazaBgcRoxnhhJG4Xw/viewform?usp=pp_url' +
            '&entry.332394019=' + encodeURI(browser.runtime.getManifest().version) +
            '&entry.1864752170=' + encodeURI(_getBrowser().name + ' ' + _getBrowser().version) +
            '&entry.413002758=' + encodeURI(_getOS());

        return urlText;
    }

    browser.storage.local.get({
        GLB_Enabled: true
    }, function (items) {
        $('#enable-autolog').prop('checked', items.GLB_Enabled);
    });

    $('#report-bug').on('click', function (e) {
        e.preventDefault();
        browser.tabs.create({
            url: getFeedbackLink()
        });
    });

    $('#enable-autolog').change(function () {

        browser.storage.local.set({

            GLB_Enabled: $(this).is(':checked')

        }, function () {

            $('#autolog-toast').removeClass('autolog-toast-hidden');
            setTimeout(function () {
                $('#autolog-toast').addClass('autolog-toast-hidden');
            }, 2000);

        });

    });

    $('#more-options').on('click', function () {
        browser.tabs.create({
            url: browser.runtime.getURL('/html/options.html')
        });
    });

}

initPopup();