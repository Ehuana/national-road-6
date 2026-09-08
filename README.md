<div align="center">

```text
 _   _ ____   __   
| \ | |  _ \ / /_  
|  \| | |_) | '_ \ 
| |\  |  _ <| (_) |
|_| \_|_| \_\\___/ 
```

**A Cambodian Monsoon Survival Trail Game — September 1962**

```text
   PHNOM PENH  ────────────────────────────►  SIEM REAP
                    310 KM · NATIONAL ROAD 6
                       MONSOON SEASON
```

![JavaScript](https://img.shields.io/badge/javascript-ES6%2B-9bbc0f?style=for-the-badge&labelColor=0f380f)
![HTML5](https://img.shields.io/badge/HTML5-terminal_UI-9bbc0f?style=for-the-badge&labelColor=0f380f)
![Tailwind](https://img.shields.io/badge/tailwind_CSS-CDN-9bbc0f?style=for-the-badge&labelColor=0f380f)
![License](https://img.shields.io/badge/license-MIT-9bbc0f?style=for-the-badge&labelColor=0f380f)

</div>

---

## Contents

- [Historical Premise](#historical-premise)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [How to Play](#how-to-play)
- [Local Setup](#local-setup)
- [Project Files](#project-files)
- [License](#license)

---

## Historical Premise

It is September 1962, during the Sangkum Reastr Niyum era. Phnom Penh is
behind you; Siem Reap and Angkor Wat lie 310 kilometres north along National
Road 6. The monsoon is at its peak. Red clay, swollen rivers, flooded fields,
and uncertain roads will test your supplies and your judgment.

Choose your life before the journey begins:

| Background | Vehicle | Style |
|---|---|---|
| **Rice Merchant** | Bedford truck | Loaded and fuel-dependent — trade rice north |
| **School Teacher** | Ox-cart | Slow and steady — no fuel required |
| **Visiting Journalist** | Peugeot 203 | Fast but fragile, and costly to keep running |

You have one road, a loaded vehicle, and a party whose survival depends on
every decision.

## Features

**Journey & Party**
- Three starting backgrounds: Rice Merchant, School Teacher, and Visiting Journalist
- Custom leader and companion naming with classic party setup mechanics
- Dynamic ASCII timeline map tracking the vehicle across the 310 km route

**Hazards & Decisions**
- Major river crossings at the Mekong and Stung Sen with ferry, ford, and sampan choices
- Sixteen weighted monsoon events inspired by roadside travel, trade, illness, and vehicle trouble
- Adjustable rations and travel pace with meaningful risk and resource tradeoffs

**Presentation**
- 16:9 CRT terminal interface with phosphor glow and scanlines
- ASCII vehicles, markets, ferries, jungle roads, and Angkor Wat landmarks
- Persistent `localStorage` tombstones that memorialize failed journeys

## Tech Stack

| Layer | Tool |
|---|---|
| Logic | Vanilla JavaScript (ES6+) |
| Structure | HTML5 |
| Styling | Tailwind CSS (CDN) + custom CRT effects |
| Art | Monospace ASCII |

## How to Play

The game is controlled from the terminal input line. Type a command and press
Enter.

| Key | Action |
|---|---|
| `1` | Confirm, travel, or choose the first listed action |
| `2` | Choose the second listed action or open a secondary menu |
| `3` | Choose the third listed action or adjust pace |
| `4` | Open the roadside shop (when available) |
| `5` | Review party status (when available) |
| `0` | Leave a shop or return from a sub-menu |

Manage the essentials:

- **Rice and dried fish** feed the party each day.
- **Fuel** powers the Bedford and Peugeot; the ox-cart does not need petrol.
- **Spare tires and medicine** can turn a disaster into a delay.
- **Riels** buy supplies, repairs, ferries, and local help.
- **Rations** affect food consumption, while **pace** affects speed, danger,
  health, and event frequency.

> Reach Siem Reap alive. The road remembers those who do not.

## Local Setup

This is a browser-first static project. No build step or package installation
is required.

1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already installed.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Enter commands in the terminal window to begin the journey.

The project loads Tailwind CSS and the VT323 font from CDNs, so an internet
connection is recommended during development.

## Project Files

```text
.
├── index.html      Terminal layout and game screen
├── style.css       CRT display effects and responsive frame styling
├── asciiData.js     Vehicles, locations, landmarks, and weather art
├── events.js        Weighted September 1962 event catalog
└── game.js          State machine, travel loop, supplies, and persistence
```

## License

Released under the MIT License. See [LICENSE](LICENSE).
