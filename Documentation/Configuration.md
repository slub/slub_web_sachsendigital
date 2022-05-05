# Configuration

## Curated Highlights

On the home page, there is a curated selection of digitized works.

- Add a **Media-Element for Curated Content** (on tab "Sachsen.Digital") to the "Highlights" column of the home page.
- Add images, links and descriptions of the curated works. Note that the preconfigured links are PURLs that eventually resolve to [sachsen.digital](sachsen.digital), so the works are shown on the production site.

## Institutions

Sachsen.Digital states partner institutions at two places:

- There is a dedicated page at https://sachsen.digital/institutionen listing all institutions that present their content on Sachsen.Digital. This uses the `image_ldp_institutions` content element.
- Towards the bottom of the home page, there is a randomized selection of logos. This is realized in the `lib.institutions` TypoScript object.

To configure institutions:

- Create a new page to list institutions.
  - For each section/city, add a **Media-Element for Institutions** (found on tab "Sachsen.Digital") content element to the page.
  - Add images and descriptions for each institution.
- In the main template, set the constant `config.logoContainer` (in category `plugin.tx_slub_web_sachsendigital`) to the PID of the institutions page.
