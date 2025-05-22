import{a as G,i as V,P as Y,S as Z}from"./assets/vendor-SJpk5S-B.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();const A=G.create({baseURL:"https://sound-wave.b.goit.study/api",headers:{"Content-Type":"application/json"}}),K=8,C={ARTISTS:"/artists",ARTIST_BY_ID:t=>`/artists/${t}`,FEEDBACKS:"/feedbacks",GENRES:"/genres"};async function W({currentPage:t=1,query:e,sortName:s,genre:r}={}){const a={limit:K,page:t};e&&(a.name=e),s&&(a.sortName=s),r&&(a.genre=r);try{return(await A.get(C.ARTISTS,{params:a})).data}catch(n){throw n}}async function J(t){try{return(await A.get(C.ARTIST_BY_ID(t))).data}catch(e){throw e}}async function z(t=1){const e={limit:20,page:t};try{return(await A.get(C.FEEDBACKS,{params:e})).data.data}catch(s){throw s}}async function U(){try{return(await A.get(C.GENRES)).data}catch(t){throw t}}const $=document.querySelector(".js-loader-modal");function B(){$&&$.classList.add("is-open")}function N(){$&&$.classList.remove("is-open")}let S=null;function Q(t){const e=document.querySelector(t);e&&(S=e,e.classList.add("is-open"),document.body.classList.add("no-scroll"),e.addEventListener("click",I),document.addEventListener("keydown",_))}function O(){S&&(S.classList.remove("is-open"),document.body.classList.remove("no-scroll"),S.removeEventListener("click",I),document.removeEventListener("keydown",_),S=null)}function I(t){const e=t.target===S,s=t.target.closest(".js-close-btn");(e||s)&&O()}function _(t){t.key==="Escape"&&O()}function X(){[".modal-backdrop",".artist-modal",".js-modal-artist-detail-info"].forEach(e=>{const s=document.querySelector(e);s&&(s.scrollTop=0)})}function tt(t){var n;const e=document.querySelector(".js-modal-artist-detail-info");e.innerHTML="";const s=` <h2 class="artist-modal-name">${t.strArtist}</h2>
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
              <p class="modal-album-list-item-value">${rt(t.intFormedYear,t.intDiedYear)}</p>
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
          ${((n=t.genres)==null?void 0:n.map(o=>`<li class="artist-modal-genres-list-item">${o}</li>`).join(""))||'<li class="artist-modal-genres-list-item">No genres</li>'}
          </ul>
        </div>
      </div>`;e.innerHTML=s,et(t.tracksList);const r=document.querySelector(".js-biography-paragraph"),a=document.querySelector(".js-biography-toggle");a.addEventListener("click",()=>{r.classList.toggle("expanded");const o=r.classList.contains("expanded");a.textContent=o?"Show less":"Show more"})}function et(t){const e=document.querySelector(".artist-modal-fetched-albums-wrapper");e.innerHTML="";const s=st(t);Object.entries(s).forEach(([r,a])=>{const n=document.createElement("div");n.classList.add("artist-modal-album-container"),n.innerHTML=`
        <h4 class="artist-modal-album-name">${r}</h4>
        <ul class="artist-modal-album-track-header-list">
          <li class="artist-modal-album-track-header-list-item">Track</li>
          <li class="artist-modal-album-track-header-list-item">Time</li>
          <li class="artist-modal-album-track-header-list-item">Link</li>
        </ul>
        <ul class="artist-modal-track-list">
          ${a.map(o=>`
            <li class="artist-modal-track-list-item">
              <p class="artist-modal-track-list-item-song">${o.strTrack}</p>
              <p class="artist-modal-track-list-item-time">${at(o.intDuration)}</p>
              ${o.movie?`
                <a class="artist-modal-track-list-item-link" href="${o.movie}" target="_blank">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.5928 7.25232C21.4789 6.82973 21.2563 6.44433 20.9472 6.13449C20.6381 5.82465 20.2532 5.60118 19.8308 5.48632C18.2648 5.05632 11.9998 5.04932 11.9998 5.04932C11.9998 5.04932 5.73584 5.04232 4.16884 5.45332C3.74677 5.57347 3.36266 5.8001 3.05341 6.11146C2.74415 6.42282 2.52013 6.80844 2.40284 7.23132C1.98984 8.79732 1.98584 12.0453 1.98584 12.0453C1.98584 12.0453 1.98184 15.3093 2.39184 16.8593C2.62184 17.7163 3.29684 18.3933 4.15484 18.6243C5.73684 19.0543 11.9848 19.0613 11.9848 19.0613C11.9848 19.0613 18.2498 19.0683 19.8158 18.6583C20.2383 18.5437 20.6236 18.3207 20.9335 18.0115C21.2434 17.7023 21.4672 17.3176 21.5828 16.8953C21.9968 15.3303 21.9998 12.0833 21.9998 12.0833C21.9998 12.0833 22.0198 8.81832 21.5928 7.25232ZM9.99584 15.0543L10.0008 9.05432L15.2078 12.0593L9.99584 15.0543Z" fill="white" />
</svg>
                </a>
              `:""}
            </li>`).join("")}
        </ul>
      `,e.append(n)})}function st(t){return t.reduce((e,s)=>(e[s.strAlbum]=e[s.strAlbum]||[],e[s.strAlbum].push(s),e),{})}function rt(t,e){return e?`${t}–${e}`:`${t}–present`}function at(t){const e=Math.floor(Number(t)/1e3),s=Math.floor(e/60),r=String(e%60).padStart(2,"0");return`${s}:${r}`}async function nt(t,e=[]){B();try{const s=await J(t);(!s.genres||!s.genres.length)&&(s.genres=e),tt(s),X(),Q("#artist-modal")}catch(s){console.error("An error occurred while loading the data:",s)}finally{N()}}const k={list:document.querySelector(".artists-list")};function ot(t){if(!k.list)return;const e=t.map(({_id:s,strArtist:r,strArtistThumb:a,genres:n,strBiographyEN:o="No description available"})=>`
        <li class="artist-card">
          <div class="artist-img-wraper">
            <img src="${a}" alt="${r}" class="artist-img" width="640" height="393" />
          </div>
          <ul class="artist-genres-list">
            ${n.map(u=>`<li class="artist-genres-list-item">${u}</li>`).join("")}
          </ul>
          <h3 class="artist-name">${r}</h3>
          <p class="artist-desc">${o}</p>
          <button
  class="learn-more-btn js-learn-more-btn"
  data-artist-id="${s}"
  data-genres='${JSON.stringify(n)}'
>
  Learn More
  <span>
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 19.9426L17 12.9426L9 5.94263V19.9426Z" fill="white" />
</svg>
  </span>
</button>
        </li>`).join("");k.list.insertAdjacentHTML("beforeend",e)}function it(t="Something went wrong. Please try again later."){V.error({title:"Error",message:t,position:"topRight",timeout:3e3,progressBar:!0,close:!0,closeOnClick:!0})}function lt(){k.list&&(k.list.innerHTML="")}function ct(){var r,a,n;const t=(r=document.querySelector("[data-artist-search]"))==null?void 0:r.value.trim(),e=(a=document.querySelector('input[name="sort-genre"]:checked'))==null?void 0:a.value;let s=(n=document.querySelector('input[name="sort"]:checked'))==null?void 0:n.value;return s==="default"&&(s=void 0),Object.fromEntries(Object.entries({query:t,genre:e,sortName:s}).filter(([o,u])=>u!==""&&u!==void 0))}async function dt(){const t=document.querySelector("[data-genre-list]");if(t)try{const e=await U();e.unshift({_id:"default",genre:"All genres",value:""});const s=e.map((r,a)=>`
        <label class="artist-custom-radio">
          <input
            type="radio"
            name="sort-genre"
            value="${r.value??r.genre}"
            ${a===0?"checked":""}
          />
          ${r.genre}
          <span class="artist-radio-icon">
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
              <path
                d="M4.99997 8.58597L1.70697 5.29297L0.292969 6.70697L4.99997 11.414L14.707 1.70697L13.293 0.292969L4.99997 8.58597Z"
                fill="white"
              />
            </svg>
          </span>
        </label>
      `).join("");t.innerHTML=s}catch(e){console.error("🔥 Failed to render genres:",e)}}function x({totalItems:t,itemsPerPage:e,onPageChange:s}){const r=document.getElementById("pagination");let a=null,n=1,o=null;function u(){return window.innerWidth<768?1:3}const l='<svg class="tui-page-btn icon-tui" width="14" height="15"><use href="/images/svg/sprite.svg#icon-right-arrow-alt"></use></svg>',d='<svg class="tui-page-btn icon-tui" width="14" height="15"><use href="/images/svg/sprite.svg#icon-left-arrow-alt"></use></svg>';function c(g=1){r.innerHTML="",o=u();const v={totalItems:t,itemsPerPage:e,visiblePages:o,page:g,centerAlign:!0,usageStatistics:!1,template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:({type:i})=>{const m=i==="prev"?`${d}`:`${l}`;return`<a href="#" class="tui-page-btn tui-${i}">${m}</a>`},disabledMoveButton:({type:i})=>{const m=i==="prev"?`${d}`:`${l}`;return`<span class="tui-page-btn tui-is-disabled tui-${i}">${m}</span>`},moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}};a=new Y(r,v),a.on("afterMove",({page:i})=>{n=i,p(i)}),a.on("beforeMove",i=>{s(i.page)}),p(g)}function p(g){const v=Math.ceil(t/e),i=g+6,m=r.querySelector(".tui-extra-page");if(m&&m.remove(),i>v)return;const f=document.createElement("a");f.href="#",f.className="tui-page-btn tui-extra-page",f.textContent=i,f.addEventListener("click",M=>{M.preventDefault(),a.movePageTo(i)});const b=r.querySelector(".tui-next"),D=r.querySelector(".tui-next-is-ellip");r.querySelectorAll(".tui-prev-is-ellip").forEach(M=>M.remove()),D&&b||b?r.insertBefore(f,b):r.appendChild(f)}return c(),window.addEventListener("resize",()=>{u()!==o&&c(n)}),{goToPage:g=>{a.movePageTo(g)}}}let y=null,T="";async function L(t=1){var e;B();try{const s=ct(),r=JSON.stringify(s),a=await W({currentPage:t,...s});lt(),ot(a.artists);const n=Number(a.limit),o=Number(a.totalArtists);r!==T&&((e=y==null?void 0:y.destroy)==null||e.call(y),y=x({totalItems:o,itemsPerPage:n,onPageChange:L}),T=r),y||(y=x({totalItems:o,itemsPerPage:n,onPageChange:L}),T=r)}catch{it("Failed to load artists")}finally{N()}}function R(){L(1)}document.addEventListener("click",t=>{const e=t.target.closest(".js-learn-more-btn");if(!e)return;const s=e.dataset.artistId,r=e.dataset.genres,a=r?JSON.parse(r):[];s&&nt(s,a)});function ut(){const t=document.querySelector(".artist-button-filters"),e=t==null?void 0:t.querySelector(".arrow-icon"),s=document.querySelector(".artist-modal-filters-box"),r=document.querySelectorAll(".artist-sort-name[data-toggle-js]"),a=document.querySelectorAll("[data-artist-modal]"),n=document.querySelector("[data-artist-search]"),o=document.querySelector(".artist-search-button"),u=document.querySelector(".artist-reset-filters");t==null||t.addEventListener("click",l=>{l.stopPropagation(),s.classList.toggle("open"),e==null||e.classList.toggle("rotated")}),r.forEach((l,d)=>{const c=a[d],p=l.querySelector("svg");l.addEventListener("click",g=>{g.stopPropagation();const v=c.classList.contains("open");a.forEach(i=>i.classList.remove("open")),r.forEach(i=>{var m;i.classList.remove("active-filter"),(m=i.querySelector("svg"))==null||m.classList.remove("rotated")}),v||(c.classList.add("open"),l.classList.add("active-filter"),p==null||p.classList.add("rotated"))})}),s==null||s.addEventListener("change",l=>{var b;const d=l.target;if(!d.matches('input[type="radio"]'))return;const c=d.name==="sort"?"sort":d.name==="sort-genre"?"genre":null;if(!c)return;let p=c==="sort"?(b=d.closest("label"))==null?void 0:b.textContent.trim():d.value||"All genres";const g=document.querySelector(`[data-type-value="${c}"]`);g&&(g.textContent=p);const v=c==="sort"?0:1,i=document.querySelectorAll("[data-artist-modal]")[v],m=document.querySelectorAll(".artist-sort-name[data-toggle-js]")[v],f=m.querySelector("svg");i==null||i.classList.remove("open"),m==null||m.classList.remove("active-filter"),f==null||f.classList.remove("rotated"),L(1)}),o==null||o.addEventListener("click",l=>{l.stopPropagation(),n!=null&&n.value.trim()&&L(1)}),n==null||n.addEventListener("keydown",l=>{l.key==="Enter"&&(l.preventDefault(),L(1))}),u==null||u.addEventListener("click",()=>{n&&(n.value="");const l=document.querySelectorAll('input[name="sort-genre"]');l.length&&(l.forEach(c=>c.checked=!1),l[0].checked=!0,document.querySelector('[data-type-value="genre"]').textContent="All genres");const d=document.querySelectorAll('input[name="sort"]');d.length&&(d.forEach(c=>c.checked=!1),d[0].checked=!0,document.querySelector('[data-type-value="sort"]').textContent="Default"),L(1)}),document.addEventListener("click",l=>{s.contains(l.target)||t.contains(l.target)||(s.classList.remove("open"),e==null||e.classList.remove("rotated"),a.forEach(c=>c.classList.remove("open")),r.forEach(c=>{var p;c.classList.remove("active-filter"),(p=c.querySelector("svg"))==null||p.classList.remove("rotated")}))})}R();ut();dt();let h=null,w=0;function mt(t){const e=Math.min(100,t/5*100),s=`starMask-${Math.random().toString(36).substr(2,9)}`,r="M9.07 1.318c.345-.817 1.515-.817 1.86 0l2.028 4.819c.145.344.473.58.849.609l5.266.417c.892.07 1.254 1.17.574 1.746l-4.012 3.395a.987.987 0 0 0-.325.986l1.226 5.077c.208.86-.74 1.54-1.503 1.079l-4.508-2.72a1.017 1.017 0 0 0-1.05 0l-4.508 2.72c-.764.46-1.711-.22-1.503-1.08l1.225-5.076a.987.987 0 0 0-.324-.986L.353 8.91c-.68-.575-.318-1.675.574-1.746l5.266-.417c.376-.03.704-.265.849-.61l2.029-4.818Z";return`
    <svg class="reviews-stars-svg" width="120" height="24" viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="${s}">
          <g style="fill: var(--color-scheme-1-text);">
            <path d="${r}" transform="translate(0)" />
            <path d="${r}" transform="translate(24)" />
            <path d="${r}" transform="translate(48)" />
            <path d="${r}" transform="translate(72)" />
            <path d="${r}" transform="translate(96)" />
          </g>
        </mask>
      </defs>

      <!-- Сірі зірки -->
      <g style="fill: var(--color-scheme-1-text);">
        <path d="${r}" transform="translate(0)" />
        <path d="${r}" transform="translate(24)" />
        <path d="${r}" transform="translate(48)" />
        <path d="${r}" transform="translate(72)" />
        <path d="${r}" transform="translate(96)" />
      </g>

      <!-- Фіолетова заливка по масці -->
      <g mask="url(#${s})">
        <rect width="${e}%" height="24" style="fill: var(--color-affair);" />
      </g>
    </svg>
  `}function gt(t){return t.map(({name:e,descr:s,rating:r})=>`
      <li class="splide__slide reviews-slide">
        <div class="reviews-stars">${mt(r)}</div>
        <p class="reviews-quote">"${s}"</p>
        <p class="reviews-author">${e}</p>
      </li>`).join("")}function pt(t,e){if(!t)return;const s=3;w=0;const r=Array.from({length:s},(n,o)=>`<button class="pagination-btn" data-index="${o}"></button>`).join("");t.innerHTML=r,t.querySelectorAll(".pagination-btn").forEach((n,o)=>{n.addEventListener("click",()=>{const u=w+o;h.go(u)})})}function E(t,e){const s=document.querySelectorAll(".pagination-btn");if(!s.length)return;t===0?w=0:t===e-1?w=e-3:w=t-1;const r=t-w;s.forEach((a,n)=>{a.classList.toggle("active",n===r)})}function j(t,e){const s=document.getElementById("prev-arrow"),r=document.getElementById("next-arrow");if(!s||!r||!h)return;const a=t===0,n=t===h.Components.Controller.getEnd();s.disabled=a,r.disabled=n}function ft(t){const e=document.querySelector(".splide__list"),s=document.querySelector(".custom-pagination");if(!e){console.error('Container ".splide__list" not found.');return}h&&h.destroy(!0),e.innerHTML=gt(t),requestAnimationFrame(()=>{h=new Z(".splide",{type:"slide",perPage:1,autoplay:!1,arrows:!1,pagination:!1}),h.mount();const r=document.getElementById("prev-arrow"),a=document.getElementById("next-arrow");r&&a&&(r.addEventListener("click",()=>h.go("<")),a.addEventListener("click",()=>h.go(">"))),h.on("mounted move",n=>{E(n,t.length),j(n,t.length)}),j(0,t.length),pt(s,t.length),E(0,t.length),h.on("move",n=>{E(n,t.length)}),E(0,t.length)})}async function ht(){try{const t=await z();ft(t)}catch(t){console.error("An error occurred while loading the data:",t)}}const q=document.querySelector(".mobile-menu"),F=document.querySelector(".js-mobile-menu"),vt=F.querySelector("span.burger"),H=document.querySelector(".js-menu-overlay");function P(){const t=q.classList.toggle("is-open");H.classList.toggle("is-active",t),vt.classList.toggle("is-closed",t),q.setAttribute("aria-hidden",!t),document.body.classList.toggle("no-scroll",t)}F.addEventListener("click",P);H.addEventListener("click",P);document.addEventListener("keydown",t=>{t.key==="Escape"&&q.classList.contains("is-open")&&P()});q.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",P)});document.addEventListener("DOMContentLoaded",function(){R(),ht()});
//# sourceMappingURL=index.js.map
