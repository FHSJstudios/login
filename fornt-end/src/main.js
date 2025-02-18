import './style.css'
import { login as backEndLogin, register as backEndRegister } from './services/api'



// // 切换登录和注册表单的显示

const registers = document.querySelector('.register-link')
const logins = document.querySelector('.login-link')

registers.addEventListener('click',()=>{
  const loginForm = document.querySelector('.login-form')
  const registerForm = document.querySelector('.register-form')

  loginForm.style.display = 'none'
  registerForm.style.display = 'block'
})

logins.addEventListener('click',()=>{
  const loginForm = document.querySelector('.login-form')
  const registerForm = document.querySelector('.register-form')

  loginForm.style.display = 'block'
  registerForm.style.display = 'none'
})



//用户登录数据获取

const loginButton = document.querySelector('#loginButton')

loginButton.addEventListener('click', async (e) => {
  e.preventDefault() //阻止表单默认提交

  const username = document.querySelector('#loginUsername').value
  const password = document.querySelector('#loginPassword').value
  try {
    const backEndResult = await backEndLogin(username, password)
    console.log('完整返回数据：', backEndResult)
    if(backEndResult.code === 200){
      console.log('登录成功信息：', backEndResult.message)
      console.log('用户信息：', backEndResult.user)
      alert(backEndResult.message)
      window.location.href = '/src/page/home.html'
    }
  } catch (error) {
    if(error.response.status === 400){
      alert(error.response.data.message)
    }
    if(error.response.status === 401){
      alert(error.response.data.message)
    }
    if(error.response.status === 500){
      alert(error.response.data.message)
    }
  }
})


//用户注册数据获取

const registerButton = document.querySelector('#registerButton')

registerButton.addEventListener('click', async (e) => {
  e.preventDefault() //阻止表单默认提交

  const username = document.querySelector('#registerUsername').value
  const email = document.querySelector('#registerEmail').value
  const password = document.querySelector('#registerPassword').value
  const confirmPassword = document.querySelector('#registerConfirmPassword').value
  
  if(password !== confirmPassword){
    alert('两次密码不一致')
    return
  }
  
  try{
    const backEndResult = await backEndRegister(username, email, password)
    console.log('完整返回数据：', backEndResult)
    if(backEndResult.code === 201){
      alert(backEndResult.message)
      window.location.href = '/src/page/login.html'
    }
  } catch (error) {
    if(error.response.status === 400){
      alert(error.response.data.message)
    }
    if(error.response.status === 401){
      alert(error.response.data.message)
    }
    if(error.response.status === 500){
      alert(error.response.data.message)
    }
  }
})    