const configuredPhoneDisplay = process.env.NEXT_PUBLIC_PHONE_DISPLAY?.trim();
const configuredPhoneHref = process.env.NEXT_PUBLIC_PHONE_HREF?.trim();

export const businessInfo = {
  phoneDisplay: configuredPhoneDisplay || "02 59 15 01 75",
  phoneHref: configuredPhoneHref || "tel:+33259150175",
  mapsUrl: "https://maps.app.goo.gl/d4fB7NpwH1VduaJFA?g_st=ic",
  address: "26 rue des Palmiers",
  postalCity: "44850 Ligné",
  hours: "Mardi · 9h–12h30 puis 14h30–18h",
} as const;
