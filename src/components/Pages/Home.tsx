import CardSection from '../Main/CardSection'
import LeftSide from '../LeftSideBar/LeftSide'
import Main from '../Main/Main'

import NavBar from '../NavBar/NavBar';
import RightSide from '../RightSideBar/RightSide'
// import Main from '../Main/Main';


const Home = () => {
  return (
    <div className='w-full'>
    <div className="fixed top-0 z-10 w-full bg-white">
      <NavBar />
      </div>
      <div className='flex bg-gray-100'>
        <div className="flex-auto w-[20%] fixed top-12 hidden sm:block">
          <LeftSide />
        </div>
        <div className='flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl'>
          <div className="w-[95%] mx-auto mt-5">
          {/* <CardSection /> */}
          <Main />
          </div>
        </div>
        <div className="flex-auto w-[20%] fixed right-0 top-12 hidden sm:block">
          <RightSide />
        </div>
      </div>
  </div>

  )
}

export default Home