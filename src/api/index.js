import axios from "axios";

const apiEndPoint = "http://localhost:5000/posts/";

export const fetchPosts = async () => await axios.get(apiEndPoint);
export const createPost = async (post) => await axios.post(apiEndPoint, post);
// Yeni Post İşlem Akışı:
//  3- Bu adımda bu postu backend'deli serverimize bu posu gönderiyor.
