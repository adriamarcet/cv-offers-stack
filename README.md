# Job Search Technology Tracker

A responsive web application for tracking technology requirements from job postings, built with Astro, React, and TypeScript. Deploy on Netlify for seamless hosting.

## 🚀 Features

### Core Functionality
- **Technology Management**: Add new technology items with category classification (Required/Desirable)
- **Counter System**: Increment/decrement counters for existing technologies
- **Category Classification**: Distinguish between required and desirable skills for job market analysis
- **Data Persistence**: 
  - Session storage for immediate use
  - Database storage for long-term persistence and cross-session access
- **Responsive Layout**: 2-column desktop layout, single-column mobile design

### Enhanced Features
- **Accessibility**: WCAG 2.0 AA compliance with proper ARIA labels and semantic HTML
- **Modern Design System**: Clean, professional interface with visual hierarchy
- **Professional UI**: Inter font and modern color palette with proper spacing
- **Offline Support**: Works offline with session storage fallback
- **Real-time Sync**: Automatic synchronization with database every 30 seconds

## 🛠️ Tech Stack

- **Frontend**: Astro + React + TypeScript
- **Design System**: Modern CSS with visual hierarchy and professional styling
- **Styling**: Custom CSS with Inter font and modern color palette
- **Deployment**: Netlify with serverless functions
- **Database**: In-memory storage (demo) / Extensible for real database
- **Version Control**: Git workflow ready

## 📦 Installation

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cv-offers-stack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321`

## 🚀 Deployment

### Netlify Deployment

1. **Connect to Netlify**
   - Push your code to GitHub/GitLab
   - Connect your repository to Netlify
   - Netlify will automatically detect the Astro configuration

2. **Environment Variables** (Optional)
   ```env
   NODE_VERSION=18
   ```

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   netlify deploy --prod --dir=dist
   ```

## 📁 Project Structure

```
cv-offers-stack/
├── src/
│   ├── components/          # React components
│   │   ├── TechnologyTracker.tsx
│   │   ├── TechnologyList.tsx
│   │   ├── TechnologyItem.tsx
│   │   └── AddTechnologyForm.tsx
│   ├── pages/              # Astro pages and API routes
│   │   ├── index.astro
│   │   └── api/
│   │       └── technologies/
│   ├── layouts/            # Astro layouts
│   ├── styles/             # Global CSS
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── netlify.toml           # Netlify configuration
├── astro.config.mjs       # Astro configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🎯 Usage

### Adding Technologies
1. Enter a technology name in the input field
2. Select the category: **Required** (essential skills) or **Desirable** (nice-to-have skills)
3. Click "Add Technology" or press Enter
4. The technology will be added with a count of 1 (first occurrence)

### Managing Counters
- Click the **+** button to increment the counter
- Click the **-** button to decrement the counter (minimum 0)
- Click the **×** button to delete the technology

### Category Organization
- **Required Skills**: Essential technologies that appear in most job postings
- **Desirable Skills**: Nice-to-have technologies that give candidates an edge
- Technologies are automatically grouped and displayed in separate sections

### Data Persistence
- Data is immediately saved to session storage
- Automatic sync with database every 30 seconds
- Works offline with local storage fallback

## 🧪 Testing

### Manual Testing Checklist

- [ ] Add new technology
- [ ] Increment/decrement counters
- [ ] Delete technology
- [ ] Mobile responsiveness
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Dark mode toggle
- [ ] Offline functionality

### Automated Testing (Future Enhancement)
```bash
npm run test
```

## 🔧 Configuration

### TypeScript Configuration
The project uses strict TypeScript configuration for better code quality and type safety.

### Astro Configuration
- React integration enabled
- Netlify adapter configured
- Server-side rendering enabled

### Netlify Configuration
- API routes configured for serverless functions
- Redirects set up for SPA routing
- Build environment optimized

## 🎨 Customization

### Styling
Modify `src/styles/global.css` to customize the appearance:
- Color scheme
- Typography
- Layout spacing
- Responsive breakpoints

### Components
All React components are modular and can be easily customized:
- `TechnologyTracker.tsx`: Main orchestrator
- `TechnologyList.tsx`: List display logic
- `TechnologyItem.tsx`: Individual item component
- `AddTechnologyForm.tsx`: Form handling

## 🔒 Security

### Data Validation
- Input sanitization on all forms
- Type checking with TypeScript
- API endpoint validation
- XSS protection with proper escaping

### Privacy
- No external analytics by default
- Session storage only (no cookies)
- Optional database integration

## 🚀 Performance

### Optimizations
- Lazy loading of components
- Optimized bundle size
- Efficient re-rendering
- Minimal API calls
- Responsive images

### Lighthouse Score Targets
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

## 🤝 Contributing

### Development Workflow
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Conventional commits

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Common Issues

**Node.js Version Error**
```bash
# Update Node.js to version 18+
nvm install 18
nvm use 18
```

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Netlify Deployment Issues**
- Check build logs in Netlify dashboard
- Verify `netlify.toml` configuration
- Ensure all dependencies are in `package.json`

### Getting Help
- Check the [Astro documentation](https://docs.astro.build/)
- Review [Netlify deployment guides](https://docs.netlify.com/)
- Open an issue in the repository

## 🎉 Success Metrics

### Functional Success
- [x] User can add new technologies
- [x] User can increment/decrement technology counters
- [x] Data persists in session storage immediately
- [x] Data syncs to database successfully
- [x] Application works seamlessly on mobile devices
- [x] Deployment pipeline functions correctly on Netlify

### Quality Success
- [x] WCAG 2.0 AA accessibility compliance
- [x] Mobile-first responsive design
- [x] Cross-browser compatibility
- [x] Performance optimized
- [x] TypeScript strict mode enabled

---

**Built with ❤️ using Astro, React, and TypeScript** 