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

The current application requires no environment variables. The 3D model, decoder, project illustrations, and logo assets are served from `public/`. Keep these assets present for the animations to work. The browser uses WebGL and the Web Crypto API; use localhost for development and HTTPS when hosting.

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

For professional projects, describe your own contribution using information approved for public sharing. A public source repository is optional. Project entries without a URL remain unlinked. Resume and credential links open in a new tab; their external sharing settings control whether visitors can view them.

## Hosting

For a root-domain deployment on Netlify or Vercel, use:

- Build command: `npm run build`
- Publish/output directory: `dist`

The site uses hash links for section navigation. Assets currently use root-relative paths such as `/models/` and `/images/`. Hosting under a repository subdirectory, including GitHub Pages project sites, requires adapting these paths and Vite's base path first.

## Prepare your GitHub repository

This checkout originally came from Moncy Yohannan's repository. Check the destination before pushing:

```sh
git remote -v
git status
```

The owner's repository is [satyajit1025/portfolio](https://github.com/satyajit1025/portfolio). This workspace uses it as `origin` and retains the original source as `upstream`. For a checkout still pointing to the original source, update `origin` before pushing. Obtain the permissions described below before publication:

```sh
git remote set-url origin https://github.com/satyajit1025/portfolio.git
git add .
git diff --cached --stat
git commit -m "Customize Satyajit Sahu portfolio"
git push -u origin main
```

Dependencies, production output, TypeScript build caches, local environment files, and local agent settings are excluded by `.gitignore`. Review staged changes before committing.

Ensure Git LFS is installed before pushing so the tracked GLB model is uploaded along with the repository.

## Attribution and license

The original portfolio implementation and design are by **Moncy Yohannan**:[author's website](https://www.moncy.dev/).

The existing [Personal Portfolio License (PPL) v1.0](LICENSE) restricts redistribution, complete website replication, commercial use, and reuse of original assets. It also identifies the 3D assets as proprietary. **Obtain the original author's permission for redistribution and asset use before uploading or publishing this derivative.** Personalization does not replace that license or grant permission. The original license is retained in this repository.

Third-party logo sources are recorded in [skill asset credits](public/images/skills/README.md) and [certification asset credits](public/images/certifications/README.md). The project uses GSAP from the npm dependency declared in `package.json`; the original README's trial-plugin instructions do not describe this dependency setup. Third-party dependencies and brand assets retain their respective terms.
