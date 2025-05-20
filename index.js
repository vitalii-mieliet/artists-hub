import{a as A,i as M,S as q}from"./assets/vendor-BlYA4dWQ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const p=A.create({baseURL:"https://sound-wave.b.goit.study/api",headers:{"Content-Type":"application/json"}}),v=8,f={ARTISTS:"/artists",ARTIST_BY_ID:t=>`/artists/${t}`,FEEDBACKS:"/feedbacks",GENRES:"/genres"};async function T(t=1){const e={limit:v,page:t};try{return(await p.get(f.ARTISTS,{params:e})).data}catch(r){throw r}}async function B(t){try{return(await p.get(f.ARTIST_BY_ID(t))).data}catch(e){throw e}}async function C(t=1){const e={limit:v,page:t};try{return(await p.get(f.FEEDBACKS,{params:e})).data.data}catch(r){throw r}}let l=null;function P(t){const e=document.querySelector(t);e&&(l=e,e.classList.add("is-open"),document.body.classList.add("scroll-block"),e.addEventListener("click",S),document.addEventListener("keydown",k))}function L(){l&&(l.classList.remove("is-open"),document.body.classList.remove("scroll-block"),l.removeEventListener("click",S),document.removeEventListener("keydown",k),l=null)}function S(t){const e=t.target===l,r=t.target.closest(".js-close-btn");(e||r)&&L()}function k(t){t.key==="Escape"&&L()}function j(t){document.querySelector(".artist-modal-name").textContent=t.strArtist,document.querySelector(".artist-modal-album-img").src=t.strArtistThumb,document.querySelector(".artist-modal-album-img").alt=t.strArtist,document.querySelector(".biography-paragraph").textContent=t.strBiographyEN;const e=document.querySelectorAll(".artist-modal-album-list-item");e[0].querySelector(".modal-album-list-item-value").textContent=x(t.intFormedYear,t.intDiedYear),e[1].querySelector(".modal-album-list-item-value").textContent=t.strGender,e[2].querySelector(".modal-album-list-item-value").textContent=t.intMembers,e[3].querySelector(".modal-album-list-item-value").textContent=t.strCountry;const r=document.querySelector(".artist-modal-genres-list");r.innerHTML="",t.strLabel&&(r.innerHTML=`<li class="artist-modal-genres-list-item">${t.strLabel}</li>`),I(t.tracksList)}function x(t,e){return e?`${t}–${e}`:`${t}–present`}function I(t){const e=document.querySelector(".artist-modal-fetched-albums-wrapper");e.innerHTML="";const r=_(t);Object.entries(r).forEach(([s,n])=>{const o=document.createElement("div");o.classList.add("artist-modal-album-container"),o.innerHTML=`
        <h4 class="artist-modal-album-name">${s}</h4>
        <ul class="artist-modal-album-track-header-list">
          <li class="artist-modal-album-track-header-list-item">Track</li>
          <li class="artist-modal-album-track-header-list-item">Time</li>
          <li class="artist-modal-album-track-header-list-item">Link</li>
        </ul>
        <ul class="artist-modal-track-list">
          ${n.map(a=>`
            <li class="artist-modal-track-list-item">
              <p class="artist-modal-track-list-item-song">${a.strTrack}</p>
              <p class="artist-modal-track-list-item-time">${O(a.intDuration)}</p>
              ${a.movie?`
                <a class="artist-modal-track-list-item-link" href="${a.movie}" target="_blank">
                  <svg class="artist-modal-track-list-item-svg" width="24" height="24" aria-hidden="true">
                    <use href="../assets/svg/sprite.svg#icon-youtube"></use>
                  </svg>
                </a>
              `:""}
            </li>`).join("")}
        </ul>
      `,e.append(o)})}function _(t){return t.reduce((e,r)=>(e[r.strAlbum]=e[r.strAlbum]||[],e[r.strAlbum].push(r),e),{})}function O(t){const e=Math.floor(Number(t)/1e3),r=Math.floor(e/60),s=String(e%60).padStart(2,"0");return`${r}:${s}`}async function R(t){try{const e=await B(t);console.log(e),j(e),P("#artist-modal")}catch(e){console.error("An error occurred while loading the data:",e)}}const c={list:document.querySelector(".artists-list"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more-btn")};function F(t){if(!c.list)return;const e=t.map(({_id:r,strArtist:s,strArtistThumb:n,genres:o,strBiographyEN:a="No description available"})=>`
        <li class="artist-card">
          <div class="artist-img-wraper">
            <img src="${n}" alt="${s}" class="artist-img" width="640" height="393" />
          </div>
          <ul class="artist-genres-list">
            ${o.map(m=>`<li class="artist-genres-list-item">${m}</li>`).join("")}
          </ul>
          <h3 class="artist-name">${s}</h3>
          <p class="artist-desc">${a}</p>
          <button class="learn-more-btn js-learn-more-btn" data-artist-id="${r}">
            Learn More
            <span>
              <svg class="learn-more-icon-caret-right" width="24" height="24">
                <use href="./assets/svg/sprite.svg#icon-caret-right"></use>
              </svg>
            </span>
          </button>
        </li>`).join("");c.list.insertAdjacentHTML("beforeend",e)}function h(t){c.loader&&c.loader.classList.toggle("is-hidden",!t)}function N(t="Something went wrong. Please try again later."){M.error({title:"Error",message:t,position:"topRight",timeout:3e3,progressBar:!0,close:!0,closeOnClick:!0})}function D(t){c.loadMoreBtn&&(c.loadMoreBtn.style.display=t?"flex":"none")}let g=1;async function w(){try{h(!0);const t=await T(g);F(t.artists);const e=Number(t.limit),r=Math.ceil(t.totalArtists/e);D(g<r)}catch{N("Failed to load artists")}finally{h(!1)}}document.addEventListener("click",t=>{const e=t.target.closest(".js-learn-more-btn");if(console.log(e),!e)return;const r=e.dataset.artistId;r&&R(r)});var b;(b=document.querySelector(".load-more-btn"))==null||b.addEventListener("click",async()=>{g+=1,await w()});let i=null;function H(t){const e=Math.min(100,t/5*100),r=`starMask-${Math.random().toString(36).substr(2,9)}`,s="M12 2l3.09 6.26L22 9.27l-5.18 5.05L17.91 22 12 18.56 6.09 22l1.18-7.68L2 9.27l6.91-1.01L12 2z";return`
    <svg class="reviews-stars-svg" width="120" height="24" viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="${r}">
          <g style="fill: var(--color-scheme-1-text);">
            <path d="${s}" transform="translate(0)" />
            <path d="${s}" transform="translate(24)" />
            <path d="${s}" transform="translate(48)" />
            <path d="${s}" transform="translate(72)" />
            <path d="${s}" transform="translate(96)" />
          </g>
        </mask>
      </defs>

      <!-- Сірі зірки -->
      <g style="fill: var(--color-scheme-1-text);">
        <path d="${s}" transform="translate(0)" />
        <path d="${s}" transform="translate(24)" />
        <path d="${s}" transform="translate(48)" />
        <path d="${s}" transform="translate(72)" />
        <path d="${s}" transform="translate(96)" />
      </g>

      <!-- Фіолетова заливка по масці -->
      <g mask="url(#${r})">
        <rect width="${e}%" height="24" style="fill: var(--color-affair);" />
      </g>
    </svg>
  `}function Y(t){return t.map(({name:e,descr:r,rating:s})=>`
      <li class="splide__slide reviews-slide">
        <div class="reviews-stars">${H(s)}</div>
        <p class="reviews-quote">"${r}"</p>
        <p class="reviews-author">${e}</p>
      </li>`).join("")}function G(t,e){if(!t)return;const s=Array.from({length:3},(o,a)=>`<button class="pagination-btn" data-index="${a}"></button>`).join("");t.innerHTML=s,t.querySelectorAll(".pagination-btn").forEach((o,a)=>{o.addEventListener("click",()=>{const m=K(a,e,i.index);i.go(m)})})}function y(t,e){const r=document.querySelectorAll(".pagination-btn");if(!r.length)return;let s;t===0?s=0:t===e-1?s=2:s=1,r.forEach((n,o)=>{n.classList.toggle("active",o===s)})}function K(t,e,r){return r===0?t:r===e-1?e-3+t:r-1+t}function z(t){const e=document.querySelector(".splide__list"),r=document.querySelector(".custom-pagination");if(!e){console.error('Container ".splide__list" not found.');return}i&&i.destroy(!0),e.innerHTML=Y(t),requestAnimationFrame(()=>{i=new q(".splide",{type:"loop",perPage:1,autoplay:!1,arrows:!1,pagination:!1}),i.mount();const s=document.getElementById("prev-arrow"),n=document.getElementById("next-arrow");s&&n&&(s.addEventListener("click",()=>i.go("<")),n.addEventListener("click",()=>i.go(">"))),G(r,t.length),i.on("move",o=>{y(o,t.length)}),y(0,t.length)})}async function W(){try{const t=await C();z(t)}catch(t){console.error("An error occurred while loading the data:",t)}}const d=document.querySelector(".mobile-menu"),$=document.querySelector(".js-mobile-menu"),U=$.querySelector("span.burger"),E=document.querySelector(".js-menu-overlay");function u(){const t=d.classList.toggle("is-open");E.classList.toggle("is-active",t),U.classList.toggle("is-closed",t),d.setAttribute("aria-hidden",!t),document.body.classList.toggle("no-scroll",t)}$.addEventListener("click",u);E.addEventListener("click",u);document.addEventListener("keydown",t=>{t.key==="Escape"&&d.classList.contains("is-open")&&u()});d.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",u)});document.addEventListener("DOMContentLoaded",function(){w(),W()});
//# sourceMappingURL=index.js.map
