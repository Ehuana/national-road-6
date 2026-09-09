<div class="nr6-manual" style="max-width:960px;margin:24px auto;padding:28px;color:#9bbc0f;background:#080b08;border:2px solid #9bbc0f;border-radius:8px;font-family:monospace;">

<div align="center">

<div class="nr6-screen" style="padding:18px;background:#040704;border:1px solid #9bbc0f;">

~~~text
 _ __                           _   _ __                   
' )  )     _/_                 //  ' )  )           /    / 
 /  / __.  /  o __ ____  __.  //    /--' __ __.  __/    /_ 
            /  (_(_/|_<__<_(_)/ / <_(_/|_</_   /  \_(_)(_/|_(_/_   (__)            

N A T I O N A L   R O A D   6
CAMBODIA / SEPTEMBER 1962 / MONSOON
~~~

</div>

<p class="nr6-label" style="color:#ffb000;letter-spacing:.18em;">OFFICIAL PROGRAM MANUAL / PRE-ALPHA BUILD</p>

![JavaScript](https://img.shields.io/badge/JAVASCRIPT-ES6%2B-9bbc0f?style=for-the-badge&labelColor=080b08)
![HTML5](https://img.shields.io/badge/HTML5-TERMINAL_UI-9bbc0f?style=for-the-badge&labelColor=080b08)
![Tailwind](https://img.shields.io/badge/TAILWIND-CDN-9bbc0f?style=for-the-badge&labelColor=080b08)
![License](https://img.shields.io/badge/LICENSE-MIT-ffb000?style=for-the-badge&labelColor=080b08)

</div>

<div class="nr6-alert" style="padding:12px;color:#ffb000;border-left:4px solid #ffb000;background:#171204;">

**FIELD NOTICE:** National Road 6 is flooded, unpaved, and unforgiving. Carry
rice. Protect the vehicle. Respect the rivers.

</div>

## SYSTEM SPECIFICATIONS

<table class="nr6-table">
  <tr><th>GENRE</th><td>Monsoon survival trail game</td></tr>
  <tr><th>PLAYERS</th><td>One determined traveller</td></tr>
  <tr><th>PLATFORM</th><td>Modern web browser / HTML5</td></tr>
  <tr><th>DISPLAY</th><td>4:3 phosphor-green CRT terminal</td></tr>
  <tr><th>MEMORY</th><td>LocalStorage tombstones and high scores</td></tr>
</table>

## TABLE OF CONTENTS

<details open>
<summary><strong>OPEN MANUAL INDEX</strong></summary>

- [THE ROAD](#the-road)
- [CHOOSE YOUR LIFE](#choose-your-life)
- [A DAY ON NR6](#a-day-on-nr6)
- [WEATHER AND ILLNESS](#weather-and-illness)
- [THE CONTROLS](#the-controls)
- [SURVIVAL EQUIPMENT](#survival-equipment)
- [PROGRAM FILES](#program-files)
- [LOADING PROCEDURE](#loading-procedure)

</details>

## THE ROAD

~~~text
PHNOM PENH  ==========================================>  SIEM REAP
                       310 KM / NATIONAL ROAD 6
~~~

September 1962. Under Prince Norodom Sihanouk's Sangkum Reastr Niyum, Phnom
Penh presents itself as a modern capital. Beyond the city, though, the monsoon
turns red-clay roads into traps and wooden bridges into questions.

Your party travels north toward Siem Reap and Angkor Wat. The route is only
310 km long. In September, it can take weeks.

Use the **Historical Context (1962)** terminal archive to read field notes on
the Sangkum era, NR6 road conditions, and contemporary traveller reports.

## CHOOSE YOUR LIFE

<table class="nr6-table">
  <thead>
    <tr><th>BACKGROUND</th><th>TRANSPORT</th><th>STARTING ADVANTAGE</th></tr>
  </thead>
  <tbody>
    <tr><td>Rice Merchant</td><td>Bedford Truck / 12 km daily base</td><td>4,000 riels, 60 kg rice, 40 L fuel</td></tr>
    <tr><td>School Teacher</td><td>Ox-Cart / 8 km daily base</td><td>No fuel required; resilient party</td></tr>
    <tr><td>Visiting Journalist</td><td>Peugeot 203 / 16 km daily base</td><td>8,000 riels and speed; expensive repairs</td></tr>
  </tbody>
</table>

Before departure, name a leader, assemble one to four companions, and shop at
Phsar Thmei for rice, fuel, spare tires, and quinine.

## A DAY ON NR6

<div class="nr6-screen" style="padding:14px;background:#040704;border:1px solid #9bbc0f;">

~~~text
  MORNING TRAVEL
        |
        v
  AFTERNOON TRAVEL
        |
        v
  NIGHT CAMP
~~~

</div>

At the end of each day, choose a night strategy:

<table class="nr6-table">
  <tr><th>CHOICE</th><th>RESULT</th></tr>
  <tr><td>Camp Roadside</td><td>Free, but carries higher fever and malaria risk.</td></tr>
  <tr><td>Rest at a Wat/Pagoda</td><td>Lose one extra day; restore 15 health and cure Fever.</td></tr>
  <tr><td>Risk Night Driving</td><td>Gain 10 km; 50% chance of a mud breakdown.</td></tr>
</table>

## WEATHER AND ILLNESS

<div class="nr6-screen" style="padding:14px;background:#040704;border:1px solid #9bbc0f;">

~~~text
CLEAR ............ 100% SPEED
MONSOON RAIN .....  50% SPEED
FLASH FLOOD ......   0 KM / FORCED HALT

HEALTHY --> FEVER --> MALARIA
~~~

</div>

Bare Bones rations during monsoon rain can bring Fever. Untreated Fever
becomes Malaria after two days. Malaria drains 15 health per day. Use quinine
before the road decides for you.

The weighted event deck includes flooded rivers, stalled ferries, leeches,
broken lorries, weather warnings, roadside trade, a **Washed-out Timber
Bridge**, and the multi-turn **Deep Clay Mud Pit**.

## THE CONTROLS

<table class="nr6-table">
  <tr><th>KEY</th><th>FIELD FUNCTION</th></tr>
  <tr><td><kbd>1</kbd></td><td>Confirm / travel / first option</td></tr>
  <tr><td><kbd>2</kbd></td><td>Second option / rations</td></tr>
  <tr><td><kbd>3</kbd></td><td>Third option / pace</td></tr>
  <tr><td><kbd>4</kbd></td><td>Roadside shop</td></tr>
  <tr><td><kbd>5</kbd></td><td>Party status</td></tr>
  <tr><td><kbd>6</kbd></td><td>Use quinine medicine</td></tr>
  <tr><td><kbd>0</kbd></td><td>Return / leave shop</td></tr>
</table>

Main terminal:

~~~text
1. BEGIN JOURNEY
2. HOW TO PLAY
3. HISTORICAL CONTEXT (1962)
~~~

## SURVIVAL EQUIPMENT

- **Rice and dried fish:** Daily food for the party.
- **Fuel:** Needed by the Bedford and Peugeot, not the ox-cart.
- **Spare tires:** A breakdown may become a delay instead of a grave.
- **Riels:** Buy supplies, ferries, ox teams, repairs, and assistance.
- **Rations and pace:** Trade comfort for distance; trade speed for danger.
- **Quinine:** Treats Fever and Malaria.

If the party fails, a tombstone is saved locally. On future journeys, you may
find that marker beside the road. Reach Angkor Wat alive to calculate a final
score and record a local high score.

## PROGRAM FILES

<div class="nr6-screen" style="padding:14px;background:#040704;border:1px solid #9bbc0f;">

~~~text
index.html    TERMINAL FRAME AND SCREEN
style.css     CRT GLASS, SCANLINES, PHOSPHOR GLOW
asciiData.js  VEHICLES, LANDMARKS, WEATHER ART
events.js     WEIGHTED SEPTEMBER 1962 EVENT DECK
game.js       STATE MACHINE, TRAVEL, SAVES, SCORING
~~~

</div>

## LOADING PROCEDURE

1. Open this folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right-click **index.html** and select **Open with Live Server**.
4. Type a command into the terminal. Press Enter. Head north.

The project loads Tailwind CSS and VT323 from CDNs, so an internet connection
is recommended during development.

---

<div align="center">

<span class="nr6-label" style="color:#ffb000;letter-spacing:.18em;">END OF MANUAL / GOOD LUCK, TRAVELLER</span>

Released under the [MIT License](LICENSE).

</div>

</div>
