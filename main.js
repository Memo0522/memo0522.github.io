//service worker
if ('serviceWorker' in navigator) {
    console.log('Puedes usar los serviceworker del navegador');

    navigator.serviceWorker.register('./sw.js')
        .then(res => console.log('service worker registrado correctamente', res))
        .catch(err => console.log('service worker no se ha podido registrar', err));
}else {
    console.log('No puedes usar los serviceworker del navegador');
}

//scroll suavizado
$(document).ready(function(){
    $("#menu a").click(function(e){
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });
        return false;
    });
});