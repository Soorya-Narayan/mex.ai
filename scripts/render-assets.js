const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

async function renderAssets() {
  const brandDir = path.join(__dirname, '../public/brand');
  const publicDir = path.join(__dirname, '../public');

  if (!fs.existsSync(brandDir)) fs.mkdirSync(brandDir, { recursive: true });

  const modes = ['dark', 'light', 'white', 'black'];
  const widths = [512, 1024, 2048];

  console.log('Rendering high-res transparent logo PNGs...');
  for (const mode of modes) {
    const svgPath = path.join(brandDir, `mex-logo-${mode}.svg`);
    if (!fs.existsSync(svgPath)) {
      console.error(`Missing SVG: ${svgPath}`);
      continue;
    }

    for (const w of widths) {
      const outPath = path.join(brandDir, `mex-logo-${mode}-${w}.png`);
      await sharp(svgPath)
        .resize({ width: w })
        .png()
        .toFile(outPath);
      console.log(`  Created: ${outPath} (${w}px)`);
    }
  }

  console.log('Rendering favicons...');
  const darkLogoSvg = path.join(brandDir, 'mex-logo-dark.svg');

  // Square favicon padded helper
  async function makeSquareIcon(size, outPath, bgColor = null) {
    const pad = Math.round(size * 0.1);
    const innerSize = size - pad * 2;
    const inner = await sharp(darkLogoSvg)
      .resize({ width: innerSize, fit: 'contain' })
      .toBuffer();

    let base = sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: bgColor ? bgColor : { r: 0, g: 0, b: 0, alpha: 0 }
      }
    });

    await base
      .composite([{ input: inner, gravity: 'center' }])
      .png()
      .toFile(outPath);
    console.log(`  Created: ${outPath} (${size}x${size})`);
  }

  // Favicon PNG sizes
  await makeSquareIcon(16, path.join(publicDir, 'favicon-16x16.png'));
  await makeSquareIcon(32, path.join(publicDir, 'favicon-32x32.png'));
  await makeSquareIcon(48, path.join(publicDir, 'favicon-48x48.png'));
  await makeSquareIcon(180, path.join(publicDir, 'apple-touch-icon.png'));
  await makeSquareIcon(192, path.join(publicDir, 'icon-192.png'));
  await makeSquareIcon(512, path.join(publicDir, 'icon-512.png'));
  await makeSquareIcon(512, path.join(publicDir, 'favicon-transparent.png'));
  await makeSquareIcon(512, path.join(publicDir, 'favicon-dark.png'), '#05050A');

  // Generate multi-resolution ICO file using python PIL
  execSync(`python3 -c "
from PIL import Image
img16 = Image.open('public/favicon-16x16.png')
img32 = Image.open('public/favicon-32x32.png')
img48 = Image.open('public/favicon-48x48.png')
img48.save('public/favicon.ico', format='ICO', append_images=[img32, img16])
print('Saved public/favicon.ico with 16, 32, 48 sizes!')
"`, { stdio: 'inherit' });

  // Web manifest
  const manifest = {
    name: "MEX Automation",
    short_name: "MEX AI",
    description: "Intelligent Industrial Automation & AI Solutions",
    start_url: "/",
    display: "standalone",
    background_color: "#05050A",
    theme_color: "#05050A",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Saved public/site.webmanifest');

  // Create preview test page to check contrast on Pure White (#FFFFFF), Pure Black (#000000), Mid Grey (#808080)
  const previewHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MEX Brand Assets Quality Assurance & Preview</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 40px; background: #1a1a24; color: #f1f5f9; }
    h1 { font-size: 28px; margin-bottom: 8px; }
    p { color: #94a3b8; margin-bottom: 30px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
    .card { border-radius: 12px; padding: 24px; border: 1px solid rgba(255,255,255,0.1); }
    .card.white { background: #FFFFFF; color: #000000; }
    .card.grey { background: #808080; color: #FFFFFF; }
    .card.black { background: #000000; color: #FFFFFF; }
    .label { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; opacity: 0.8; }
    .logo-img { width: 100%; height: auto; display: block; margin-bottom: 16px; }
    .section-title { font-size: 20px; font-weight: 700; margin: 30px 0 15px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
    .row { display: flex; gap: 16px; align-items: center; margin-bottom: 16px; }
  </style>
</head>
<body>
  <h1>MEX Automation Brand Assets Verification</h1>
  <p>Testing SVGs and PNGs across Pure White (#FFFFFF), Mid Grey (#808080), and Pure Black (#000000) backgrounds to verify zero fringe, halo, or contrast loss.</p>

  <div class="section-title">1. Dark-Mode Logo (mex-logo-dark.svg)</div>
  <div class="grid">
    <div class="card white"><div class="label">On Pure White (#FFF)</div><img src="/brand/mex-logo-dark.svg" class="logo-img" /></div>
    <div class="card grey"><div class="label">On Mid Grey (#808080)</div><img src="/brand/mex-logo-dark.svg" class="logo-img" /></div>
    <div class="card black"><div class="label">On Pure Black (#000)</div><img src="/brand/mex-logo-dark.svg" class="logo-img" /></div>
  </div>

  <div class="section-title">2. Light-Mode Logo (mex-logo-light.svg)</div>
  <div class="grid">
    <div class="card white"><div class="label">On Pure White (#FFF)</div><img src="/brand/mex-logo-light.svg" class="logo-img" /></div>
    <div class="card grey"><div class="label">On Mid Grey (#808080)</div><img src="/brand/mex-logo-light.svg" class="logo-img" /></div>
    <div class="card black"><div class="label">On Pure Black (#000)</div><img src="/brand/mex-logo-light.svg" class="logo-img" /></div>
  </div>

  <div class="section-title">3. Monochrome White Logo (mex-logo-white.svg)</div>
  <div class="grid">
    <div class="card white"><div class="label">On Pure White (#FFF)</div><img src="/brand/mex-logo-white.svg" class="logo-img" /></div>
    <div class="card grey"><div class="label">On Mid Grey (#808080)</div><img src="/brand/mex-logo-white.svg" class="logo-img" /></div>
    <div class="card black"><div class="label">On Pure Black (#000)</div><img src="/brand/mex-logo-white.svg" class="logo-img" /></div>
  </div>

  <div class="section-title">4. Monochrome Dark Logo (mex-logo-black.svg)</div>
  <div class="grid">
    <div class="card white"><div class="label">On Pure White (#FFF)</div><img src="/brand/mex-logo-black.svg" class="logo-img" /></div>
    <div class="card grey"><div class="label">On Mid Grey (#808080)</div><img src="/brand/mex-logo-black.svg" class="logo-img" /></div>
    <div class="card black"><div class="label">On Pure Black (#000)</div><img src="/brand/mex-logo-black.svg" class="logo-img" /></div>
  </div>

  <div class="section-title">5. Header Horizontal Lockup (40px)</div>
  <div class="grid">
    <div class="card black"><div class="label">Dark Lockup on Black</div><img src="/brand/mex-lockup-dark.svg" style="height: 40px; width: auto;" /></div>
    <div class="card white"><div class="label">Light Lockup on White</div><img src="/brand/mex-lockup-light.svg" style="height: 40px; width: auto;" /></div>
    <div class="card grey"><div class="label">Dark Lockup on Grey</div><img src="/brand/mex-lockup-dark.svg" style="height: 40px; width: auto;" /></div>
  </div>

  <div class="section-title">6. Favicon App Icons</div>
  <div class="row">
    <img src="/favicon-16x16.png" style="width: 16px; height: 16px; background: #05050A; padding: 4px; border-radius: 4px;" title="16x16" />
    <img src="/favicon-32x32.png" style="width: 32px; height: 32px; background: #05050A; padding: 4px; border-radius: 6px;" title="32x32" />
    <img src="/favicon-48x48.png" style="width: 48px; height: 48px; background: #05050A; padding: 4px; border-radius: 8px;" title="48x48" />
    <img src="/apple-touch-icon.png" style="width: 64px; height: 64px; background: #05050A; border-radius: 12px;" title="apple-touch-icon" />
    <img src="/icon-192.png" style="width: 64px; height: 64px; border-radius: 12px;" title="icon-192" />
    <img src="/icon-512.png" style="width: 64px; height: 64px; border-radius: 12px;" title="icon-512" />
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(publicDir, 'brand-preview.html'), previewHtml);
  console.log('Saved public/brand-preview.html');
}

renderAssets().catch(err => {
  console.error(err);
  process.exit(1);
});

