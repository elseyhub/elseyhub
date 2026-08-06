// =========================================================
// Footer year
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// Mobile nav toggle
// =========================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// Active nav link on scroll
// =========================================================
const sections = document.querySelectorAll('main > section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

sections.forEach(section => navObserver.observe(section));

// =========================================================
// Scroll reveal
// =========================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  revealEls.forEach(el => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));
}

// =========================================================
// Terminal typewriter
// =========================================================
const terminalBody = document.getElementById('terminalBody');

const terminalLines = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Elsey Ouma' },
  { type: 'cmd', text: 'role --list' },
  { type: 'out', text: 'Computer Science Student · Aspiring Backend Developer · Software Engineer' },
  { type: 'cmd', text: 'cat focus.txt' },
  { type: 'out', text: 'Backend systems, databases, web applications, PropTech.' },
  { type: 'cmd', text: 'status' },
  { type: 'out', text: 'Available for internships & entry-level roles.', accent: true },
];

function typeTerminal() {
  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= terminalLines.length) {
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      terminalBody.appendChild(cursor);
      return;
    }

    const lineData = terminalLines[lineIndex];
    const lineEl = document.createElement('div');
    lineEl.className = 'line';
    terminalBody.appendChild(lineEl);

    if (lineData.type === 'cmd') {
      const prompt = document.createElement('span');
      prompt.className = 'prompt-sign';
      prompt.textContent = '$ ';
      lineEl.appendChild(prompt);

      const cmdSpan = document.createElement('span');
      cmdSpan.className = 'cmd';
      lineEl.appendChild(cmdSpan);

      let charIndex = 0;
      const text = lineData.text;
      const typeChar = () => {
        if (charIndex < text.length) {
          cmdSpan.textContent += text.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, 28);
        } else {
          lineIndex++;
          setTimeout(typeLine, 180);
        }
      };
      typeChar();
    } else {
      lineEl.classList.add('out');
      if (lineData.accent) lineEl.classList.add('out-accent');
      lineEl.textContent = lineData.text;
      lineIndex++;
      setTimeout(typeLine, 260);
    }
  }

  typeLine();
}

if (prefersReducedMotion) {
  terminalLines.forEach(lineData => {
    const lineEl = document.createElement('div');
    lineEl.className = lineData.type === 'cmd' ? 'line' : 'line out';
    if (lineData.accent) lineEl.classList.add('out-accent');
    lineEl.textContent = lineData.type === 'cmd' ? `$ ${lineData.text}` : lineData.text;
    terminalBody.appendChild(lineEl);
  });
} else {
  typeTerminal();
}

// =========================================================
// Copy email button
// =========================================================
const copyEmailBtn = document.getElementById('copyEmailBtn');
const emailLink = document.getElementById('emailLink');

copyEmailBtn.addEventListener('click', async () => {
  const email = emailLink.textContent.trim();
  try {
    await navigator.clipboard.writeText(email);
  } catch (err) {
    // Fallback for browsers without clipboard API access
    const textarea = document.createElement('textarea');
    textarea.value = email;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  const originalText = copyEmailBtn.textContent;
  copyEmailBtn.textContent = 'copied';
  copyEmailBtn.classList.add('copied');
  setTimeout(() => {
    copyEmailBtn.textContent = originalText;
    copyEmailBtn.classList.remove('copied');
  }, 1800);
});
