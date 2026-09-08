/* Weighted September 1962 event table for National Road 6. */
const EVENT_DATA = Object.freeze([
  {
    id: "blown_tire", title: "A blown tire", art: "peugeot203", weight: 10,
    text: "A sharp stone on the red road tears through a tire.",
    choices: ["Use a spare tire and continue.", "Push onward slowly and risk the axle."],
  },
  {
    id: "broken_wooden_axle", title: "A broken wooden axle", art: "brokenBridge", weight: 7,
    text: "The cart jolts hard. A wooden axle has split under the load.",
    choices: ["Pay a local carpenter 250 riels.", "Repair it with rope and lose a day."],
  },
  {
    id: "red_clay_overheat", title: "Deep red clay", art: "jungleRoad", weight: 8,
    text: "The wheels sink into red clay and the engine overheats in the humid air.",
    choices: ["Stop and let the engine cool.", "Force the vehicle through the mud."],
  },
  {
    id: "malaria_fever", title: "Fever near the flooded fields", art: "ferry", weight: 7,
    text: "Mosquitoes rise from the flooded grass. One traveler begins to shiver with fever.",
    choices: ["Use quinine medicine.", "Rest and hope the fever breaks."],
  },
  {
    id: "waterborne_bug", title: "Bad drinking water", art: "ferry", weight: 7,
    text: "The water barrel was fouled somewhere behind Kampong Cham.",
    choices: ["Treat the water with medicine.", "Continue and accept the sickness."],
  },
  {
    id: "heat_exhaustion", title: "Heat exhaustion", art: "jungleRoad", weight: 6,
    text: "Even beneath the clouds, the wet heat leaves everyone weak.",
    choices: ["Rest in the shade and lose a day.", "Keep moving at a strenuous pace."],
  },
  {
    id: "swollen_stream", title: "A swollen stream", art: "ferry", weight: 9,
    text: "A normally shallow stream has become a brown, fast-moving channel.",
    choices: ["Wait for the water to recede.", "Search for a safer crossing."],
  },
  {
    id: "fallen_tree", title: "A tree across National Road 6", art: "jungleRoad", weight: 8,
    text: "A monsoon-felled tree blocks the road. Other travelers are already gathering.",
    choices: ["Help clear the road.", "Take a muddy detour."],
  },
  {
    id: "skun_mud", title: "The Skun mud trap", art: "jungleRoad", weight: 9,
    text: "Near Skun, the road becomes a brown ribbon of mud that grips the wheels.",
    choices: ["Hire oxen to pull the vehicle free.", "Dig and push with the party."],
  },
  {
    id: "dragonfruit_trade", title: "A generous roadside trade", art: "traderNPC", weight: 8,
    text: "Local farmers offer fresh dragonfruit and river fish beside the road.",
    choices: ["Buy fresh food for 120 riels.", "Trade news and share the meal."],
  },
  {
    id: "roadside_wat", title: "Shelter at a roadside Wat", art: "phnomPenh", weight: 5,
    text: "Monks at a small roadside pagoda offer dry shelter from the rain.",
    choices: ["Rest and accept the monks' kindness.", "Leave a donation of 100 riels and rest."],
  },
  {
    id: "lost_cattle", title: "Cattle on the road", art: "oxCart", weight: 6,
    text: "A herd of cattle wanders across the road, bringing traffic to a halt.",
    choices: ["Wait for the herder to clear them.", "Guide the animals aside."],
  },
  {
    id: "fuel_trader", title: "A fuel trader", art: "traderNPC", weight: 5,
    text: "A drum merchant has a little petrol left, but the price is steep.",
    choices: ["Buy 10 liters for 500 riels.", "Save your money and continue."],
  },
  {
    id: "newspaper_news", title: "News from Phnom Penh", art: "traderNPC", weight: 4,
    text: "A traveler shares a newspaper and fresh news from the capital.",
    choices: ["Trade 50 riels for the newspaper.", "Listen and move on."],
  },
  {
    id: "monsoon_lightning", title: "Lightning over the plain", art: "ferry", weight: 5,
    text: "Lightning walks across the plain. The rain is too heavy to see the road.",
    choices: ["Stop under cover.", "Drive slowly through the storm."],
  },
  {
    id: "helpful_mechanic", title: "A helpful mechanic", art: "bedfordTruck", weight: 3,
    text: "A mechanic traveling north recognizes the sound of your troubled vehicle.",
    choices: ["Accept a free adjustment.", "Offer 100 riels for a full check."],
  },
]);

window.EVENT_DATA = EVENT_DATA;
