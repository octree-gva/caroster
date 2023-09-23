const weightScale = {
  'Extra Light': 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  'Semi Bold': 600,
};

//Body-1
export const body1 = {
  fontFamily: 'Inter',
  fontWeight: weightScale['Regular'],
  fontSize: '15px',
  letterSpacing: '3%',
  textDecoration: 'none',
  textCase: 'undercase',
};
export const body1Neg = body1;
export const body1Underline = {...body1, textDecoration: 'underline'};

//Body-2
export const body2 = {
  ...body1,
  fontSize: '13px',
  letterSpacing: '2%',
  textDecoration: 'none',
  textCase: 'undercase',
};
export const body2Neg = body2;
export const body2Semibold = {...body2, fontWeight: weightScale['Semi Bold']};

//Button
export const button = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Medium'],
  fontSize: '13px',
  letterSpacing: '10%',
  textDecoration: 'none',
  textCase: 'uppercase',
};
export const buttonNeg = button;

//Caption
export const caption = {
  fontFamily: body1.fontFamily,
  fontWeight: 'Regular',
  fontSize: '12px',
  letterSpacing: '3%',
  textDecoration: 'none',
  textCase: 'undercase',
};
export const captionNeg = caption;
export const captionUnderline = {...caption, textDecoration: 'underline'};

//Overline
export const overline = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Regular'],
  fontSize: '10px',
  letterSpacing: '15%',
  textDecoration: 'none',
  textCase: 'uppercase',
};
export const overlineNeg = overline;

//Subtitle-2
export const subtitle2 = {
  fontFamily: body1.fontFamily,
  fontWeight: 'Medium',
  fontSize: '13px',
  letterSpacing: '0.7%',
  textDecoration: 'none',
  textCase: 'undercase',
};
export const subtitle2Neg = subtitle2;

//Subtitle-1
export const subtitle1 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Regular'],
  fontSize: '15px',
  letterSpacing: '1%',
  textDecoration: 'none',
  textCase: 'undercase',
};
export const subtitle1Neg = subtitle1;

//Headline-6
export const headline6 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Medium'],
  fontSize: '19px',
  letterSpacing: '0.8%',
  textDecoration: 'none',
  textCase: 'undercase',
};
export const headline6Neg = {...headline6, fontWeight: weightScale['Regular']};

//Headline-5
export const headline5 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Regular'],
  fontSize: '23px',
  letterSpacing: '0',
  textDecoration: 'none',
  textCase: 'undercase',
};
export const headline5Neg = {...headline5, fontWeight: weightScale['Light']};

//Headline-4
export const headline4 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Medium'],
  fontSize: '17px',
  lineHeight: '23px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  textCase: 'undercase',
};
export const headline4Neg = {...headline4, fontWeight: weightScale['Light']};

//Headline-3
export const headline3 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Regular'],
  fontSize: '46px',
  letterSpacing: '0',
  textDecoration: 'none',
  textCase: 'undercase',
};
export const headline3Neg = {...headline3, fontWeight: weightScale['Light']};

//Headline-2
export const headline2 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Light'],
  fontSize: '58px',
  letterSpacing: '-0.8%',
  textDecoration: 'none',
  textCase: 'undercase',
};
export const headline2Neg = {
  ...headline2,
  fontWeight: weightScale['Extra Light'],
};

//Headline-1
export const headline1 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Light'],
  fontSize: '93px',
  letterSpacing: '-1.6%',
  textDecoration: 'none',
  textCase: 'undercase',
};
export const headline1Neg = {
  ...headline1,
  fontWeight: weightScale['Extra Light'],
};
