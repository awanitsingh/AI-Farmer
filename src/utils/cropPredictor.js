/**
 * Local Crop Recommendation Engine
 * Rule-based predictor — instant, no API needed
 * Based on standard agronomic ranges for each crop
 */

const CROP_RULES = [
  { name: "Rice",        N:[60,120], P:[30,60],  K:[30,60],  temp:[20,35], humidity:[70,90], ph:[5.5,7.0], rainfall:[150,300] },
  { name: "Maize",       N:[60,120], P:[30,60],  K:[30,60],  temp:[18,35], humidity:[50,80], ph:[5.5,7.5], rainfall:[50,150]  },
  { name: "Chickpea",    N:[20,60],  P:[40,80],  K:[20,50],  temp:[15,30], humidity:[30,60], ph:[6.0,8.0], rainfall:[30,100]  },
  { name: "Kidneybeans", N:[20,60],  P:[60,100], K:[20,50],  temp:[15,30], humidity:[40,70], ph:[6.0,7.5], rainfall:[30,100]  },
  { name: "Pigeonpeas",  N:[20,60],  P:[40,80],  K:[20,50],  temp:[20,35], humidity:[40,70], ph:[5.5,7.0], rainfall:[40,120]  },
  { name: "Mothbeans",   N:[20,50],  P:[30,60],  K:[20,40],  temp:[25,40], humidity:[20,50], ph:[6.0,8.0], rainfall:[20,80]   },
  { name: "Mungbean",    N:[20,60],  P:[30,60],  K:[20,50],  temp:[25,38], humidity:[50,80], ph:[6.0,7.5], rainfall:[40,100]  },
  { name: "Blackgram",   N:[20,60],  P:[40,80],  K:[20,50],  temp:[25,38], humidity:[50,80], ph:[6.0,7.5], rainfall:[40,100]  },
  { name: "Lentil",      N:[20,60],  P:[40,80],  K:[20,50],  temp:[15,25], humidity:[30,60], ph:[6.0,8.0], rainfall:[25,80]   },
  { name: "Pomegranate", N:[20,60],  P:[20,50],  K:[30,60],  temp:[25,38], humidity:[30,60], ph:[5.5,7.5], rainfall:[20,80]   },
  { name: "Banana",      N:[80,140], P:[60,100], K:[50,100], temp:[20,35], humidity:[70,90], ph:[5.5,7.0], rainfall:[100,200] },
  { name: "Mango",       N:[20,60],  P:[20,50],  K:[30,60],  temp:[24,38], humidity:[40,70], ph:[5.5,7.5], rainfall:[40,120]  },
  { name: "Grapes",      N:[20,60],  P:[20,50],  K:[30,60],  temp:[15,35], humidity:[50,80], ph:[5.5,7.0], rainfall:[50,150]  },
  { name: "Watermelon",  N:[80,120], P:[40,80],  K:[40,80],  temp:[25,38], humidity:[50,80], ph:[6.0,7.5], rainfall:[40,100]  },
  { name: "Muskmelon",   N:[80,120], P:[40,80],  K:[40,80],  temp:[25,38], humidity:[50,80], ph:[6.0,7.5], rainfall:[30,80]   },
  { name: "Apple",       N:[20,60],  P:[20,50],  K:[30,60],  temp:[5,20],  humidity:[50,80], ph:[5.5,7.0], rainfall:[50,150]  },
  { name: "Orange",      N:[20,60],  P:[20,50],  K:[30,60],  temp:[15,30], humidity:[50,80], ph:[5.5,7.5], rainfall:[50,150]  },
  { name: "Papaya",      N:[40,80],  P:[30,60],  K:[40,80],  temp:[22,35], humidity:[60,80], ph:[6.0,7.5], rainfall:[60,150]  },
  { name: "Coconut",     N:[20,60],  P:[20,50],  K:[40,80],  temp:[22,35], humidity:[60,90], ph:[5.5,7.5], rainfall:[100,200] },
  { name: "Cotton",      N:[80,140], P:[40,80],  K:[20,60],  temp:[25,38], humidity:[40,70], ph:[6.0,8.0], rainfall:[50,150]  },
  { name: "Jute",        N:[60,100], P:[30,60],  K:[30,60],  temp:[24,38], humidity:[70,90], ph:[6.0,7.5], rainfall:[150,250] },
  { name: "Coffee",      N:[80,120], P:[30,60],  K:[30,60],  temp:[15,28], humidity:[60,90], ph:[5.5,6.5], rainfall:[100,200] },
];

function inRange(val, [min, max]) {
  return val >= min && val <= max;
}

function score(crop, { N, P, K, temperature, humidity, ph, rainfall }) {
  let s = 0;
  if (inRange(N,           crop.N))        s += 20;
  else s += Math.max(0, 20 - Math.abs(N - (crop.N[0] + crop.N[1]) / 2) / 5);

  if (inRange(P,           crop.P))        s += 15;
  else s += Math.max(0, 15 - Math.abs(P - (crop.P[0] + crop.P[1]) / 2) / 5);

  if (inRange(K,           crop.K))        s += 15;
  else s += Math.max(0, 15 - Math.abs(K - (crop.K[0] + crop.K[1]) / 2) / 5);

  if (inRange(temperature, crop.temp))     s += 20;
  else s += Math.max(0, 20 - Math.abs(temperature - (crop.temp[0] + crop.temp[1]) / 2) / 2);

  if (inRange(humidity,    crop.humidity)) s += 15;
  else s += Math.max(0, 15 - Math.abs(humidity - (crop.humidity[0] + crop.humidity[1]) / 2) / 3);

  if (inRange(ph,          crop.ph))       s += 10;
  else s += Math.max(0, 10 - Math.abs(ph - (crop.ph[0] + crop.ph[1]) / 2) * 3);

  if (inRange(rainfall,    crop.rainfall)) s += 5;
  else s += Math.max(0, 5 - Math.abs(rainfall - (crop.rainfall[0] + crop.rainfall[1]) / 2) / 20);

  return s;
}

export function predictCrop(inputs) {
  const scored = CROP_RULES.map((crop) => ({
    name: crop.name,
    score: score(crop, inputs),
  })).sort((a, b) => b.score - a.score);

  const best = scored[0];
  return `${best.name} is the best crop to be cultivated right there`;
}
