# dsh-chat-mode

给 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 用的 **Chat 模式** Agent 预设：只加载 `AGENTS.md`，只保留联网搜索，其余工具全部屏蔽。新建会话时选 **Chat**，就是像 ChatGPT 的 Chat 模式那样纯粹聊天。

## 特点

- **纯聊天预设**，不是全局插件；只影响选择 Chat 的会话
- 载入全局和项目目录里的 `AGENTS.md`
- 只暴露 `web_search` / `web_fetch` 两个联网搜索工具
- 屏蔽 shell、文件读写、子代理、todo、插件管理等所有其他工具，包括 Harness 自带的 `working_directory`
- 保留自动上下文压缩，长对话不会爆上下文，也支持 `/compact`

## 安装

需要 DeepSeek Harness 0.2.1-rc.1 或更高版本。

### 方式一：从 GitHub 安装（推荐）

在 Harness 里执行（或通过插件管理界面安装）：

```text
plugin_manager install_bundle target github:TongenShen/dsh-chat-mode
```

### 方式二：本地目录

```text
plugin_manager install_bundle target <本仓库的绝对路径>
```

安装后**重启 DSH**，新建会话时在预设选择里选 **Chat**。

## 配置

`cordis.patch.yml` 声明了预设本身，主要内容：

| 行 | 作用 |
| --- | --- |
| `persona` | 聊天人设，明确要求需要时调用联网搜索 |
| `agent-instructions` | 载入 `AGENTS.md`（用户全局 + 项目级） |
| `tool-web` | 注册 `web_search` / `web_fetch` |
| `chat-no-tools` | 在预设作用域内执行 `ctx.tools.restrict({ deny: ['working_directory'] })`，屏蔽 Harness 的全局工具 |
| `compaction` | 自动上下文压缩 + `/compact` 命令 |

预设 `id` 是 `chat`，显示名 `Chat`，`order: 0`（排在预设列表最前）。想改显示名或排序，直接改 `cordis.patch.yml` 里的 `name` / `order`。

## 注意事项

- 联网搜索需要 `DEEPSEEK_API_KEY`（或使用 DeepSeek 账号登录的模型），否则工具调用会返回缺 key 的错误。
- Chat 模式只对**新建会话**生效；已经开始的会话保持原来的预设。
- 如果 Harness 将来新增了全局工具，需要把它的名字加进 `index.js` 的 `HOST_GLOBAL_TOOLS_TO_HIDE` 才会被屏蔽。
- `ctx.tools.restrict()` 的 `deny` 名单只能写真实存在的全局工具名；写别的预设里的工具名会让预设加载失败。

## 卸载

```text
plugin_manager remove_bundle target dsh-chat-mode
```

然后重启 DSH。

## License

MIT
