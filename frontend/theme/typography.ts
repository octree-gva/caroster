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
  fontSize: '13px',
  lineHeight: '19px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  textCase: 'undercase',
};

//Body-2
export const body2 = {
  ...body1,
  fontSize: '11px',
  lineHeight: '15px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  textCase: 'undercase',
};

//Button
export const button = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Medium'],
  fontSize: '13px',
  lineHeight: '19px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  textCase: 'uppercase',
};

//Caption
export const caption = {
  fontFamily: body1.fontFamily,
  fontWeight: 'Regular',
  fontSize: '12px',
  lineHeight: '17px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  textCase: 'undercase',
};

//Overline
export const overline = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Regular'],
  fontSize: '11px',
  lineHeight: '15px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
};

//Subtitle-2
export const subtitle2 = {
  fontFamily: body1.fontFamily,
  fontWeight: 'Medium',
  fontSize: '13px',
  lineHeight: '18px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
};

//Subtitle-1
export const subtitle1 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Regular'],
  fontSize: '15px',
  lineHeight: '21px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
};

//Headline-6
export const h6 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Medium'],
  fontSize: '13px',
  lineHeight: '18px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
};

//Headline-5
export const h5 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Regular'],
  fontSize: '15px',
  lineHeight: '21px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  textCase: 'undercase',
};

//Headline-4
export const h4 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Medium'],
  fontSize: '17px',
  lineHeight: '24px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
};

//Headline-3
export const h3 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Semi Bold'],
  fontSize: '19px',
  lineHeight: '27px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
};

//Headline-2
export const h2 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Semi Bold'],
  fontSize: '24px',
  lineHeight: '33px',
  textDecoration: 'none',
};

//Headline-1
export const h1 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Semi Bold'],
  fontSize: '30px',
  lineHeight: '42px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
};
