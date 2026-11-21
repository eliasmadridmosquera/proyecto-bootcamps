---
name: ahk-fix
description: Turn a reported defect or Jira issue into a reviewable, evidence-backed fix specification.
---

## Provider Delegation Guidance

- Sequential: Use @<role-name> to delegate to a specific agent. Claude selects the subagent by role name.
- Parallel: Launch multiple @mentions in a single message for parallel work.
- Context Transfer: Pass a self-contained objective, scope, known context, restrictions, and output contract with each @mention.
- Wait For Completion: Wait for each @mention to complete before proceeding to the next step.


## Purpose

Read [the fix workflow](resources/fix-workflow.md) before discovery and [the fix template](resources/fix-template.md) before saving.

## Persistence and handoff

After the required questions and project evidence produce a complete first synthesis, create or update a `fix` draft with structured specification MCP tools. Use `specs.list` and `specs.search` to find related context, `specs.get` to read it, and `specs.validate` after every write. Keep drafts reviewable and editable through MCP; transition to `approved` only after explicit user confirmation.

Never label a suspected cause as confirmed without evidence. Offer `ahk-spec-tech` only after this fix is approved and the user asks for technical design.
