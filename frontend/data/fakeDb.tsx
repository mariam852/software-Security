const comments = [
  { id: 1, author: "Alice", text: "Hello — nice site!" },
  { id: 2, author: "Bob", text: "I love the documentation." }
];

export function getComments() {
  return comments.slice();
}

export function addComment(author: any, text: any) {
  const id = comments.length ? comments[comments.length - 1].id + 1 : 1;
  const entry = { id, author, text };
  comments.push(entry);
  return entry;
}