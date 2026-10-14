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
    colorDots: { 1: '#3f365b', 2: '#655393', 3: '#9480ca', 4: '#d2c6ff' },
    colorEmpty: '#171d28', colorDotBorder: '#29303e', colorSnake: '#b9efda',
    sizeCell: 16, sizeDot: 12, sizeDotBorderRadius: 3,
  },
  animationOptions: { stepDurationMs: 150, frameByStep: 1 },
}]);
if (typeof snake !== 'string' || !snake.includes('<svg')) throw new Error('Falha ao gerar a cobrinha.');
const embedded = snake
  .replace(/<\?xml[^>]*>/g, '')
  .replace(/<svg\b[^>]*>/, (tag) => tag
    .replace(/\s(?:width|height)="[^"]*"/g, '')
    .replace('<svg', '<svg x="38" y="124" width="1124" height="208" preserveAspectRatio="xMidYMid meet"'));
const now = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(new Date());
const arena = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="398" viewBox="0 0 1200 398" role="img" aria-labelledby="arena-title arena-desc">
<title id="arena-title">O ritmo de quem constrói — SonyYNee</title>
<desc id="arena-desc">Cobrinha animada com os dias ativos do calendário real de contribuições do GitHub. ${total} contribuições visíveis. Atualizado em ${now}.</desc>
<style>text{font-family:'Segoe UI',Arial,sans-serif}@media(prefers-reduced-motion:reduce){*{animation:none!important}}</style>
<rect x="1" y="1" width="1198" height="396" rx="20" fill="#0d1117" stroke="#858296" stroke-opacity=".25"/>
<text x="42" y="42" fill="#b9efda" font-size="11" letter-spacing="2">ATIVIDADE EM MOVIMENTO</text>
<text x="40" y="83" fill="#e6edf3" font-size="32" font-weight="350" letter-spacing="-.5">O ritmo de quem constrói.</text>
<text x="1156" y="78" text-anchor="end" fill="#a5adba" font-size="13">Contribuições reais · últimos 12 meses</text>
${embedded}
<path d="M42 343H1158" stroke="#858296" stroke-opacity=".18"/>
<circle cx="47" cy="370" r="3" fill="#b9efda"/><text x="59" y="374" fill="#a5adba" font-size="11">Cobrinha</text>
<circle cx="142" cy="370" r="3" fill="#d2c6ff"/><text x="154" y="374" fill="#a5adba" font-size="11">Dias ativos</text>
<text x="1156" y="374" text-anchor="end" fill="#8c94a5" font-size="11">Atualizado em ${now}</text>
</svg>`;
await fs.mkdir('assets', { recursive: true });
await fs.writeFile('assets/activity-arena.svg', arena);
console.log(`Arena gerada com ${total} contribuições reais.`);
