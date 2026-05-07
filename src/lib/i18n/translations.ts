export type Lang = "en" | "am";

export interface Translations {
  // Navbar
  nav: {
    home: string;
    project: string;
    research: string;
    team: string;
    collaborations: string;
    impact: string;
    library: string;
    news: string;
    gallery: string;
    contact: string;
    getInvolved: string;
  };
  project: {
    heroSub: string;
    heroTitle1: string;
    heroTitle2: string;
    heroTitle3: string;
    heroDesc: string;
    vlirSub: string;
    vlirTitle: string;
    vlirP1: string;
    vlirP2: string;
    downloadBrief: string;
    problemTitle: string;
    problemList: string[];
    frameworkSub: string;
    frameworkTitle: string;
    steps: string[];
    objSub: string;
    objTitle: string;
    objList: string[];
    structSub: string;
    structTitle: string;
    wpTitles: string[];
    lead: string;
  };
  team: {
    heroSub: string;
    heroTitle1: string;
    heroTitle2: string;
    heroDesc: string;
    pi: string;
    coSupervise: string;
    phd: string;
    ra: string;
  };
  impact: {
    heroSub: string;
    heroTitle1: string;
    heroTitle2: string;
    heroDesc: string;
    metricsTitle: string;
    voicesSub: string;
    voicesTitle: string;
    fieldSub: string;
    fieldTitle1: string;
    fieldTitle2: string;
    fieldDesc: string;
    m1l: string; m1s: string;
    m2l: string; m2s: string;
    m3l: string; m3s: string;
    m4l: string; m4s: string;
    t1q: string; t1n: string; t1r: string;
    t2q: string; t2n: string; t2r: string;
  };
  library: {
    heroSub: string; heroTitle1: string; heroTitle2: string; heroDesc: string;
    searchPlaceholder: string; download: string; viewDoc: string; prev: string; next: string;
    types: { all: string; journal: string; policy: string; manual: string; poster: string; conference: string; report: string; };
    pillars: { all: string; soil: string; waste: string; socio: string; };
  };
  news: {
    heroSub: string; heroTitle1: string; heroTitle2: string; heroDesc: string;
    all: string; upcoming: string; past: string; readArticle: string; prev: string; next: string;
    cat: { all: string; research: string; event: string; partnership: string; policy: string; news: string; };
    events: { upcoming: string; past: string; };
    newsType: { research: string; partnership: string; policy: string; general: string; };
  };
  research: {
    heroSub: string;
    heroTitle1: string;
    heroTitle2: string;
    heroDesc: string;
    show: string;
    hide: string;
    summary: string;
    relatedPubs: string;
    soilTag: string; wasteTag: string; socioTag: string;
    laymanSoil: string;
    laymanWaste: string;
    laymanSocio: string;
    t1: string; d1: string;
    t2: string; d2: string;
    t3: string; d3: string;
    t4: string; d4: string;
    t5: string; d5: string;
    t6: string; d6: string;
    t7: string; d7: string;
    t8: string; d8: string;
    t9: string; d9: string;
    p1: string; p2: string; p3: string;
  };
  // Home hero
  home: {
    tagline: string;
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    heroImpactTitle: string;
    heroImpactTitleBold: string;
    statPillars: string;
    statCountries: string;
    statYears: string;
    ctaExplore: string;
    ctaResearch: string;
    missionTitle: string;
    missionBody: string;
    pillarsTitle: string;
    pillarsSubtitle: string;
    latestSubtitle: string;
    latestTitle: string;
    allUpdates: string;
    partnersTitle: string;
    partnersSubtitle: string;
    impactSubtitle: string;
    impactTitle: string;
    impactLink: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaLibrary: string;
  };
  // Research pillars
  pillars: {
    soilHealth: string;
    wasteVal: string;
    socioEcon: string;
    learnMore: string;
  };
  gallery: {
    fieldRecord: string;
    caption: string;
    init: string; pill: string; title1: string; title2: string; desc: string;
    records: string; syncPaused: string; syncActive: string; contextDesc: string;
    overviewTitle: string; overviewDesc: string; valTitle: string; valDesc: string;
    dataTitle: string; dataDesc: string; netTitle: string; netDesc: string;
  };
  newsDetail: {
    back: string;
    published: string;
    eventStr: string;
    newsStr: string;
    upcomingStr: string;
    upcomingEvent: string;
    pastEvent: string;
    returnToDir: string;
    unpub: string;
  };
  contact: {
    heroSub: string; heroTitle1: string; heroTitle2: string; heroDesc: string;
    sendMsg: string; sentTitle: string; sentDesc: string; sentSub: string; sendAnother: string;
    formName: string; formEmail: string; formOrg: string; formSubj: string; formMsg: string;
    formNews: string; sending: string; send: string;
    instContacts: string; locs: string;
    nlTitle: string; nlDesc: string; nlSubbed: string; nlExists: string;
    nlEmail: string; nlBtn: string; nlSpam: string;
  };
  // Footer
  footer: {
    tagline: string;
    fundeBy: string;
    developedBy: string;
  };
  // Common
  common: {
    readMore: string;
    viewAll: string;
    submit: string;
    loading: string;
  };
}

export const translations: Record<Lang, Translations> = {
  en: {
    nav: {
      home: "Home",
      project: "The Project",
      research: "Research",
      team: "Team",
      collaborations: "Coordinators",
      impact: "Impact",
      library: "Library",
      news: "News",
      gallery: "Gallery",
      contact: "Contact",
      getInvolved: "Get Involved",
    },
    project: {
      heroSub: "About the Project",
      heroTitle1: "The",
      heroTitle2: "Circular Coffee",
      heroTitle3: "Project",
      heroDesc: "A 4-year north–south cooperative research programme funded by VLIR-UOS, connecting the University of Antwerp and Addis Ababa University to close the coffee value chain loop in Ethiopia.",
      vlirSub: "VLIR-UOS Cooperation",
      vlirTitle: "What is VLIR-UOS?",
      vlirP1: "VLIR-UOS (Flemish Interuniversity Council – University Development Cooperation) supports partnerships between Flemish universities and institutions in the Global South. These \"Institutional University Cooperation\" projects build lasting academic and research capacity.",
      vlirP2: "The Circular Coffee project is part of this framework, bringing together expertise in agronomy, food science, environmental engineering, and development economics.",
      downloadBrief: "Download Project Brief (PDF)",
      problemTitle: "The Problem",
      problemList: [
        "Ethiopia produces ~400,000 tons of coffee waste annually",
        "Coffee husk & pulp pollute rivers and degrade farm soils",
        "Smallholder farmers lose an estimated 30% of potential income",
        "No integrated circular economy model exists at farm level",
        "Limited access to research-backed composting and valorization techniques",
      ],
      frameworkSub: "Framework",
      frameworkTitle: "Circular Economy Model",
      steps: [
        "Coffee Harvest",
        "Processing & Waste Capture",
        "Biochar & Compost",
        "Soil Enrichment → Better Yields"
      ],
      objSub: "SMART Objectives",
      objTitle: "Project Goals",
      objList: [
        "Develop biochar and compost from coffee husk to improve soil fertility in smallholder farms",
        "Valorize coffee pulp and wastewater through biorefinery and treatment technologies",
        "Assess socio-economic impacts on coffee farmers and cooperatives",
        "Build local capacity through PhD training and knowledge transfer",
        "Create actionable policy briefs for national agricultural bodies",
        "Establish gender-inclusive and youth-focused extension programs",
      ],
      structSub: "Structure",
      structTitle: "Work Packages",
      wpTitles: [
        "Project Coordination",
        "Soil Health Research",
        "Waste Valorization",
        "Socio-Economic Assessment",
        "Dissemination & Policy"
      ],
      lead: "Lead:"
    },
    team: {
      heroSub: "The People",
      heroTitle1: "Our",
      heroTitle2: "Research Team",
      heroDesc: "A multidisciplinary team spanning soil science, environmental engineering, economics, and gender studies from Ethiopia and Belgium.",
      pi: "Principal Investigators",
      coSupervise: "Co-Supervisors",
      phd: "PhD Candidates",
      ra: "Research Assistants",
    },
    impact: {
      heroSub: "Real-World Change",
      heroTitle1: "Impact &",
      heroTitle2: "Stakeholders",
      heroDesc: "Measurable outcomes on soil, waste, and livelihoods — and the partners making it possible.",
      metricsTitle: "Impact Metrics",
      voicesSub: "Voices from the Field",
      voicesTitle: "Testimonials",
      fieldSub: "Field Presence",
      fieldTitle1: "Project",
      fieldTitle2: "Locations",
      fieldDesc: "From Ethiopian coffee farms and processing stations to partner universities in Belgium — explore where CARES research happens.",
      m1l: "Farmers Reached", m1s: "Across 3 zones",
      m2l: "Tonnes Composted", m2s: "Coffee husk & pulp",
      m3l: "Ha Under Circular Practice", m3s: "Farm level adoption",
      m4l: "Average Income Increase", m4s: "Net farm income",
      t1q: "Since using the compost from our processing station, my yield has grown. I no longer need to buy expensive chemical fertilizer.",
      t1n: "Birtukan Lemma", t1r: "Coffee Farmer, Kaffa Zone",
      t2q: "The biogas system has changed how we process coffee. We save money on firewood and the smell from the pulp pond is gone.",
      t2n: "Girma Tesfaye", t2r: "Cooperative Manager, Yirgacheffe"
    },
    library: {
      heroSub: "Knowledge Base", heroTitle1: "Resource", heroTitle2: "Library", heroDesc: "Scientific publications, policy briefs, and field manuals produced across the lifetime of the CARES project.",
      searchPlaceholder: "Search publications...", download: "Read / Download", viewDoc: "View Document / Link", prev: "Previous", next: "Next",
      types: { all: "All", journal: "Journal", policy: "Policy Brief", manual: "Manual", poster: "Poster", conference: "Conference", report: "Report" },
      pillars: { all: "All", soil: "Soil Health", waste: "Waste Valorization", socio: "Socio-Economic" }
    },
    news: {
      heroSub: "Stay Updated", heroTitle1: "News &", heroTitle2: "Events", heroDesc: "Project milestones, field stories, upcoming events, and policy updates.",
      all: "All", upcoming: "Upcoming", past: "Past", readArticle: "Read Article", prev: "Previous", next: "Next",
      cat: { all: "All", research: "Research", event: "Event", partnership: "Partnership", policy: "Policy", news: "News" },
      events: { upcoming: "Upcoming Event", past: "Past Event" },
      newsType: { research: "Research Update", partnership: "Partnership", policy: "Policy News", general: "News Update" }
    },
    research: {
      heroSub: "Academic Research",
      heroTitle1: "Research &",
      heroTitle2: "Pillars",
      heroDesc: "Three interconnected research areas forming the scientific backbone of the Circular Coffee project.",
      show: "Show",
      hide: "Hide",
      summary: "plain-language summary",
      relatedPubs: "Related Publications",
      soilTag: "Premium Valorization methods like Anaerobic Fermentation and Artisanal Coffee Wine",
      wasteTag: "Transforming coffee waste into Sustainable Bioenergy and Regenerative Biocompost",
      socioTag: "Developing Botanical Pesticides and High-Value Cosmetics from coffee cherry natural defenses",
      laymanSoil: "Coffee leftovers — husks and pulp — are turned into natural fertilizer and charcoal. Mixed into farm soil, they help retain water and grow better crops. Farmers who use this method report healthier harvests.",
      laymanWaste: "After coffee beans are removed, huge amounts of fruit and water remain. Instead of dumping this into rivers, we use it to make cooking gas and clean the dirty water so it no longer harms fish or crops nearby.",
      laymanSocio: "Small coffee farmers often earn very little because they throw away most of the coffee cherry. We teach them how to sell or use these 'wastes' — which means more money for the family and less pollution in their villages.",
      t1: "Composting Coffee Husk", d1: "Field trials demonstrate that husk compost increases organic matter by up to 28%, reducing dependency on chemical fertilizers.",
      t2: "Biochar Research", d2: "Pyrolysis of coffee waste creates stable biochar that improves water retention and carbon sequestration in degraded soils.",
      t3: "Soil Fertility Trials", d3: "Longitudinal trials in Kaffa and Sidama zones monitor nitrogen, phosphorus, and microbiome changes under compost treatments.",
      t4: "Coffee Pulp Reuse", d4: "Anaerobic digestion of coffee pulp generates biogas for local energy use, with digestate as secondary fertilizer.",
      t5: "Wastewater Treatment", d5: "Constructed wetlands and bio-filters reduce BOD/COD in coffee wastewater to safe discharge standards.",
      t6: "Biorefinery Models", d6: "Integration of multiple valorization streams — cascading pulp → biogas → digestate → compost — maximizes resource efficiency.",
      t7: "Smallholder Income", d7: "Participatory value chain analysis shows circular methods can increase net farm income by 18–26%.",
      t8: "Cooperative Integration", d8: "Working with Yirgacheffe and Kaffa cooperatives to institutionalize circular practices at processing station level.",
      t9: "Gender & Youth Inclusion", d9: "Dedicated gender-sensitive extension programming ensuring women and youth capture benefits from new value streams.",
      p1: "Specialty Coffee", p2: "Agro-Energy & Earth Care", p3: "Bio-Extracted Innovation"
    },
    home: {
      tagline: "A 5 year Belgium-Ethiopia North-South Co-operative",
      heroTitle1: "Beyond the Bean: Empowering",
      heroTitle2: "Communities Through Coffee Innovation",
      heroSubtitle:
        "We turn coffee waste into wealth. Our project empowers local farmers and women's cooperatives in Sidama and Yirgacheffe by creating green energy, bio-pesticides, and premium cosmetics—proving that zero-waste agriculture leads to thriving communities.",
      heroImpactTitle: "Delivering",
      heroImpactTitleBold: " Circular Impact",
      statPillars: "Research Pillars",
      statCountries: "Countries",
      statYears: "Years Impact",
      ctaExplore: "Explore the Project",
      ctaResearch: "View Research",
      missionTitle: "Our Mission",
      missionBody:
        "CARES drives a waste-to-value transformation in Ethiopia's coffee sector — closing the circular loop for smallholder farmers, cooperatives, and the environment.",
      pillarsTitle: "Research Pillars",
      pillarsSubtitle:
        "Three interconnected work areas forming the foundation of the circular coffee economy.",
      latestSubtitle: "CARES Updates",
      latestTitle: "Latest Updates",
      allUpdates: "All updates",
      partnersTitle: "Our Partners",
      partnersSubtitle: "Collaborating institutions driving sustainable change.",
      impactSubtitle: "Measurable Change",
      impactTitle: "Impact at a Glance",
      impactLink: "View full impact report",
      ctaTitle: "Join the Circular Economy",
      ctaSubtitle: "Whether you're a researcher, farmer, policy maker, or development professional — there's a role for you in this story.",
      ctaLibrary: "Publications",
    },
    pillars: {
      soilHealth: "Soil Health",
      wasteVal: "Waste Valorization",
      socioEcon: "Socio-Economic Impact",
      learnMore: "Learn More",
    },
    gallery: {
      fieldRecord: "Field Record:",
      caption: "Captured field telemetry representing elements of the circular coffee supply chain framework.",
      init: "INITIALIZING ARCHIVE...",
      pill: "Field Archive",
      title1: "CARES",
      title2: "Gallery",
      desc: "Visual documentation of field research, telemetry captures, and circular economy implementation across the Ethiopian coffee supply chain architecture.",
      records: "RECORDS",
      syncPaused: "SYNC PAUSED",
      syncActive: "AUTO-SYNC ACTIVE",
      contextDesc: "Explore the field records capturing crucial elements of the resilient circular supply chain matrix.",
      overviewTitle: "Archive Context Overview",
      overviewDesc: "Key strategic pillars from our field telemetry operations in the Ethiopian landscape.",
      valTitle: "Valorization Scope",
      valDesc: "Transforming biological waste metrics actively analyzed in our latest research batch. Quantifying pulp conversions directly from raw farm origins.",
      dataTitle: "Dataset Coverage",
      dataDesc: "direct architectural telemetry captures forming our predictive circular grid model spanning 4 primary districts.",
      netTitle: "Network Synergy",
      netDesc: "Connecting localized agricultural outputs to high-value bio-conversion pipelines utilizing real-time sensor evaluations."
    },
    newsDetail: {
      back: "Back to News & Events",
      published: "Published",
      eventStr: "Event",
      newsStr: "News",
      upcomingStr: "Upcoming",
      upcomingEvent: "Upcoming Event",
      pastEvent: "Past Event",
      returnToDir: "Return to Directory",
      unpub: "Detailed content for this record has not yet been published."
    },
    contact: {
      heroSub: "Get In Touch", heroTitle1: "Contact", heroTitle2: "Us", heroDesc: "Whether you're a researcher, farmer, funder, or curious mind — we'd love to hear from you.",
      sendMsg: "Send a Message", sentTitle: "Message Sent!", sentDesc: "Thank you for reaching out. We'll be in touch within 3 working days.", sentSub: "✓ You've been subscribed to our quarterly newsletter.", sendAnother: "Send another message",
      formName: "Full Name", formEmail: "Email Address", formOrg: "Organisation (optional)", formSubj: "Subject", formMsg: "Message",
      formNews: "Subscribe me to the CARES quarterly newsletter — research updates, field stories & events.", sending: "Sending...", send: "Send Message",
      instContacts: "Institutional Contacts", locs: "Locations",
      nlTitle: "Newsletter Signup", nlDesc: "Get quarterly research updates, field stories, and event announcements direct to your inbox.", nlSubbed: "Subscribed! Check your inbox for a welcome email.", nlExists: "You're already subscribed — thanks for your support!",
      nlEmail: "your@email.com", nlBtn: "Subscribe", nlSpam: "No spam, ever. Unsubscribe at any time."
    },
    footer: {
      tagline:
        "Circular economy based biorefinery concepts for the Agricultural value chain and Resilient Enhancement of Smallholder livelihoods.",
      fundeBy: "Funded by the Belgian Development Cooperation",
      developedBy: "Developed by",
    },
    common: {
      readMore: "Read More",
      viewAll: "View All",
      submit: "Submit",
      loading: "Loading…",
    },
  },

  am: {
    nav: {
      home: "መነሻ",
      project: "ፕሮጀክቱ",
      research: "ምርምር",
      team: "ቡድን",
      collaborations: "አስተባባሪዎች",
      impact: "ተጽዕኖ",
      library: "ቤተ-መጻሕፍት",
      news: "ዜና",
      gallery: "ማዕከለ-ስዕላት",
      contact: "አግኙን",
      getInvolved: "ተሳተፉ",
    },
    project: {
      heroSub: "ስለ ፕሮጀክቱ",
      heroTitle1: "የ",
      heroTitle2: "ቡና ክብ",
      heroTitle3: "ፕሮጀክት",
      heroDesc: "በVLIR-UOS የገንዘብ ድጋፍ የሚንቀሳቀስ የ4-ዓመት የሰሜን-ደቡብ የትብብር ምርምር ፕሮግራም፣ በአንትወርፕ ዩኒቨርሲቲ እና በአዲስ አበባ ዩኒቨርሲቲ መካከል የተቋቋመ የቡና እሴት ሰንሰለትን በኢትዮጵያ ለማስፋት ያለመ።",
      vlirSub: "የVLIR-UOS ትብብር",
      vlirTitle: "VLIR-UOS ምንድን ነው?",
      vlirP1: "VLIR-UOS በፍላንደርዝ ዩኒቨርሲቲዎች እና በዓለም አቀፉ ደቡብ ተቋማት መካከል ያለውን ትብብር ይደግፋል። እነዚህ ፕሮጀክቶች ዘላቂ የትምህርት እና የምርምር አቅምን ይገነባሉ።",
      vlirP2: "የቡና ክብ ፕሮጀክት የዚህ ማዕቀፍ አካል ሲሆን በግብርና፣ በምግብ ሳይንስ፣ በአካባቢ ምህንድስና እና በልማት ኢኮኖሚክስ ያለውን እውቀት ያሰባስባል።",
      downloadBrief: "የፕሮጀክቱን ማጠቃለያ ያውርዱ (PDF)",
      problemTitle: "ችግሩ",
      problemList: [
        "ኢትዮጵያ በየዓመቱ ወደ 400,000 ቶን የቡና ቆሻሻ ታመርታለች",
        "የቡና ልጣጭ እና ቆሻሻ ወንዞችን ይበክላል እንዲሁም የአፈር ለምነትን ይቀንሳል",
        "አነስተኛ ይዞታ ያላቸው አርሶ አደሮች ከ20 እስከ 30 በመቶ የሚገመት ገቢ ያጣሉ",
        "በእርሻ ደረጃ የተቀናጀ የክብ ኢኮኖሚ ሞዴል የለም",
        "በምርምር የተደገፈ የማዳበሪያ እና የዋጋ ጭማሪ ዘዴዎች አቅርቦት እጥረት",
      ],
      frameworkSub: "የአሰራር ማዕቀፍ",
      frameworkTitle: "የክብ ኢኮኖሚ ሞዴል",
      steps: [
        "የቡና ምርት",
        "ማቀነባበር እና ቆሻሻ አሰባሰብ",
        "ባዮቻር እና ማዳበሪያ",
        "የአፈር ማበልጸጊያ → የተሻለ ምርት"
      ],
      objSub: "ስማርት ዓላማዎች",
      objTitle: "የፕሮጀክት ግቦች",
      objList: [
        "በአነስተኛ ይዞታ በሚገኙ ማሳዎች ላይ የአፈር ለምነትን ለማሻሻል ከቡና ልጣጭ ባዮቻር እና ማዳበሪያ ማምረት",
        "በባዮሪፋይነሪ እና በማቀነባበር ቴክኖሎጂዎች የቡና ቆሻሻን እና ፈሳሽ ቆሻሻን ወደ እሴት መቀየር",
        "በቡና አርሶ አደሮች እና ማህበራት ላይ ያለውን ማህበራዊና ኢኮኖሚያዊ ተፅእኖ መገምገም",
        "በፒኤችዲ ስልጠና እና በእውቀት ሽግግር አካባቢያዊ አቅምን መገንባት",
        "ለሀገር አቀፍ የግብርና ተቋማት የሚረዱ የፖሊሲ ማጠቃለያዎችን ማዘጋጀት",
        "የፆታ እኩልነትን ያካተተ እና ወጣቶችን ያማከለ የኤክስቴንሽን ፕሮግራሞችን ማቋቋም",
      ],
      structSub: "መዋቅር",
      structTitle: "የስራ ፓኬጆች",
      wpTitles: [
        "የፕሮጀክት ማስተባበር",
        "የአፈር ጤና ምርምር",
        "ቆሻሻን ማስተዳደር",
        "ማህበራዊና ኢኮኖሚያዊ ግምገማ",
        "ስርጭት እና ፖሊሲ"
      ],
      lead: "አስተባባሪ:"
    },
    team: {
      heroSub: "ሰዎቹ",
      heroTitle1: "የእኛ",
      heroTitle2: "የምርምር ቡድን",
      heroDesc: "ከኢትዮጵያ እና ከቤልጂየም በግብርና አፈር ሳይንስ፣ አካባቢ ምህንድስና፣ ኢኮኖሚክስ እና የፆታ ጥናት የተውጣጣ ሁለገብ ቡድን።",
      pi: "ዋና ተመራማሪዎች",
      coSupervise: "ተባባሪ ተቆጣጣሪዎች",
      phd: "የፒኤችዲ ተማሪዎች",
      ra: "የምርምር ረዳቶች",
    },
    impact: {
      heroSub: "እውነተኛ ለውጥ",
      heroTitle1: "ተጽዕኖ እና",
      heroTitle2: "ባለድርሻ አካላት",
      heroDesc: "በአፈር፣ በቆሻሻ እና ከኑሮ ላይ የሚታዩ ተጨባጭ ውጤቶች — እንዲሁም ይህን እውን ያደረጉ አጋሮች።",
      metricsTitle: "የተጽዕኖ መለኪያዎች",
      voicesSub: "ከመስክ የተሰሙ ድምጾች",
      voicesTitle: "ምስክርነቶች",
      fieldSub: "የመስክ ላይ ተሳትፎ",
      fieldTitle1: "የፕሮጀክት",
      fieldTitle2: "ስፍራዎች",
      fieldDesc: "ከኢትዮጵያ የቡና ማሳዎች እና ማቀነባበሪያ ጣቢያዎች እስከ አጋር ዩኒቨርሲቲዎች በቤልጂየም — የCARES ምርምር የት እንደሚካሄድ ያስሱ።",
      m1l: "ተጠቃሚ አርሶ አደሮች", m1s: "በ3 ዞኖች",
      m2l: "የተብላላ ማዳበሪያ (በቶን)", m2s: "የቡና ልጣጭ እና ቆሻሻ",
      m3l: "በክብ አሰራር ስር ያሉ ሄክታሮች", m3s: "በእርሻ ደረጃ መተግበር",
      m4l: "አማካይ የገቢ ጭማሪ", m4s: "የተጣራ የእርሻ ገቢ",
      t1q: "ከማቀነባበሪያ ጣቢያችን የተዘጋጀውን ማዳበሪያ መጠቀም ከጀመርኩ ወዲህ ምርቴ ጨምሯል። ውድ የኬሚካል ማዳበሪያ መግዛት አያስፈልገኝም።",
      t1n: "ብርቱካን ለማ", t1r: "የቡና አርሶ አደር፣ ካፋ ዞን",
      t2q: "የባዮጋዝ ሲስተሙ ቡናን የምናቀነባብርበትን መንገድ ቀይሮታል። ለማገዶ የምናወጣውን የወጪ ገንዘብ እናድናለን፣ በተጨማሪም ከቆሻሻ ማጠራቀሚያው ይወጣ የነበረው መጥፎ ጠረን ጠፍቷል።",
      t2n: "ግርማ ተስፋዬ", t2r: "የህብረት ስራ ማህበር ስራ አስኪያጅ፣ ይርጋጨፌ"
    },
    library: {
      heroSub: "የእውቀት ማዕከል", heroTitle1: "የምንጭ", heroTitle2: "ቤተ-መጽሐፍት", heroDesc: "በCARES ፕሮጀክት የቆይታ ጊዜ ውስጥ የተዘጋጁ ሳይንሳዊ ህትመቶች፣ የፖሊሲ አጭር መግለጫዎች እና የመስክ መመሪያዎች።",
      searchPlaceholder: "ህትመቶችን ይፈልጉ...", download: "ያንብቡ / ያውርዱ", viewDoc: "ሰነድ / ሊንክ ይመልከቱ", prev: "የቀድሞ", next: "ቀጣይ",
      types: { all: "ሁሉም", journal: "አካዳሚያዊ መጽሔት", policy: "የፖሊሲ ማጠቃለያ", manual: "መመሪያ", poster: "ፖስተር", conference: "ስብሰባ", report: "ሪፖርት" },
      pillars: { all: "ሁሉም", soil: "የአፈር ጤና", waste: "ቆሻሻን ማስተዳደር", socio: "ማህበራዊ-ኢኮኖሚያዊ" }
    },
    news: {
      heroSub: "አዳዲስ መረጃ", heroTitle1: "ዜና እና", heroTitle2: "ክስተቶች", heroDesc: "የፕሮጀክት ክንውኖች፣ የሚካሄዱ ዝግጅቶች እና የፖሊሲ መረጃዎች።",
      all: "ሁሉም", upcoming: "በቅርቡ የሚመጡ", past: "ያለፉ የክስተት መረጃዎች", readArticle: "ጽሑፉን ያንብቡ", prev: "የቀድሞ", next: "ቀጣይ",
      cat: { all: "ሁሉም", research: "ምርምር", event: "ክስተት", partnership: "አጋርነት", policy: "ፖሊሲ", news: "ዜና" },
      events: { upcoming: "ቀጣይ ክስተት", past: "ያለፈ ክስተት" },
      newsType: { research: "የምርምር መረጃ", partnership: "አጋርነት", policy: "የፖሊሲ ዜና", general: "የዜና መረጃ" }
    },
    research: {
      heroSub: "አካዳሚያዊ ምርምር",
      heroTitle1: "ምርምር እና",
      heroTitle2: "ምሰሶዎች",
      heroDesc: "የቡና ሰንሰለት ፕሮጀክት የሳይንሳዊ መሰረት የሆኑ ሦስት የተሳሰሩ የምርምር ዘርፎች።",
      show: "አሳይ",
      hide: "ደብቅ",
      summary: "ቀላል የማብራሪያ ማጠቃለያ",
      relatedPubs: "ተዛማጅ ህትመቶች",
      soilTag: "የቡና ቆሻሻን ወደ እሴት በመቀየር የኢትዮጵያን የእርሻ መሬት ማዳን",
      wasteTag: "የሂደት ተረፈ-ምርቶችን ወደ ከፍተኛ ዋጋ ሀብቶች በመቀየር",
      socioTag: "በክብ ለውጥ ማዕከል ውስጥ ህዝብን ማስቀደሚያ",
      laymanSoil: "የቡና ተረፈ ምርቶች — ማለትም ልጣጭ እና ቆሻሻ — ወደ ተፈጥሯዊ ማዳበሪያ እና የድንጋይ ከሰል ይቀየራሉ። ከእርሻ አፈር ጋር ሲቀላቀሉ አፈሩ ውሃ እንዲይዝ እና የተሻለ ምርት እንዲሰጥ ይረዳሉ። ይህንን ዘዴ የሚጠቀሙ አርሶ አደሮች ጤናማ ምርት እንደሚያገኙ ይናገራሉ።",
      laymanWaste: "የቡና ፍሬ ከተለየ በኋላ ከፍተኛ መጠን ያለው የቡና ፍሬ እና ውሃ ይቀራል። ይህንን ወደ ወንዞች ከመጣል ይልቅ ለማብሰያ ጋዝ ለማምረት እና ቆሻሻ ውሃውን ለማጽዳት እንጠቀምበታለን። ይህ በአቅራቢያ የሚገኙ ዓሦች ወይም ሰብሎች ላይ ጉዳት እንዳያስከትልና ደህንነቱ የተጠበቀ እንዲሆን ይረዳል።",
      laymanSocio: "አነስተኛ የቡና አርሶ አደሮች አብዛኛውን ጊዜ የቡናውን ተረፈ ምርት ስለሚጥሉ አነስተኛ ገቢ ያገኛሉ። እኛ እነዚህን 'ቆሻሻዎች' እንዴት መሸጥ ወይም መጠቀም እንደሚችሉ እናስተምራቸዋለን — ይህም ማለት ለቤተሰቡ ተጨማሪ ገንዘብ ማስገኘት እና በመንደሮቻቸው ውስጥ የሚፈጠረውን ብክለት መቀነስ ነው።",
      t1: "የቡና ልጣጭ ማዳበሪያ", d1: "የመስክ ሙከራዎች እንደሚያሳዩት የልጣጭ ኮምፖስት የአፈርን ኦርጋኒክ ይዘት እስከ 28% በመጨመር በኬሚካል ማዳበሪያ ላይ ያለውን ጥገኝነት ይቀንሳል።",
      t2: "ማገዶ ምርምር (ባዮቻር)", d2: "የቡና ቆሻሻን በማቃጠል የሚገኘው ባዮቻር ውሃ የመያዝ አቅምን ያሻሽላል እና በተጎዳ አፈር ውስጥ የካርቦን ክምችት ያሳድጋል።",
      t3: "የአፈር ለምነት ሙከራዎች", d3: "በካፋ እና ሲዳማ ዞኖች የሚደረጉ የረጅም ጊዜ ሙከራዎች በማዳበሪያ ሕክምና ስር የሚታዩ የናይትሮጅን፣ የፎስፈረስ እና የማይክሮባላዊ ለውጦችን ይከታተላሉ።",
      t4: "የቡና ቆሻሻ ድጋሚ አጠቃቀም", d4: "የቡና ቡቃያ አናሮቢክ መፈጨት ለአካባቢያዊ የኃይል አጠቃቀም ባዮጋዝ ያመነጫል፣ ከዚህ ውስጥ ደግሞ ሁለተኛ ደረጃ ማዳበሪያ ይገኛል።",
      t5: "የፍሳሽ ውሃ አያያዝ", d5: "ውስብስብ ረግረጋማ እና ባዮ-ማጣሪያ በተለቀቀ የቡና ፍሳሽ ውስጥ ያለውን አደገኛ ንጥረ ነገሮች ደህንነቱ ወደተጠበቀ ደረጃ ይቀንሳሉ።",
      t6: "ባዮሪፋይነሪ ሞዴሎች", d6: "የተለያዩ የእሴት መጨመሪያ መንገዶችን ማቀናጀት - ቡቃያ ወደ ባዮጋዝ ወደ ኮምፖስት ማሸጋገር - የንብረት ብቃትን ያሳድጋል።",
      t7: "የአነስተኛ ገበሬ ገቢ", d7: "የትብብር እሴት ሰንሰለት ግምገማ እንደሚያሳየው የክብ ለውጥ ዘዴዎች የተጣራ የእርሻ ገቢን ከ 18 እስከ 26% ሊጨምሩ ይችላሉ።",
      t8: "የህብረት ስራ ማህበር ውህደት", d8: "ከይርጋጨፌ እና ከካፋ ማህበራት ጋር የክብ ልምዶችን በማቀነባበር በጣቢያ ደረጃ ተግባራዊ ለማድረግ መሥራት።",
      t9: "የፆታ እና ወጣቶች ተሳትፎ", d9: "ሴቶች እና ወጣቶች ከአዲስ የእሴት ቅርንጫፎች ተጠቃሚ መሆናቸውን የሚያረጋግጥ ለፆታ ስሜታዊ የሆኑ የኤክስቴንሽን ፕሮግራሞችን መተግበር።",
      p1: "ምሰሶ 1", p2: "ምሰሶ 2", p3: "ምሰሶ 3"
    },
    home: {
      tagline: "VLIR-UOS የምርምር ፕሮግራም",
      heroTitle1: "የቡና ክብ",
      heroTitle2: "ኢኮኖሚ",
      heroSubtitle:
        "የቡና ቆሻሻን ለኢትዮጵያ ገበሬዎችና ለአካባቢ ጠቃሚ ምርት ማድረግ። የ4 ዓመት ሰሜን–ደቡብ የምርምር ፕሮግራም።",
      heroImpactTitle: "የክብ",
      heroImpactTitleBold: " ተጽዕኖ ማድረስ",
      statPillars: "የምርምር ምሰሶዎች",
      statCountries: "አጋር ሀገራት",
      statYears: "ዓመታት ተጽዕኖ",
      ctaExplore: "ፕሮጀክቱን ያስሱ",
      ctaResearch: "ምርምር ይመልከቱ",
      missionTitle: "ተልዕኮአችን",
      missionBody:
        "CARES በኢትዮጵያ የቡና ዘርፍ ውስጥ ቆሻሻን ወደ ዋጋ የሚቀይር ለውጥ ያመጣል — ለአቃቢ ገበሬዎች፣ ህብረት ሥራ ማህበሮች እና አካባቢ ክብ ቀበቶ ይዘጋል።",
      pillarsTitle: "የምርምር ምሰሶዎች",
      pillarsSubtitle:
        "የቡናን ክብ ኢኮኖሚ መሰረት የሚፈጥሩ ሦስት እርስ በርስ የተሳሰሩ የሥራ ዘርፎች።",
      latestSubtitle: "የኬርስ (CARES) ዜናዎች",
      latestTitle: "የቅርብ ጊዜ ዜናዎች",
      allUpdates: "ሁሉንም ዜናዎች",
      partnersTitle: "አጋሮቻችን",
      partnersSubtitle: "ዘላቂ ለውጥ የሚያስቀድሙ ተቋማት።",
      impactSubtitle: "የሚታይ ለውጥ",
      impactTitle: "ተጽዕኖ በጨረፍታ",
      impactLink: "ሙሉ የተጽዕኖ ሪፖርት ይመልከቱ",
      ctaTitle: "የክብ ኢኮኖሚውን ይቀላቀሉ",
      ctaSubtitle: "ተመራማሪ፣ ገበሬ፣ የፖሊሲ አውጪ ወይም የልማት ባለሙያ ቢሆኑም — በዚህ ታሪክ ውስጥ ለእርስዎ የሚሆን ሚና አለ።",
      ctaLibrary: "ህትመቶች",
    },
    pillars: {
      soilHealth: "የአፈር ጤና",
      wasteVal: "ቆሻሻ ማስተዳደር",
      socioEcon: "ማህበረ-ኢኮኖሚያዊ ተጽዕኖ",
      learnMore: "የበለጠ ይወቁ",
    },
    gallery: {
      fieldRecord: "የመስክ መረጃ፡",
      caption: "የክብ የቡና አቅርቦት ሰንሰለት ማዕቀፍን የሚወክሉ የመስክ ላይ መረጃ ገጽታዎች።",
      init: "ማህደር በማዘጋጀት ላይ...",
      pill: "የመስክ ማህደር",
      title1: "CARES",
      title2: "የምስል ማዕከለ-ስዕላት",
      desc: "በኢትዮጵያ የቡና አቅርቦት ሰንሰለት ላይ የሚደረጉ የምርምር መረጃዎች፣ የክብ ኢኮኖሚ ትግበራዎች እና የመስክ ዳሰሳዎች ምስላዊ ማህደር።",
      records: "መረጃዎች",
      syncPaused: "ማመሳሰል ቆሟል",
      syncActive: "በራስ-ሰር ማመሳሰል እየሰራ ነው",
      contextDesc: "የክብ አቅርቦት ሰንሰለትን ወሳኝ አካላት የሚይዙትን የመስክ መረጃዎች ይወቁ።",
      overviewTitle: "የማህደሩ አጠቃላይ አውድ",
      overviewDesc: "በኢትዮጵያ በተደረገው የመስክ ጥናት መሰረታዊ ስትራቴጂካዊ ምሰሶዎች።",
      valTitle: "እሴት የመጨመር ሂደት",
      valDesc: "ባዮሎጂካዊ ቆሻሻዎችን ወደ ጠቃሚ ሀብት መቀየር ላይ የሚሰሩ አዳዲስ የምርምር አዝማሚያዎች።",
      dataTitle: "የመረጃ ሽፋን",
      dataDesc: "በ4 ዋና ዋና ወረዳዎች የተሰበሰቡ ቀጥተኛ የመስክ መረጃዎች።",
      netTitle: "የአውታረ መረብ ግንኙነት",
      netDesc: "አካባቢያዊ የግብርና ምርቶችን ከከፍተኛ እሴት የባዮ-ኮንቨርዥን መስመሮች ጋር በማገናኘት።"
    },
    newsDetail: {
      back: "ወደ ዜና እና ክስተቶች ተመለስ",
      published: "ታተመ",
      eventStr: "ክስተት",
      newsStr: "ዜና",
      upcomingStr: "በቅርቡ የሚመጣ",
      upcomingEvent: "ቀጣይ ክስተት",
      pastEvent: "ያለፈ ክስተት",
      returnToDir: "ወደ ማውጫው ተመለስ",
      unpub: "ለዚህ ዘገባ ዝርዝር መረጃ እስካሁን አልታተመም።"
    },
    contact: {
      heroSub: "ያግኙን", heroTitle1: "አድራሻ", heroTitle2: "እና ግንኙነት", heroDesc: "ተመራማሪ፣ አርሶ አደር፣ የገንዘብ ደጋፊ ወይም ለማወቅ የፈለጉ ግለሰብ ቢሆኑም — ከእርስዎ መስማት እንፈልጋለን።",
      sendMsg: "መልእክት ይላኩ", sentTitle: "መልእክቱ ተልኳል!", sentDesc: "ስለተገናኙን እናመሰግናለን። በ3 የስራ ቀናት ውስጥ ምላሽ እንሰጣለን።", sentSub: "✓ የሩብ ዓመት ዜና መጽሔታችን ተመዝጋቢ ሆነዋል።", sendAnother: "ሌላ መልእክት ይላኩ",
      formName: "ሙሉ ስም", formEmail: "የኢሜይል አድራሻ", formOrg: "ድርጅት (አማራጭ)", formSubj: "ጉዳዩ", formMsg: "መልእክት",
      formNews: "በCARES የሩብ ዓመት ዜና መጽሔት ላይ ይመዝገቡ — የምርምር መረጃዎች፣ የመስክ ታሪኮች እና ክስተቶች።", sending: "በመላክ ላይ...", send: "መልእክት ይላኩ",
      instContacts: "ተቋማዊ ግንኙነቶች", locs: "ቦታዎች",
      nlTitle: "የዜና መጽሔት ምዝገባ", nlDesc: "የሩብ ዓመት የምርምር መረጃዎችን፣ የመስክ ታሪኮችን እና የክስተት ማስታወቂያዎችን በቀጥታ በኢሜልዎ ያግኙ።", nlSubbed: "ተመዝግበዋል! የእንኳን ደህና መጡ ኢሜይል ገቢ መልዕክት ሳጥንዎን ይፈትሹ።", nlExists: "በዜና መጽሔታችን አስቀድመው ተመዝግበዋል — ስለ  ድጋፍዎ እናመሰግናለን!",
      nlEmail: "የእርስዎ@ኢሜይል.com", nlBtn: "ይመዝገቡ", nlSpam: "ምንም የማያስፈልግ መልዕክት አይላክም። በማንኛውም ጊዜ መሰረዝ ይችላሉ።"
    },
    footer: {
      tagline:
        "ለቡና አምራቾች እና ለትናንሽ ደን ሥርዓቶች ዘላቂ ሕይወት የሚሰጥ ክብ ኢኮኖሚ ላይ የተመሠረተ ባዮሪፋይነሪ ጽንሰ-ሀሳቦች።",
      fundeBy: "በቤልጂየም ልማት ትብብር የሚደገፍ",
      developedBy: "የተሠራው",
    },
    common: {
      readMore: "ተጨማሪ ያንብቡ",
      viewAll: "ሁሉንም ይመልከቱ",
      submit: "ላክ",
      loading: "እየጫነ ነው…",
    },
  },
};
