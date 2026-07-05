# Maxwell Goldenson — Portfolio

Static HTML/CSS/JS portfolio site. No build system — open `index.html` directly in a browser or serve from any static host.

**Design:** light "engineering drawing" system — warm paper background with a drafting grid, ink
linework, drafting-blue accents, and mono annotations (dimension callouts, FIG. numbers, a title
block in the footer). Shared styles live in `assets/style.css`; shared behavior (nav, scroll
reveal, skill→project filter, video sound toggles) in `assets/site.js`; the figure zoom overlay
in `assets/lightbox.js`.

**TODO:** drop a `resume.pdf` into the repository root — the nav and hero link to it.

---

## File Structure

```
portfolio/
├── index.html          # Home page (hero, projects, skills, experience, about)
├── contact.html        # Contact form (mailto-based, no backend)
├── favicon.svg         # Browser tab icon
├── README.md
│
├── assets/
│   ├── style.css       # Design system shared by every page
│   ├── site.js         # Nav, reveal animations, skill filter, video controls
│   └── lightbox.js     # Click-to-zoom for case study figures
│
├── projects/           # Individual project case study pages
│   ├── linear-encoder.html
│   ├── data-logger.html
│   ├── delta-printer.html
│   ├── smart-tongs.html
│   ├── pain-depi.html
│   ├── foc-study.html
│   ├── corexy-printer.html
│   └── clipper-guard.html
│
└── images/             # Project photos, organized by project
    ├── cards/          # Generated 3:2 WebP heroes for the homepage cards
    ├── data-logger/
    ├── delta-printer/
    ├── corexy-printer/
    └── pain-depi/
```

---

## Images

Each subfolder in `images/` corresponds to a project page. Named files (`01-`, `02-`, …) are actively used in the HTML; `PXL_` files are raw originals kept as source material.

### `images/data-logger/`
| File | Used for |
|---|---|
| `01-mechanism-monitored.jpg` | Problem — mechanism being monitored |
| `02-failure-data.jpg` | Problem — example failure data |
| `02-pcb-layout.jpg` | Process — PCB layout |
| `03-hardware-assembled.jpg` | Process — assembled hardware |
| `04-enclosure.jpg` | Process — enclosure |
| `05-firmware-diagram.jpg` | Solution — firmware architecture diagram |
| `06-data-output.jpg` | Result — data output |
| `07-dashboard.jpg` | Result — dashboard |
| `schematic.pdf` | Solution — schematic (embedded PDF) |
| `schematic-unsized.pdf` | Source file |

### `images/delta-printer/`
| File | Used for |
|---|---|
| `01-rev1-assembled.jpg` | Problem — REV1 assembled |
| `03-copper-heater-block.jpg` | Process — custom copper heater block |
| `04-rev2-ball-joint.jpg` | Process — REV2 ball joint |
| `05-rev5-printing.jpg` | Result — REV5 printing |
| `magnet joints.jpg` | Process — magnetic joint detail |
| `vase.jpg` | Result — vase mode print |
| `PXL_20230508_050134970.MP.jpg` | Raw source |
| `PXL_20230508_144841951.MP.jpg` | Raw source |
| `PXL_20230403_045249364.TS.mp4` | Raw video source |

### `images/corexy-printer/`
| File | Notes |
|---|---|
| `PXL_20230627_220329991.jpg` | Raw source |
| `PXL_20230628_003557040.jpg` | Raw source |
| `PXL_20230628_003600144.jpg` | Raw source |
| `PXL_20230628_003602149.jpg` | Raw source |
| `PXL_20230628_170342241.jpg` | Raw source |
| `PXL_20230628_170349575.MP.jpg` | Raw source |
| `PXL_20230628_170409724.jpg` | Raw source |
| `PXL_20230628_170416530.jpg` | Raw source |
| `PXL_20230628_170428012.MP.jpg` | Raw source |
| `PXL_20230628_170438291.jpg` | Raw source |
| `PXL_20230718_023039322.jpg` | Raw source |
| `PXL_20230718_023045675.jpg` | Raw source |
| `PXL_20230718_024546572.jpg` | Raw source |
| `PXL_20230802_175325469.jpg` | Raw source |
| `PXL_20230802_175336992.jpg` | Raw source |
| `PXL_20230813_054406268.jpg` | Raw source |
| `PXL_20230816_035326719.jpg` | Raw source |
| `PXL_20230816_035331107.jpg` | Raw source |
| `PXL_20230816_035333759.jpg` | Raw source |

### `images/pain-depi/`
| File | Used for |
|---|---|
| `01-robot-competition.jpg` | Problem — robot at competition |
| `02-game-field.jpg` | Problem — game field |
| `03-belt-box-cad.jpg` | Process — belt-box CAD |
| `04-wire-torsion-jig.jpg` | Process — wire torsion cycling jig |
| `05-fea-stress-plot.jpg` | Process — FEA stress plot |
| `06-robot-side-view.jpg` | Result — robot side view |
| `07-robot-action.jpg` | Result — robot in action |
| `PXL_20230220_233110981.jpg` | Raw source |
| `PXL_20230220_233117851.jpg` | Raw source |
| `PXL_20230220_233121733.jpg` | Raw source |
| `PXL_20230220_233153119.MP.jpg` | Raw source |
| `archive.jpg` | Archive reference |

---

## Adding a New Project

1. Create `projects/your-project.html` (copy any existing project page as a template)
2. Add a folder `images/your-project/` with numbered images (`01-`, `02-`, …)
3. Add a project card to `index.html` inside `.projects-grid` with a `data-skills="..."` attribute
4. Add relevant skill slugs to the `data-skills` list so the skill filter works

### Skill slugs used in filtering

| Slug | Pill label |
|---|---|
| `solidworks` | SolidWorks / SOLIDWORKS Simulation |
| `onshape` | OnShape |
| `fea` | FEA |
| `drafting` | Technical Drafting |
| `gdt` | GD&T |
| `c` | C |
| `arduino` | Arduino-C |
| `esp32` | ESP32 |
| `verilog` | Verilog |
| `python` | Python |
| `matlab` | MATLAB |
| `schematic` | Schematic Capture |
| `easyeda` | EasyEDA |
| `spice` | SiMetrix (SPICE) |
| `pcb` | Custom PCB Layout |
| `sensors` | Sensor Integration |
| `motor-drivers` | Motor Drivers |
| `cnc` | CNC Machining |
| `3dprint` | 3D Printing |
| `injection` | Injection Molding |
| `prototyping` | Rapid Prototyping |
| `fixtures` | Fixture Design |
| `machining` | Hand Machining |
