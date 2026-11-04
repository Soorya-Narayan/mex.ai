import os
import numpy as np
import scipy.interpolate as interp

os.makedirs('public/brand', exist_ok=True)
os.makedirs('public', exist_ok=True)

# Load normalized ribbon contour
norm_cnt = np.load('norm_ribbon_cnt.npy')

# Re-sample to 400 evenly spaced points
dists = np.sqrt(np.sum(np.diff(norm_cnt, axis=0, prepend=[norm_cnt[0]])**2, axis=1))
cum_dist = np.cumsum(dists)
total_len = cum_dist[-1]
u_uniform = np.linspace(0, total_len, 400)
x_interp = np.interp(u_uniform, cum_dist, norm_cnt[:, 0])
y_interp = np.interp(u_uniform, cum_dist, norm_cnt[:, 1])

# Periodic cubic B-spline
tck, _ = interp.splprep([x_interp, y_interp], s=0.0003, per=True)
u_fine = np.linspace(0, 1, 600)
xs_fine, ys_fine = interp.splev(u_fine, tck)

# Canvas: 1000 x 550
rx = 70.0
ry = 135.0
rw = 860.0
rh = 362.0

xs = rx + xs_fine * rw
ys = ry + ys_fine * rh

dot_cx = rx + rw * 0.8617
dot_cy = ry + rh * (-0.1447)
dot_r = rh * 0.1152

# Convert points to smooth SVG path with cubic beziers
step = 6
pts = list(zip(xs[::step], ys[::step]))
n = len(pts)
d_parts = [f"M {pts[0][0]:.2f} {pts[0][1]:.2f}"]
for i in range(n):
    p0 = pts[(i - 1) % n]
    p1 = pts[i]
    p2 = pts[(i + 1) % n]
    p3 = pts[(i + 2) % n]
    c1x = p1[0] + (p2[0] - p0[0]) / 6.0
    c1y = p1[1] + (p2[1] - p0[1]) / 6.0
    c2x = p2[0] - (p3[0] - p1[0]) / 6.0
    c2y = p2[1] - (p3[1] - p1[1]) / 6.0
    d_parts.append(f"C {c1x:.2f} {c1y:.2f}, {c2x:.2f} {c2y:.2f}, {p2[0]:.2f} {p2[1]:.2f}")
d_parts.append("Z")
ribbon_path_d = " ".join(d_parts)

# Crease 1 coords:
c1_top_x = rx + rw * 0.236
c1_top_y = ry + rh * 0.085
c1_bot_x = rx + rw * 0.328
c1_bot_y = ry + rh * 0.525

# Crease 2 coords:
c2_top_x = rx + rw * 0.654
c2_top_y = ry + rh * 0.085
c2_bot_x = rx + rw * 0.710
c2_bot_y = ry + rh * 0.482

# Crease 1 smooth curve:
crease1_path = (
    f"M {c1_top_x:.2f} {c1_top_y:.2f} "
    f"C {c1_top_x - 8:.2f} {(c1_top_y + c1_bot_y)/2:.2f}, {c1_bot_x - 4:.2f} {c1_bot_y - 10:.2f}, {c1_bot_x:.2f} {c1_bot_y:.2f}"
)

# Crease 2 smooth curve:
crease2_path = (
    f"M {c2_top_x:.2f} {c2_top_y:.2f} "
    f"C {c2_top_x + 12:.2f} {(c2_top_y + c2_bot_y)/2:.2f}, {c2_bot_x + 6:.2f} {c2_bot_y - 8:.2f}, {c2_bot_x:.2f} {c2_bot_y:.2f}"
)

def make_logo_svg(mode):
    if mode == 'dark':
        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 550" width="100%" height="100%" fill="none">
  <defs>
    <clipPath id="ribbonClipDark">
      <path d="{ribbon_path_d}" />
    </clipPath>
    <linearGradient id="mexGradientDark" x1="0%" y1="75%" x2="100%" y2="35%">
      <stop offset="0%" stop-color="#E81CE6"/>
      <stop offset="25%" stop-color="#8A0CF0"/>
      <stop offset="50%" stop-color="#1A2BDB"/>
      <stop offset="78%" stop-color="#1FA9F0"/>
      <stop offset="100%" stop-color="#12EEF5"/>
    </linearGradient>
  </defs>
  <g clip-path="url(#ribbonClipDark)">
    <!-- Base smooth flowing 3D ribbon -->
    <path d="{ribbon_path_d}" fill="url(#mexGradientDark)" />
    <!-- 3D fold definition lines: subtle dark depth & light rim reflection -->
    <path d="{crease1_path}" stroke="#060930" stroke-width="4.5" stroke-linecap="round" opacity="0.4" />
    <path d="{crease1_path}" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" opacity="0.3" />
    <path d="{crease2_path}" stroke="#060930" stroke-width="4.5" stroke-linecap="round" opacity="0.38" />
    <path d="{crease2_path}" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" opacity="0.32" />
  </g>
  <!-- Circular Dot -->
  <circle cx="{dot_cx:.2f}" cy="{dot_cy:.2f}" r="{dot_r:.2f}" fill="#12EEF5" />
</svg>'''
    elif mode == 'light':
        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 550" width="100%" height="100%" fill="none">
  <defs>
    <clipPath id="ribbonClipLight">
      <path d="{ribbon_path_d}" />
    </clipPath>
    <linearGradient id="mexGradientLight" x1="0%" y1="75%" x2="100%" y2="35%">
      <stop offset="0%" stop-color="#E81CE6"/>
      <stop offset="25%" stop-color="#8A0CF0"/>
      <stop offset="50%" stop-color="#1A2BDB"/>
      <stop offset="78%" stop-color="#0090D0"/>
      <stop offset="100%" stop-color="#00B8D9"/>
    </linearGradient>
  </defs>
  <g clip-path="url(#ribbonClipLight)">
    <path d="{ribbon_path_d}" fill="url(#mexGradientLight)" />
    <path d="{crease1_path}" stroke="#060930" stroke-width="4.5" stroke-linecap="round" opacity="0.38" />
    <path d="{crease1_path}" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" opacity="0.3" />
    <path d="{crease2_path}" stroke="#060930" stroke-width="4.5" stroke-linecap="round" opacity="0.35" />
    <path d="{crease2_path}" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" opacity="0.3" />
  </g>
  <circle cx="{dot_cx:.2f}" cy="{dot_cy:.2f}" r="{dot_r:.2f}" fill="#00B8D9" />
</svg>'''
    elif mode == 'white':
        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 550" width="100%" height="100%" fill="none">
  <defs>
    <clipPath id="ribbonClipWhite">
      <path d="{ribbon_path_d}" />
    </clipPath>
  </defs>
  <g clip-path="url(#ribbonClipWhite)">
    <path d="{ribbon_path_d}" fill="#FFFFFF" />
    <path d="{crease1_path}" stroke="#000000" stroke-width="4.5" stroke-linecap="round" opacity="0.22" />
    <path d="{crease2_path}" stroke="#000000" stroke-width="4.5" stroke-linecap="round" opacity="0.2" />
  </g>
  <circle cx="{dot_cx:.2f}" cy="{dot_cy:.2f}" r="{dot_r:.2f}" fill="#FFFFFF" />
</svg>'''
    elif mode == 'black':
        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 550" width="100%" height="100%" fill="none">
  <defs>
    <clipPath id="ribbonClipBlack">
      <path d="{ribbon_path_d}" />
    </clipPath>
  </defs>
  <g clip-path="url(#ribbonClipBlack)">
    <path d="{ribbon_path_d}" fill="#05050A" />
    <path d="{crease1_path}" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" opacity="0.25" />
    <path d="{crease2_path}" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" opacity="0.22" />
  </g>
  <circle cx="{dot_cx:.2f}" cy="{dot_cy:.2f}" r="{dot_r:.2f}" fill="#05050A" />
</svg>'''

for m in ['dark', 'light', 'white', 'black']:
    with open(f'public/brand/mex-logo-{m}.svg', 'w') as f:
        f.write(make_logo_svg(m))

print("Regenerated all 4 logo SVGs with exact crease definition!")

def make_lockup_svg(mode):
    logo_svg_inner = make_logo_svg(mode).split('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 550" width="100%" height="100%" fill="none">')[1].replace('</svg>', '')
    text_color = "#FFFFFF" if mode == 'dark' else "#05050A"
    sub_color = "#94A3B8" if mode == 'dark' else "#475569"
    ai_color = "#12EEF5" if mode == 'dark' else "#00B8D9"
    
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 400" width="100%" height="100%" fill="none">
  <!-- Scaled Logo Mark on the left -->
  <g transform="translate(20, -40) scale(0.85)">
    {logo_svg_inner}
  </g>
  <!-- Vertical Divider Line -->
  <line x1="840" y1="70" x2="840" y2="330" stroke="{sub_color}" stroke-width="4" stroke-linecap="round" opacity="0.4" />
  <!-- Wordmark Text -->
  <text x="890" y="215" font-family="'Space Grotesk', 'Inter', system-ui, sans-serif" font-size="130" font-weight="800" letter-spacing="4" fill="{text_color}">MEX</text>
  <text x="1220" y="215" font-family="'Space Grotesk', 'Inter', system-ui, sans-serif" font-size="130" font-weight="800" letter-spacing="4" fill="{ai_color}">AUTOMATION</text>
  <text x="895" y="295" font-family="'Inter', system-ui, sans-serif" font-size="34" font-weight="600" letter-spacing="10" fill="{sub_color}">INTELLIGENT INDUSTRIAL AI</text>
</svg>'''

with open('public/brand/mex-lockup-dark.svg', 'w') as f:
    f.write(make_lockup_svg('dark'))
with open('public/brand/mex-lockup-light.svg', 'w') as f:
    f.write(make_lockup_svg('light'))

print("Saved horizontal lockups to public/brand/")
