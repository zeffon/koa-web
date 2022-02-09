module.exports = {
  types: [
    { value: 'feat', name: 'feat: 新功能' },
    { value: 'fix', name: 'fix: 修复一个Bug' },
    { value: 'to', name: 'to: 只产生diff不自动修复此问题。适合于多次提交。' },
    { value: 'docs', name: 'docs: 变更的只有文档' },
    { value: 'style', name: 'style: 格式（不影响代码运行的变动）' },
    {
      value: 'refactor',
      name: 'refactor: 重构（即不是新增功能，也不是修改bug的代码变动）'
    },
    { value: 'perf', name: 'perf: 优化相关，比如提升性能、体验' },
    { value: 'test', name: 'test: 增加测试' },
    { value: 'chore', name: 'chore: 构建过程或辅助工具的变动' },
    { value: 'revert', name: 'revert: 回滚到上一个版本' },
    { value: 'merge', name: 'merge: 代码合并' },
    { value: 'sync', name: 'sync: 同步主线或分支的Bug' }
  ],
  typePrefix: '[',
  typeSuffix: ']',
  scopes: [
    ['route', '路由相关'],
    ['hooks', 'hook 相关'],
    ['utils', 'utils 相关'],
    ['deps', '项目依赖'],
    ['other', '其他修改'],
    ['custom', '以上都不是？我要自定义']
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`
    };
  }),
  messages: {
    type: '为确保提交遵循规范!\n选择你要提交的类型: ',
    scope: '选择一个 scope (可选): ',
    customScope: '请输入自定义的 scope: ',
    subject: '填写简短的变更描述: \n',
    body: '填写更加详细的变更描述（可选）。使用 "|" 换行: \n',
    breaking: '列举非兼容性重大的变更（可选）: \n',
    footer: '关联关闭的 issue(可选)，例如: #31, #34:\n',
    confirmCommit: '确认提交？'
  },
  allowBreakingChanges: ['feat', 'fix'],
  allowCustomScopes: true,
  subjectLimit: 100,
  breaklineChar: '|'
};
