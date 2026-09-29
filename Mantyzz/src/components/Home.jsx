import Header from './Header'
import About from './About'
import Skills from './Skills'
import Footer from './Footer'

function Home({ name, themeColor, bio, skillList }) {
  return (
    <>
      <Header name={name} themeColor={themeColor} />
      <About bio={bio} />
      <Skills skillList={skillList} />
      <Footer />
    </>
  )
}
export default Home
