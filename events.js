/* Weighted September 1962 event table for National Road 6. */
const EVENT_DATA = Object.freeze([
  {
    id: "kampong_kdei_bridge", title: "The ancient Naga bridge", art: "ancientBridge", weight: 5,
    // NEW ART KEY — an 800-year-old laterite bridge, naga-head carvings, river running high beneath the arches
    text: "At Kampong Kdei, the road crosses an ancient stone bridge carved with naga heads, its arches nearly swallowed by the swollen river.",
    choices: ["Cross on foot first to test it.", "Drive straight across."],
  },
  {
    id: "sambor_prei_kuk_ruins", title: "Brick towers in the forest", art: "angkorRuins", weight: 4,
    // NEW ART KEY — pre-Angkorian brick temple towers half-swallowed by jungle
    text: "A side track leads to old brick temple towers rising from the trees, older than Angkor itself.",
    choices: ["Take the detour and pay respects.", "Stay on the main road and press on."],
  },
  {
    id: "stung_saen_ferry_trouble", title: "Engine trouble on the Stung Saen", art: "ferry", weight: 6,
    text: "The ferry's engine sputters and dies halfway across the river at Kampong Thom.",
    choices: ["Help the ferrymen paddle across.", "Wait for the engine to be restarted."],
  },
  {
    id: "floating_pagoda_blessing", title: "A floating pagoda", art: "phnomPenh", weight: 4,
    // NEW ART KEY — a floating pagoda on the river
    text: "A pagoda built on rafts drifts near the riverbank. A monk offers a blessing for safe travel.",
    choices: ["Accept the blessing and leave a donation.", "Wave and continue on."],
  },
  {
    id: "elephant_mud_rescue", title: "A working elephant", art: "elephant", weight: 5,
    // NEW ART KEY — a logging elephant and mahout hauling timber roadside
    text: "A logging elephant and its mahout are hauling teak nearby, well used to the mud.",
    choices: ["Pay the mahout to pull the vehicle free.", "Wait until the elephant finishes its own load."],
  },
  {
    id: "leeches_paddy", title: "Leeches in the paddy", art: "jungleRoad", weight: 6,
    text: "Wading out to check the road ahead through a flooded rice paddy, leeches cling to bare skin.",
    choices: ["Use salt to remove them carefully.", "Pull them off quickly and keep moving."],
  },
  {
    id: "mosquito_camp", title: "Dusk over the flooded fields", art: "campNight", weight: 6,
    // NEW ART KEY — camp at dusk, mosquito haze over flooded rice fields
    text: "Dusk brings a rising hum of mosquitoes over the flooded fields near camp.",
    choices: ["Buy a mosquito net for 80 riels.", "Sleep close to the smoke of the fire."],
  },
  {
    id: "dead_battery", title: "A flat battery", art: "peugeot203", weight: 6,
    text: "The battery is flat and the engine refuses to turn over.",
    choices: ["Push-start the vehicle downhill.", "Wait for a passing truck to give a jump."],
  },
  {
    id: "corvee_road_crew", title: "A volunteer road crew", art: "jungleRoad", weight: 6,
    text: "A crew of volunteer laborers is filling a washed-out culvert with gravel and broken brick.",
    choices: ["Join the work for an hour.", "Pay a small toll to pass ahead of the queue."],
  },
  {
    id: "provincial_checkpoint", title: "A provincial checkpoint", art: "checkpoint", weight: 5,
    // NEW ART KEY — a barrier pole and small guardhouse at a provincial boundary
    text: "A checkpoint at the provincial boundary stops traffic to inspect papers.",
    choices: ["Present your papers and wait.", "Offer a small gift to move things along."],
  },
  {
    id: "buffalo_bridge", title: "A buffalo on the bridge", art: "oxCart", weight: 6,
    text: "A water buffalo has planted itself on a narrow wooden bridge and will not budge.",
    choices: ["Coax it aside with fresh-cut grass.", "Find a way around through the shallows."],
  },
  {
    id: "colonial_relais", title: "An old relais station", art: "phnomPenh", weight: 4,
    text: "A French-built rest house stands at the roadside, its caretaker still keeping the lamps lit.",
    choices: ["Pay for a room and dry blankets.", "Sleep in the vehicle and save the money."],
  },
  {
    id: "radio_storm_warning", title: "A warning on the radio", art: "traderNPC", weight: 5,
    text: "A crackling radio at a roadside stall warns of a heavy storm moving up from the gulf.",
    choices: ["Stop early and wait it out.", "Push on to outrun the worst of it."],
  },
  {
    id: "rubber_lorry_blockage", title: "A broken-down lorry", art: "bedfordTruck", weight: 6,
    text: "An overloaded rubber-plantation lorry has snapped an axle, blocking the narrow road near Kampong Cham.",
    choices: ["Help unload sacks to lighten it.", "Wait for others to clear a path."],
  },
  {
    id: "cobra_road", title: "A cobra in the road", art: "jungleRoad", weight: 4,
    text: "A cobra stretches across the road, unhurried, in the fading light.",
    choices: ["Wait for it to move on its own.", "Sound the horn to startle it away."],
  },
  {
    id: "silk_village_trade", title: "Weavers by the road", art: "traderNPC", weight: 5,
    text: "Weavers in a roadside village display bolts of hand-dyed silk kramas.",
    choices: ["Buy a few kramas for 90 riels.", "Admire the work and move on."],
  },
  {
    id: "evening_fog", title: "Fog off the plain", art: "jungleRoad", weight: 5,
    text: "Fog rolls off the flooded plain at dusk, swallowing the road ahead.",
    choices: ["Stop and wait for the fog to lift.", "Creep forward with headlamps low."],
  },
  {
    id: "broken_fan_belt", title: "A snapped fan belt", art: "peugeot203", weight: 6,
    text: "A frayed fan belt finally snaps somewhere past Skun.",
    choices: ["Improvise a replacement from rope and cloth.", "Wait for a passing vehicle with spare parts."],
  },
  {
    id: "washed_out_timber_bridge", title: "Washed-out timber bridge", art: "brokenBridge", weight: 8,
    text: "A timber bridge has washed out under the monsoon current. The far bank is visible, but the road is not passable.",
    choices: ["Wait 2 days for the water to drop.", "Pay an ox team 100 riels to haul you across.", "Risk the ford (-30% vehicle condition)."],
  },
  {
    id: "deep_clay_mud_pit", title: "Deep clay mud pit", art: "jungleRoad", weight: 8,
    text: "A deep pit of red clay has swallowed the wheels. Rain continues to fill the ruts around the vehicle.",
    choices: ["Spend 1 day digging out (-10 party stamina).", "Wait 2 days for a passing truck."],
  },
]);

window.EVENT_DATA = EVENT_DATA;
