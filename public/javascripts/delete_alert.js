//監聽deleteButton， 按下按鈕跳出視窗詢問是否刪除資料

//選擇全部deleteButton
const deleteButtons = document.querySelectorAll('.delete-button')

//在全部的deleteButton設置監聽器
deleteButtons.forEach(deleteButton => {
  deleteButton.addEventListener('click', function deleteAlert(event) {
    //取得data-id的資料
    const record_id = deleteButton.dataset.id

    //確認是否刪除資料，確定刪除指向 delete的路由
    if (confirm('確認刪除此筆資料嗎?')) {
      alert('已刪除資料!')
      return axios.post(`/expenses/${record_id}?_method=DELETE`)
        .then(() => window.location.href = '/')
        .catch(err => console.log(err))
    }
  })
})