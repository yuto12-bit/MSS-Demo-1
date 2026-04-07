/**
 * yakitori-akashi-01: Custom Animations & Loading
 * 既存のUI制御に影響を与えず、表層の演出のみを行う独立したスクリプト
 */
document.addEventListener('DOMContentLoaded', () => {

  // ========================================================
  // 1. ローディング画面の制御 (最低表示時間 + Fail-safe付き)
  // ========================================================
  const loader = document.getElementById('yakitori-loader');
  
  if (loader) {
    let isLoaded = false;
    const MIN_LOADING_TIME = 2000; // 最低でも2秒間は世界観（演出）を維持する
    const startTime = Date.now();

    const hideLoader = () => {
      if (isLoaded) return;
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

      // 最低表示時間を満たしてからフェードアウト（透明化）させる
      setTimeout(() => {
        isLoaded = true;
        loader.classList.add('is-loaded');
      }, remainingTime);
    };

    // 画像等の完全な読み込み完了を検知
    window.addEventListener('load', hideLoader);
    
    // Fail-safe (安全装置): ネットワーク遅延等でloadが来なくても、最大5秒で強制的に画面を開ける
    setTimeout(hideLoader, 5000);
  }


  // ========================================================
  // 2. スクロール連動アニメーション
  // ========================================================
  // CSSにJS有効を伝達
  document.body.classList.add('is-js-active');

  const animTargets = document.querySelectorAll('[data-anim]');
  if (animTargets.length === 0) return;

  // OS設定で「視差効果を減らす」がオンの場合は即座に全表示
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    animTargets.forEach(target => target.classList.add('is-animated'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -5% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-animated');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animTargets.forEach(target => {
    observer.observe(target);
  });

});