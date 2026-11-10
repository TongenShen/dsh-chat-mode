# dsh-chat-mode

A **Chat mode** agent preset for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness): it loads only `AGENTS.md`, keeps only web search, and hides every other tool. Pick **Chat** in a new session and you get plain conversation, like ChatGPT's Chat mode.

## Features

- A pure-chat preset, not a global plugin — only sessions that select Chat are affected
- Loads user-global and project-level `AGENTS.md`
- Exposes only `web_search` and `web_fetch`
- Hides shell, file access, subagents, todo, plugin manager, and every other tool, including the built-in `working_directory`
- Keeps automatic context compaction and the `/compact` command

## Install

Requires DeepSeek Harness 0.2.1-rc.1 or newer.

```text
https://github.com/TongenShen/dsh-chat-mode
```

Or install the repository directory directly:

```text
<absolute path to this repository>
```

Restart DSH afterwards, then select **Chat** when creating a new session.

## Configuration

`cordis.patch.yml` declares the preset: a chat persona, `agent-instructions`, `tool-web`, the `chat-no-tools` restriction row, and compaction. The preset id is `chat`, display name `Chat`, `order: 0`.

## Notes

- Web search needs `DEEPSEEK_API_KEY` (or a model signed in through a DeepSeek account).
- The preset only applies to new sessions.
- Add future global tool names to `HOST_GLOBAL_TOOLS_TO_HIDE` in `index.js` to hide them too.

## Uninstall

```text
dsh plugin --profile web remove dsh-chat-mode
```

## License

MIT
