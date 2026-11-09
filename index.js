/**
 * Chat 模式：屏蔽 Agent 从全局继承的工具，只保留本预设挂载的联网搜索。
 *
 * restrict 在 preset scope 里执行时，"已知全局工具"只有 Host 真正注册在
 * global 层的工具（当前是 working_directory）。其他工具（cordis 调试工具、
 * shell、文件等）要么来自别的预设，要么根本不在 Chat 预设里，不需要也不允许写进
 * deny —— 写不存在的名字会让 restrict 抛 unknown tool，导致整个预设加载失败。
 */
export const name = 'chat-no-tools'

export const inject = ['tools']

const HOST_GLOBAL_TOOLS_TO_HIDE = ['working_directory']

export function apply(ctx) {
  ctx.effect(
    () => ctx.tools.restrict({ deny: HOST_GLOBAL_TOOLS_TO_HIDE }),
    'chat-preset.restrict-host-tools',
  )
}
