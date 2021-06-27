const box = document.getElementById('box');

box.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch ('registration.html', {
        method: 'post',
        body: formData
        }).then(function (response) {
            return response.text();
        }).then(function (text) {

    }


}