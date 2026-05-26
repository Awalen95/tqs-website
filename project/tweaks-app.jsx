/* global React, ReactDOM, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakToggle, useTweaks */
const { useEffect } = React;

// Each palette: [accent, accent-2, bg]. The key is the body[data-palette] selector.
const PALETTES = [
  { key: 'blackgold',   colors: ['#c9a44a', '#0a0a0a', '#faf7ef'] },
  { key: 'claynavy',    colors: ['#b9501f', '#1a2a3a', '#f4efe6'] },
  { key: 'charcoalred', colors: ['#b8362a', '#1a1a1a', '#faf7f2'] },
  { key: 'tealamber',   colors: ['#d68c3a', '#0d4f4a', '#f5f3ec'] },
  { key: 'navygold',    colors: ['#c79620', '#0a3d62', '#fbfaf6'] },
];

function paletteForKey(k) {
  return (PALETTES.find(p => p.key === k) || PALETTES[0]).colors;
}
function keyForPalette(colors) {
  const c0 = (colors && colors[0] || '').toLowerCase();
  return (PALETTES.find(p => p.colors[0].toLowerCase() === c0) || PALETTES[0]).key;
}

function TweaksApp() {
  const [t, setTweak] = useTweaks(window.TQS_TWEAKS);

  useEffect(() => {
    document.body.dataset.palette = t.palette;
    document.body.dataset.display = t.display;
    document.body.dataset.density = t.density;
    document.body.dataset.hero = t.heroLayout;
    document.body.dataset.texture = String(t.accentTexture);
    const strip = document.getElementById('strip');
    if (strip) strip.style.display = t.showStrip ? '' : 'none';
    const ba = document.getElementById('beforeAfter');
    if (ba) ba.style.display = t.showBeforeAfter ? '' : 'none';
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Brand color">
        <TweakColor
          label="Palette"
          value={paletteForKey(t.palette)}
          options={PALETTES.map(p => p.colors)}
          onChange={(arr) => setTweak('palette', keyForPalette(arr))}
        />
      </TweakSection>

      <TweakSection title="Layout">
        <TweakRadio
          label="Hero"
          value={t.heroLayout}
          options={[
            { value: 'split', label: 'Split' },
            { value: 'stack', label: 'Stack' },
          ]}
          onChange={(v) => setTweak('heroLayout', v)}
        />
        <TweakRadio
          label="Spacing"
          value={t.density}
          options={[
            { value: 'compact',     label: 'Compact' },
            { value: 'comfortable', label: 'Comfy' },
            { value: 'spacious',    label: 'Roomy' },
          ]}
          onChange={(v) => setTweak('density', v)}
        />
      </TweakSection>

      <TweakSection title="Modules">
        <TweakToggle
          label="Before/after slider"
          value={t.showBeforeAfter}
          onChange={(v) => setTweak('showBeforeAfter', v)}
        />
        <TweakToggle
          label="Marquee strip"
          value={t.showStrip}
          onChange={(v) => setTweak('showStrip', v)}
        />
        <TweakToggle
          label="Grid texture"
          value={t.accentTexture}
          onChange={(v) => setTweak('accentTexture', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const __tqsMount = document.createElement('div');
document.body.appendChild(__tqsMount);
ReactDOM.createRoot(__tqsMount).render(<TweaksApp />);
