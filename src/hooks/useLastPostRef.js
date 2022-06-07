import { useCallback } from "react"

function useLastPostRef(noMorePosts, observer, fetchMorePosts) {
    const lastRef = useCallback( node => {
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver( entries => {
          if(entries[0].isIntersecting){
            if(!noMorePosts) {
              fetchMorePosts()
            }
          }
        })
        if(node) observer.current.observe(node)
      })
    return lastRef
}

export default useLastPostRef