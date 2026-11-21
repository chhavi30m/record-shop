/*
  THE SHOP, IN ONE FILE
  Everything the page shows about your crates and records lives here.
  Change a title, a description or an audio file, save, and reload.

  audio      Path to the record's song, relative to the page, for example "audio/fund-events.mp3".
             Leave it "" and the vinyl stays silent.
  ambient    Optional background track that plays after the shutter opens, for example "audio/shop.mp3".
             Leave it "" to get the generated vinyl crackle instead.
  crate      Which crate the record sits in. Must match a crate id below.
  pattern    Sleeve art: "rays", "rings", "stripes", "checks" or "dots".
  color1/2   The two sleeve colors, as hex values.
  Order      Crates and records show up in the order they are listed.
*/
window.SHOP = {
  ambient: "",

  crates: [
    { id: "work", name: "Work", note: "BlackRock and Mahindra & Mahindra" },
    { id: "research", name: "Research", note: "Elsevier, ICCIKE and arXiv" }
  ],

  records: [
    {
      id: "w1", crate: "work", audio: "audio/latina.mp3",
      title: "Job Creation Pipeline Optimization", headline: "75% faster", subtitle: "BlackRock, client-package job creation",
      description: "A job-creation pipeline that ran step by step and took 12 hours. Re-architected it to finish in 3, with dynamic vendor pricing features",
      tracks: ["Removed redundant API calls", "Cut heavy database queries", "Added batching and multithreading"],
      tags: ["Query optimization", "Batching", "Multithreading"],
      color1: "#2D4FD6", color2: "#F3A5BF", pattern: "rays"
    },
    {
      id: "w2", crate: "work", audio: "audio/rnb.mp3",
      title: "Full-Stack Event-based Dev", headline: "10k+ events", subtitle: "BlackRock, C#/.NET event platform",
      description: "Azure Service Bus + internal dashboard publishers and consumers for private equity platform",
      tracks: ["Two-way synchronization with live dashboard frameworks and service bus", "Idempotent handling for legacy migrations", "Many more platform enhancements"],
      tags: ["C#", ".NET", "Azure Service Bus"],
      color1: "#F2B632", color2: "#1F8A7A", pattern: "rings"
    },
    {
      id: "w3", crate: "work", audio: "audio/sundown.mp3",
      title: "Index Onboarding Automation", headline: "83% fewer risk incidents", subtitle: "BlackRock, automation tooling",
      description: "End-to-end automation tools for onboarding indices, designed and deployed from start to finish.",
      tracks: ["Setup time down 54%", "Risk incidents down 83%"],
      tags: ["Automation"],
      color1: "#E4503A", color2: "#F2B632", pattern: "stripes"
    },
    {
      id: "w4", crate: "work", audio: "audio/ts.mp3",
      title: "Legacy Wrappers", headline: "57% fewer incidents", subtitle: "BlackRock, system modernization",
      description: "Python and Bash wrappers that modernize legacy systems, making them more reliable and lowering downstream risk.",
      tracks: ["Python wrappers", "Bash wrappers", "Downstream risk incidents down 57%"],
      tags: ["Python", "Bash"],
      color1: "#1F8A7A", color2: "#F2B632", pattern: "checks"
    },
    {
      id: "w5", crate: "work", audio: "audio/lofi_2.mp3",
      title: "Automation, Automation, Automation", headline: "79% less manual effort", subtitle: "BlackRock, analytics workflows",
      description: "Trigger-based scripts that run analytics workflows automatically, so nobody has to start them by hand.",
      tracks: ["Trigger-based scripts", "Manual effort down 79%"],
      tags: ["Automation", "Analytics"],
      color1: "#F3A5BF", color2: "#2D4FD6", pattern: "checks"
    },
    {
      id: "w6", crate: "work", audio: "audio/lofi.mp3",
      title: "Vision Segmentation", headline: "94.56% accuracy", subtitle: "Mahindra & Mahindra, AI intern, Oct to Dec 2023",
      description: "Built and fine-tuned segmentation-based vision models, served them through FastAPI, then made the API much faster.",
      tracks: ["Segmentation models at 94.56% accuracy", "Query and payload optimization", "API latency from 150ms to 48ms"],
      tags: ["Python", "FastAPI", "Computer vision"],
      color1: "#1F8A7A", color2: "#F3A5BF", pattern: "rays"
    },
    {
      id: "r1", crate: "research", audio: "audio/synth.mp3",
      title: "Kinship Visual Verification", headline: "97.4% accuracy", subtitle: "Elsevier, 2025",
      description: "Similarity verification of kinship pairs using metricized emphasis. A novel approach called AMMF, built from CycleGANs and Siamese networks.",
      tracks: ["CycleGANs", "Siamese networks", "Custom facial feature enhancement metrics", "97.4% accuracy"],
      tags: ["Computer vision", "Deep learning"],
      color1: "#E4503A", color2: "#F3A5BF", pattern: "rings"
    },
    {
      id: "r2", crate: "research", audio: "audio/80s.mp3",
      title: "Cancer Visual Detection", headline: "Best Paper", subtitle: "ICCIKE 2023",
      description: "Classification of metastatic lymph node sections with deep learning. FIRN is a new architecture that reaches 93.4% accuracy while using less compute.",
      tracks: ["Focused, customized deep architecture", "93.4% accuracy", "Reduced compute"],
      tags: ["Deep learning", "Medical imaging"],
      color1: "#F2B632", color2: "#2D4FD6", pattern: "rays"
    },
    {
      id: "r3", crate: "research", audio: "audio/sundown_mellow.mp3",
      title: "What Music Do You Like?", headline: "98.57% accuracy", subtitle: "arXiv, 2023",
      description: "Music recommendation on Spotify. A deep architecture that predicts whether a listener will like a track, based on its music attributes.",
      tracks: ["98.57% accuracy in prediction"],
      tags: ["Deep learning", "Recommendation"],
      color1: "#1F8A7A", color2: "#F3A5BF", pattern: "stripes"
    }
  ]
};
