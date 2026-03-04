# Visianary Onboarding Prototype — CLAUDE.md

## Project Overview

**Product**: Visianary — a film production crew marketplace where crew members get hired for gigs, confirm availability in one tap, and get paid faster.

**Goal**: Build a clickable, stateful onboarding prototype for crew members (not producers). 5 screens total: Welcome → Screen 1 → Screen 2 → Screen 3 → Profile Landing.

**Site**: https://visianary.ai  
**Stack**: React (single JSX file), Tailwind utility classes only, no backend, all state in-memory.

---

## Design System

### Fonts
- **Headings**: Bebas Neue (Google Fonts) — all caps, bold, impactful
- **Body / UI**: Manrope (Google Fonts)

### Color Palette

```
/* Backgrounds — LIGHT theme */
--bg-primary:        #F1F6F7              /* Primary Widget Background */
--bg-card:           #F1F6F7 + 20% white  /* Card Background — use #F5F9FA approx */
--bg-notification:   #F1F6F7 + 40% white  /* Notification Background — use #F8FBFC approx */

/* Accent Colors */
--accent-orange:     #F25C05   /* Alert / Primary CTA */
--accent-green:      #009A84   /* Success green */
--accent-yellow:     #F1BD00   /* Warning yellow */
--accent-blue:       #05A2D7   /* Information blue */

/* Text */
--text-primary:      #0A0E12
--text-muted:        #8A9BAE
--text-on-dark:      #FFFFFF
```

### Status Badges
- CONFIRMED → `--accent-green` (#009A84)
- PENDING → `--accent-yellow` (#F1BD00)
- DECLINED → `--accent-orange` (#F25C05)
- PROGRESS → `--accent-blue` (#05A2D7)

### Progress Stepper
- 3 numbered steps connected by a line
- Active step: filled orange circle (`--accent-orange`)
- Inactive step: outlined circle, muted
- Completed step: filled green

### Cards
- Background: `#F5F9FA` (--bg-card approx)
- Border: 1px solid rgba(10,14,18,0.08)
- Border radius: 12px
- Padding: 20px

### Inputs
- Background: white
- Border: 1px solid rgba(10,14,18,0.15)
- Focus border: `--accent-orange` (#F25C05)
- Border radius: 8px
- Text: `--text-primary` (#0A0E12)
- Placeholder: `--text-muted` (#8A9BAE)

### Primary Button
- Background: `--accent-orange` (#F25C05)
- Text: white, Manrope, semibold
- Border radius: 8px
- Hover: slightly darker orange

### Tag/Skill Chips (multi-select)
- Default: `--bg-elevated` with muted border
- Selected: `--accent-orange` border + light orange background tint

---

## Screen Flow

### Screen 0 — Welcome Page
**Purpose**: Convert visitor into crew sign-up

**Content**:
- Visianary logo (top left)
- Headline (Bebas Neue): "STOP CHASING CREW" or "GET HIRED. SHOW UP. GET PAID."
- Subtext (Manrope): "Visianary is the marketplace for film production jobs. Members of the crew get 25% more opportunities with us."
- **Primary CTA button**: "Create Your Profile Now"
- **Secondary link**: "Are you a producer? Book time with our sales rep →"

---

### Screen 1 — "Let's Set Up Your Basic Info"
**Progress stepper**: Step 1 of 3 active

**Fields**:
1. Full Legal Name (text input)
2. Preferred Name / Display Name (text input)
3. Email — *this is also their username* (email input, helper text: "This will be your username")
4. Password (password input with show/hide toggle)
5. Location — City / Region (text input or simple dropdown)
6. Phone Number — *for alerts* (tel input, helper text: "Used for shoot-day alerts only")
7. Professional Headline / Role Seeking (text input, placeholder: e.g. "Grip • Gaffer • Set PA")
8. Years of Experience (segmented select: 0–1 / 2–5 / 6–10 / 10+)
9. Seniority Level (segmented select: Entry / Mid / Senior / Department Head)

**CTA**: "Continue →"

---

### Screen 2 — "Let's Set Up Your Portfolio"
**Progress stepper**: Step 2 of 3 active

**Fields**:
1. **Skills** — multi-select tag chips. Categories:
   - Camera: Director of Photography, Camera Operator, 1st AC, 2nd AC, DIT
   - Lighting: Gaffer, Best Boy Electric, Electrician
   - Grip: Key Grip, Best Boy Grip, Grip
   - Art: Production Designer, Set Decorator, Props Master
   - Sound: Production Sound Mixer, Boom Operator
   - Production: Line Producer, Production Coordinator, Set PA, Production Assistant
   - Post: Editor, Colorist, VFX Artist
   - Hair/MU: Hair Stylist, Makeup Artist, Key MUA
   
2. **Social / Portfolio Links**:
   - Instagram handle (text input, prefix: @)
   - Personal website (url input)
   - IMDb profile URL (url input)

3. **Portfolio Upload** — drag-and-drop or click to upload (images/pdf/reel link). Label: "Upload work samples (photos, PDF, reel)"

**CTA**: "Continue →"  
**Skip link**: "Skip for now →" (smaller, muted)

---

### Screen 3 — "Let's Enhance Your Portfolio"
**Progress stepper**: Step 3 of 3 active

**Context note** (shown as an info card): 
"Your profile won't be visible on the marketplace until you upload at least a few photos of yourself or your work, and complete your W9."

**Two options presented as cards (user picks one path)**:

**Option A — Quick Upload**
- "Upload 3 pictures" (of yourself or your work)
- File input, accepts images
- Preview thumbnails once uploaded

**Option B — Create a Project Folder**
- Name the project (text input)
- Upload all related files (images, PDFs, reel links)
- Label: "Group everything from one production together"

**W9 Section** (below both options):
- Label: "Tax Form W9"
- Subtext: "Required to receive payments through Visianary"
- Upload button: "Upload W9" 
- Alternative: "I'll do this later" (skip link, but shows a warning badge on profile)

**CTA**: "Finish & View My Profile →"  
**Skip link**: "Skip for now — I'll complete this later" (muted, smaller)

---

### Screen 4 — Profile Landing Page
**Purpose**: Reward completion, show the crew member their new profile shell

**Layout**:

**Right sidebar nav**:
- My Portfolio
- My Gigs
- Payout
- Messages
- Settings

**Center / Main area**:
- Welcome message: "Welcome, [Preferred Name]! Your profile is live." 
- If W9 or photos missing: show a soft warning card: "Complete your profile to appear in search results"
- **Browse Gigs** — CTA card (primary, orange)
- **Upcoming Gigs** — empty state with placeholder "No upcoming gigs yet. Start browsing!"

**Profile card preview** (top of main):
- Avatar placeholder (circle, initials)
- Display name + headline
- Location
- Skills chips (first 5 from Screen 2)
- Completion progress bar (% complete)

---

## Prototype Behavior

- All navigation handled with React `useState` — `currentScreen` (0–4)
- Form fields use controlled inputs with `useState`
- Data persists across screens in a single `userData` state object
- Skill chips toggle selected/unselected on click
- File uploads show filename or thumbnail preview (no actual upload needed — mock it)
- W9 upload can be a fake button that shows "w9_form.pdf ✓" on click
- Progress stepper updates correctly per screen
- "Skip" links advance to the next screen without validation
- "Back" button available on screens 1–3
- No form validation required for prototype — just needs to feel real

---

## Implementation Notes

- Single `.jsx` file
- Import Bebas Neue + Manrope from Google Fonts via `<style>` tag with `@import`
- Use Tailwind utility classes for layout; use inline styles for design system colors (since Tailwind doesn't have these custom values without a config)
- Light theme throughout — `--bg-primary` (#F1F6F7) as page background, `--text-primary` (#0A0E12) for text
- Mobile-first layout, max-width 480px centered (this is a crew mobile app)
- Smooth screen transitions (fade or slide)
- The Visianary wordmark: use the word "visianary" in Bebas Neue, orange (`#F25C05`), followed by a small tagline

---

## What This Prototype Is Testing

1. Is the 3-screen info collection feel manageable or overwhelming?
2. Do crew members understand why we need each field?
3. Is the W9 / photo gate on Screen 3 clear without being scary?
4. Does the Profile Landing feel like a reward / destination worth completing for?
