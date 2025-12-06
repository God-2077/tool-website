// Base64 编码/解码功能
document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const encodeBtn = document.getElementById('encode-btn');
    const decodeBtn = document.getElementById('decode-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    
    
    // Base64 编码
    encodeBtn.addEventListener('click', function() {
        const text = inputText.value.trim();
        if (!text) {
            showAlert('请输入要编码的文本', 'warning');
            return;
        }
        
        try {
            // 使用btoa进行Base64编码
            const encoded = btoa(unescape(encodeURIComponent(text)));
            outputText.value = encoded;
        } catch (error) {
            showAlert('编码过程中发生错误: ' + error.message, 'error');
        }
    });
    
    // Base64 解码
    decodeBtn.addEventListener('click', function() {
        const text = inputText.value.trim();
        if (!text) {
            showAlert('请输入要解码的Base64文本', 'warning');
            return;
        }
        
        try {
            // 使用atob进行Base64解码
            const decoded = decodeURIComponent(escape(atob(text)));
            outputText.value = decoded;
        } catch (error) {
            showAlert('解码过程中发生错误，请检查输入是否为有效的Base64编码', 'error');
        }
    });
    
    // 清空输入和输出
    clearBtn.addEventListener('click', function() {
        inputText.value = '';
        outputText.value = '';
        inputText.focus();
    });
    
    // 复制结果
    copyBtn.addEventListener('click', function() {
        if (!outputText.value) {
            showAlert('没有内容可复制', 'warning');
            return;
        }
        
        outputText.select();
        document.execCommand('copy');
        
        // 显示复制成功提示
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '已复制!';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });
    
    
});
