# Panduan Integrasi Komponen 3D Lanyard Interactive

Panduan lengkap untuk mengekstrak dan mengintegrasikan komponen lanyard 3D interactive ke landing page Anda sendiri.

---

## 📋 Ringkasan Komponen

Komponen lanyard terdiri dari 3 bagian utama:

1. **Lanyard** - Visualisasi 3D lanyard menggunakan React Three Fiber
2. **Personalization Form** - Form input nama dan pilihan tema (dark/light)
3. **Card Template** - Generator tekstur card yang menampilkan nama user

---

## 🎯 Komponen yang Perlu Diekstrak

### 1. Komponen Utama

```
components/
├── lanyard-with-controls.tsx    # Komponen wrapper utama
├── card-template.tsx             # Generator tekstur card
└── ui/
    └── lanyard.tsx               # Komponen 3D lanyard
```

### 2. UI Components (shadcn/ui)

```
components/ui/
├── button.tsx
└── tooltip.tsx
```

### 3. Assets

```
public/
├── card.glb                      # 3D model lanyard
├── card-base-dark.png            # Base texture card (dark theme)
├── card-base-light.png           # Base texture card (light theme)
└── lanyard.png                   # Tekstur tali lanyard
```

Anda juga membutuhkan file texture lanyard dari:
```
components/ui/lanyard.png
```

### 4. Utility Functions

Dari [`lib/utils.ts`](file:///d:/project/custom-3-d-lanyard/lib/utils.ts), Anda membutuhkan:
- `encryptLanyardData()` - Untuk share URL functionality
- `decryptLanyardData()` - Untuk membaca URL params
- `cn()` - Class name utility (dari clsx + tailwind-merge)

---

## 📦 Dependencies yang Dibutuhkan

### Core Dependencies

```json
{
  "@react-three/fiber": "^9.5.0",
  "@react-three/drei": "^10.7.7",
  "@react-three/rapier": "^2.2.0",
  "three": "^0.167.1",
  "meshline": "^3.3.1"
}
```

### UI Dependencies (shadcn/ui)

```json
{
  "@radix-ui/react-tooltip": "^1.1.6",
  "@radix-ui/react-slot": "^1.1.1",
  "lucide-react": "^0.454.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.3.1"
}
```

### Install Dependencies

```bash
npm install @react-three/fiber @react-three/drei @react-three/rapier three meshline
npm install @radix-ui/react-tooltip @radix-ui/react-slot lucide-react
npm install class-variance-authority clsx tailwind-merge
```

---

## 🏗️ Best Practices untuk Integrasi

### Pendekatan 1: Copy Langsung (Quickest)

> [!TIP]
> **Cocok untuk:** Jika Anda ingin hasil cepat dan tidak perlu banyak kustomisasi

**Langkah-langkah:**

1. **Copy semua file komponen** ke project Anda dengan struktur yang sama
2. **Copy semua assets** ke folder `public/`
3. **Install dependencies** yang dibutuhkan
4. **Import dan gunakan** `LanyardWithControls` di landing page Anda

**Contoh implementasi:**

```tsx
// app/page.tsx atau pages/index.tsx
import LanyardWithControls from '@/components/lanyard-with-controls';

export default function Home() {
  return (
    <section className="relative min-h-screen">
      {/* Hero Content */}
      <div className="container mx-auto px-6">
        <h1>Welcome to My Landing Page</h1>
        <p>Some description...</p>
      </div>

      {/* Lanyard Component */}
      <LanyardWithControls
        position={[0, 0, 20]}
        containerClassName="absolute top-0 right-0 w-1/2 h-screen"
        defaultName=""
        defaultVariant="dark"
      />
    </section>
  );
}
```

---

### Pendekatan 2: Modular Extraction (Recommended)

> [!IMPORTANT]
> **Cocok untuk:** Jika Anda ingin kontrol lebih besar dan kemungkinan kustomisasi

**Langkah-langkah:**

#### Step 1: Buat Folder Structure

```
your-project/
├── components/
│   ├── lanyard/
│   │   ├── index.tsx              # LanyardWithControls (rename)
│   │   ├── lanyard-3d.tsx         # Lanyard component
│   │   ├── card-template.tsx      # CardTemplate
│   │   └── lanyard.png            # Texture
│   └── ui/
│       ├── button.tsx
│       └── tooltip.tsx
├── public/
│   ├── card.glb
│   ├── card-base-dark.png
│   └── card-base-light.png
└── lib/
    └── utils.ts
```

#### Step 2: Extract dan Refactor Komponen

**File: `components/lanyard/index.tsx`**

```tsx
"use client";

import { useState, useRef, useCallback } from "react";
import Lanyard3D from "./lanyard-3d";
import CardTemplate from "./card-template";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Download } from "lucide-react";

interface LanyardInteractiveProps {
  position?: [number, number, number];
  containerClassName?: string;
  defaultName?: string;
  defaultVariant?: "dark" | "light";
  // Tambahkan props sesuai kebutuhan
  showShareButtons?: boolean;
  showExport?: boolean;
}

export default function LanyardInteractive({
  position = [0, 0, 20],
  containerClassName,
  defaultName = "",
  defaultVariant = "dark",
  showShareButtons = false,
  showExport = true,
}: LanyardInteractiveProps) {
  // Copy logic dari lanyard-with-controls.tsx
  // ... (state management, handlers, etc.)
  
  return (
    <div className="flex flex-col">
      <CardTemplate
        ref={cardTemplateRef}
        userName={inputValue}
        variant={cardVariant}
        onTextureReady={handleTextureReady}
      />
      <Lanyard3D
        key={textureKey}
        position={position}
        containerClassName={containerClassName}
        cardTextureUrl={cardTextureUrl}
      />
      {/* Personalization Form */}
      <div className="px-6 pb-8">
        {/* Form controls */}
      </div>
    </div>
  );
}
```

#### Step 3: Konfigurasi Props untuk Fleksibilitas

Tambahkan props untuk kontrol yang lebih granular:

```tsx
interface LanyardInteractiveConfig {
  // Visual
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  
  // Content
  defaultName?: string;
  defaultVariant?: "dark" | "light";
  city?: string;
  date?: string;
  
  // Features
  showPersonalization?: boolean;
  showExport?: boolean;
  showShare?: boolean;
  
  // Styling
  containerClassName?: string;
  formClassName?: string;
  
  // Callbacks
  onNameChange?: (name: string) => void;
  onExport?: () => void;
}
```

---

### Pendekatan 3: Decoupled Components (Most Flexible)

> [!NOTE]
> **Cocok untuk:** Jika Anda ingin kontrol penuh dan menggunakan lanyard/form secara terpisah

Pisahkan komponen menjadi 3 bagian independen:

```tsx
// components/lanyard/lanyard-viewer.tsx
// Hanya render 3D lanyard, tanpa form
export function LanyardViewer({ textureUrl, ... }) {
  return <Lanyard3D cardTextureUrl={textureUrl} />;
}

// components/lanyard/lanyard-form.tsx  
// Hanya form personalization
export function LanyardForm({ onApply, ... }) {
  return (
    <div className="personalization-form">
      {/* Input fields */}
    </div>
  );
}

// components/lanyard/lanyard-interactive.tsx
// Orchestrator yang menggabungkan keduanya
export function LanyardInteractive() {
  return (
    <>
      <LanyardViewer textureUrl={texture} />
      <LanyardForm onApply={handleApply} />
    </>
  );
}
```

**Keuntungan:**
- ✅ Bisa pakai lanyard viewer saja tanpa form
- ✅ Bisa pakai form untuk generate texture lain
- ✅ Lebih mudah di-test dan maintain
- ✅ Reusable di berbagai tempat

---

## 🎨 Contoh Integrasi di Landing Page

### Layout Grid (Desktop)

```tsx
<section className="lg:h-screen">
  <div className="lg:grid lg:grid-cols-2">
    {/* Left: Content */}
    <div className="px-6 py-12">
      <h1>Your Event Title</h1>
      <p>Description...</p>
      <Button>Register Now</Button>
    </div>
    
    {/* Right: Lanyard */}
    <LanyardInteractive
      containerClassName="relative w-full h-screen"
      defaultVariant="dark"
    />
  </div>
</section>
```

### Floating Overlay

```tsx
<section className="relative min-h-screen">
  {/* Background content */}
  <div className="relative z-10">
    <h1>Your Content</h1>
  </div>
  
  {/* Floating Lanyard */}
  <LanyardInteractive
    containerClassName="absolute inset-0 z-0 pointer-events-none"
    position={[5, 0, 25]}
  />
</section>
```

### Fullscreen Section

```tsx
<section className="h-screen flex items-center justify-center">
  <LanyardInteractive
    containerClassName="w-full h-full"
    showPersonalization={true}
  />
</section>
```

---

## ⚙️ Opsi Kustomisasi

### 1. Mengubah Tampilan Card

Edit [`card-template.tsx`](file:///d:/project/custom-3-d-lanyard/components/card-template.tsx):

```tsx
// Ubah font
ctx.font = 'normal 48px "Your Font", monospace';

// Ubah posisi text
const textX = (CANVAS_SIZE / 2) - 55; // Adjust X position
const textY = CANVAS_SIZE - 400;      // Adjust Y position

// Ubah warna text
const textColor = variant === "dark" ? "#ffffff" : "#000000";

// Tambah logo atau graphic
const logo = new Image();
logo.src = "/your-logo.png";
ctx.drawImage(logo, x, y, width, height);
```

### 2. Mengubah Fisika 3D

Edit [`lanyard.tsx`](file:///d:/project/custom-3-d-lanyard/components/ui/lanyard.tsx):

```tsx
// Ubah gravitasi
gravity={[0, -40, 0]} // Nilai negatif = ke bawah

// Ubah damping (kecepatan gerakan)
angularDamping={4}  // Lebih tinggi = lebih lambat
linearDamping={4}

// Ubah posisi camera
position={[0, 0, 20]}  // [x, y, z]
fov={20}               // Field of view
```

### 3. Custom Base Card Images

Buat custom card design Anda sendiri:

1. Buat design card di Figma/Photoshop dengan dimensi **1376x1376px**
2. Export sebagai PNG dengan nama `card-base-dark.png` dan `card-base-light.png`
3. Letakkan di folder `public/`
4. Pastikan ada space untuk text nama (biasanya di bagian bawah)

> [!WARNING]
> **Penting:** Card template akan render text di koordinat yang sudah ditentukan. Sesuaikan posisi text di `card-template.tsx` jika layout card Anda berbeda.

### 4. Disable Fitur yang Tidak Diperlukan

```tsx
<LanyardInteractive
  showExport={false}        // Hilangkan tombol export
  showShare={false}         // Hilangkan tombol share
  showPersonalization={true} // Tetap tampilkan form
/>
```

---

## 🔧 Troubleshooting

### Issue: "Cannot find module '@react-three/fiber'"

**Solusi:**
```bash
npm install @react-three/fiber @react-three/drei @react-three/rapier three
```

### Issue: 3D model tidak muncul

**Checklist:**
- ✅ File `card.glb` ada di `public/`
- ✅ Path import benar: `/card.glb` (dengan slash di depan)
- ✅ Browser support WebGL (cek di chrome://gpu)

### Issue: Texture card tidak muncul

**Checklist:**
- ✅ File `card-base-dark.png` dan `card-base-light.png` ada di `public/`
- ✅ `CardTemplate` component sudah di-render (meski hidden)
- ✅ `onTextureReady` callback dipanggil dengan benar

### Issue: Performance lambat di mobile

**Solusi:**
```tsx
// Reduce physics calculation
timeStep={isMobile ? 1 / 30 : 1 / 60}

// Lower resolution
dpr={[1, isMobile ? 1.5 : 2]}

// Disable expensive effects
clearcoat={isMobile ? 0 : 1}
```

---

## 📱 Responsive Considerations

### Mobile Layout

```tsx
<div className="lg:grid lg:grid-cols-2">
  {/* Stack vertically on mobile */}
  <div className="order-2 lg:order-1">
    {/* Content */}
  </div>
  <div className="order-1 lg:order-2 h-[60vh] lg:h-screen">
    {/* Lanyard - reduced height on mobile */}
  </div>
</div>
```

### Touch Interactions

Component sudah support touch drag untuk mobile. Pastikan container tidak memiliki `pointer-events: none` di mobile.

---

## 🚀 Optimization Tips

### 1. Lazy Load 3D Components

```tsx
import dynamic from 'next/dynamic';

const LanyardInteractive = dynamic(
  () => import('@/components/lanyard'),
  { 
    ssr: false, // Disable SSR untuk Three.js
    loading: () => <LoadingSpinner />
  }
);
```

### 2. Preload Assets

```tsx
// app/layout.tsx atau _document.tsx
<link rel="preload" href="/card.glb" as="fetch" crossOrigin="anonymous" />
<link rel="preload" href="/card-base-dark.png" as="image" />
```

### 3. Optimize Textures

- Compress PNG dengan tools seperti TinyPNG
- Gunakan WebP untuk browser modern
- Pertimbangkan lazy loading untuk texture

---

## 📝 Summary Checklist

- [ ] Copy 3 komponen utama (lanyard-with-controls, lanyard, card-template)
- [ ] Copy UI components (button, tooltip)
- [ ] Copy 4 assets (card.glb, 2x card-base PNG, lanyard.png)
- [ ] Install semua dependencies
- [ ] Setup utility functions (encryptLanyardData, cn, dll)
- [ ] Import dan test di landing page
- [ ] Customize sesuai branding (warna, font, logo)
- [ ] Test responsive di mobile
- [ ] Optimize performance

---

## 💡 Tips Tambahan

1. **Gunakan TypeScript** - Semua komponen sudah di-type dengan baik
2. **Version Control** - Commit setelah setiap langkah integrasi
3. **Testing** - Test di berbagai browser (Chrome, Safari, Firefox)
4. **Accessibility** - Tambahkan aria-labels untuk button dan interactive elements
5. **Error Boundaries** - Wrap 3D component dengan error boundary untuk handle WebGL issues

---

**Selamat mengintegrasikan! 🎉**

Jika ada pertanyaan lebih lanjut tentang kustomisasi atau troubleshooting, jangan ragu untuk bertanya.
