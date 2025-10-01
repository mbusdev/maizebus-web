# MaizeBus Frontend

> Modern React frontend for MaizeBus - University of Michigan's student-run bus tracking application

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC.svg)](https://tailwindcss.com/)

## 🚀 Live Demo

- **Production**: [https://www.maizebus.com](https://www.maizebus.com)
- **GitHub Pages**: [https://mbusdev.github.io/maizebus-web](https://mbusdev.github.io/maizebus-web)

## 📋 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI Components**: Built with Radix UI primitives
- **Smooth Animations**: Framer Motion for page transitions and micro-interactions
- **Type Safety**: Full TypeScript implementation
- **Fast Development**: Vite for lightning-fast HMR
- **Accessibility**: WCAG compliant components
- **SEO Optimized**: Meta tags and structured data

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + CSS Modules
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/mbusdev/maizebus-web.git
cd maizebus-web/client

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
client/
├── public/                 # Static assets
│   ├── assets/            # Images and media
│   │   └── profiles/      # Team member photos
│   ├── logo.png          # Site favicon
│   └── 404.html          # GitHub Pages SPA routing
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── button/       # Button component
│   │   ├── input/        # Input component
│   │   ├── CardContent/  # Card wrapper
│   │   └── ...           # Other components
│   ├── pages/            # Page components
│   │   ├── home/         # Landing page
│   │   ├── contact/      # Contact form
│   │   ├── join/         # Application form
│   │   ├── team/         # Team showcase
│   │   └── tracker/      # Bus tracking
│   ├── assets/           # Static assets (bundled)
│   │   └── team.json     # Team data
│   ├── config.ts         # API configuration
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies
```

## 🎨 Available Scripts

```bash
# Development
npm run dev              # Start dev server with HMR
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Type checking
npm run type-check       # Check TypeScript types
```

## 🌐 Environment Configuration

The app automatically detects the environment and configures API endpoints:

- **Development**: `http://localhost:3001` (local backend)
- **Production**: `https://api.maizebus.com` (AWS EC2 backend)

### Environment Variables

```bash
# Optional: Override API URL
VITE_API_URL=https://your-api-domain.com
```

## 🎯 Key Pages

### Home (`/`)
- Hero section with app showcase
- Feature highlights
- FAQ section
- Download links for mobile apps

### Contact (`/contact`)
- Multi-purpose contact form
- Inquiry type selection (General, Bug Report, Feature Request)
- Social media links
- Quick response guarantee

### Join (`/join`)
- Application form for new members
- Skills and experience input
- Real-time form validation
- Loading states and success feedback

### Team (`/team`)
- Team member showcase
- Role-based filtering
- Social media integration
- Responsive grid layout

### Tracker (`/tracker`)
- Real-time bus location (coming soon)
- Route information
- Schedule display

## 🎨 Component Library

### Core Components

- **Button**: Multiple variants (primary, secondary, outline)
- **Input**: Form inputs with validation states
- **Textarea**: Multi-line text input
- **Card**: Content containers with headers
- **Badge**: Status indicators and tags
- **Avatar**: Profile image display with fallback

### Layout Components

- **Nav**: Responsive navigation with mobile menu
- **Footer**: Site footer with links and social media
- **SpotlightCard**: Featured content cards
- **ImageWithFallback**: Images with error handling

## 🚀 Deployment

### GitHub Pages

The frontend is automatically deployed to GitHub Pages on every push to `main`:

1. **Custom Domain**: `www.maizebus.com`
2. **GitHub Pages**: `mbusdev.github.io/maizebus-web`
3. **HTTPS**: Automatically enforced
4. **SPA Routing**: Handled via `404.html` redirect

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the built files
# Upload to your hosting provider
```

## 🔧 Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow React functional component patterns
- Use Tailwind CSS for styling
- Implement proper error boundaries
- Write accessible HTML

### Component Structure

```tsx
// Example component structure
interface ComponentProps {
  title: string;
  children: React.ReactNode;
}

export function Component({ title, children }: ComponentProps) {
  return (
    <div className="component-wrapper">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

### Adding New Pages

1. Create page component in `src/pages/page-name/`
2. Add route to `App.tsx`
3. Update navigation in `Nav` component
4. Add page-specific styles

## 🐛 Troubleshooting

### Common Issues

**Images not loading**
- Check if images are in `public/assets/` directory
- Verify paths use absolute URLs (`/assets/...`)

**API calls failing**
- Ensure backend is running on correct port
- Check CORS configuration
- Verify API endpoints in `config.ts`

**Build errors**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

**GitHub Pages routing issues**
- Ensure `404.html` exists in `public/`
- Check `basename` configuration in `App.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Built by the MaizeBus development team at the University of Michigan.

- **Frontend Lead**: Harvey Kyllonen
- **Backend Lead**: Ryan Lu
- **DevOps Lead**: Andrew Yu
- **Executive Director**: Ishan Kumar

## 📞 Support

- **Email**: contact@maizebus.com
- **GitHub Issues**: [Report bugs or request features](https://github.com/mbusdev/maizebus-web/issues)
- **Discord**: [Join our community](https://discord.gg/maizebus)

---

**Made with ❤️ by Michigan students, for Michigan students**