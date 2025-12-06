import CryptoJS from 'crypto-js'
import { showAlert } from './main.js'

// 加密模式选择
function initModeSelection() {
  const modeOptions = document.querySelectorAll('.mode-option')
  modeOptions.forEach(option => {
    option.addEventListener('click', function() {
      modeOptions.forEach(opt => opt.classList.remove('active'))
      this.classList.add('active')
      const radio = this.querySelector('input[type="radio"]')
      radio.checked = true
    })
  })
}

// AES加密解密功能
function initAESFunctions() {
  const inputText = document.getElementById('input-text')
  const outputText = document.getElementById('output-text')
  const keyInput = document.getElementById('key-input')
  const encryptBtn = document.getElementById('encrypt-btn')
  const decryptBtn = document.getElementById('decrypt-btn')
  const clearBtn = document.getElementById('clear-btn')
  const copyBtn = document.getElementById('copy-btn')

  // 清空按钮事件
  clearBtn.addEventListener('click', function() {
    inputText.value = ''
    outputText.value = ''
    keyInput.value = ''
  })

  // 复制按钮事件
  copyBtn.addEventListener('click', function() {
    if (outputText.value) {
      navigator.clipboard.writeText(outputText.value)
        .then(() => showAlert('结果已复制到剪贴板'))
        .catch(err => showAlert('复制失败: ' + err))
    } else {
      showAlert('没有内容可复制')
    }
  })

  // 加密按钮事件
  encryptBtn.addEventListener('click', function() {
    const text = inputText.value.trim()
    const key = keyInput.value.trim()
    const mode = document.querySelector('input[name="mode"]:checked').value

    if (!text) {
      showAlert('请输入要加密的文本')
      return
    }

    if (!key) {
      showAlert('请输入密钥')
      return
    }

    try {
      let encrypted
      if (mode === 'CBC') {
        // CBC模式需要IV
        const iv = CryptoJS.lib.WordArray.random(16)
        encrypted = CryptoJS.AES.encrypt(text, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        })
        // 将IV和加密结果组合在一起
        const result = iv.toString() + encrypted.toString()
        outputText.value = result
      } else {
        // ECB模式
        encrypted = CryptoJS.AES.encrypt(text, key, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        })
        outputText.value = encrypted.toString()
      }
    } catch (error) {
      showAlert('加密失败: ' + error.message)
    }
  })

  // 解密按钮事件
  decryptBtn.addEventListener('click', function() {
    const text = inputText.value.trim()
    const key = keyInput.value.trim()
    const mode = document.querySelector('input[name="mode"]:checked').value

    if (!text) {
      showAlert('请输入要解密的文本')
      return
    }

    if (!key) {
      showAlert('请输入密钥')
      return
    }

    try {
      let decrypted
      if (mode === 'CBC') {
        // CBC模式需要提取IV
        const iv = CryptoJS.enc.Hex.parse(text.substring(0, 32))
        const encryptedText = text.substring(32)
        decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        })
      } else {
        // ECB模式
        decrypted = CryptoJS.AES.decrypt(text, key, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        })
      }
      
      const plaintext = decrypted.toString(CryptoJS.enc.Utf8)
      if (plaintext) {
        outputText.value = plaintext
      } else {
        showAlert('解密失败，请检查密钥和加密模式是否正确')
      }
    } catch (error) {
      showAlert('解密失败: ' + error.message)
    }
  })
}


document.addEventListener('DOMContentLoaded', () => {
  initModeSelection()
  initAESFunctions()
})
