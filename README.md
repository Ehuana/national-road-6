# ```text
#  _   _    _  _____ ___ ___  _   _  ___  _        _   
# | \ | |  / \|_   _|_ _/ _ \| | | |/ _ \| |      / \  
# |  \| | / _ \ | |  | | | | | | | | | | | |     / _ \ 
# | |\  |/ ___ \| |  | | |_| | |_| | |_| | |___ / ___ \ 
# |_| \_/_/   \_\_| |___\___/ \___/ \___/|_____|_/   \_\
# ```

## A Cambodian Monsoon Survival Trail Game (1962)

```text
                         [ NATIONAL ROAD 6 ]
             PHNOM PENH  ----------------->  SIEM REAP
                         310 KM NORTH
                    MONSOON SEASON // SEPTEMBER
```

You have one road, a loaded vehicle, and a party whose survival depends on
every decision.

## Historical Premise

It is September 1962, during the Sangkum Reastr Niyum era. Phnom Penh is
behind you; Siem Reap and Angkor Wat lie 310 kilometres north along National
Road 6. The monsoon is at its peak. Red clay, swollen rivers, flooded fields,
and uncertain roads will test your supplies and your judgment.

Choose your life before the journey begins: trade rice from a Bedford truck,
teach your way north by ox-cart, or report the road as a visiting journalist
in a fast but costly Peugeot 203.

## Features

- 16:9 CRT terminal interface with phosphor glow and scanlines.
- Three starting backgrounds: Rice Merchant, School Teacher, and Visiting Journalist.
- Custom leader and companion naming with classic party setup mechanics.
- Dynamic ASCII timeline map tracking the vehicle across the 310 km route.
- Major river crossings at the Mekong and Stung Sen with ferry, ford, and sampan choices.
- Sixteen weighted monsoon events inspired by roadside travel, trade, illness, and vehicle trouble.
- Adjustable rations and travel pace with meaningful risk and resource tradeoffs.
- Persistent `localStorage` tombstones that memorialize failed journeys.
- ASCII vehicles, markets, ferries, jungle roads, and Angkor Wat landmarks.

## Tech Stack

- Vanilla JavaScript (ES6+)
- HTML5
- Tailwind CSS via CDN
- Custom CSS for CRT effects
- Monospace ASCII art

## How to Play

The game is controlled from the terminal input line. Type a command and press
Enter.

```text
1  Confirm, travel, or choose the first listed action
2  Choose the second listed action or open a secondary menu
3  Choose the third listed action or adjust pace
4  Open the roadside shop when available
5  Review party status when available
0  Leave a shop or return from a sub-menu
```

Manage the essentials:

- **Rice and dried fish** feed the party each day.
- **Fuel** powers the Bedford and Peugeot; the ox-cart does not need petrol.
- **Spare tires and medicine** can turn a disaster into a delay.
- **Riels** buy supplies, repairs, ferries, and local help.
- **Rations** affect food consumption, while **pace** affects speed, danger,
  health, and event frequency.

Reach Siem Reap alive. The road remembers those who do not.

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
index.html    Terminal layout and game screen
style.css     CRT display effects and responsive frame styling
asciiData.js  Vehicles, locations, landmarks, and weather art
events.js     Weighted September 1962 event catalog
game.js       State machine, travel loop, supplies, and persistence
```

## License

Released under the MIT License. See [LICENSE](LICENSE).
