import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Modal from 'flarum/common/components/Modal';
import ModalManager from 'flarum/common/components/ModalManager';

export { default as extend } from './extend';

app.initializers.add('wusong8899-mobile-modal-dialog', () => {
  console.log('[wusong8899/flarum-mobile-modal-dialog] Mobile Modal customization loaded');

  // 修复移动端Modal事件处理
  extend(Modal.prototype, 'hide', function () {
    // 仅在移动端应用
    if (window.matchMedia('(max-width: 767px)').matches) {
      console.log('Mobile modal closing...');
      this.hide();
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
      // 在移动端确保模态框关闭
      if (this.attrs.state.modal) {
        this.animateHide();
      }
    }
  });

  // 修复背景点击处理
  extend(ModalManager.prototype, 'handlePossibleBackdropClick', function (e) {
    if (window.matchMedia('(max-width: 767px)').matches) {
      console.log('Mobile backdrop click detected');
      // 在移动端确保模态框关闭
      if (this.attrs.state.modal) {
        this.animateHide();
      }
    }
  });
});
