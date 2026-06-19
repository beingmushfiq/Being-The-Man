export interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const BOOK_DATA = {
  title: "The Silent Language of Style",
  tagline: "FIT • COLOR • PRESENCE",
  regularPriceBdt: 1000,
  launchPriceBdt: 490,
  regularPriceUsd: 19.99,
  launchPriceUsd: 9.99,
  isLaunchOffer: true,
};

export const REVIEWS: Review[] = [
  { name: 'আরিফ রহমান', role: 'Corporate Executive', text: 'বইটি পড়ার পর আমার ফিটিং এবং কালার কম্বিনেশন নিয়ে ধারণা পুরোপুরি বদলে গেছে। এখন কর্পোরেট মিটিংয়ে অনেক বেশি আত্মবিশ্বাসী লাগে।', rating: 5 },
  { name: 'ইশতিয়াক আহমেদ', role: 'Software Engineer', text: 'কম জামাকাপড় কিনেও যে এত ক্লাসি লুক তৈরি করা যায়, এটা আগে জানতাম না। ক্যাপসুল ওয়ার্ডরোব গাইডটা আমার অনেক টাকা বাঁচিয়েছে!', rating: 5 },
  { name: 'তাহমিদ চৌধুরী', role: 'Business Owner', text: 'মানুষের সামনে কথা বলার সময় বডি ল্যাঙ্গুয়েজ আর পোশাকে যে একটা কর্তৃত্ব বা অথোরিটি আনা যায়, সেটা এই বইয়ের মাধ্যমে শিখেছি। রিকমেন্ডেড!', rating: 5 }
];

export const FAQ_ITEMS: FaqItem[] = [
  { q: 'এই বই কি beginners-এর জন্য?', a: 'হ্যাঁ। আপনি style সম্পর্কে কিছু না জানলেও এই বই থেকে অত্যন্ত সহজ ভাষায় এবং ছবির মাধ্যমে clear understanding পাবেন।' },
  { q: 'এটা কি prejudices বা শুধু formal dressing-এর জন্য?', a: 'না। এতে এমন স্টাইল প্রিন্সিপাল আছে যেগুলো আপনি আপনার ক্যাজুয়াল শার্ট, টিশার্ট, ফর্মাল সুট, পাঞ্জাবি সহ সব জায়গায় অ্যাপ্লাই করতে পারবেন।' },
  { q: 'আমি যদি already কিছু style জানি, তবুও কি useful হবে?', a: 'হ্যাঁ। কারণ এই বই শুধু জামাকাপড় পরা শেখায় না, এটি আপনার বডি টাইপ ম্যাচিং, স্কিন টোনের জন্য রাইট কালার, পোশ্চার এবং ওভারঅল ক্ল্যারিটি নিয়ে আলোচনা করে।' },
  { q: 'এটা কি practical?', a: 'হ্যাঁ। বইয়ের ভেতরের প্রতিটি চেকলিস্ট এবং গাইডলাইন বাস্তব শপিং গাইড, ড্রেসিং প্যাটার্ন ও রিয়েল লাইফ ফিটিংয়ের ওপর ভিত্তি করে বানানো।' },
  { q: 'এটা কি আমার confidence বাড়াতে সাহায্য করবে?', a: 'অবশ্যই। যখন আপনি আয়নার সামনে দাঁড়িয়ে নিশ্চিত হবেন যে যা পরেছেন তা আপনাকে এলিগেন্ট দেখাচ্ছে, আপনার আত্মবিশ্বাস প্রাকৃতিকভাবেই বৃদ্ধি পাবে।' }
];

export const PROBLEM_CARDS = [
  {
    num: "01",
    title: "সঠিক Fit জানা নেই",
    desc: "কোন পোশাক আপনার বডি টাইপে সবচেয়ে ভালো ফিট করে তা জানা না থাকায় পোশাক আলগা বা স্লপি দেখায়।"
  },
  {
    num: "02",
    title: "সঠিক Colour ম্যাচিংয়ের অভাব",
    desc: "কোন রং আপনার স্কিন টোনের সাথে মানিয়ে আপনাকে ফ্রেশ দেখায় তা না বুঝে র‍্যান্ডম শপিং করা।"
  },
  {
    num: "03",
    title: "ফিট ও বডি ল্যাঙ্গুয়েজের সম্পর্ক",
    desc: "পোশাক ঠিকঠাক হলেও দুর্বল শারীরিক ভঙ্গি (posture) আপনার পুরো আত্মবিশ্বাস ও ইম্প্রেশন শেষ করে দেয়।"
  }
];

export const TRANSFORMATION_BULLETS = [
  "নিজেকে আরও Taller, Cleaner এবং Sharper দেখানো যায়",
  "সীমিত বাজেট এবং কম জামাকাপড় দিয়েও এলিট লুক তৈরি করা যায়",
  "যেকোনো আড্ডায় বা মিটিংয়ে নিজের সম্মানজনক উপস্থিতি বজায় রাখা যায়",
  "সকালে পোশাক বাছাইয়ের কনফিউশন দূর করে ১ মিনিটে রেডি হওয়া যায়"
];

export const INSIDE_TOPICS = [
  { title: "Fit Mastery", desc: "যাতে আপনি instantly বুঝতে পারেন কোন পোশাক আপনাকে sharp দেখাচ্ছে আর কোনটা sloppy।" },
  { title: "Body Type Guidance", desc: "যাতে আপনি নিজের frame অনুযায়ী এমন পোশাক বেছে নিতে পারেন, যা আপনাকে more balanced and attractive দেখায়।" },
  { title: "Color Clarity", desc: "যাতে আপনি এমন color পরেন, যা আপনার face এ life আনে, tired look না।" },
  { title: "Capsule Wardrobe System", desc: "যাতে কম কাপড়ে বেশি outfit create করতে পারেন, আর daily confusion কমে যায়।" },
  { title: "Smart Shopping Logic", desc: "যাতে আর emotional বা random shopping না করে intentionally কিনতে পারেন।" },
  { title: "Posture & Presence", desc: "যাতে same outfit-এও আপনি more confident, composed, and noticeable দেখান।" }
];
