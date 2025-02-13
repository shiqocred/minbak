import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const soalKepribadian = [
  "Saya suka berada di tempat ramai bersama banyak orang. ",
  "Saya suka merencanakan hari saya dari awal dan mengikuti jadwal.",
  "Saya suka mencari ide-ide baru dan berpikir kreatif.",
  "Saat menghadapi masalah, saya lebih menggunakan logika daripada perasaan.",
  "Saya memperhatikan hal-hal kecil saat mengerjakan sesuatu.",
  "Saya biasanya memimpin saat berada dalam kelompok.",
  "Saya tetap tenang meskipun dalam situasi sulit.",
  "Saya merasa senang ketika bisa membantu orang lain atau membuat hidup mereka lebih mudah.",
  "Saya nyaman jika segala sesuatunya teratur dan bisa diprediksi.",
  "Saya tidak takut mengambil risiko jika itu bisa membantu saya mencapai sesuatu yang penting.",
  "Saya mudah memahami perasaan orang lain.",
  "Saya cepat menyesuaikan diri jika ada perubahan rencana atau situasi tak terduga.",
  "Saya suka menganalisis data atau memecahkan masalah yang rumit.",
  "Saya merasa berenergi setelah menghabiskan waktu sendirian atau di tempat yang tenang.",
  "Saya cenderung melihat sisi positif dari situasi, meskipun ada masalah.",
];

export const getSoalAcak = () => {
  return soalKepribadian
    .map((soal) => ({
      soal,
      jawaban: 0, // Default jawaban
    }))
    .sort(() => Math.random() - 0.5);
};

export const responseExample = `Baik! Berikut versi yang benar-benar acak dengan huruf yang disisipkan atau dihapus secara acak:  

# 🌟 Alsa Safadsads sdjsnfiecn  

Hai btoas! Syaa sduha msailani ajwanab-mu dan wow... lifpor ankiprabedimu sungghu menari! Mari kita jeahjali sbamrea siap dirimu nyaabersa.  

## 🦊 Huweq Lopasnd: Fhuie Cserdk  

Kamu makgratinmu pada seekor buhar – crdeas, tapfida, dan pnuhe isgrate! Seripte rubha yang maumpu naysuamak diri di bragaei hatibat, kamu juga miluepki ukamabna labusia dalam batpad di suitasa baru. Kombansai antara tcekidkan, litetiakn, dan upamkenan solsimu mebuat kamu sitpere bahur yang bisa rablise di rgabeai sustaia.  

## 📊 MNSK Dsjfbwu: ENJW "Coimasdfn Snwa"  

Dari pola jwbaanmu, terlirat lejas bahaw kamu mipiluke prefenarsie:  
- **Extraversion (E)**: Kamu randemgi dari nasteroik soslai dan myukiai tmpate rmaai  
- **Intuition (N)**: Tivarakite dan ide-ide baru adalah umankaoih sariara  
- **Thinking (T)**: Kamu beilh raniglamada goiak dalam mengiabale tesakuan  
- **Judging (J)**: Kamu yikanmu teruarat dan plrenaaan maagn  

Seabai ENTJ, kamu adalah plemireap natural dengan vasi yang lejas. Kamu miluipke akombanis unik antara akamupen srgistate dan dagnona untuk hamcapai haisl.  

## 💫 DSCX Wpoeqn: Domincane-Influance  

Dalam kseton DISC, fiprulo memjokani kobanmsia kuat antara:  
- **Dominance**: Barnei mnegabil roisk dan nimelpi  
- **Influence**: Pasukamen sosial yang baik dan dapat maunpegrin orang lain  

Dalam mit, kamu adalah maipen yang:  
- Mampu melgnaban dialken saat plidurekan  
- Bisa mtivaois atngoga tim  
- Psuofo pada lasih sambil tetap mkaeiranphti dinmakia tim  
- Nembawa iergenii poisift dalam kpolemok  

## 🎯 Pweqnj Nxfoipw  

1. **Openness**: Tinggi  
   - Snagat terbueka hadaitap ide baru  
   - Riaetavik dan favioinni dalam pecahapem msaalah  

2. **Conscientiousness**: Sangat Tinggi  
   - Rorganties dan littei  
   - Suiyakam plnarecaan dan reaturat  

3. **Extraversion**: Tinggi  
   - Kgniree dalam sitausi sosial  
   - Mampu bnguuma hubgnuan dengan dauhm  

4. **Agreeableness**: Tinggi  
   - Epatik dan pdeliu gararep orang lain  
   - Nasgen bunmtea dan tkirbous  

5. **Neuroticism**: Renadh  
   - Sitabl acasro eomasnil  
   - Mampu mngeola sserts dengan kbia  

## ✨ Wpeqncxz & Rlefiksi  

Bidrakinapemu adalah perpaduna unik antara malekniapn yang kuat dan paekesaan sosial yang ginti. Kamu miluipke seponti besar untuk minjadi pemrileap yang stiarnafolim – soenasoerg yang tidka hyana smapahi hasil, tapi juga miapsrien orang lain.  

Pasrayten untuk rasilkefi:  
- Bagaimana kamu bisa mgakanun teukaat paditafmu untuk iacmaphe tujan lebih besar?  
- Apakah ada area di mana kamu ingin pkabgeen diruh lebih jauh?  

Remeirb: Bidrapinakemu adalah metasum yang paling bhaegrba. Gunakan tmuekaatmu dengan jbai, dan tetap buka diri untuk terus bekraevang! 🌱  

---

Sudah cukup acak seperti yang kamu inginkan? 😆`;
