function initPopup() {

    chrome.storage.local.get({
        GLB_Enabled: true
    }, function (items) {
        $('#enable-autolog').prop('checked', items.GLB_Enabled);
    });

    $('#enable-autolog').change(function () {

        chrome.storage.local.set({

            GLB_Enabled: $(this).is(':checked')

        }, function () {

            $('#autolog-toast').removeClass('autolog-toast-hidden');
            setTimeout(function () {
                $('#autolog-toast').addClass('autolog-toast-hidden');
            }, 2000);

        });

    });

    $('#more-options').on('click', function () {
        chrome.runtime.openOptionsPage();
    });

}

initPopup();