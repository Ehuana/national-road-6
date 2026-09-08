/*
 * National Road 6 — central game engine
 * Cambodia, September 1962
 *
 * Commands are intentionally small and terminal-friendly:
 * MENU:       1 begin journey, 2 how to play
 * CHARACTER:  1 rice merchant, 2 school teacher, 3 visiting journalist
 * OVERWORLD:  1 travel, 2 shop, 3 status
 * EVENT:      1 first response, 2 second response
 * SHOP:       1 rice, 2 dried fish, 3 fuel, 0 leave shop
 */

const GAME_STATES = Object.freeze({
  MENU: "MENU",
  HOW_TO_PLAY: "HOW_TO_PLAY",
  CHARACTER_SELECT: "CHARACTER_SELECT",
  NAME_LEADER: "NAME_LEADER",
  SET_PARTY_SIZE: "SET_PARTY_SIZE",
  NAME_COMPANIONS: "NAME_COMPANIONS",
  STARTING_SHOP: "STARTING_SHOP",
  OVERWORLD: "OVERWORLD",
  RATIONS: "RATIONS",
  PACE: "PACE",
  RIVER_CROSSING: "RIVER_CROSSING",
  EVENT_DECISION: "EVENT_DECISION",
  TOMBSTONE_EVENT: "TOMBSTONE_EVENT",
  SHOP: "SHOP",
  GAMEOVER: "GAMEOVER",
  VICTORY: "VICTORY",
});

const gameState = {
  state: GAME_STATES.MENU,
  day: 1,
  date: "September 1, 1962",
  location: "Phnom Penh",
  distanceTraveled: 0,
  targetDistance: 310,
  moneyRiels: 4000,
  supplies: {
    riceKg: 50,
    driedFishKg: 20,
    fuelLiters: 40,
    medicine: 5,
    spareTires: 1,
  },
  party: [
    { name: "Sokha", health: 100, status: "Healthy" },
    { name: "Dara", health: 100, status: "Healthy" },
    { name: "Vannak", health: 100, status: "Healthy" },
  ],
  leaderName: "",
  companionTarget: 0,
  companionIndex: 0,
  vehicle: {
    name: "Peugeot 203",
    speed: 45,
    fuelBurnRate: 5,
  },
  pace: "Steady",
  rationLevel: "Meager",
  riverCrossings: { 70: false, 190: false },
  pendingRiver: null,
  pendingTombstone: null,
  weather: "Clear",
  pendingEvent: null,
  character: "",
};

const PACE_MODIFIERS = Object.freeze({
  Steady: 1,
  Strenuous: 1.25,
  Grueling: 1.5,
  // Compatibility with older saved/in-memory defaults.
  Slow: 0.7,
  Moderate: 1,
});

const RATION_LEVELS = Object.freeze({
  Filling: { kgPerPerson: 1.5 },
  Meager: { kgPerPerson: 1 },
  "Bare Bones": { kgPerPerson: 0.5 },
});

const SHOP_PRICES = Object.freeze({
  riceKg: 30,
  driedFishKg: 55,
  fuelLiters: 80,
  spareTires: 250,
  medicine: 180,
});

const CHARACTER_PROFILES = Object.freeze({
  1: Object.freeze({
    name: "Rice Merchant",
    moneyRiels: 4000,
    vehicle: { name: "Bedford Truck", speed: 50, fuelBurnRate: 6 },
    supplies: {
      riceKg: 60,
      driedFishKg: 20,
      fuelLiters: 40,
      medicine: 5,
      spareTires: 1,
    },
    health: 100,
    note: "A practical trader with a sturdy commercial truck.",
  }),
  2: Object.freeze({
    name: "School Teacher",
    moneyRiels: 1500,
    vehicle: { name: "Ox-Cart", speed: 20, fuelBurnRate: 0 },
    supplies: {
      riceKg: 30,
      driedFishKg: 20,
      fuelLiters: 0,
      medicine: 5,
      spareTires: 1,
    },
    health: 110,
    note: "Patient and resilient, but the ox-cart is slow.",
  }),
  3: Object.freeze({
    name: "Visiting Journalist",
    moneyRiels: 8000,
    vehicle: {
      name: "Peugeot 203",
      speed: 70,
      fuelBurnRate: 5,
      repairRisk: true,
    },
    supplies: {
      riceKg: 20,
      driedFishKg: 20,
      fuelLiters: 20,
      medicine: 5,
      spareTires: 1,
    },
    health: 100,
    note: "Well-funded and fast, but repairs can be expensive.",
  }),
});

const legacyEvents = [
  {
    title: "A flooded culvert",
    art: "ferry",
    text: "The road disappears beneath brown monsoon water. A group of villagers waves from the far bank.",
    choices: [
      {
        label: "Pay the villagers to guide the Peugeot across.",
        effect: () => spendMoney(300),
      },
      {
        label: "Wait for the water to fall.",
        effect: () => {
          gameState.day += 1;
          return "You lose a day, but the crossing becomes safer.";
        },
      },
    ],
  },
  {
    title: "A roadside market",
    art: "traderNPC",
    text: "A trader has fresh fruit and news from Kampong Thom. The party could use the rest.",
    choices: [
      {
        label: "Buy fruit for the party (150 riels).",
        effect: () => spendMoney(150, "The fruit lifts everyone's spirits."),
      },
      {
        label: "Keep moving before the rain returns.",
        effect: () => "You leave the market behind.",
      },
    ],
  },
  {
    title: "Engine trouble",
    art: "peugeot203",
    text: "The Peugeot coughs and rolls to a stop. Steam curls from the bonnet.",
    choices: [
      {
        label: "Use your spare parts and repair it.",
        effect: () => useRepairParts(),
      },
      {
        label: "Push on slowly and risk more damage.",
        effect: () => damageVehicle(),
      },
    ],
  },
  {
    title: "A fever in the night",
    art: "traderNPC",
    text: "One traveler is burning with fever. The medicine tin is within reach.",
    choices: [
      { label: "Use one dose of medicine.", effect: () => useMedicine() },
      {
        label: "Save the medicine for a worse illness.",
        effect: () => worsenRandomPartyMember(),
      },
    ],
  },
];

function getElement(id) {
  return document.getElementById(id);
}

function renderStatusBar() {
  const statusBar = getElement("status-bar");
  if (!statusBar) return;

  const values = {
    "status-day": String(gameState.day).padStart(2, "0"),
    "status-weather": gameState.weather,
    "status-health": `${Math.round(averageHealth())}%`,
    "status-distance": `${Math.max(0, gameState.targetDistance - gameState.distanceTraveled)} km left`,
  };

  Object.entries(values).forEach(([id, value]) => {
    const element = getElement(id);
    if (element) element.textContent = value;
  });
}

function renderNarrative(lines, replace = false) {
  const box = getElement("narrative-box");
  if (!box) return;

  if (replace) box.replaceChildren();
  lines.forEach((line) => {
    const paragraph = document.createElement("p");
    paragraph.className = "mb-3 last:mb-0";
    if (line.amber) paragraph.classList.add("text-amber");
    paragraph.textContent = line.text || line;
    box.appendChild(paragraph);
  });
  box.scrollTop = box.scrollHeight;
}

function renderAscii() {
  const windowElement = getElement("top-ascii-window");
  if (!windowElement) return;

  const art = window.ASCII_ART;
  if (art) {
    if (gameState.state === GAME_STATES.MENU || gameState.state === GAME_STATES.HOW_TO_PLAY) {
  if (!document.getElementById("nr6-logo-styles")) {
    const style = document.createElement("style");
    style.id = "nr6-logo-styles";
    style.textContent = `
      .nr6-logo {
        display: inline-block;
        padding: 20px 36px;
        background: rgba(15, 20, 5, 0.5);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        border: 1px solid rgba(155, 188, 15, 0.55);
        border-radius: 10px;
        box-shadow: 0 0 24px rgba(155, 188, 15, 0.55),
                    inset 0 0 24px rgba(155, 188, 15, 0.25);
        text-align: center;
      }
      .nr6-logo pre {
        margin: 0;
        font-family: "Courier New", monospace;
        font-size: 22px;
        line-height: 1.15;
        font-weight: bold;
        color: rgba(155, 188, 15, 1);
        text-shadow: 0 0 10px rgba(155, 188, 15, 0.8),
                     0 0 26px rgba(155, 188, 15, 0.5);
        animation: nr6-pulse 3s ease-in-out infinite;
      }
      .nr6-road {
        height: 2px;
        width: 70%;
        margin: 10px auto 8px;
        background: linear-gradient(90deg, transparent, rgba(155, 188, 15, 0.55), transparent);
      }
      .nr6-subtitle {
        font-family: "Courier New", monospace;
        letter-spacing: 4px;
        font-size: 13px;
        color: rgba(155, 188, 15, 0.85);
        text-shadow: 0 0 8px rgba(155, 188, 15, 0.5);
      }
      @keyframes nr6-pulse {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.35); }
      }
    `;
    document.head.appendChild(style);
  }

  const nr6Art = [
    " _   _ ____   __   ",
    "| \\ | |  _ \\ / /_  ",
    "|  \\| | |_) | '_ \\ ",
    "| |\\  |  _ &lt;| (_) |",
    "|_| \\_|_| \\_\\\\___/ ",
  ].join("\n");

  windowElement.innerHTML = `
    <div class="nr6-logo">
      <pre>${nr6Art}</pre>
      <div class="nr6-road"></div>
      <div class="nr6-subtitle">NATIONAL ROAD 6 &middot; 1962</div>
    </div>
  `;
  return;
}

    if (gameState.state === GAME_STATES.CHARACTER_SELECT) {
      windowElement.textContent = [
        "  STATUS OF LIFE // CHOOSE YOUR ROAD",
        "  --------------------------------------------------",
        "  1  RICE MERCHANT       Bedford Truck",
        "  2  SCHOOL TEACHER      Ox-Cart",
        "  3  VISITING JOURNALIST  Peugeot 203",
        "  --------------------------------------------------",
        "  Your background will determine your starting supplies.",
      ].join("\n");
      return;
    }

    if (
      [
        GAME_STATES.NAME_LEADER,
        GAME_STATES.SET_PARTY_SIZE,
        GAME_STATES.NAME_COMPANIONS,
      ].includes(gameState.state)
    ) {
      windowElement.textContent = [
        "  PARTY SETUP // NATIONAL ROAD 6",
        "  --------------------------------------------------",
        `  PROFESSION: ${gameState.character || "UNSELECTED"}`,
        `  LEADER:     ${gameState.leaderName || "(name pending)"}`,
        "  --------------------------------------------------",
        "  A journey is measured one name at a time.",
      ].join("\n");
      return;
    }

    if (gameState.state === GAME_STATES.STARTING_SHOP) {
      windowElement.textContent = art.locations.phnomPenh;
      return;
    }

    if (gameState.state === GAME_STATES.RIVER_CROSSING) {
      windowElement.textContent = art.locations.ferry;
      return;
    }

    if (gameState.state === GAME_STATES.TOMBSTONE_EVENT) {
      windowElement.textContent = [
        "          .----------------.",
        "          |  HERE RESTS A  |",
        "          |     TRAVELER   |",
        "          '----------------'",
        "                 ||",
        "                 ||  NATIONAL ROAD 6",
      ].join("\n");
      return;
    }

    if (
      gameState.state === GAME_STATES.EVENT_DECISION &&
      gameState.pendingEvent
    ) {
      const eventArt = gameState.pendingEvent.art;
      const illustration =
        art.vehicles[eventArt] || art[eventArt] || art.locations[eventArt] || art.locations.jungleRoad;
      windowElement.textContent = illustration;
      return;
    }

    if (gameState.state === GAME_STATES.VICTORY) {
      windowElement.textContent = art.locations.angkorWat;
      return;
    }

    // Overworld map: the marker advances across the full 310 km route.
    const routeWidth = 72;
    const markerPosition = Math.min(
      routeWidth - 1,
      Math.round(
        (gameState.distanceTraveled / gameState.targetDistance) *
          (routeWidth - 1),
      ),
    );
    const route = "-".repeat(routeWidth).split("");
    route[markerPosition] = "#";
    windowElement.textContent = [
      "  JOURNEY MAP // NATIONAL ROAD 6",
      "  [PP]--------[Kampong Cham]--------[Kampong Thom]--------[Siem Reap]",
      `       ${route.join("")}`,
      `  VEHICLE: ${gameState.vehicle.name}    POSITION: ${Math.round(gameState.distanceTraveled)} / ${gameState.targetDistance} km`,
      `  ${gameState.location}    [# = ${gameState.vehicle.name}]`,
    ].join("\n");
    return;
  }

  const rain =
    gameState.weather === "Heavy Rain"
      ? "\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"
      : "                                ";
  windowElement.textContent = [
    "  .--------------------------------------------------------------------------.",
    `  | ${gameState.location.padEnd(24)}  ${gameState.weather.padEnd(18)}${rain.slice(0, 14)} |`,
    "  |                                                                          |",
    `  |        [${gameState.vehicle.name}]        ${Math.round(gameState.distanceTraveled).toString().padStart(3, " ")} / ${gameState.targetDistance} km                 |`,
    "  |                                                                          |",
    "  '--------------------------------------------------------------------------'",
  ].join("\n");
}

function renderAll() {
  renderStatusBar();
  renderAscii();
}

function averageHealth() {
  return (
    gameState.party.reduce((total, member) => total + member.health, 0) /
    gameState.party.length
  );
}

function livingParty() {
  return gameState.party.filter((member) => member.health > 0);
}

function updatePartyStatuses(cause = "Illness and exhaustion on the monsoon road.") {
  gameState.party.forEach((member) => {
    if (member.health <= 0) {
      member.status = "Dead";
      if (!member.tombstoneRecorded) {
        recordTombstone(`${member.name}: ${cause}`);
        member.tombstoneRecorded = true;
      }
    }
    else if (member.health < 25) member.status = "Critical";
    else if (member.health < 60) member.status = "Injured";
    else member.status = "Healthy";
  });
}

function spendMoney(amount, successText = "") {
  if (gameState.moneyRiels < amount) return "You do not have enough riels.";
  gameState.moneyRiels -= amount;
  return successText || `You spend ${amount} riels.`;
}

function useRepairParts() {
  if (gameState.supplies.spareTires > 0) {
    gameState.supplies.spareTires -= 1;
    return "You fit a spare tire and get the vehicle moving again.";
  }
  if (gameState.vehicle.repairRisk) {
    const repair = spendMoney(700);
    if (repair === "You do not have enough riels.")
      return "The journalist's Peugeot needs an expensive repair, but you cannot afford it.";
    return "A roadside mechanic repairs the Peugeot for 700 riels.";
  }
  if (gameState.supplies.fuelLiters < 5)
    return "You lack fuel and spare parts for a proper repair.";
  gameState.supplies.fuelLiters -= 5;
  return "After an hour of work, the Peugeot starts again.";
}

function damageVehicle() {
  gameState.vehicle.speed = Math.max(20, gameState.vehicle.speed - 5);
  gameState.vehicle.fuelBurnRate += 1;
  return "The Peugeot limps onward. Its speed and fuel economy have worsened.";
}

function useMedicine() {
  if (gameState.supplies.medicine <= 0) return "The medicine tin is empty.";
  gameState.supplies.medicine -= 1;
  const patient =
    gameState.party.find((member) => member.health < 100) || gameState.party[0];
  patient.health = Math.min(100, patient.health + 25);
  updatePartyStatuses();
  return `${patient.name} receives medicine and looks steadier.`;
}

function worsenRandomPartyMember() {
  const patient =
    gameState.party[Math.floor(Math.random() * gameState.party.length)];
  patient.health = Math.max(0, patient.health - 15);
  updatePartyStatuses();
  return `${patient.name}'s fever worsens during the night.`;
}

function chooseWeather() {
  const roll = Math.random();
  if (roll < 0.3) return "Heavy Rain";
  if (roll < 0.6) return "Cloudy";
  return "Clear";
}

function advanceDate() {
  const current = new Date(1962, 8, 1);
  current.setDate(current.getDate() + gameState.day - 1);
  gameState.date = current.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function consumeDailySupplies(distance) {
  const partySize = gameState.party.length;
  const riceNeeded = partySize * RATION_LEVELS[gameState.rationLevel].kgPerPerson;
  const fishNeeded = partySize * 0.4;
  const fuelNeeded = (distance / 100) * gameState.vehicle.fuelBurnRate;
  const shortages = [];

  if (gameState.supplies.riceKg >= riceNeeded)
    gameState.supplies.riceKg -= riceNeeded;
  else {
    gameState.supplies.riceKg = 0;
    shortages.push("rice");
  }

  if (gameState.supplies.driedFishKg >= fishNeeded)
    gameState.supplies.driedFishKg -= fishNeeded;
  else {
    gameState.supplies.driedFishKg = 0;
    shortages.push("dried fish");
  }

  if (gameState.supplies.fuelLiters >= fuelNeeded)
    gameState.supplies.fuelLiters -= fuelNeeded;
  else {
    gameState.supplies.fuelLiters = 0;
    shortages.push("fuel");
  }

  if (shortages.length || gameState.pace === "Grueling") {
    gameState.party.forEach((member) => {
      member.health = Math.max(
        0,
        member.health - (shortages.includes("fuel") ? 5 : 10) - (gameState.pace === "Grueling" ? 5 : 0),
      );
    });
    updatePartyStatuses();
  }

  return { riceNeeded, fishNeeded, fuelNeeded, shortages };
}

function nextDay() {
  if (gameState.state !== GAME_STATES.OVERWORLD) return;

  gameState.day += 1;
  advanceDate();
  gameState.weather = chooseWeather();

  const weatherModifier = gameState.weather === "Heavy Rain" ? 0.5 : 1;
  const distance =
    gameState.vehicle.speed * PACE_MODIFIERS[gameState.pace] * weatherModifier;
  const suppliesUsed = consumeDailySupplies(distance);
  gameState.distanceTraveled = Math.min(
    gameState.targetDistance,
    gameState.distanceTraveled + distance,
  );
  gameState.location = getWaypoint();
  renderAll();

  if (gameState.distanceTraveled >= gameState.targetDistance) {
    gameState.state = GAME_STATES.VICTORY;
    renderNarrative(
      [
        { text: "ARRIVAL AT ANGKOR WAT", amber: true },
        {
          text: `After ${gameState.day - 1} days on the road, the towers rise beyond the trees.`,
        },
        {
          text: "You made it to Siem Reap. Enter 1 to begin again, or 2 to review your status.",
        },
      ],
      true,
    );
    renderAll();
    return;
  }

  if (checkRiverWaypoint()) return;

  if (checkTombstoneProximity()) return;

  if (livingParty().length === 0 || averageHealth() <= 0) {
    gameState.state = GAME_STATES.GAMEOVER;
    recordTombstone("The entire party was lost to the monsoon road.");
    renderNarrative(
      [
        { text: "THE JOURNEY ENDS", amber: true },
        {
          text: "The road and the monsoon have taken everything from your party.",
        },
        { text: "Enter 1 to restart." },
      ],
      true,
    );
    return;
  }

  const progress = [
    { text: `${gameState.date} // ${gameState.weather}`, amber: true },
    {
      text: `You travel ${Math.round(distance)} km at a ${gameState.pace.toLowerCase()} pace.`,
    },
    {
      text: `Supplies used: ${suppliesUsed.riceNeeded.toFixed(1)} kg rice, ${suppliesUsed.fishNeeded.toFixed(1)} kg fish, ${suppliesUsed.fuelNeeded.toFixed(1)} L fuel.`,
    },
  ];
  if (suppliesUsed.shortages.length) {
    progress.push({
      text: `Shortage: ${suppliesUsed.shortages.join(", ")}. The party's health suffers.`,
    });
  }

  const eventChance = gameState.pace === "Grueling"
    ? 0.55
    : gameState.pace === "Steady"
      ? 0.35
      : 0.45;
  if (Math.random() < eventChance) triggerEvent(progress);
  else {
    progress.push({
      text: "Enter 1 to travel, 2 for rations, 3 for pace, 4 for shop, or 5 for status.",
    });
    renderNarrative(progress, true);
  }
}

function getWaypoint() {
  if (gameState.distanceTraveled >= 250) return "Siem Reap outskirts";
  if (gameState.distanceTraveled >= 150) return "Kampong Thom road";
  if (gameState.distanceTraveled >= 60) return "Kampong Cham road";
  return "National Road 6";
}

function readLocalStorage(key, fallback = []) {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || "null");
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Private browsing or disabled storage should not stop the journey.
  }
}

function recordTombstone(cause = "The monsoon road claimed a traveler.") {
  const tombstones = readLocalStorage("nr6Tombstones");
  const alreadyRecorded = tombstones.some((stone) =>
    stone.leaderName === gameState.leaderName &&
    stone.distanceTraveled === Math.round(gameState.distanceTraveled),
  );
  if (alreadyRecorded) return;
  tombstones.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    location: gameState.location,
    distanceTraveled: Math.round(gameState.distanceTraveled),
    leaderName: gameState.leaderName || "An unnamed traveler",
    cause,
    date: gameState.date,
  });
  writeLocalStorage("nr6Tombstones", tombstones.slice(-25));
}

function checkTombstoneProximity() {
  const tombstones = readLocalStorage("nr6Tombstones");
  const seen = readLocalStorage("nr6TombstonesSeen", []);
  const nearby = tombstones.find((stone) =>
    Math.abs(stone.distanceTraveled - gameState.distanceTraveled) <= 5 &&
    !seen.includes(stone.id),
  );
  if (!nearby) return false;

  gameState.pendingTombstone = nearby;
  gameState.state = GAME_STATES.TOMBSTONE_EVENT;
  renderNarrative([
    { text: "A MARKER BY THE ROAD", amber: true },
    { text: `At ${nearby.distanceTraveled} km, the party finds a grave marker for ${nearby.leaderName}.` },
    { text: `The stone says: ${nearby.cause}` },
    { text: "1. Pay respects and continue    2. Pass quietly" },
  ], true);
  renderAll();
  return true;
}

function resolveTombstone(choice) {
  const stone = gameState.pendingTombstone;
  if (!stone) return;
  const seen = readLocalStorage("nr6TombstonesSeen", []);
  if (!seen.includes(stone.id)) seen.push(stone.id);
  writeLocalStorage("nr6TombstonesSeen", seen);
  gameState.pendingTombstone = null;
  gameState.state = GAME_STATES.OVERWORLD;
  renderNarrative([
    { text: choice === "1" ? "You pause, leave a little rice, and remember the traveler." : "You pass the marker as the rain begins again." },
    { text: "Enter 1 to travel, 2 for rations, 3 for pace, 4 for shop, or 5 for status." },
  ], true);
  renderAll();
}

function checkRiverWaypoint() {
  const nextRiver = [70, 190].find((distance) =>
    gameState.distanceTraveled >= distance && !gameState.riverCrossings[distance],
  );
  if (!nextRiver) return false;

  gameState.riverCrossings[nextRiver] = true;
  gameState.pendingRiver = {
    distance: nextRiver,
    name: nextRiver === 70 ? "Mekong Crossing / Chroy Changvar" : "Stung Sen River / Kampong Thom",
  };
  gameState.state = GAME_STATES.RIVER_CROSSING;
  renderNarrative([
    { text: `RIVER CROSSING // ${gameState.pendingRiver.name}`, amber: true },
    { text: "The river is swollen by the monsoon. How will you get the party across?" },
    { text: "1. Pay for Ferry/Barge — 150 riels, safe, lose 1 day" },
    { text: "2. Ford the Waters — free, but risk rice loss or vehicle damage" },
    { text: "3. Hire Local Sampan Boats — 75 riels, safe supplies, 10% delay" },
  ], true);
  renderAll();
  return true;
}

function resolveRiverCrossing(choice) {
  const river = gameState.pendingRiver;
  if (!river) return;
  let result = "";
  if (choice === "1") {
    if (gameState.moneyRiels < 150) {
      renderNarrative([{ text: "You cannot afford the ferry. Choose another crossing method." }]);
      return;
    }
    gameState.moneyRiels -= 150;
    gameState.day += 1;
    advanceDate();
    result = "The ferry carries everyone safely across. You lose a day waiting for the barge.";
  } else if (choice === "2") {
    if (Math.random() < 0.4) {
      if (Math.random() < 0.5) {
        gameState.supplies.riceKg = Math.max(0, gameState.supplies.riceKg - 10);
        result = "The current sweeps away 10 kg of rice, but the party reaches the far bank.";
      } else {
        gameState.vehicle.speed = Math.max(10, gameState.vehicle.speed - 10);
        result = "The crossing damages the vehicle. Its speed drops by 10 km per day.";
      }
    } else result = "The party fords the river successfully, soaked but safe.";
  } else if (choice === "3") {
    if (gameState.moneyRiels < 75) {
      renderNarrative([{ text: "You cannot afford the sampans. Choose another crossing method." }]);
      return;
    }
    gameState.moneyRiels -= 75;
    if (Math.random() < 0.1) {
      gameState.day += 1;
      advanceDate();
      result = "The sampans are safe, but a storm delays the crossing by one day.";
    } else result = "Local sampan boats carry the party and supplies safely across.";
  } else {
    renderNarrative([{ text: "Choose 1, 2, or 3 for the river crossing." }]);
    return;
  }
  gameState.pendingRiver = null;
  gameState.state = GAME_STATES.OVERWORLD;
  renderNarrative([{ text: result }, { text: "Enter 1 to travel, 2 for rations, 3 for pace, 4 for shop, or 5 for status." }], true);
  renderAll();
}

function selectWeightedEvent() {
  const table = window.EVENT_DATA || [];
  if (!table.length) return null;
  const totalWeight = table.reduce((sum, event) => sum + event.weight, 0);
  let roll = Math.random() * totalWeight;
  return table.find((event) => (roll -= event.weight) <= 0) || table[table.length - 1];
}

function resolveWeightedEventChoice(event, choice) {
  const partyMember = gameState.party[Math.floor(Math.random() * gameState.party.length)];
  switch (event.id) {
    case "blown_tire":
      if (choice === "1" && gameState.supplies.spareTires > 0) {
        gameState.supplies.spareTires -= 1;
        return "You fit a spare tire and continue.";
      }
      gameState.vehicle.speed = Math.max(10, gameState.vehicle.speed - 10);
      return "There is no spare tire. The vehicle limps onward at reduced speed.";
    case "broken_wooden_axle":
      if (choice === "1" && gameState.moneyRiels >= 250) {
        gameState.moneyRiels -= 250;
        return "A local carpenter repairs the axle for 250 riels.";
      }
      gameState.day += 1; advanceDate();
      return "The axle is lashed together. You lose a day making the repair.";
    case "red_clay_overheat":
      if (choice === "1") { gameState.day += 1; advanceDate(); return "The engine cools under the rain. You lose a day."; }
      gameState.vehicle.speed = Math.max(10, gameState.vehicle.speed - 5);
      return "The vehicle forces through, but the engine will run slower from now on.";
    case "malaria_fever":
    case "waterborne_bug":
      if (choice === "1" && gameState.supplies.medicine > 0) {
        gameState.supplies.medicine -= 1;
        partyMember.health = Math.min(100, partyMember.health + 20);
        updatePartyStatuses();
        return `${partyMember.name} takes quinine and steadies.`;
      }
      partyMember.health = Math.max(0, partyMember.health - 20);
      updatePartyStatuses();
      return `${partyMember.name} falls ill. The party must press on.`;
    case "heat_exhaustion":
      if (choice === "1") { gameState.day += 1; advanceDate(); return "The party rests in the shade for a day."; }
      gameState.party.forEach((member) => { member.health = Math.max(0, member.health - 10); });
      updatePartyStatuses();
      return "The party keeps moving, but everyone suffers from the heat.";
    case "swollen_stream":
    case "monsoon_lightning":
      gameState.day += 1; advanceDate();
      return "The party waits out the worst of the water and weather.";
    case "fallen_tree":
      if (choice === "1") { gameState.day += 1; advanceDate(); return "Together with other travelers, you clear the road."; }
      gameState.vehicle.speed = Math.max(10, gameState.vehicle.speed - 5);
      return "The detour is thick mud. The vehicle loses speed.";
    case "skun_mud":
      if (choice === "1" && gameState.moneyRiels >= 200) { gameState.moneyRiels -= 200; return "Local oxen pull the vehicle free for 200 riels."; }
      gameState.day += 1; advanceDate();
      return "The party digs and pushes until the road releases you. A day is lost.";
    case "dragonfruit_trade":
      if (choice === "1" && gameState.moneyRiels >= 120) { gameState.moneyRiels -= 120; gameState.supplies.riceKg += 5; gameState.supplies.driedFishKg += 2; return "The fresh food restores 5 kg rice and 2 kg fish to your stores."; }
      gameState.party.forEach((member) => { member.health = Math.min(100, member.health + 5); });
      return "You share the farmers' meal and everyone feels encouraged.";
    case "roadside_wat":
      if (choice === "2" && gameState.moneyRiels >= 100) gameState.moneyRiels -= 100;
      gameState.party.forEach((member) => { member.health = Math.min(100, member.health + 15); });
      updatePartyStatuses();
      return "The Wat provides dry shelter. The party restores health beneath its eaves.";
    case "lost_cattle":
      gameState.day += 1; advanceDate();
      return "The herder gathers the cattle. The road is clear after a delay.";
    case "fuel_trader":
      if (choice === "1" && gameState.moneyRiels >= 500) { gameState.moneyRiels -= 500; gameState.supplies.fuelLiters += 10; return "You buy 10 liters of precious fuel."; }
      return "You keep your riels and continue carefully.";
    case "newspaper_news":
      if (choice === "1" && gameState.moneyRiels >= 50) gameState.moneyRiels -= 50;
      return "The news reminds you how far the capital already feels.";
    case "helpful_mechanic":
      gameState.vehicle.speed += 5;
      return "The mechanic tunes the vehicle. Its speed improves by 5 km per day.";
    default:
      return "The party handles the trouble and continues north.";
  }
}

function triggerEvent(previousLines = []) {
  gameState.pendingEvent = selectWeightedEvent();
  if (!gameState.pendingEvent) {
    renderNarrative([...previousLines, { text: "The road is quiet today." }], true);
    return;
  }
  gameState.state = GAME_STATES.EVENT_DECISION;
  renderNarrative(
    [
      ...previousLines,
      { text: `EVENT: ${gameState.pendingEvent.title}`, amber: true },
      { text: gameState.pendingEvent.text },
      { text: `1) ${gameState.pendingEvent.choices[0]}` },
      { text: `2) ${gameState.pendingEvent.choices[1]}` },
    ],
    true,
  );
  renderAll();
}

function showShop() {
  gameState.state = GAME_STATES.SHOP;
  renderNarrative(
    [
      { text: "ROADSIDE SUPPLY SHOP", amber: true },
      { text: `You have ${gameState.moneyRiels} riels.` },
      { text: `1) Buy 10 kg rice — ${SHOP_PRICES.riceKg * 10} riels` },
      { text: `2) Buy 5 kg dried fish — ${SHOP_PRICES.driedFishKg * 5} riels` },
      { text: `3) Buy 10 L fuel — ${SHOP_PRICES.fuelLiters * 10} riels` },
      { text: "0) Leave the shop" },
    ],
    true,
  );
}

function showOverworldMenu(message = "") {
  gameState.state = GAME_STATES.OVERWORLD;
  renderNarrative([
    ...(message ? [{ text: message }] : []),
    { text: `${gameState.date} // ${gameState.location}`, amber: true },
    { text: `Rations: ${gameState.rationLevel} (${RATION_LEVELS[gameState.rationLevel].kgPerPerson} kg/person/day) | Pace: ${gameState.pace}` },
    { text: "1. Travel one day" },
    { text: "2. Adjust rations" },
    { text: "3. Adjust pace" },
    { text: "4. Visit roadside shop" },
    { text: "5. View party status" },
  ], true);
  renderAll();
}

function showRationMenu() {
  gameState.state = GAME_STATES.RATIONS;
  renderNarrative([
    { text: "RATION STORE", amber: true },
    { text: "1. Filling — 1.5 kg/person/day" },
    { text: "2. Meager — 1.0 kg/person/day" },
    { text: "3. Bare Bones — 0.5 kg/person/day" },
    { text: "0. Return to the road" },
  ], true);
  renderAll();
}

function setRations(choice) {
  const options = { "1": "Filling", "2": "Meager", "3": "Bare Bones" };
  if (choice === "0") { showOverworldMenu(); return; }
  if (!options[choice]) { renderNarrative([{ text: "Choose 1, 2, 3, or 0." }]); return; }
  gameState.rationLevel = options[choice];
  showOverworldMenu(`Rations set to ${gameState.rationLevel}.`);
}

function showPaceMenu() {
  gameState.state = GAME_STATES.PACE;
  renderNarrative([
    { text: "PACE CONTROL", amber: true },
    { text: "1. Steady — normal speed and risk" },
    { text: "2. Strenuous — +25% speed, higher event risk" },
    { text: "3. Grueling — +50% speed, heavy health drain" },
    { text: "0. Return to the road" },
  ], true);
  renderAll();
}

function setPace(choice) {
  const options = { "1": "Steady", "2": "Strenuous", "3": "Grueling" };
  if (choice === "0") { showOverworldMenu(); return; }
  if (!options[choice]) { renderNarrative([{ text: "Choose 1, 2, 3, or 0." }]); return; }
  gameState.pace = options[choice];
  showOverworldMenu(`Pace set to ${gameState.pace}.`);
}

function buySupply(type, quantity) {
  const cost = SHOP_PRICES[type] * quantity;
  if (gameState.moneyRiels < cost)
    return `You need ${cost} riels, but only have ${gameState.moneyRiels}.`;
  gameState.moneyRiels -= cost;
  gameState.supplies[type] += quantity;
  return `Purchased ${quantity} ${type.replace("Kg", " kg").replace("Liters", " L")} for ${cost} riels.`;
}

function showStatus() {
  const party = gameState.party
    .map((member) => `${member.name}: ${member.health}% (${member.status})`)
    .join(" | ");
  renderNarrative(
    [
      { text: "JOURNEY STATUS", amber: true },
      { text: `${gameState.date} // ${gameState.location}` },
      {
        text: `Leader: ${gameState.leaderName || "Unnamed"} | Profession: ${gameState.character || "Unknown"}`,
      },
      {
        text: `Money: ${gameState.moneyRiels} riels | Pace: ${gameState.pace}`,
      },
      {
        text: `Rice: ${gameState.supplies.riceKg.toFixed(1)} kg | Fish: ${gameState.supplies.driedFishKg.toFixed(1)} kg | Fuel: ${gameState.supplies.fuelLiters.toFixed(1)} L | Tires: ${gameState.supplies.spareTires} | Medicine: ${gameState.supplies.medicine}`,
      },
      { text: party },
      {
        text:
          gameState.state === GAME_STATES.OVERWORLD
            ? "Enter 1 to travel, 2 for rations, 3 for pace, 4 for shop, or 5 for status."
            : "Enter 1 to continue.",
      },
    ],
    true,
  );
}

function showHowToPlay() {
  gameState.state = GAME_STATES.HOW_TO_PLAY;
  renderNarrative(
    [
      { text: "HOW TO PLAY", amber: true },
      {
        text: "Choose a background, name your party, and guide everyone north from Phnom Penh to Siem Reap.",
      },
      {
        text: "Each travel turn advances one day through the monsoon. Heavy rain slows the vehicle and events can change your plans.",
      },
      {
        text: "Manage Riels, rice, fuel, spare tires, and quinine medicine. Keep the party healthy and care for your vehicle.",
      },
      { text: "On the road: 1) Travel    2) Shop    3) View status" },
      {
        text: "During an event, choose 1 or 2 to respond. Enter 0 in the shop to leave.",
      },
      { text: "1. Return to Main Menu    (press Enter also returns)" },
    ],
    true,
  );
  renderAscii();
}

function showCharacterSelect() {
  gameState.state = GAME_STATES.CHARACTER_SELECT;
  renderNarrative(
    [
      { text: "STATUS OF LIFE", amber: true },
      { text: "Who are you before the road begins? Choose your background:" },
      {
        text: "1. Rice Merchant — 4,000 riels, Bedford Truck, 60 kg rice, 40 L fuel",
      },
      {
        text: "2. School Teacher — 1,500 riels, Ox-Cart, 30 kg rice, 0 L fuel, high health",
      },
      {
        text: "3. Visiting Journalist — 8,000 riels, Peugeot 203, 20 kg rice, 20 L fuel",
      },
    ],
    true,
  );
  renderAll();
}

function applyCharacterProfile(profile) {
  gameState.character = profile.name;
  gameState.moneyRiels = profile.moneyRiels;
  gameState.vehicle = { ...profile.vehicle };
  gameState.supplies = { ...profile.supplies };
  gameState.party.forEach((member) => {
    member.health = profile.health;
    member.status = profile.health > 100 ? "Strong" : "Healthy";
  });
  gameState.state = GAME_STATES.OVERWORLD;
  gameState.location = "Phnom Penh";
  gameState.distanceTraveled = 0;
  gameState.day = 1;
  gameState.date = "September 1, 1962";
  gameState.weather = "Clear";
  gameState.pendingEvent = null;
  gameState.pace = "Steady";
  gameState.rationLevel = "Meager";
  gameState.riverCrossings = { 70: false, 190: false };
  gameState.pendingRiver = null;
  gameState.pendingTombstone = null;
  gameState.leaderName = "";
  gameState.companionTarget = 0;
  gameState.companionIndex = 0;
  gameState.state = GAME_STATES.NAME_LEADER;
}

function selectCharacter(choice) {
  const profile = CHARACTER_PROFILES[choice];
  if (!profile) {
    renderNarrative([{ text: "Choose 1, 2, or 3 to select your background." }]);
    return;
  }
  applyCharacterProfile(profile);
  renderNarrative(
    [
      { text: `${profile.name.toUpperCase()} SELECTED`, amber: true },
      { text: profile.note },
      { text: "Enter the name of your party leader (e.g., Chanthou):" },
    ],
    true,
  );
  renderAll();
}

function showPartySizePrompt() {
  gameState.state = GAME_STATES.SET_PARTY_SIZE;
  renderNarrative(
    [
      { text: `Leader: ${gameState.leaderName}`, amber: true },
      {
        text: "How many family members/companions are joining you on National Road 6? (Select 1 to 4):",
      },
      {
        text: "More party members increase daily rice and fish consumption, but provide safety buffers if someone falls ill.",
      },
    ],
    true,
  );
  renderAll();
}

function promptNextCompanion() {
  gameState.state = GAME_STATES.NAME_COMPANIONS;
  renderNarrative(
    [{ text: `Enter name for Companion #${gameState.companionIndex + 1}:` }],
    true,
  );
  renderAll();
}

function showStartingShop() {
  gameState.state = GAME_STATES.STARTING_SHOP;
  renderNarrative(
    [
      { text: "PHSAR THMEI // STARTING SUPPLY SHOP", amber: true },
      { text: `You have ${gameState.moneyRiels} riels remaining.` },
      { text: `1. Finish Shopping & Begin Journey to Siem Reap` },
      { text: `2. Buy 10 kg rice — ${SHOP_PRICES.riceKg * 10} riels` },
      { text: `3. Buy 1 spare tire — ${SHOP_PRICES.spareTires} riels` },
      { text: `4. Buy 10 L fuel — ${SHOP_PRICES.fuelLiters * 10} riels` },
      { text: `5. Buy 1 quinine medicine — ${SHOP_PRICES.medicine} riels` },
    ],
    true,
  );
  renderAll();
}

function finishStartingShop() {
  gameState.state = GAME_STATES.OVERWORLD;
  renderNarrative(
    [
      { text: "THE JOURNEY BEGINS", amber: true },
      {
        text: `${gameState.date}. ${gameState.leaderName} leads ${gameState.party.length} travelers north from Phnom Penh.`,
      },
      {
        text: `The ${gameState.vehicle.name} waits on National Road 6. Angkor Wat is 310 km away.`,
      },
      { text: "Enter 1 to travel, 2 for rations, 3 for pace, 4 for shop, or 5 for status." },
    ],
    true,
  );
  renderAll();
}

function buyStartingSupply(choice) {
  const purchases = {
    2: ["riceKg", 10, "10 kg rice"],
    3: ["spareTires", 1, "1 spare tire"],
    4: ["fuelLiters", 10, "10 L fuel"],
    5: ["medicine", 1, "1 quinine medicine"],
  };
  const purchase = purchases[choice];
  if (!purchase) return false;

  const [type, quantity, label] = purchase;
  const cost = SHOP_PRICES[type] * quantity;
  if (gameState.moneyRiels < cost) {
    renderNarrative([
      {
        text: `You need ${cost} riels, but only have ${gameState.moneyRiels}.`,
      },
    ]);
    return true;
  }
  gameState.moneyRiels -= cost;
  gameState.supplies[type] += quantity;
  renderNarrative(
    [
      {
        text: `Purchased ${label} for ${cost} riels. You have ${gameState.moneyRiels} riels left.`,
      },
      { text: "Choose another purchase, or enter 1 to depart." },
    ],
    true,
  );
  renderAll();
  return true;
}

function resetGame() {
  window.location.reload();
}

function startGame() {
  showCharacterSelect();
}

function handleInput(choice) {
  const rawInput = String(choice).trim();
  const command = rawInput.toLowerCase();
  if (!rawInput && gameState.state !== GAME_STATES.HOW_TO_PLAY) return;

  if (gameState.state === GAME_STATES.HOW_TO_PLAY) {
    if (!rawInput || command === "1") {
      gameState.state = GAME_STATES.MENU;
      renderNarrative(
        [
          { text: "NATIONAL ROAD 6 (1962)", amber: true },
          {
            text: "Cambodia, September 1962. The monsoon rains have begun. Can you navigate National Road 6 from Phnom Penh to Siem Reap?",
          },
          { text: "1. Begin Journey" },
          { text: "2. How to Play" },
        ],
        true,
      );
      renderAll();
    } else
      renderNarrative(
        [{ text: "Press Enter or enter 1 to return to the main menu." }],
        true,
      );
    return;
  }

  if (gameState.state === GAME_STATES.MENU) {
    if (command === "1") startGame();
    else if (command === "2") showHowToPlay();
    else
      renderNarrative(
        [{ text: "Choose 1 to begin your journey, or 2 for how to play." }],
        true,
      );
    renderAscii();
    return;
  }

  if (gameState.state === GAME_STATES.CHARACTER_SELECT) {
    selectCharacter(command);
    return;
  }

  if (gameState.state === GAME_STATES.NAME_LEADER) {
    if (rawInput.length < 2 || rawInput.length > 24) {
      renderNarrative([
        { text: "Please enter a leader name between 2 and 24 characters." },
      ]);
      return;
    }
    gameState.leaderName = rawInput;
    gameState.party = [{ name: rawInput, health: 100, status: "Healthy" }];
    showPartySizePrompt();
    return;
  }

  if (gameState.state === GAME_STATES.SET_PARTY_SIZE) {
    const companionCount = Number.parseInt(command, 10);
    if (
      !Number.isInteger(companionCount) ||
      companionCount < 1 ||
      companionCount > 4 ||
      command !== String(companionCount)
    ) {
      renderNarrative([{ text: "Please enter a number from 1 to 4." }]);
      return;
    }
    gameState.companionTarget = companionCount;
    gameState.companionIndex = 0;
    promptNextCompanion();
    return;
  }

  if (gameState.state === GAME_STATES.NAME_COMPANIONS) {
    if (rawInput.length < 2 || rawInput.length > 24) {
      renderNarrative([
        { text: "Please enter a companion name between 2 and 24 characters." },
      ]);
      return;
    }
    gameState.party.push({ name: rawInput, health: 100, status: "Healthy" });
    gameState.companionIndex += 1;
    if (gameState.companionIndex < gameState.companionTarget)
      promptNextCompanion();
    else showStartingShop();
    return;
  }

  if (gameState.state === GAME_STATES.STARTING_SHOP) {
    if (command === "1") finishStartingShop();
    else if (!buyStartingSupply(command)) {
      renderNarrative([
        { text: "Choose 1 to depart, or 2, 3, 4, or 5 to purchase supplies." },
      ]);
    }
    return;
  }

  if (gameState.state === GAME_STATES.RATIONS) {
    setRations(command);
    return;
  }

  if (gameState.state === GAME_STATES.PACE) {
    setPace(command);
    return;
  }

  if (gameState.state === GAME_STATES.RIVER_CROSSING) {
    resolveRiverCrossing(command);
    return;
  }

  if (gameState.state === GAME_STATES.TOMBSTONE_EVENT) {
    if (command === "1" || command === "2") resolveTombstone(command);
    else renderNarrative([{ text: "Choose 1 to pay respects, or 2 to pass quietly." }]);
    return;
  }

  if (gameState.state === GAME_STATES.OVERWORLD) {
    if (command === "1") nextDay();
    else if (command === "2") showRationMenu();
    else if (command === "3") showPaceMenu();
    else if (command === "4") showShop();
    else if (command === "5") showStatus();
    else
      renderNarrative([
        { text: "Choose 1 to travel, 2 for rations, 3 for pace, 4 for shop, or 5 for status." },
      ]);
    return;
  }

  if (gameState.state === GAME_STATES.EVENT_DECISION) {
    if (command === "1" || command === "2") {
      const result = resolveWeightedEventChoice(gameState.pendingEvent, command);
      gameState.pendingEvent = null;
      gameState.state = GAME_STATES.OVERWORLD;
      renderAll();
      renderNarrative(
        [
          { text: result },
          { text: "Enter 1 to travel, 2 for rations, 3 for pace, 4 for shop, or 5 for status." },
        ],
        true,
      );
    } else
      renderNarrative([{ text: "Choose 1 or 2 to respond to the event." }]);
    return;
  }

  if (gameState.state === GAME_STATES.SHOP) {
    let result;
    if (command === "1") result = buySupply("riceKg", 10);
    else if (command === "2") result = buySupply("driedFishKg", 5);
    else if (command === "3") result = buySupply("fuelLiters", 10);
    else if (command === "0") {
      gameState.state = GAME_STATES.OVERWORLD;
      renderNarrative(
        [
          { text: "You leave the shop and return to the road." },
          { text: "Enter 1 to travel, 2 to shop, or 3 for status." },
        ],
        true,
      );
      return;
    } else {
      renderNarrative([{ text: "Choose 1, 2, 3, or 0 to leave." }]);
      return;
    }
    renderNarrative(
      [
        { text: result },
        { text: "Choose another purchase, or enter 0 to leave." },
      ],
      true,
    );
    renderAll();
    return;
  }

  if (
    gameState.state === GAME_STATES.GAMEOVER ||
    gameState.state === GAME_STATES.VICTORY
  ) {
    if (command === "1") resetGame();
    else if (command === "2") showStatus();
    else
      renderNarrative([{ text: "Enter 1 to restart, or 2 to review status." }]);
  }
}

function initialiseGame() {
  const form = getElement("command-form");
  const input = getElement("command-input");
  if (!form || !input) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = input.value;
    input.value = "";
    handleInput(command);
    input.focus();
  });

  renderAll();
  renderNarrative(
    [
      { text: "NATIONAL ROAD 6", amber: true },
      { text: "Cambodia // September 1962 // Monsoon Season" },
      { text: "A text-based survival journey from Phnom Penh to Angkor Wat." },
      { text: "1. Begin Journey" },
      { text: "2. How to Play" },
    ],
    true,
  );
  input.focus();
}

if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", initialiseGame);
else initialiseGame();
