import { useState } from 'react'

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [showTip, setShowTip] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => { setName(''); setEmail(''); setMessage(''); setSent(false) }, 2500)
  }

  return (
    <section className="contact">
      <p className="section-heading">Contact</p>

      <button className="tip-btn" onClick={() => setShowTip(!showTip)}>
        {showTip ? '✕ Close' : 'ℹ Need help?'}
      </button>
      {showTip && <p className="tip-box">Fill out every field below. Your message can be up to 250 characters.</p>}

      {sent ? (
        <p className="sent-msg">Thanks {name}! I'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
          <textarea placeholder="Your message..." value={message} onChange={e => setMessage(e.target.value)} maxLength={250} required />
          <p className="char-count">{message.length} / 250</p>
          <button type="submit" disabled={!name || !email || !message}>Send message</button>
        </form>
      )}
    </section>
  )
}
export default Contact
