---
title: "Claude Code: the 30 commands I actually use"
description: "From /init to /rewind, from claude -p to MCP servers: Claude Code's commands grouped by stage of work, with what they do and when to use them. And the five to learn first."
date: 2026-11-15
categories: ["data-engineering", "ai-analytics"]
cover:
  src: "/assets/images/posts/comandi-claude-code.svg"
  alt: "A terminal window with a list of commands starting with a slash, one of them highlighted"
tags: ["Claude Code", "AI", "Productivity", "MCP"]
translationKey: "claude-code-commands"
updated: 2026-11-15
draft: false
---

You can use Claude Code for weeks writing nothing but plain-language requests. It works, but it leaves much of the tool on the table. Commands, the ones starting with a slash and the ones you run from the terminal, do what a request can't: free up context, go back three edits, decide what the agent may do without asking, connect it to the systems you work with.

In this post I've lined up the thirty I find most useful, grouped by stage of work. It isn't the full list: typing `/` in a session shows every available command, including those added by skills and plugins. It's the list of the ones worth knowing.

If you're after how I use Claude Code on pipelines and data warehouses, I wrote about it in an [earlier post](/posts/claude-code-data-engineering/). Here the goal is more practical: a map to keep at hand.

## Starting and resuming sessions

The first group is about how you get into Claude Code and how you return to a conversation left halfway.

| # | Command | What it does |
| --- | --- | --- |
| 1 | `claude` | Starts an interactive session in the current folder. The starting point for everything. |
| 2 | `claude -p "request"` | Runs a request without the interface and prints the answer. For scripts, CI pipelines and commands chained with other tools. |
| 3 | `claude -c` | Resumes the last conversation in the current folder, with all its context. |
| 4 | `claude -r` and `/resume` | Lists past conversations and lets you pick one to resume. |

The second command is the most underrated. With `-p`, Claude Code becomes a program like any other, taking an input and returning an output: you can ask it to summarise the log of a failed job, check a file before a commit, draft a pull request description. With `--output-format json` the answer can be read by another program too.

## Managing context

Context is the session's working memory: everything Claude has read, written and decided so far. It's large but not infinite, and when it fills up with things no longer needed, answers get worse. These commands keep it tidy.

| # | Command | What it does |
| --- | --- | --- |
| 5 | `/clear` | Empties the conversation and starts afresh, in the same folder. Use it whenever you switch topic. |
| 6 | `/compact` | Summarises the conversation so far and frees space, keeping what matters. You can add an instruction on what to keep: `/compact keep the decisions on the data model`. |
| 7 | `/context` | Shows how much context is used and by what: conversation, files read, tools, MCP servers. |
| 8 | `/rewind` (or `Esc` twice) | Goes back to an earlier point in the session, restoring the conversation, the code or both. |

The rule I follow is simple: one task, one conversation. When a task is done, `/clear`. If context fills up halfway through a long task, `/compact` with a hint on what matters. And `/context` when answers start slipping for no obvious reason: the reason is often there.

`/rewind` deserves a note of its own. Claude Code saves a restore point before every file edit, so you can try an approach, see it doesn't work and go back without touching git. It doesn't replace version control, since it doesn't cover commands run in the terminal, but it makes experimenting much cheaper.

## Giving the project context

The other way to manage context is to provide better context from the start. These commands tell Claude what to know about the project without repeating it every time.

| # | Command | What it does |
| --- | --- | --- |
| 9 | `/init` | Analyses the project and creates a `CLAUDE.md` file with structure, commands and conventions. Claude reads it at the start of every session. |
| 10 | `/memory` | Opens the `CLAUDE.md` files for editing: the project one, shared with the team, and your personal one. |
| 11 | `/add-dir` | Adds another folder to those Claude can work in, for example a second, related repository. |
| 12 | `@file` | In a request, `@` followed by a path brings that file or folder into context. |

`/init` is the first command to run in a new project, and the file it produces is the first to fix. The generated version describes the structure well, but it can't know what isn't written anywhere: which table must never be queried without a date filter, which test is slow, which folder is dead code. Those you add by hand, and that's when the file starts to be worth something.

## Controlling what the agent does

This group decides how much Claude can do on its own, and with which model.

| # | Command | What it does |
| --- | --- | --- |
| 13 | `Shift+Tab` | Cycles through permission modes: ask for confirmation, accept edits, plan mode. |
| 14 | `/permissions` | Shows and edits the rules on what is allowed, what needs asking and what is denied. |
| 15 | `/model` | Switches model during the session. |
| 16 | `/config` | Opens settings: theme, notifications, interface behaviour. |
| 17 | `!command` | Runs a terminal command directly, without going through Claude, and adds its output to the conversation. |

**Plan mode**, reached with `Shift+Tab`, is the command that changed how I work the most. In this mode Claude reads, explores and proposes a plan, but changes nothing. You discuss the plan, correct it, and only then move to execution. For any task touching more than two files, it's worth the extra two minutes.

`/permissions` is its complement. Rules are written once and versioned with the project: test commands always allowed, commands touching production always denied. Deny rules apply in every mode, even the most permissive, which is why they're the right place for limits that must never be crossed.

The exclamation mark, finally, is a small but handy shortcut: `!git status` or `!dbt ls` show the result to you and Claude at once, without waiting for Claude to decide to run them.

## Extending Claude Code

On its own, Claude Code reads files and runs commands. This group connects it to other systems and teaches it how the team works.

| # | Command | What it does |
| --- | --- | --- |
| 18 | `claude mcp add` | Adds an MCP server from the terminal, to connect Claude to a database, a service or a tool. |
| 19 | `/mcp` | Shows connected MCP servers, their status and their tools, and handles authentication. |
| 20 | `/agents` | Creates and manages subagents: specialised assistants with their own instructions and tools, working on an isolated task. |
| 21 | `/hooks` | Configures hooks, scripts Claude Code runs at set moments, for example before every command, which can block it. |
| 22 | `/plugin` | Installs and manages plugins and marketplaces: packages bundling skills, agents, hooks and MCP servers. |
| 23 | `/skill-name` | Invokes a skill from the project or a plugin. Skills live in `.claude/skills/` and are versioned with the code. |

**Skills** are probably the most useful tool for a team. Every procedure that today lives on a wiki page, how to add a model, how to release, how to write a test, can become a skill that Claude loads by itself when the request matches, or that you invoke by name. The advantage over the wiki is that the skill gets used.

MCP servers are the complement: skills say how to work, MCP servers give access to the systems to work on. In the [data engineering post](/posts/claude-code-data-engineering/) I described how to connect them to dbt and the data warehouse in read-only mode.

## Reviewing and automating

Four commands for two different needs: checking work done and having it repeated without you.

| # | Command | What it does |
| --- | --- | --- |
| 24 | `/code-review` | Reviews current changes, or a pull request, looking for logic errors and unhandled cases. |
| 25 | `/security-review` | Reviews the current branch's changes from a security standpoint. |
| 26 | `/loop` | Repeats an instruction at regular intervals within the session, for example to check a build's status. |
| 27 | `/schedule` | Creates agents that run in the cloud on a schedule, even when your computer is off. |

A review by Claude doesn't replace a colleague's, but it comes earlier and costs less. I use it as a first filter: before opening a pull request, `/code-review` on my changes. What it finds I fix straight away, and the colleague can focus on design choices instead of forgotten edge cases.

`/loop` and `/schedule` cover recurring tasks. The first lives in the session and ends with it; the second lives in the cloud and carries on by itself. A sensible use of the second: every morning, check the night's failed tests and prepare a proposed fix for a person to review.

## Maintenance

The last three are for when something doesn't add up.

| # | Command | What it does |
| --- | --- | --- |
| 28 | `/usage` | Shows how much you've used against your plan's limits. |
| 29 | `/doctor` | Checks installation and configuration and reports problems. |
| 30 | `/help` | Lists the commands available in the session, including those from skills and plugins. |

`/doctor` is the first command to run when Claude Code behaves oddly after an update, or when an MCP server won't connect. `/help` is the quickest way to find out what has changed: Claude Code's commands evolve often, and a list like this ages faster than you'd think.

## The five to learn first

Thirty commands are too many to learn at once. If I had to pick five for a beginner, these would be them.

1. **`/init`**, on day one, followed by ten minutes fixing the `CLAUDE.md` it produces.
2. **`Shift+Tab` for plan mode**, before any task touching more than a couple of files.
3. **`/clear`**, whenever you switch topic.
4. **`Esc` twice**, to go back when an approach turns out to be wrong.
5. **`claude -c`**, to pick up yesterday's work without explaining it all again.

The others come by themselves, when needed. The signal to learn a new one is always the same: noticing you've given Claude the same explanation for the third time. There's almost always a command, a skill or a line in `CLAUDE.md` that makes it unnecessary.

## Further reading

The official documentation is the most up-to-date reference.

- [Slash commands](https://code.claude.com/docs/en/slash-commands) (Anthropic): the full list of slash commands available in a session
- [CLI reference](https://code.claude.com/docs/en/cli-reference) (Anthropic): terminal commands and options, including `-p`, `-c` and `-r`
- [Interactive mode](https://code.claude.com/docs/en/interactive-mode) (Anthropic): keyboard shortcuts, `!`, `@` and the other interactive session features
- [Checkpointing](https://code.claude.com/docs/en/checkpointing) (Anthropic): how the restore points used by `/rewind` work
- [Skills](https://code.claude.com/docs/en/skills), [MCP](https://code.claude.com/docs/en/mcp) and [Hooks](https://code.claude.com/docs/en/hooks) (Anthropic): documentation for the extensions described in the post
