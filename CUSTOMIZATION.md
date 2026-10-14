# Personalizar o perfil

O GitHub exibe o README.md deste repositório no perfil SonyYNee porque o repositório é público e tem o mesmo nome da conta.

- Edite `README.md` para mudar apresentação, ferramentas e áreas de atuação.
- O banner atual é original, vetorial e editável em `assets/hero.svg`. As animações ficam no bloco `<style>`; as cores são definidas no próprio SVG.
- O banner não usa scripts nem serviços de animação externos. A preferência por movimento reduzido desativa os efeitos nos navegadores que a respeitam.
- A arena em `assets/activity-arena.svg` é gerada com [snk](https://github.com/Platane/snk), a partir do calendário real. Não são criadas atividades fictícias. Ela é uma animação no README, não altera o calendário nativo do GitHub nem é um jogo controlável pelo teclado.
- `.github/workflows/activity.yml` agenda a atualização diária e permite executar manualmente em Actions → Atualizar cobrinha de contribuições → Run workflow. Depende da disponibilidade do GitHub Actions e de permissões de escrita do token automático.
- Para gerar localmente: Node 24, `npm ci`, defina `GITHUB_TOKEN` apenas no ambiente e execute `npm run generate`. Não grave tokens em arquivos ou commits. O workflow usa o token efêmero fornecido pelo próprio GitHub.
- Os dados refletem o calendário visível conforme as configurações de contribuição da conta. Nomes de repositórios privados e informações de clientes não são publicados. O total não é uma estimativa de todo trabalho realizado fora do GitHub.

## Estado da automação

Em 14/10/2026, a arena foi gerada localmente com dados reais e publicada. A primeira execução automática foi bloqueada pelo GitHub com a mensagem: `The job was not started because your account is locked due to a billing issue.` A execução está em https://github.com/SonyYNee/SonyYNee/actions/runs/38620680538. Nenhuma configuração de cobrança foi alterada.

O arquivo publicado continua animado mesmo sem o workflow. Novos dias só serão incorporados quando houver outra geração. Depois de resolver a restrição da conta, execute o workflow manualmente para verificar a retomada; a agenda diária já está configurada.
- Antes de divulgar projetos, confirme se os repositórios e as informações podem ser públicos. Este perfil não inclui projetos privados, nomes de clientes ou credenciais.
