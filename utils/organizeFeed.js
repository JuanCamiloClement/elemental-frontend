export const organizeFeed = (array) => {
  const postsToRender = [];
  array.map(({ user }) => {
    user.posts.map(({ _id, url, likes, comments, createdAt }) => {
      postsToRender.push({
        _id,
        url,
        user,
        likes,
        comments,
        createdAt,
      });
    });
  });
  return postsToRender;
}