import '../css/styles.css';

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

  // 显示弹窗
  alertModal.showModal();
}

// 导出函数供其他模块使用（如果需要）
export { showAlert };
