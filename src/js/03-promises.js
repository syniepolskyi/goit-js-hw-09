import { Notify } from 'notiflix/build/notiflix-notify-aio'
import "notiflix/dist/notiflix-3.2.5.min.css"

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position:position, delay:delay});
      } else {
        reject({position:position, delay:delay});
      }
    }, delay);
  });

  return promise;
}

function validate(form){
  const keys = ['amount', 'delay', 'step']
  return keys.reduce((acc,key) =>{
    let v = parseInt(form.elements[key].value,10)
    let valid = (!isNaN(v) && v > 0)
    if(!valid){
      Notify.warning(`${key} must be integer > 0`)
    }
    return acc && valid
  }, true)
}

function doPromises(data){
  let {position, form} = data
  const elems = form.elements
  const amount = parseInt(elems['amount'].value,10)
  const delay = parseInt(elems['delay'].value,10)
  const step = parseInt(elems['step'].value,10)
  let currDelay = step
  if(position === 1){
    form.setAttribute("pending","true")
    currDelay = delay
  }
  const promise = createPromise(position, currDelay )
  promise.then((data) => {
    const {position, delay} = data
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
  })
  .catch((data) => {
    const {position, delay} = data
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
  })
  .finally(() => {
    if(position < amount){
      data.position++
      return doPromises(data)
    }
    form.removeAttribute("pending")
  })

}


const form = document.querySelector('form.form')

form.addEventListener("submit", (ev) => {
  ev.preventDefault()
  if(ev.currentTarget.getAttribute("pending")){
    return
  }
  if(!validate(ev.currentTarget)){
    return
  }
  const data = {
    position: 1,
    form: ev.currentTarget
  }
  doPromises(data)
})


