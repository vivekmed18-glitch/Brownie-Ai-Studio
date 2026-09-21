import { CaptionStyle, Word, AIHook, ThumbnailConcept } from '../types/studio';

export const CAPTION_STYLES: CaptionStyle[] = [
  // ==========================================
  // 1. POPULAR (Top Creator Standards)
  // ==========================================
  {
    id: 'hormozi-bold',
    name: 'Hormozi Bold',
    category: 'Popular',
    fontFamily: 'Impact, Montserrat, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#22C55E',
    strokeColor: '#000000',
    strokeWidth: 6,
    textTransform: 'uppercase',
    animationStyle: 'bounce',
    fontSize: 38,
    positionY: 70,
    badgeText: 'VIRAL',
    showEmoji: true,
    posterUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    description: 'Alex Hormozi style: Thick black outlines, neon green spoken word pop & auto emojis.'
  },
  {
    id: 'mrbeast-pop',
    name: 'MrBeast Pop',
    category: 'Popular',
    fontFamily: 'Montserrat, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#FACC15',
    strokeColor: '#000000',
    strokeWidth: 5,
    shadow: '0 4px 16px rgba(250,204,21,0.6)',
    textTransform: 'uppercase',
    animationStyle: 'bounce',
    fontSize: 36,
    positionY: 68,
    badgeText: 'HOT',
    showEmoji: true,
    posterUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    description: 'MrBeast style: Bright yellow glowing active word pop with energetic auto emojis.'
  },
  {
    id: 'agent-story',
    name: 'Agent Story',
    category: 'Popular',
    fontFamily: 'Black Han Sans, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#FACC15',
    backgroundColor: '#000000B3',
    textTransform: 'uppercase',
    strokeColor: '#000000',
    strokeWidth: 4,
    animationStyle: 'box',
    fontSize: 34,
    positionY: 72,
    badgeText: 'TRENDING',
    posterUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    description: 'Big yellow headlines, outlined box highlights, glowing spoken words.'
  },
  {
    id: 'reach-counter',
    name: 'Reach Counter',
    category: 'Popular',
    fontFamily: 'Inter, sans-serif',
    primaryColor: '#F8FAFC',
    highlightColor: '#10B981',
    backgroundColor: '#0F172AE6',
    textTransform: 'none',
    shadow: '0 4px 14px rgba(16,185,129,0.4)',
    animationStyle: 'karaoke',
    fontSize: 30,
    positionY: 76,
    badgeText: 'NEW',
    posterUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
    description: 'Clean modern stat highlight with popping green metrics.'
  },
  {
    id: 'magenta-estate',
    name: 'Magenta Pulse',
    category: 'Popular',
    fontFamily: 'Poppins, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#EC4899',
    strokeColor: '#000000',
    strokeWidth: 3,
    animationStyle: 'bounce',
    fontSize: 34,
    positionY: 68,
    badgeText: 'POPULAR',
    posterUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    description: 'Energetic magenta pulse with bouncy dynamic word entrance.'
  },
  {
    id: 'yellow-box',
    name: 'Yellow Box Highlight',
    category: 'Popular',
    fontFamily: 'Montserrat, sans-serif',
    primaryColor: '#000000',
    highlightColor: '#000000',
    backgroundColor: '#FACC15',
    textTransform: 'uppercase',
    animationStyle: 'box',
    fontSize: 32,
    positionY: 70,
    posterUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop',
    description: 'High-visibility black text on vibrant yellow box background.'
  },
  {
    id: 'sprayline-v2',
    name: 'Sprayline Vibrant',
    category: 'Popular',
    fontFamily: 'Permanent Marker, cursive',
    primaryColor: '#FFFFFF',
    highlightColor: '#38BDF8',
    strokeColor: '#000000',
    strokeWidth: 4,
    animationStyle: 'bounce',
    fontSize: 36,
    positionY: 74,
    posterUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    description: 'Graffiti spray kinetic motion with sharp cyan emphasis.'
  },
  {
    id: 'ghostline-v2',
    name: 'Ghostline Fade',
    category: 'Popular',
    fontFamily: 'Space Grotesk, sans-serif',
    primaryColor: '#94A3B8',
    highlightColor: '#FFFFFF',
    animationStyle: 'karaoke',
    fontSize: 30,
    positionY: 78,
    posterUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop',
    description: 'Minimal translucent text with smooth white active word reveal.'
  },
  {
    id: 'golden-hour-v2',
    name: 'Golden Hour Glow',
    category: 'Popular',
    fontFamily: 'Playfair Display, serif',
    primaryColor: '#FEF08A',
    highlightColor: '#F59E0B',
    shadow: '0 0 25px rgba(245,158,11,0.8)',
    animationStyle: 'glow',
    fontSize: 32,
    positionY: 75,
    posterUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
    description: 'Warm sunset gold lighting aesthetics for atmospheric reels.'
  },
  {
    id: 'sunburst-v3',
    name: 'Sunburst Flash',
    category: 'Popular',
    fontFamily: 'Bangers, cursive',
    primaryColor: '#FFFFFF',
    highlightColor: '#F97316',
    strokeColor: '#000000',
    strokeWidth: 5,
    animationStyle: 'bounce',
    fontSize: 38,
    positionY: 66,
    posterUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop',
    description: 'Explosive orange sunburst pop effect for high-energy hooks.'
  },
  {
    id: 'lime-swipe-v3',
    name: 'Lime Swipe',
    category: 'Popular',
    fontFamily: 'Oswald, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#84CC16',
    backgroundColor: '#1E293BE6',
    textTransform: 'uppercase',
    animationStyle: 'box',
    fontSize: 32,
    positionY: 72,
    posterUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    description: 'Electric lime green highlight swipe with dark backdrop.'
  },
  {
    id: 'crimson-v2',
    name: 'Crimson Pulse',
    category: 'Popular',
    fontFamily: 'Black Han Sans, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#EF4444',
    strokeColor: '#000000',
    strokeWidth: 4,
    animationStyle: 'bounce',
    fontSize: 36,
    positionY: 70,
    posterUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    description: 'Bold red headline pop built for dramatic commentary.'
  },

  // ==========================================
  // 2. BEHIND THE PERSON (Moonshot 3D Depth AI)
  // ==========================================
  {
    id: 'years-into-editing',
    name: 'Years Into Editing',
    category: 'Behind the Person',
    fontFamily: 'Playfair Display, serif',
    primaryColor: '#E2E8F0',
    highlightColor: '#F59E0B',
    textTransform: 'capitalize',
    animationStyle: 'behind-depth',
    fontSize: 44,
    positionY: 48,
    posterUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    badgeText: 'TRENDING',
    description: '3D Serif depth typography floating behind speaker silhouette.'
  },
  {
    id: 'your-ideas',
    name: 'Your Ideas Gold',
    category: 'Behind the Person',
    fontFamily: 'Playfair Display, serif',
    primaryColor: '#FDE047',
    highlightColor: '#FFFFFF',
    textTransform: 'lowercase',
    animationStyle: 'behind-depth',
    fontSize: 46,
    positionY: 45,
    posterUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    badgeText: 'PRO AI',
    description: 'Golden script serif floating elegantly behind speaker.'
  },
  {
    id: 'before-studio',
    name: 'Before Studio Dark',
    category: 'Behind the Person',
    fontFamily: 'Black Han Sans, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#F59E0B',
    textTransform: 'lowercase',
    animationStyle: 'behind-depth',
    fontSize: 48,
    positionY: 40,
    posterUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop',
    badgeText: 'PRO AI',
    description: 'Bold white backdrop text placed behind head and shoulders.'
  },
  {
    id: 'depth-the-one',
    name: 'The One Depth',
    category: 'Behind the Person',
    fontFamily: 'Space Grotesk, sans-serif',
    primaryColor: '#F8FAFC',
    highlightColor: '#38BDF8',
    textTransform: 'lowercase',
    animationStyle: 'behind-depth',
    fontSize: 42,
    positionY: 52,
    posterUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
    badgeText: 'PRO AI',
    description: 'Modern clean sans backdrop placed behind talking head.'
  },
  {
    id: 'point-strong',
    name: 'Point Strong Red',
    category: 'Behind the Person',
    fontFamily: 'Playfair Display, serif',
    primaryColor: '#EF4444',
    highlightColor: '#FFFFFF',
    textTransform: 'uppercase',
    animationStyle: 'behind-depth',
    fontSize: 50,
    positionY: 38,
    badgeText: 'PRO AI',
    description: 'Vivid crimson 3D title rendering behind background subject.'
  },
  {
    id: 'choice-bright',
    name: 'Choice Bright Neon',
    category: 'Behind the Person',
    fontFamily: 'Oswald, sans-serif',
    primaryColor: '#84CC16',
    highlightColor: '#FFFFFF',
    textTransform: 'uppercase',
    animationStyle: 'behind-depth',
    fontSize: 52,
    positionY: 35,
    badgeText: 'PRO AI',
    description: 'Neon lime giant background text behind head cutout.'
  },
  {
    id: 'depth-makes-a',
    name: 'Depth Makes A Point',
    category: 'Behind the Person',
    fontFamily: 'Montserrat, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#E2E8F0',
    textTransform: 'uppercase',
    animationStyle: 'behind-depth',
    fontSize: 44,
    positionY: 46,
    badgeText: 'PRO AI',
    description: 'Clean architectural backdrop text layered behind speaker.'
  },
  {
    id: 'the-clearest-idea',
    name: 'The Clearest Idea',
    category: 'Behind the Person',
    fontFamily: 'Black Han Sans, sans-serif',
    primaryColor: '#FACC15',
    highlightColor: '#FFFFFF',
    textTransform: 'uppercase',
    animationStyle: 'behind-depth',
    fontSize: 48,
    positionY: 42,
    badgeText: 'PRO AI',
    description: 'Yellow titan depth headline rendered behind talking subject.'
  },
  {
    id: 'fastest-way-gold',
    name: 'Fastest Way Gold',
    category: 'Behind the Person',
    fontFamily: 'Playfair Display, serif',
    primaryColor: '#EAB308',
    highlightColor: '#FFFFFF',
    textTransform: 'capitalize',
    animationStyle: 'behind-depth',
    fontSize: 46,
    positionY: 44,
    badgeText: 'PRO AI',
    description: 'Luxury gold script backdrop floating behind speaker.'
  },
  {
    id: 'well-dressed-man',
    name: 'Well Dressed Man',
    category: 'Behind the Person',
    fontFamily: 'Space Grotesk, sans-serif',
    primaryColor: '#CBD5E1',
    highlightColor: '#38BDF8',
    animationStyle: 'behind-depth',
    fontSize: 38,
    positionY: 50,
    badgeText: 'PRO AI',
    description: 'Chic modern metallic depth title behind person.'
  },

  // ==========================================
  // 3. PLAYFUL (Animated Curves & Cursive)
  // ==========================================
  {
    id: 'play-gatekeeping',
    name: 'Blue Gatekeeping Cursive',
    category: 'Playful',
    fontFamily: 'Permanent Marker, cursive',
    primaryColor: '#38BDF8',
    highlightColor: '#F472B6',
    animationStyle: 'bounce',
    fontSize: 36,
    positionY: 65,
    badgeText: 'PLAYFUL',
    description: 'Handwritten organic cursive popping with vibrant blue ink.'
  },
  {
    id: 'play-cut-out',
    name: 'Pink Cut Out Bold',
    category: 'Playful',
    fontFamily: 'Bangers, cursive',
    primaryColor: '#EC4899',
    highlightColor: '#FACC15',
    strokeColor: '#000000',
    strokeWidth: 4,
    animationStyle: 'box',
    fontSize: 40,
    positionY: 62,
    description: 'Playful pink block text with yellow active highlights.'
  },
  {
    id: 'play-key-orange',
    name: 'Key Orange Header',
    category: 'Playful',
    fontFamily: 'Righteous, cursive',
    primaryColor: '#F97316',
    highlightColor: '#FFFFFF',
    strokeColor: '#000000',
    strokeWidth: 3,
    animationStyle: 'bounce',
    fontSize: 42,
    positionY: 60,
    description: 'Juicy 3D orange title text popping around speaker.'
  },
  {
    id: 'play-typography',
    name: 'Typography Cursive',
    category: 'Playful',
    fontFamily: 'Permanent Marker, cursive',
    primaryColor: '#2563EB',
    highlightColor: '#60A5FA',
    animationStyle: 'bounce',
    fontSize: 38,
    positionY: 64,
    description: 'Smooth calligraphic brush style with blue highlights.'
  },
  {
    id: 'play-turn-up',
    name: 'Turn Up Microphone',
    category: 'Playful',
    fontFamily: 'Space Grotesk, sans-serif',
    primaryColor: '#84CC16',
    highlightColor: '#FDE047',
    animationStyle: 'karaoke',
    fontSize: 34,
    positionY: 70,
    description: 'Playful podcast mic captions with glowing green words.'
  },

  // ==========================================
  // 4. MULTILINE (Multi-sentence Chunks)
  // ==========================================
  {
    id: 'multiline-aura',
    name: 'Multiline Aura',
    category: 'Multiline',
    fontFamily: 'Poppins, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#38BDF8',
    shadow: '0px 0px 20px rgba(56, 189, 248, 0.8)',
    animationStyle: 'multiline',
    fontSize: 28,
    positionY: 75,
    badgeText: 'NEW',
    description: 'Multi-line fluid text block with smooth aura gradient glows.'
  },
  {
    id: 'ml-redline',
    name: 'Redline Multiline',
    category: 'Multiline',
    fontFamily: 'Oswald, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#EF4444',
    backgroundColor: '#18181BE6',
    textTransform: 'uppercase',
    animationStyle: 'multiline',
    fontSize: 30,
    positionY: 72,
    description: 'Two-line high retention subtitle block for fast talkers.'
  },
  {
    id: 'ml-scribble',
    name: 'Scribble Multiline',
    category: 'Multiline',
    fontFamily: 'Permanent Marker, cursive',
    primaryColor: '#FDE047',
    highlightColor: '#38BDF8',
    animationStyle: 'multiline',
    fontSize: 28,
    positionY: 76,
    description: 'Creative multi-line handwritten notes layout.'
  },
  {
    id: 'ml-blockbuster',
    name: 'Blockbuster Multiline',
    category: 'Multiline',
    fontFamily: 'Black Han Sans, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#F59E0B',
    backgroundColor: '#0F172AF0',
    textTransform: 'uppercase',
    animationStyle: 'multiline',
    fontSize: 32,
    positionY: 70,
    description: 'Movie-trailer style heavy dual-line subtitle block.'
  },
  {
    id: 'ml-swiss',
    name: 'Swiss Grid Multiline',
    category: 'Multiline',
    fontFamily: 'Inter, sans-serif',
    primaryColor: '#F8FAFC',
    highlightColor: '#10B981',
    backgroundColor: '#000000B3',
    animationStyle: 'multiline',
    fontSize: 26,
    positionY: 78,
    description: 'Structured grid multi-line caption format.'
  },

  // ==========================================
  // 5. DYNAMIC (Kinetic Motion & Physics)
  // ==========================================
  {
    id: 'dyn-stretch',
    name: 'Dynamic Squash & Stretch',
    category: 'Dynamic',
    fontFamily: 'Bangers, cursive',
    primaryColor: '#FFFFFF',
    highlightColor: '#F59E0B',
    strokeColor: '#000000',
    strokeWidth: 4,
    animationStyle: 'bounce',
    fontSize: 38,
    positionY: 70,
    badgeText: 'KINETIC',
    description: 'Kinetic cartoon physics animation popping every single word.'
  },
  {
    id: 'dyn-wiggle',
    name: 'Wiggle & Shake',
    category: 'Dynamic',
    fontFamily: 'Righteous, cursive',
    primaryColor: '#A855F7',
    highlightColor: '#F43F5E',
    animationStyle: 'bounce',
    fontSize: 34,
    positionY: 68,
    description: 'Vibrant bouncy lettering with continuous dynamic micro-wiggle.'
  },
  {
    id: 'dyn-linen',
    name: 'Linen Glide',
    category: 'Dynamic',
    fontFamily: 'Space Grotesk, sans-serif',
    primaryColor: '#E2E8F0',
    highlightColor: '#38BDF8',
    animationStyle: 'karaoke',
    fontSize: 32,
    positionY: 74,
    description: 'Smooth sliding horizontal movement across spoken phrases.'
  },
  {
    id: 'dyn-quill',
    name: 'Quill Kinetic',
    category: 'Dynamic',
    fontFamily: 'Playfair Display, serif',
    primaryColor: '#FDE047',
    highlightColor: '#F97316',
    animationStyle: 'bounce',
    fontSize: 34,
    positionY: 72,
    description: 'Dynamic calligraphic scaling on emphasized key terms.'
  },
  {
    id: 'dyn-storyline',
    name: 'Storyline Kinetic',
    category: 'Dynamic',
    fontFamily: 'Poppins, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#10B981',
    animationStyle: 'bounce',
    fontSize: 34,
    positionY: 70,
    description: 'Narrative storytelling pop animation for viral shorts.'
  },

  // ==========================================
  // 6. EDITORIAL (High Fashion & Luxury)
  // ==========================================
  {
    id: 'edit-serif-quote',
    name: 'Editorial Serif Quote',
    category: 'Editorial',
    fontFamily: 'Playfair Display, serif',
    primaryColor: '#F8FAFC',
    highlightColor: '#EAB308',
    shadow: '0 4px 12px rgba(0,0,0,0.6)',
    animationStyle: 'karaoke',
    fontSize: 28,
    positionY: 80,
    badgeText: 'LUXE',
    description: 'Vogue & GQ aesthetic with fine serif typography.'
  },
  {
    id: 'edit-monument',
    name: 'Monument Editorial',
    category: 'Editorial',
    fontFamily: 'Space Grotesk, sans-serif',
    primaryColor: '#CBD5E1',
    highlightColor: '#FFFFFF',
    textTransform: 'uppercase',
    animationStyle: 'karaoke',
    fontSize: 30,
    positionY: 82,
    description: 'Architectural high-fashion magazine caption aesthetic.'
  },
  {
    id: 'edit-minimal-black',
    name: 'Minimal Black Luxe',
    category: 'Editorial',
    fontFamily: 'Inter, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#FACC15',
    backgroundColor: '#000000E6',
    animationStyle: 'karaoke',
    fontSize: 24,
    positionY: 84,
    description: 'Clean luxury brand caption bar with fine gold highlights.'
  },

  // ==========================================
  // 7. SOCIAL (TikTok & Reels Classics)
  // ==========================================
  {
    id: 'soc-karaoke-bar',
    name: 'Karaoke Flip Bar',
    category: 'Social',
    fontFamily: 'Poppins, sans-serif',
    primaryColor: '#94A3B8',
    highlightColor: '#FACC15',
    backgroundColor: '#000000B3',
    animationStyle: 'karaoke',
    fontSize: 30,
    positionY: 74,
    badgeText: 'TIKTOK',
    description: 'Standard TikTok & Reels color-changing karaoke bar.'
  },
  {
    id: 'soc-soft-script',
    name: 'Soft Script Aesthetic',
    category: 'Social',
    fontFamily: 'Permanent Marker, cursive',
    primaryColor: '#F472B6',
    highlightColor: '#FFFFFF',
    animationStyle: 'bounce',
    fontSize: 32,
    positionY: 76,
    description: 'Soft aesthetic pink script for lifestyle vlogs.'
  },
  {
    id: 'soc-delhi-vibe',
    name: 'Delhi Social Vibe',
    category: 'Social',
    fontFamily: 'Oswald, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#F97316',
    backgroundColor: '#7C2D12E6',
    textTransform: 'uppercase',
    animationStyle: 'box',
    fontSize: 32,
    positionY: 72,
    description: 'High-visibility social pop captions with warm backdrop.'
  },

  // ==========================================
  // 8. NEON & FX (Cyber & Glow Effects)
  // ==========================================
  {
    id: 'neon-cyber',
    name: 'Neon Cyberpunk',
    category: 'Neon & FX',
    fontFamily: 'Righteous, cursive',
    primaryColor: '#F472B6',
    highlightColor: '#38BDF8',
    shadow: '0 0 15px #F472B6, 0 0 25px #38BDF8',
    animationStyle: 'glow',
    fontSize: 34,
    positionY: 68,
    description: 'Futuristic glowing neon outlines with intense cyber highlights.'
  },
  {
    id: 'rubik-glitch',
    name: 'Matrix Glitch FX',
    category: 'Neon & FX',
    fontFamily: 'Rubik Glitch, cursive',
    primaryColor: '#22C55E',
    highlightColor: '#FFFFFF',
    shadow: '0 0 15px #22C55E',
    animationStyle: 'glow',
    fontSize: 32,
    positionY: 70,
    badgeText: 'FX',
    description: 'Glitch digital cyber font style for gaming and tech content.'
  },
  {
    id: 'neon-aura-purple',
    name: 'Purple Aura Glow',
    category: 'Neon & FX',
    fontFamily: 'Poppins, sans-serif',
    primaryColor: '#C084FC',
    highlightColor: '#F472B6',
    shadow: '0 0 20px #C084FC',
    animationStyle: 'glow',
    fontSize: 32,
    positionY: 72,
    description: 'Deep synthwave purple neon ambient lighting.'
  },

  // ==========================================
  // 9. RETRO (Nostalgia & VHS)
  // ==========================================
  {
    id: 'retro-typewriter',
    name: 'Retro Paper Cut',
    category: 'Retro',
    fontFamily: 'Permanent Marker, cursive',
    primaryColor: '#18181B',
    highlightColor: '#EF4444',
    backgroundColor: '#FEF08A',
    animationStyle: 'typewriter',
    fontSize: 26,
    positionY: 75,
    description: 'Handcrafted cutout marker font with warm paper backing.'
  },
  {
    id: 'vhs-tape',
    name: '80s VHS Vintage',
    category: 'Retro',
    fontFamily: 'Space Grotesk, sans-serif',
    primaryColor: '#67E8F9',
    highlightColor: '#F472B6',
    backgroundColor: '#000000CC',
    textTransform: 'uppercase',
    animationStyle: 'karaoke',
    fontSize: 28,
    positionY: 82,
    description: 'Retro synthwave nostalgia lettering with soft Scanline aura.'
  },

  // ==========================================
  // 10. CREATORS (Alex Hormozi & MrBeast)
  // ==========================================
  {
    id: 'hormozi-green',
    name: 'Hormozi Green',
    category: 'Creators',
    fontFamily: 'Bangers, cursive',
    primaryColor: '#FFFFFF',
    highlightColor: '#22C55E',
    backgroundColor: '#000000E6',
    textTransform: 'uppercase',
    strokeColor: '#000000',
    strokeWidth: 5,
    animationStyle: 'bounce',
    fontSize: 36,
    positionY: 70,
    badgeText: 'VIRAL',
    description: 'Punchy viral aesthetic with high-contrast green karaoke pop.'
  },
  {
    id: 'beast-mode',
    name: 'Beast Mode Impact',
    category: 'Creators',
    fontFamily: 'Black Han Sans, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#EAB308',
    backgroundColor: '#172554E6',
    strokeColor: '#000000',
    strokeWidth: 5,
    textTransform: 'uppercase',
    animationStyle: 'box',
    fontSize: 36,
    positionY: 65,
    badgeText: 'HIGH IMPACT',
    description: 'Giant Youtube beast-style headline blocks with bold outlines.'
  },

  // ==========================================
  // 11. DESI (Regional & Indian Creators)
  // ==========================================
  {
    id: 'desi-bold',
    name: 'Desi Masala Bold',
    category: 'Desi',
    fontFamily: 'Oswald, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#F97316',
    backgroundColor: '#991B1BE6',
    textTransform: 'uppercase',
    animationStyle: 'karaoke',
    fontSize: 30,
    positionY: 78,
    badgeText: 'TRENDING',
    description: 'High-energy regional caption styling built for storytelling.'
  },
  {
    id: 'tabahi-fire',
    name: 'Tabahi Fire Blast',
    category: 'Desi',
    fontFamily: 'Black Han Sans, sans-serif',
    primaryColor: '#FDE047',
    highlightColor: '#EF4444',
    strokeColor: '#000000',
    strokeWidth: 4,
    animationStyle: 'bounce',
    fontSize: 36,
    positionY: 68,
    description: 'High octane yellow-red pop captions for trending Shorts.'
  },

  // ==========================================
  // 12. REAL ESTATE (Luxury Property Tours)
  // ==========================================
  {
    id: 'real-estate-luxe',
    name: 'Luxe Real Estate',
    category: 'Real Estate',
    fontFamily: 'Playfair Display, serif',
    primaryColor: '#F8FAFC',
    highlightColor: '#EAB308',
    textTransform: 'capitalize',
    shadow: '0 4px 12px rgba(0,0,0,0.6)',
    animationStyle: 'karaoke',
    fontSize: 28,
    positionY: 80,
    description: 'Elegant luxury serif font design for high-end home tours.'
  },
  {
    id: 'minimal-architect',
    name: 'Minimal Architect',
    category: 'Real Estate',
    fontFamily: 'Inter, sans-serif',
    primaryColor: '#FFFFFF',
    highlightColor: '#94A3B8',
    backgroundColor: '#00000099',
    animationStyle: 'karaoke',
    fontSize: 24,
    positionY: 84,
    description: 'Ultra-clean architectural typography for luxury property tours.'
  }
];

export const INITIAL_WORDS: Word[] = [
  { id: 'w1', word: 'Welcome', start: 0.2, end: 0.6 },
  { id: 'w2', word: 'to', start: 0.65, end: 0.8 },
  { id: 'w3', word: 'brownieAI', start: 0.85, end: 1.4, isCustomEmphasis: true, highlightColor: '#F59E0B' },
  { id: 'w4', word: 'Studio!', start: 1.45, end: 1.9 },
  { id: 'w5', word: 'Create', start: 2.1, end: 2.45 },
  { id: 'w6', word: 'mind-blowing', start: 2.5, end: 3.1, isCustomEmphasis: true, highlightColor: '#EC4899' },
  { id: 'w7', word: 'AI', start: 3.15, end: 3.35 },
  { id: 'w8', word: 'captions', start: 3.4, end: 3.85 },
  { id: 'w9', word: 'without', start: 3.9, end: 4.25 },
  { id: 'w10', word: 'manual', start: 4.3, end: 4.65 },
  { id: 'w11', word: 'keyframes.', start: 4.7, end: 5.2 },
  { id: 'w12', word: 'Edit', start: 5.5, end: 5.8 },
  { id: 'w13', word: 'the', start: 5.85, end: 6.0 },
  { id: 'w14', word: 'transcript,', start: 6.05, end: 6.6 },
  { id: 'w15', word: 'and', start: 6.65, end: 6.8 },
  { id: 'w16', word: 'the', start: 6.85, end: 7.0 },
  { id: 'w17', word: 'words', start: 7.05, end: 7.4 },
  { id: 'w18', word: 'resync', start: 7.45, end: 7.9, isCustomEmphasis: true, highlightColor: '#10B981' },
  { id: 'w19', word: 'instantly!', start: 7.95, end: 8.5 }
];

export const MOCK_HOOKS: AIHook[] = [
  { id: 'h1', text: "Stop keyframing captions! Here is how brownieAI automates it in 1 click.", score: 98, category: "High Curiosity" },
  { id: 'h2', text: "This secret AI tool is replacing video editors in 2026...", score: 94, category: "Viral Hook" },
  { id: 'h3', text: "How to get 10M+ views on Shorts with dynamic kinetic text.", score: 89, category: "Educational" },
  { id: 'h4', text: "Create 3D behind-the-person captions directly in your browser!", score: 91, category: "Feature Showcase" }
];

export const MOCK_THUMBNAILS: ThumbnailConcept[] = [
  { id: 't1', title: 'SECRET AI TOOL', subtitle: 'Auto Dynamic Captions', style: 'Bold Impact', bgGradient: 'from-amber-600 to-amber-950' },
  { id: 't2', title: '10X YOUR VIEWS', subtitle: 'No Keyframes Needed', style: 'High Contrast', bgGradient: 'from-purple-700 to-slate-950' },
  { id: 't3', title: 'HOW IT WORKS', subtitle: 'Transcript-First Studio', style: 'Minimal Luxury', bgGradient: 'from-emerald-600 to-zinc-950' },
  { id: 't4', title: 'VIRAL REELS', subtitle: 'Behind-The-Person Depth', style: 'Cyber Glow', bgGradient: 'from-pink-600 to-indigo-950' }
];
