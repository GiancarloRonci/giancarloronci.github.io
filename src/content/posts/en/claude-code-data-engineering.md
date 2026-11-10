---
title: "Claude Code in data engineering: what changed in 2026, and what's still your job"
description: "Skills, MCP servers, background agents, auto mode, hooks: in 2026 Claude Code became a tool you can really work with on pipelines, dbt models and data warehouses. What changed, how to use it near production data, and where a person still has to decide."
date: 2026-11-10
categories: ["data-engineering", "ai-analytics"]
cover:
  src: "/assets/images/posts/claude-code-data-engineering.svg"
  alt: "A terminal window connected to a chain of data models and a data warehouse, with a shield guarding the link to the database"
tags: ["Claude Code", "AI", "dbt", "MCP", "Amazon Redshift", "Data Engineering"]
updated: 2026-11-10
draft: false
---

A year ago, asking an AI assistant to add a model to a dbt project meant acting as the go-between. You pasted the source table's schema, explained the naming conventions, reminded it that staging models start with `stg_` and that every primary key needs a uniqueness test. It wrote a plausible query. You copied it, ran it, found that a column had a different name, went back and started over.

The SQL, in that loop, was the easy part. The real work was transferring context: what the warehouse looks like, which rules the team follows, what's already built upstream and what breaks downstream.

In 2026 Claude Code changed mostly on this point. It doesn't write much better SQL than before, but it can read the project's metadata on its own, query the warehouse, follow the team's conventions written in a file, start a build and wait for the result while it does something else. And the way you decide what it's allowed to do without asking has changed too.

In this post I go through the new features that matter for people who work with pipelines, models and data warehouses, with an eye on a question every data engineer asks early on: how do I let it work near production data without risking breaking something?

## The bottleneck wasn't the SQL

The most concrete case published so far comes from DocuSign, told by dbt Labs at the end of October. The analytics engineering team noticed that time wasn't going into writing queries, but into constant context switching: the requirement in a ticket, the project's conventions "mostly in people's heads", repeated validation on every change.

The solution they built splits the jobs cleanly. Claude Code coordinates the work. A set of **skills** carries the project's conventions. The **dbt MCP server** provides metadata and lineage. The dbt engine validates the compiled SQL before a pull request is opened. The flow is split into phases, discovery, development, orchestration, so a failed phase can be retried on its own without starting over.

The reported result is a 50% productivity gain, from requirement to a validated, review-ready model. It's a pilot figure reported by the team itself, not an independent measurement, and should be read that way. But the structure of the solution is interesting regardless of the number, because it maps almost piece by piece onto this year's Claude Code features.

## Context: skills and plugins

A **skill** is a folder with a `SKILL.md` file: a header with a name and description, and instructions in Markdown underneath. Claude loads it when a request matches the description, or you invoke it by hand with `/skill-name`. Project skills live in `.claude/skills/` and are versioned in the repository alongside the code, so the whole team works with the same rules.

For a data team it's the natural place to write down what today sits in a wiki page nobody opens: what models are called at each layer, which tests are mandatory, how a column is documented, which tables must never be queried without a date filter. A skill that kicks in by itself when someone asks "add a model for refunded orders" is worth more than any guideline.

You don't have to start from scratch. dbt Labs maintains a public collection of skills for dbt, covering analytics engineering, unit tests, documentation, the semantic layer, diagnosing failed jobs and migrating to the new engine. It installs as a plugin:

```text
/plugin marketplace add dbt-labs/dbt-agent-skills
/plugin install dbt@dbt-agent-marketplace
```

A **plugin** is exactly that: a package that bundles skills, hooks, agents and MCP servers into a single install. It's the simplest way to give the whole team the same way of working. Since September there's also a command, `claude plugin eval`, to check on test cases whether a plugin actually improves answers compared to working without it, and `/skill-doctor`, which shows how much context each skill uses and how often it's used.

## Systems: MCP servers for dbt and the warehouse

Skills tell Claude how to work. **MCP servers** give it access to the systems it works on.

The dbt MCP server exposes groups of tools for running SQL, the semantic layer, searching metadata and lineage, CLI commands (`build`, `run`, `test`, `compile`), and generating YAML and staging models. The README warns that the CLI tools can modify models, sources and warehouse objects: enable them knowing what you're granting.

For the warehouse, AWS publishes an MCP server for Amazon Redshift. The detail that matters most is the default behavior: the server starts read-only, and any value other than `read-write`, typos included, keeps it read-only. Even in write mode, it asks for confirmation before every statement that may change data. And the README says it plainly: the real security boundary is the database user's privileges, not the server.

The configuration can be shared with the team in a `.mcp.json` file at the project root:

```json
{
  "mcpServers": {
    "redshift": {
      "command": "uvx",
      "args": ["awslabs.redshift-mcp-server@latest"],
      "env": {
        "AWS_PROFILE": "analytics-readonly",
        "AWS_DEFAULT_REGION": "eu-west-1",
        "ACCESS_MODE": "read-only"
      }
    }
  }
}
```

Writing `ACCESS_MODE` even though it's already the default isn't redundant: it makes the choice visible to whoever reads the file. And the AWS profile should point to a user with read-only permissions, on the schemas that are needed and not on the whole cluster. When someone opens the project in an interactive session, Claude Code asks for confirmation before enabling the servers defined in `.mcp.json`.

Two new features make it more practical to connect many servers. The first is **tool search**, on by default: at the start of a session only tool names are loaded, and full definitions only when needed. You can connect dbt, the warehouse, the orchestrator and the catalog without filling the context with unused descriptions. The second, from November 6, is support for **MCP tasks**: when a server runs a call as a long-running task, Claude Code moves it to the background right away and picks up the result when it arrives. For a heavy query or a twenty-minute build that's exactly the behavior you want.

## Long jobs: background agents, Monitor, routines

A data engineer's work is full of waiting. A full build, a six-month backfill, a job running on the orchestrator. Until recently, the assistant waited with you.

Since July, **subagents** run in the background by default: Claude keeps working while a separate agent handles an isolated task, and picks up its result when it finishes. A typical use is asking a subagent to analyze the downstream lineage of a table you're about to change, while the main session prepares the change. The main session's context stays clean, because only the conclusion comes back.

In April came the **Monitor** tool, which starts a background watcher and streams its events into the conversation. You can use it to follow the log of a dbt build or a Spark job and react to the first error, instead of waiting for the end or checking by hand every few minutes.

For recurring tasks there's `/loop`, which repeats an instruction at intervals within a session, and **routines** in Claude Code on the web, which start cloud agents on a schedule, on a GitHub event or from an API call. A reasonable example: every morning, check the tests that failed overnight, read the logs, and open a pull request with a proposed fix, which a person reviews before merging.

## Safety: auto mode, rules and hooks

Here's the real question. An agent that can run commands and query the warehouse is useful precisely because it acts. And it's risky for the same reason.

Since August the starting mode for interactive sessions is **auto mode**. Instead of asking for confirmation on every command, a separate model reviews actions before they run and blocks the ones that go beyond the request, touch unrecognized infrastructure or seem driven by hostile content read during the work. Blocked by default are, among others, production deploys and migrations and sending sensitive data outside. The documentation is honest about the limit: auto mode reduces permission prompts, but doesn't guarantee safety.

That's why it pays to build defenses in layers, from the strongest to the weakest.

1. **System permissions.** A read-only database user, a cloud profile with the bare minimum, no production credentials on the machine unless needed. It's the only layer no mistake by the agent can get around.
2. **Claude Code permission rules.** `deny` rules apply in every mode, even the most permissive. Since November, the `permissions.denyInsteadOfPrompting` setting directly denies calls that would otherwise wait on a confirmation, useful for sessions running with nobody watching.
3. **Hooks.** A `PreToolUse` hook is a script Claude Code runs before every tool call, and it can block the call. The documentation shows one that reads the incoming command or query and rejects `DROP TABLE`, `TRUNCATE TABLE` and `rm -rf`. It also warns that a regex-based check can be bypassed: it's a guardrail, not a security boundary.
4. **The sandbox.** Since August, on Linux and WSL2, the sandbox can mask credential files: commands see a placeholder copy and the real value is substituted only on the way out to authorized services.

The order matters. A well-written hook doesn't make up for a database user with admin privileges. First restrict what the system allows, then add the agent's own checks.

## Teamwork: sessions that talk to each other

Two August features concern people working in a team. Claude Code sessions can **message each other**: the documentation's example is almost a data engineering case, one session telling another that the `users.name` column is now `users.display_name`. Whoever works on the upstream model can tell whoever works on the downstream dashboard without going through a chat.

For teams that can't let code and data leave their network, **self-hosted environments** arrived, in public beta on Team and Enterprise plans: sessions started from Claude Code on the web run on the company's machines, inside its network, next to the warehouse.

## What doesn't change

With all these features, it's easy to think the data engineer's job is shifting toward supervising agents. In part it is. But the hardest parts of the craft are still where they were.

**Definitions are still a decision.** Claude Code can write the quarterly revenue model in seconds. It can't decide whether revenue includes returns. If nobody has decided, the agent will pick a plausible version, and write it with the same confidence it writes everything else. It's the same problem I wrote about in the [data governance](/posts/data-governance-chi-decide/) post: an agent makes producing numbers faster, so it makes not knowing who decides which number counts more expensive.

**Modeling is still design.** An agent follows the conventions it finds well. If the project has three different ways of counting active customers, it will follow all three. Skills work when they encode decisions already made, not when they stand in for missing ones.

**Review is still human.** In the DocuSign case the rule was clear: AI proposes, and engineers stay accountable for what gets merged. The isolated branch, the pull request and the review aren't a formality to skip once the agent gets good. They're the point where a person takes responsibility for the change.

**Cost still needs watching.** The DocuSign team capped test runs at a thousand rows, so an agent couldn't accidentally trigger a billion-row build. An agent that tries, fails and retries can use a lot of warehouse resources without anyone noticing, until the bill arrives.

## An exercise to get started

If you want to try Claude Code on a real data project, there's a path that takes an afternoon and doesn't touch anything important.

First write a project skill with the three team rules most often broken in pull requests. Not all the conventions: just those three. Then connect an MCP server to the warehouse, read-only, with a user that sees only a development schema. Finally ask Claude Code for a small but complete task: add a model, with tests and documentation, and open a pull request.

Then look at the pull request as you'd look at one from a colleague who just joined. Did it follow the three rules? Did it ask about definitions, or decide on its own? How many queries did it run on the warehouse to get there?

The answers say more than any benchmark about how ready your project is to work with an agent. And almost always they show that the first job to do isn't about AI, but about the rules and definitions that so far have stayed in people's heads.

## Sources

Pages used to write and verify this post.

- [Claude Code: What's new](https://code.claude.com/docs/en/whats-new) and [changelog](https://code.claude.com/docs/en/changelog) (Anthropic): the weekly feature digest and release notes, including November's MCP tasks and `denyInsteadOfPrompting`
- [Week 15](https://code.claude.com/docs/en/whats-new/2026-w15), [Week 27](https://code.claude.com/docs/en/whats-new/2026-w27) and [Week 32](https://code.claude.com/docs/en/whats-new/2026-w32) (Anthropic): the Monitor tool, background subagents, auto mode as the default, cross-session messaging, self-hosted environments and credential masking
- [Skills](https://code.claude.com/docs/en/skills), [MCP](https://code.claude.com/docs/en/mcp), [Hooks](https://code.claude.com/docs/en/hooks) and [Permission modes](https://code.claude.com/docs/en/permission-modes) (Anthropic): reference documentation for the features described
- [How DocuSign cut analytics engineering time in half](https://www.getdbt.com/blog/docusign-claude-code-dbt-v2-mcp-agent-skills) (dbt Labs): the DocuSign case with Claude Code, dbt skills and the dbt MCP server
- [dbt-mcp](https://github.com/dbt-labs/dbt-mcp) and [dbt-agent-skills](https://github.com/dbt-labs/dbt-agent-skills) (dbt Labs): the MCP server and the skill collection for dbt
- [Amazon Redshift MCP Server](https://github.com/awslabs/mcp/tree/main/src/redshift-mcp-server) (AWS Labs): the MCP server for Redshift, read-only by default
