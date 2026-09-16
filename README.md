# Satyajit Sahu — QA Engineer & SDET Portfolio

A personal portfolio presenting my testing experience, projects, technical skills, education, certifications, and resume. Built with React, TypeScript, Vite, GSAP, and Three.js.

## Features

- Interactive 3D character and smooth scrolling.
- About Me with word reveal animation, a waving greeting, and testing badges.
- Expandable Manual, Automation, API, and Performance Testing sections.
- Career timeline and featured professional and personal testing projects.
- Education and certifications with forward and reverse scroll animations.
- Subtle issuer logos on certification hover and accessible verification links.
- Animated tech stack, including AI tools used in testing.
- Resume, contact, GitHub, LinkedIn, and Linktree links.
- Responsive layouts and reduced-motion support for the About Me and certification effects.

## Run locally

Requirements: Node.js 20 or newer and npm. Keep `package-lock.json` committed so installations use the same dependency versions.

The repository tracks `public/models/character.glb` with Git LFS. Install Git LFS when cloning or pushing this repository, and fetch the model after cloning:

```sh
git lfs install
git lfs pull
```

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

The current application requires no environment variables. The 3D model, decoder, project illustrations, and logo assets are served from `public/`. Keep these assets present for the animations to work properly.

## Checks and production build

```sh
npm run lint
npm run build
npm run preview
```

The build runs TypeScript checks and writes the production website to `dist/`. Preview serves that build locally; it does not deploy the site. There is currently no automated test suite.

## Customize the content

| Content | Location |
| --- | --- |
| Bio, contact links, resume, skills, experience, projects, and credentials | `src/data/portfolio.ts` |
| About Me layout and effects | `src/components/About.tsx` and `src/components/styles/About.css` |
| Certification logos and verification icons | `src/components/Credentials.tsx` and `src/components/styles/Credentials.css` |
| Project illustrations | `public/images/projects/` |
| Skill and certification logo assets | `public/images/skills/` and `public/images/certifications/` |
| Page title and description | `index.html` |

For professional projects, describe your own contribution using information approved for public sharing. A public source repository is optional. Project entries without a URL remain unlinked. Resume entries reference your contact information from `src/data/portfolio.ts`.

## Hosting

For a root-domain deployment on Netlify or Vercel, use:

- Build command: `npm run build`
- Publish/output directory: `dist`

The site uses hash links for section navigation. Assets currently use root-relative paths such as `/models/` and `/images/`. Hosting under a repository subdirectory, including GitHub Pages project sites, requires updating asset paths in `index.html` and `src/components/styles/globals.css`.

## License

This project is licensed under the Personal Portfolio License (PPL) v1.0. See the [LICENSE](LICENSE) file for details. This license restricts redistribution, commercial use, and reuse of original assets while permitting personal study and learning.

Third-party logo sources are recorded in [skill asset credits](public/images/skills/README.md) and [certification asset credits](public/images/certifications/README.md). The project uses GSAP from Greensock and Three.js as specified in `package.json`.