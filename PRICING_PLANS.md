# Pricing Plans Details

## Plan 1 — Free

- **Name**: Free
- **Key**: `tier-free`
- **Monthly Price**: $0
- **Annual Price**: $0 / month (billed annually)
- **Description**: Best for small teams trying the product.
- **Fixed Charges**: None
- **Features**:
  - Up to 5 Workspaces
  - Up to 5 Channels per workspace
  - Basic team chat
  - Member messaging only

---

## Plan 2 — Pro

- **Name**: Pro
- **Key**: `tier-pro`
- **Monthly Price**: $9
- **Annual Price**: $7.50 / month (billed annually)
- **Description**: Best for growing teams.
- **Fixed Charges**: Fixed subscription fee
- **Features**:
  - Unlimited Workspaces
  - Unlimited Channels
  - Threaded messages
  - Infinite chat history
  - Faster performance
  - Priority support

---

## Plan 3 — AI

- **Name**: AI
- **Key**: `tier-ai`
- **Monthly Price**: $19
- **Annual Price**: $15.80 / month (billed annually)
- **Description**: Best for teams that want AI productivity.
- **Fixed Charges**: Fixed subscription fee including AI compute costs
- **Features**:
  - AI message polishing
  - AI conversation summaries
  - AI compose messages
  - AI thread assistance
  - Smart typo correction
  - Future AI upgrades
  - All features from Pro plan

---

## Technical Configuration Notes (Kinde)

- **Property Key**: `plan`
- **Mapping**: Values must match the **Key** (`tier-free`, `tier-pro`, `tier-ai`) to ensure application logic correctly enforces limits.
- **Redirect URL**: Ensure `postLoginRedirectURL` is set to `/workspace` to trigger plan verification upon login.
