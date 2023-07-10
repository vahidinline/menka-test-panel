const ChildInformationFormOne = [
  {
    question: 'نام کودک',
    type: 'text',
  },
  {
    question: 'نام خانوادگی کودک',
    type: 'text',
  },
  {
    question: 'روز/ماه/سال تولد کودک',
    type: 'date',
  },
  {
    question: 'تاریخ تولد مادر',
    type: 'date',
  },
  {
    question: 'تحصیلات مادر',
    type: 'text',
  },
  {
    question: 'شغل مادر',
    type: 'text',
  },
  {
    question: 'تاریخ تولد پدر',
    type: 'date',
  },
  {
    question: 'تحصیلات پدر',
    type: 'text',
  },
  {
    question: 'شغل پدر',
    type: 'text',
  },
  {
    question: 'چند فرزند دارید؟',
    type: 'text',
  },
  {
    question: 'فاصله ی سنی فرزندان از یک دیگر چقدر است؟',
    type: 'text',
    options: [],
  },
  {
    question: 'کودک ثبت نام شده فرزند چندم است؟',
    type: 'text',
  },
  {
    question: 'آیا بارداری شما خواسته بوده است؟',
    type: 'radio',
    options: ['بله', 'خیر'],
  },
  {
    question: 'آیا پیش آمده فرزند شما شاهد مشاجره و نزاع بوده باشد؟',
    type: 'radio',
    options: ['به ندرت', 'گاهی', 'اغلب'],
  },
  {
    question:
      'مشاجراتی که فرزندتان شاهد بوده معمولا لفظی فیزیکی هر دو نوع بوده است.',
    type: 'radio',
    options: ['لفظی', 'فیزیکی', 'هر دو'],
  },
  {
    question:
      'مدت زمانی که پدر و مادر با یک دیگر وقت می‌گذرانند برای: تفریح و صمیمیت/مسائل کاری و زندگی روزمره / مسائل تربیتی کودک',
    type: 'text',
  },
  {
    question: 'کودک رابطه‌ی عاطفی میان دو والد را می‌بیند؟',
    type: 'radio',
    options: ['گاهی', 'به ندرت', 'اغلب'],
  },
];

const ChildInformationFormTwo = [
  {
    question: 'آیا با کودک به منظور تامین نیاز به توجه ، بازی می کنید ؟',
    type: 'radio',
    options: ['بله', 'خیر'],
    desc: ' توضیح : تامین توجه، یعنی انجام بازی دلخواه کودک که جنبه ی آموزشی نداشته باشد و کودک از آن لذت ببرد.',
  },
  {
    question: '   آیا به طور معمول هر روز با کودک بازی می کنید ؟',
    type: 'radio',
    options: ['بله', 'خیر'],
  },
  {
    question: 'مدت زمان بازی شما با کودک چند ساعت است ؟',
    type: 'radio',
    options: [
      'کمتر از نیم ساعت',
      'یک ساعت ',
      'بیش ازیک ساعت و نیم ( توضیح : مقصود این نیست یک ساعت و نیم بدون وقفه باشد ) ',
    ],
    desc: '     مقصود زمانی است که به بازی اختصاص می دهید ، مقصود زمان رفت و آمد به کلاس ها و ... نیست .   ',
  },
  {
    question: 'آیا کودک از شما دعوت به بازی می کند ؟',
    type: 'radio',
    options: [
      'همیشه - بالغ بر 50% موارد ',
      'گاهی 50% ',
      'بالغ بر 50% موارد من (والد) فرزندم را به بازی دعوت می کنم. ',
    ],
  },
  {
    question: ' وقتی کودک دعوت به بازی می کند پاسخ شما چگونه است ؟',
    type: 'radio',
    options: [
      ' معمولا حوصله ندارم – یا کار دارم – و بیشتر پاسخ منفی می دهم.',
      'پیش می آید که با بی حوصلگی قبول می کنم.',
      ' قبول می کنم و بازی را مشروط به انجام کار یا کارهایی، می کنم.',
      ' معمولا قبول می کنم ، تا کارهایی را انجام بدهم شروع بازی به تاخیر می افتد.',
      'معمولا با روی گشاده قبول می کنم ',
    ],
  },
  {
    question: '  ...فرزندم از بازی با من استقبال ',
    type: 'radio',
    options: ['میکند', 'نمیکند'],
  },
  {
    question: ' آیا نوع بازی ای که می کنید دلخواه کودک هست ',
    type: 'radio',
    options: ['بله', 'خیر'],
  },
  {
    question: 'در حین بازی با فرزندم موبایلم را چک می کنم',
    type: 'radio',
    options: ['اغلب', 'گاهی', 'به ندرت'],
  },
  {
    question: ' با کودکم کم بازی می کنم اما جایگزین دارد',
    type: 'radio',
    options: [
      'با همسالان یا خواهر و برادرش بازی می کند.',
      'با یک بزرگسال معمولا بازی میکند ( مثل عمو، خاله و...)',
      'خودش سرگرم میشود.',
    ],
  },
];

const ChildInformationFormThree = [
  {
    question: 'آیا کودک مراقبینی غیر از پدر و مادر دارد ؟',
    type: 'radio',
    options: ['بله', 'خیر'],
    condition: [
      'پرستار',
      'مادربزرگ',
      ' افراد دیگر',
      'کودک بیش از یک مراقب دارد ',
    ],
  },
  {
    question:
      '	آیا مراقبان ، هم راستا با روشهای تربیتی و قانون گذاری شما هستند ؟ ',
    type: 'number',
  },
  {
    question: 'آیا پدر و مادر در روش های تربیتی خود کاملا با هم هم سو هستند ؟',
    type: 'number',
  },
  {
    question:
      '	آیا پیش می آید در روش های تربیتی، با همسرتان دچار اختلاف های تکرار شونده باشید ؟',
    type: 'number',
  },
  {
    question:
      '	آیا پیش می آید فرزند شما متوجه اختلاف نظر شما ( پدر و مادر ) بشود ؟',
    type: 'number',
  },
  {
    question: 'وقتی یکی از والدین کاری را منع می کند :',
    type: 'radio',
    options: [
      'هر دو والد یکسان رفتار می کنند ',
      'کودک به والد دیگر پناه می برد و به خواسته خود می رسد.',
      '	والد دیگر پا در میانی می کند تا کودک به خواست اش برسد.',
    ],
  },
  {
    question:
      ' آیا پیش می آید قانون یا محرومیتی را بگذارید و آن را اجرایی نکنید',
    type: 'radio',
    options: [
      'چون دلم برای کودک می سوزد.',
      '	چون خیلی گریه و بی قراری می کند',
      '	ببخشید می گوید و من می بخشم.',
    ],
  },
];

export {
  ChildInformationFormOne,
  ChildInformationFormTwo,
  ChildInformationFormThree,
};
