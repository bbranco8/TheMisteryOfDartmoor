function check_screen_size() {
    const screen_message = document.querySelector("#screen_message");
    const mainContent = document.querySelector("main");

    if (window.innerWidth <= 1280) {
        screen_message.classList.remove("invisible"); 
        mainContent.style.visibility = "hidden"; 
    } else {
        screen_message.classList.add("invisible"); 
        mainContent.style.visibility = "visible"; 
    }
}


window.addEventListener("load", check_screen_size);
window.addEventListener("resize", check_screen_size);
window.addEventListener("load", check_screen_size);
window.addEventListener("resize", check_screen_size);