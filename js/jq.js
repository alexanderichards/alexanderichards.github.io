$(function () {
    const errorMsg = document.getElementById('errorMessage');
    const enviarHtml = document.getElementById('enviarHtml');
    const iconMsg = document.getElementById('iconMsg');
    const iconLoader = document.getElementById('iconLoader');

    iconLoader.style.display = "none";

    errorMsg.style.display = "none";

    $('#form').submit(function (e) {
        e.preventDefault();
        const nameValue = document.getElementById('name').value;
        const emailValue = document.getElementById('email').value;
        const messageValue = document.getElementById('message').value;

        const message = `<div>${messageValue}<br><br><hr>from: ${nameValue}<br>email: ${emailValue}</div>`;

        const formData = {
            message: message,
        }

        if (nameValue == "" || emailValue == "" || messageValue == "") {
            errorMsg.style.display = "block";
        } else {
            iconLoader.style.display = "inline-block";
            iconMsg.style.display = "none";
            enviarHtml.innerHTML = "Enviando...";
            $.ajax({
                type: "POST",
                url: 'https://lp2r8uah15.execute-api.us-east-1.amazonaws.com/Prod/send',
                data: JSON.stringify(formData),
                success: function () {
                    errorMsg.style.display = "none"
                    iconLoader.style.display = "none";
                    iconMsg.style.display = "inline-block";
                    enviarHtml.innerHTML = "Enviar";
                    swal("¡Esta hecho!", "Tu mensaje fue enviado exitosamente", "success")
                        .then(() => {
                            $("#name").val("");
                            $("#email").val("");
                            $("#message").val("");
                            location.replace("#main");
                        });
                },
                error: function () {
                    errorMsg.style.display = "none"
                    iconLoader.style.display = "none";
                    iconMsg.style.display = "inline-block";
                    enviarHtml.innerHTML = "Enviar";
                    swal("Algo salio mal", "Intenta nuevamente", "error")
                }
            });
        }
    });
});
