$(document).ready(function () {
    const lockModal = $("#lock-modal");
    const loadingCircle = $("#loader");
    const form = $("#checklistForm");

    form.on('submit', function (e) {
        // e.preventDefault();

        lockModal.css("display", "block");
        loadingCircle.css("display", "block");

    })
})
