import React from 'react'

function Card({username = "THE GOAT", post = "In making"}) {
  // console.log(props)
  return (
      <div>
  <figure className="md:flex bg-slate-100 rounded-b md:p-2 dark:bg-slate-800">
  <img className="w-24 h-24 md:w-48 md:h-32 rounded-md mx-auto " src="https://www.mozilla.org/media/img/firefox/template/page-image-master.1b6efe3d5631.jpg" alt="" width="384" height="512"/>
  <div className="pt-6 md:p-4 text-center md:text-left">
    <blockquote>
      <p className="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote>
    <figcaption className="font-medium">
      <div className="text-sky-500 dark:text-sky-400">
        {username}
      </div>
      <div className="text-slate-700 dark:text-slate-500">
        {post}
      </div>
    </figcaption>
  </div>
</figure>

    </div>
  )
}

export default Card


