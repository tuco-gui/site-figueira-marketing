(() => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path !== '/consult') return;

  const replacement = 'https://images.pexels.com/photos/11288661/pexels-photo-11288661.jpeg?auto=compress&cs=tinysrgb&w=1600';

  const apply = () => {
    const image = document.querySelector('img[alt="Profissional da área da saúde"]');
    if (!image) return false;
    if (image.dataset.consultHeroV12 === '1') return true;
    image.src = replacement;
    image.alt = 'Equipamento de radiologia em ambiente hospitalar';
    image.dataset.consultHeroV12 = '1';
    image.classList.remove('scale-110');
    image.classList.add('scale-105');
    return true;
  };

  if (apply()) return;
  const observer = new MutationObserver(() => {
    if (apply()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 10000);
})();
