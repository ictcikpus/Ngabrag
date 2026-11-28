'use strict';

const installButton = document.getElementById('pwa-install');
const installRow = document.getElementById('pwa-install-row');
const offlineStatus = document.getElementById('pwa-status');
const installHelp = document.getElementById('pwa-help');
const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
let pendingInstall = null;

if (window.isSecureContext && /^https?:$/.test(location.protocol) && window.top === window) {
  installRow.classList.remove('hidden');
  installButton.hidden = standalone;
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    pendingInstall = event;
  });
  window.addEventListener('appinstalled', () => {
    pendingInstall = null;
    installButton.hidden = true;
    installHelp.close();
  });
  installButton.addEventListener('click', async () => {
    if (pendingInstall) {
      const prompt = pendingInstall;
      pendingInstall = null;
      try {
        await prompt.prompt();
        if ((await prompt.userChoice).outcome === 'accepted') installButton.hidden = true;
        return;
      } catch (error) {
        console.warn('Dialog instalasi tidak tersedia:', error);
      }
    }
    const appleTouch = /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    document.getElementById('pwa-help-text').textContent = appleTouch
      ? 'Di Safari, ketuk Bagikan, pilih Tambah ke Layar Utama, lalu ketuk Tambah.'
      : 'Di menu browser, pilih Instal aplikasi atau Tambahkan ke layar utama.';
    if (!installHelp.open) installHelp.showModal();
  });
  document.getElementById('pwa-help-close').addEventListener('click', () => installHelp.close());

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' })
      .then(() => navigator.serviceWorker.ready)
      .then(() => { offlineStatus.textContent = 'File game siap dimainkan offline.'; })
      .catch(error => {
        offlineStatus.textContent = 'File offline belum siap. Muat ulang saat terhubung.';
        console.warn('Cache offline NGABRAG:', error);
      });
  }
}
