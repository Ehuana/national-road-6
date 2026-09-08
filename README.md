<div align="center">

```text
╔════════════════════════════════════════════════════╗
║                                                    ║
║                 _   _ ____   __                    ║
║                | \ | |  _ \ / /_                   ║
║                |  \| | |_) | '_ \                  ║
║                | |\  |  _ <| (_) |                 ║
║                |_| \_|_| \_\\___/                  ║
║                                                    ║
║      A CAMBODIAN MONSOON SURVIVAL TRAIL GAME       ║
║                   SEPTEMBER 1962                   ║
║                                                    ║
╚════════════════════════════════════════════════════╝
```

```text
   PHNOM PENH  ───────────────────────────────►  SIEM REAP
                    310 KM · NATIONAL ROAD 6
                       MONSOON SEASON
```

![JavaScript](https://img.shields.io/badge/javascript-ES6%2B-9bbc0f?style=for-the-badge&labelColor=0f380f)
![HTML5](https://img.shields.io/badge/HTML5-terminal_UI-9bbc0f?style=for-the-badge&labelColor=0f380f)
![Tailwind](https://img.shields.io/badge/tailwind_CSS-CDN-9bbc0f?style=for-the-badge&labelColor=0f380f)
![License](https://img.shields.io/badge/license-MIT-9bbc0f?style=for-the-badge&labelColor=0f380f)

**INSTRUCTION MANUAL**
*Please read carefully before use.*

</div>

---

```text
┌── SYSTEM SPECIFICATIONS ───────────────────────────┐
│ GENRE ..... SURVIVAL / TRAIL                       │
│ PLAYERS ... 1                                      │
│ PLATFORM .. WEB BROWSER (HTML5)                    │
│ LANGUAGE .. JAVASCRIPT (ES6+)                      │
│ DISPLAY ... TAILWIND CSS + CUSTOM CRT SHADER       │
│ SAVE ...... LOCALSTORAGE TOMBSTONES                │
└────────────────────────────────────────────────────┘
```

```text
┌── ⚠ WARNING ───────────────────────────────────────┐
│ THIS PROGRAM CONTAINS FLOODED ROADS, RIVER         │
│ CROSSINGS, AND UNFORGIVING MONSOON WEATHER.        │
│ VEHICLE FAILURE, SUPPLY LOSS, AND PARTY DEATH ARE  │
│ ALL POSSIBLE OUTCOMES. PLAYER DISCRETION IS        │
│ ADVISED.                                           │
└────────────────────────────────────────────────────┘
```

---

## Contents

- [I. The Story](#i-the-story)
- [II. Choose Your Character](#ii-choose-your-character)
- [III. Features](#iii-features)
- [IV. The Controls](#iv-the-controls)
- [V. Supplies & Status](#v-supplies--status)
- [VI. Loading Instructions](#vi-loading-instructions)
- [VII. Program Listing](#vii-program-listing)
- [VIII. License](#viii-license)

---

## I. The Story

**YEAR: 1962 · REGION: CAMBODIA · SEASON: MONSOON**

It is September 1962, during the Sangkum Reastr Niyum era. Phnom Penh is
behind you; Siem Reap and Angkor Wat lie 310 kilometres north along National
Road 6. The monsoon is at its peak. Red clay, swollen rivers, flooded fields,
and uncertain roads will test your supplies and your judgment.

You have one road, a loaded vehicle, and a party whose survival depends on
every decision.

## II. Choose Your Character

Before the journey begins, select the life you will travel it as:

```text
┌── RICE MERCHANT ───────────────────────────────────┐
│ VEHICLE: Bedford truck                             │
│                                                    │
│ Loaded and fuel-dependent. Trades rice up the      │
│ road.                                              │
└────────────────────────────────────────────────────┘
```

```text
┌── SCHOOL TEACHER ──────────────────────────────────┐
│ VEHICLE: Ox-cart                                   │
│                                                    │
│ Slow and steady. Requires no fuel at all.          │
└────────────────────────────────────────────────────┘
```

```text
┌── VISITING JOURNALIST ─────────────────────────────┐
│ VEHICLE: Peugeot 203                               │
│                                                    │
│ Fast but fragile, and costly to keep running.      │
└────────────────────────────────────────────────────┘
```

## III. Features

**★ JOURNEY & PARTY**
- Three starting backgrounds: Rice Merchant, School Teacher, and Visiting Journalist
- Custom leader and companion naming with classic party setup mechanics
- Dynamic ASCII timeline map tracking the vehicle across the 310 km route

**★ HAZARDS & DECISIONS**
- Major river crossings at the Mekong and Stung Sen with ferry, ford, and sampan choices
- Sixteen weighted monsoon events inspired by roadside travel, trade, illness, and vehicle trouble
- Adjustable rations and travel pace with meaningful risk and resource tradeoffs

**★ PRESENTATION**
- 16:9 CRT terminal interface with phosphor glow and scanlines
- ASCII vehicles, markets, ferries, jungle roads, and Angkor Wat landmarks
- Persistent `localStorage` tombstones that memorialize failed journeys

## IV. The Controls

The game is controlled from the terminal input line. Type a command and press Enter.

```text
┌── KEYPAD REFERENCE ────────────────────────────────┐
│ 1 ......... CONFIRM / TRAVEL / OPTION ONE          │
│ 2 ......... OPTION TWO / SECONDARY MENU            │
│ 3 ......... OPTION THREE / ADJUST PACE             │
│ 4 ......... OPEN ROADSIDE SHOP                     │
│ 5 ......... REVIEW PARTY STATUS                    │
│ 0 ......... LEAVE SHOP / BACK                      │
└────────────────────────────────────────────────────┘
```

Manage the essentials:

- **Rice and dried fish** feed the party each day.
- **Fuel** powers the Bedford and Peugeot; the ox-cart does not need petrol.
- **Spare tires and medicine** can turn a disaster into a delay.
- **Riels** buy supplies, repairs, ferries, and local help.
- **Rations** affect food consumption, while **pace** affects speed, danger, health, and event frequency.

## V. Supplies & Status

| Resource | Effect |
|---|---|
| Rice & dried fish | Feeds the party each day |
| Fuel | Powers the Bedford and Peugeot (not the ox-cart) |
| Spare tires & medicine | Turns a disaster into a delay instead of a death |
| Riels | Buys supplies, repairs, ferries, and local help |
| Rations & pace | Governs food use, speed, danger, and event frequency |

> Reach Siem Reap alive. The road remembers those who do not.

## VI. Loading Instructions

This is a browser-first static project — no cartridge required. No build step or package installation is necessary.

1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already installed.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Enter commands in the terminal window to begin the journey.

The project loads Tailwind CSS and the VT323 font from CDNs, so an internet connection is recommended during development.

## VII. Program Listing

```text
┌── PROGRAM LISTING ─────────────────────────────────┐
│ .                                                  │
│ +-- index.html    Terminal layout & game screen    │
│ +-- style.css     CRT effects & framing            │
│ +-- asciiData.js  Vehicles, locations, weather art │
│ +-- events.js     Weighted 1962 event catalog      │
│ +-- game.js       State machine & persistence      │
└────────────────────────────────────────────────────┘
```

## VIII. License

Released under the MIT License. See [LICENSE](LICENSE).

<div align="center">

---

**END OF MANUAL**

*Good luck, traveler.*

</div>
