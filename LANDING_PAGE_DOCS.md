# AidLink Landing Page - Modular Architecture

## 📁 Project Structure

```
src/
├── app/
│   ├── (public)/
│   │   └── page.tsx                 # Main landing page (orchestrates sections)
│   ├── layout.tsx                   # Root layout with Toaster provider
│   └── globals.css                  # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Navigation bar component
│   │   └── Footer.tsx              # Footer component
│   ├── sections/
│   │   ├── HeroSection.tsx         # Hero/Banner section
│   │   ├── AboutSection.tsx        # About AidLink section
│   │   ├── HowItWorksSection.tsx   # 4-step process section
│   │   ├── FeaturesSection.tsx     # Platform features grid
│   │   ├── ProjectsSection.tsx     # Featured projects showcase
│   │   ├── TeamSection.tsx         # Team members display
│   │   ├── SupportSection.tsx      # Contact form section
│   │   └── CTASection.tsx          # Call-to-action section
│   ├── ui/
│   │   ├── button.tsx              # shadcn/ui Button component
│   │   ├── card.tsx                # shadcn/ui Card component
│   │   ├── input.tsx               # shadcn/ui Input component
│   │   └── textarea.tsx            # shadcn/ui Textarea component
│   ├── ProjectCard.tsx             # Reusable project card
│   └── index.ts                    # Barrel export file
├── data/
│   └── dummyData.ts                # Sample data (projects & developers)
├── types/
│   └── index.ts                    # TypeScript type definitions
└── lib/
    └── utils.ts                    # Utility functions (cn helper)
```

## 🎯 Best Practices Implemented

### 1. **Modular Component Architecture**

- Each section is a separate, self-contained component
- Easy to maintain, test, and reuse
- Clear separation of concerns

### 2. **TypeScript Type Safety**

- Proper type definitions in `src/types/index.ts`
- No implicit `any` types
- Full IntelliSense support

### 3. **shadcn/ui Pattern**

- All UI components follow shadcn/ui conventions
- Consistent styling with `cn()` utility
- Accessible and customizable components

### 4. **Next.js Best Practices**

- Using `'use client'` directive for client components
- Next.js `Link` instead of react-router-dom
- Proper metadata in layout

### 5. **Code Organization**

- Barrel exports in `components/index.ts`
- Logical folder structure
- DRY (Don't Repeat Yourself) principle

### 6. **Animation & UX**

- Framer Motion for smooth animations
- Sonner for elegant toast notifications
- Responsive design with Tailwind CSS

## 📦 Dependencies

### Production Dependencies

```json
{
  "framer-motion": "^11.x",
  "sonner": "^1.x",
  "lucide-react": "^0.548.0",
  "next": "16.0.0",
  "react": "19.2.0"
}
```

### To Install Missing Dependencies

```bash
npm install framer-motion sonner
```

## 🚀 Component Usage

### Using Individual Sections

```tsx
import { HeroSection, AboutSection } from "@/components";

// Or import directly
import HeroSection from "@/components/sections/HeroSection";
```

### Using UI Components

```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

## 🎨 Styling Conventions

- Uses Tailwind CSS utility classes
- Custom gradient classes: `gradient-text`, `bg-gradient-primary`, `bg-gradient-accent`
- Glass morphism effect: `glass`, `glass-card`
- Responsive breakpoints: `sm:`, `md:`, `lg:`

## 📝 Adding New Sections

1. Create new component in `src/components/sections/`
2. Follow the naming convention: `[Name]Section.tsx`
3. Add 'use client' if using hooks/interactivity
4. Export from `src/components/index.ts`
5. Import and add to `page.tsx`

Example:

```tsx
// src/components/sections/TestimonialSection.tsx
"use client";

const TestimonialSection = () => {
  return (
    <section id="testimonials" className="py-20">
      {/* Your content */}
    </section>
  );
};

export default TestimonialSection;
```

## 🔧 Customization

### Modifying Data

Edit `src/data/dummyData.ts` to update:

- Project listings
- Team members
- Features
- Statistics

### Changing Styles

All custom styles are in `src/app/globals.css`:

- Color variables
- Custom gradients
- Animation keyframes

### Adding New Types

Add to `src/types/index.ts` for type safety across the application

## ✅ Code Quality

- No TypeScript errors
- All imports properly resolved
- Follows React best practices
- Accessible components (ARIA labels where needed)
- Performance optimized with code splitting

## 🌟 Features

- ✅ Fully responsive design
- ✅ Smooth scroll animations
- ✅ Toast notifications
- ✅ Glass morphism UI
- ✅ Type-safe development
- ✅ Modular and maintainable
- ✅ Production-ready

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All sections are fully responsive and tested across devices.
