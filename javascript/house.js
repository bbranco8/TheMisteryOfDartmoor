document.addEventListener('DOMContentLoaded', function() {
    let tv = document.querySelector("#tv");
    let tvOn = false; 

    let tv_cabinet = document.querySelector("#tv_cabinet");

    tv.addEventListener("click", function () {
        if (!tvOn) {
            tv.src = "images/house/tv_on.png"; 
            tv.style.width = "20%"; 
        } else {
            tv.src = "images/house/tv_off.png"; 
            tv.style.width = "20%"; 
        }
        tvOn = !tvOn; 
    });

    tv_cabinet.addEventListener("click", function () {
        window.location.href = "house_drawer.html";
    });
});