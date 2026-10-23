import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const elements = [
  ["H","Hydrogen",1,1.008,"nonmetal",1,1],["He","Helium",2,4.003,"noble",1,18],
  ["Li","Lithium",3,6.94,"alkali",2,1],["Be","Beryllium",4,9.012,"alkaline",2,2],["B","Boron",5,10.81,"metalloid",2,13],["C","Carbon",6,12.011,"nonmetal",2,14],["N","Nitrogen",7,14.007,"nonmetal",2,15],["O","Oxygen",8,15.999,"nonmetal",2,16],["F","Fluorine",9,18.998,"halogen",2,17],["Ne","Neon",10,20.18,"noble",2,18],
  ["Na","Sodium",11,22.99,"alkali",3,1],["Mg","Magnesium",12,24.305,"alkaline",3,2],["Al","Aluminium",13,26.982,"post",3,13],["Si","Silicon",14,28.085,"metalloid",3,14],["P","Phosphorus",15,30.974,"nonmetal",3,15],["S","Sulfur",16,32.06,"nonmetal",3,16],["Cl","Chlorine",17,35.45,"halogen",3,17],["Ar","Argon",18,39.948,"noble",3,18],
  ["K","Potassium",19,39.098,"alkali",4,1],["Ca","Calcium",20,40.078,"alkaline",4,2],["Sc","Scandium",21,44.956,"transition",4,3],["Ti","Titanium",22,47.867,"transition",4,4],["V","Vanadium",23,50.942,"transition",4,5],["Cr","Chromium",24,51.996,"transition",4,6],["Mn","Manganese",25,54.938,"transition",4,7],["Fe","Iron",26,55.845,"transition",4,8],["Co","Cobalt",27,58.933,"transition",4,9],["Ni","Nickel",28,58.693,"transition",4,10],["Cu","Copper",29,63.546,"transition",4,11],["Zn","Zinc",30,65.38,"transition",4,12],["Ga","Gallium",31,69.723,"post",4,13],["Ge","Germanium",32,72.63,"metalloid",4,14],["As","Arsenic",33,74.922,"metalloid",4,15],["Se","Selenium",34,78.971,"nonmetal",4,16],["Br","Bromine",35,79.904,"halogen",4,17],["Kr","Krypton",36,83.798,"noble",4,18],
  ["Rb","Rubidium",37,85.468,"alkali",5,1],["Sr","Strontium",38,87.62,"alkaline",5,2],["Y","Yttrium",39,88.906,"transition",5,3],["Zr","Zirconium",40,91.224,"transition",5,4],["Nb","Niobium",41,92.906,"transition",5,5],["Mo","Molybdenum",42,95.95,"transition",5,6],["Tc","Technetium",43,98,"transition",5,7],["Ru","Ruthenium",44,101.07,"transition",5,8],["Rh","Rhodium",45,102.91,"transition",5,9],["Pd","Palladium",46,106.42,"transition",5,10],["Ag","Silver",47,107.87,"transition",5,11],["Cd","Cadmium",48,112.41,"transition",5,12],["In","Indium",49,114.82,"post",5,13],["Sn","Tin",50,118.71,"post",5,14],["Sb","Antimony",51,121.76,"metalloid",5,15],["Te","Tellurium",52,127.6,"metalloid",5,16],["I","Iodine",53,126.9,"halogen",5,17],["Xe","Xenon",54,131.29,"noble",5,18],
  ["Cs","Caesium",55,132.91,"alkali",6,1],["Ba","Barium",56,137.33,"alkaline",6,2],["La","Lanthanum",57,138.91,"lanth",6,3],["Hf","Hafnium",72,178.49,"transition",6,4],["Ta","Tantalum",73,180.95,"transition",6,5],["W","Tungsten",74,183.84,"transition",6,6],["Re","Rhenium",75,186.21,"transition",6,7],["Os","Osmium",76,190.23,"transition",6,8],["Ir","Iridium",77,192.22,"transition",6,9],["Pt","Platinum",78,195.08,"transition",6,10],["Au","Gold",79,196.97,"transition",6,11],["Hg","Mercury",80,200.59,"transition",6,12],["Tl","Thallium",81,204.38,"post",6,13],["Pb","Lead",82,207.2,"post",6,14],["Bi","Bismuth",83,208.98,"post",6,15],["Po","Polonium",84,209,"metalloid",6,16],["At","Astatine",85,210,"halogen",6,17],["Rn","Radon",86,222,"noble",6,18],
  ["Fr","Francium",87,223,"alkali",7,1],["Ra","Radium",88,226,"alkaline",7,2],["Ac","Actinium",89,227,"actin",7,3],["Rf","Rutherfordium",104,267,"transition",7,4],["Db","Dubnium",105,268,"transition",7,5],["Sg","Seaborgium",106,269,"transition",7,6],["Bh","Bohrium",107,270,"transition",7,7],["Hs","Hassium",108,277,"transition",7,8],["Mt","Meitnerium",109,278,"transition",7,9],["Ds","Darmstadtium",110,281,"transition",7,10],["Rg","Roentgenium",111,282,"transition",7,11],["Cn","Copernicium",112,285,"transition",7,12],["Nh","Nihonium",113,286,"post",7,13],["Fl","Flerovium",114,289,"post",7,14],["Mc","Moscovium",115,290,"post",7,15],["Lv","Livermorium",116,293,"post",7,16],["Ts","Tennessine",117,294,"halogen",7,17],["Og","Oganesson",118,294,"noble",7,18],
  ["Ce","Cerium",58,140.12,"lanth",8,4],["Pr","Praseodymium",59,140.91,"lanth",8,5],["Nd","Neodymium",60,144.24,"lanth",8,6],["Pm","Promethium",61,145,"lanth",8,7],["Sm","Samarium",62,150.36,"lanth",8,8],["Eu","Europium",63,151.96,"lanth",8,9],["Gd","Gadolinium",64,157.25,"lanth",8,10],["Tb","Terbium",65,158.93,"lanth",8,11],["Dy","Dysprosium",66,162.5,"lanth",8,12],["Ho","Holmium",67,164.93,"lanth",8,13],["Er","Erbium",68,167.26,"lanth",8,14],["Tm","Thulium",69,168.93,"lanth",8,15],["Yb","Ytterbium",70,173.05,"lanth",8,16],["Lu","Lutetium",71,174.97,"lanth",8,17],
  ["Th","Thorium",90,232.04,"actin",9,4],["Pa","Protactinium",91,231.04,"actin",9,5],["U","Uranium",92,238.03,"actin",9,6],["Np","Neptunium",93,237,"actin",9,7],["Pu","Plutonium",94,244,"actin",9,8],["Am","Americium",95,243,"actin",9,9],["Cm","Curium",96,247,"actin",9,10],["Bk","Berkelium",97,247,"actin",9,11],["Cf","Californium",98,251,"actin",9,12],["Es","Einsteinium",99,252,"actin",9,13],["Fm","Fermium",100,257,"actin",9,14],["Md","Mendelevium",101,258,"actin",9,15],["No","Nobelium",102,259,"actin",9,16],["Lr","Lawrencium",103,266,"actin",9,17]
].map(([symbol, name, number, mass, category, row, group]) => ({ symbol, name, number, mass, category, row, group }));

const orbitalFiles = { s: ["s_s"], p: ["p_px", "p_py", "p_pz"], d: ["d_dz2", "d_dxz", "d_dyz", "d_dxy", "d_dx2-y2"], f: ["f_fz3", "f_fxz2", "f_fyz2", "f_fxyz", "f_fx_x2-3y2", "f_fy_3x2-y2", "f_fz_x2-y2"] };
const orbitalLabels = { s: ["s"], p: ["pₓ", "pᵧ", "p_z"], d: ["dᶻ²", "dˣᶻ", "dʸᶻ", "dˣʸ", "dˣ²₋ᵧ²"], f: ["fᶻ³", "fˣᶻ²", "fʸᶻ²", "fˣʸᶻ", "fˣ(x²−3y²)", "fʸ(3x²−y²)", "fᶻ(x²−y²)"] };
const nobleGasCoreConfigurations = {
  He: "1s2",
  Ne: "1s2 2s2 2p6",
  Ar: "1s2 2s2 2p6 3s2 3p6",
  Kr: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6",
  Xe: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6",
  Rn: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6"
};
const categoryStyles = { alkali: ["#201d18","#ff9a55"], alkaline: ["#1b2424","#72d9b0"], transition: ["#1b2030","#9d9cff"], post: ["#20252a","#8fa8bd"], metalloid: ["#202327","#ffca75"], nonmetal: ["#152632","#54a9ff"], halogen: ["#231e2c","#d09cff"], noble: ["#24212b","#ed9fc8"], lanth: ["#19282a","#72d9b0"], actin: ["#272118","#ffb46e"] };
const bySymbol = Object.fromEntries(elements.map((e) => [e.symbol, e]));

const els = (id) => document.getElementById(id);
let selected = bySymbol.C;
let elementConfigs = {};
let orbitalObjects = new Map();
let scene, camera, renderer, controls, nucleus, animationFrame;
let opacity = .42;
let isPlaying = false;
let autoSpin = true;
let speedIndex = 1;
let playbackSnapshot = null;
let modelLoadId = 0;
let cameraDistanceTarget = 10;
const speeds = [.5, 1, 1.5, 2, 3];

function periodicTable() {
  const table = els("periodic-table");
  elements.forEach((element) => {
    const button = document.createElement("button");
    button.className = "element-tile";
    button.dataset.symbol = element.symbol;
    button.style.gridColumn = element.group;
    button.style.gridRow = element.row;
    const [background, accent] = categoryStyles[element.category];
    button.style.setProperty("--tile-bg", background);
    button.style.setProperty("--tile-accent", accent);
    button.style.setProperty("--tile-line", `${accent}45`);
    button.innerHTML = `<span class="tile-number">${element.number}</span><span class="tile-symbol">${element.symbol}</span><span class="tile-name">${element.name}</span><span class="tile-mass">${element.mass} u</span>`;
    button.addEventListener("click", () => selectElement(element.symbol));
    table.appendChild(button);
  });
}

function formatConfiguration(config = "") {
  return config.replace(/(\d)([spdf])(\d+)/g, "$1$2<sup>$3</sup>");
}

function expandConfiguration(config = "") {
  return config.replace(/\[([A-Z][a-z]?)\]/, (_, core) => nobleGasCoreConfigurations[core] || "");
}

async function loadData() {
  const response = await fetch("distributions.json");
  if (!response.ok) throw new Error(`Unable to load electron configurations (${response.status})`);
  elementConfigs = await response.json();
}

function selectElement(symbol, collapseTable = true) {
  stopPlayback();
  clearOrbitalModels();
  selected = bySymbol[symbol];
  if (collapseTable) toggleTable();
  document.querySelectorAll(".element-tile").forEach((tile) => tile.classList.toggle("active", tile.dataset.symbol === symbol));
  els("selected-number").textContent = selected.number;
  els("selected-symbol").textContent = selected.symbol;
  els("selected-name").textContent = selected.name;
  els("selected-mass").textContent = `${selected.mass} u`;
  els("stage-title").innerHTML = `${selected.name} <span>/</span> ${selected.symbol}`;
  els("electron-count").textContent = `${String(selected.number).padStart(2, "0")} electrons`;
  els("configuration").innerHTML = formatConfiguration(expandConfiguration(elementConfigs[selected.symbol] || "configuration unavailable"));
  buildOrbitalList();
  drawPes();
  loadModels();
}

function configOrbitals() {
  const config = expandConfiguration(elementConfigs[selected.symbol] || "");
  return [...config.matchAll(/(\d)([spdf])(\d+)/g)].filter((match) => Number(match[3]) > 0).map((match) => ({ n: Number(match[1]), type: match[2], count: Number(match[3]) }));
}

function subshellsForSlater() {
  return [...expandConfiguration(elementConfigs[selected.symbol] || "").matchAll(/(\d)([spdf])(\d+)/g)].map((match) => ({
    n: Number(match[1]),
    type: match[2],
    count: Number(match[3])
  }));
}

function bindingEnergyForSubshell(target) {
  const occupied = subshellsForSlater();
  const targetIsSP = target.type === "s" || target.type === "p";
  let shielding = 0;
  occupied.forEach((subshell) => {
    const isTarget = subshell.n === target.n && subshell.type === target.type;
    if (isTarget) shielding += (target.n === 1 ? 0.3 : 0.35) * Math.max(subshell.count - 1, 0);
    else if (targetIsSP && subshell.n === target.n) shielding += subshell.count;
    else if (targetIsSP && subshell.n === target.n - 1 && (subshell.type === "s" || subshell.type === "p")) shielding += 0.85 * subshell.count;
    else if (targetIsSP && subshell.n < target.n - 1) shielding += subshell.count;
    else if (!targetIsSP && (subshell.n < target.n || (subshell.n === target.n && subshell.type !== target.type))) shielding += subshell.count;
  });
  const zeff = Math.max(selected.number - shielding, 1);
  return 13.6 * (zeff ** 2) / (target.n ** 2);
}

function clearOrbitalModels() {
  modelLoadId += 1;
  orbitalObjects.forEach((object) => scene?.remove(object));
  orbitalObjects.clear();
  updateOrbitalCount();
  els("loading-state").classList.remove("ready");
}

function buildOrbitalList() {
  orbitalObjects.clear();
  const list = els("orbital-list");
  list.innerHTML = "";
  configOrbitals().forEach(({ n, type, count }) => {
    const group = document.createElement("div");
    group.className = "orbital-group";
    const title = document.createElement("div");
    title.className = "group-title";
    title.innerHTML = `<span>${n}${type} · ${count}e</span><span>toggle</span>`;
    title.addEventListener("click", () => {
      const groupObjects = orbitalFiles[type].map((file) => orbitalObjects.get(`${n}-${file}`)).filter(Boolean);
      const visible = groupObjects.some((object) => object.visible);
      groupObjects.forEach((object) => { object.visible = !visible; });
      updateOrbitalButtons();
    });
    group.appendChild(title);
    orbitalFiles[type].forEach((file, index) => {
      const key = `${n}-${file}`;
      const option = document.createElement("button");
      option.className = "orbital-option active";
      option.dataset.key = key;
      option.innerHTML = `<i class="switch"></i>${n}${orbitalLabels[type][index]}`;
      option.addEventListener("click", () => {
        const object = orbitalObjects.get(key);
        if (object) object.visible = !object.visible;
        option.classList.toggle("active", object?.visible);
        updateOrbitalCount();
      });
      group.appendChild(option);
    });
    list.appendChild(group);
  });
  updateOrbitalCount();
}

function updateOrbitalButtons() {
  document.querySelectorAll(".orbital-option").forEach((button) => {
    const visible = orbitalObjects.get(button.dataset.key)?.visible ?? true;
    button.classList.toggle("active", visible);
  });
  updateOrbitalCount();
}

function updateOrbitalCount() {
  const visible = [...orbitalObjects.values()].filter((object) => object.visible).length;
  els("orbital-count").textContent = `${visible} active`;
}

function initThree() {
  const viewport = els("viewport");
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(42, viewport.clientWidth / viewport.clientHeight, .1, 1000);
  camera.position.set(7, 5, 9);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(viewport.clientWidth, viewport.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  viewport.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = .06; controls.target.set(0, 0, 0);
  controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE; controls.mouseButtons.MIDDLE = THREE.MOUSE.PAN;
  renderer.domElement.addEventListener("wheel", (event) => event.preventDefault(), { passive: false });
  renderer.domElement.addEventListener("mousedown", (event) => {
    if (event.button === 1) event.preventDefault();
  });
  renderer.domElement.addEventListener("contextmenu", (event) => event.preventDefault());
  const ambient = new THREE.AmbientLight(0x9ecbff, 1.8); scene.add(ambient);
  const point = new THREE.PointLight(0xff9a55, 20, 30); point.position.set(3, 4, 5); scene.add(point);
  const axes = new THREE.AxesHelper(5); axes.material.transparent = true; axes.material.opacity = .32; scene.add(axes);
  nucleus = new THREE.Mesh(new THREE.IcosahedronGeometry(.42, 2), new THREE.MeshStandardMaterial({ color: 0xff9a55, emissive: 0x5d2712, emissiveIntensity: 2, roughness: .3 }));
  scene.add(nucleus);
  new ResizeObserver(() => {
    camera.aspect = viewport.clientWidth / viewport.clientHeight; camera.updateProjectionMatrix();
    renderer.setSize(viewport.clientWidth, viewport.clientHeight);
  }).observe(viewport);
  animate();
}

function preserveOrbitalMaterial(material) {
  const preserved = material.clone();
  preserved.transparent = true;
  preserved.opacity = opacity;
  preserved.depthWrite = false;
  preserved.side = THREE.DoubleSide;
  return preserved;
}

async function loadModels() {
  if (!scene) return;
  const loadId = modelLoadId;
  const loader = new GLTFLoader();
  const promises = [];
  configOrbitals().forEach(({ n, type }) => {
    orbitalFiles[type].forEach((file) => {
      const key = `${n}-${file}`;
      const promise = new Promise((resolve) => loader.load(`orbital_glbs/${file}.glb`, (gltf) => {
        const model = gltf.scene;
        if (loadId !== modelLoadId) { resolve(); return; }
        const scale = Math.pow(1.75, n - 1) * .8;
        model.scale.setScalar(scale);
        model.traverse((child) => {
          if (child.isMesh) {
            child.material = Array.isArray(child.material) ? child.material.map(preserveOrbitalMaterial) : preserveOrbitalMaterial(child.material);
          }
        });
        model.visible = true; scene.add(model); orbitalObjects.set(key, model); resolve();
      }, undefined, () => resolve()));
      promises.push(promise);
    });
  });
  await Promise.all(promises);
  if (loadId !== modelLoadId) return;
  updateOrbitalButtons();
  els("loading-state").classList.add("ready");
}

function drawPes() {
  const chart = els("pes-chart");
  chart.querySelectorAll(".pes-bar").forEach((bar) => bar.remove());
  chart.querySelectorAll(".chart-y-tick, .chart-x-tick").forEach((tick) => tick.remove());
  const orbitals = configOrbitals().map((orbital) => ({ ...orbital, bindingEnergy: bindingEnergyForSubshell(orbital) }));
  const fixedElectronScale = 14;
  [0, 2, 4, 6, 8, 10, 12, fixedElectronScale].forEach((value, index) => {
    const tick = document.createElement("span");
    tick.className = "chart-y-tick";
    tick.style.bottom = `${(index / 7) * 100}%`;
    tick.textContent = value;
    chart.appendChild(tick);
  });
  const maxBindingEnergy = Math.max(...orbitals.map((orbital) => orbital.bindingEnergy), 1);
  const basePlotWidth = Math.max(chart.parentElement.clientWidth - 56, 520);
  const sortedByEnergy = [...orbitals].sort((a, b) => b.bindingEnergy - a.bindingEnergy);
  let lastPeakX = -Infinity;
  sortedByEnergy.forEach((orbital) => {
    const naturalX = (1 - orbital.bindingEnergy / maxBindingEnergy) * (basePlotWidth - 40);
    orbital.plotX = Math.max(naturalX, lastPeakX + 12);
    lastPeakX = orbital.plotX;
  });
  chart.style.width = `${Math.max(basePlotWidth, lastPeakX + 50)}px`;
  [maxBindingEnergy, maxBindingEnergy * .8, maxBindingEnergy * .6, maxBindingEnergy * .4, maxBindingEnergy * .2, 0].forEach((value, index, values) => {
    const tick = document.createElement("span");
    tick.className = "chart-x-tick";
    tick.style.left = `${(index / (values.length - 1)) * 100}%`;
    tick.textContent = `${Math.round(value)} eV`;
    chart.appendChild(tick);
  });
  orbitals.forEach((orbital, index) => {
    const bar = document.createElement("i");
    bar.className = "pes-bar";
    bar.style.left = `${20 + orbital.plotX}px`;
    bar.style.height = `${(orbital.count / fixedElectronScale) * 100}%`;
    bar.style.animationDelay = `${index * .06}s`;
    bar.title = `${orbital.n}${orbital.type}: ${orbital.count} electrons, estimated ${orbital.bindingEnergy.toFixed(1)} eV`;
    const label = document.createElement("span");
    label.className = "pes-peak-label";
    label.textContent = `${orbital.n}${orbital.type}`;
    bar.appendChild(label);
    chart.appendChild(bar);
  });
}

let cameraOrbitAngle = 0;
function animate() {
  animationFrame = requestAnimationFrame(animate);
  if (autoSpin && camera && controls) {
    cameraOrbitAngle += .006;
    const offset = camera.position.clone().sub(controls.target);
    const radius = THREE.MathUtils.lerp(Math.hypot(offset.x, offset.z), cameraDistanceTarget, .035);
    camera.position.x = controls.target.x + Math.cos(cameraOrbitAngle) * radius;
    camera.position.z = controls.target.z + Math.sin(cameraOrbitAngle) * radius;
    camera.lookAt(controls.target);
  }
  controls?.update();
  if (renderer && scene && camera) renderer.render(scene, camera);
}

function stopPlayback() {
  if (!isPlaying) return;
  isPlaying = false; controls.enabled = true; nucleus.scale.setScalar(1);
  if (playbackSnapshot) {
    playbackSnapshot.forEach(({ visible, scale, position }, key) => {
      const object = orbitalObjects.get(key);
      if (object) { object.visible = visible; object.scale.copy(scale); object.position.copy(position); }
    });
    playbackSnapshot = null;
    updateOrbitalButtons();
  }
  els("play-toggle").innerHTML = "▶ <span>Play</span>";
  els("workspace").classList.remove("playback-active");
}

function playAnimation() {
  if (isPlaying) { stopPlayback(); return; }
  isPlaying = true; controls.enabled = false;
  els("play-toggle").innerHTML = "■ <span>Stop</span>";
  els("workspace").classList.add("playback-active");
  playbackSnapshot = new Map([...orbitalObjects].map(([key, object]) => [key, { visible: object.visible, scale: object.scale.clone(), position: object.position.clone() }]));
  const saved = new Map([...playbackSnapshot].map(([key, state]) => [key, state.visible]));
  orbitalObjects.forEach((object) => { object.visible = false; object.position.set(0, 0, 0); });
  let index = 0;
  const orbitalOrder = { s: 0, p: 1, d: 2, f: 3 };
  const orbitalType = Object.fromEntries(Object.entries(orbitalFiles).flatMap(([type, files]) => files.map((file, fileIndex) => [file, { type, fileIndex }])));
  const sequence = [...orbitalObjects.entries()].sort(([a], [b]) => {
    const [aN, aFile] = a.split("-");
    const [bN, bFile] = b.split("-");
    const aOrbital = orbitalType[aFile] || { type: "s", fileIndex: 0 };
    const bOrbital = orbitalType[bFile] || { type: "s", fileIndex: 0 };
    return Number(aN) - Number(bN) || orbitalOrder[aOrbital.type] - orbitalOrder[bOrbital.type] || aOrbital.fileIndex - bOrbital.fileIndex;
  });
  const reveal = () => {
    if (!isPlaying || index >= sequence.length) {
      if (isPlaying) { isPlaying = false; controls.enabled = true; playbackSnapshot = null; els("play-toggle").innerHTML = "▶ <span>Play</span>"; els("workspace").classList.remove("playback-active"); }
      updateOrbitalButtons(); return;
    }
    const [, object] = sequence[index];
    object.visible = saved.get(sequence[index][0]) ?? true;
    const target = playbackSnapshot.get(sequence[index][0]).scale.x;
    const targetPosition = object.position.clone();
    const n = Number(sequence[index][0].split("-")[0]);
    const spawnDistance = 3.5 + n * 2.2;
    const spawnPosition = new THREE.Vector3(spawnDistance, 1.5 + (index % 3) * .45, 0);
    cameraDistanceTarget = Math.max(cameraDistanceTarget, 8 + n * 3.2);
    object.position.copy(spawnPosition);
    object.scale.setScalar(target * .01);
    const start = performance.now();
    const grow = (now) => {
      if (!isPlaying) { object.scale.setScalar(target); return; }
      const progress = Math.min((now - start) / (900 / speeds[speedIndex]), 1);
      const growth = Math.min(progress / .55, 1);
      const insertion = Math.max(0, (progress - .42) / .58);
      object.scale.setScalar(target * (.01 + .99 * growth));
      object.position.lerpVectors(spawnPosition, targetPosition, insertion);
      if (progress < 1) requestAnimationFrame(grow); else { object.position.copy(targetPosition); index += 1; setTimeout(reveal, 150 / speeds[speedIndex]); }
    };
    requestAnimationFrame(grow);
  };
  reveal();
}

function toggleTable() {
  els("workspace").classList.toggle("table-expanded");
  els("toggle-table").innerHTML = els("workspace").classList.contains("table-expanded") ? "←" : "→";
}
els("toggle-table").addEventListener("click", () => toggleTable());
els("selected-element").addEventListener("click", () => toggleTable());
els("selected-element").addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") toggleTable(); });
els("show-all").addEventListener("click", () => { orbitalObjects.forEach((object) => { object.visible = true; }); updateOrbitalButtons(); });
els("hide-all").addEventListener("click", () => { orbitalObjects.forEach((object) => { object.visible = false; }); updateOrbitalButtons(); });
els("opacity-slider").addEventListener("input", (event) => {
  opacity = Number(event.target.value); els("opacity-output").textContent = `${Math.round(opacity * 100)}%`;
  orbitalObjects.forEach((object) => object.traverse((child) => { if (child.isMesh) child.material.opacity = opacity; }));
});
els("spin-toggle").addEventListener("click", (event) => { autoSpin = !autoSpin; event.currentTarget.classList.toggle("active", autoSpin); });
els("play-toggle").addEventListener("click", playAnimation);
els("speed-toggle").addEventListener("click", (event) => { speedIndex = (speedIndex + 1) % speeds.length; event.currentTarget.textContent = `${speeds[speedIndex]}×`; });
els("reset-camera").addEventListener("click", () => { camera.position.set(7, 5, 9); controls.target.set(0, 0, 0); controls.reset(); });
const orderedElements = [...elements].sort((a, b) => a.number - b.number);
function changeElementBy(delta) {
  const index = orderedElements.findIndex((element) => element.symbol === selected.symbol);
  const next = orderedElements[Math.max(0, Math.min(orderedElements.length - 1, index + delta))];
  if (next) selectElement(next.symbol, false);
}
els("previous-element").addEventListener("click", () => changeElementBy(-1));
els("next-element").addEventListener("click", () => changeElementBy(1));

periodicTable();
initThree();
loadData().then(() => selectElement("C", false)).catch((error) => {
  els("loading-state").textContent = error.message;
});
