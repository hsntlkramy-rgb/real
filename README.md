# 🏠 RealEstateFinder

A **professional real estate discovery website** built with React, TypeScript, and modern web technologies. Find your perfect property with AI-powered recommendations and interactive features.

## ✨ Features

- 🏠 **Property Listings** - Beautiful properties from UAE, UK, USA, Italy
- 🗺️ **Interactive Map** - View properties on an interactive map
- 🔍 **Smart Search** - Filter by location, price, and property type
- 📱 **Swipe Mode** - Tinder-style property browsing
- 🎯 **AI Recommendations** - Personalized property suggestions
- 📱 **Responsive Design** - Works perfectly on all devices
- 🚀 **Lightning Fast** - Client-side data for instant loading

## 🚀 Live Demo

Visit: `https://YOUR_USERNAME.github.io/RealEstateFinder`

## 🛠️ Built With

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/ui Components
- **Maps**: Leaflet.js with clustering
- **State Management**: React Query + Context API
- **Build Tool**: Vite for fast development and building

## 🏗️ Project Structure

```
RealEstateFinder/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── data/          # Client-side property data
│   │   ├── lib/           # Utilities and configurations
│   │   └── types/         # TypeScript type definitions
│   └── dist/              # Built application
├── .github/workflows/      # GitHub Actions for deployment
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/RealEstateFinder.git
cd RealEstateFinder

# Install dependencies
cd RealEstateFinder
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🌐 Deployment

This project is configured for **automatic deployment** to GitHub Pages:

1. **Push to GitHub** - The repository includes GitHub Actions workflow
2. **Automatic Build** - Every push triggers automatic build and deployment
3. **Free Hosting** - GitHub Pages provides free hosting forever

## 📱 Available Properties

### 🇦🇪 UAE Properties
- Modern Apartment in Dubai Marina
- Luxury Villa in Palm Jumeirah  
- Beachfront Villa in JBR
- Luxury Apartment in Downtown Dubai

### 🇬🇧 UK Properties
- Cozy Studio in London

### 🇺🇸 USA Properties
- Modern Condo in Manhattan
- Townhouse in Echo Park

### 🇮🇹 Italy Properties
- Villa in Tuscany

## 🔧 Customization

### Adding New Properties
Edit `client/src/data/properties.ts` to add new properties:

```typescript
{
  id: 9,
  title: "Your Property Title",
  price: "$500,000",
  location: "City, Country",
  country: "Country Code",
  images: ["image-url"],
  img_url: "main-image-url",
  description: "Property description",
  tags: ["Tag1", "Tag2"],
  personas: { remoteWorker: 0.8, family: 0.7, investor: 0.6, retiree: 0.4, luxury: 0.8 },
  latitude: 40.7128,
  longitude: -74.0060,
  isActive: true
}
```

### Styling
- **Colors**: Edit `client/src/index.css` for theme colors
- **Components**: Modify components in `client/src/components/`
- **Layout**: Update pages in `client/src/pages/`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help:
1. Check the [Issues](https://github.com/YOUR_USERNAME/RealEstateFinder/issues) page
2. Create a new issue with your question
3. Review the deployment guide in `DEPLOY_TO_GITHUB_NOW.md`

---

**Built with ❤️ for real estate discovery**
