import axios from 'axios'
// 后端地址
const backendUrl = "https://ijkkjmnmltcd.sealoshzh.site"


// 登录请求
const login = async(username,password)=>{
  try {
    const response = await axios.post(`${backendUrl}/api/login`,{
      username,
      password
    })
    return response.data
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
}

// 注册请求
const register = async(username,email,password)=>{
  try {
    const response = await axios.post(`${backendUrl}/api/register`,{
      username,
      password,
      email
    })
    return response.data
  } catch (error) {
    console.error('注册失败:', error);
    throw error;
  }
}

export {login,register}