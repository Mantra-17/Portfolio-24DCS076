import Header from '../components/Header'
import About from '../components/About'
import Skills from '../components/Skills'
import Footer from '../components/Footer'

function Home({ name, themeColor, role, bio, skillList }) {
  return (
    <>
      <Header name={name} themeColor={themeColor} role={role} />
      <About bio={bio} />
      <Skills skillList={skillList} />
      <Footer name={name} />
    </>
  )
}

export default Home
