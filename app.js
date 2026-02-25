const grid = document.getElementById('grid');
const sectionTitle = document.getElementById('section-title');
const breadcrumbs = document.getElementById('breadcrumbs');
const modal = document.getElementById('script-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalCode = document.getElementById('modal-code');
const modalOutput = document.getElementById('modal-output');
const runtimeStatus = document.getElementById('runtime-status');
const closeModalButton = document.getElementById('close-modal');
const copyButton = document.getElementById('copy-code');
const runButton = document.getElementById('run-code');

let selectedFolder = null;
let selectedScript = null;
let pyodideInstance = null;

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
    .replace(/\b(import|from|def|for|if|else|with|as|in|return|print|class|while|try|except|continue|break)\b/g, '<span class="token-keyword">$1</span>')
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

function setRuntimeStatus(message) {
  runtimeStatus.textContent = message;
}

function openModal(script) {
  selectedScript = script;
  modalTitle.textContent = script.nome;
  modalDescription.textContent = script.descricao;
  modalCode.innerHTML = highlight(script.codigo);
  modalOutput.textContent = 'Clique em "Executar no site" para ver o resultado aqui.';
  setRuntimeStatus('Pronto para executar');
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

async function ensurePyodide() {
  if (pyodideInstance) {
    return pyodideInstance;
  }

  setRuntimeStatus('Carregando ambiente Python...');
  pyodideInstance = await loadPyodide({
    stdout: (output) => {
      modalOutput.textContent += `${output}\n`;
    },
    stderr: (output) => {
      modalOutput.textContent += `${output}\n`;
    }
  });
  setRuntimeStatus('Ambiente pronto');
  return pyodideInstance;
}

async function runSelectedScript() {
  if (!selectedScript) {
    return;
  }

  runButton.disabled = true;
  modalOutput.textContent = '';

  try {
    const pyodide = await ensurePyodide();
    setRuntimeStatus('Executando script...');
    await pyodide.runPythonAsync(selectedScript.codigo);

    if (!modalOutput.textContent.trim()) {
      modalOutput.textContent = 'Execução concluída sem saída de texto.';
    }
    setRuntimeStatus('Execução concluída');
  } catch (error) {
    modalOutput.textContent += `\nErro: ${error.message}`;
    setRuntimeStatus('Falha na execução');
  } finally {
    runButton.disabled = false;
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

runButton.addEventListener('click', runSelectedScript);

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
