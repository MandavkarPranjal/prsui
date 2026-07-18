<p align="center">
  <img src="https://prsui.pr5.dev/og" alt="prsui banner" />
</p>

<h1 align="center">prsui</h1>

<p align="center">
  A shadcn registry of polished, ready-to-install components by <a href="https://x.com/pr5dev">Pranjal Mandavkar</a>. Includes documentation, landing page, and everything you need to browse and install components.
  <br />
  <br />
  <a href="https://github.com/MandavkarPranjal/prsui"><img src="https://www.shieldcn.dev/github/stars/MandavkarPranjal/prsui.svg?variant=secondary&size=xs&theme=zinc" alt="GitHub Stars" /></a>
  <a href="https://github.com/MandavkarPranjal/prsui/actions"><img src="https://www.shieldcn.dev/github/ci/MandavkarPranjal/prsui.svg?variant=secondary&size=xs&theme=zinc" alt="CI" /></a>
  <a href="https://x.com/pr5dev"><img src="https://www.shieldcn.dev/x/follow/pr5dev.svg?variant=branded&size=xs&theme=zinc" alt="X Follow" /></a>
</p>

## Features

- 📦 **Copy/paste ownership** - Install components and own the code
- 📚 **Documentation site** - Beautiful docs powered by Fumadocs
- 🎨 **Shadcn registry compatible** - Works with `npx shadcn add`
- 🤖 **[Agent ready](https://www.mintlify.com/score/startercn)** - Includes `llms.txt`, `llms-full.txt`, agent skills discovery routes, and API catalog endpoints
- 🔊 **[Web audio feedback](https://audio.raphaelsalaja.com/)** - Built-in sound effects powered by `@web-kits/audio`
- 📳 **[Web haptics](https://haptics.lochie.me/)** - Optional haptic feedback hooks for supported devices via `web-haptics`
- ✨ **[Motion animations](https://motion.dev/)** - `motion`-powered UI polish for copy states, text transitions, and interactive elements
- 🎯 **[Animated icons](https://lucide-animated.com/)** - Reusable animated icons for navigation, sharing, sponsorship, and CTAs
- 🔄 **[View transitions](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition)** - Next.js view transitions enabled for smoother navigation between pages
- 🚀 **Deploy ready** - Deploy anywhere

## Built In

- `Next.js 16` with the App Router
- `React 19` and `TypeScript`
- `Tailwind CSS 4`
- `Fumadocs` for documentation
- `shiki` + `rehype-pretty-code` for code blocks
- `sonner` for toasts
- `radix-ui` + `vaul` for accessible primitives
- `@vercel/analytics` for analytics

## Usage

Install any component with:

```bash
npx shadcn@latest add https://prsui.pr5.dev/r/smooth-input.json
```

## Project Structure

```
├── registry/
│   └── new-york/           # Your components go here
│       └── smooth-input.tsx
├── registry.json           # Component registry manifest
├── content/docs/           # Documentation (MDX)
├── app/                    # Next.js app
└── public/r/               # Built registry files (auto-generated)
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm registry:build` - Rebuild the component registry

## License

[MIT](./LICENSE)
