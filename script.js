// Navigation works with ordinary anchors, even when JavaScript is disabled.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

const projectToggle = document.querySelector('.project-toggle');
const projectDetails = document.querySelector('#project-details');
projectToggle.addEventListener('click', () => {
  const expanded = projectToggle.getAttribute('aria-expanded') === 'true';
  projectToggle.setAttribute('aria-expanded', String(!expanded));
  projectDetails.hidden = expanded;
  projectToggle.innerHTML = expanded
    ? 'Explore the project <span aria-hidden="true">+</span>'
    : 'Close project details <span aria-hidden="true">−</span>';
});

const copyButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('.copy-status');
let copyTimeout;
copyButton.addEventListener('click', async () => {
  clearTimeout(copyTimeout);
  try {
    await navigator.clipboard.writeText('nguyenvanphu5221@gmail.com');
    copyStatus.textContent = 'Email copied!';
  } catch {
    copyStatus.textContent = 'Please select and copy the email address.';
  }
  copyTimeout = setTimeout(() => { copyStatus.textContent = ''; }, 5000);
});

// The portrait uses image/image.jpeg; update the <img> in index.html to change it.
// A missing or invalid photo keeps the designed monogram visible.
document.querySelectorAll('.profile-photo').forEach(photo => {
  const showPhoto = () => photo.closest('.portrait-frame').classList.add('has-photo');
  photo.addEventListener('load', showPhoto);
  photo.addEventListener('error', () => { photo.hidden = true; });
  if (photo.complete && photo.naturalWidth > 0) showPhoto();
});

document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  const links = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        const active = link.hash === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
