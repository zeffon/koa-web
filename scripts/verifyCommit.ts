import { readFileSync } from 'node:fs'
import colors from 'picocolors'

/**
 * get $1 from commit-msg script
 * Please refer to usage: https://github.com/toplenboren/simple-git-hooks
 */
const msgPath = process.argv[2]
const msg = readFileSync(msgPath, 'utf-8').trim()

const releaseRE = /^v\d/
const commitRE =
  /^(?:revert: )?(?:feat|fix|docs|dx|refactor|perf|style|test|workflow|build|ci|chore|types|wip|release)(?:\(.+\))?!?: .{1,50}/

if (!releaseRE.test(msg) && !commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${colors.bgRed(colors.white(' ERROR '))} ${colors.red(
      `invalid commit message format.`,
    )}\n\n` +
      colors.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
      ) +
      `    ${colors.green(`feat: add 'comments' option`)}\n` +
      `    ${colors.green(`fix: handle events on blur (close #1)`)}\n\n` +
      colors.red(`  See .github/commit-convention.md for more details.\n`),
  )
  process.exit(1)
}
