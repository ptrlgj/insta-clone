
export const useResolveUserPosts = (getUserPosts, setPosts) => {
    return async () => {
        let resolvedPosts = []
        const promises = await getUserPosts();
        for (const item of promises) {
            const resolved = await item;
            resolvedPosts.push({...resolved, id: resolved.id})
        }
        setPosts(resolvedPosts.reverse())
    }
}
