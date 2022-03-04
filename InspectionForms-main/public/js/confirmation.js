
document.getElementById("formConfirm").onclick = function () { showConfirmation() };
var overlayme = document.getElementById("lock-modal");
var popup = document.getElementById("popup");

function showConfirmation() {
    overlayme.style.display = "flex";
    popup.style.display = "block";
}

// If confirm btn is clicked , the function confim() is executed
document.getElementById("okButton").onclick = function () { confirm() };
function confirm() {
    overlayme.style.display = "none";
    popup.style.display = "none";

}

// If cancel btn is clicked , the function cancel() is executed
document.getElementById("cancelButton").onclick = function () { cancel() };
function cancel() {
    overlayme.style.display = "none";
    popup.style.display = "none";
}