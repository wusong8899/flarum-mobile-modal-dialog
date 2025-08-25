import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Modal from 'flarum/common/components/Modal';
import ModalManager from 'flarum/common/components/ModalManager';

export { default as extend } from './extend';

app.initializers.add('wusong8899-mobile-modal-dialog', () => {

  // 修复关闭按钮点击处理
  extend(Modal.prototype, 'view', function (vnode) {
    if (window.matchMedia('(max-width: 767px)').matches) {
      // 延迟修复，确保DOM已渲染
      setTimeout(() => {
        const closeButton = document.querySelector('.Modal-close button');
        if (closeButton && !closeButton.hasAttribute('data-mobile-fixed')) {

          // 移除原有事件监听器并添加新的
          const newCloseButton = closeButton.cloneNode(true);
          closeButton.parentNode.replaceChild(newCloseButton, closeButton);

          newCloseButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            app.modal.close();
          });
        }
      }, 100);
    }
  });

});
