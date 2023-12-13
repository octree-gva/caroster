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
  fontSize: '14px',
  lineHeight: '19.6px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  textCase: 'undercase',
};

//Body-2
export const body2 = {
  ...body1,
  fontSize: '12.44px',
  lineHeight: '17.42px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  textCase: 'undercase',
};

//Button
export const button = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Medium'],
  fontSize: '14px',
  lineHeight: '19.6px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  textCase: 'uppercase',
  textTransform: 'none',
};

//Caption
export const caption = {
  fontFamily: body1.fontFamily,
  fontWeight: 'Regular',
  fontSize: '12.44px',
  lineHeight: '17.42px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  textCase: 'undercase',
};

//Overline
export const overline = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Regular'],
  fontSize: '12.44px',
  lineHeight: '17.42px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  textTransform: 'none',
};

//Subtitle-2
export const subtitle2 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Medium'],
  fontSize: '14px',
  lineHeight: '19.6px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
};

//Subtitle-1
export const subtitle1 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Medium'],
  fontSize: '15.75px',
  lineHeight: '22.1px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
};

//Headline-6
export const h6 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Medium'],
  fontSize: '15.75px',
  lineHeight: '22.1px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
};

//Headline-5
export const h5 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Regular'],
  fontSize: '17.72px',
  lineHeight: '24.8px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  textCase: 'undercase',
};

//Headline-4
export const h4 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Medium'],
  fontSize: '19px',
  lineHeight: '26.6px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
};

//Headline-3
export const h3 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Semi Bold'],
  fontSize: '22.42px',
  lineHeight: '31.39px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
};

//Headline-2
export const h2 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Semi Bold'],
  fontSize: '25.23px',
  lineHeight: '35.32px',
  textDecoration: 'none',
};

//Headline-1
export const h1 = {
  fontFamily: body1.fontFamily,
  fontWeight: weightScale['Semi Bold'],
  fontSize: '27px',
  lineHeight: '37.8px',
  letterSpacing: '0.02em',
  textDecoration: 'none',
};
