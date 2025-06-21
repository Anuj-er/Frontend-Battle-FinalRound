import List from "../List"
import Button from "../Button"

function Programs({ onCoursesClick }) {
  return (
    <div data-color="white" className='programs section font-[SansitaReg] py-20'>
      <div className="head1">
        <h1 className="text-5xl sm:text-6xl text-center tracking-tight">
          Our Programs
        </h1>
      </div>
      <div className="list mt-10 w-full px-8">
        {/* //single list */}
        <List />
        <div className='flex items-center justify-center py-20'>
          <div onClick={onCoursesClick}>
            <Button bgColor="bg-[#f5f19c]" text="EXPLORE ALL PROGRAMS" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Programs
