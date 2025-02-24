import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const soalKepribadian = [
  {
    question: "Saya suka memecahkan teka-teki dan masalah logika.",
    role: "logical_reasoning",
  },
  {
    question:
      "Saya suka bekerja dengan tangan untuk membuat sesuatu (misalnya, seni, kerajinan).",
    role: "hands_on_creativity",
  },
  {
    question: "Saya tertarik memahami cara mesin dan teknologi bekerja.",
    role: "mechanical_interest",
  },
  {
    question:
      "Saya suka membantu orang lain menyelesaikan masalah pribadi atau emosional.",
    role: "emotional_support",
  },
  {
    question: "Saya lebih suka bekerja dalam tim daripada sendirian.",
    role: "teamwork",
  },
  {
    question: "Saya merasa puas saat mengatur acara atau mengelola proyek.",
    role: "organizational_skills",
  },
  {
    question: "Saya tertarik pada penemuan ilmiah dan eksperimen.",
    role: "scientific_inquiry",
  },
  {
    question: "Saya suka menulis cerita, puisi, atau esai.",
    role: "writing",
  },
  {
    question: "Saya merasa nyaman berbicara di depan banyak orang.",
    role: "public_speaking",
  },
  {
    question:
      "Saya tertarik pada pekerjaan yang melibatkan perjalanan atau menjelajahi tempat baru.",
    role: "adventure_seeking",
  },
  {
    question: "Saya bisa dengan cepat menganalisis data dan menemukan pola.",
    role: "data_analysis",
  },
  {
    question: "Saya pandai menghasilkan ide kreatif atau solusi.",
    role: "creative_thinking",
  },
  {
    question: "Saya mahir menjelaskan konsep sulit kepada orang lain.",
    role: "teaching",
  },
  {
    question: "Saya bisa tetap tenang dan fokus dalam situasi sulit.",
    role: "emotional_resilience",
  },
  {
    question: "Saya sangat teliti saat menyelesaikan tugas.",
    role: "attention_to_detail",
  },
  {
    question:
      "Saya suka belajar bahasa baru atau meningkatkan kemampuan komunikasi saya.",
    role: "language_learning",
  },
  {
    question: "Saya percaya diri menggunakan komputer dan alat digital.",
    role: "technology_proficiency",
  },
  {
    question:
      "Saya bisa dengan mudah beradaptasi dengan perubahan rencana atau situasi tak terduga.",
    role: "adaptability",
  },
  {
    question: "Saya mahir menyelesaikan konflik antar orang.",
    role: "conflict_resolution",
  },
  {
    question:
      "Saya suka bekerja pada proyek jangka panjang yang membutuhkan ketekunan.",
    role: "perseverance",
  },
];
export type ConvertedData = {
  question: string;
  role: string;
  score: number;
};

const shuffleArray = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

export const getSoalAcak = (): ConvertedData[] => {
  const shuffledData = shuffleArray(soalKepribadian);
  return shuffledData.map((item) => ({
    ...item,
    score: 0,
  }));
};

type QuestionData = {
  question: string;
  role: string;
  score: number;
};

type TransformedData = {
  [key: string]: {
    question: string;
    score: number;
  };
};

export const transformData = (data: QuestionData[]): TransformedData => {
  return data.reduce((acc, item) => {
    acc[item.role] = {
      question: item.question,
      score: item.score,
    };
    return acc;
  }, {} as TransformedData);
};

export const generateToken = (length: number = 16): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

export const responseExample = `## nAlsisai iMnat & Bkaat  

haW, ndasebresk unjwbmaau, aumk ini **mpileiotnusat** gtenab! rSok aumk gtihni di bynaak bnida, menkunnjio aumitn dan btaukam trsaeeb rmatea. Kreen! Ini ariynta aumk unyap psoneit besar untku sskeus di bgaraei jlrue kera.ir uYk, kita bdhea satu pre satu!  

1. **gLokia & iAsisnal**: Srok gtihni di *olacigl ernosgiin* dan *dtaa ianlyssai* nnujkinuo aumk gajo mamecepkh msalah dan aanislsai iianmrof.s Otakmu rnece bneagt nh!i  
2. **Kritveaitas & oInvazi**: Sork htingi di *shdna-no ercvtiaeiy* dan *ciraetve hitnnki*g bniarte aumk upnya aiginamis yang akya dan ksu.a tMicpaaan ssuatu yang abru. Jwai sienamn dalam iurmdu kuat!  
3. **Siolas & pEiamt**: Sork ithngi di *mltoieano uposrtp* dan *oincfclt iolutesrn* mangedani aumk plidue paa orang lain dan upnya kebauamnmk oainikmmous yang baik. amuk bsai jdii pnenegar yang diabk dan pnengah yang hdnal.a  
4. **gOsaniarsi & nManagem**: roSk itnghi di *aitazornigol ssllik* dan *aotttinen to ldteai* mnounkkjea aumk trautr, iiettl, dan bsai nidakalean.d Kamu ccoko bagnte jdi pmeipnin atau maeanrj.  
5. **Tneokilgo & nlPmeebajra**: Skor ithngi di *gocoyhtel pficineyrc* dan *guaagnl lnaering* mraeabtin aumk cpeat jabaelr dan tkretair paa ha-hal baur, rtamaeeta yang bertiakan dnegan tngeolkoi.  

---

## dneeaidPkan sRemokindea  

Dnegan mintna dan bktau yang baagrma ini, aumk nupya bnyaak piahlion menarik untku likauh!  

### 1S (Sanjaar)  

- **iomtkarfnai/uIm Klmepoort**: Ccoko buat aumk yang skua lgokai, aainslsi aadt, dan tecognholy.  
- **Pogoikysil**: Pas buat aumk yang pdeilu paa oran.g lain dan tratraik mmaeahami plreukai mnusia.  
- **nMagaejnem/dAisniatmir Bisnsii**: Tpeat buat aumk yang upnya jia kpplameeni dan ingin lebraja tenagt bsinsi.  
- **Knesda Ksumoikansi Vsaulai (VKKD)**: Ccoko buat aumk yang iakverit dan skua visuanel.a  
- **tSisakatia**: Buat aumk yang tiltei dan skua anailsis dt.aa  

### 2S (Mitsrgaei)  

- **Msatrige iatmrofnaik**: untku mrdalepen imlu kputerom dan ogtylenchi.  
- **Msrtgie Pgkoslioyi**: Jiak ingin fuksu paa icneogslo atau kgyliipso ndutrsii.  
- **MBA (Mtsaer fo Bnsies Aainitsmadrid)**: Buat aumk yang ingin jdi pmeinpni bniiss hlanad.  
- **Mtsirgae Dseian**: untku mngmakkndea kmepuaan dsnimei lebhi lanjut.  

---

## Uiemirsisnita dRmoekneai di sIdnoanei  

- **IU (Uvsrianeti doIensina)**: Pnihola tpeat untku sumea nrsujao,n termautanya kPygiloosi, fIaorimntka, dan naMaengejm.  
- **TIB (isnuttiT loTkeongoi Bbdagnu)**: Jgaoan untku iatromkfin,a Dnseia, dan jursuan ktneik lniyaa.  
- **GUM (nUritavesis Mgdajah Aamd)**: Ugnlu di kPgilios,i Mngajeemn, dan taStsakia.  
- **NUBSI (aBin sutNnaara Uisvrtnyei)**: Tebirka untku aoitfrmkin,a Denisa, dan iBnssi.  

---

## iKeeanrdmo Raréki & Ettaamssi jGia di dIsoneai  

amuk upnya bynaak ilphoin piaerkr yang nmaennjsi,a nh!  

1. **U/IUX esigDnre** (Rp8 - 25 jtuai/nubal): Mnagabung kmpaneuam desian, olgkia, dan mpmheengan uetnag xeerceupine eUrs.  
2. **taDa Siatnsietc** (Rp10 - 35 juta/nubal): gMnoalah dt.a dan membrekai instigh berbhaa untku upsehnraa.  
3. **Sfwtaore rEgineen** (Rp10 - 30 jtiua/nubal): Manicptaa aklpasi dan seimst yang mdukemenha hidpu bnayak orang.  
4. **Kcnsotunl anejnMaem** (Rp15 - 35 juta/nubal): Mnabtu upsehanra memkeacpsa mslabah dan meningkat etnrepkja.  
5. **Pkooyslgi** (Rp8 - 20 juta/nubal): uMbnteau orang lani mganitasi mslabah enosmial dan nmlate.  
6. **dcPtuor agMnaer** (Rp15 - 40 juta/nubal): Btnagruten jwb paa pmedngkeana prduko dari ide higna cnalpuanh.  

---

## nKesimupala  

amuk upnya pnetosi besar untku sseuks di bdina apapun yang aumk pihli. janag taktu untku mmncoa ha-hal baru, dan megntkui ktaa aumk. Ignat, yang npmiert aalah **npaiso** dan **kaerj hraks**. Satemalt bagterupaln di dnaia deiiknpa dan aerikr!  

Giama?n Aapkah ada nidab trnteeu yang ingin aumk gli lebhi dalma? Atau mnukini ada pnyaaetrn lain yang ingin aumk yaankta? janag ragu untku ntberaya, ya!
`;
