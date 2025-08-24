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
          closeButton.setAttribute('data-mobile-fixed', 'true');

          // 移除原有事件监听器并添加新的
          const newCloseButton = closeButton.cloneNode(true);
          closeButton.parentNode.replaceChild(newCloseButton, closeButton);

          newCloseButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile close button clicked');
            app.modal.close();
          });

          console.log('Mobile close button fixed');
        }
      }, 100);
    }
  });

  // 修复背景点击和ESC键事件
  extend(ModalManager.prototype, 'view', function (vnode) {
    if (window.matchMedia('(max-width: 767px)').matches) {
      // 延迟修复，确保DOM已渲染
      setTimeout(() => {
        const backdrop = document.querySelector('.ModalManager-invisibleBackdrop');
        if (backdrop && !backdrop.hasAttribute('data-mobile-fixed')) {
          backdrop.setAttribute('data-mobile-fixed', 'true');

          // 确保背景点击区域样式正确
          backdrop.style.cssText = `
            position: absolute !important;
            inset: 0 !important;
            z-index: -1 !important;
            background: transparent !important;
            pointer-events: auto !important;
          `;

          console.log('Mobile backdrop click area fixed');
        }
      }, 100);
    }
  });

  // 修复ESC键处理
  extend(ModalManager.prototype, 'handleEscPress', function (e) {
    if (window.matchMedia('(max-width: 767px)').matches) {
      console.log('Mobile ESC key pressed');
      // 使用正确的API关闭模态框
      app.modal.close();
    }
  });

  // 修复背景点击处理
  extend(ModalManager.prototype, 'handlePossibleBackdropClick', function (e) {
    if (window.matchMedia('(max-width: 767px)').matches) {
      console.log('Mobile backdrop click detected');
      // 使用正确的API关闭模态框
      app.modal.close();
    }
  });
});
