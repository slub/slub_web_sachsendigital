# SACHSEN.digital (LDP & SAVE)

This TYPO3 extension provides the configuration and setup for the new implementation of SACHSEN.digital by the [SLUB Dresden](https://www.slub-dresden.de).

##  Installation
This extension needs to reside in a folder called `slub_web_sachsendigital` in TYPO3 extension folder ('typoconf/ext').

After activate the extension in the TYPO3 extension manager you need to include a static template called `SLUB: Portal Sachsen.Digital` in the template settings of the source page of the SACHSEN.digtal branch.

## Frontend development (based on Grunt)

First of all this extension comes with a [Grunt](https://gruntjs.com/) setup which uses some typical [NPM packages](https://www.npmjs.com/) like jshint, terser, less aso.

You can simply get it running by installing the local needings of NPM with `npm install` on your command line from the `Build` folder of this extension.

After that just type `npx grunt` to start the processing which watches all the LESS and JS folders to generate new asset files on the fly if anythings changes.

### Getting Started

[`Build/.nvmrc`](`Build/.nvmrc`) specifies which version of Node we use (see [documentation](https://github.com/nvm-sh/nvm#nvmrc)).

```bash
cd Build/
nvm install  # or just `nvm use`
npm install

# Development
npm run watch
npm run watch-less

# Production
npm run build
```

### Remarks

- jQuery is marked as external in Webpack config

## Dependencies

- TYPO3 CMS Frontend (cms)
- Extbase Framework (Extbase)
- Fluid Templating Engine (fluid)
- Kitodo.Presentatioin (dlf)
- News system (news)
