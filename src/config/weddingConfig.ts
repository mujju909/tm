/**
 * Centralized Wedding Configuration
 * Extracted directly from the invitation card for Taufique & Madiha.
 * All details can be edited here and will update across the entire application.
 */

export interface EventDetail {
  id: 'nikah' | 'walima';
  title: string;
  tagline: string;
  day: string;
  dateFormatted: string;
  dateISO: string; // YYYY-MM-DD
  startTime: string;
  startTimeLabel: string;
  endTime?: string;
  venueName: string;
  address: string;
  city: string;
  pinCode: string;
  fullAddress: string;
  mapQuery: string;
  mapUrl: string;
  description: string;
}

export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  rawPhone: string;
  formattedPhone: string;
  countryCode: string; // e.g. +91
}

export interface WeddingConfig {
  couple: {
    groom: {
      firstName: string;
      fullName: string;
      fatherName: string;
      lineage: string;
    };
    bride: {
      firstName: string;
      fullName: string;
      fatherName: string;
      lineage: string;
    };
  };
  quranicVerses: {
    bismillah: {
      arabic: string;
      english: string;
    };
    verse1: {
      arabic?: string;
      translation: string;
      reference: string;
    };
    verse2: {
      arabic: string;
      translation: string;
      reference: string;
    };
  };
  invitationText: {
    preTitle: string;
    title: string;
    subtitle: string;
    closingBlessing: string;
    dua: {
      arabic: string;
      english: string;
    };
  };
  events: {
    nikah: EventDetail;
    walima: EventDetail;
  };
  contacts: ContactPerson[];
  music: {
    title: string;
    artist: string;
    audioFileSrc?: string; // Optional custom audio file path in public/ or URL
    audioNote: string;
  };
}

export const WEDDING_CONFIG: WeddingConfig = {
  couple: {
    groom: {
      firstName: 'Taufique',
      fullName: 'Taufique Khan',
      fatherName: 'Mehmood Lal Khan',
      lineage: 'Son of Mehmood Lal Khan',
    },
    bride: {
      firstName: 'Madiha',
      fullName: 'Madiha Mulla',
      fatherName: 'Umar Farooq Mulla',
      lineage: 'Daughter of Umar Farooq Mulla',
    },
  },

  quranicVerses: {
    bismillah: {
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      english: 'In the name of Allah, the Most Gracious, the Most Merciful',
    },
    verse1: {
      translation: 'And We created you in pairs',
      reference: 'QURAN 78:8',
    },
    verse2: {
      arabic: 'وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
      translation: 'And He placed between you affection and mercy',
      reference: 'QURAN 30:21',
    },
  },

  invitationText: {
    preTitle: 'WITH THE BLESSINGS OF ALLAH',
    title: 'WE REQUEST THE HONOR OF YOUR PRESENCE',
    subtitle: 'AT THE CELEBRATION OF THE UNION OF',
    closingBlessing: 'We seek your prayers and blessings as we begin this new journey together.',
    dua: {
      arabic: 'بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
      english: 'May Allah bless you and shower His blessings upon you and unite you both in goodness.',
    },
  },

  events: {
    nikah: {
      id: 'nikah',
      title: 'Nikah Ceremony',
      tagline: 'The Sacred Islamic Marriage Solemnization',
      day: 'Sunday',
      dateFormatted: '27 December 2026',
      dateISO: '2026-12-27',
      startTime: '11:30',
      startTimeLabel: '11:30 AM onwards',
      endTime: '15:30',
      venueName: 'Babar Banquet Hall',
      address: 'NIBM Road, Kondhwa',
      city: 'Pune',
      pinCode: '411048',
      fullAddress: 'Babar Banquet Hall, NIBM Road, Kondhwa, Pune - 411048, Maharashtra, India',
      mapQuery: 'Babar Banquet Hall, NIBM Road, Kondhwa, Pune 411048',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Babar+Banquet+Hall+NIBM+Road+Kondhwa+Pune+411048',
      description: 'Join us for the solemnization of the Nikah vows followed by lunch and celebrations.',
    },
    walima: {
      id: 'walima',
      title: 'Walima Reception',
      tagline: 'The Joyful Sunnah Wedding Feast & Celebration',
      day: 'Monday',
      dateFormatted: '28 December 2026',
      dateISO: '2026-12-28',
      startTime: '19:30',
      startTimeLabel: '7:30 PM onwards',
      endTime: '23:30',
      venueName: 'Karanti Veer Lahuji Vastad Sanskruti Hall',
      address: 'Laxmi Nagar, Yerwada',
      city: 'Pune',
      pinCode: '411006',
      fullAddress: 'Karanti Veer Lahuji Vastad Sanskruti Hall, Laxmi Nagar, Yerwada, Pune - 411006, Maharashtra, India',
      mapQuery: 'Karanti Veer Lahuji Vastad Sanskruti Hall, Laxmi Nagar, Yerwada, Pune 411006',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Karanti+Veer+Lahuji+Vastad+Sanskruti+Hall+Laxmi+Nagar+Yerwada+Pune+411006',
      description: 'An evening of celebration, feast, and gratitude with beloved family and friends.',
    },
  },

  contacts: [
    {
      id: 'contact-1',
      name: 'Khan Family',
      role: 'RSVP & Guest Inquiries',
      rawPhone: '7517869889',
      formattedPhone: '+91 75178 69889',
      countryCode: '91',
    },
    {
      id: 'contact-2',
      name: 'Khan Family',
      role: 'RSVP & Guest Inquiries',
      rawPhone: '9112233402',
      formattedPhone: '+91 91122 33402',
      countryCode: '91',
    },
  ],

  music: {
    title: 'Thank You My Lord (Shukran Laka Rabbi)',
    artist: 'Islamic Nasheed',
    audioFileSrc: '/shukran_laka_rabbi.mp3',
    audioNote: 'Thank You My Lord (Shukran Laka Rabbi) — Original uploaded Islamic nasheed.',
  },
};
