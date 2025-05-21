import{a as O,i as _,P as R,S as F}from"./assets/vendor-SJpk5S-B.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const S=O.create({baseURL:"https://sound-wave.b.goit.study/api",headers:{"Content-Type":"application/json"}}),H=8,$={ARTISTS:"/artists",ARTIST_BY_ID:t=>`/artists/${t}`,FEEDBACKS:"/feedbacks",GENRES:"/genres"};async function D(t=1){const e={limit:H,page:t};try{return(await S.get($.ARTISTS,{params:e})).data}catch(s){throw s}}async function Y(t){try{return(await S.get($.ARTIST_BY_ID(t))).data}catch(e){throw e}}async function G(t=1){const e={page:t};try{return(await S.get($.FEEDBACKS,{params:e})).data.data}catch(s){throw s}}const f=document.querySelector(".js-loader-modal");function C(){f&&f.classList.add("is-open")}function B(){f&&f.classList.remove("is-open")}let d=null;function K(t){const e=document.querySelector(t);e&&(d=e,e.classList.add("is-open"),document.body.classList.add("no-scroll"),e.addEventListener("click",P),document.addEventListener("keydown",q))}function T(){d&&(d.classList.remove("is-open"),document.body.classList.remove("no-scroll"),d.removeEventListener("click",P),document.removeEventListener("keydown",q),d=null)}function P(t){const e=t.target===d,s=t.target.closest(".js-close-btn");(e||s)&&T()}function q(t){t.key==="Escape"&&T()}function W(){[".modal-backdrop",".artist-modal",".js-modal-artist-detail-info"].forEach(e=>{const s=document.querySelector(e);s&&(s.scrollTop=0)})}function Z(t){var r;const e=document.querySelector(".js-modal-artist-detail-info");e.innerHTML="";const s=` <h2 class="artist-modal-name">${t.strArtist}</h2>
      <div class="artist-modal-biography-field">
        <div class="artist-modal-img-wrapper">
          <img
            class="artist-modal-album-img"
            src="${t.strArtistThumb}"
            alt="${t.strArtist}"
          />
        </div>
        <div class="artist-modal-album-list-wrapper">
          <!-- <div class="artist-modal-biography-wrapper"> -->
          <ul class="artist-modal-album-list">
            <li class="artist-modal-album-list-item">
              <p class="modal-album-list-item-title">Years active</p>
              <p class="modal-album-list-item-value">${U(t.intFormedYear,t.intDiedYear)}</p>
            </li>
            <li class="artist-modal-album-list-item">
              <p class="modal-album-list-item-title">Sex</p>
              <p class="modal-album-list-item-value">${t.strGender}</p>
            </li>
            <li class="artist-modal-album-list-item">
              <p class="modal-album-list-item-title">Members</p>
              <p class="modal-album-list-item-value">${t.intMembers}</p>
            </li>
            <li class="artist-modal-album-list-item">
              <p class="modal-album-list-item-title">Country</p>
              <p class="modal-album-list-item-value">${t.strCountry}</p>
            </li>
            <li class="artist-modal-album-list-item biography-list-item-text">
              <p class="modal-album-list-item-title">Biography</p>
              <p
                class="modal-album-list-item-value biography-paragraph scrollable js-biography-paragraph"
              >${t.strBiographyEN}
              </p>
              <button type="button" class="biography-toggle-btn js-biography-toggle">Show more</button>
            </li>
          </ul>
          <!-- </div> -->
          <ul class="artist-modal-genres-list">
          ${((r=t.genres)==null?void 0:r.map(i=>`<li class="artist-modal-genres-list-item">${i}</li>`).join(""))||'<li class="artist-modal-genres-list-item">No genres</li>'}
          </ul>
        </div>
      </div>`;e.innerHTML=s,z(t.tracksList);const a=document.querySelector(".js-biography-paragraph"),n=document.querySelector(".js-biography-toggle");n.addEventListener("click",()=>{a.classList.toggle("expanded");const i=a.classList.contains("expanded");n.textContent=i?"Show less":"Show more"})}function z(t){const e=document.querySelector(".artist-modal-fetched-albums-wrapper");e.innerHTML="";const s=J(t);Object.entries(s).forEach(([a,n])=>{const r=document.createElement("div");r.classList.add("artist-modal-album-container"),r.innerHTML=`
        <h4 class="artist-modal-album-name">${a}</h4>
        <ul class="artist-modal-album-track-header-list">
          <li class="artist-modal-album-track-header-list-item">Track</li>
          <li class="artist-modal-album-track-header-list-item">Time</li>
          <li class="artist-modal-album-track-header-list-item">Link</li>
        </ul>
        <ul class="artist-modal-track-list">
          ${n.map(i=>`
            <li class="artist-modal-track-list-item">
              <p class="artist-modal-track-list-item-song">${i.strTrack}</p>
              <p class="artist-modal-track-list-item-time">${V(i.intDuration)}</p>
              ${i.movie?`
                <a class="artist-modal-track-list-item-link" href="${i.movie}" target="_blank">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.5928 7.25232C21.4789 6.82973 21.2563 6.44433 20.9472 6.13449C20.6381 5.82465 20.2532 5.60118 19.8308 5.48632C18.2648 5.05632 11.9998 5.04932 11.9998 5.04932C11.9998 5.04932 5.73584 5.04232 4.16884 5.45332C3.74677 5.57347 3.36266 5.8001 3.05341 6.11146C2.74415 6.42282 2.52013 6.80844 2.40284 7.23132C1.98984 8.79732 1.98584 12.0453 1.98584 12.0453C1.98584 12.0453 1.98184 15.3093 2.39184 16.8593C2.62184 17.7163 3.29684 18.3933 4.15484 18.6243C5.73684 19.0543 11.9848 19.0613 11.9848 19.0613C11.9848 19.0613 18.2498 19.0683 19.8158 18.6583C20.2383 18.5437 20.6236 18.3207 20.9335 18.0115C21.2434 17.7023 21.4672 17.3176 21.5828 16.8953C21.9968 15.3303 21.9998 12.0833 21.9998 12.0833C21.9998 12.0833 22.0198 8.81832 21.5928 7.25232ZM9.99584 15.0543L10.0008 9.05432L15.2078 12.0593L9.99584 15.0543Z" fill="white" />
</svg>
                </a>
              `:""}
            </li>`).join("")}
        </ul>
      `,e.append(r)})}function J(t){return t.reduce((e,s)=>(e[s.strAlbum]=e[s.strAlbum]||[],e[s.strAlbum].push(s),e),{})}function U(t,e){return e?`${t}–${e}`:`${t}–present`}function V(t){const e=Math.floor(Number(t)/1e3),s=Math.floor(e/60),a=String(e%60).padStart(2,"0");return`${s}:${a}`}async function Q(t,e=[]){C();try{const s=await Y(t);(!s.genres||!s.genres.length)&&(s.genres=e),Z(s),W(),K("#artist-modal")}catch(s){console.error("An error occurred while loading the data:",s)}finally{B()}}const h={list:document.querySelector(".artists-list"),loader:document.querySelector(".loader")};function X(t){if(!h.list)return;const e=t.map(({_id:s,strArtist:a,strArtistThumb:n,genres:r,strBiographyEN:i="No description available"})=>`
        <li class="artist-card">
          <div class="artist-img-wraper">
            <img src="${n}" alt="${a}" class="artist-img" width="640" height="393" />
          </div>
          <ul class="artist-genres-list">
            ${r.map(m=>`<li class="artist-genres-list-item">${m}</li>`).join("")}
          </ul>
          <h3 class="artist-name">${a}</h3>
          <p class="artist-desc">${i}</p>
          <button
  class="learn-more-btn js-learn-more-btn"
  data-artist-id="${s}"
  data-genres='${JSON.stringify(r)}'
>
  Learn More
  <span>
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 19.9426L17 12.9426L9 5.94263V19.9426Z" fill="white" />
</svg>
  </span>
</button>
        </li>`).join("");h.list.insertAdjacentHTML("beforeend",e)}function tt(t="Something went wrong. Please try again later."){_.error({title:"Error",message:t,position:"topRight",timeout:3e3,progressBar:!0,close:!0,closeOnClick:!0})}function et(){h.list&&(h.list.innerHTML="")}function st({totalItems:t,itemsPerPage:e,onPageChange:s}){const a=document.getElementById("pagination"),r={totalItems:t,itemsPerPage:e,visiblePages:3,centerAlign:!0,usageStatistics:!1,template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:({type:o})=>`<a href="#" class="tui-page-btn tui-${o}">${o==="prev"?"🡨":"🡪"}</a>`,disabledMoveButton:({type:o})=>`<span class="tui-page-btn tui-is-disabled tui-${o}">${o==="prev"?"🡨":"🡪"}</span>`,moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}},i=new R(a,r);function m(o){const v=Math.ceil(t/e),L=o+6,k=a.querySelector(".tui-extra-page");if(k&&k.remove(),L>v)return;const c=document.createElement("a");c.href="#",c.className="tui-page-btn tui-extra-page",c.textContent=L,c.addEventListener("click",w=>{w.preventDefault(),i.movePageTo(L)});const p=a.querySelector(".tui-next"),N=a.querySelector(".tui-next-is-ellip");a.querySelectorAll(".tui-prev-is-ellip").forEach(w=>w.remove()),N&&p||p?a.insertBefore(c,p):a.appendChild(c)}function E(o){m(o)}return E(1),i.on("afterMove",({page:o})=>{E(o)}),i.on("beforeMove",o=>{s(o.page)}),i}let A;async function x(t=1){C();try{const e=await D(t);if(et(),X(e.artists),!A){const s=Number(e.limit),a=Number(e.totalArtists);A=st({totalItems:a,itemsPerPage:s,onPageChange:x})}}catch{tt("Failed to load artists")}finally{B()}}function at(){x(1)}document.addEventListener("click",t=>{const e=t.target.closest(".js-learn-more-btn");if(!e)return;const s=e.dataset.artistId,a=e.dataset.genres,n=a?JSON.parse(a):[];s&&Q(s,n)});let l=null,u=0;function rt(t){const e=Math.min(100,t/5*100),s=`starMask-${Math.random().toString(36).substr(2,9)}`,a="M12 2l3.09 6.26L22 9.27l-5.18 5.05L17.91 22 12 18.56 6.09 22l1.18-7.68L2 9.27l6.91-1.01L12 2z";return`
    <svg class="reviews-stars-svg" width="120" height="24" viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="${s}">
          <g style="fill: var(--color-scheme-1-text);">
            <path d="${a}" transform="translate(0)" />
            <path d="${a}" transform="translate(24)" />
            <path d="${a}" transform="translate(48)" />
            <path d="${a}" transform="translate(72)" />
            <path d="${a}" transform="translate(96)" />
          </g>
        </mask>
      </defs>

      <!-- Сірі зірки -->
      <g style="fill: var(--color-scheme-1-text);">
        <path d="${a}" transform="translate(0)" />
        <path d="${a}" transform="translate(24)" />
        <path d="${a}" transform="translate(48)" />
        <path d="${a}" transform="translate(72)" />
        <path d="${a}" transform="translate(96)" />
      </g>

      <!-- Фіолетова заливка по масці -->
      <g mask="url(#${s})">
        <rect width="${e}%" height="24" style="fill: var(--color-affair);" />
      </g>
    </svg>
  `}function nt(t){return t.map(({name:e,descr:s,rating:a})=>`
      <li class="splide__slide reviews-slide">
        <div class="reviews-stars">${rt(a)}</div>
        <p class="reviews-quote">"${s}"</p>
        <p class="reviews-author">${e}</p>
      </li>`).join("")}function it(t,e){if(!t)return;const s=3;u=0;const a=Array.from({length:s},(r,i)=>`<button class="pagination-btn" data-index="${i}"></button>`).join("");t.innerHTML=a,t.querySelectorAll(".pagination-btn").forEach((r,i)=>{r.addEventListener("click",()=>{const m=u+i;l.go(m)})})}function g(t,e){const s=document.querySelectorAll(".pagination-btn");if(!s.length)return;t===0?u=0:t===e-1?u=e-3:u=t-1;const a=t-u;s.forEach((n,r)=>{n.classList.toggle("active",r===a)})}function M(t,e){const s=document.getElementById("prev-arrow"),a=document.getElementById("next-arrow");if(!s||!a||!l)return;const n=t===0,r=t===l.Components.Controller.getEnd();s.disabled=n,a.disabled=r}function ot(t){const e=document.querySelector(".splide__list"),s=document.querySelector(".custom-pagination");if(!e){console.error('Container ".splide__list" not found.');return}l&&l.destroy(!0),e.innerHTML=nt(t),requestAnimationFrame(()=>{l=new F(".splide",{type:"slide",perPage:1,autoplay:!1,arrows:!1,pagination:!1}),l.mount();const a=document.getElementById("prev-arrow"),n=document.getElementById("next-arrow");a&&n&&(a.addEventListener("click",()=>l.go("<")),n.addEventListener("click",()=>l.go(">"))),l.on("mounted move",r=>{g(r,t.length),M(r,t.length)}),M(0,t.length),it(s,t.length),g(0,t.length),l.on("move",r=>{g(r,t.length)}),g(0,t.length)})}async function lt(){try{const t=await G();ot(t)}catch(t){console.error("An error occurred while loading the data:",t)}}const b=document.querySelector(".mobile-menu"),j=document.querySelector(".js-mobile-menu"),ct=j.querySelector("span.burger"),I=document.querySelector(".js-menu-overlay");function y(){const t=b.classList.toggle("is-open");I.classList.toggle("is-active",t),ct.classList.toggle("is-closed",t),b.setAttribute("aria-hidden",!t),document.body.classList.toggle("no-scroll",t)}j.addEventListener("click",y);I.addEventListener("click",y);document.addEventListener("keydown",t=>{t.key==="Escape"&&b.classList.contains("is-open")&&y()});b.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",y)});document.addEventListener("DOMContentLoaded",function(){at(),lt()});
//# sourceMappingURL=index.js.map
