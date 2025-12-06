// 主题切换功能
document.addEventListener('DOMContentLoaded', function() {
  const themeSwitcher = document.getElementById('theme-switcher');
  const html = document.documentElement;

  // 检查本地存储中的主题设置
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  // 设置切换按钮的初始状态
  if (savedTheme === 'dark') {
    themeSwitcher.checked = true;
  }

  // 切换主题
  themeSwitcher.addEventListener('change', function() {
    if (this.checked) {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });


});


// 获取弹窗元素
const alertModal = document.getElementById('my_alert');
const alertContent = document.getElementById('my_alert_content');

// 显示提示信息（使用 daisyUI 弹窗）
function showAlert(message, type) {
  // 设置弹窗内容
  alertContent.textContent = message;

  // 根据类型设置弹窗标题和样式
  const titleElement = alertModal.querySelector('h3');
  const modalBox = alertModal.querySelector('.modal-box');

  // 移除之前的样式类
  // modalBox.classList.remove('alert-warning', 'alert-error');

  // if (type === 'warning') {
  // titleElement.textContent = '警告';
  // modalBox.classList.add('alert-warning');
  // } else {
  // titleElement.textContent = '错误';
  // modalBox.classList.add('alert-error');
  // }

  // 显示弹窗
  alertModal.showModal();

  // 3秒后自动关闭弹窗（可选）
  // setTimeout(() => {
  // if (alertModal.open) {
  // alertModal.close();
  // }
  // }, 3000);
}
window.showAlert = showAlert;