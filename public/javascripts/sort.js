const sortBar = document.querySelector('#sort-bar')
const submitButton = document.querySelector('#submit-button')

//若sort-bar有變化則按下submit按鈕
sortBar.addEventListener('input', function categorySort() {
  submitButton.click()
})