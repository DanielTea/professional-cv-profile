import { PUBLIC_DASHBOARD_URLS } from "@/lib/worldData";

export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  source: string;
  kind: "Screenshot" | "Render" | "Research figure" | "Documentation";
};

export type CuriosityProject = {
  slug: string;
  // Public dashboards expose only their live URL; private repository details
  // must never be stored here because this data is shipped to the browser.
  destination: { kind: "repository"; repo: string } | { kind: "dashboard"; url: string; label?: string };
  title: string;
  category: "AI & ML" | "Engineering" | "Data & place" | "Developer tools" | "Public dashboards";
  subtitle: string;
  summary: string;
  question: string;
  stack: string[];
  images: ProjectImage[];
  sections: { title: string; paragraphs: string[] }[];
  takeaway: string;
};

const github = (repo: string) => `https://github.com/DanielTea/${repo}`;
const image = (slug: string, file: string, alt: string, caption: string, source: string, kind: ProjectImage["kind"]): ProjectImage => ({
  src: `/images/projects/${slug}-${file}.webp`, alt, caption, source, kind,
});

export const curiosityProjects: CuriosityProject[] = [
{
  "slug": "generalgamebench",
  "destination": {
    "kind": "dashboard",
    "url": "https://danieltremer.com/generalgamebench/",
    "label": "Open leaderboard"
  },
  "title": "GeneralGameBench",
  "category": "AI & ML",
  "subtitle": "What can an agent learn by playing?",
  "summary": "An open-source game-agent benchmark with actual gameplay, measured reaction times and evidence you can inspect. Explore the first results and a visual catalog of game environments.",
  "question": "Can an agent understand what it sees, choose a useful action and respond while the game is still moving?",
  "stack": [
    "Visual gameplay",
    "Reaction time",
    "Replay evidence",
    "Open source"
  ],
  "images": [
    {
      "src": "/generalgamebench/media/environment-atlas.png",
      "alt": "Collage of all 45 GeneralGameBench environment cards, including runnable games and research candidates",
      "caption": "The complete environment catalog. 36 cards now contain validated tasks covering 43 runnable scenarios; nine cards remain unadmitted. These game previews are not evidence that every environment has been integrated.",
      "source": "https://github.com/DanielTea/generalgamebench/blob/main/docs/MEDIA.md",
      "kind": "Screenshot"
    },
    {
      "src": "/generalgamebench/media/vizdoom-eight-scenarios.webp",
      "alt": "An actual Doom Basic frame from GeneralGameBench's recorded evaluation",
      "caption": "A saved frame from the Doom Basic evaluation. Gameplay frames and action traces are included in the public evidence release. Doom visuals retain their original rights.",
      "source": "https://github.com/DanielTea/generalgamebench/releases/tag/v0.1.0",
      "kind": "Screenshot"
    }
  ],
  "sections": [
    {
      "title": "Intelligence, viewed through play",
      "paragraphs": [
        "A game gives an agent something concrete to do. It has to understand a scene, choose an action and deal with the consequences. The feedback can be immediate: a coin collected, an obstacle avoided, a target missed. That makes games an interesting place to investigate perception, control and planning together.",
        "The project motto is: “Intelligence is the ability to adapt to new environments.” — We test this. The current benchmark measures bounded visual gameplay; it does not turn a game score into a complete measure of intelligence."
      ]
    },
    {
      "title": "A clock that counts the whole response",
      "paragraphs": [
        "GeneralGameBench gives an agent rendered pixels and a set of allowed controls. A fresh challenge ties each reply to its observation, while the referee owns the game score and the timing. Agents cannot simply report their own reward or their own reaction time.",
        "The fast track requires every measured decision to finish in strictly less than 100 milliseconds, including snapshot retrieval, encoding, transport, inference and validation. Engine advancement and eager rendering between decisions are outside the response clock. Slower agents can still take part in an exhibition track. The current runner advances games in lockstep, so these measurements are not yet a demonstration of continuous real-time play in commercial games."
      ]
    },
    {
      "title": "What the first season actually shows",
      "paragraphs": [
        "The first published snapshot contains 436 episodes and 26,712 decisions: 400 runs from four local baseline policies, plus 36 short exhibition episodes. That initial suite used two original 2D games and eight ViZDoom scenarios. Those eight scenarios belong to one Doom game family.",
        "In that first snapshot, Pixel Tracker led the local baseline suite. Actual GPT-6 Astra and Claude Opus 5 calls also played the exhibition tasks, but both exceeded the 100-millisecond limit. Their calls included fresh client startup and network time on each decision. With only two seeds and an eight-decision horizon, that exhibition is an integration demonstration rather than a reliable model comparison.",
        "All current results are provisional and locally measured. The official leaderboard remains empty until independently administered, isolated evaluation and signed evidence are available. Recorded frames, action traces and replay checks make the current work inspectable without pretending that a local run is independently certified."
      ]
    },
    {
      "title": "Expanding the suite on one Mac",
      "paragraphs": [
        "The expanded implementation adds 23 research tasks: all sixteen Procgen games, Crafter, MiniWorld, Pistonball, Breakout, Airstriker, NetHack and MiniHack. That brings the tested suite to 33 scenarios across 26 catalog cards. Each new task must repeat the same rendered frames and score under the same seed and actions before it is admitted.",
        "The expanded snapshot records 1,089 episodes and 14,394 decisions. Seventeen configured models played: seven OpenAI, three Anthropic and seven local vision models, alongside four built-in reference policies. The shared task set, prompt, seed and eight-decision horizon make the setup inspectable. Invalid actions remain visible as errors and zero-score episodes. This short demonstration cannot establish a robust intelligence ranking, and hosted versus persistent local transports carry different latency overheads.",
        "Version 0.3 adds ten validated tasks: Unity VisualFoodCollector, Google Research Football Academy, SuperTuxKart Lighthouse, Luanti ChopTree, SuperTux, Dungeon Crawl Stone Soup, OpenTTD, Mindustry, Cataclysm: DDA and Warzone 2100. Their controls, native scores and exact camera replays were tested on this Mac. Nine run in local Linux ARM64 containers; Unity uses the pinned Mac example. Published engine patches synchronize native ticks, input and rendering. The catalog now has 43 runnable scenarios across 36 validated cards. The published model standings retain the same 33-scenario comparison; new tasks have separate control-policy evidence until a complete model rerun is available.",
        "Nine catalog cards remain unfinished. Native 0 A.D., StarCraft II and Veloren prototypes run here but still fail exact visual replay or task admission. Six other game families need usable local installations as well as adapter work. The StarCraft II beacon route repeats its native score, but animation pixels differ; that is why it is not counted as a verified task. A preview image is not evidence that an integration is complete."
      ]
    },
    {
      "title": "Built to travel to Hugging Face",
      "paragraphs": [
        "The public leaderboard uses a portable static snapshot. A local export prepares a Hugging Face Space and a separate Dataset with exact seeds, task and model revisions, scores, latency and trust labels. This keeps a future Hugging Face version comparable with the website.",
        "Evaluation runs stay on separate workers. The Space will display versioned results rather than hold game installations, execute submitted code or store model-provider credentials. Hugging Face publication is planned; the export is prepared without creating a Space or uploading results yet."
      ]
    },
    {
      "title": "See the games before reading the scores",
      "paragraphs": [
        "The environment catalog now has an image and a short description for every card. Selected environments also have short clips that play on demand. Cards identify recorded benchmark frames and credited project or publisher previews separately; a preview is not itself evaluation evidence.",
        "The catalog reaches beyond the initial suite, from procedural 2D games and open-source worlds to Minecraft, StarCraft II, Factorio and other commercial titles. These are integration candidates, not a claim of existing support. Each card keeps that distinction visible and links to its source."
      ]
    },
    {
      "title": "Bring an agent, keep the evidence",
      "paragraphs": [
        "The participant interface is deliberately small: read an image and allowed actions, then return the observation's challenge and an action. Reference policies and a runnable example are included, so a first local evaluation does not require a model API account.",
        "The next work is about stronger experiments: longer tasks, more seeds, modern 3D adapters, continuous capture and an independently isolated competition service. The public repository contains the code, methodology and roadmap; the leaderboard on this site is the place to explore the measured snapshot and the growing catalog."
      ]
    }
  ],
  "takeaway": "A game score is more useful when you can see the task, inspect the decisions and understand exactly what was measured."
},
  {
    slug: "world-dashboard", destination: { kind: "dashboard", url: PUBLIC_DASHBOARD_URLS.world }, title: "World Dashboard", category: "Public dashboards",
    subtitle: "The same world. Different local stories.",
    summary: "An interactive view of global economic and market conditions, with country comparisons, historical context and visible source dates.",
    question: "How do local conditions and shared global pressures show up side by side?",
    stack: ["Country comparisons", "Public data", "Time series", "Interactive charts"],
    images: [
      image("world-dashboard", "overview", "World Dashboard showing global stress summaries, country selectors and country rankings", "The public World Dashboard, captured on 26 September 2026. Scores and source dates are a snapshot; open the dashboard for its latest published data.", PUBLIC_DASHBOARD_URLS.world, "Screenshot"),
      image("world-dashboard", "country", "World Dashboard country detail with national observations and economic indicators for Germany", "Country detail brings national observations and individual indicators into view. Each observation retains its own reference date.", `${PUBLIC_DASHBOARD_URLS.world}#DE`, "Screenshot"),
    ],
    sections: [
      { title: "Start with the world, then choose a country", paragraphs: ["The World Dashboard brings country-level economic and market observations into one public interface. The overview summarises global stress, domestic conditions, shared pressures and the breadth of elevated scores. A searchable country ranking makes it easy to move from the broad picture to an individual place.", "The curiosity behind it is comparative: a movement that looks significant on its own may read differently alongside other countries, or against that country’s own history."] },
      { title: "Keep the context close", paragraphs: ["Selecting a country reveals national observations, the indicators used in its score, and a historical view of scores and share-price drawdowns. Other observations appear separately as context, so being visible on the page does not automatically mean contributing to the score.", "Source labels, reference dates and freshness notes help explain what the display is actually comparing. An hourly page refresh does not make a monthly economic release a new observation."] },
      { title: "Explore a pattern, then inspect it", paragraphs: ["Use the country selector or ranking to explore a place, then follow the individual indicators and history. The dashboard describes observed conditions and reconstructed historical context; its scores are not a forecast of the next market move. The public interface is available directly through the link on this page."] },
    ],
    takeaway: "A global overview becomes more useful when you can trace it back to a local observation.",
  },
  {
    slug: "maritime-dashboard", destination: { kind: "dashboard", url: PUBLIC_DASHBOARD_URLS.maritime }, title: "Maritime Dashboard", category: "Public dashboards",
    subtitle: "Following the movement behind the economy.",
    summary: "Explore port activity, vessel calls and strategic passages through public maritime data, interactive maps and historical charts.",
    question: "What can the movement through ports and passages tell us about the physical economy?",
    stack: ["Port activity", "Interactive maps", "Trade flows", "CSV exports"],
    images: [
      image("maritime-dashboard", "overview", "Maritime Dashboard showing global port activity, import estimates and sector exposure composites", "A public dashboard capture from 26 September 2026. The activity chart shows provider estimates with their source and retrieval dates.", PUBLIC_DASHBOARD_URLS.maritime, "Screenshot"),
      image("maritime-dashboard", "map", "Maritime Dashboard ports and passages map with selected Suez Canal activity and historical context", "The ports and passages view connects geographic locations to activity summaries and history. Map imagery is geographic context, not live vessel imagery. EOxCloudless / EOX IT Services GmbH, modified Copernicus Sentinel data (2016), CC BY 4.0; NASA GIBS overview/fallback.", PUBLIC_DASHBOARD_URLS.maritime, "Screenshot"),
    ],
    sections: [
      { title: "From an abstract total to a physical place", paragraphs: ["The Maritime Dashboard looks at the physical movement behind global trade. Its public views bring together estimated imports and exports, vessel calls, port locations and strategic passages. The aim is to make changes in activity explorable, from a global total down to a particular location.", "The main chart switches between measures and time windows. Separating cargo estimates from vessel calls matters: more ships and more delivered cargo are different observations."] },
      { title: "Follow a route through the data", paragraphs: ["The ports and passages view pairs a navigable map with location details, comparison windows and historical charts. Selecting a passage such as the Suez Canal connects a place on the map to its reported activity.", "A separate set of monitoring composites explores themes such as energy gateways, container trade and rerouting pressure. Source-health information and CSV exports make it possible to inspect the observations behind the visual summaries."] },
      { title: "Make the limits visible", paragraphs: ["These are provider estimates derived from maritime activity, not verified customs totals. Source dates can lag retrieval dates, and a reconstructed history differs from the record of what was collected at the time. The dashboard treats its composites as context indicators, rather than stock-return predictions."] },
    ],
    takeaway: "Trade becomes easier to explore when the chart, the place and the source date stay connected.",
  },
  {
    slug: "us-indicators-dashboard", destination: { kind: "dashboard", url: PUBLIC_DASHBOARD_URLS.us }, title: "US Indicators Dashboard", category: "Public dashboards",
    subtitle: "A broader view than a single headline.",
    summary: "A public overview of US economic and market indicators, organised into cycle, stress and valuation views with explanations behind the summaries.",
    question: "How can many different indicators become a readable picture without losing their differences?",
    stack: ["Economic indicators", "Market context", "Source dates", "Interactive filters"],
    images: [image("us-indicators-dashboard", "overview", "US Indicators Dashboard showing its stress composite, cycle risk, market stress and valuation summaries", "The public US Indicators view, captured on 26 September 2026. This image records one published snapshot, not current market readings.", PUBLIC_DASHBOARD_URLS.us, "Screenshot")],
    sections: [
      { title: "Put the signals in the same room", paragraphs: ["The US Indicators Dashboard gathers a broad collection of economic and market observations in one public view. Its summaries separate cycle conditions, near-term stress and longer-horizon valuation, while the indicator sections expose the detail beneath those summaries.", "That separation is the central idea: a valuation measure and a short-term stress indicator answer different questions. Placing them together should make those differences easier to see."] },
      { title: "Read below the headline number", paragraphs: ["The interface includes explanatory controls, composite coverage and breakdowns, and counts of green, yellow and red indicators that can be used as filters. Detailed sections cover areas such as credit, rates, volatility, commodities and market breadth.", "The dashboard also shows a calculation timestamp and links into historical views. These help distinguish the date the page was assembled from the reference dates of the observations it contains."] },
      { title: "Compare views, not just colours", paragraphs: ["Start with the overview, inspect a summary’s components, and open History to see how the readings evolved. Colours and composite scores organise the available evidence; they are not precise forecasts or instructions to trade. The linked public dashboard provides the interactive version behind this screenshot."] },
    ],
    takeaway: "A summary earns its place when you can inspect what went into it.",
  },
  {
    slug: "us-history-dashboard", destination: { kind: "dashboard", url: PUBLIC_DASHBOARD_URLS.usHistory }, title: "US History Dashboard", category: "Public dashboards",
    subtitle: "Give a snapshot a memory.",
    summary: "Explore recorded US indicators over time, compare time windows and inspect the history behind the current dashboard.",
    question: "How does today’s reading change meaning when you can see the path that led to it?",
    stack: ["Signal history", "Time windows", "Data tables", "CSV exports"],
    images: [image("us-history-dashboard", "overview", "US History Dashboard showing selectable time windows and historical cycle, stress and valuation charts", "The History tab of the public US dashboard, captured on 26 September 2026. The chart compares aggregate scores across the selected window.", PUBLIC_DASHBOARD_URLS.usHistory, "Screenshot")],
    sections: [
      { title: "From a reading to a sequence", paragraphs: ["The US History Dashboard adds a time dimension to the current-indicator view. It opens directly in the US dashboard’s History tab, where recorded readings can be explored across different windows instead of being reduced to the latest number.", "The overview compares the US stress composite with its cycle, stress and valuation components. Seeing those lines together helps reveal whether a change is broad or concentrated in one part of the picture."] },
      { title: "Choose the scale of the question", paragraphs: ["Time-window controls let you switch between shorter and longer views, while a signal filter narrows the display. Charts are accompanied by data tables, and selected history can be exported for further inspection.", "Background bands provide market-drawdown context. They help place indicator movements alongside market conditions without treating a visual relationship as proof that one predicted the other."] },
      { title: "A history has its own provenance", paragraphs: ["The page distinguishes days with fresh readings, carried-forward observations and gaps. That matters when interpreting a flat line: an unchanged value can mean that no new source observation arrived. This is a way to inspect the recorded series and its coverage, rather than assume every plotted day is an independent measurement."] },
    ],
    takeaway: "A historical chart should explain both how a signal changed and when it was actually observed.",
  },
  {
    slug: "screenquest", destination: { kind: "repository", repo: "screenquest" }, title: "ScreenQuest", category: "AI & ML",
    subtitle: "An agent that plays by looking.",
    summary: "Local vision models, a game screen, and a simple rule: an action only counts when its result can be seen.",
    question: "How far can a local AI agent get using only what is visible on screen?",
    stack: ["Python", "Core ML", "MLX", "Qwen", "Computer vision"],
    images: [
      image("screenquest", "combat", "ScreenQuest gameplay capture showing combat in Hordes.io", "A saved gameplay frame from the combat experiment in Hordes.io. Game visuals belong to their respective rights holders.", `${github("screenquest")}/blob/main/docs/media/combat.jpg`, "Screenshot"),
      image("screenquest", "pickup", "ScreenQuest capture from a separate coin pickup trial", "A separate pickup trial. The agent checks the resulting message to verify collection.", `${github("screenquest")}/blob/main/docs/media/pickup.jpg`, "Screenshot"),
    ],
    sections: [
      { title: "The experiment", paragraphs: ["ScreenQuest uses Hordes.io as a visual test environment for a game-playing agent on Apple Silicon. It observes screenshots, chooses bounded actions, and reviews the resulting evidence. Model inference runs locally after the initial downloads.", "The interesting question is what happens between perception and action: the world keeps moving while a model is thinking. A useful controller needs to act on a recent frame and check that its assumptions still hold."] },
      { title: "Two speeds of thinking", paragraphs: ["A fast path combines templates, geometry and rules with Laya through Core ML. A slower Qwen vision-language planner runs through MLX. The controller does not wait for a fresh planner response before every action, and it rechecks the screen before sending input.", "Saved frames and event logs support a separate review step. A click is not evidence of a pickup; a newly visible pickup message is. That distinction keeps the experiment grounded in observable outcomes."] },
      { title: "What the evidence supports", paragraphs: ["The repository demonstrates combat inputs, camera gestures and a coin pickup in a separate trial. Navigation remains inconsistent, and equipment collection has not been verified. More complex games are a motivation for future work, not a demonstrated capability."] },
    ],
    takeaway: "A good agent needs a way to notice whether its action actually worked.",
  },
  {
    slug: "aerospike-ce", destination: { kind: "repository", repo: "aerospike-ce" }, title: "Aerospike CE", category: "Engineering",
    subtitle: "From a specification to a shape.",
    summary: "An exploration of computational engineering: describe an aerospike engine in JSON, then generate and inspect its geometry.",
    question: "What changes when engineering rules generate the geometry?",
    stack: ["C#", ".NET", "PicoGK", "ShapeKernel", "Python"],
    images: [
      image("aerospike-ce", "overview", "Three-quarter render of the generated aerospike engine", "Generated aerospike geometry, shown in a three-quarter view. This is a model render, not a photograph of hardware.", `${github("aerospike-ce")}/blob/main/docs/renders/01-three-quarter.png`, "Render"),
      image("aerospike-ce", "cutaway", "Cutaway render exposing the aerospike engine's internal geometry", "A cutaway view makes the internal geometry available for inspection.", `${github("aerospike-ce")}/blob/main/docs/renders/05-cutaway.png`, "Render"),
    ],
    sections: [
      { title: "A different starting point", paragraphs: ["Instead of drawing each feature by hand, this project starts with a JSON specification and a set of engineering rules. PicoGK and the LEAP 71 ShapeKernel turn those inputs into voxel geometry for an aerospike engine.", "The design is organised into a centrebody, a cowl and a head disc. The model derives the plug contour and includes regenerative cooling paths, connecting the outer shape to the engineering assumptions behind it."] },
      { title: "Generation needs a counterpart", paragraphs: ["A Python validation harness examines geometry, cooling and other screening calculations. That creates an iteration loop: change the specification, generate the design, and inspect the checks. A configuration that cannot meet the cooling assumptions should be reported as such.", "The repository also explores printable mesh exports and checks such as watertightness. The renders show the generated object; they are useful for understanding its structure, while numerical checks answer different questions."] },
      { title: "The boundary of the model", paragraphs: ["This is an exploration of a computational engineering workflow. Its simplified screening models do not establish that an engine can be manufactured and operated safely. It is neither a replacement for detailed propulsion validation nor a reproduction of LEAP 71’s proprietary engineering system."] },
    ],
    takeaway: "Generating a plausible shape is only half the problem. Knowing when a specification fails is just as interesting.",
  },
  {
    slug: "ibnn-forget-lm", destination: { kind: "repository", repo: "ibnn-forget-lm" }, title: "Learning to forget", category: "AI & ML",
    subtitle: "Two ideas. One controlled experiment.",
    summary: "A small language-model study testing whether lateral neuron coupling adds anything to forgetting attention.",
    question: "Do two promising mechanisms help each other, or is one doing all the work?",
    stack: ["Python", "PyTorch", "Character-level LM", "Ablation studies"],
    images: [
      image("ibnn-forget-lm", "factorial", "Research figure from the IBNN and forgetting-attention factorial study", "The repository’s factorial experiment figure. Results describe the tested small-model setting.", `${github("ibnn-forget-lm")}/blob/master/figures/fig2_factorial.png`, "Research figure"),
      image("ibnn-forget-lm", "robustness", "Robustness crossover research plot from the IBNN language-model experiments", "A second figure from the repository exploring robustness and crossover behaviour.", `${github("ibnn-forget-lm")}/blob/master/figures/fig1_robustness_crossover.png`, "Research figure"),
    ],
    sections: [
      { title: "Separate the moving parts", paragraphs: ["This project compares standard and IBNN feed-forward layers with standard and forgetting attention. A two-by-two experiment makes it possible to ask which change helps and whether the combination behaves differently.", "The harness runs locally with PyTorch and includes character-level language modelling on Tiny Shakespeare, alongside further experiments. Correctness checks and repeated seeds matter because a small apparent improvement can easily be noise."] },
      { title: "A useful negative result", paragraphs: ["In the reported three-seed Tiny Shakespeare factorial, forgetting attention improves held-out performance by about 0.19 bits per character. Adding IBNN does not provide an additional gain; its mean result is slightly worse in both attention settings.", "The forget mechanism is related to the published Forgetting Transformer, rather than a claim of a new attention invention. The study’s value is the controlled comparison and the willingness to retain an unhelpful result."] },
      { title: "Keep the conclusion at the right scale", paragraphs: ["These results describe the tested architectures, datasets and training budgets. They are not evidence that every form of lateral coupling fails in every model. The repository extends the investigation with additional variants and robustness checks, making the next question testable rather than assuming an answer."] },
    ],
    takeaway: "An experiment that tells you what not to add can be as useful as one that improves a benchmark.",
  },
  {
    slug: "rpi-datalogger", destination: { kind: "repository", repo: "rpi-datalogger" }, title: "RPi Datalogger", category: "Engineering",
    subtitle: "Vehicle telemetry, beyond the driveway.",
    summary: "A Raspberry Pi collects CAN/OBD-II and GPS data, buffers it offline, and uploads over a mobile connection.",
    question: "How do you keep collecting useful data when the connection disappears?",
    stack: ["Python", "Raspberry Pi", "CAN bus", "SQLite", "Supabase"],
    images: [image("rpi-datalogger", "documentation", "Repository documentation showing the Raspberry Pi datalogger hardware and architecture", "Rendered README excerpt showing the hardware and data flow. This headless project does not have a graphical dashboard.", `${github("rpi-datalogger")}#architecture`, "Documentation")],
    sections: [
      { title: "A small box with several jobs", paragraphs: ["The datalogger combines a Raspberry Pi, a PiCAN 2 CAN interface and a SIM7600E-H modem with GPS. It polls OBD-II vehicle data and reads position information, then sends records to Supabase over a 4G connection.", "It is designed for unattended operation, where the interesting work begins after the first successful upload. Power cycles, serial-device changes and lost connectivity all need an explicit response."] },
      { title: "Make failure local", paragraphs: ["Independent reader and uploader threads keep one component’s interruption from stopping the entire pipeline. A SQLite queue buffers records when uploads fail and flushes them when the connection returns.", "The surrounding system includes stable device names, systemd services and modem recovery helpers. Together they address the practical gap between a script that runs once and a device that can keep working without someone watching a terminal."] },
      { title: "Hardware is part of the software", paragraphs: ["The documentation covers wiring, diagnostic gateway wake-up behaviour and modem power requirements. Those details matter as much as the Python code: a software retry cannot compensate for an inadequate power supply. Running the project requires the actual hardware and a configured backend."] },
    ],
    takeaway: "For a field device, recovery behaviour is a core feature.",
  },
  {
    slug: "3d-rocket-engine-simulator", destination: { kind: "repository", repo: "3DRocketEngine_Simulator" }, title: "3D Rocket Engine Simulator", category: "Engineering",
    subtitle: "Make a parameter. See a consequence.",
    summary: "An interactive browser workbench for exploring nozzle geometry, flow, regenerative cooling and design trade-offs.",
    question: "Can an interactive model make coupled engineering trade-offs easier to see?",
    stack: ["Python", "FastAPI", "Three.js", "WebSocket", "NumPy"],
    images: [image("3d-rocket-engine-simulator", "interface", "Browser interface of the 3D Rocket Engine Simulator with engine geometry and parameter controls", "Local capture of the running simulator with its default model and controls. Values are simulation outputs.", github("3DRocketEngine_Simulator"), "Screenshot")],
    sections: [
      { title: "A workbench for questions", paragraphs: ["The simulator brings a parametric liquid rocket engine into the browser. Changing geometry and operating inputs updates a Three.js view alongside calculations from a Python backend. The aim is to make relationships between shape, flow and cooling visible.", "It includes bell-nozzle geometry, variable wall thickness and regenerative cooling channels. Several visual modes expose different aspects of the same design, including thermal, stress and internal-flow views."] },
      { title: "Connect the tools", paragraphs: ["FastAPI and WebSockets connect the interface to the numerical routines. An evolutionary optimisation component explores competing objectives, while STL export connects the model to a geometry file that can be inspected elsewhere.", "The interesting part is the coupling: a geometry change can affect cooling, mass and performance at once. Putting those views in one interface makes it easier to explore the consequences of a choice rather than optimise a single number in isolation."] },
      { title: "A simulation is a set of assumptions", paragraphs: ["The flow and thermal calculations are simplified models. Their outputs support exploration and comparison; they do not demonstrate a validated, flight-ready engine. Likewise, exporting an STL is a geometry capability, not proof that the resulting hardware is suitable for operation."] },
    ],
    takeaway: "The most useful interactive view reveals how changing one thing changes several others.",
  },
  {
    slug: "berlin-real-estate-analyser", destination: { kind: "repository", repo: "berlin-real-estate-analyser" }, title: "Berlin Real Estate Analyser", category: "Data & place",
    subtitle: "Looking past the listing price.",
    summary: "A Berlin property data pipeline that brings asking prices, rental assumptions and neighbourhood context into one analysis.",
    question: "What becomes visible when property listings are compared on consistent assumptions?",
    stack: ["Python", "Pandas", "Apify", "Financial modelling", "Spatial analysis"],
    images: [image("berlin-real-estate-analyser", "documentation", "Berlin Real Estate Analyser README showing the analysis pipeline and features", "Rendered README excerpt of the data collection and analysis workflow. This is a Python pipeline, not a live property dashboard.", github("berlin-real-estate-analyser"), "Documentation")],
    sections: [
      { title: "Turn listings into comparable records", paragraphs: ["This project collects Berlin property listings, cleans their fields and evaluates them using a shared financial model. Basic search data can be enriched with more detailed exposé information before records are merged and deduplicated.", "The pipeline calculates measures such as price per square metre, rental yields and projected cash flow. A consistent set of inputs makes the differences between properties easier to inspect than a collection of individual adverts."] },
      { title: "Add a little neighbourhood curiosity", paragraphs: ["Alongside financial and property features, the project explores proximity to Berlin wine establishments as a lifestyle signal. Spatial indexing helps compare locations without repeatedly scanning every venue.", "This makes the ranking deliberately inspectable: financing assumptions and personal preferences can affect the result in very different ways. A lifestyle score is an input to explore, not an objective measure of investment quality."] },
      { title: "A snapshot, not the market", paragraphs: ["Saved analyses reflect the listings and assumptions used when they were produced. Asking prices are not transaction prices, and projected returns are model outputs rather than realised outcomes. The project is an exploration of data collection and comparison, with the code available to inspect those choices."] },
    ],
    takeaway: "A ranking is only as useful as your understanding of the assumptions behind it.",
  },
  {
    slug: "berlin-winery-analysis", destination: { kind: "repository", repo: "Berlin_Winery_Analysis" }, title: "Berlin Winery Analysis", category: "Data & place",
    subtitle: "A city, viewed through its wine spots.",
    summary: "Maps and neighbourhood comparisons exploring the distribution of Berlin’s wine establishments.",
    question: "What can a very specific kind of place reveal about a city?",
    stack: ["Python", "Pandas", "Folium", "Matplotlib", "Geospatial data"],
    images: [
      image("berlin-winery-analysis", "map", "Berlin wine establishment heatmap generated by the project", "A published map from the repository showing the spatial distribution of wine establishments.", `${github("Berlin_Winery_Analysis")}/blob/main/outputs/berlin_wineries_heatmap_improved.png`, "Research figure"),
      image("berlin-winery-analysis", "density", "District-level wine establishment density analysis for Berlin", "Density analysis from the project’s saved outputs. These figures describe its source dataset.", `${github("Berlin_Winery_Analysis")}/blob/main/outputs/berlin_winery_density_analysis.png`, "Research figure"),
    ],
    sections: [
      { title: "Start with a place on the map", paragraphs: ["Berlin Winery Analysis collects and processes location data, then turns it into interactive maps and static figures. Wine establishments offer a specific lens on the city: where they cluster, how districts differ, and what changes when geography is taken into account.", "The project includes marker maps, heatmaps and district comparisons. Each view answers a slightly different question, from finding individual locations to seeing broader concentrations."] },
      { title: "Counts are only the beginning", paragraphs: ["A large district can contain more venues simply because it covers more ground. Density views introduce area into the comparison, making the choice of denominator visible.", "Other scripts explore growth and relationships with real-estate patterns. Some recent-opening and historical analyses use heuristics or modelling, so those outputs need to be read with their generation method in mind rather than as a verified historical census."] },
      { title: "Follow the curiosity, inspect the data", paragraphs: ["The useful result is an inspectable workflow from collected locations to visual questions. Source coverage, venue definitions and modelling assumptions affect what a map can say. Apparent neighbourhood relationships invite further investigation; they do not establish that wine establishments cause property prices to change."] },
    ],
    takeaway: "A map is a way to ask a more precise question about a place.",
  },
  {
    slug: "ui-test-generator", destination: { kind: "repository", repo: "ui-test-generator" }, title: "UI Test Generator", category: "Developer tools",
    subtitle: "From a recorded workflow to a test draft.",
    summary: "Screen recording and vision-model analysis explore how demonstrated interactions can become structured testing notes.",
    question: "Can showing a workflow reduce the work of describing how to test it?",
    stack: ["Next.js", "React", "Python", "GPT-4 Vision", "Screen capture"],
    images: [image("ui-test-generator", "interface", "UI Test Generator web application with recording controls", "Local capture of the web recorder before recording. Analysis requires a configured model provider.", github("ui-test-generator"), "Screenshot")],
    sections: [
      { title: "Demonstrate the interaction", paragraphs: ["This project explores a workflow that begins with a screen recording. Instead of writing every step from memory, a user demonstrates the interaction and lets a vision model inspect sampled frames.", "The repository contains a Next.js web application and a Python implementation. Its prompts include UI test generation, while the broader recording tools also support workflow descriptions and tutorial-style analysis."] },
      { title: "Recording is the input", paragraphs: ["The web version provides browser-based recording and frame extraction. The analysis path uses OpenAI or Azure OpenAI, and the Python version also explores spoken narration. Sampling controls help manage the amount of image content sent for analysis.", "The interesting bridge is from visible actions to a structured account of what happened. That can give a person a starting point for documentation or test steps while preserving the recording as something to check against."] },
      { title: "Keep a person in the review loop", paragraphs: ["A model-generated test draft still needs review: screenshots do not expose every hidden state, assertion or edge case. The project explores assisted authoring rather than demonstrating that generated tests are automatically correct. Its local interface can be viewed without making a model request; analysis requires provider configuration."] },
    ],
    takeaway: "A demonstration can be a useful first draft of a specification.",
  },
  {
    slug: "llm-classifier", destination: { kind: "repository", repo: "llm-classifier" }, title: "LLM Classifier", category: "AI & ML",
    subtitle: "Let the categories take shape.",
    summary: "A text classification experiment that creates and merges labels while protecting categories that should stay distinct.",
    question: "What if you do not know the right taxonomy before reading the data?",
    stack: ["Python", "Pandas", "OpenAI", "CSV pipelines"],
    images: [image("llm-classifier", "documentation", "LLM Classifier repository documentation showing its features and Python usage", "Rendered README excerpt of the command-line classifier. The project processes text and CSV files without a graphical interface.", github("llm-classifier"), "Documentation")],
    sections: [
      { title: "A taxonomy that can evolve", paragraphs: ["Many classification tasks start with a fixed list of labels. This project explores the other direction: an LLM assigns labels to text and can introduce categories as it encounters new material.", "A configurable limit keeps the label set manageable. When consolidation is needed, the system can merge similar categories, while fixed classes remain protected from those merges."] },
      { title: "Give the merging step context", paragraphs: ["The implementation can track category frequency and extract keywords to inform consolidation. That makes the question more specific than whether two labels merely sound similar: their use in the dataset can also influence a decision.", "The interface is intentionally small: a Python API and a command-line path for CSV processing. Configuration covers category limits, label length, protected classes and the text column to analyse."] },
      { title: "Flexible labels still need checking", paragraphs: ["An evolving taxonomy trades a predefined structure for adaptability. Its usefulness depends on the task, the model and the review of classification and merge decisions. The repository documents the mechanism; it does not establish a universal accuracy result or eliminate the need to inspect the output."] },
    ],
    takeaway: "The difficult part of classification is often deciding which distinctions are worth keeping.",
  },
];

export function projectUrl(project: CuriosityProject) {
  return project.destination.kind === "dashboard"
    ? project.destination.url
    : github(project.destination.repo);
}

export function readingMinutes(project: CuriosityProject) {
  const words = [project.summary, project.question, project.takeaway, ...project.sections.flatMap(s => [s.title, ...s.paragraphs])].join(" ").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
