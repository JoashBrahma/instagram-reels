import reels from "./reels.js";

const reelsContainer = document.querySelector(".reels-container");

function triggerFloatingLikeAnimation() {
  let likeIcon = reelsContainer.querySelector(".floating-like-icon");

  if (likeIcon) {
    likeIcon.remove();
  }

  likeIcon = document.createElement("i");
  likeIcon.classList.add("ri-heart-fill", "floating-like-icon")

  reelsContainer.append(likeIcon);
}

function videoObserver() {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;

      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, { threshold: 0.5 });
}

reelsContainer.innerHTML =
  reels.reduce((acc, reel, idx) => {
    return acc += `
      <div class="reel" data-reel-id="${idx}">
        <div class="reel__content">
          <video src="${reel.video}" loop muted></video>
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
            <button type="button" class="reel__btn reel__btn-volume" data-reel-id="${idx}">
              <i class="ri-volume-mute-line"></i>
            </button>
          </div>
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

const observer = videoObserver();
document
  .querySelectorAll(".reel video")
  .forEach(video => observer.observe(video));

reelsContainer.addEventListener("click", (e) => {
  const reelButton = e.target.closest(".reel__btn");
  if (!reelButton) return;

  const reelId = parseInt(reelButton.dataset.reelId);

  if (reelButton.classList.contains("reel__btn-volume")) {
    const video = document.querySelector(`.reel[data-reel-id="${reelId}"] video`);

    video.muted = !video.muted;

    document
      .querySelectorAll(".reel video")
      .forEach((otherVideo, idx) => {
        if (idx !== reelId) {
          otherVideo.muted = video.muted;
        }
      });

    document
      .querySelectorAll(".reel__btn-volume")
      .forEach((volumeButton) => {
        volumeButton.innerHTML =
          `<i class='ri-volume-${video.muted ? "mute" : "up"}-line'></i>`;
      });
  } else if (reelButton.classList.contains("reel__btn-follow")) {
    reels[reelId].isFollowed = !reels[reelId].isFollowed;
    reelButton.textContent = reels[reelId].isFollowed ? "following" : "follow";
  } else if (reelButton.classList.contains("reel__btn-like")) {
    reels[reelId].isLiked = !reels[reelId].isLiked;

    reels[reelId].likes += reels[reelId].isLiked ? 1 : -1;

    reelButton.innerHTML =
      `<i class='ri-heart-${reels[reelId].isLiked ? "fill" : "line"}'></i>`;
    reelButton.classList.toggle("liked");
    reelButton.nextElementSibling.textContent = reels[reelId].likes;

    if (reels[reelId].isLiked) {
      triggerFloatingLikeAnimation();
    }
  }
});

reelsContainer.addEventListener("dblclick", (e) => {
  const reel = e.target.closest(".reel");

  if (!reel) return;

  triggerFloatingLikeAnimation();

  const reelId = parseInt(reel.dataset.reelId);

  if (!reels[reelId].isLiked) {
    const reelButton = reel.querySelector(".reel__btn-like");

    reels[reelId].isLiked = !reels[reelId].isLiked;

    reels[reelId].likes += reels[reelId].isLiked ? 1 : -1;

    reelButton.innerHTML =
      `<i class='ri-heart-${reels[reelId].isLiked ? "fill" : "line"}'></i>`;
    reelButton.classList.toggle("liked");
    reelButton.nextElementSibling.textContent = reels[reelId].likes;
  }
});