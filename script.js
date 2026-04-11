const state = {
  name: "",
  body: null,
  tank: null,
  acc: null
};

let analyticsSessionId = "";

const screens = {
  welcome: document.getElementById("screen-welcome"),
  name: document.getElementById("screen-name"),
  step1: document.getElementById("screen-step1"),
  step2: document.getElementById("screen-step2"),
  step3: document.getElementById("screen-step3"),
  loading: document.getElementById("screen-loading"),
  result: document.getElementById("screen-result")
};

const bodyChoices = [
  {
    id: "body1",
    title: "Black Gun",
    desc: "Low-key, all-black energy. Looks calm on the outside… a little chaotic inside.",
    image: "./illus/body1.png?v=step1fix2"
  },
  {
    id: "body2",
    title: "Metallic Gun",
    desc: "Built for the future. Too bad you’re still stuck in the past.",
    image: "./illus/body2.png?v=step1fix2"
  },
  {
    id: "body3",
    title: "Blue Gun",
    desc: "Designer look. Minimal drip. Acts cool… but cries in the shower.",
    image: "./illus/body3.png?v=step1fix2"
  },
  {
    id: "body4",
    title: "Purple Gun",
    desc: "A little mysterious…Like your money... mysteriously disappearing all the time.",
    image: "./illus/body4.png?v=step1fix2"
  }
];

const tankChoices = [
  {
    id: "tank1",
    title: "Zebra Tank",
    desc: "Life is only black and white. But your decisions? completely grey.",
    image: "./illus/tank1.png"
  },
  {
    id: "tank2",
    title: "Leopard Tank",
    desc: "Main character energy. But in the end, still loses to someone “not clear”",
    image: "./illus/tank2.png"
  },
  {
    id: "tank3",
    title: "Pink Tank",
    desc: "Soft and sweet…but your decisions? questionable at best",
    image: "./illus/tank3.png"
  },
  {
    id: "tank4",
    title: "Neon Tank",
    desc: "So bright…and you still can’t see your own future?",
    image: "./illus/tank4.png"
  }
];

const accChoices = [
  {
    id: "acc1",
    title: "Metallic Acc",
    desc: "Future-ready shine. Looks expensive… emotionally unavailable.",
    image: "./illus/acc1.png"
  },
  {
    id: "acc2",
    title: "Red Acc",
    desc: "Bold choice. Acts tough… but soft where it matters.",
    image: "./illus/acc2.png"
  },
  {
    id: "acc3",
    title: "Black Acc",
    desc: "Clean, minimal. Crying inside...still aesthetic outside.",
    image: "./illus/acc3.png"
  },
  {
    id: "acc4",
    title: "Pink Acc",
    desc: "Cute in every detail…except for some of your personality",
    image: "./illus/acc4.png"
  }
];

function getCombinedResultImageCandidates(key) {
  // Prefer exact combo first, then numbered variants.
  return [
    `./result pic/${key}.png`,
    `./result pic/${key}-3.png`,
    `./result pic/${key}-2.png`,
    `./result pic/${key}-1.png`
  ];
}

const resultCaptionIntro = "Your water gun is ready for this Songkran day.";
const resultCaptionOutro =
  "Hope you enjoy this long weekend and make the most of every moment. Happy Songkran Day!";

const resultCaptionMiddleDefault =
  "A perfect mix of style, playfulness, and just a little bit of chaos. It says you love the details, enjoy standing out, and never take things too seriously.";

const resultCaptionMiddle = {
  "body1-acc1-tank1":
    "A perfect mix of style, playfulness, and just a little bit of chaos.It says you love the details, enjoy standing out, and never take things too seriously.",
  "body1-acc1-tank2":
    "Cute and gentle... but your taste in people is a little wild. It says you follow your heart, take emotional risks, and love the thrill.",
  "body1-acc1-tank3":
    "Soft outside, evolving inside... your story is still unfolding. It says you feel deeply, cherish every moment, and take your time.",
  "body1-acc1-tank4":
    "Bright and bold... and your direction is unfolding in its own way. It says you stand out, bring energy everywhere, and are finding your flow step by step.",
  "body1-acc2-tank1":
    "Bold energy... and your path is more than just black and white. It says you act with confidence, take chances, and grow stronger through every experience.",
  "body1-acc2-tank2":
    "Strong outside... and your heart is drawn to passion and excitement. It says you follow your instincts, embrace every feeling, and live fully in every moment.",
  "body1-acc2-tank3":
    "Cool and composed... but stuck in a familiar loop. It says you reflect often, revisit the past, and slowly grow from it.",
  "body1-acc2-tank4":
    "Confident look... but your path feels a little unclear. It says you trust yourself, move forward, and figure things out as you go.",
  "body1-acc3-tank1":
    "Polished and clean... and you see beyond just black and white. It says you aim for clarity, stay composed, and make thoughtful moves with confidence.",
  "body1-acc3-tank2":
    "Stylish and sharp... and your bold choices make you stand out. It says you love taking risks, shine effortlessly, and own the spotlight with confidence.",
  "body1-acc3-tank3":
    "Main character energy... but the same ending keeps repeating. It says you dream big, feel deeply, and are learning to change the story.",
  "body1-acc3-tank4":
    "Luxury vibe... and your path is unfolding in its own way. It says you move with intention, question with purpose, and grow",
  "body1-acc4-tank1":
    "Bold and striking... you're anything but minimal. It says you stand out effortlessly, embrace the chaos, and own your unique pattern.",
  "body1-acc4-tank2":
    "Fierce and untamed... you don't follow rules, you make them. It says you feel intensely, love boldly, and chase what excites you without hesitation.",
  "body1-acc4-tank3":
    "Playful and electric... you light up every moment without trying. It says you bring the fun, love the spotlight, and aren't afraid to show your bold side.",
  "body1-acc4-tank4":
    "Fast, bright, and electric... you're always on the move. It says you chase the thrill, think fast, and never stay still for too long.",
  "body2-acc1-tank1":
    "Sleek and futuristic... but life isn't just black and white. It says you think ahead, move with precision, and balance logic with intuition.",
  "body2-acc1-tank2":
    "Sleek yet untamed... your path is never predictable. It says you trust your instincts, take bold risks, and evolve with every move.",
  "body2-acc1-tank3":
    "Glossy and glowing... but there's a wild spark in your choices. It says you trust your heart, take bold emotional risks, and chase what excites you.",
  "body2-acc1-tank4":
    "Sleek and electric... but you keep circling the same story. It says you feel deeply, hold onto moments, and are learning to break the loop.",
  "body2-acc2-tank1":
    "Sharp and striking... but your moves don't always follow your vision. It says you see things clearly, think deeply, and are learning to align as you go.",
  "body2-acc2-tank2":
    "Strong energy... but drawn to something a little chaotic. It says you chase excitement, trust your instincts, and feel things intensely.",
  "body2-acc2-tank3":
    "Electric and expressive... but you keep looping familiar patterns. It says you reflect deeply, grow through every cycle, and turn repetition into power.",
  "body2-acc2-tank4":
    "Driven and focused... but your mind tends to overthink. It says you aim high, question everything, and are learning to trust your pace.",
  "body2-acc3-tank1":
    "Polished and future-ready... effortlessly cool, never just black and white. It says you move with clarity, think strategically, and balance logic with intuition in style.",
  "body2-acc3-tank2":
    "Stylish and sharp... with a bold, wild edge. It says you stand out naturally, take risks confidently, and enjoy the spotlight.",
  "body2-acc3-tank3":
    "Sharp and self-aware... but your moves come in your own time. It says you know yourself deeply, think with intention, and act when it truly feels right.",
  "body2-acc3-tank4":
    "Sleek and forward-driven... but your pace moves on your own timeline. It says you see things clearly, think ahead, and step forward when the moment is right.",
  "body2-acc4-tank1":
    "Playful and sharp... nothing about you is just black and white. It says you notice everything, think deeply, and turn your perspective into your own bold rhythm.",
  "body2-acc4-tank2":
    "Playful and bold... there's nothing basic about your wild side. It says you feel intensely, love boldly, and turn every emotion into something uniquely yours.",
  "body2-acc4-tank3":
    "Sleek and in sync... but there's more beneath the surface. It says you move with vision, stay composed, and reveal your depth in your own time.",
  "body2-acc4-tank4":
    "Bright and unstoppable... your energy is always moving forward. It says you think fast, reflect deeply, and are learning to flow while chasing what's next.",
  "body3-acc1-tank1":
    "Cool and effortless... there's more to you than meets the eye. It says you move with intention, notice the details, and grow quietly in your own way.",
  "body3-acc1-tank2":
    "Cute and gentle... but your choices can get a little wild. It says you follow your heart, take emotional risks, and enjoy a little chaos.",
  "body3-acc1-tank3":
    "Glowing and layered... your story keeps evolving with every loop. It says you feel deeply, hold onto what matters, and grow through every moment in your own rhythm.",
  "body3-acc1-tank4":
    "Cool and flowing... your path is lighting up as you go. It says you move with calm energy, trust yourself more each step, and find your way in your own rhythm.",
  "body3-acc2-tank1":
    "Bold and electric... you're never just black and white. It says you move with confidence, take bold risks, and grow stronger with every step.",
  "body3-acc2-tank2":
    "Strong energy... but drawn to something a little wild. It says you chase excitement, trust your instincts, and feel things intensely.",
  "body3-acc2-tank3":
    "Cool and composed... and you're slowly breaking the loop. It says you reflect with intention, learn from the past, and grow stronger with every step forward.",
  "body3-acc2-tank4":
    "Confident and electric... your path is lighting up as you go. It says you trust your instincts, move forward with energy, and figure things out one step at a time.",
  "body3-acc3-tank1":
    "A perfect mix of style, playfulness, and just a little bit of chaos.It says you love the details, enjoy standing out, and never take things too seriously.",
  "body3-acc3-tank2":
    "Strong energy... but drawn to something a little wild. It says you chase excitement, trust your instincts, and feel things intensely.",
  "body3-acc3-tank3":
    "Main character energy... and your story is starting to shift. It says you dream big, feel deeply, and are rewriting your ending in your own way.",
  "body3-acc3-tank4":
    "Luxury and electric... your path is lighting up in motion. It says you move with intention, question with curiosity, and grow your way with confidence.",
  "body3-acc4-tank1":
    "Bold and vibrant... you're anything but black and white. It says you notice everything, think deeply, and turn your thoughts into your own colorful flow.",
  "body3-acc4-tank2":
    "Wild and magnetic... there's a fierce edge beneath your charm. It says you feel intensely, love boldly, and embrace the unexpected with confidence.",
  "body3-acc4-tank3":
    "A perfect mix of style, playfulness, and just a little bit of chaos.It says you love the details, enjoy standing out, and never take things too seriously.",
  "body3-acc4-tank4":
    "Vibrant and fearless... your energy speaks louder than words. It says you feel deeply, own your emotions, and open up in your own powerful way.",
  "body4-acc1-tank1":
    "Mysterious and playful... but your thoughts aren't just black and white, like a zebra pattern. It says you enjoy complexity, trust your intuition, and like figuring things out your own way.",
  "body4-acc1-tank2":
    "Cute and charming... but your taste leans a little wild. It says you follow your feelings, love excitement, and enjoy a little chaos.",
  "body4-acc1-tank3":
    "Expressive and emotional... still looping the same story. It says you feel everything fully, hold onto moments, and grow through experience.",
  "body4-acc1-tank4":
    "Bright and dreamy... but your direction shifts with the moment. It says you ride the energy, trust your instincts, and adapt as you glow.",
  "body4-acc2-tank1":
    "Bold and confident... but life isn't just black and white. It says you take risks, embrace uncertainty, and learn by doing.",
  "body4-acc2-tank2":
    "Strong energy... but drawn to something a little wild. It says you chase excitement, trust your instincts, and feel things intensely.",
  "body4-acc2-tank3":
    "Dramatic and expressive... stuck in familiar patterns. It says you process emotions deeply, reflect often, and grow each time.",
  "body4-acc2-tank4":
    "Confident but a little unsure... still figuring things out. It says you trust yourself, move forward, and adjust along the way.",
  "body4-acc3-tank1":
    "Polished and composed... but your world isn't just black and white like a zebra pattern. It says you value clarity, think deeply, and balance logic with feeling.",
  "body4-acc3-tank2":
    "Strong energy... but drawn to something a little wild. It says you chase excitement, trust your instincts, and feel things intensely.",
  "body4-acc3-tank3":
    "Main character energy... but the same ending repeats. It says you dream big, stay expressive, and are learning to change your story.",
  "body4-acc3-tank4":
    "Electric and bold... your path moves fast and never stays still. It says you chase the thrill, trust your gut, and grow as you go.",
  "body4-acc4-tank1":
    "Bold and striking... you're never just black and white. It says you stand out effortlessly, play with contrast, and own your style with confidence.",
  "body4-acc4-tank2":
    "Fierce and stylish... there's always a wild side to you. It says you move with confidence, take bold risks, and own every room you walk into.",
  "body4-acc4-tank3":
    "Playful and glowing... but there's more beneath the surface. It says you shine bright, feel deeply, and reveal your layers in your own time.",
  "body4-acc4-tank4":
    "Bright and buzzing... your energy never slows down. It says you think fast, chase ideas, and keep moving before anything can catch up."
};

let currentResultKey = "";
let previewImageUrl = "";

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function safeLoadImage(src) {
  try {
    return await loadImage(src);
  } catch (err) {
    return null;
  }
}

function drawCenteredWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let i = 0; i < words.length; i += 1) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = words[i];
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line) {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }

  return currentY;
}

function drawContainImage(ctx, image, x, y, width, height) {
  const scale = Math.min(width / image.width, height / image.height);
  const drawW = image.width * scale;
  const drawH = image.height * scale;
  const drawX = x + (width - drawW) / 2;
  const drawY = y + (height - drawH) / 2;
  ctx.drawImage(image, drawX, drawY, drawW, drawH);
}

async function buildResultExportBlob() {
  const EXPORT_SCALE = 3;
  const EXPORT_WIDTH = 396;
  const EXPORT_HEIGHT = 800;
  const canvas = document.createElement("canvas");
  canvas.width = EXPORT_WIDTH * EXPORT_SCALE;
  canvas.height = EXPORT_HEIGHT * EXPORT_SCALE;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  ctx.scale(EXPORT_SCALE, EXPORT_SCALE);

  const packTop = await safeLoadImage("./illus/result-top.png");
  const packBg = await safeLoadImage("./illus/result-bg.png");
  const footer1 = await safeLoadImage("./illus/export-madeby-1.png");
  const footer2 = await safeLoadImage("./illus/export-madeby-2.png");
  const ppLogo = await safeLoadImage("./illus/pp-logo.png");

  const resultBodyNode = document.getElementById("result-body");
  const resultTankNode = document.getElementById("result-tank");
  const resultAccNode = document.getElementById("result-acc");
  const resultTitleNode = document.getElementById("result-title");
  const xOffset = (EXPORT_WIDTH - 402) / 2;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, EXPORT_WIDTH, EXPORT_HEIGHT);

  // Draw dynamic title from #result-title
  ctx.fillStyle = "#000000";
  ctx.font = "700 31px Kameron";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  const titleLines = (resultTitleNode?.textContent || "Water Gun").split("\n");
  let titleY = 64;
  titleLines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed) {
      ctx.fillText(trimmed, 201 + xOffset, titleY);
      titleY += 40;
    }
  });

  const cardX = 33 + xOffset;
  const cardY = 144;
  const cardWidth = 336;
  const cardHeight = 336;
  if (packTop) {
    ctx.drawImage(packTop, cardX, cardY, cardWidth, 77);
  }
  if (packBg) {
    ctx.drawImage(packBg, cardX, cardY, cardWidth, cardHeight);
  }

  if (resultBodyNode.style.display !== "none" && resultBodyNode.src) {
    const bodyImage = await safeLoadImage(resultBodyNode.src);
    if (bodyImage) {
      drawContainImage(ctx, bodyImage, cardX, cardY, cardWidth, cardHeight);
    }
  }

  if (resultTankNode.style.display !== "none" && resultTankNode.src) {
    const tankImage = await safeLoadImage(resultTankNode.src);
    if (tankImage) {
      drawContainImage(ctx, tankImage, cardX, cardY, cardWidth, cardHeight);
    }
  }

  if (resultAccNode.style.display !== "none" && resultAccNode.src) {
    const accImage = await safeLoadImage(resultAccNode.src);
    if (accImage) {
      drawContainImage(ctx, accImage, cardX, cardY, cardWidth, cardHeight);
    }
  }

  const key = `${state.body}-${state.acc}-${state.tank}`;
  const middle = resultCaptionMiddle[key] || resultCaptionMiddleDefault;
  const caption = `${resultCaptionIntro} ${middle}\n\n${resultCaptionOutro}`;
  ctx.fillStyle = "#000000";
  ctx.font = "700 13px Kameron";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  const paragraphs = caption.split("\n");
  let textY = 500;
  paragraphs.forEach((paragraph, index) => {
    textY = drawCenteredWrappedText(ctx, paragraph.trim(), 201 + xOffset, textY, 330, 18);
    if (index < paragraphs.length - 1) {
      textY += 4;
    }
  });

  const footerY = 686;
  if (footer1) {
    ctx.drawImage(footer1, 162 + xOffset, footerY, 72, 31);
  }
  if (footer2) {
    ctx.drawImage(footer2, 169 + xOffset, footerY + 7, 83, 30);
  }
  if (ppLogo) {
    ctx.drawImage(ppLogo, 140 + xOffset, 640, 123, 85);
  }
  ctx.font = "700 14px Kameron";
  ctx.fillText("petchpeth.info", 201 + xOffset, 742);

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) {
    throw new Error("Unable to create image blob");
  }

  return blob;
}

function openSavePreview(blob) {
  const modal = document.getElementById("save-preview-modal");
  const image = document.getElementById("save-preview-image");

  if (previewImageUrl) {
    URL.revokeObjectURL(previewImageUrl);
  }
  previewImageUrl = URL.createObjectURL(blob);
  image.src = previewImageUrl;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeSavePreview() {
  const modal = document.getElementById("save-preview-modal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function downloadPreviewImage() {
  if (!previewImageUrl) return;
  const link = document.createElement("a");
  link.href = previewImageUrl;
  link.download = `${state.name || "songkran"}-water-gun-card.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function showLayeredResult(pickedBody, pickedTank, pickedAcc) {
  const bodyNode = document.getElementById("result-body");
  const tankNode = document.getElementById("result-tank");
  const accNode = document.getElementById("result-acc");

  bodyNode.src = pickedBody.image;
  tankNode.src = pickedTank.image;
  accNode.src = pickedAcc.image;

  bodyNode.style.display = "block";
  tankNode.style.display = "block";
  accNode.style.display = "block";
}

async function showCombinedResultWithFallback(key, pickedBody, pickedTank, pickedAcc) {
  const candidates = getCombinedResultImageCandidates(key);
  const bodyNode = document.getElementById("result-body");
  const tankNode = document.getElementById("result-tank");
  const accNode = document.getElementById("result-acc");

  bodyNode.src = "";
  tankNode.removeAttribute("src");
  accNode.removeAttribute("src");

  const tryNext = async (idx) => {
    if (key !== currentResultKey) return; // stale
    if (idx >= candidates.length) {
      showLayeredResult(pickedBody, pickedTank, pickedAcc);
      return;
    }
    const candidate = candidates[idx];
    const loaded = await safeLoadImage(candidate);
    if (!loaded) {
      await tryNext(idx + 1);
      return;
    }

    bodyNode.src = candidate;
  };

  bodyNode.style.display = "block";
  tankNode.style.display = "none";
  accNode.style.display = "none";

  await tryNext(0);
}

function showScreen(key) {
  Object.values(screens).forEach((node) => node.classList.remove("active"));
  screens[key].classList.add("active");
  syncPageBackground();
}

function syncPageBackground() {
  const activeScreen = document.querySelector(".screen.active");
  if (!activeScreen) return;
  const frameBg = window.getComputedStyle(activeScreen).backgroundColor;
  document.documentElement.style.setProperty("--page-bg", frameBg);
}

function getSupabaseRestConfig() {
  const g = typeof window !== "undefined" ? window : {};
  const url = String(g.SUPABASE_URL || "")
    .trim()
    .replace(/\/$/, "");
  const key = String(g.SUPABASE_ANON_KEY || "").trim();
  if (!url || !key) return null;
  if (url.includes("YOUR_PROJECT_REF") || key === "YOUR_ANON_PUBLIC_KEY") return null;
  return { url, key };
}

function supabaseRestInsert(table, row) {
  const cfg = getSupabaseRestConfig();
  if (!cfg) {
    return Promise.resolve({ error: new Error("Supabase URL or anon key missing") });
  }
  const { url, key } = cfg;
  return fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(row)
  }).then(async (res) => {
    if (res.ok) return { error: null };
    const text = await res.text().catch(() => "");
    return { error: new Error(`${res.status} ${text || res.statusText}`) };
  });
}

function ensureAnalyticsSession() {
  if (analyticsSessionId) return;
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    analyticsSessionId = crypto.randomUUID();
    return;
  }
  analyticsSessionId = `s${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/** Keeps state.name in sync with the input (autofill often skips the "input" event). */
function syncPlayerNameFromInput() {
  const el = document.getElementById("player-name");
  if (!el) return "";
  const value = String(el.value || "").trim().slice(0, 120);
  state.name = value;
  const btn = document.getElementById("btn-name-next");
  if (btn) btn.disabled = value.length === 0;
  return value;
}

function getPlayerNameForAnalytics() {
  syncPlayerNameFromInput();
  const n = (state.name || "").trim().slice(0, 120);
  return n || null;
}

function recordStepPickToSupabase(step, stepName, choiceId, choiceTitle) {
  if (!analyticsSessionId || !choiceId) return;
  const name = getPlayerNameForAnalytics();
  void supabaseRestInsert("water_gun_step_picks", {
    session_id: analyticsSessionId,
    step,
    step_name: stepName,
    choice_id: choiceId,
    choice_title: choiceTitle || null,
    player_name: name
  })
    .then(({ error }) => {
      if (error) console.warn("[Supabase step]", error.message);
    })
    .catch((err) => {
      console.warn("[Supabase step]", err);
    });
}

function recordCompletionToSupabase() {
  const name = getPlayerNameForAnalytics();
  const pickedBody = bodyChoices.find((x) => x.id === state.body);
  const pickedTank = tankChoices.find((x) => x.id === state.tank);
  const pickedAcc = accChoices.find((x) => x.id === state.acc);
  const comboKey = `${state.body}-${state.acc}-${state.tank}`;
  const row = {
    session_id: analyticsSessionId || null,
    player_name: name,
    body_id: state.body,
    body_title: pickedBody?.title ?? null,
    tank_id: state.tank,
    tank_title: pickedTank?.title ?? null,
    acc_id: state.acc,
    acc_title: pickedAcc?.title ?? null,
    combo_key: comboKey
  };
  void supabaseRestInsert("water_gun_completions", row)
    .then(({ error }) => {
      if (error) console.warn("[Supabase]", error.message);
    })
    .catch((err) => {
      console.warn("[Supabase]", err);
    });
}

function renderChoices(containerId, items, selectedId, onSelect) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  items.forEach((item) => {
    const button = document.createElement("button");
    button.className = `choice ${selectedId === item.id ? "selected" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="choice-row">
        <span class="choice-dot"></span>
        <h3 class="choice-title">${item.title}</h3>
      </div>
      <p class="choice-desc">${item.desc ?? ""}</p>
    `;
    button.addEventListener("click", () => onSelect(item.id));
    container.appendChild(button);
  });
}

async function updateResult() {
  syncPlayerNameFromInput();
  const pickedBody = bodyChoices.find((x) => x.id === state.body);
  const pickedTank = tankChoices.find((x) => x.id === state.tank);
  const pickedAcc = accChoices.find((x) => x.id === state.acc);

  const key = `${state.body}-${state.acc}-${state.tank}`;
  currentResultKey = key;
  const middle = resultCaptionMiddle[key] || resultCaptionMiddleDefault;
  const caption = `${resultCaptionIntro} ${middle}\n\n${resultCaptionOutro}`;

  document.getElementById("result-title").textContent = `${state.name}'s\nWater Gun`;
  await showCombinedResultWithFallback(key, pickedBody, pickedTank, pickedAcc);
  document.getElementById("result-copy").textContent = caption;
}

function openStep1() {
  syncPlayerNameFromInput();
  ensureAnalyticsSession();
  renderChoices("choices-step1", bodyChoices, state.body, (id) => {
    state.body = id;
    const picked = bodyChoices.find((x) => x.id === id);
    recordStepPickToSupabase(1, "body", id, picked?.title);
    document.getElementById("btn-step1-next").disabled = false;
    openStep1();
  });
  showScreen("step1");
}

function openStep2() {
  renderChoices("choices-step2", tankChoices, state.tank, (id) => {
    state.tank = id;
    const picked = tankChoices.find((x) => x.id === id);
    recordStepPickToSupabase(2, "tank", id, picked?.title);
    document.getElementById("btn-step2-next").disabled = false;
    openStep2();
  });
  showScreen("step2");
}

function openStep3() {
  renderChoices("choices-step3", accChoices, state.acc, (id) => {
    state.acc = id;
    const picked = accChoices.find((x) => x.id === id);
    recordStepPickToSupabase(3, "accessory", id, picked?.title);
    document.getElementById("btn-step3-next").disabled = false;
    openStep3();
  });
  showScreen("step3");
}

document.getElementById("btn-start").addEventListener("click", () => {
  ensureAnalyticsSession();
  showScreen("name");
});

const nameInput = document.getElementById("player-name");
nameInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  state.name = value;
  document.getElementById("btn-name-next").disabled = value.length === 0;
});
nameInput.addEventListener("change", () => {
  syncPlayerNameFromInput();
});

document.getElementById("btn-name-next").addEventListener("click", () => openStep1());
document.getElementById("btn-step1-next").addEventListener("click", () => openStep2());
document.getElementById("btn-step2-next").addEventListener("click", () => openStep3());

document.getElementById("btn-step3-next").addEventListener("click", () => {
  showScreen("loading");
  setTimeout(async () => {
    await updateResult();
    showScreen("result");
    recordCompletionToSupabase();
  }, 1000);
});

function resetToWelcome() {
  analyticsSessionId = "";
  state.name = "";
  state.body = null;
  state.tank = null;
  state.acc = null;
  nameInput.value = "";
  document.getElementById("btn-name-next").disabled = true;
  document.getElementById("btn-step1-next").disabled = true;
  document.getElementById("btn-step2-next").disabled = true;
  document.getElementById("btn-step3-next").disabled = true;
  showScreen("welcome");
}

document.getElementById("btn-restart").addEventListener("click", () => {
  resetToWelcome();
});

document.querySelectorAll(".logo").forEach((logo) => {
  logo.addEventListener("click", () => {
    resetToWelcome();
  });
});

document.getElementById("btn-save").addEventListener("click", async () => {
  try {
    const blob = await buildResultExportBlob();
    openSavePreview(blob);
  } catch (err) {
    console.error("Export failed:", err);
    alert("Save failed. Please try again.");
  }
});

document.getElementById("btn-preview-download").addEventListener("click", () => {
  downloadPreviewImage();
});

document.getElementById("btn-preview-close").addEventListener("click", () => {
  closeSavePreview();
});

syncPageBackground();
