module.exports = {
  authenticator: (req, res, next) => {
    //判斷是否有登入
    if (req.isAuthenticated()) {
      //已登入，執行下一步驟
      return next()
    }
    //沒有登入，回到登入頁面 
    return res.redirect('/users/login')
  }
}