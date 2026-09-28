import { useState } from 'react'

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [showTip, setShowTip] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setName('')
      setEmail('')
      setMessage('')
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section className="contact">
      <p className="section-heading">Get in Touch</p>

      <button 
        type="button" 
        className="tip-btn" 
        onClick={() => setShowTip(prev => !prev)}
        aria-expanded={showTip}
      >
        {showTip ? '✕ Close Guide' : 'ℹ Need Help / Submission Guide'}
      </button>

      {showTip && (
        <div className="tip-box">
          <p><strong>Contact Form Guidelines:</strong></p>
          <p>Fill out your full name, a valid email address, and a message up to 250 characters. The live character counter updates on every keystroke through React controlled input state.</p>
        </div>
      )}

      {submitted ? (
        <div className="sent-msg">
          <h3>Thank you, {name || 'visitor'}!</h3>
          <p>Your message has been recorded into component state successfully.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-name">Your Name</label>
            <input 
              id="contact-name"
              type="text" 
              placeholder="e.g. John Doe" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact-email">Email Address</label>
            <input 
              id="contact-email"
              type="email" 
              placeholder="e.g. john@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact-message">Message</label>
            <textarea 
              id="contact-message"
              placeholder="Type your message here..." 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              maxLength={250} 
              required 
            />
            <p className={`char-count ${message.length >= 220 ? 'warning' : ''}`}>
              Live Character Count: {message.length} / 250 characters
            </p>
          </div>

          <button type="submit" disabled={!name.trim() || !email.trim() || !message.trim()}>
            Send Message
          </button>
        </form>
      )}
    </section>
  )
}

export default Contact
