/**------------------------------- SHOW POP-UP -------------------------------**/
//Modal SHOW  DOM///
var modal = document.getElementById('modal-container')
var registerClick = document.getElementById('register');
var closeModal = document.getElementById('closeModal')

// //===Modal Show==//
if (registerClick) {
    registerClick.addEventListener('click', () => {
        modal.classList.add('modal__active')
        modal.classList.remove('modal__transition')
    })
}
// //==Modal hidden==//
if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('modal__active')
        modal.classList.add('modal__transition')
    })
}