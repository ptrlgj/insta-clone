export const useIsPostLiked = (user, post) => {
    const isLiked = user.likedPosts.includes(post.id)
    return isLiked
}
