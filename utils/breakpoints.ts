export const SCREEN_SIZES = {
  mobileSm: 390,
  mobileLg: 475,
  tablet: 768,
  laptop: 1024,
  desktopSm: 1440,
  desktopLg: 1650,
};

export const BREAKPOINTS = {
  mobileSm: `only screen and (max-width: ${SCREEN_SIZES.mobileSm}px)`,
  mobileLg: `only screen and (max-width: ${SCREEN_SIZES.mobileLg}px)`,
  tablet: `only screen and (max-width: ${SCREEN_SIZES.tablet}px)`,
  laptop: `only screen and (max-width: ${SCREEN_SIZES.laptop}px)`,
  desktopSm: `only screen and (max-width: ${SCREEN_SIZES.desktopSm}px)`,
  desktopLg: `only screen and (max-width: ${SCREEN_SIZES.desktopLg}px)`,
  fromMobileSm: `only screen and (min-width: ${SCREEN_SIZES.mobileSm}px)`,
  fromMobileLg: `only screen and (min-width: ${SCREEN_SIZES.mobileLg}px)`,
  fromLaptop: `only screen and (min-width: ${SCREEN_SIZES.laptop}px)`,
  fromTablet: `only screen and (min-width: ${SCREEN_SIZES.tablet}px)`,
  fromDesktopSm: `only screen and (min-width: ${SCREEN_SIZES.desktopSm}px)`,
  fromDesktopLg: `only screen and (min-width: ${SCREEN_SIZES.desktopLg}px)`,
};
