const grid = document.getElementById('grid');
const sectionTitle = document.getElementById('section-title');
const breadcrumbs = document.getElementById('breadcrumbs');
const modal = document.getElementById('script-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalCode = document.getElementById('modal-code');
const closeModalButton = document.getElementById('close-modal');
const copyButton = document.getElementById('copy-code');

let selectedFolder = null;

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function highlight(codeText) {
  const escaped = escapeHtml(codeText);
  return escaped
    .replace(/(#.*)$/gm, '<span class="token-comment">$1</span>')
    .replace(/\b(import|from|def|for|if|else|with|as|in|return|print|class)\b/g, '<span class="token-keyword">$1</span>')
    .replace(/("[^"]*"|'[^']*')/g, '<span class="token-string">$1</span>');
}

function renderBreadcrumbs() {
  breadcrumbs.innerHTML = '';

  const home = document.createElement('button');
  home.textContent = 'Pastas';
  home.addEventListener('click', () => {
    selectedFolder = null;
    render();
  });
  breadcrumbs.append(home);

  if (selectedFolder) {
    const sep = document.createElement('span');
    sep.textContent = '/';
    sep.className = 'sep';
    breadcrumbs.append(sep);

    const current = document.createElement('span');
    current.textContent = selectedFolder.pasta;
    breadcrumbs.append(current);
  }
}

function createCard(title, subtitle, tagText, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'card';
  button.setAttribute('role', 'listitem');
  button.addEventListener('click', onClick);

  const heading = document.createElement('h3');
  heading.className = 'card-title';
  heading.textContent = title;

  const sub = document.createElement('p');
  sub.className = 'card-subtitle';
  sub.textContent = subtitle;

  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.textContent = tagText;

  button.append(heading, sub, tag);
  return button;
}

function openModal(script) {
  modalTitle.textContent = script.nome;
  modalDescription.textContent = script.descricao;
  modalCode.innerHTML = highlight(script.codigo);
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

function renderFolders() {
  sectionTitle.textContent = 'Pastas de Serviços';
  catalogData.forEach((folder) => {
    const card = createCard(
      folder.pasta,
      `${folder.servicos.length} script(s) disponível(is).`,
      'Categoria',
      () => {
        selectedFolder = folder;
        render();
      }
    );
    grid.append(card);
  });
}

function renderServices(folder) {
  sectionTitle.textContent = `Serviços: ${folder.pasta}`;
  folder.servicos.forEach((script) => {
    const card = createCard(script.nome, script.resumo, 'Script', () => openModal(script));
    grid.append(card);
  });
}

function render() {
  grid.innerHTML = '';
  renderBreadcrumbs();
  if (selectedFolder) {
    renderServices(selectedFolder);
  } else {
    renderFolders();
  }
}

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(modalCode.textContent || '');
    copyButton.textContent = 'Copiado!';
    setTimeout(() => {
      copyButton.textContent = 'Copiar código';
    }, 1200);
  } catch {
    copyButton.textContent = 'Falha ao copiar';
  }
});

modal.addEventListener('click', (event) => {
  if (event.target.dataset.closeModal) {
    closeModal();
  }
});

closeModalButton.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

render();
