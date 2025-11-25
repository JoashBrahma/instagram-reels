import reels from "./reels.js";

const reelsContainer = document.querySelector(".reels-container");

reelsContainer.innerHTML =
  reels.reduce((acc, reel, idx) => {
    return acc += `
      <div class="reel">
        <div class="reel__content">
          <video src="${reel.video}" autoplay muted loop></video>
        </div>
        <div class="reel__bottom">
          <div class="reel__profile">
            <div class="reel__profile-pic">
              <img src="${reel.profilePic}" alt="${reel.username}'s profile picture">
            </div>
            <p class="reel__username">${reel.username}</p>
            <button type="button" class="reel__btn reel__btn-follow" data-reel-id="${idx}">
              ${reel.isFollowed ? "Following" : "Follow"}
            </button>
          </div>
          <p class="reel__caption">${reel.caption}</p>
        </div>
        <div class="reel__right">
          <div class="reel__action">
            <button type="button" class="reel__btn reel__btn-like ${reel.isLiked ? 'liked' : ""}" data-reel-id="${idx}">
              <i class="ri-heart-${reel.isLiked ? 'fill' : "line"}"></i>
            </button>
            <p class="reel__total-likes">${reel.likes}</p>
          </div>
          <div class="reel__action">
            <button type="button" class="reel__btn reel__btn-comment">
              <i class="ri-chat-3-line"></i>
            </button>
            <p class="reel__total-comments">${reel.comments}</p>
          </div>
          <div class="reel__action">
            <button type="button" class="reel__btn reel__btn-remix">
              <i class="ri-remix-line"></i>
            </button>
          </div>
          <div class="reel__action">
            <button type="button" class="reel__btn reel__btn-share">
              <i class="ri-share-forward-line"></i>
            </button>
            <p class="reel__total-shares">${reel.shares}</p>
          </div>
          <div class="reel__action">
            <button type="button" class="reel__btn reel__btn-more">
              <i class="ri-more-2-line"></i>
            </button>
          </div>
          <div class="reel__action">
            <button type="button" class="reel__btn reel__btn-music">
              <i class="ri-music-2-line"></i>
            </button>
          </div>
        </div>
      </div>`;
  }, "");

reelsContainer.addEventListener("click", (e) => {
  const reelButton = e.target.closest(".reel__btn");
  if (!reelButton) return;

  const reelId = parseInt(reelButton.dataset.reelId);

  if (reelButton.classList.contains("reel__btn-follow")) {
    reels[reelId].isFollowed = !reels[reelId].isFollowed;
    reelButton.textContent = reels[reelId].isFollowed ? "following" : "follow";
  } else if (reelButton.classList.contains("reel__btn-like")) {
    reels[reelId].isLiked = !reels[reelId].isLiked;

    reels[reelId].likes += reels[reelId].isLiked ? 1 : -1;

    reelButton.innerHTML =
      `<i class='ri-heart-${reels[reelId].isLiked ? "fill" : "line"}'></i>`;
    reelButton.classList.toggle("liked");
    reelButton.nextElementSibling.textContent = reels[reelId].likes;
  }
})