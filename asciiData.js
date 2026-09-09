/*
 * National Road 6 — ASCII artwork library
 *
 * String.raw keeps backslashes and intentional spaces intact when these
 * templates are inserted into a <pre> or an element styled with white-space:
 * pre. This file is loaded before game.js and exposes ASCII_ART globally.
 */

const ASCII_ART = {
  vehicles: Object.freeze({
    oxCart: String.raw`          __________________________________________________
     ___/  _  _  _  _  _  _  _  _  _  _  _  _  _  _  \___
    /  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  \
   /______________________________________________________\
          O                                      O
         /|\                                    /|\
        / | \                                  / | \
       /  |  \________________________________/  |  \
      /___|_____________________________________|___\
          \                                      /
           \____________________________________/
              Cambodian wooden ox-cart`,

    peugeot203: String.raw`
                   ______--------___
                  /|             / |
        o___________|_\__________/__|
      ]|___     |  |=   ||  =|___  |"
      //   \\    |  |____||_///   \\|"
      |  X  |\--------------/|  X  |\"
       \___/                  \___/
                Peugeot 203`,

    bedfordTruck: String.raw`             _________________________________
        ____/|                                 |\____
       /____||_________________________________| |___\
      |     | |   BEDFORD  CARGO  SERVICE     | |   |
      |     | |________________________________| |   |
      |_____|/                                  \|___|
       \___________________________________________/
          O       O                         O       O
         /|\     /|\                       /|\     /|\
        /_|_\   /_|_\_____________________/​_|_\   /_|_\
             commercial heavy transport`,
  }),

  locations: Object.freeze({
    phnomPenh: String.raw`
       .------------------.          .------------------.
      /      NW WING       \        /      NE WING       \
     |                      \      /                      |
      \     .------------.   \    /   .------------.     /
       \   /              \   \  /   /              \   /
        \ /                \   \/   /                \ /
         \                  \  /\  /                  /
          \                  \/  \/                  /
           \       .-------------------------.      /
            \    .'       .------------.      '.   /
             \  /        /  .--------.  \       \ /
              ;         |  /   (  )   \  |       ;
              |         | |    (OO)    | |       |
              ;         |  \   (  )   /  |       ;
             /  \        \  '---------'  /      / \
            /    '.       '-------------'     .'   \
           /       '-------------------------'      \
          /                  /\  /\                  \
         /                  /  \/  \                  \
        / /                /   /\   \                \ \
       /   \              /   /  \   \              /   \
      /     '------------'   /    \   '------------'     \
     |                      /      \                      |
      \      SW WING       /        \      SE WING       /
       '------------------'          '------------------'
                   PHSAR THMEI // PHNOM PENH`,

    ferry: String.raw`       ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
             |\                         /|
             | \_______________________/ |
             |  |  MEKONG CROSSING    |  |
       ______|__|______________________|__|______
      /       |  |   ____       ____   |  |       \
     /________|__|__/____\_____/____\__|__|________\
       O          O                 O          O
       ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
                    FERRY // MEKONG RIVER`,

    jungleRoad: String.raw`       /\                 _/\_                 /\
      /  \      _       /    \       _       /  \
     /    \    / \     /  /\  \     / \     /    \
    /  ||  \  /   \   /  /  \  \   /   \  /  ||  \
   /___||___\/_____\_/__/____\__\_/_____\__/___||___\
                 _________
          ______/  _ _ _  \______
      ___/       _/       \_      \___
     /__________/  NATIONAL \__________\
          muddy dirt track north`,

    angkorWat: String.raw`                         /\
                        /  \
                       / /\ \
              /\      / /  \ \      /\
             /  \    / /    \ \    /  \
            /    \  / /______\ \  /    \
           /      \/ /        \ \/      \
          /_________/__________\_________\
             |     |     |     |     |
             |     |     |     |     |
             |_____|_____|_____|_____|
        ______________________________________
                    ANGKOR WAT`,

    brokenBridge: String.raw`              __________________________
             /                          \
            /     BROKEN BRIDGE         \
      _____/____________________________\_____
           \        \        \        \
            \________\________\________\
                 ~  ~  ~  ~  ~
                 ROAD AHEAD CLOSED`,

    traderNPC: String.raw`                 _____________
                /             \
               /   TRADER      \
              /_________________\
                 |  _  _  _  |
                 | | | | | | |
                 | |_| |_| |_| 
                 |____________|
                    /|     |\
                   /_|_____|_\
                 ROADSIDE MARKET`,
  }),

  weather: Object.freeze({
    monsoonRain: String.raw`\  \  .  \  \  .  \  \  .  \  \  .  \  \
 .  \  \  .  \  \  .  \  \  .  \  \  .  \
\  \  .  \  \  .  \  \  .  \  \  .  \  \  `,
  }),
};

// Short aliases make event definitions easy to read: ASCII_ART.ferry, etc.
ASCII_ART.ferry = ASCII_ART.locations.ferry;
ASCII_ART.brokenBridge = ASCII_ART.locations.brokenBridge;
ASCII_ART.traderNPC = ASCII_ART.locations.traderNPC;
ASCII_ART.angkorWat = ASCII_ART.locations.angkorWat;
ASCII_ART.monsoonRain = ASCII_ART.weather.monsoonRain;
Object.freeze(ASCII_ART);

// index.html loads scripts normally (without type="module"), so expose the
// collection on window for game.js and future UI components.
window.ASCII_ART = ASCII_ART;