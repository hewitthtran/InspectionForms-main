function displayPrompt(promptId, validateId, priorityId) {
    var x = document.getElementById(promptId);
    var y = document.getElementById(validateId);
    var z = document.getElementById(priorityId);
    if (x.style.display === "flex") {
        x.style.display = "none";
        y.required = false;
        z.required = false;
    }
    else {
        x.style.display = "flex";
        x.style.justifyContent = "flex-start"
        y.required = true;
        y.focus();
        z.required = true;
    }
}
