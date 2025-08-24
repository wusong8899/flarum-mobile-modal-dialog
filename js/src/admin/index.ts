import app from 'flarum/admin/app';

export { default as extend } from './extend';

app.initializers.add('wusong8899-mobile-modal-dialog', () => {
  console.log('[wusong8899/flarum-mobile-modal-dialog] Hello, admin!');
});
