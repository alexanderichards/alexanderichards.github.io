document.addEventListener("DOMContentLoaded", (event) => {
    particlesJS.load('particles-js', 'particles.json');

    const errorMsg = document.getElementById('errorMessage');
    const enviarHtml = document.getElementById('enviarHtml');
    const iconMsg = document.getElementById('iconMsg');
    const iconLoader = document.getElementById('iconLoader');
    const form = document.getElementById('form');

    iconLoader.style.display = "none";
    errorMsg.style.display = "none";

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let nameInput = document.getElementById('name');
        let emailInput = document.getElementById('email');
        let messageInput = document.getElementById('message');

        const message = `<div>${messageInput.value}<br><br><hr>from: ${nameInput.value}<br>email: ${emailInput.value}</div>`;

        const formData = {
            message: message,
        }
        if (nameInput.value == "" || emailInput.value == "" || messageInput.value == "") {
            errorMsg.style.display = "block";
        } else {
            iconLoader.style.display = "inline-block";
            iconMsg.style.display = "none";
            enviarHtml.innerHTML = "Enviando...";
            const url = 'https://lp2r8uah15.execute-api.us-east-1.amazonaws.com/Prod/send'
            const statusCode = await consultarApi(url, formData).then(data => data.status);
            if (statusCode === 200) {
                errorMsg.style.display = "none"
                iconLoader.style.display = "none";
                iconMsg.style.display = "inline-block";
                enviarHtml.innerHTML = "Enviar";
                swal("¡Esta hecho!", "Tu mensaje fue enviado exitosamente", "success")
                    .then(() => {
                        nameInput.value = "";
                        emailInput.value = "";
                        messageInput.value = "";
                        location.replace("#main");
                    });
            } else {
                errorMsg.style.display = "none"
                iconLoader.style.display = "none";
                iconMsg.style.display = "inline-block";
                enviarHtml.innerHTML = "Enviar";
                swal("Algo salio mal", "Intenta nuevamente", "error")
            }
        }
    })

    const consultarApi = async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch(error => {
            errorMsg.style.display = "none"
            iconLoader.style.display = "none";
            iconMsg.style.display = "inline-block";
            enviarHtml.innerHTML = "Enviar";
            swal("Algo salio mal", "Intenta nuevamente", "error")
            return error;
        });
        return response;
    }
});
