export type Lang = "en" | "am";

export interface Translations {
  // Navbar
  nav: {
    home: string;
    project: string;
    research: string;
    team: string;
    impact: string;
    library: string;
    news: string;
    contact: string;
    getInvolved: string;
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
      impact: "Impact",
      library: "Library",
      news: "News",
      contact: "Contact",
      getInvolved: "Get Involved",
    },
    home: {
      tagline: "VLIR-UOS Research Programme",
      heroTitle1: "Circular Coffee",
      heroTitle2: "Economy",
      heroSubtitle:
        "Transforming coffee waste into value for Ethiopian farmers and the environment. A 4-year north–south research programme.",
      heroImpactTitle: "Delivering",
      heroImpactTitleBold: " Circular Impact",
      statPillars: "Research Pillars",
      statCountries: "Partner Countries",
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
      impact: "ተጽዕኖ",
      library: "ቤተ-መጻሕፍት",
      news: "ዜና",
      contact: "አግኙን",
      getInvolved: "ተሳተፉ",
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
