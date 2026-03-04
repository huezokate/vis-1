import { useState } from 'react'

// ── Design System ──────────────────────────────────────────────
const C = {
  bgPrimary:   '#F1F6F7',
  bgCard:      '#F5F9FA',
  orange:      '#F25C05',
  green:       '#009A84',
  yellow:      '#F1BD00',
  blue:        '#05A2D7',
  text:        '#0A0E12',
  muted:       '#8A9BAE',
}

const SKILLS = {
  Camera:     ['Director of Photography', 'Camera Operator', '1st AC', '2nd AC', 'DIT'],
  Lighting:   ['Gaffer', 'Best Boy Electric', 'Electrician'],
  Grip:       ['Key Grip', 'Best Boy Grip', 'Grip'],
  Art:        ['Production Designer', 'Set Decorator', 'Props Master'],
  Sound:      ['Production Sound Mixer', 'Boom Operator'],
  Production: ['Line Producer', 'Production Coordinator', 'Set PA', 'Production Assistant'],
  Post:       ['Editor', 'Colorist', 'VFX Artist'],
  'Hair/MU':  ['Hair Stylist', 'Makeup Artist', 'Key MUA'],
}

// ── Shared UI Primitives ───────────────────────────────────────
const s = {
  input: {
    width: '100%',
    padding: '12px 14px',
    background: 'white',
    border: '1px solid rgba(10,14,18,0.15)',
    borderRadius: '8px',
    color: C.text,
    fontSize: '15px',
    fontFamily: 'Manrope, sans-serif',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    color: C.text,
    fontWeight: '600',
    fontSize: '13px',
    fontFamily: 'Manrope, sans-serif',
  },
  helper: {
    fontSize: '12px',
    color: C.muted,
    marginTop: '4px',
    fontFamily: 'Manrope, sans-serif',
  },
  primaryBtn: {
    width: '100%',
    padding: '15px',
    background: C.orange,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '700',
    fontFamily: 'Manrope, sans-serif',
    cursor: 'pointer',
    letterSpacing: '0.3px',
  },
  card: {
    background: C.bgCard,
    border: '1px solid rgba(10,14,18,0.08)',
    borderRadius: '12px',
    padding: '20px',
  },
  page: {
    minHeight: '100vh',
    background: C.bgPrimary,
    display: 'flex',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: '480px',
    padding: '32px 24px 56px',
  },
}

function Logo() {
  return (
    <div style={{ marginBottom: '6px' }}>
      <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '26px', color: C.orange, letterSpacing: '2px' }}>
        visianary
      </span>
      <span style={{ display: 'block', fontSize: '10px', color: C.muted, fontFamily: 'Manrope, sans-serif', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '-2px' }}>
        film production marketplace
      </span>
    </div>
  )
}

function Stepper({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
      {[1, 2, 3].map((step, i) => {
        const done = step < current
        const active = step === current
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: done ? C.green : active ? C.orange : 'transparent',
              border: !done && !active ? `2px solid ${C.muted}` : 'none',
              color: done || active ? 'white' : C.muted,
              fontWeight: '700', fontSize: '15px',
              fontFamily: 'Manrope, sans-serif',
              transition: 'all 0.3s',
              flexShrink: 0,
            }}>
              {done ? '✓' : step}
            </div>
            {i < 2 && (
              <div style={{
                width: '56px', height: '2px', margin: '0 6px',
                background: done ? C.green : 'rgba(10,14,18,0.12)',
                transition: 'background 0.3s',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function BackBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      color: C.muted, fontSize: '14px', fontFamily: 'Manrope, sans-serif',
      display: 'flex', alignItems: 'center', gap: '4px',
      padding: '0', marginBottom: '20px',
    }}>
      ← Back
    </button>
  )
}

function SegmentedSelect({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {options.map(opt => {
        const sel = value === opt
        return (
          <button key={opt} onClick={() => onChange(opt)} style={{
            padding: '9px 18px', borderRadius: '8px',
            border: `2px solid ${sel ? C.orange : 'rgba(10,14,18,0.15)'}`,
            background: sel ? 'rgba(242,92,5,0.08)' : 'white',
            color: sel ? C.orange : C.text,
            fontWeight: '600', fontSize: '13px',
            fontFamily: 'Manrope, sans-serif', cursor: 'pointer',
            transition: 'all 0.15s',
          }}>
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function ScreenHeading({ title, step }) {
  return (
    <>
      <h2 style={{
        fontFamily: "'Bebas Neue', cursive", fontSize: '38px',
        color: C.text, marginBottom: '4px', letterSpacing: '1px', lineHeight: '1',
      }}>
        {title}
      </h2>
      <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: C.muted, marginBottom: '28px' }}>
        Step {step} of 3
      </p>
    </>
  )
}

// ── Main Component ─────────────────────────────────────────────
export default function OnboardingFlow() {
  const [screen, setScreen] = useState(0)
  const [userData, setUserData] = useState({
    fullName: '', preferredName: '', email: '', password: '',
    location: '', phone: '', headline: '', experience: '', seniority: '',
    instagram: '', website: '', imdb: '',
  })
  const [showPw, setShowPw] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState([])
  const [portfolioFiles, setPortfolioFiles] = useState([])
  const [screen3Option, setScreen3Option] = useState(null)
  const [quickPhotos, setQuickPhotos] = useState([])
  const [projectName, setProjectName] = useState('')
  const [projectFiles, setProjectFiles] = useState([])
  const [w9Uploaded, setW9Uploaded] = useState(false)
  const [w9Skipped, setW9Skipped] = useState(false)

  const set = (field, val) => setUserData(p => ({ ...p, [field]: val }))

  const toggleSkill = (skill) =>
    setSelectedSkills(p => p.includes(skill) ? p.filter(s => s !== skill) : [...p, skill])

  const getInitials = () => {
    const name = userData.preferredName || userData.fullName
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'VU'
  }

  const calcCompletion = () => {
    let pts = 0
    if (userData.fullName) pts += 10
    if (userData.email) pts += 10
    if (userData.headline) pts += 10
    if (userData.location) pts += 8
    if (selectedSkills.length > 0) pts += 15
    if (userData.instagram || userData.website || userData.imdb) pts += 10
    if (portfolioFiles.length > 0) pts += 10
    if (quickPhotos.length >= 3 || projectFiles.length > 0) pts += 17
    if (w9Uploaded) pts += 10
    return Math.min(pts, 100)
  }

  // ── Screen 0: Welcome ────────────────────────────────────────
  if (screen === 0) {
    return (
      <div style={s.page}>
        <div style={{ ...s.inner, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh', padding: '48px 28px 40px' }}>
          <Logo />

          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(242,92,5,0.08)', borderRadius: '100px',
              padding: '6px 14px', marginBottom: '24px',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: C.orange, display: 'inline-block' }} />
              <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px', color: C.orange, fontWeight: '700', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                For Film Crew
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: 'clamp(56px, 15vw, 72px)',
              lineHeight: '0.92', color: C.text,
              marginBottom: '28px', letterSpacing: '2px',
            }}>
              GET HIRED.<br />
              SHOW UP.<br />
              <span style={{ color: C.orange }}>GET PAID.</span>
            </h1>

            <p style={{
              fontFamily: 'Manrope, sans-serif', fontSize: '16px',
              color: C.muted, lineHeight: '1.65', marginBottom: '40px',
            }}>
              Visianary is the marketplace for film production jobs. Members of the crew get{' '}
              <strong style={{ color: C.text }}>25% more opportunities</strong> with us.
            </p>

            <button
              onClick={() => setScreen(1)}
              style={{ ...s.primaryBtn, marginBottom: '16px', fontSize: '17px', padding: '16px' }}
            >
              Create Your Profile Now
            </button>

            <p style={{ textAlign: 'center', fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: C.muted }}>
              Are you a producer?{' '}
              <a href="#" style={{ color: C.orange, textDecoration: 'none', fontWeight: '600' }}>
                Book time with our sales rep →
              </a>
            </p>
          </div>

          {/* Social proof stats */}
          <div style={{ display: 'flex', gap: '0', marginTop: '40px', borderTop: '1px solid rgba(10,14,18,0.08)', paddingTop: '24px' }}>
            {[['2,400+', 'Crew members'], ['840+', 'Productions'], ['$3.2M', 'Paid out']].map(([num, label], i) => (
              <div key={label} style={{ flex: 1, textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(10,14,18,0.08)' : 'none' }}>
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '30px', color: C.orange }}>{num}</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '11px', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Screen 1: Basic Info ─────────────────────────────────────
  if (screen === 1) {
    return (
      <div style={s.page}>
        <div style={s.inner}>
          <Logo />
          <BackBtn onClick={() => setScreen(0)} />
          <Stepper current={1} />
          <ScreenHeading title="LET'S SET UP YOUR BASIC INFO" step={1} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={s.label}>Full Legal Name</label>
              <input type="text" placeholder="Jane Smith" value={userData.fullName}
                onChange={e => set('fullName', e.target.value)} style={s.input} />
            </div>

            <div>
              <label style={s.label}>Preferred Name / Display Name</label>
              <input type="text" placeholder="Jane" value={userData.preferredName}
                onChange={e => set('preferredName', e.target.value)} style={s.input} />
            </div>

            <div>
              <label style={s.label}>Email</label>
              <input type="email" placeholder="jane@example.com" value={userData.email}
                onChange={e => set('email', e.target.value)} style={s.input} />
              <p style={s.helper}>This will be your username</p>
            </div>

            <div>
              <label style={s.label}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={userData.password}
                  onChange={e => set('password', e.target.value)}
                  style={{ ...s.input, paddingRight: '56px' }}
                />
                <button onClick={() => setShowPw(!showPw)} style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: C.muted, fontSize: '12px', fontFamily: 'Manrope, sans-serif', fontWeight: '600',
                }}>
                  {showPw ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            <div>
              <label style={s.label}>Location — City / Region</label>
              <input type="text" placeholder="Los Angeles, CA" value={userData.location}
                onChange={e => set('location', e.target.value)} style={s.input} />
            </div>

            <div>
              <label style={s.label}>Phone Number</label>
              <input type="tel" placeholder="+1 (555) 000-0000" value={userData.phone}
                onChange={e => set('phone', e.target.value)} style={s.input} />
              <p style={s.helper}>Used for shoot-day alerts only</p>
            </div>

            <div>
              <label style={s.label}>Professional Headline / Role Seeking</label>
              <input type="text" placeholder="Grip • Gaffer • Set PA" value={userData.headline}
                onChange={e => set('headline', e.target.value)} style={s.input} />
            </div>

            <div>
              <label style={s.label}>Years of Experience</label>
              <SegmentedSelect
                options={['0–1', '2–5', '6–10', '10+']}
                value={userData.experience}
                onChange={v => set('experience', v)}
              />
            </div>

            <div>
              <label style={s.label}>Seniority Level</label>
              <SegmentedSelect
                options={['Entry', 'Mid', 'Senior', 'Dept Head']}
                value={userData.seniority}
                onChange={v => set('seniority', v)}
              />
            </div>
          </div>

          <div style={{ marginTop: '32px' }}>
            <button onClick={() => setScreen(2)} style={s.primaryBtn}>
              Continue →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Screen 2: Portfolio ──────────────────────────────────────
  if (screen === 2) {
    return (
      <div style={s.page}>
        <div style={s.inner}>
          <Logo />
          <BackBtn onClick={() => setScreen(1)} />
          <Stepper current={2} />
          <ScreenHeading title="LET'S SET UP YOUR PORTFOLIO" step={2} />

          {/* Skills */}
          <div style={{ marginBottom: '28px' }}>
            <p style={{ ...s.label, fontSize: '15px', marginBottom: '16px' }}>Skills</p>
            {selectedSkills.length > 0 && (
              <div style={{
                padding: '8px 14px', borderRadius: '8px',
                background: 'rgba(0,154,132,0.08)', marginBottom: '16px',
                fontFamily: 'Manrope, sans-serif', fontSize: '13px',
                color: C.green, fontWeight: '600',
              }}>
                ✓ {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
              </div>
            )}
            {Object.entries(SKILLS).map(([category, skills]) => (
              <div key={category} style={{ marginBottom: '16px' }}>
                <p style={{
                  fontFamily: 'Manrope, sans-serif', fontSize: '11px',
                  color: C.muted, fontWeight: '700', marginBottom: '8px',
                  textTransform: 'uppercase', letterSpacing: '1px',
                }}>
                  {category}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                  {skills.map(skill => {
                    const sel = selectedSkills.includes(skill)
                    return (
                      <button key={skill} onClick={() => toggleSkill(skill)} style={{
                        padding: '7px 14px', borderRadius: '100px',
                        border: `2px solid ${sel ? C.orange : 'rgba(10,14,18,0.13)'}`,
                        background: sel ? 'rgba(242,92,5,0.08)' : 'white',
                        color: sel ? C.orange : C.text,
                        fontFamily: 'Manrope, sans-serif', fontSize: '13px',
                        fontWeight: sel ? '700' : '500', cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}>
                        {skill}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div style={{ ...s.card, marginBottom: '20px' }}>
            <p style={{ ...s.label, fontSize: '15px', marginBottom: '16px' }}>Social / Portfolio Links</p>

            <div style={{ marginBottom: '14px' }}>
              <label style={s.label}>Instagram</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                  color: C.muted, fontFamily: 'Manrope, sans-serif', fontSize: '15px',
                }}>@</span>
                <input type="text" placeholder="yourhandle" value={userData.instagram}
                  onChange={e => set('instagram', e.target.value)}
                  style={{ ...s.input, paddingLeft: '28px' }} />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={s.label}>Personal Website</label>
              <input type="url" placeholder="https://yoursite.com" value={userData.website}
                onChange={e => set('website', e.target.value)} style={s.input} />
            </div>

            <div>
              <label style={s.label}>IMDb Profile URL</label>
              <input type="url" placeholder="https://imdb.com/name/nm..." value={userData.imdb}
                onChange={e => set('imdb', e.target.value)} style={s.input} />
            </div>
          </div>

          {/* Portfolio Upload */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ ...s.label, fontSize: '15px', marginBottom: '8px' }}>Work Samples</p>
            <div
              onClick={() => portfolioFiles.length === 0 && setPortfolioFiles(['reel_2024.mp4', 'portfolio.pdf'])}
              style={{
                border: '2px dashed rgba(10,14,18,0.2)',
                borderRadius: '12px', padding: '28px 20px',
                textAlign: 'center', cursor: 'pointer', background: 'white',
                transition: 'border-color 0.15s',
              }}
            >
              <div style={{ fontSize: '30px', marginBottom: '8px' }}>📁</div>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: C.text, fontWeight: '600', marginBottom: '4px' }}>
                Upload work samples (photos, PDF, reel)
              </p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px', color: C.muted }}>
                Drag & drop or click to browse
              </p>
            </div>
            {portfolioFiles.length > 0 && (
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {portfolioFiles.map(f => (
                  <div key={f} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 12px', background: 'rgba(0,154,132,0.08)',
                    borderRadius: '8px',
                  }}>
                    <span style={{ color: C.green }}>✓</span>
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: C.text }}>{f}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={() => setScreen(3)} style={s.primaryBtn}>Continue →</button>
            <button onClick={() => setScreen(3)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: C.muted, fontFamily: 'Manrope, sans-serif', fontSize: '14px',
              padding: '6px', textAlign: 'center',
            }}>
              Skip for now →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Screen 3: Enhance Portfolio ──────────────────────────────
  if (screen === 3) {
    return (
      <div style={s.page}>
        <div style={s.inner}>
          <Logo />
          <BackBtn onClick={() => setScreen(2)} />
          <Stepper current={3} />
          <ScreenHeading title="LET'S ENHANCE YOUR PORTFOLIO" step={3} />

          {/* Info card */}
          <div style={{
            background: 'rgba(5,162,215,0.07)', border: '1px solid rgba(5,162,215,0.22)',
            borderRadius: '12px', padding: '16px', marginBottom: '24px',
            display: 'flex', gap: '12px', alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>ℹ️</span>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: C.text, lineHeight: '1.55', margin: 0 }}>
              Your profile won't be visible on the marketplace until you upload at least a few photos of yourself or your work, and complete your W9.
            </p>
          </div>

          {/* Option A — Quick Upload */}
          <div
            onClick={() => setScreen3Option('quick')}
            style={{
              ...s.card, marginBottom: '14px', cursor: 'pointer',
              border: `2px solid ${screen3Option === 'quick' ? C.orange : 'rgba(10,14,18,0.08)'}`,
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                border: `2px solid ${screen3Option === 'quick' ? C.orange : 'rgba(10,14,18,0.2)'}`,
                background: screen3Option === 'quick' ? C.orange : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {screen3Option === 'quick' && <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'white' }} />}
              </div>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: '700', fontSize: '15px', color: C.text, margin: 0 }}>
                Quick Upload — 3 Photos
              </p>
            </div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: C.muted, marginBottom: screen3Option === 'quick' ? '14px' : 0 }}>
              Upload 3 pictures of yourself or your work to get started fast.
            </p>

            {screen3Option === 'quick' && (
              <div
                onClick={e => { e.stopPropagation(); setQuickPhotos(['photo_1.jpg', 'photo_2.jpg', 'photo_3.jpg']) }}
                style={{
                  border: '2px dashed rgba(10,14,18,0.18)', borderRadius: '8px',
                  padding: '20px', textAlign: 'center', background: 'white', cursor: 'pointer',
                }}
              >
                {quickPhotos.length === 0 ? (
                  <>
                    <div style={{ fontSize: '26px', marginBottom: '6px' }}>📷</div>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: C.muted }}>Click to upload 3 photos</p>
                  </>
                ) : (
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    {quickPhotos.map((_, i) => (
                      <div key={i} style={{
                        width: '72px', height: '72px', borderRadius: '8px',
                        background: `hsl(${22 + i * 18}, 65%, 72%)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                      }}>
                        🖼️
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Option B — Project Folder */}
          <div
            onClick={() => setScreen3Option('project')}
            style={{
              ...s.card, marginBottom: '24px', cursor: 'pointer',
              border: `2px solid ${screen3Option === 'project' ? C.orange : 'rgba(10,14,18,0.08)'}`,
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                border: `2px solid ${screen3Option === 'project' ? C.orange : 'rgba(10,14,18,0.2)'}`,
                background: screen3Option === 'project' ? C.orange : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {screen3Option === 'project' && <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'white' }} />}
              </div>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: '700', fontSize: '15px', color: C.text, margin: 0 }}>
                Create a Project Folder
              </p>
            </div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: C.muted, marginBottom: screen3Option === 'project' ? '14px' : 0 }}>
              Group everything from one production together.
            </p>

            {screen3Option === 'project' && (
              <div onClick={e => e.stopPropagation()}>
                <input
                  type="text"
                  placeholder="e.g. Short Film — Sunset Drive (2024)"
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  style={{ ...s.input, marginBottom: '10px' }}
                />
                <div
                  onClick={() => setProjectFiles(['bts_photos.zip', 'stills.pdf', 'reel.mp4'])}
                  style={{
                    border: '2px dashed rgba(10,14,18,0.18)', borderRadius: '8px',
                    padding: '16px', textAlign: 'center', background: 'white', cursor: 'pointer',
                  }}
                >
                  {projectFiles.length === 0 ? (
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: C.muted }}>Click to upload project files</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {projectFiles.map(f => (
                        <div key={f} style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: C.green }}>✓ {f}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* W9 Section */}
          <div style={{
            ...s.card, marginBottom: '32px',
            border: `1px solid ${w9Uploaded ? C.green : 'rgba(10,14,18,0.08)'}`,
            transition: 'border-color 0.3s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
              <div>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: '700', fontSize: '15px', color: C.text, margin: '0 0 3px' }}>
                  Tax Form W9
                </p>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: C.muted, margin: 0 }}>
                  Required to receive payments through Visianary
                </p>
              </div>
              {w9Uploaded && <span style={{ color: C.green, fontSize: '22px' }}>✓</span>}
            </div>

            {!w9Uploaded ? (
              <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                <button
                  onClick={() => { setW9Uploaded(true); setW9Skipped(false) }}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '8px',
                    background: C.orange, color: 'white', border: 'none',
                    fontFamily: 'Manrope, sans-serif', fontWeight: '700', fontSize: '13px', cursor: 'pointer',
                  }}
                >
                  Upload W9
                </button>
                <button
                  onClick={() => setW9Skipped(true)}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '8px',
                    background: 'transparent', color: C.muted,
                    border: '1px solid rgba(10,14,18,0.15)',
                    fontFamily: 'Manrope, sans-serif', fontSize: '13px', cursor: 'pointer',
                  }}
                >
                  I'll do this later
                </button>
              </div>
            ) : (
              <div style={{
                marginTop: '10px', padding: '8px 12px',
                background: 'rgba(0,154,132,0.08)', borderRadius: '8px',
                fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: C.green,
              }}>
                ✓ w9_form.pdf uploaded
              </div>
            )}

            {w9Skipped && !w9Uploaded && (
              <div style={{
                marginTop: '10px', padding: '10px 12px',
                background: 'rgba(241,189,0,0.1)', borderRadius: '8px',
                display: 'flex', gap: '8px', alignItems: 'flex-start',
              }}>
                <span style={{ color: C.yellow, flexShrink: 0 }}>⚠</span>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px', color: C.text, margin: 0, lineHeight: '1.4' }}>
                  You won't be able to receive payments until your W9 is submitted.
                </p>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={() => setScreen(4)} style={s.primaryBtn}>
              Finish & View My Profile →
            </button>
            <button onClick={() => setScreen(4)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: C.muted, fontFamily: 'Manrope, sans-serif', fontSize: '13px',
              padding: '6px', textAlign: 'center',
            }}>
              Skip for now — I'll complete this later
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Screen 4: Profile Landing ────────────────────────────────
  const completion = calcCompletion()
  const displayName = userData.preferredName || userData.fullName || 'Crew Member'
  const hasPhotos = quickPhotos.length >= 3 || projectFiles.length > 0
  const profileReady = w9Uploaded && hasPhotos

  const completionColor = completion >= 80 ? C.green : completion >= 50 ? C.orange : C.yellow

  return (
    <div style={{ minHeight: '100vh', background: C.bgPrimary, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>

        {/* Sticky Header */}
        <div style={{
          background: 'white', padding: '14px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid rgba(10,14,18,0.08)',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '22px', color: C.orange, letterSpacing: '1px' }}>
            visianary
          </span>
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            {['Gigs', 'Messages', 'Payout'].map(item => (
              <span key={item} style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: C.muted, cursor: 'pointer', fontWeight: '500' }}>
                {item}
              </span>
            ))}
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: C.orange, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontFamily: "'Bebas Neue', cursive", fontSize: '14px', cursor: 'pointer',
            }}>
              {getInitials()}
            </div>
          </div>
        </div>

        <div style={{ padding: '24px 20px 80px' }}>

          {/* Welcome */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', cursive", fontSize: '34px',
              color: C.text, marginBottom: '2px', letterSpacing: '1px',
            }}>
              WELCOME, {displayName.toUpperCase()}!
            </h2>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: C.green, fontWeight: '600' }}>
              ✓ Your profile is live
            </p>
          </div>

          {/* Profile Card */}
          <div style={{ ...s.card, marginBottom: '14px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '50%', flexShrink: 0,
                background: C.orange, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontFamily: "'Bebas Neue', cursive", fontSize: '22px', letterSpacing: '1px',
              }}>
                {getInitials()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: '800', fontSize: '16px', color: C.text, margin: '0 0 2px' }}>
                  {displayName}
                </p>
                {userData.headline && (
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: C.muted, margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {userData.headline}
                  </p>
                )}
                {userData.location && (
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px', color: C.muted, margin: 0 }}>
                    📍 {userData.location}
                  </p>
                )}
              </div>
            </div>

            {selectedSkills.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                {selectedSkills.slice(0, 5).map(skill => (
                  <span key={skill} style={{
                    padding: '4px 10px', borderRadius: '100px',
                    background: 'rgba(242,92,5,0.08)', border: '1px solid rgba(242,92,5,0.2)',
                    color: C.orange, fontFamily: 'Manrope, sans-serif', fontSize: '12px', fontWeight: '600',
                  }}>
                    {skill}
                  </span>
                ))}
                {selectedSkills.length > 5 && (
                  <span style={{
                    padding: '4px 10px', borderRadius: '100px',
                    background: 'rgba(10,14,18,0.05)', border: '1px solid rgba(10,14,18,0.1)',
                    color: C.muted, fontFamily: 'Manrope, sans-serif', fontSize: '12px',
                  }}>
                    +{selectedSkills.length - 5} more
                  </span>
                )}
              </div>
            )}

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px', color: C.muted }}>Profile completion</span>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px', fontWeight: '700', color: completionColor }}>{completion}%</span>
              </div>
              <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(10,14,18,0.08)' }}>
                <div style={{
                  height: '100%', borderRadius: '3px',
                  width: `${completion}%`, background: completionColor,
                  transition: 'width 0.6s ease',
                }} />
              </div>
            </div>
          </div>

          {/* Warning card */}
          {!profileReady && (
            <div style={{
              background: 'rgba(241,189,0,0.1)', border: '1px solid rgba(241,189,0,0.3)',
              borderRadius: '12px', padding: '16px', marginBottom: '14px',
              display: 'flex', gap: '12px', alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>⚠️</span>
              <div>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: '700', fontSize: '14px', color: C.text, margin: '0 0 4px' }}>
                  Complete your profile to appear in search results
                </p>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: C.muted, margin: 0 }}>
                  {!hasPhotos && !w9Uploaded ? 'Add photos and upload your W9.' : !hasPhotos ? 'Upload at least 3 photos.' : 'Upload your W9 to get paid.'}
                </p>
              </div>
            </div>
          )}

          {/* Browse Gigs CTA */}
          <div style={{
            background: C.orange, borderRadius: '12px', padding: '20px',
            marginBottom: '14px', cursor: 'pointer',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <p style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '24px', color: 'white', margin: '0 0 2px', letterSpacing: '1px' }}>
                BROWSE GIGS
              </p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                Find your next production job
              </p>
            </div>
            <span style={{ fontSize: '32px' }}>🎬</span>
          </div>

          {/* Upcoming Gigs */}
          <div style={s.card}>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: '700', fontSize: '15px', color: C.text, margin: '0 0 20px' }}>
              Upcoming Gigs
            </p>
            <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
              <div style={{ fontSize: '42px', marginBottom: '12px' }}>🎥</div>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: C.muted, margin: '0 0 2px' }}>
                No upcoming gigs yet.
              </p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: C.muted, margin: 0 }}>
                Start browsing!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: '480px',
          background: 'white', borderTop: '1px solid rgba(10,14,18,0.08)',
          display: 'flex', justifyContent: 'space-around',
          padding: '10px 0 16px',
        }}>
          {[['📁', 'Portfolio'], ['💼', 'My Gigs'], ['💰', 'Payout'], ['💬', 'Messages'], ['⚙️', 'Settings']].map(([icon, label]) => (
            <div key={label} style={{ textAlign: 'center', cursor: 'pointer', padding: '0 8px' }}>
              <div style={{ fontSize: '20px', marginBottom: '3px' }}>{icon}</div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '10px', color: C.muted, fontWeight: '600' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
