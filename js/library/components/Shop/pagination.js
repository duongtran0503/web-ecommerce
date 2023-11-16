import html from "../../core/core.js";
import { connect } from "../../core/store.js";
const connector = connect((state) => ({
  limitPage: state.limitPage,
}));
const paginationPrev = ({ limitPage }) => {
  return html`
    <div
      class="prev  ${limitPage.currentpage === 1 && "visible"}"
      onclick="dispatch('prevPage',this)"
    >
      prev
    </div>
  `;
};
const paginationNext = ({ limitPage }) => {
  return html`
    <div
      class="next ${limitPage.currentpage === 5 && "visible"}"
      onclick="dispatch('nextPage',this)"
    >
      next
    </div>
  `;
};
const pagNext = connector(paginationNext);
const pagPrev = connector(paginationPrev);
export { pagNext, pagPrev };
