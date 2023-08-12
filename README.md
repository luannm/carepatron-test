# Carepatron Test

Here is my submission for Carepatron test. And below are my comments to clarify on some points of the Extras section:

1. How close to the designs is your submission?
   - If you needed to change something in the future (size/color of buttons), how easy would it be? => **For this, what i've done is wrapped the main `App` with MUI `ThemeProvider` and define a custom theme, with that, we can easy extend or control the styles at global level to ensure consistency**
2. How can your submission allow for scalability?
   - What if a customer has thousands of records? => **_Currently I'm using FE pagination for the table as the requirements just to modify FE side only. But in case of having thousands of records, then ideally we should handle the search & pagination on BE, that would improve both UX and performance_**
   - How is state managed as the codebase grows? => **_As this app is quite small now so I didn't adjust much on the provider, in case of scalability of state management, we can still use Provider approach but need to design more carefully. Or can consider to switch to use other libs such as Redux; Zustand; etc..._**
   - How can we support multiple countries? => **_I've also already integrated with `react-i18next` for localization, so can easy to extend later for new language_**
