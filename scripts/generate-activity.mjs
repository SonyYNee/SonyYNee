import fs from 'node:fs/promises';
import { generateSnakeAnimation, getUserContribution } from 'generate-snake-animation';

// The token is supplied by the runner environment. Never write it to the repository.
const githubToken = process.env.GITHUB_TOKEN;
if (!githubToken) throw new Error('Defina GITHUB_TOKEN no ambiente.');
const username = 'SonyYNee';
const source = { platform: 'github', username, githubToken };
const days = await getUserContribution(source);
const total = days.reduce((sum, day) => sum + day.count, 0);
const activeDays = days.filter((day) => day.count > 0).length;
const [snake] = await generateSnakeAnimation(source, [{
  format: 'svg',
  drawOptions: {
    colorDots: { 1: '#234d75', 2: '#367fa6', 3: '#5ccccc', 4: '#a8edb0' },
    colorEmpty: '#111e32', colorDotBorder: '#1b304c', colorSnake: '#b8fa71',
    sizeCell: 16, sizeDot: 12, sizeDotBorderRadius: 3,
  },
  animationOptions: { stepDurationMs: 110, frameByStep: 1 },
}]);
if (typeof snake !== 'string' || !snake.includes('<svg')) throw new Error('Falha ao gerar a cobrinha.');
const embedded = snake
  .replace(/<\?xml[^>]*>/g, '')
  .replace(/<svg\b[^>]*>/, (tag) => tag
    .replace(/\s(?:width|height)="[^"]*"/g, '')
    .replace('<svg', '<svg x="44" y="148" width="1112" height="210" preserveAspectRatio="xMidYMid meet"'));
const now = new Date().toISOString().slice(0, 10);
const arena = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="440" viewBox="0 0 1200 440" role="img" aria-labelledby="arena-title arena-desc">
<title id="arena-title">Cobrinha de contribuições — SonyYNee</title>
<desc id="arena-desc">Cobrinha animada que consome os dias ativos do calendário real de contribuições do GitHub. ${total} contribuições visíveis em ${activeDays} dias ativos.</desc>
<defs><linearGradient id="arena-bg" x2="1" y2="1"><stop stop-color="#080e1b"/><stop offset="1" stop-color="#0b1728"/></linearGradient></defs>
<style>text{font-family:'Cascadia Code',Consolas,monospace}@media(prefers-reduced-motion:reduce){*{animation:none!important}}</style>
<rect x="1" y="1" width="1198" height="438" rx="22" fill="url(#arena-bg)" stroke="#273956"/>
<rect x="28" y="29" width="4" height="23" rx="2" fill="#b8fa71"/>
<text x="48" y="47" fill="#e9f2ff" font-size="19" font-weight="700" letter-spacing="1">COBRINHA DE CONTRIBUIÇÕES</text>
<text x="48" y="75" fill="#6d88ad" font-size="11" letter-spacing="1">SEU CÓDIGO VIRA O MAPA. CADA DIA ATIVO VIRA ENERGIA.</text>
<rect x="942" y="29" width="211" height="31" rx="5" fill="#142539" stroke="#32516b"/>
<circle cx="959" cy="45" r="3" fill="#b8fa71"/><text x="971" y="49" fill="#a6c0dc" font-size="10" letter-spacing="1">ATIVIDADE REAL</text>
<path d="M46 105H1154" stroke="#1c304c"/>
<text x="48" y="131" fill="#7c96b7" font-size="10">JOGADOR / SONYYNEE</text>
<text x="1152" y="131" text-anchor="end" fill="#7c96b7" font-size="10">${total} CONTRIBUIÇÕES · ${activeDays} ${activeDays === 1 ? 'DIA ATIVO' : 'DIAS ATIVOS'}</text>
${embedded}
<path d="M46 371H1154" stroke="#1c304c"/>
<rect x="48" y="398" width="8" height="8" rx="2" fill="#b8fa71"/><text x="66" y="405" fill="#abc6dd" font-size="10">COBRINHA</text>
<rect x="150" y="398" width="8" height="8" rx="2" fill="#5ccccc"/><text x="168" y="405" fill="#abc6dd" font-size="10">DIA ATIVO</text>
<text x="1152" y="405" text-anchor="end" fill="#617f9f" font-size="10">ATUALIZADO ${now} / ÚLTIMOS 12 MESES</text>
</svg>`;
await fs.mkdir('assets', { recursive: true });
await fs.writeFile('assets/activity-arena.svg', arena);
console.log(`Arena gerada: ${total} contribuições / ${activeDays} dias ativos.`);
