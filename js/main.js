class AppApi {
  post = async (url = "", data) => {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    console.log(("Api Response ", response));
    return response.json();
  };

  get = async (url = "", data) => {
    console.log("Get All posts ");
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return response.json();
  };

  put = async (url = "", data) => {
    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  };

  delete = async (url = "") => {
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return response.json();
  };
}

const appApi = new AppApi();

const getAllPostAsHTML = (posts = []) => {
  let allPostContent = ``;
  posts &&
    posts.forEach((post) => {
      allPostContent += `
      <div class="card w-full py-4 bg-gray-100 p-5 hover:outline outline-indigo-400 transition-all duration-300 delay-75">
    <div class="flex flex-row justify-between items-center gap-6">
      <div class="w-1/12 self-start">
        <div class="avatar ${post.isActive ? "online" : "offline"}">
          <div class="w-full rounded-xl">
            <img
              src="${post?.image}"
            />
          </div>
        </div>
      </div>
      <div class="w-11/12">
        <!-- Post start -->
        <div class="card-body pt-0 rounded-2xl">
          <!-- Tags start-->
          <div class="flex flex-row justify-between gap-2 px-4 py-4">
            <span>#${post?.category}</span>
            <span>Author:${post?.author?.name}</span>
          </div>
          <!-- Tags End-->

          <!-- Post Content Start -->
          <div
            class="flex flex-col justify-between gap-2 px-4 border-b-2 border-dashed py-4"
          >
            <h2>${post?.title}</h2>
            <p>
              ${post?.description}
            </p>
          </div>
          <!-- Post Content End -->
          <!-- Post footer start -->
          <div
            class="flex flex-row justify-between items-center box-border pt-2 gap-4"
          >
            <div class="info">
              <ul class="flex flex-row items-center gap-6">
                <li class="flex flex-row items-center gap-2">
                  <span><i class="fa-regular fa-message"></i></span
                  ><span>${post?.comment_count}</span>
                </li>
                <li class="flex flex-row items-center gap-2">
                  <span><i class="fa-regular fa-eye"></i></span
                  ><span>${post?.view_count}</span>
                </li>
                <li class="flex flex-row items-center gap-2">
                  <span><i class="fa-regular fa-clock"></i></span
                  ><span>${post?.posted_time} min</span>
                </li>
              </ul>
            </div>
            <div class="action tooltip" data-tip="Mark as read" >
              <div
              data-id=${post?.id}
                class="red-post w-9 h-9 flex flex-row items-center justify-center rounded-full bg-teal-600 text-white cursor-pointer"
              >
                <i  data-id=${post?.id} class="fa-solid fa-envelope-open"></i>
              </div>
            </div>
          </div>
          <!-- Post footer End -->
        </div>
        <!-- Post start -->
      </div>
    </div>
  </div>
      `;
    });

  return allPostContent;
};

const getLatestPostAsHTML = (latestPosts = []) => {
  let content = ``;

  latestPosts &&
    latestPosts.forEach((post) => {
      content += `
    <div class="w-full flex flex-col gap-4 box-border border border-gray-300 rounded-2xl p-5 ">
            
            <div class="image p-6 bg-gray-100 rounded-xl">
              <img src="${post?.cover_image}" alt="${post?.title}" title="${
        post?.title
      }" />
            </div>

            <div class="flex flex-row gap-4">
              <span><i class="fa-regular fa-calendar"></i></span>
              <span>${
                post?.author?.posted_date
                  ? post?.author?.posted_date
                  : "No publish date"
              }</span>
            </div>

            <div class="flex flex-col gap-4">
              <h4 class="text-[#12132d] font-extrabold text-lg">What will a mars habitat force that impact in our daily life!!!</h4>
              <p>${post?.description}</p>
            </div>

            <div class="w-full flex flex-row items-center mb-6 gap-5">

              <div class="flex flex-col justify-center items-center">
                
                <div class="avatar">
                  <div class="w-16 rounded-full">
                    <img src="${post?.profile_image}" />
                  </div>
                </div>

              </div>
              <div class="flex flex-col w-3/4">
                <span class="text-base font-bold text-[#12132d]">${
                  post?.author?.name
                }</span>
                <span class="font-medium">${
                  post?.author?.designation
                    ? post?.author?.designation
                    : "Unknown"
                }</span>
              </div>
            
            </div>

          </div>
    `;
    });

  return content;
};

const getAndPushReadItem = (id, items, readPost = []) => {
  id = Number(id);

  if (!isNaN(id)) {
    items.forEach((item) => {
      if (id === item.id) {
        readPost.push({ title: item?.title, count: item?.view_count });
      }
    });
  }
};

const insetReadPosts = (readPosts) => {
  let content = ``;

  readPosts &&
    readPosts.forEach(({ count, title }) => {
      content += `
      <div class="flex flex-row justify-between items-center py-4 px-3 box-border gap-3 bg-white rounded-xl text-base">
      <div class="w-8/12">
        <h3 class="text-pretty font-semibold">
          ${title}
        </h3>
      </div>
      <div
        class="4/12 flex flex-row justify-between items-center gap-2 font-medium"
      >
        <span><i class="fa-regular fa-eye"></i></span
        ><span>${count}</span>
      </div>
    </div>
    `;
    });

  return content;
};

//Start document Event Listener
document.addEventListener("DOMContentLoaded", (event) => {
  const allPosts = document.querySelector("#all-posts");
  const latestPost = document.querySelector("#latest-post");
  const readCount = document.querySelector("#read-count");
  const readAllPosts = document.querySelector("#all-read-posts");

  //Search Content
  const searchBtn = document.querySelector("#btn-search");
  const searchInput = document.querySelector("#input-search");
  const searchSpin = document.getElementById("searchSpin");

  const allJsonPosts = [];
  const markAsRead = [];

  searchBtn.addEventListener("click", (e) => {
    searchSpin.classList.add("modal-open");
    setTimeout(() => {
      searchSpin.classList.remove("modal-open");
    }, 2000);

    if (searchInput.value !== "") {
      appApi
        .get(
          `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchInput.value}`
        )
        .then((response) => {
          allPosts.innerHTML = getAllPostAsHTML(response.posts);
          allJsonPosts.push(...response.posts);
        });
    }
  });

  searchInput.addEventListener("change", (e) => {
    if (e.target.value === "" || e.target.value === null) {
      searchSpin.classList.add("modal-open");
      setTimeout(() => {
        searchSpin.classList.remove("modal-open");
      }, 3000);
      appApi
        .get(`https://openapi.programming-hero.com/api/retro-forum/posts`)
        .then((resp) => {
          allPosts.innerHTML = "";

          console.log("response.posts, ", resp.posts);

          allPosts.innerHTML = getAllPostAsHTML(resp.posts);
        });
    }
  });

  appApi
    .get(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
    .then((resp) => {
      console.log("All Post response, ", resp);
      latestPost.innerHTML = getLatestPostAsHTML(resp);
    });

  appApi
    .get(`https://openapi.programming-hero.com/api/retro-forum/posts`)
    .then((response) => {
      allPosts.innerHTML = getAllPostAsHTML(response.posts);
      allJsonPosts.push(...response.posts);
    });

  allPosts.addEventListener("click", (e) => {
    console.log("REsd as even Click", e.target.getAttribute("data-id"));
    console.log(("All Post ", allJsonPosts));
    getAndPushReadItem(
      e.target.getAttribute("data-id"),
      allJsonPosts,
      markAsRead
    );
    console.log("markAsRead, ", markAsRead);
    readCount.innerHTML = markAsRead?.length;
    readAllPosts.innerHTML = insetReadPosts(markAsRead);
  });
});

//End document Event Listener
