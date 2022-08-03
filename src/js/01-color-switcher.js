const btnStart = document.querySelector("[data-start]")
const btnStop = document.querySelector("[data-stop]")
const body = document.querySelector("body")
let setTimeoutHandler = 0

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

function bgColorChanger(){
    setTimeoutHandler = setTimeout(() => {
        body.style.backgroundColor = getRandomHexColor();
        if(btnStart.getAttribute("disabled")){
            bgColorChanger();
        }
    },1000)
}

btnStart.addEventListener("click", (ev) => {
    if(!btnStart.getAttribute("disabled")){
        btnStart.setAttribute("disabled","disabled")
    }
    bgColorChanger()
})

btnStop.addEventListener("click", (ev) => {
    if(!btnStart.getAttribute("disabled")){
        return 
    }
    btnStart.removeAttribute("disabled")
    clearTimeout(setTimeoutHandler)
    setTimeoutHandler = 0
})