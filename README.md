# Hyper Local Eleventy Project

Eleventy Project designed for Swarthmore Libraries Book Arts exhibits with aspirations to be a template theme for future online exhibits. Similar in scope to Jekyll projects [Wax](https://github.com/minicomp/wax) and [CollectionBuilder](https://github.com/CollectionBuilder/collectionbuilder-sa). 

## Why?

Issue reconciling Pagemaster gem, Ruby, and Jekyll versions spurred me to consider other options. Hit my limit maintaining rvm Ruby versions and local/global gem compatibility.

- "For all my time using Jekyll, I would think to myself 'this, but in Node'." -- [Paul Lloyd](https://24ways.org/2018/turn-jekyll-up-to-eleventy)
- Growing community around this tool, but in general decline of Ruby in web dev
- Most objects can be templates or scripts, which increases flexibility
- Collection building is not a poorly maintained plugin but core feature
- Much faster
- Fits more easily within existing node web dev chain

This project makes use of several eleventy features:

- Custom filters (`addFilter`)
- Collection pages and collection data object from JSON file (`pagination`)
- Transformed collection data fields (`eleventyComputed`)
- Explicit file copy paths (`addPassthroughCopy`)
- Site data
- Computed URLs and paths (`url`, `pathPrefix`)
- Register shortcodes for layout defaults (`addLayoutAlias`)
- Set Markdown It markdown parser options
- Sass and eleventy dev and build scripts in `package.json`

***light(ish)!***

- [Milligram](https://milligram.io/)
- [Normalize](https://necolas.github.io/normalize.css/)
- [Eleventy](https://www.11ty.dev)

There are more minimal approaches but this is the minimum for our requirements. Milligram chosen for `flexbox` column layout.

***features!***

- [viewerjs](https://github.com/fengyuanchen/viewerjs)
- jQuery (sigh, just makes things easier)
- Minimal scrollview jQuery function

## Usage

- `npm install --save-dev`
- `npm start` (for development)
- `npm run build`

### Data

Peculiar notes about Airtable:

- got to API docs for Airtable base, open console
  - `window.application.tables[0].sampleRows.map(d => d.fields)`
- regex to capture filenames alone
  - `\{[\n ]+"id"[\w\W]+?"filename": (.+)[\w\W]+?\s{10}\}\n\s{8}\}`

**2021-02-18**

Found out belatedly Airtable API Docs `sampleRows` truncated description field. Had to create API key and access via `curl` then transform.

`d = data.map(function(d) { d.fields.Photos = d.fields.Photos.map(function(e) { return e.filename }); return d; })`