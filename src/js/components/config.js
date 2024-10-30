// Get API URL depending on the address
export function getApiUrl(urlParams) {
  return urlParams.get('api') === 'v2' ? "https://www.api.rafaferrera.com/terra.php" : "https://tf-frontend.netlify.app/trial";
}

// Get storage key depending on the address
export function getStorageKey(urlParams) {
  return urlParams.get('api') === 'v2' ? 'apiData2' : 'apiData';
}

// Get and assign the post count depending on the address
export function getPostCount(urlParams) {
  let postCount = null;
  if (urlParams.get('api') === 'v2' && urlParams.get('post_count')) {
    postCount = parseInt(urlParams.get('post_count'), 10);
    if (isNaN(postCount) || postCount <= 1) {
      postCount = 5;
    } else if (postCount > 10) {
      postCount = 10;
    }
  }
  return postCount;
}