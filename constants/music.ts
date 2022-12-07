import { Music, MusicAlarm, PlayList } from "@/interfaces/index";

export const musicAlarms: MusicAlarm[] = [
  {
    id: 1,
    name: "Twinkle",
    src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667446060/Study-chill/Audio/alarm-sound/2_jbjm83.wav",
  },
  {
    id: 2,
    name: "PlayTime",
    src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667446059/Study-chill/Audio/alarm-sound/4_puh86c.wav",
  },
  {
    id: 3,
    name: "Slow Rise",
    src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667446058/Study-chill/Audio/alarm-sound/3_dbemzu.wav",
  },
  {
    id: 4,
    name: "Rooster",
    src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667446058/Study-chill/Audio/alarm-sound/1_yechci.wav",
  },
];

export const playlists: PlayList = {
  chill: [
    {
      id: 1,
      name: "Formant - Regret",
      src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444981/Study-chill/Audio/song/chill/Formant_-_Regret_oidbsf.mp3",
    },
    {
      id: 2,
      name: "Late Night Tones - Warm December",
      src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444982/Study-chill/Audio/song/chill/Late_Night_Tones_-_Warm_December_wsyatg.mp3",
    },
    {
      id: 3,
      name: "Ouflen - New Sensations",
      src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444982/Study-chill/Audio/song/chill/Ouflen_-_New_Sensations_emf7mz.mp3",
    },
    {
      id: 4,
      name: "prithvi - moonlake",
      src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444982/Study-chill/Audio/song/chill/prithvi_-_moonlake_a2n1av.mp3",
    },
    {
      id: 5,
      name: "Strong.AL& - Beyond The Clouds",
      src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444982/Study-chill/Audio/song/chill/Strong.AL_-_Beyond_The_Clouds_yqqrpb.mp3",
    },
  ],
  jazzy: [
    {
      id: 1,
      name: "Brxvs - November Rain - Lifted LoFi Records",
      src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444974/Study-chill/Audio/song/jazzy/Brxvs_-_November_Rain_-_Lifted_LoFi_Records_dpm1di.mp3",
    },
    {
      id: 2,
      name: "Jazzy 3",
      src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444974/Study-chill/Audio/song/jazzy/jazzy_25_eub16d.mp3",
    },
    {
      id: 3,
      name: "Jazzy 5",
      src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444974/Study-chill/Audio/song/jazzy/jazzy_5_bdsgus.mp3",
    },
    {
      id: 4,
      name: "Jazzy25",
      src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444974/Study-chill/Audio/song/jazzy/jazzy_25_eub16d.mp3",
    },
    {
      id: 5,
      name: "Lo-Fi Luke - Tranquil Teddy - B Positive",
      src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444978/Study-chill/Audio/song/jazzy/Lo-Fi_Luke___Tranquil_Teddy_-_B_Positive_p960d1.mp3",
    },
  ],
  sleep: [
    {
      id: 1,
      name: "Arya, Brxvs - lonely night",
      src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444855/Study-chill/Audio/song/sleep/Arya_Brxvs_-_lonely_night_1_bk0awg.mp3",
    },
    {
      id: 2,
      name: "redmatic - open eyes",
      src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444856/Study-chill/Audio/song/sleep/redmatic_-_open_eyes_yhedw4.mp3",
    },
    {
      id: 3,
      name: "Sleepermane - Orbital",
      src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444861/Study-chill/Audio/song/sleep/Sleepermane_-_Orbital_bx1n3m.mp3",
    },
    {
      id: 4,
      name: "Sleeping under the stars",
      src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444862/Study-chill/Audio/song/sleep/Sleeping_under_the_stars_vir5cx.mp3",
    },
    {
      id: 5,
      name: "Sleepy 4",
      src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444854/Study-chill/Audio/song/sleep/sleepy_4_v8sf0m.mp3",
    },
  ],
};

export const noise: Music[] = [
  {
    id: 1,
    name: "Keyboard",
    src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444751/Study-chill/Audio/song/noise/key_board_p0zvmv.mp3",
  },
  {
    id: 2,
    name: "Raining",
    src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444737/Study-chill/Audio/song/noise/rain_city_koaiiw.mp3",
  },
  {
    id: 3,
    name: "Traffic",
    src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444735/Study-chill/Audio/song/noise/city_traffic_uoo8xh.mp3",
  },
];
