export const keysData = {
  post: {
    getAll: [ 'getPosts', ],
    getById: (id: string) => ([ 'getPostById', id, ]),
  },
};
